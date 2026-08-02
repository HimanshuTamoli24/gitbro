"use client";

import { Star, GitFork, ExternalLink, Lock, Globe, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import type { Repository } from "~/lib/dummy-data";
import Avatar from "boring-avatars";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  HCL: "#844fba",
};

interface RepoTableProps {
  repositories: Repository[];
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}m ago`;
}

export function RepoTable({ repositories }: RepoTableProps) {
  const router = useRouter();

  return (
    <div className="w-full rounded-xl border border-border bg-card overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-10 py-2.5 px-3"></TableHead>
            <TableHead className="py-2.5 px-3">Repository</TableHead>
            <TableHead className="py-2.5 px-3">Visibility</TableHead>
            <TableHead className="py-2.5 px-3">Language</TableHead>
            <TableHead className="py-2.5 px-3 text-center">Stars</TableHead>
            <TableHead className="py-2.5 px-3 text-center">Forks</TableHead>
            <TableHead className="py-2.5 px-3 text-center">Issues</TableHead>
            <TableHead className="py-2.5 px-3 text-right">Updated</TableHead>
            <TableHead className="py-2.5 px-3 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repositories.map((repo) => {
            const handleRowClick = () => {
              router.push(`/repositories/${encodeURIComponent(repo.name)}`);
            };

            const handleOpenGitHub = (e: React.MouseEvent) => {
              e.stopPropagation();
              window.open(repo.url, "_blank", "noopener,noreferrer");
            };

            return (
              <TableRow
                key={repo.name}
                onClick={handleRowClick}
                className="hover:bg-muted/30 cursor-pointer transition-colors"
              >
                {/* Avatar */}
                <TableCell className="py-3 px-3">
                  <Avatar
                    size={28}
                    name={repo.name}
                    colors={["#36173d", "#ff4845", "#ff745f", "#ffc55f", "#ffec5e"]}
                    variant="marble"
                  />
                </TableCell>

                {/* Name & Description */}
                <TableCell className="py-3 px-3 max-w-xs">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground hover:text-primary transition-colors text-xs truncate">
                      {repo.name}
                    </span>
                    {repo.description && (
                      <span className="text-[11px] text-muted-foreground truncate">
                        {repo.description}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Visibility */}
                <TableCell className="py-3 px-3">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 rounded-full gap-1">
                    {repo.isPrivate ? (
                      <>
                        <Lock className="size-2.5" /> Private
                      </>
                    ) : (
                      <>
                        <Globe className="size-2.5" /> Public
                      </>
                    )}
                  </Badge>
                </TableCell>

                {/* Language */}
                <TableCell className="py-3 px-3">
                  {repo.language ? (
                    <span className="flex items-center gap-1.5 font-medium text-xs">
                      <span
                        className="size-2 rounded-full"
                        style={{
                          backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#6b7280",
                        }}
                      />
                      {repo.language}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>

                {/* Stars */}
                <TableCell className="py-3 px-3 text-center">
                  <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                    <Star className="size-3 text-amber-500" />
                    {repo.stars.toLocaleString()}
                  </span>
                </TableCell>

                {/* Forks */}
                <TableCell className="py-3 px-3 text-center text-muted-foreground text-xs">
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="size-3" />
                    {repo.forks.toLocaleString()}
                  </span>
                </TableCell>

                {/* Issues */}
                <TableCell className="py-3 px-3 text-center text-muted-foreground text-xs">
                  <span className="inline-flex items-center gap-1">
                    <AlertCircle className="size-3 text-amber-500" />
                    {repo.openIssues}
                  </span>
                </TableCell>

                {/* Updated */}
                <TableCell className="py-3 px-3 text-right text-muted-foreground font-mono text-[11px]">
                  {formatRelativeTime(repo.updatedAt)}
                </TableCell>

                {/* GitHub External Action */}
                <TableCell className="py-3 px-3 text-right">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-7 rounded-lg text-muted-foreground hover:text-foreground"
                    onClick={handleOpenGitHub}
                    tooltip={`Open on GitHub: ${repo.url}`}
                  >
                    <ExternalLink className="size-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
