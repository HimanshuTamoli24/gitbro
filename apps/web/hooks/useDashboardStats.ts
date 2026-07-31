"use client";

import { useState, useEffect } from "react";
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
  activityData: ActivityData[];
  languageData: LanguageData[];
  topLanguage: string;
  starsChange: number;
  issuesChange: number;
  reposChange: number;
  forksChange: number;
}

interface UseDashboardStatsReturn {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
}

export function useDashboardStats(): UseDashboardStatsReturn {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      try {
        const totalStars = DUMMY_REPOSITORIES.reduce((sum, r) => sum + r.stars, 0);
        const totalForks = DUMMY_REPOSITORIES.reduce((sum, r) => sum + r.forks, 0);
        const openIssues = DUMMY_ISSUES.filter((i) => i.state === "open").length;
        const closedIssues = DUMMY_ISSUES.filter((i) => i.state === "closed").length;

        const topLang = DUMMY_LANGUAGES.reduce((prev, curr) =>
          curr.count > prev.count ? curr : prev,
        );

        setStats({
          totalRepos: DUMMY_REPOSITORIES.length,
          publicRepos: DUMMY_REPOSITORIES.filter((r) => !r.isPrivate).length,
          privateRepos: DUMMY_REPOSITORIES.filter((r) => r.isPrivate).length,
          totalStars,
          totalForks,
          openIssues,
          closedIssues,
          activityData: DUMMY_ACTIVITY,
          languageData: DUMMY_LANGUAGES,
          topLanguage: topLang.language,
          // Simulated week-over-week changes
          starsChange: 8.1,
          issuesChange: -12.4,
          reposChange: 4.2,
          forksChange: 2.8,
        });
      } catch {
        setError("Failed to compute dashboard stats");
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { stats, isLoading, error };
}
