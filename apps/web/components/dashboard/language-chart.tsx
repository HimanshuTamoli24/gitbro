"use client";

import { Cell, Pie, PieChart } from "recharts";
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
import type { LanguageData } from "~/lib/dummy-data";

interface LanguageChartProps {
  data: LanguageData[];
  topLanguage: string;
}

export function LanguageChart({ data, topLanguage }: LanguageChartProps) {
  const chartConfig = data.reduce<ChartConfig>((acc, lang) => {
    acc[lang.language] = {
      label: lang.language,
      color: lang.color,
    };
    return acc;
  }, {});

  const totalRepos = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Languages</CardTitle>
        <CardDescription>Distribution across {totalRepos} repositories</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-[200px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data}
              dataKey="count"
              nameKey="language"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell key={entry.language} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 flex flex-col gap-2">
          {data.map((lang) => (
            <div key={lang.language} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
                <span className="text-muted-foreground">{lang.language}</span>
              </div>
              <span className="font-medium">
                {lang.count} {lang.count === 1 ? "repo" : "repos"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
