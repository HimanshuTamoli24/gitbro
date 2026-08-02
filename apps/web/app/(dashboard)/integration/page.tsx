"use client";

import { useState } from "react";
import {
  Github,
  Gitlab,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Lock,
  Boxes,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { trpc } from "~/trpc/client";

// Custom SVG Icons for Bitbucket and Gitea
function BitbucketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.75 2.25c-.25 0-.45.18-.5.43l-2.02 18.29c-.04.38.25.73.63.78.04 0 .08 0 .12 0h17.04c.38 0 .7-.28.74-.66l2.02-18.41c.04-.38-.25-.73-.63-.78-.04 0-.08 0-.12 0H.75zm12.35 12.37H7.9l-1.07-5.91h7.87l-1.6 5.91z" />
    </svg>
  );
}

function GiteaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 3a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V15a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2.74A6.98 6.98 0 0 1 5 12a7 7 0 0 1 7-7z" />
    </svg>
  );
}

interface ProviderPlugin {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  status: "active" | "coming_soon";
  badge?: string;
  isPopular?: boolean;
  color: string;
}

const INTEGRATION_PLUGINS: ProviderPlugin[] = [
  {
    id: "github",
    name: "GitHub Cloud & Enterprise",
    category: "Source Control",
    description:
      "Sync repositories, pull requests, issue tracking, commit graphs, and AI PR reviews.",
    icon: Github,
    status: "active",
    isPopular: true,
    color: "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900",
  },
  {
    id: "gitlab",
    name: "GitLab CI/CD & Self-Hosted",
    category: "Source Control",
    description:
      "Connect your GitLab groups, MR workflows, pipeline stages, and security scanning.",
    icon: Gitlab,
    status: "coming_soon",
    badge: "Coming Soon",
    color: "bg-orange-600 text-white",
  },
  {
    id: "gitea",
    name: "Gitea Self-Hosted Git",
    category: "Self-Hosted",
    description:
      "Lightweight self-hosted Git server integration for private codebases & internal teams.",
    icon: GiteaIcon,
    status: "coming_soon",
    badge: "Coming Soon",
    color: "bg-emerald-600 text-white",
  },
  {
    id: "bitbucket",
    name: "Bitbucket Data Center",
    category: "Source Control",
    description:
      "Atlassian Bitbucket integration with Jira link syncing and workspace PR automations.",
    icon: BitbucketIcon,
    status: "coming_soon",
    badge: "Coming Soon",
    color: "bg-blue-600 text-white",
  },
];

export default function ConnectIntegrationsPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const utils = trpc.useUtils();

  // tRPC query to retrieve OAuth Connect link for connected user
  const { data: repoData } = trpc.github.repo.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const isGithubConnected = repoData?.connected ?? false;

  const handleConnectGithub = async () => {
    try {
      setIsConnecting(true);
      const res = await utils.github.connectGithub.fetch();
      if (res?.url) {
        window.location.href = res.url;
        return;
      }
      window.location.href = "/api/auth/github";
    } catch (e) {
      console.error("Connect error:", e);
      window.location.href = "/api/auth/github";
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      {/* HEADER HERO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
            <Boxes className="size-4" /> Integrations & Plugin Hub
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Connect Git Providers & Workspace Tools
          </h1>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm">
            GitBro seamlessly orchestrates all your codebase providers from one centralized
            dashboard. Connect your active accounts below.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="px-3 py-1.5 rounded-full border-primary/30 text-xs gap-1.5 bg-primary/5"
          >
            <ShieldCheck className="size-3.5 text-primary" />
            OAuth 2.0 Encrypted
          </Badge>
        </div>
      </div>

      {/* PLUGINS GRID */}
      <div className="grid gap-6 md:grid-cols-2">
        {INTEGRATION_PLUGINS.map((plugin) => {
          const Icon = plugin.icon;
          const isActive = plugin.id === "github";
          const isConnected = isActive && isGithubConnected;

          return (
            <Card
              key={plugin.id}
              className={`rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between ${
                isConnected
                  ? "border-emerald-500/50 bg-emerald-500/5 dark:bg-emerald-950/10 shadow-sm"
                  : plugin.status === "coming_soon"
                    ? "border-border/60 bg-card/60 opacity-85 hover:opacity-100"
                    : "border-border/80 bg-card hover:border-primary/50 hover:shadow-md"
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${plugin.color} shadow-xs`}>
                      <Icon className="size-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base font-bold">{plugin.name}</CardTitle>
                        {plugin.isPopular && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-2 py-0 rounded-full font-semibold"
                          >
                            Primary
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-xs mt-0.5 font-mono text-muted-foreground">
                        {plugin.category}
                      </CardDescription>
                    </div>
                  </div>

                  {isConnected ? (
                    <Badge className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-full text-[11px] gap-1 px-2.5 py-0.5">
                      <CheckCircle2 className="size-3" /> Connected
                    </Badge>
                  ) : plugin.status === "coming_soon" ? (
                    <Badge
                      variant="outline"
                      className="text-[10px] rounded-full border-amber-500/40 text-amber-600 dark:text-amber-400 gap-1 bg-amber-500/10"
                    >
                      <Clock className="size-3" /> Coming Soon
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] rounded-full border-border">
                      Available
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 py-2">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {plugin.description}
                </p>

                {isActive && (
                  <div className="mt-4 p-3 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium flex items-center gap-1.5">
                      <Zap className="size-3.5 text-amber-500" />
                      Live Sync & Webhooks
                    </span>
                    <span className="font-semibold text-foreground font-mono">
                      {isConnected ? "Active (Synced)" : "Ready to Link"}
                    </span>
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-4 border-t border-border/50">
                {isActive ? (
                  isConnected ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="size-4" /> Account linked & authorized
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleConnectGithub}
                        disabled={isConnecting}
                        className="rounded-lg text-xs"
                      >
                        Reconnect Account
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={handleConnectGithub}
                      disabled={isConnecting}
                      className="w-full rounded-xl font-bold gap-2 text-sm"
                    >
                      <Github className="size-4" />
                      {isConnecting ? "Redirecting to GitHub..." : "Connect GitHub Account"}
                      <ArrowUpRight className="size-4" />
                    </Button>
                  )
                ) : (
                  <Button
                    variant="secondary"
                    disabled
                    className="w-full rounded-xl text-xs gap-1.5 opacity-60"
                  >
                    <Lock className="size-3.5" /> Provider Coming Soon
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
