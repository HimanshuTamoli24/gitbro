"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowUpRight, FolderGit2, Star, GitFork, Lock, Globe, Sparkles } from "lucide-react";
import Avatar from "boring-avatars";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-background text-foreground transition-colors overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 text-center">
        {/* Main H1 Headline with Green Gradient highlight */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.08]"
        >
          Manage all your Git operations{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-500 dark:from-emerald-400 dark:via-emerald-500 dark:to-green-400 bg-clip-text text-transparent">
            from one unified place.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-normal"
        >
          No more context switching between tabs or providers. Inspect repositories, review pull
          requests, and track issues across GitHub, GitLab, Gitea, and Bitbucket in a single,
          lightning-fast dashboard.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Link href="/auth?mode=signup">
            <Button className="h-12 px-7 bg-foreground text-background hover:bg-foreground/90 font-bold rounded-full text-base gap-2 shadow-lg group">
              Start Exploring
              <ArrowUpRight className="h-5 w-5 stroke-[2.5] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
            </Button>
          </Link>
          <a href="#integrations">
            <Button
              variant="outline"
              className="h-12 px-7 border-border bg-muted/40 text-foreground hover:bg-muted font-semibold rounded-full text-base transition-colors"
            >
              Explore Integrations
            </Button>
          </a>
        </motion.div>

        {/* Developer Avatars Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-3 text-xs text-muted-foreground"
        >
          <span>
            <strong className="text-foreground font-semibold">10+</strong> developers use GitBro —
            free & no credit card required.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
