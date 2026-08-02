"use client";

import {
  GitCommit,
  Tag,
  AlertCircle,
  Clock,
  Workflow,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";

export function RepoRightSidebar() {
  return (
    <div className="w-full xl:w-72 shrink-0 flex flex-col gap-4">
      {/* Repository Health Score */}
      <Card className="rounded-xl border border-border bg-card shadow-xs">
        <CardHeader className="p-3.5 pb-2 border-b border-border/60 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            Health Score
          </CardTitle>
          <Badge
            variant="outline"
            className="text-[10px] px-1.5 py-0 rounded-md font-mono bg-emerald-500/10 text-emerald-600 border-emerald-200"
          >
            96 / 100
          </Badge>
        </CardHeader>
        <CardContent className="p-3.5 flex flex-col gap-2">
          <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[96%]" />
          </div>
          <span className="text-[11px] text-muted-foreground">
            Zero security vulnerabilities. CI pipeline healthy.
          </span>
        </CardContent>
      </Card>

      {/* Latest Activity Snapshot */}
      <Card className="rounded-xl border border-border bg-card shadow-xs">
        <CardHeader className="p-3.5 pb-2 border-b border-border/60">
          <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Quick Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3.5 flex flex-col gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <GitCommit className="size-4 text-blue-500 shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-foreground truncate">Latest Commit</span>
              <span className="text-[11px] text-muted-foreground truncate">a8f31b9 • 15m ago</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Tag className="size-4 text-purple-500 shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-foreground truncate">Latest Release</span>
              <span className="text-[11px] text-muted-foreground truncate">
                v2.4.0 • 2 days ago
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <AlertCircle className="size-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-foreground truncate">Open Issues</span>
              <span className="text-[11px] text-muted-foreground truncate">14 open issues</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <UserCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-foreground truncate">Pending Reviews</span>
              <span className="text-[11px] text-muted-foreground truncate">2 PRs need review</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Workflow className="size-4 text-cyan-500 shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-foreground truncate">Running Workflows</span>
              <span className="text-[11px] text-muted-foreground truncate">
                1 active job running
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions Box */}
      <Card className="rounded-xl border border-primary/20 bg-primary/5 shadow-xs">
        <CardHeader className="p-3.5 pb-2">
          <CardTitle className="text-xs font-bold text-primary flex items-center gap-1.5">
            <Sparkles className="size-3.5" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3.5 pt-0 flex flex-col gap-2.5 text-xs text-foreground">
          <div className="p-2.5 rounded-lg bg-background border border-border/80 flex flex-col gap-1">
            <span className="font-semibold text-[11px]">Review PR #42</span>
            <span className="text-[10px] text-muted-foreground">
              Automated tests passed. Ready for approval.
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-background border border-border/80 flex flex-col gap-1">
            <span className="font-semibold text-[11px]">Clean Stale Branches</span>
            <span className="text-[10px] text-muted-foreground">
              3 merged branches can be safely deleted.
            </span>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="h-7 text-[11px] rounded-lg border-primary/30 text-primary w-full gap-1"
          >
            Apply Recommendations
            <ChevronRight className="size-3" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
