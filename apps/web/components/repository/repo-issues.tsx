"use client";

import { useState } from "react";
import {
  AlertCircle,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  User,
  Tag,
  Plus,
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

interface IssueItem {
  id: number;
  title: string;
  status: "open" | "closed";
  priority: "high" | "medium" | "low";
  labels: { name: string; color: string }[];
  assignee?: string;
  author: string;
  comments: number;
  createdAt: string;
}

const DUMMY_ISSUES: IssueItem[] = [
  {
    id: 104,
    title: "Add export types for CorsairInstance and CorsairTenant scope",
    status: "open",
    priority: "high",
    labels: [
      { name: "bug", color: "bg-rose-500/10 text-rose-600 border-rose-200" },
      { name: "typescript", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
    ],
    assignee: "HimanshuTamoli24",
    author: "user_dev",
    comments: 4,
    createdAt: "2 hours ago",
  },
  {
    id: 103,
    title: "Refactor GitHub commitActivity router procedure for real-time day breakdown",
    status: "open",
    priority: "medium",
    labels: [{ name: "enhancement", color: "bg-purple-500/10 text-purple-600 border-purple-200" }],
    assignee: "HimanshuTamoli24",
    author: "HimanshuTamoli24",
    comments: 2,
    createdAt: "Yesterday",
  },
  {
    id: 101,
    title: "Update README with installation steps for Corsair integration engine",
    status: "closed",
    priority: "low",
    labels: [{ name: "documentation", color: "bg-amber-500/10 text-amber-600 border-amber-200" }],
    assignee: "alex-dev",
    author: "sarah-code",
    comments: 1,
    createdAt: "3 days ago",
  },
];

export function RepoIssues() {
  const [filter, setFilter] = useState<"all" | "open" | "closed" | "bug" | "enhancement">("open");
  const [search, setSearch] = useState("");

  const filteredIssues = DUMMY_ISSUES.filter((issue) => {
    if (filter === "open" && issue.status !== "open") return false;
    if (filter === "closed" && issue.status !== "closed") return false;
    if (filter === "bug" && !issue.labels.some((l) => l.name === "bug")) return false;
    if (filter === "enhancement" && !issue.labels.some((l) => l.name === "enhancement"))
      return false;
    if (!search) return true;
    return (
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.author.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <Card className="rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <AlertCircle className="size-4 text-amber-500" />
            Issues
          </CardTitle>
          <CardDescription className="text-xs">
            Track bugs, feature requests, and tasks with automated AI triage.
          </CardDescription>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-44">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 h-7 text-xs rounded-lg bg-muted/40 border-border"
            />
          </div>

          <div className="flex items-center gap-1 bg-muted/50 p-0.5 rounded-lg border border-border">
            {(["open", "closed", "bug", "enhancement", "all"] as const).map((f) => (
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

          <Button size="sm" className="h-7 text-xs px-2.5 rounded-lg gap-1">
            <Plus className="size-3.5" />
            New Issue
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {filteredIssues.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No issues match the selected filters.
            </div>
          ) : (
            filteredIssues.map((issue) => (
              <div
                key={issue.id}
                className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-muted/20 transition-colors"
              >
                {/* Left Issue Details */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="mt-0.5 shrink-0">
                    {issue.status === "open" ? (
                      <AlertCircle className="size-4 text-emerald-500" />
                    ) : (
                      <CheckCircle2 className="size-4 text-purple-500" />
                    )}
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-xs text-foreground hover:text-primary cursor-pointer truncate">
                        {issue.title}
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        #{issue.id}
                      </span>
                      {issue.labels.map((lbl) => (
                        <Badge
                          key={lbl.name}
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 font-medium rounded-md border ${lbl.color}`}
                        >
                          {lbl.name}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span>
                        opened by <strong className="text-foreground">{issue.author}</strong>
                      </span>
                      <span>•</span>
                      <span>{issue.createdAt}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="size-3" />
                        {issue.comments} comments
                      </span>
                      {issue.assignee && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-foreground">
                            <User className="size-3 text-muted-foreground" />
                            {issue.assignee}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Issue Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-[11px] px-2 rounded-lg gap-1"
                  >
                    <Sparkles className="size-3 text-primary" />
                    AI Summary
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-[11px] px-2.5 rounded-lg border-border"
                  >
                    Comment
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
