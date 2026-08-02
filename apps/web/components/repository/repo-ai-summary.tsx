"use client";

import { useState } from "react";
import {
  Sparkles,
  FileText,
  Bug,
  Tag,
  GitCommit,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

interface RepoAISummaryProps {
  repoName: string;
  onActionTrigger?: (action: string) => void;
}

export function RepoAISummary({ repoName, onActionTrigger }: RepoAISummaryProps) {
  const [activeOutput, setActiveOutput] = useState<string | null>(null);

  const handleAction = (actionName: string) => {
    setActiveOutput(actionName);
    onActionTrigger?.(actionName);
  };

  return (
    <Card className="rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Sparkles className="size-4" />
          </div>
          <div>
            <CardTitle className="text-base font-bold flex items-center gap-2">
              AI Repository Intelligence Summary
            </CardTitle>
            <CardDescription className="text-xs">
              Synthesized from active commits, PR activity, issues, and workflow execution.
            </CardDescription>
          </div>
        </div>

        <Badge
          variant="outline"
          className="text-xs px-2.5 py-1 rounded-full border-primary/30 bg-primary/5 text-primary gap-1"
        >
          <TrendingUp className="size-3" />
          High Health Score (96/100)
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 flex flex-col gap-5">
        {/* Core Summary Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-lg border border-border/80 bg-muted/30 flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              Repository Purpose
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Full-stack developer command center for managing GitHub repositories, tracking CI/CD
              workflows, and automating code reviews via Corsair.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-border/80 bg-muted/30 flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <TrendingUp className="size-3.5 text-blue-500" />
              Recent Development
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Shipped real-time weekly commit aggregation, tRPC GitHub service routes, and minimal
              12px dashboard layout with zero latency.
            </p>
          </div>

          <div className="p-3.5 rounded-lg border border-border/80 bg-muted/30 flex flex-col gap-1.5">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <AlertTriangle className="size-3.5 text-amber-500" />
              Potential Risks & Pending
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              2 PRs awaiting review approval. Moderate API rate limiting risk on non-authenticated
              stats endpoints.
            </p>
          </div>
        </div>

        {/* Quick Insights List */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-lg border border-border/60 bg-card text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Active Contributors:</span>
            <span>HimanshuTamoli24, dependabot, alex-dev</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">Suggested Task:</span>
            <span className="text-primary">Merge PR #14 (OAuth callback handler refinement)</span>
          </div>
        </div>

        {/* AI Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-border/60">
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs rounded-lg gap-1.5 border-border hover:border-primary/40"
            onClick={() => handleAction("Explain Repository")}
          >
            <HelpCircle className="size-3.5 text-primary" />
            Explain Repository
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs rounded-lg gap-1.5 border-border hover:border-primary/40"
            onClick={() => handleAction("Generate README")}
          >
            <FileText className="size-3.5 text-blue-500" />
            Generate README
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs rounded-lg gap-1.5 border-border hover:border-primary/40"
            onClick={() => handleAction("Find Bugs")}
          >
            <Bug className="size-3.5 text-rose-500" />
            Find Bugs
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs rounded-lg gap-1.5 border-border hover:border-primary/40"
            onClick={() => handleAction("Generate Release Notes")}
          >
            <Tag className="size-3.5 text-purple-500" />
            Generate Release Notes
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs rounded-lg gap-1.5 border-border hover:border-primary/40"
            onClick={() => handleAction("Summarize Recent Commits")}
          >
            <GitCommit className="size-3.5 text-emerald-500" />
            Summarize Commits
          </Button>
        </div>

        {/* Active AI Output Drawer if triggered */}
        {activeOutput && (
          <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 text-xs text-foreground flex flex-col gap-2 relative">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> AI Response: {activeOutput}
              </span>
              <button
                onClick={() => setActiveOutput(null)}
                className="text-muted-foreground hover:text-foreground text-xs"
              >
                Close
              </button>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Synthesizing latest codebase graph for {repoName}... Everything is optimized.{" "}
              {activeOutput} report generated with 0 vulnerabilities detected.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
