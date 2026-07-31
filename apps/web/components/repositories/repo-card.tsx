"use client";

import { Star, GitFork, ExternalLink, Lock, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import type { Repository } from "~/lib/dummy-data";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  HCL: "#844fba",
};

interface RepoCardProps {
  repo: Repository;
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 7) return `Updated ${diffDays} days ago`;
  if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
  return `Updated ${Math.floor(diffDays / 30)} months ago`;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className="group transition-all hover:shadow-md hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group/link"
              >
                <span className="truncate">{repo.name}</span>
                <ExternalLink className="size-3.5 opacity-0 group-hover/link:opacity-100 transition-opacity shrink-0" />
              </a>
            </CardTitle>
            {repo.description && (
              <CardDescription className="mt-1 line-clamp-2">{repo.description}</CardDescription>
            )}
          </div>
          <Badge variant="secondary" className="shrink-0 gap-1 text-xs">
            {repo.isPrivate ? (
              <>
                <Lock className="size-3" />
                Private
              </>
            ) : (
              <>
                <Globe className="size-3" />
                Public
              </>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#6b7280",
                }}
              />
              <span className="font-medium text-foreground/80">{repo.language}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="size-3.5 text-amber-500" />
            {repo.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="size-3.5" />
            {repo.forks.toLocaleString()}
          </span>
          <span className="ml-auto">{formatRelativeTime(repo.updatedAt)}</span>
        </div>

        {repo.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {repo.topics.map((topic) => (
              <Badge
                key={topic}
                variant="outline"
                className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground"
              >
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
