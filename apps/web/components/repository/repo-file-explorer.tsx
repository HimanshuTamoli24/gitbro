"use client";

import { useState } from "react";
import {
  Folder,
  FileCode,
  FileText,
  Search,
  Star,
  Clock,
  ChevronRight,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";

interface FileEntry {
  name: string;
  type: "folder" | "file";
  size?: string;
  updatedAt: string;
  commitMsg: string;
}

const DUMMY_FILES: FileEntry[] = [
  {
    name: "apps",
    type: "folder",
    updatedAt: "15 mins ago",
    commitMsg: "feat: repository details page",
  },
  {
    name: "packages",
    type: "folder",
    updatedAt: "1 hour ago",
    commitMsg: "fix: corsair type exports",
  },
  {
    name: ".gitignore",
    type: "file",
    size: "452 B",
    updatedAt: "2 weeks ago",
    commitMsg: "initial commit",
  },
  {
    name: "package.json",
    type: "file",
    size: "3.2 KB",
    updatedAt: "Yesterday",
    commitMsg: "bump packages",
  },
  {
    name: "README.md",
    type: "file",
    size: "1.4 KB",
    updatedAt: "3 days ago",
    commitMsg: "update docs",
  },
  {
    name: "turbo.json",
    type: "file",
    size: "820 B",
    updatedAt: "1 week ago",
    commitMsg: "configure turbo build pipeline",
  },
  {
    name: "Dockerfile",
    type: "file",
    size: "1.1 KB",
    updatedAt: "1 month ago",
    commitMsg: "add multi-stage docker build",
  },
];

export function RepoFileExplorer() {
  const [search, setSearch] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>(["root"]);
  const [selectedFile, setSelectedFile] = useState<string | null>("README.md");

  const filteredFiles = DUMMY_FILES.filter((f) =>
    search ? f.name.toLowerCase().includes(search.toLowerCase()) : true,
  );

  return (
    <Card className="rounded-xl border border-border bg-card shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Folder className="size-4 text-amber-500" />
            File Explorer
          </CardTitle>
          <CardDescription className="text-xs">
            Browse files, inspect code structure, and preview key configs.
          </CardDescription>
        </div>

        {/* Quick File Jump & Search */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7 h-7 text-xs rounded-lg bg-muted/40 border-border"
            />
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-[11px] px-2 rounded-lg border-border"
              onClick={() => setSelectedFile("README.md")}
            >
              README.md
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-[11px] px-2 rounded-lg border-border"
              onClick={() => setSelectedFile("package.json")}
            >
              package.json
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-[11px] px-2 rounded-lg border-border"
              onClick={() => setSelectedFile("Dockerfile")}
            >
              Dockerfile
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-border/60">
        {/* Left File Tree */}
        <div className="md:col-span-2 divide-y divide-border/40 max-h-[420px] overflow-y-auto">
          {/* Breadcrumb Navigation */}
          <div className="p-2.5 bg-muted/30 text-xs text-muted-foreground flex items-center gap-1 font-mono">
            {currentPath.map((folder, i) => (
              <span key={folder} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-3 text-border" />}
                <span
                  className={i === currentPath.length - 1 ? "text-foreground font-semibold" : ""}
                >
                  {folder}
                </span>
              </span>
            ))}
          </div>

          {filteredFiles.map((file) => (
            <div
              key={file.name}
              onClick={() => {
                if (file.type === "file") setSelectedFile(file.name);
              }}
              className={`p-2.5 flex items-center justify-between gap-2 text-xs cursor-pointer transition-colors ${
                selectedFile === file.name
                  ? "bg-primary/10 text-primary font-semibold"
                  : "hover:bg-muted/30 text-foreground"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {file.type === "folder" ? (
                  <Folder className="size-4 text-amber-500 shrink-0" />
                ) : (
                  <FileCode className="size-4 text-blue-500 shrink-0" />
                )}
                <span className="truncate">{file.name}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0 text-[11px] text-muted-foreground">
                {file.size && <span className="font-mono text-[10px]">{file.size}</span>}
                <span>{file.updatedAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Code Preview Panel */}
        <div className="md:col-span-3 p-4 bg-muted/20 flex flex-col gap-3 min-h-[300px]">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <span className="text-xs font-semibold font-mono flex items-center gap-1.5">
              <FileText className="size-3.5 text-primary" />
              {selectedFile || "Select a file to preview"}
            </span>

            <Button
              size="sm"
              variant="ghost"
              className="size-7 p-0 rounded-lg text-muted-foreground"
            >
              <Download className="size-3.5" />
            </Button>
          </div>

          <pre className="p-3 rounded-lg bg-background border border-border font-mono text-[11px] text-foreground leading-relaxed overflow-x-auto">
            {selectedFile === "README.md"
              ? `# GitBro Repository Workspace

A minimal, high-performance workspace dashboard for managing repositories.

- Built with Next.js App Router, tRPC & Corsair Engine
- Dynamic 12px rounded clean UI
- Integrated AI analysis & PR automation`
              : selectedFile === "package.json"
                ? `{
  "name": "gitbro",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "corsair": "^0.1.109",
    "next": "^14.2.0",
    "react": "^18.3.0"
  }
}`
                : `# Production Multi-stage Dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]`}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
