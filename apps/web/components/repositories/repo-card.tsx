"use client";

import {
  ArrowRight,
  CircleDot,
  ExternalLink,
  GitFork,
  Github,
  Globe,
  Lock,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";

import type { Repository } from "~/lib/dummy-data";
import { ButtonGroup } from "@repo/ui/components/ui/button-group";
import Avatar from "boring-avatars";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
};

function formatRelativeTime(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);

  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;

  return `${Math.floor(diff / 30)} months ago`;
}

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  const router = useRouter();

  const openGithub = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(repo.url, "_blank");
  };

  return (
    <Card
      onClick={() => router.push(`/repositories/${encodeURIComponent(repo.name)}`)}
      className="
      group
      flex
      h-full
      cursor-pointer
      flex-col
      rounded-2xl
      border-2
      transition-all
      duration-200
 
      hover:outline-primary/50
      hover:shadow-lg
    "
    >
      {/* HEADER */}

      <CardHeader className="pb-5 border-dashed border-b">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 min-w-0 flex-1">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted">
              <Avatar
                name={repo.name}
                colors={["#36173d", "#ff4845", "#ff745f", "#ffc55f", "#ffec5e"]}
                variant="marble"
              />{" "}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="truncate text-base font-semibold transition-colors group-hover:text-primary">
                  {repo.name}
                </CardTitle>
              </div>

              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {repo.description || "No description available."}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* CONTENT */}

      <CardContent className="flex-1 px-6 py-4">
        <div className="grid grid-cols-3 gap-4">
          {/* Language */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Language</p>

            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{
                  backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#6b7280",
                }}
              />

              <span className="text-sm font-medium">{repo.language}</span>
            </div>
          </div>

          {/* Issues */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Issues</p>

            <div className="flex items-center gap-2">
              <CircleDot className="size-4 text-orange-500" />
              <span className="text-sm font-medium">{repo.openIssues}</span>
            </div>
          </div>

          {/* Forks */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Forks</p>

            <div className="flex items-center gap-2">
              <GitFork className="size-4 text-blue-500" />
              <span className="text-sm font-medium">{repo.forks}</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* FOOTER */}

      <CardFooter className="mt-auto border-t">
        <div className="flex w-full items-center justify-between">
          <ButtonGroup>
            <Button
              variant="outline"
              size="sm"
              onClick={openGithub}
              tooltip={`Open on GitHub: ${repo.url}`}
            >
              <Github className="size-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-sm text-muted-foreground relative"
              tooltip={`${repo.stars.toLocaleString()} Stars`}
            >
              <Star className="size-5 text-yellow-500 " />
              {repo.stars.toLocaleString()}
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1 text-sm text-muted-foreground"
              tooltip={repo.isPrivate ? "Private Repository" : "Public Repository"}
            >
              {repo.isPrivate ? (
                <Lock className="size-3 font-bold" />
              ) : (
                <Globe className="size-3 font-bold" />
              )}
            </Button>
          </ButtonGroup>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(repo.updatedAt)}
            </span>

            <ArrowRight
              className="
                size-4
                opacity-0
                transition-all
                duration-200
                group-hover:translate-x-1
                group-hover:opacity-100
              "
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
