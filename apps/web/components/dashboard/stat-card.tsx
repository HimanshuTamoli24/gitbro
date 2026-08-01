"use client";

import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { cn } from "@repo/ui/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
}

export function StatCard({ title, value, change, icon: Icon }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-2xl bg-muted p-2">
      <div className="rounded-xl bg-background p-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
            <Icon className="size-5" />
          </div>

          <h2 className="text-[17px] font-medium">{title}</h2>
        </div>

        {/* spacing */}
        <div className="mt-6 border-t border-dashed" />

        {/* value */}
        <div className="mt-6">
          <h1 className="text-[44px] font-semibold leading-none">{value}</h1>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-2 px-2 pb-1">
        {isPositive ? (
          <TrendingUp className="size-4 text-green-500" />
        ) : (
          <TrendingDown className="size-4 text-red-500" />
        )}

        <span className="text-sm font-medium">{change}%</span>

        <span className="text-xs text-muted-foreground">decreased than last week</span>
      </div>
    </div>
  );
}
