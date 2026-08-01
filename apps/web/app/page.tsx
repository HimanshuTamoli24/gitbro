"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowRight,
  Github,
  ExternalLink,
  Star,
  GitFork,
  Lock,
  Globe,
  FolderGit2,
  UserCheck,
  LogOut,
} from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

import { api } from "~/trpc/server";
import { frontendEnv } from "@repo/env/client";
import { useAuth } from "~/hooks/useAuth";

interface RepoItem {
  name: string;
  url: string;
  description?: string;
  stars?: number;
  forks?: number;
  language?: string;
  isPrivate?: boolean;
}

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [health, setHealth] = useState<{ status: string } | null>(null);
  const { user, signOut } = useAuth();

  const [repos, setRepos] = useState<RepoItem[]>([]);
  const [isGithubConnected, setIsGithubConnected] = useState<boolean>(false);
  const [isRepoLoading, setIsRepoLoading] = useState<boolean>(false);

  async function checkHealth() {
    setLoading(true);
    setError(null);

    try {
      const data = await api.health.getHealth.query();
      setHealth(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  const fetchRepos = async () => {
    if (!user) return;
    setIsRepoLoading(true);
    try {
      const data = await api.github.repo.query();
      setIsGithubConnected(data.connected);
      setRepos(data.repos);
    } catch (e) {
      console.warn("Failed to fetch repositories:", e);
      setIsGithubConnected(false);
      setRepos([]);
    } finally {
      setIsRepoLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchRepos();
    } else {
      setRepos([]);
      setIsGithubConnected(false);
    }
  }, [user]);

  const handleConnectGithub = async () => {
    try {
      const res = await api.github.connectGithub.query();
      if (res?.url) {
        window.location.href = res.url;
      }
    } catch (err) {
      console.error("Connect GitHub Error:", err);
      window.location.href = "/connect";
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Top Navbar */}
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <FolderGit2 className="h-6 w-6 text-primary" />
            <span>Gitbro</span>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground hidden sm:inline-block">
                  {user.email ?? user.id}
                </span>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" className="font-semibold">
                  <UserCheck className="h-4 w-4 mr-1" />
                  Sign In / Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-12 space-y-12">
        {/* Main Grid */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Hero & Info */}
          <section className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div>
              <span className="mb-4 inline-flex w-fit rounded-full border px-3 py-1 text-xs font-medium bg-muted">
                Production Ready
              </span>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Full Stack
                <br />
                <span className="text-primary">tRPC + Corsair Monorepo</span>
              </h1>

              <p className="mt-4 text-muted-foreground text-base">
                Manage your GitHub integration seamlessly. Powered by Next.js, tRPC, PostgreSQL, and
                Corsair integration engine.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Feature title="Next.js App Router" />
              <Feature title="End-to-End Type Safety" />
              <Feature title="Corsair OAuth Engine" />
              <Feature title="Supabase Session Auth" />
              <Feature title="Tailwind CSS v4" />
              <Feature title="Health Check API" />
            </div>

            {/* Connection Status Card */}
            <Card className="border shadow-sm mt-4">
              <CardHeader className="py-4">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Backend Status</span>
                  {loading ? (
                    <span className="flex items-center gap-1 text-amber-500 text-xs font-normal">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking...
                    </span>
                  ) : error ? (
                    <span className="flex items-center gap-1 text-red-500 text-xs font-normal">
                      <AlertCircle className="h-3.5 w-3.5" /> Offline
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-normal">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Connected
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0 text-xs">
                <Row
                  label="API Base"
                  value={frontendEnv.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}
                />
                <Row
                  label="Auth User"
                  value={user?.email ?? (user ? "Logged In" : "Not Logged In")}
                />
                <Row
                  label="GitHub Status"
                  value={
                    user ? (isGithubConnected ? "Connected" : "Not Connected") : "Auth Required"
                  }
                />
              </CardContent>
            </Card>
          </section>

          {/* Right Column: GitHub Repositories or Connection Cards */}
          <section className="lg:col-span-7 flex flex-col justify-start">
            {!user ? (
              // Unauthenticated Card
              <Card className="w-full shadow-lg border">
                <CardHeader className="text-center space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Github className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Sign In to View Repositories</CardTitle>
                  <CardDescription>
                    Log in with your account to connect your GitHub profile and view your
                    repositories.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pt-2 pb-6">
                  <Link href="/login">
                    <Button size="lg" className="gap-2 font-semibold px-8">
                      Sign In / Create Account
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : !isGithubConnected ? (
              // Authenticated but GitHub not connected Card
              <Card className="w-full shadow-lg border">
                <CardHeader className="text-center space-y-2">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Github className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Connect Your GitHub Account</CardTitle>
                  <CardDescription>
                    Link your GitHub account to Gitbro to fetch and display your personal
                    repositories.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-2">
                  <div className="rounded-lg border bg-muted/40 p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Logged in as:</span>
                      <span className="font-medium text-foreground">{user.email ?? user.id}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>GitHub Integration:</span>
                      <span className="font-medium text-amber-600 dark:text-amber-400">
                        Disconnected
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleConnectGithub}
                    size="lg"
                    className="w-full py-6 font-semibold gap-2"
                  >
                    <Github className="h-5 w-5" />
                    Connect GitHub Account
                    <ExternalLink className="h-4 w-4 ml-1 opacity-70" />
                  </Button>
                </CardContent>
              </Card>
            ) : (
              // Authenticated and GitHub connected Repositories List
              <Card className="w-full shadow-lg border">
                <CardHeader className="flex flex-row items-center justify-between pb-4 border-b">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <Github className="h-5 w-5" />
                      Your GitHub Repositories
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Fetched live via Corsair GitHub plugin ({repos.length} repositories)
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={fetchRepos} disabled={isRepoLoading}>
                    <RefreshCw className={`h-4 w-4 mr-1 ${isRepoLoading ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                </CardHeader>

                <CardContent className="pt-6">
                  {isRepoLoading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span>Loading your GitHub repositories...</span>
                    </div>
                  ) : repos.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground space-y-2">
                      <FolderGit2 className="h-10 w-10 mx-auto opacity-50" />
                      <p className="font-medium">No repositories found.</p>
                      <p className="text-xs">Create a repository on GitHub or check permissions.</p>
                    </div>
                  ) : (
                    <div className="grid gap-3 max-h-[520px] overflow-y-auto pr-1">
                      {repos.map((repo) => (
                        <div
                          key={repo.name}
                          className="flex flex-col justify-between rounded-lg border p-4 hover:border-primary/50 transition-colors bg-card/60 gap-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold text-foreground hover:text-primary transition-colors flex items-center gap-1.5 group"
                              >
                                <span>{repo.name}</span>
                                <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </a>
                            </div>

                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border bg-muted shrink-0">
                              {repo.isPrivate ? (
                                <>
                                  <Lock className="h-3 w-3 text-amber-500" /> Private
                                </>
                              ) : (
                                <>
                                  <Globe className="h-3 w-3 text-emerald-500" /> Public
                                </>
                              )}
                            </span>
                          </div>

                          {repo.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {repo.description}
                            </p>
                          )}

                          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                            {repo.language && (
                              <span className="flex items-center gap-1 font-medium text-foreground/80">
                                <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                                {repo.language}
                              </span>
                            )}
                            {typeof repo.stars === "number" && (
                              <span className="flex items-center gap-1">
                                <Star className="h-3.5 w-3.5 text-amber-500" />
                                {repo.stars}
                              </span>
                            )}
                            {typeof repo.forks === "number" && (
                              <span className="flex items-center gap-1">
                                <GitFork className="h-3.5 w-3.5" />
                                {repo.forks}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Feature({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <ArrowRight className="h-4 w-4 text-primary shrink-0" />
      <span>{title}</span>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <span className="text-muted-foreground">{label}</span>
      <code className="text-xs font-mono">{value}</code>
    </div>
  );
}
