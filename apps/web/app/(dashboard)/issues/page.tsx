"use client";

import { useState } from "react";
import { CircleDot } from "lucide-react";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { useIssues } from "~/hooks/useIssues";
import { DUMMY_ISSUES } from "~/lib/dummy-data";
import { IssueCard } from "~/components/issues/issue-card";
import { IssueFilters } from "~/components/issues/issue-filters";

export default function IssuesPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "open" | "closed">("all");

  const { issues, isLoading } = useIssues({ search, status });

  const openCount = DUMMY_ISSUES.filter((i) => i.state === "open").length;
  const closedCount = DUMMY_ISSUES.filter((i) => i.state === "closed").length;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <CircleDot className="size-6" />
          Issues
        </h1>
        <p className="text-muted-foreground mt-1">Track issues across all your repositories</p>
      </div>

      <IssueFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        openCount={openCount}
        closedCount={closedCount}
      />

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-[100px] rounded-lg" />
          ))}
        </div>
      ) : issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CircleDot className="size-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium">No issues found</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {search
              ? `No results for "${search}". Try a different search term.`
              : "No issues match the current filters."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}
