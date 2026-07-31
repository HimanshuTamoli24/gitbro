"use client";

import { useState } from "react";
import { FolderGit2 } from "lucide-react";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useRepositories } from "~/hooks/useRepositories";
import { RepoCard } from "~/components/repositories/repo-card";
import { RepoFilters } from "~/components/repositories/repo-filters";

export default function RepositoriesPage() {
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<"all" | "public" | "private">("all");
  const [sort, setSort] = useState<"updated" | "stars" | "name">("updated");

  const { repositories, isLoading } = useRepositories({
    search,
    visibility,
    sort,
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FolderGit2 className="size-6" />
          Repositories
        </h1>
        <p className="text-muted-foreground mt-1">Browse and manage your GitHub repositories</p>
      </div>

      <RepoFilters
        search={search}
        onSearchChange={setSearch}
        visibility={visibility}
        onVisibilityChange={setVisibility}
        sort={sort}
        onSortChange={setSort}
        totalCount={repositories.length}
      />

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[160px] rounded-lg" />
          ))}
        </div>
      ) : repositories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <FolderGit2 className="size-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium">No repositories found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {search
              ? `No results for "${search}". Try a different search term.`
              : "No repositories match the current filters."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {repositories.map((repo) => (
            <RepoCard key={repo.name} repo={repo} />
          ))}
        </div>
      )}
    </div>
  );
}
