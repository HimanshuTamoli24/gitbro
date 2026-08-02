"use client";

import { motion } from "motion/react";
import { Bookmark, Github, Gitlab, Server, Layers } from "lucide-react";

const providers = [
  {
    name: "GitHub",
    desc: "Connect your GitHub account to manage repositories, pull requests, issues, branches, releases, and workflows from one unified dashboard.",
    icon: Github,
    iconBg: "bg-black dark:bg-white",
    tags: [
      { text: "OAuth", color: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" },
      { text: "Live", color: "bg-green-500/15 text-green-400 border border-green-500/30" },
      { text: "Stable", color: "bg-blue-500/15 text-blue-400 border border-blue-500/30" },
    ],
    stats: {
      status: "Available",
      auth: "OAuth",
      repos: "Full Access",
      sync: "Real-time",
    },
    isLive: true,
  },
  {
    name: "GitLab",
    desc: "GitLab integration is currently in development. Soon you'll be able to manage repositories, merge requests, pipelines, and issues alongside GitHub.",
    icon: Gitlab,
    iconBg: "bg-[#FC6D26]",
    tags: [
      { text: "Coming Soon", color: "bg-amber-500/15 text-amber-400 border border-amber-500/30" },
      { text: "CI/CD", color: "bg-white/10 text-neutral-300" },
      { text: "Merge Requests", color: "bg-white/10 text-neutral-300" },
    ],
    stats: {
      status: "Coming Soon",
      auth: "OAuth",
      repos: "Planned",
      sync: "Planned",
    },
    isLive: false,
  },
  {
    name: "Bitbucket & Gitea",
    desc: "Native support for Bitbucket Cloud, Bitbucket Server, Gitea, and self-hosted instances is currently under development.",
    icon: Server,
    iconBg: "bg-[#0052CC]",
    tags: [
      { text: "Coming Soon", color: "bg-amber-500/15 text-amber-400 border border-amber-500/30" },
      { text: "Self Hosted", color: "bg-blue-500/15 text-blue-400 border border-blue-500/30" },
      { text: "Enterprise", color: "bg-purple-500/15 text-purple-400 border border-purple-500/30" },
    ],
    stats: {
      status: "Coming Soon",
      auth: "PAT / OAuth",
      repos: "Planned",
      sync: "Planned",
    },
    isLive: false,
  },
];
export function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className="py-20 md:py-28 bg-background text-foreground transition-colors"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted/40 text-xs font-semibold text-muted-foreground">
            Integrations
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Multi-Provider Git Hub
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage GitHub, GitLab, Gitea, and Bitbucket from a single unified workspace.
          </p>
        </div>

        {/* Outer Dashed Blueprint Frame */}
        <div className="relative rounded-2xl border border-dashed border-border bg-card/60 p-6 md:p-8">
          <span className="absolute -top-3 -left-3 text-muted-foreground font-mono text-lg select-none">
            +
          </span>
          <span className="absolute -top-3 -right-3 text-muted-foreground font-mono text-lg select-none">
            +
          </span>
          <span className="absolute -bottom-3 -left-3 text-muted-foreground font-mono text-lg select-none">
            +
          </span>
          <span className="absolute -bottom-3 -right-3 text-muted-foreground font-mono text-lg select-none">
            +
          </span>

          {/* Cards Grid matching reference UI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {providers.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="rounded-2xl border border-border bg-card p-6 space-y-5 flex flex-col justify-between hover:border-emerald-500/50 transition-colors shadow-md"
                >
                  <div className="space-y-4">
                    {/* Top row: Icon + Name + Bookmark */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-12 w-12 rounded-xl ${p.iconBg} flex items-center justify-center text-white shadow-md shrink-0`}
                        >
                          <Icon className="h-6 w-6 stroke-[2.2]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground leading-tight">
                            {p.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                            {p.desc}
                          </p>
                        </div>
                      </div>
                      <Bookmark className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer shrink-0 transition-colors" />
                    </div>

                    {/* Tags row */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tags.map((tag) => (
                        <span
                          key={tag.text}
                          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-lg ${tag.color}`}
                        >
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats list with dotted leaders matching reference screenshot */}
                  <div className="space-y-2 pt-4 border-t border-border text-xs">
                    <div className="flex justify-between items-baseline text-muted-foreground">
                      <span>Status</span>
                      <span className="flex-1 border-b border-dotted border-border mx-2" />
                      <span
                        className={`font-semibold ${p.isLive ? "text-emerald-500 dark:text-emerald-400" : "text-amber-500 dark:text-amber-400"}`}
                      >
                        {p.stats.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-muted-foreground">
                      <span>Authentication</span>
                      <span className="flex-1 border-b border-dotted border-border mx-2" />
                      <span className="font-semibold text-foreground">{p.stats.auth}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-muted-foreground">
                      <span>Repository Access</span>
                      <span className="flex-1 border-b border-dotted border-border mx-2" />
                      <span className="font-semibold text-foreground">{p.stats.repos}</span>
                    </div>
                    <div className="flex justify-between items-baseline text-muted-foreground">
                      <span>Sync Frequency</span>
                      <span className="flex-1 border-b border-dotted border-border mx-2" />
                      <span className="font-semibold text-foreground">{p.stats.sync}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
