"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight, Github } from "lucide-react";
import { trpc } from "~/trpc/client";
import { cn } from "@repo/ui/lib/utils";

interface CommitDay {
  day: string;
  lastWeekCommits: number;
  thisWeekCommits: number;
  lastWeekBlocks: number;
  thisWeekBlocks: number;
}

export function GithubCommitGraph() {
  const { data: activity } = trpc.github.commitActivity.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const [hoveredDay, setHoveredDay] = React.useState<CommitDay | null>(null);

  // Dynamic rolling 8-day fallback (e.g. Day-7 to Day-0 Today) with 0 values
  const fallbackDays: CommitDay[] = React.useMemo(() => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    const oneDayMs = 24 * 60 * 60 * 1000;
    const res: CommitDay[] = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now.getTime() - i * oneDayMs);
      res.push({
        day: dayNames[d.getDay()]!,
        lastWeekCommits: 0,
        thisWeekCommits: 0,
        lastWeekBlocks: 0,
        thisWeekBlocks: 0,
      });
    }
    return res;
  }, []);

  const days: CommitDay[] = activity?.days ?? fallbackDays;

  const totalThisWeek = activity?.totalThisWeek ?? 24815;
  const isIncrease = activity?.isIncrease ?? false;
  const changeFormatted = activity?.changeFormatted ?? "5.6k users lost in last 7 days";
  const yAxisTicks = activity?.yAxisTicks ?? ["25k", "20k", "15k", "10k", "5k", "0k"];
  const maxBlocks = activity?.maxBlocks ?? 12;

  return (
    <div className="relative w-full rounded-3xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:shadow-sm">
      {/* --- HEADER ROW --- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Legend using CSS Theme Tokens */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="size-3.5 rounded-[3px] bg-secondary border border-border/50" />
            <span className="text-muted-foreground font-medium">Last week</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3.5 rounded-[3px] bg-primary" />
            <span className="font-semibold text-foreground">This week</span>
          </div>
        </div>
      </div>

      {/* --- GRAPH CANVAS AREA --- */}
      <div className="mt-8 relative overflow-x-auto pb-2">
        <div className="min-w-[620px] flex items-start gap-4">
          {/* Y-Axis Labels */}
          <div className="flex flex-col justify-between text-[11px] font-medium text-muted-foreground/70 h-[220px] pt-0.5 pb-0.5 w-8 shrink-0 text-right">
            {yAxisTicks.map((tick, idx) => (
              <span key={idx} className="leading-none">
                {tick}
              </span>
            ))}
          </div>

          {/* Grid Columns Area */}
          <div className="flex-1 flex flex-col">
            {/* Block Grid Columns */}
            <div className="grid grid-cols-8 gap-2 sm:gap-3 items-end h-[220px]">
              {days.map((item, colIdx) => (
                <div
                  key={colIdx}
                  onMouseEnter={() => setHoveredDay(item)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className="group relative flex flex-col justify-end gap-1.5 h-full cursor-pointer transition-all duration-200"
                >
                  {/* Vertical Stack of Rounded Square Blocks (12 to 1 top-to-bottom) */}
                  {Array.from({ length: maxBlocks }).map((_, blockIdx) => {
                    const blockNumber = maxBlocks - blockIdx; // 12 down to 1
                    const isThisWeek = blockNumber <= item.thisWeekBlocks;
                    const isLastWeek = blockNumber <= item.lastWeekBlocks;

                    return (
                      <div
                        key={blockIdx}
                        className={cn(
                          "w-full h-[13px] rounded-[4px] transition-all duration-300",
                          isThisWeek
                            ? "bg-primary shadow-2xs group-hover:bg-primary/90 group-hover:scale-105"
                            : isLastWeek
                              ? "bg-secondary border border-border/40 group-hover:bg-secondary/80"
                              : "bg-muted/30 border border-border/20",
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* X-Axis Day Labels */}
            <div className="grid grid-cols-8 gap-2 sm:gap-3 mt-3 text-center">
              {days.map((item, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "text-xs font-medium transition-colors",
                    hoveredDay?.day === item.day
                      ? "text-primary font-bold"
                      : "text-muted-foreground",
                  )}
                >
                  {item.day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hover Tooltip Popup */}
        {hoveredDay && (
          <div className="absolute top-2 right-4 z-10 flex items-center gap-3 rounded-xl border border-border bg-popover/95 px-3.5 py-2.5 text-popover-foreground shadow-lg backdrop-blur-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                {hoveredDay.day} Activity
              </span>
              <div className="flex items-center gap-3 mt-1 text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-primary">
                  <span className="size-2 rounded-full bg-primary" />
                  {hoveredDay.thisWeekCommits.toLocaleString()} this week
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="size-2 rounded-full bg-muted-foreground/50" />
                  {hoveredDay.lastWeekCommits.toLocaleString()} last week
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
