"use client";

import Link from "next/link";
import { Star, ExternalLink } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import type { Repository } from "~/lib/dummy-data";

interface RecentReposProps {
  repositories: Repository[];
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export function RecentRepos({ repositories }: RecentReposProps) {
  const recentRepos = [...repositories]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg">Recent Repositories</CardTitle>
          <CardDescription>Your most recently updated repos</CardDescription>
        </div>
        <Link href="/repositories">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {recentRepos.map((repo) => (
            <div
              key={repo.name}
              className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <div className="flex flex-col gap-1 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-sm hover:text-primary transition-colors flex items-center gap-1 group truncate"
                  >
                    {repo.name}
                    <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                  {repo.isPrivate && (
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0 shrink-0">
                      Private
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span
                      className="size-2 rounded-full inline-block"
                      style={{
                        backgroundColor:
                          repo.language === "TypeScript"
                            ? "#3178c6"
                            : repo.language === "Python"
                              ? "#3572A5"
                              : repo.language === "Go"
                                ? "#00ADD8"
                                : repo.language === "Rust"
                                  ? "#dea584"
                                  : repo.language === "JavaScript"
                                    ? "#f1e05a"
                                    : repo.language === "Java"
                                      ? "#b07219"
                                      : "#844fba",
                      }}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Star className="size-3 text-amber-500" />
                    {repo.stars}
                  </span>
                  <span>{formatRelativeTime(repo.updatedAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
