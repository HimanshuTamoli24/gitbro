"use client";

import {
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Users,
  GitBranch,
  Tag,
  Star,
  GitFork,
  Eye,
  HardDrive,
  Workflow,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";

interface OverviewStats {
  commits: number;
  openPRs: number;
  openIssues: number;
  contributors: number;
  branches: number;
  releases: number;
  stars: number;
  forks: number;
  watchers: number;
  size: string;
  workflowStatus: "passing" | "failing" | "running";
  latestRelease: string;
}

interface RepoOverviewSectionProps {
  stats?: Partial<OverviewStats>;
  onNavigateTab?: (tab: string) => void;
}

export function RepoOverviewSection({ stats, onNavigateTab }: RepoOverviewSectionProps) {
  const data: OverviewStats = {
    commits: stats?.commits ?? 1284,
    openPRs: stats?.openPRs ?? 6,
    openIssues: stats?.openIssues ?? 14,
    contributors: stats?.contributors ?? 18,
    branches: stats?.branches ?? 8,
    releases: stats?.releases ?? 24,
    stars: stats?.stars ?? 142,
    forks: stats?.forks ?? 23,
    watchers: stats?.watchers ?? 35,
    size: stats?.size ?? "18.4 MB",
    workflowStatus: stats?.workflowStatus ?? "passing",
    latestRelease: stats?.latestRelease ?? "v2.4.0",
  };

  const statItems = [
    {
      label: "Total Commits",
      value: data.commits.toLocaleString(),
      icon: GitCommit,
      tab: "commits",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Open Pull Requests",
      value: data.openPRs,
      icon: GitPullRequest,
      tab: "pulls",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      badge: `${data.openPRs} active`,
    },
    {
      label: "Open Issues",
      value: data.openIssues,
      icon: AlertCircle,
      tab: "issues",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      badge: `${data.openIssues} open`,
    },
    {
      label: "Contributors",
      value: data.contributors,
      icon: Users,
      tab: "contributors",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Branches",
      value: data.branches,
      icon: GitBranch,
      tab: "branches",
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Releases",
      value: data.releases,
      icon: Tag,
      tab: "overview",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      subText: data.latestRelease,
    },
    {
      label: "Stars",
      value: data.stars.toLocaleString(),
      icon: Star,
      tab: "overview",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
    },
    {
      label: "Forks",
      value: data.forks.toLocaleString(),
      icon: GitFork,
      tab: "overview",
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
    },
    {
      label: "Watchers",
      value: data.watchers,
      icon: Eye,
      tab: "overview",
      color: "text-teal-500",
      bg: "bg-teal-500/10",
    },
    {
      label: "Repository Size",
      value: data.size,
      icon: HardDrive,
      tab: "files",
      color: "text-slate-500",
      bg: "bg-slate-500/10",
    },
    {
      label: "Workflow Status",
      value: data.workflowStatus === "passing" ? "Passing" : "Attention",
      icon: Workflow,
      tab: "actions",
      color: data.workflowStatus === "passing" ? "text-emerald-500" : "text-amber-500",
      bg: data.workflowStatus === "passing" ? "bg-emerald-500/10" : "bg-amber-500/10",
      badge: "CI / CD",
    },
    {
      label: "Latest Release",
      value: data.latestRelease,
      icon: Sparkles,
      tab: "overview",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      subText: "Production Ready",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <Card
            key={idx}
            onClick={() => onNavigateTab?.(item.tab)}
            className="group cursor-pointer rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-200 shadow-xs"
          >
            <CardContent className="p-3.5 flex flex-col justify-between h-full gap-2">
              <div className="flex items-center justify-between">
                <div
                  className={`size-8 rounded-lg ${item.bg} flex items-center justify-center ${item.color}`}
                >
                  <Icon className="size-4" />
                </div>

                {item.badge && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1.5 py-0 font-normal rounded-full border-border"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>

              <div>
                <span className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors block">
                  {item.value}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground block truncate">
                  {item.label}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
