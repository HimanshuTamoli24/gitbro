"use client";

import {
  GitBranch,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  GitCompare,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

interface BranchItem {
  name: string;
  isProtected: boolean;
  ahead: number;
  behind: number;
  lastCommit: string;
  author: string;
  updatedAt: string;
}

const DUMMY_BRANCHES: BranchItem[] = [
  {
    name: "main",
    isProtected: true,
    ahead: 0,
    behind: 0,
    lastCommit: "feat: aggregate weekly commits in GithubService",
    author: "HimanshuTamoli24",
    updatedAt: "15 mins ago",
  },
  {
    name: "feat/repo-details-ui",
    isProtected: false,
    ahead: 4,
    behind: 1,
    lastCommit: "feat: build minimal Linear-inspired repository details dashboard",
    author: "HimanshuTamoli24",
    updatedAt: "1 hour ago",
  },
  {
    name: "fix/corsair-exports",
    isProtected: false,
    ahead: 1,
    behind: 0,
    lastCommit: "fix: export CorsairInstance and CorsairTenant types",
    author: "HimanshuTamoli24",
    updatedAt: "2 hours ago",
  },
  {
    name: "dependabot/npm_and_yarn/zod-4.4.3",
    isProtected: false,
    ahead: 1,
    behind: 3,
    lastCommit: "chore: bump zod dependency",
    author: "dependabot",
    updatedAt: "3 days ago",
  },
];

export function RepoBranches() {
  return (
    <Card className="rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <GitBranch className="size-4 text-indigo-500" />
            Branches
          </CardTitle>
          <CardDescription className="text-xs">
            Manage active workspace branches, set protection rules, and compare diffs.
          </CardDescription>
        </div>

        <Badge variant="outline" className="text-xs px-2.5 py-1 rounded-full">
          {DUMMY_BRANCHES.length} active branches
        </Badge>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {DUMMY_BRANCHES.map((b) => (
            <div
              key={b.name}
              className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="size-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                  <GitBranch className="size-3.5" />
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs font-mono text-foreground hover:text-primary cursor-pointer">
                      {b.name}
                    </span>
                    {b.isProtected && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 rounded-md font-medium gap-1 text-emerald-600 bg-emerald-500/10 border-emerald-200"
                      >
                        <Shield className="size-2.5" />
                        Protected
                      </Badge>
                    )}
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-mono">
                      <span className="text-emerald-600 font-semibold flex items-center">
                        <ArrowUpRight className="size-3" />
                        {b.ahead}
                      </span>
                      <span className="text-rose-500 font-semibold flex items-center">
                        <ArrowDownRight className="size-3" />
                        {b.behind}
                      </span>
                    </span>
                  </div>

                  <div className="text-[11px] text-muted-foreground truncate">
                    <span>{b.lastCommit}</span>
                    <span className="mx-1.5">•</span>
                    <span>by {b.author}</span>
                    <span className="mx-1.5">•</span>
                    <span>{b.updatedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-[11px] px-2.5 rounded-lg border-border gap-1"
                >
                  <GitCompare className="size-3 text-muted-foreground" />
                  Compare
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-[11px] px-2.5 rounded-lg">
                  Switch
                </Button>
                {!b.isProtected && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="size-7 p-0 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
