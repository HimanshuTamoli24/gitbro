"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { AlertCircle, CheckCircle2, Github, Loader2, ExternalLink } from "lucide-react";
import { api } from "~/trpc/server";
import { useAuth } from "~/hooks/useAuth";

function ConnectGithubContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(searchParams.get("error"));
  const [success, setSuccess] = useState<boolean>(searchParams.get("status") === "success");

  const handleConnectGithub = async () => {
    setConnecting(true);
    setError(null);
    try {
      const res = await api.github.connectGithub.query();
      if (res?.url) {
        window.location.href = res.url;
      } else {
        throw new Error("No redirect URL returned from server.");
      }
    } catch (err: unknown) {
      console.error("Connect GitHub Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to initiate GitHub connection. Please try again.",
      );
      setConnecting(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border">
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Github className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight">Connect GitHub Account</CardTitle>
        <CardDescription>Authorize Gitbro to access your GitHub repositories</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {success && (
          <div className="flex items-center gap-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-600 border border-emerald-500/20 dark:text-emerald-400">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>GitHub account connected successfully!</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive border border-destructive/20">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="rounded-lg border bg-card p-4 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Logged in as:</span>
            <span className="font-medium text-foreground">
              {user?.email ?? user?.id ?? "Guest User"}
            </span>
          </div>
        </div>

        <Button
          onClick={handleConnectGithub}
          disabled={connecting}
          className="w-full py-6 font-semibold gap-2"
          size="lg"
        >
          {connecting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Connecting to GitHub...
            </>
          ) : (
            <>
              <Github className="h-5 w-5" />
              Connect GitHub Account
              <ExternalLink className="h-4 w-4 ml-1 opacity-70" />
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          You will be redirected to GitHub to authorize access.
        </p>
      </CardContent>
    </Card>
  );
}

export default function ConnectGithubPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <ConnectGithubContent />
      </Suspense>
    </main>
  );
}
