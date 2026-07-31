"use client";

import { CircleDot, CircleCheck, MessageSquare } from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";
import type { Issue } from "~/lib/dummy-data";

interface IssueCardProps {
  issue: Issue;
}

function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export function IssueCard({ issue }: IssueCardProps) {
  const isOpen = issue.state === "open";

  return (
    <div className="flex items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50">
      {/* Status Icon */}
      <div className="mt-0.5 shrink-0">
        {isOpen ? (
          <CircleDot className="size-4 text-emerald-500" />
        ) : (
          <CircleCheck className="size-4 text-purple-500" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium leading-snug">{issue.title}</h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal">
                {issue.repoName}
              </Badge>
              {issue.labels.map((label) => (
                <span
                  key={label.name}
                  className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${label.color}20`,
                    color: label.color,
                    border: `1px solid ${label.color}40`,
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          </div>

          {/* Comments */}
          {issue.comments > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <MessageSquare className="size-3" />
              {issue.comments}
            </span>
          )}
        </div>

        {/* Meta */}
        <p className="mt-2 text-xs text-muted-foreground">
          #{issue.id} opened {formatRelativeTime(issue.createdAt)} by{" "}
          <span className="font-medium text-foreground/80">{issue.author}</span>
          {issue.assignee && (
            <>
              {" "}
              · assigned to <span className="font-medium text-foreground/80">{issue.assignee}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
