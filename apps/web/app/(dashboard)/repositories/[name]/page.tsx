"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { RepoDetailsHeader } from "~/components/repository/repo-details-header";
import { RepoSidebarNav } from "~/components/repository/repo-sidebar-nav";
import { RepoRightSidebar } from "~/components/repository/repo-right-sidebar";
import { RepoOverviewSection } from "~/components/repository/repo-overview-section";
import { RepoAISummary } from "~/components/repository/repo-ai-summary";
import { RepoPullRequests } from "~/components/repository/repo-pull-requests";
import { RepoIssues } from "~/components/repository/repo-issues";
import { RepoCommitsTable } from "~/components/repository/repo-commits-table";
import { RepoBranches } from "~/components/repository/repo-branches";
import { RepoWorkflows } from "~/components/repository/repo-workflows";
import { RepoFileExplorer } from "~/components/repository/repo-file-explorer";
import { RepoContributors } from "~/components/repository/repo-contributors";
import { RepoInsights } from "~/components/repository/repo-insights";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { Sparkles, Settings } from "lucide-react";

export default function RepositoryDetailsPage() {
  const params = useParams();
  const rawRepoName = (params?.name as string) || (params?.slug as string[])?.[0] || "Gitbro";
  const owner = "HimanshuTamoli24";

  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-5 max-w-[1600px] mx-auto w-full">
      {/* 1. TOP NAVIGATION HEADER */}
      <RepoDetailsHeader
        owner={owner}
        repoName={rawRepoName}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. MAIN WORKSPACE CONTAINER (LEFT NAV + CONTENT + RIGHT SIDEBAR) */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Sidebar Navigation */}
        <RepoSidebarNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Center Dynamic Content Area */}
        <main className="flex-1 min-w-0 flex flex-col gap-6 w-full">
          {activeTab === "overview" && (
            <>
              <RepoOverviewSection onNavigateTab={setActiveTab} />
              <RepoAISummary repoName={rawRepoName} />
              <RepoPullRequests />
              <RepoIssues />
            </>
          )}

          {activeTab === "files" && <RepoFileExplorer />}

          {activeTab === "pulls" && <RepoPullRequests />}

          {activeTab === "issues" && <RepoIssues />}

          {activeTab === "commits" && <RepoCommitsTable />}

          {activeTab === "branches" && <RepoBranches />}

          {activeTab === "actions" && <RepoWorkflows />}

          {activeTab === "contributors" && <RepoContributors />}

          {activeTab === "insights" && <RepoInsights />}

          {activeTab === "ai" && (
            <div className="flex flex-col gap-4">
              <RepoAISummary repoName={rawRepoName} />
            </div>
          )}

          {activeTab === "settings" && (
            <Card className="rounded-xl border border-border p-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                <Settings className="size-4" />
                Repository Settings
              </div>
              <p className="mt-2">
                Configure webhooks, environment secrets, branch protections, and team member
                permissions.
              </p>
            </Card>
          )}
        </main>

        {/* Right Quick Info Sidebar */}
        <RepoRightSidebar />
      </div>
    </div>
  );
}
