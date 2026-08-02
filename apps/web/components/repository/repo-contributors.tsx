"use client";

import { Users, GitCommit, GitPullRequest, AlertCircle, Award, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Badge } from "@repo/ui/components/ui/badge";

interface Contributor {
  name: string;
  avatar: string;
  role: string;
  commits: number;
  prs: number;
  issues: number;
}

const DUMMY_CONTRIBUTORS: Contributor[] = [
  {
    name: "HimanshuTamoli24",
    avatar: "HT",
    role: "Owner / Core Maintainer",
    commits: 412,
    prs: 28,
    issues: 14,
  },
  { name: "alex-dev", avatar: "AD", role: "Core Contributor", commits: 154, prs: 12, issues: 8 },
  { name: "sarah-code", avatar: "SC", role: "Frontend Maintainer", commits: 98, prs: 9, issues: 5 },
  {
    name: "dependabot[bot]",
    avatar: "DB",
    role: "Automated Bot",
    commits: 210,
    prs: 45,
    issues: 0,
  },
];

export function RepoContributors() {
  return (
    <Card className="rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60">
        <CardTitle className="text-base font-bold flex items-center gap-2">
          <Users className="size-4 text-purple-500" />
          Active Contributors
        </CardTitle>
        <CardDescription className="text-xs">
          Team members and contributors who have pushed code, opened PRs, or reviewed issues.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DUMMY_CONTRIBUTORS.map((c) => (
          <div
            key={c.name}
            className="p-3.5 rounded-xl border border-border/80 bg-muted/20 flex flex-col gap-3 hover:border-primary/30 hover:bg-card transition-all"
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-9 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-xs">
                  {c.avatar}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs text-foreground truncate">{c.name}</span>
                <span className="text-[10px] text-muted-foreground truncate">{c.role}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1 pt-2 border-t border-border/60 text-center">
              <div>
                <span className="text-xs font-bold text-foreground block">{c.commits}</span>
                <span className="text-[10px] text-muted-foreground block">Commits</span>
              </div>
              <div>
                <span className="text-xs font-bold text-foreground block">{c.prs}</span>
                <span className="text-[10px] text-muted-foreground block">PRs</span>
              </div>
              <div>
                <span className="text-xs font-bold text-foreground block">{c.issues}</span>
                <span className="text-[10px] text-muted-foreground block">Issues</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
