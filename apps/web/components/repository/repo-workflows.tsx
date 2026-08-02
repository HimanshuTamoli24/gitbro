"use client";

import { Workflow, CheckCircle2, XCircle, Clock, Play, RotateCw, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

interface WorkflowRun {
  id: string;
  name: string;
  status: "success" | "failure" | "in_progress";
  duration: string;
  branch: string;
  trigger: string;
  commitHash: string;
  startedBy: string;
  startedAt: string;
}

const DUMMY_WORKFLOWS: WorkflowRun[] = [
  {
    id: "run_1",
    name: "CI / Build & Typecheck (Next.js & tRPC)",
    status: "success",
    duration: "1m 12s",
    branch: "main",
    trigger: "push",
    commitHash: "a8f31b9",
    startedBy: "HimanshuTamoli24",
    startedAt: "15 mins ago",
  },
  {
    id: "run_2",
    name: "Corsair OAuth Key Rotation Test",
    status: "success",
    duration: "45s",
    branch: "main",
    trigger: "schedule",
    commitHash: "e4c901d",
    startedBy: "github-actions[bot]",
    startedAt: "2 hours ago",
  },
  {
    id: "run_3",
    name: "Deploy Staging Environment",
    status: "in_progress",
    duration: "30s running",
    branch: "feat/repo-details-ui",
    trigger: "workflow_dispatch",
    commitHash: "39a01f",
    startedBy: "HimanshuTamoli24",
    startedAt: "Just now",
  },
];

export function RepoWorkflows() {
  return (
    <Card className="rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60 flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Workflow className="size-4 text-emerald-500" />
            GitHub Actions Workflows
          </CardTitle>
          <CardDescription className="text-xs">
            Monitor automated build, test, and deployment pipelines.
          </CardDescription>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="h-7 text-xs px-2.5 rounded-lg border-border gap-1"
        >
          <Play className="size-3 text-emerald-500" />
          Run Workflow
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {DUMMY_WORKFLOWS.map((w) => (
            <div
              key={w.id}
              className="p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="mt-0.5 shrink-0">
                  {w.status === "success" ? (
                    <CheckCircle2 className="size-4 text-emerald-500" />
                  ) : w.status === "failure" ? (
                    <XCircle className="size-4 text-rose-500" />
                  ) : (
                    <Clock className="size-4 text-amber-500 animate-spin" />
                  )}
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-xs text-foreground hover:text-primary cursor-pointer">
                      {w.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] px-1.5 py-0 rounded-md font-mono bg-muted/40"
                    >
                      {w.branch} @ {w.commitHash}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>
                      Triggered by {w.startedBy} ({w.trigger})
                    </span>
                    <span>•</span>
                    <span>Duration: {w.duration}</span>
                    <span>•</span>
                    <span>{w.startedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-[11px] px-2.5 rounded-lg border-border gap-1"
                >
                  <FileText className="size-3 text-muted-foreground" />
                  Logs
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-[11px] px-2.5 rounded-lg gap-1"
                >
                  <RotateCw className="size-3" />
                  Re-run
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
