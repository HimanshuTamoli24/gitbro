"use client";

import { useState, useEffect, useCallback } from "react";
import { DUMMY_REPOSITORIES, type Repository } from "~/lib/dummy-data";

interface UseRepositoriesOptions {
  search?: string;
  visibility?: "all" | "public" | "private";
  sort?: "updated" | "stars" | "name";
}

interface UseRepositoriesReturn {
  repositories: Repository[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRepositories(options: UseRepositoriesOptions = {}): UseRepositoriesReturn {
  const { search = "", visibility = "all", sort = "updated" } = options;
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepositories = useCallback(() => {
    setIsLoading(true);
    setError(null);

    // Simulate API delay
    const timer = setTimeout(() => {
      try {
        let filtered = [...DUMMY_REPOSITORIES];

        // Filter by search
        if (search) {
          const q = search.toLowerCase();
          filtered = filtered.filter(
            (r) =>
              r.name.toLowerCase().includes(q) ||
              r.description.toLowerCase().includes(q) ||
              r.language.toLowerCase().includes(q) ||
              r.topics.some((t) => t.toLowerCase().includes(q)),
          );
        }

        // Filter by visibility
        if (visibility === "public") {
          filtered = filtered.filter((r) => !r.isPrivate);
        } else if (visibility === "private") {
          filtered = filtered.filter((r) => r.isPrivate);
        }

        // Sort
        if (sort === "stars") {
          filtered.sort((a, b) => b.stars - a.stars);
        } else if (sort === "name") {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          filtered.sort(
            (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          );
        }

        setRepositories(filtered);
      } catch {
        setError("Failed to fetch repositories");
      } finally {
        setIsLoading(false);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [search, visibility, sort]);

  useEffect(() => {
    const cleanup = fetchRepositories();
    return cleanup;
  }, [fetchRepositories]);

  return { repositories, isLoading, error, refetch: fetchRepositories };
}
