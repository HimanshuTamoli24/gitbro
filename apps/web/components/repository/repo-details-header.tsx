"use client";

import { useState } from "react";
import {
  FolderGit2,
  Lock,
  Globe,
  GitBranch,
  ExternalLink,
  Copy,
  Check,
  Settings,
  Search,
  Sparkles,
  ChevronDown,
  Terminal,
} from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";

interface RepoDetailsHeaderProps {
  owner: string;
  repoName: string;
  description?: string;
  isPrivate?: boolean;
  defaultBranch?: string;
  language?: string;
  updatedAt?: string;
  url?: string;
  onSearchChange?: (val: string) => void;
  searchValue?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  JavaScript: "#f1e05a",
  Java: "#b07219",
};

export function RepoDetailsHeader({
  owner,
  repoName,
  description = "A minimal, high-performance workspace dashboard for managing repositories.",
  isPrivate = false,
  defaultBranch = "main",
  language = "TypeScript",
  updatedAt = "2 hours ago",
  url = `https://github.com/${owner}/${repoName}`,
  onSearchChange,
  searchValue = "",
}: RepoDetailsHeaderProps) {
  const [copied, setCopied] = useState(false);
  const cloneUrl = `https://github.com/${owner}/${repoName}.git`;

  const copyCloneCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-background border-b border-border/80 pb-5 pt-1 px-1 flex flex-col gap-4">
      {/* Top Meta Navigation & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Avatar, Breadcrumbs, Badges */}
        <div className="flex items-center gap-3">
          <div className="size-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-lg shrink-0 shadow-xs">
            <FolderGit2 className="size-5" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {owner}
              </span>
              <span className="text-muted-foreground/40 font-mono">/</span>
              <h1 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
                {repoName}
              </h1>

              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 font-medium rounded-full bg-muted/50 border-border gap-1 text-muted-foreground"
              >
                {isPrivate ? <Lock className="size-3" /> : <Globe className="size-3" />}
                {isPrivate ? "Private" : "Public"}
              </Badge>

              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 font-medium rounded-full gap-1 border border-border/50 text-foreground/80"
              >
                <GitBranch className="size-3 text-muted-foreground" />
                {defaultBranch}
              </Badge>
            </div>

            {description && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-2xl">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Clone Button, GitHub Link, Quick Search, Settings */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Quick Repo Search */}
          <div className="relative w-44 md:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search inside repo..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-8 h-8 text-xs rounded-lg bg-muted/40 border-border focus:bg-background transition-colors"
            />
          </div>

          {/* Clone Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="h-8 text-xs font-medium gap-1.5 rounded-lg border-border"
              >
                <Terminal className="size-3.5 text-muted-foreground" />
                Clone
                <ChevronDown className="size-3 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-xl p-2">
              <DropdownMenuLabel className="text-xs font-semibold">
                Clone Repository
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2 flex flex-col gap-2">
                <span className="text-[11px] text-muted-foreground">HTTPS</span>
                <div className="flex items-center gap-1.5 bg-muted/60 p-1.5 rounded-md border border-border font-mono text-[11px]">
                  <span className="truncate flex-1 text-foreground">{cloneUrl}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="size-6 shrink-0"
                    onClick={() => copyCloneCommand(`git clone ${cloneUrl}`)}
                  >
                    {copied ? (
                      <Check className="size-3 text-emerald-500" />
                    ) : (
                      <Copy className="size-3" />
                    )}
                  </Button>
                </div>
              </div>
              <DropdownMenuItem
                className="text-xs cursor-pointer rounded-lg"
                onClick={() => copyCloneCommand(`gh repo clone ${owner}/${repoName}`)}
              >
                Copy GitHub CLI command (`gh repo clone`)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Open on GitHub */}
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs font-medium gap-1.5 rounded-lg border-border"
            asChild
          >
            <a href={url} target="_blank" rel="noreferrer">
              <ExternalLink className="size-3.5 text-muted-foreground" />
              GitHub
            </a>
          </Button>

          {/* Repository Settings */}
          <Button
            size="sm"
            variant="ghost"
            className="size-8 p-0 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <Settings className="size-4" />
          </Button>
        </div>
      </div>

      {/* Language & Timestamp Bar */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/40 pt-3">
        <span className="flex items-center gap-1.5">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: LANGUAGE_COLORS[language] || "#6b7280" }}
          />
          <span className="font-medium text-foreground">{language}</span>
        </span>
        <span className="text-border">•</span>
        <span>Updated {updatedAt}</span>
        <span className="text-border">•</span>
        <span className="flex items-center gap-1 text-primary/90 font-medium">
          <Sparkles className="size-3" /> AI Insights Active
        </span>
      </div>
    </div>
  );
}
