"use client";

import { useState } from "react";
import { GitCommit, Copy, Check, Sparkles, ExternalLink, GitBranch, FileCode } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

interface CommitRecord {
  hash: string;
  message: string;
  author: string;
  branch: string;
  date: string;
  filesChanged: number;
  insertions: number;
  deletions: number;
}

const DUMMY_COMMITS: CommitRecord[] = [
  {
    hash: "a8f31b9",
    message: "feat: aggregate weekly commits in GithubService via Corsair listCommits",
    author: "HimanshuTamoli24",
    branch: "main",
    date: "15 mins ago",
    filesChanged: 2,
    insertions: 54,
    deletions: 12,
  },
  {
    hash: "e4c901d",
    message: "fix: export CorsairInstance and CorsairTenant types for withTenant inference",
    author: "HimanshuTamoli24",
    branch: "main",
    date: "1 hour ago",
    filesChanged: 1,
    insertions: 8,
    deletions: 4,
  },
  {
    hash: "7b12aa4",
    message: "chore: update dependencies for @repo/corsair and @repo/services",
    author: "dependabot",
    branch: "main",
    date: "3 hours ago",
    filesChanged: 3,
    insertions: 14,
    deletions: 14,
  },
  {
    hash: "c2901ef",
    message: "docs: update API route specifications for tRPC githubRouter endpoints",
    author: "sarah-code",
    branch: "main",
    date: "Yesterday",
    filesChanged: 1,
    insertions: 22,
    deletions: 0,
  },
];

export function RepoCommitsTable() {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <Card className="rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <GitCommit className="size-4 text-blue-500" />
            Commits Timeline
          </CardTitle>
          <CardDescription className="text-xs">
            Recent commits pushed to default and active feature branches.
          </CardDescription>
        </div>

        <Badge variant="outline" className="text-xs px-2.5 py-1 rounded-full font-mono">
          1,284 total commits
        </Badge>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {DUMMY_COMMITS.map((commit) => (
            <div
              key={commit.hash}
              className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-muted/20 transition-colors"
            >
              {/* Commit Message & Author */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="size-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                  <GitCommit className="size-3.5" />
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-xs text-foreground hover:text-primary cursor-pointer truncate">
                      {commit.message}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 font-mono rounded-md bg-muted/40 gap-1"
                    >
                      <GitBranch className="size-2.5 text-muted-foreground" />
                      {commit.branch}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>
                      by <strong className="text-foreground">{commit.author}</strong>
                    </span>
                    <span>•</span>
                    <span>{commit.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[10px]">
                      <FileCode className="size-3 text-muted-foreground" />
                      {commit.filesChanged} files
                      <span className="text-emerald-500 font-semibold">+{commit.insertions}</span>
                      <span className="text-rose-500 font-semibold">-{commit.deletions}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Commit Hash & Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-[11px] font-mono px-2 rounded-lg border-border gap-1"
                  onClick={() => copyHash(commit.hash)}
                >
                  {copiedHash === commit.hash ? (
                    <Check className="size-3 text-emerald-500" />
                  ) : (
                    <Copy className="size-3 text-muted-foreground" />
                  )}
                  {commit.hash}
                </Button>

                <Button size="sm" variant="ghost" className="h-7 text-[11px] px-2 rounded-lg gap-1">
                  <Sparkles className="size-3 text-primary" />
                  Explain Commit
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="size-7 p-0 rounded-lg text-muted-foreground"
                >
                  <ExternalLink className="size-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
