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
  accentColor: string;
}

export function StatCard({ title, value, change, icon: Icon, accentColor }: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <Card
      className={cn("relative overflow-hidden border-l-4 transition-shadow hover:shadow-md")}
      style={{ borderLeftColor: accentColor }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div
          className="flex items-center justify-center rounded-lg size-9"
          style={{ backgroundColor: `${accentColor}18` }}
        >
          <Icon className="size-4" style={{ color: accentColor }} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="mt-1 flex items-center gap-1 text-xs">
          {isPositive ? (
            <TrendingUp className="size-3 text-emerald-500" />
          ) : (
            <TrendingDown className="size-3 text-red-500" />
          )}
          <span className={cn("font-medium", isPositive ? "text-emerald-600" : "text-red-500")}>
            {isPositive ? "+" : ""}
            {change}%
          </span>
          <span className="text-muted-foreground">vs last week</span>
        </div>
      </CardContent>
    </Card>
  );
}
