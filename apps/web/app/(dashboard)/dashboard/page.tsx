"use client";

import { FolderGit2, Star, GitFork, CircleDot } from "lucide-react";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useDashboardStats } from "~/hooks/useDashboardStats";
import { DUMMY_REPOSITORIES } from "~/lib/dummy-data";
import { StatCard } from "~/components/dashboard/stat-card";
import { ActivityChart } from "~/components/dashboard/activity-chart";
import { RecentRepos } from "~/components/dashboard/recent-repos";
import { GithubCommitGraph } from "~/components/dashboard/github-commit-graph";
import { RepositoryIssueAnalytics } from "~/components/dashboard/repository-issue-analytics";

export default function DashboardPage() {
  const { stats, isLoading } = useDashboardStats();

  if (isLoading || !stats) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Repositories"
          value={stats.totalRepos}
          change={stats.reposChange}
          icon={FolderGit2}
        />
        <StatCard
          title="Open Issues"
          value={stats.openIssues}
          change={stats.issuesChange}
          icon={CircleDot}
        />
        <StatCard
          title="Total Prs"
          value={stats.totalStars.toLocaleString()}
          change={stats.starsChange}
          icon={Star}
        />
        <StatCard
          title="Total Forks"
          value={stats.totalForks}
          change={stats.forksChange}
          icon={GitFork}
        />
      </div>

      <GithubCommitGraph />
      <RepositoryIssueAnalytics />
      <RecentRepos repositories={stats.reposList} />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-[320px] rounded-3xl" />
      <div className="grid gap-6 lg:grid-cols-5">
        <Skeleton className="h-[350px] rounded-lg lg:col-span-3" />
        <Skeleton className="h-[350px] rounded-lg lg:col-span-2" />
      </div>
      <Skeleton className="h-[300px] rounded-lg" />
    </div>
  );
}
