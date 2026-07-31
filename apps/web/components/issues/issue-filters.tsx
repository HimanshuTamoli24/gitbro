"use client";

import { Search } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";

interface IssueFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: "all" | "open" | "closed";
  onStatusChange: (value: "all" | "open" | "closed") => void;
  openCount: number;
  closedCount: number;
}

export function IssueFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  openCount,
  closedCount,
}: IssueFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search issues..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Tabs value={status} onValueChange={(v) => onStatusChange(v as "all" | "open" | "closed")}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open" className="gap-1.5">
            Open
            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">
              {openCount}
            </span>
          </TabsTrigger>
          <TabsTrigger value="closed" className="gap-1.5">
            Closed
            <span className="rounded-full bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-medium text-purple-600">
              {closedCount}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
