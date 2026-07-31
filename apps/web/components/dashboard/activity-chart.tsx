"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@repo/ui/components/ui/chart";
import type { ActivityData } from "~/lib/dummy-data";

const chartConfig = {
  commits: {
    label: "Commits",
    color: "#f97316",
  },
  pullRequests: {
    label: "Pull Requests",
    color: "#94a3b8",
  },
} satisfies ChartConfig;

interface ActivityChartProps {
  data: ActivityData[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  const totalCommits = data.reduce((sum, d) => sum + d.commits, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Activity</CardTitle>
        <CardDescription>
          <span className="text-2xl font-bold text-foreground">{totalCommits}</span>{" "}
          <span className="text-muted-foreground">commits in last 7 days</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart data={data} barGap={4}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="commits" fill="var(--color-commits)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pullRequests" fill="var(--color-pullRequests)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
