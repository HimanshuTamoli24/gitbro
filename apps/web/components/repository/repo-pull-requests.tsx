"use client";

import { useState } from "react";
import {
  GitPullRequest,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Sparkles,
  GitMerge,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";

interface PullRequest {
  id: number;
  title: string;
  author: string;
  status: "open" | "draft" | "merged" | "closed";
  branch: string;
  targetBranch: string;
  reviewers: string[];
  checks: "passing" | "failing" | "pending";
  mergeable: boolean;
  updatedAt: string;
}

const DUMMY_PRS: PullRequest[] = [
  {
    id: 42,
    title: "Refactor weekly commit graph activity aggregation in GithubService",
    author: "HimanshuTamoli24",
    status: "open",
    branch: "feat/weekly-commits",
    targetBranch: "main",
    reviewers: ["alex-dev"],
    checks: "passing",
    mergeable: true,
    updatedAt: "10 mins ago",
  },
  {
    id: 41,
    title: "Add export types for CorsairInstance and CorsairTenant scope",
    author: "HimanshuTamoli24",
    status: "merged",
    branch: "fix/corsair-exports",
    targetBranch: "main",
    reviewers: ["dev-bot"],
    checks: "passing",
    mergeable: true,
    updatedAt: "2 hours ago",
  },
  {
    id: 39,
    title: "Draft: Implement Linear-inspired repository command center",
    author: "HimanshuTamoli24",
    status: "draft",
    branch: "feat/repo-details-ui",
    targetBranch: "main",
    reviewers: [],
    checks: "pending",
    mergeable: true,
    updatedAt: "Yesterday",
  },
  {
    id: 38,
    title: "Optimize tRPC router middleware for publicProcedure rate limiters",
    author: "sarah-code",
    status: "closed",
    branch: "fix/rate-limit",
    targetBranch: "main",
    reviewers: ["HimanshuTamoli24"],
    checks: "failing",
    mergeable: false,
    updatedAt: "3 days ago",
  },
];

export function RepoPullRequests() {
  const [filter, setFilter] = useState<"all" | "open" | "draft" | "merged" | "closed">("open");
  const [search, setSearch] = useState("");

  const filteredPrs = DUMMY_PRS.filter((pr) => {
    if (filter !== "all" && pr.status !== filter) return false;
    if (!search) return true;
    return (
      pr.title.toLowerCase().includes(search.toLowerCase()) ||
      pr.author.toLowerCase().includes(search.toLowerCase()) ||
      pr.branch.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Card className="rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <GitPullRequest className="size-4 text-emerald-500" />
            Pull Requests
          </CardTitle>
          <CardDescription className="text-xs">
            Review active branches, run automated checks, and merge changes with zero friction.
          </CardDescription>
        </div>

        {/* Filter Badges & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-44">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
            <Input
              placeholder="Search PRs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 h-7 text-xs rounded-lg bg-muted/40 border-border"
            />
          </div>

          <div className="flex items-center gap-1 bg-muted/50 p-0.5 rounded-lg border border-border">
            {(["open", "draft", "merged", "closed", "all"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors capitalize ${
                  filter === f
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {filteredPrs.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No pull requests match the selected filters.
            </div>
          ) : (
            filteredPrs.map((pr) => (
              <div
                key={pr.id}
                className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-muted/20 transition-colors"
              >
                {/* Left PR Info */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="mt-0.5 shrink-0">
                    {pr.status === "merged" ? (
                      <GitMerge className="size-4 text-purple-500" />
                    ) : pr.status === "open" ? (
                      <GitPullRequest className="size-4 text-emerald-500" />
                    ) : pr.status === "draft" ? (
                      <GitPullRequest className="size-4 text-muted-foreground" />
                    ) : (
                      <XCircle className="size-4 text-rose-500" />
                    )}
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-xs text-foreground hover:text-primary cursor-pointer truncate">
                        {pr.title}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">#{pr.id}</span>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-1.5 py-0 rounded-md font-mono bg-muted/40"
                      >
                        {pr.branch} → {pr.targetBranch}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>
                        by <strong className="text-foreground">{pr.author}</strong>
                      </span>
                      <span>•</span>
                      <span>Updated {pr.updatedAt}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {pr.checks === "passing" ? (
                          <CheckCircle2 className="size-3 text-emerald-500" />
                        ) : pr.checks === "failing" ? (
                          <XCircle className="size-3 text-rose-500" />
                        ) : (
                          <Clock className="size-3 text-amber-500" />
                        )}
                        Checks {pr.checks}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right PR Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-[11px] px-2 rounded-lg gap-1"
                  >
                    <Sparkles className="size-3 text-primary" />
                    AI Review
                  </Button>
                  {pr.status === "open" && pr.mergeable && (
                    <Button
                      size="sm"
                      className="h-7 text-[11px] px-2.5 rounded-lg gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <GitMerge className="size-3" />
                      Merge
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-[11px] px-2 rounded-lg border-border"
                  >
                    <ExternalLink className="size-3 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
