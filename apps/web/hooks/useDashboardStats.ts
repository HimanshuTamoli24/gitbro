"use client";

import { useMemo } from "react";
import { trpc } from "~/trpc/client";
import {
  DUMMY_REPOSITORIES,
  DUMMY_ISSUES,
  DUMMY_ACTIVITY,
  DUMMY_LANGUAGES,
  type ActivityData,
  type LanguageData,
} from "~/lib/dummy-data";

interface DashboardStats {
  totalRepos: number;
  publicRepos: number;
  privateRepos: number;
  totalStars: number;
  totalForks: number;
  openIssues: number;
  closedIssues: number;
  totalPRs: number;
  openPRs: number;
  mergedPRs: number;
  closedPRs: number;
  activityData: ActivityData[];
  languageData: LanguageData[];
  topLanguage: string;
  starsChange: number;
  issuesChange: number;
  reposChange: number;
  forksChange: number;
  reposList: any[];
}

interface UseDashboardStatsReturn {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
}

export function useDashboardStats(): UseDashboardStatsReturn {
  // Query live aggregated dashboard stats via tRPC procedure `github.dashboard`
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    error: dashboardError,
  } = trpc.github.dashboard.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const { data: repoData } = trpc.github.repo.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const stats = useMemo(() => {
    const rawRepos: any[] =
      repoData?.repos && repoData.repos.length > 0 ? repoData.repos : DUMMY_REPOSITORIES;

    if (dashboardData) {
      return {
        totalRepos: dashboardData.totalRepos ?? rawRepos.length,
        publicRepos: dashboardData.publicRepos ?? rawRepos.filter((r) => !r.isPrivate).length,
        privateRepos: dashboardData.privateRepos ?? rawRepos.filter((r) => r.isPrivate).length,
        totalStars: dashboardData.totalStars ?? 520,
        totalForks: dashboardData.totalForks ?? 96,
        openIssues: dashboardData.openIssues ?? 18,
        closedIssues: dashboardData.closedIssues ?? 42,
        totalPRs: dashboardData.totalPRs ?? 24,
        openPRs: dashboardData.openPRs ?? 6,
        mergedPRs: dashboardData.mergedPRs ?? 16,
        closedPRs: dashboardData.closedPRs ?? 2,
        activityData: DUMMY_ACTIVITY,
        languageData:
          dashboardData.languages && dashboardData.languages.length > 0
            ? dashboardData.languages
            : DUMMY_LANGUAGES,
        topLanguage: dashboardData.topLanguage || "TypeScript",
        starsChange: 8.1,
        issuesChange: -12.4,
        reposChange: 4.2,
        forksChange: 2.8,
        reposList: rawRepos,
      };
    }

    return {
      totalRepos: rawRepos.length,
      publicRepos: rawRepos.filter((r) => !r.isPrivate).length,
      privateRepos: rawRepos.filter((r) => r.isPrivate).length,
      totalStars: 142,
      totalForks: 23,
      openIssues: 8,
      closedIssues: 12,
      totalPRs: 24,
      openPRs: 6,
      mergedPRs: 16,
      closedPRs: 2,
      activityData: DUMMY_ACTIVITY,
      languageData: DUMMY_LANGUAGES,
      topLanguage: "TypeScript",
      starsChange: 8.1,
      issuesChange: -12.4,
      reposChange: 4.2,
      forksChange: 2.8,
      reposList: rawRepos,
    };
  }, [dashboardData, repoData]);

  return {
    stats,
    isLoading: isDashboardLoading,
    error: dashboardError ? dashboardError.message : null,
  };
}
