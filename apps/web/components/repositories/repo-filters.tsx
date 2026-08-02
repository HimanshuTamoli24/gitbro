"use client";

import { Search, LayoutGrid, List } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { Button } from "@repo/ui/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

interface RepoFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  visibility: "all" | "public" | "private";
  onVisibilityChange: (value: "all" | "public" | "private") => void;
  sort: "updated" | "stars" | "name";
  onSortChange: (value: "updated" | "stars" | "name") => void;
  totalCount: number;
  viewMode: "cards" | "table";
  onViewModeChange: (mode: "cards" | "table") => void;
}

export function RepoFilters({
  search,
  onSearchChange,
  visibility,
  onVisibilityChange,
  sort,
  onSortChange,
  totalCount,
  viewMode,
  onViewModeChange,
}: RepoFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {totalCount} {totalCount === 1 ? "repository" : "repositories"}
        </span>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Visibility Tabs */}
        <Tabs
          value={visibility}
          onValueChange={(v) => onVisibilityChange(v as "all" | "public" | "private")}
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Sort Select */}
        <Select value={sort} onValueChange={(v) => onSortChange(v as "updated" | "stars" | "name")}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="updated">Last updated</SelectItem>
              <SelectItem value="stars">Stars</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Cards vs Table View Mode Switcher */}
        <div className="flex items-center gap-0.5 bg-muted p-1 rounded-lg border border-border">
          <Button
            size="sm"
            variant={viewMode === "cards" ? "secondary" : "ghost"}
            className={`h-7 px-2 text-xs gap-1 rounded-md ${
              viewMode === "cards"
                ? "bg-background shadow-xs text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
            onClick={() => onViewModeChange("cards")}
            title="Grid / Cards View"
          >
            <LayoutGrid className="size-3.5" />
            <span className="hidden sm:inline">Cards</span>
          </Button>

          <Button
            size="sm"
            variant={viewMode === "table" ? "secondary" : "ghost"}
            className={`h-7 px-2 text-xs gap-1 rounded-md ${
              viewMode === "table"
                ? "bg-background shadow-xs text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
            onClick={() => onViewModeChange("table")}
            title="Table View"
          >
            <List className="size-3.5" />
            <span className="hidden sm:inline">Table</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
