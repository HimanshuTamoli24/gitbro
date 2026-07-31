"use client";

import { useState, useEffect } from "react";
import { DUMMY_REPOSITORIES, type Repository } from "~/lib/dummy-data";

interface UseRepositoryReturn {
  repository: Repository | null;
  isLoading: boolean;
  error: string | null;
}

export function useRepository(name: string): UseRepositoryReturn {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Simulate API delay
    const timer = setTimeout(() => {
      const found = DUMMY_REPOSITORIES.find((r) => r.name.toLowerCase() === name.toLowerCase());

      if (found) {
        setRepository(found);
      } else {
        setError(`Repository "${name}" not found`);
      }

      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [name]);

  return { repository, isLoading, error };
}
