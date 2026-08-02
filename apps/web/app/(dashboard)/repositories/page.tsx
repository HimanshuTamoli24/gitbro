"use client";

import { useState, useEffect } from "react";
import { FolderGit2 } from "lucide-react";
import { Skeleton } from "boneyard-js/react";
import { useRepositories } from "~/hooks/useRepositories";
import { RepoCard } from "~/components/repositories/repo-card";
import { RepoTable } from "~/components/repositories/repo-table";
import { RepoFilters } from "~/components/repositories/repo-filters";
import { RepoCardSkeleton, RepoTableSkeleton } from "~/components/repositories/repo-skeleton";

const DUMMY_FIXTURE_REPOS = [
  {
    name: "corsair-dev-app",
    fullName: "corsairdev/corsair-dev-app",
    url: "https://github.com",
    description: "AI-powered workspace and GitHub orchestration client",
    language: "TypeScript",
    stars: 128,
    forks: 34,
    openIssues: 5,
    isPrivate: false,
    updatedAt: new Date().toISOString(),
  },
  {
    name: "gitbro-core",
    fullName: "corsairdev/gitbro-core",
    url: "https://github.com",
    description: "Core productivity engine and repo analytics service",
    language: "Python",
    stars: 94,
    forks: 18,
    openIssues: 2,
    isPrivate: true,
    updatedAt: new Date().toISOString(),
  },
  {
    name: "trpc-api-server",
    fullName: "corsairdev/trpc-api-server",
    url: "https://github.com",
    description: "Type-safe backend router with OAuth tenant links",
    language: "Go",
    stars: 62,
    forks: 12,
    openIssues: 1,
    isPrivate: false,
    updatedAt: new Date().toISOString(),
  },
];

export default function RepositoriesPage() {
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<"all" | "public" | "private">("all");
  const [sort, setSort] = useState<"updated" | "stars" | "name">("updated");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  // Load view preference from localStorage on mount & fallback to cards on mobile screens
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setViewMode("cards");
      return;
    }

    const savedMode = localStorage.getItem("gitbro_repo_view_mode") as "cards" | "table" | null;
    if (savedMode === "cards" || savedMode === "table") {
      setViewMode(savedMode);
    }
  }, []);

  const handleViewModeChange = (mode: "cards" | "table") => {
    setViewMode(mode);
    localStorage.setItem("gitbro_repo_view_mode", mode);
  };

  const [page, setPage] = useState(1);
  const perPage = 30;

  const repoType =
    visibility === "public" ? "public" : visibility === "private" ? "private" : "owner";

  const { data, isLoading } = useRepositories({
    type: repoType,
    sort: "updated",
    perPage: perPage,
    page: page,
  });

  const rawRepos: any[] = data?.repos ?? [];

  const repositories = rawRepos
    .filter((repo: any) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        (repo.name ?? "").toLowerCase().includes(q) ||
        (repo.description ?? "").toLowerCase().includes(q) ||
        (repo.language ?? "").toLowerCase().includes(q)
      );
    })
    .sort((a: any, b: any) => {
      if (sort === "stars") return (b.stars ?? 0) - (a.stars ?? 0);
      if (sort === "name") return (a.name ?? "").localeCompare(b.name ?? "");
      return new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime();
    });

  const formattedRepos = repositories.map((repo: any) => ({
    name: repo.name ?? "",
    fullName: repo.fullName ?? repo.name ?? "",
    url: repo.url ?? "",
    description: repo.description ?? "",
    language: repo.language ?? "TypeScript",
    stars: repo.stars ?? 0,
    forks: repo.forks ?? 0,
    openIssues: repo.openIssues ?? 0,
    isPrivate: Boolean(repo.isPrivate),
    updatedAt: repo.updatedAt ?? new Date().toISOString(),
    createdAt: repo.createdAt ?? new Date().toISOString(),
    defaultBranch: "main",
    topics: [],
  }));

  const hasNextPage = rawRepos.length >= perPage;

  return (
    <div className="flex flex-col gap-6 pb-8">
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
        onVisibilityChange={(v) => {
          setVisibility(v);
          setPage(1);
        }}
        sort={sort}
        onSortChange={setSort}
        totalCount={formattedRepos.length}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {isLoading ? (
        viewMode === "table" ? (
          <RepoTableSkeleton count={8} />
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <RepoCardSkeleton key={i} />
            ))}
          </div>
        )
      ) : formattedRepos.length === 0 ? (
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
        <div className="flex flex-col gap-6">
          {viewMode === "table" ? (
            <RepoTable repositories={formattedRepos} />
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {formattedRepos.map((repo: any) => (
                <RepoCard key={repo.name || repo.id} repo={repo} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between border-t border-border pt-4 text-xs">
            <span className="text-muted-foreground">
              Page <strong className="text-foreground font-semibold">{page}</strong> (showing{" "}
              {formattedRepos.length} repos)
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-border bg-card font-medium text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                Previous
              </button>
              <button
                disabled={!hasNextPage || isLoading}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-border bg-card font-medium text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
