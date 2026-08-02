"use client";

import { BarChart2, TrendingUp, Clock, GitMerge, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";

export function RepoInsights() {
  const weeklyDays = [
    { day: "Mon", commits: 45, prs: 6 },
    { day: "Tue", commits: 62, prs: 8 },
    { day: "Wed", commits: 78, prs: 12 },
    { day: "Thu", commits: 51, prs: 5 },
    { day: "Fri", commits: 89, prs: 14 },
    { day: "Sat", commits: 34, prs: 3 },
    { day: "Sun", commits: 12, prs: 1 },
  ];

  const maxCommits = Math.max(...weeklyDays.map((d) => d.commits));

  return (
    <Card className="rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <BarChart2 className="size-4 text-cyan-500" />
            Repository Analytics & Insights
          </CardTitle>
          <CardDescription className="text-xs">
            Development velocity, PR merge times, and weekly contribution activity.
          </CardDescription>
        </div>

        <Badge
          variant="outline"
          className="text-xs px-2.5 py-1 rounded-full text-emerald-600 bg-emerald-500/10 border-emerald-200"
        >
          +14.2% velocity this week
        </Badge>
      </CardHeader>

      <CardContent className="p-4 grid md:grid-cols-3 gap-5">
        {/* Weekly Heatmap Bar Chart */}
        <div className="md:col-span-2 flex flex-col gap-3 p-3.5 rounded-xl border border-border/80 bg-muted/20">
          <span className="text-xs font-semibold text-foreground flex items-center justify-between">
            <span>Weekly Commit Heatmap</span>
            <span className="text-[11px] text-muted-foreground font-normal">371 commits total</span>
          </span>

          <div className="flex items-end justify-between gap-2 h-40 pt-4">
            {weeklyDays.map((d) => {
              const heightPercent = Math.round((d.commits / maxCommits) * 100);
              return (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
                >
                  <div className="text-[10px] font-mono text-muted-foreground">{d.commits}</div>
                  <div
                    className="w-full bg-primary/80 hover:bg-primary rounded-t-md transition-all cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[11px] font-medium text-foreground">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Speed & Resolution Stats */}
        <div className="flex flex-col gap-3">
          <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Clock className="size-3.5 text-blue-500" />
              Avg PR Merge Time
            </span>
            <span className="text-xl font-bold text-foreground">2.4 Hours</span>
            <span className="text-[10px] text-emerald-600 font-medium">
              35% faster than last week
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Issue Resolution Rate
            </span>
            <span className="text-xl font-bold text-foreground">94.2%</span>
            <span className="text-[10px] text-muted-foreground">18 of 19 closed within 48h</span>
          </div>

          <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-1">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <GitMerge className="size-3.5 text-purple-500" />
              Open vs Merged PRs
            </span>
            <span className="text-xl font-bold text-foreground">6 Open / 42 Merged</span>
            <span className="text-[10px] text-muted-foreground">87.5% merge success rate</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
