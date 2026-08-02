"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { useDashboardStats } from "~/hooks/useDashboardStats";

const STACK_COLORS: Record<string, string> = {
  TypeScript: "bg-blue-500",
  Python: "bg-emerald-500",
  Go: "bg-sky-400",
  JavaScript: "bg-amber-500",
  Rust: "bg-purple-500",
  Java: "bg-indigo-500",
};

export function RepositoryIssueAnalytics() {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const { stats, isLoading } = useDashboardStats();

  const totalReposCount = stats?.totalRepos ?? 0;
  const languageList = stats?.languageData ?? [];

  // Calculate real percentage & stack breakdown
  const repoStats = languageList.map((lang) => {
    const rawPct = totalReposCount > 0 ? (lang.count / totalReposCount) * 100 : 0;
    return {
      label: `${lang.language} Repos`,
      count: lang.count,
      percentage: `${rawPct.toFixed(1)}%`,
      color: STACK_COLORS[lang.language] || "bg-slate-500",
      rawPct,
    };
  });

  const prMergeRate =
    stats?.totalPRs && stats.totalPRs > 0
      ? ((stats.mergedPRs / stats.totalPRs) * 100).toFixed(1)
      : "66.7";

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 1. LEFT CARD: Repository Breakdown (Conversions style) */}
      <Card className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Repositories by Primary Stack
            </span>
            <Badge variant="outline" className="text-[10px] rounded-full border-border">
              {totalReposCount} Total Repos
            </Badge>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {totalReposCount}
            </span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              <ArrowUpRight className="size-3.5" />
              {stats?.reposChange ?? 4.2}% overall growth
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="mt-6 flex h-7 w-full overflow-hidden rounded-xl bg-muted/40 p-1 gap-1 border border-border/60">
            {repoStats.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => setActiveSegment(item.label)}
                onMouseLeave={() => setActiveSegment(null)}
                className={`h-full ${item.color} rounded-md transition-all cursor-pointer ${
                  activeSegment && activeSegment !== item.label ? "opacity-40" : "opacity-100"
                }`}
                style={{ width: `${item.rawPct}%` }}
                title={`${item.label}: ${item.count} repos (${item.percentage})`}
              />
            ))}
          </div>

          {/* Percentage Labels */}
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-muted-foreground px-1">
            {repoStats.map((item) => (
              <span key={item.label}>{item.percentage}</span>
            ))}
          </div>
        </div>

        {/* Legend List */}
        <div className="mt-6 divide-y divide-border/60 border-t border-border/60 pt-2">
          {repoStats.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-2 text-xs transition-colors hover:bg-muted/20 px-1 rounded-lg"
            >
              <div className="flex items-center gap-2.5">
                <span className={`size-3 rounded-md ${item.color}`} />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <span className="font-bold text-foreground font-mono">{item.count}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. RIGHT CARD: PR Retention & Resolution Velocity */}
      <Card className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                PR Merge & Retention Rate
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight text-foreground">
                  {prMergeRate}%
                </span>
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-0.5">
                  <ArrowUpRight className="size-3.5" />
                  +2.4% vs last week
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-muted-foreground/40 rounded-full" /> Last week
              </span>
              <span className="flex items-center gap-1 text-foreground font-semibold">
                <span className="w-3 h-0.5 bg-orange-500 rounded-full" /> This week
              </span>
            </div>
          </div>

          {/* Line Chart Graphic */}
          <div className="mt-6 relative h-36 w-full">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-muted-foreground/40 font-mono pointer-events-none">
              <div className="border-b border-dashed border-border/60 pb-0.5">100</div>
              <div className="border-b border-dashed border-border/60 pb-0.5">75</div>
              <div className="border-b border-dashed border-border/60 pb-0.5">50</div>
              <div className="border-b border-dashed border-border/60 pb-0.5">25</div>
              <div>0</div>
            </div>

            {/* Simulated Line Plot with SVG */}
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Last week line (dashed gray) */}
              <path
                d="M 0 10 L 50 85 L 100 95 L 150 98 L 200 98 L 250 98 L 300 98"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="text-muted-foreground/40"
              />
              {/* This week line (solid orange) */}
              <path
                d="M 0 10 L 50 90 L 100 96 L 150 98 L 200 98 L 250 98 L 300 98"
                fill="none"
                stroke="#f97316"
                strokeWidth="2.5"
              />
            </svg>

            {/* Day Labels */}
            <div className="absolute -bottom-5 inset-x-0 flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Pill Row */}
        <div className="mt-10 grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-muted/30 border border-border/60 flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold text-muted-foreground">This week</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">38.6%</span>
              <span className="text-[10px] font-medium text-rose-500 flex items-center">
                <ArrowDownRight className="size-2.5" /> 1.1%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/30 border border-border/60 flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold text-muted-foreground">Last week</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">40.6%</span>
              <span className="text-[10px] font-medium text-emerald-600 flex items-center">
                <ArrowUpRight className="size-2.5" /> 2.4%
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-muted/30 border border-border/60 flex flex-col gap-0.5">
            <span className="text-[10px] font-semibold text-muted-foreground">Plateau</span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-foreground">~32%</span>
              <Badge variant="outline" className="text-[9px] px-1 py-0 rounded-md font-mono">
                Stable
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
