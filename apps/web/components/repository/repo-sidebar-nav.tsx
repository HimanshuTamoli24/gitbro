"use client";

import {
  LayoutDashboard,
  FileCode,
  GitPullRequest,
  AlertCircle,
  GitCommit,
  GitBranch,
  Workflow,
  Tag,
  Users,
  BarChart2,
  Sparkles,
  Settings,
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

interface RepoSidebarNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts?: {
    prs?: number;
    issues?: number;
    commits?: number;
    branches?: number;
    workflows?: number;
  };
}

export function RepoSidebarNav({ activeTab, onTabChange, counts }: RepoSidebarNavProps) {
  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "files", label: "Files", icon: FileCode },
    { id: "pulls", label: "Pull Requests", icon: GitPullRequest, count: counts?.prs ?? 6 },
    { id: "issues", label: "Issues", icon: AlertCircle, count: counts?.issues ?? 14 },
    { id: "commits", label: "Commits", icon: GitCommit, count: counts?.commits ?? 1284 },
    { id: "branches", label: "Branches", icon: GitBranch, count: counts?.branches ?? 8 },
    { id: "actions", label: "Actions / Workflows", icon: Workflow, count: counts?.workflows ?? 3 },
    { id: "contributors", label: "Contributors", icon: Users },
    { id: "insights", label: "Insights", icon: BarChart2 },
    { id: "ai", label: "AI Assistant", icon: Sparkles, badge: "Pro" },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="w-full md:w-56 shrink-0 flex flex-col gap-1 pr-2 border-r border-border/60">
      <div className="px-2 py-1.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
        Navigation
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
              isActive
                ? "bg-primary/10 text-primary font-semibold shadow-2xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon className={`size-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span className="truncate">{item.label}</span>
            </div>

            {item.count !== undefined && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-muted border border-border/60">
                {item.count}
              </span>
            )}

            {item.badge && (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-primary/20 text-primary border border-primary/30 uppercase">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
