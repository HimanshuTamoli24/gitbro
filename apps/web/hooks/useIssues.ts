"use client";

import { useState, useEffect, useCallback } from "react";
import { DUMMY_ISSUES, type Issue } from "~/lib/dummy-data";

interface UseIssuesOptions {
  search?: string;
  status?: "all" | "open" | "closed";
  repoName?: string;
}

interface UseIssuesReturn {
  issues: Issue[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useIssues(options: UseIssuesOptions = {}): UseIssuesReturn {
  const { search = "", status = "all", repoName } = options;
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = useCallback(() => {
    setIsLoading(true);
    setError(null);

    // Simulate API delay
    const timer = setTimeout(() => {
      try {
        let filtered = [...DUMMY_ISSUES];

        // Filter by search
        if (search) {
          const q = search.toLowerCase();
          filtered = filtered.filter(
            (i) =>
              i.title.toLowerCase().includes(q) ||
              i.repoName.toLowerCase().includes(q) ||
              i.labels.some((l) => l.name.toLowerCase().includes(q)),
          );
        }

        // Filter by status
        if (status === "open") {
          filtered = filtered.filter((i) => i.state === "open");
        } else if (status === "closed") {
          filtered = filtered.filter((i) => i.state === "closed");
        }

        // Filter by repo
        if (repoName) {
          filtered = filtered.filter((i) => i.repoName.toLowerCase() === repoName.toLowerCase());
        }

        // Sort by most recently updated
        filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

        setIssues(filtered);
      } catch {
        setError("Failed to fetch issues");
      } finally {
        setIsLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [search, status, repoName]);

  useEffect(() => {
    const cleanup = fetchIssues();
    return cleanup;
  }, [fetchIssues]);

  return { issues, isLoading, error, refetch: fetchIssues };
}
