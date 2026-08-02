"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const leftFaqs = [
  {
    question: "What is GitBro?",
    answer:
      "GitBro is a unified Git workspace that brings GitHub, GitLab, Bitbucket, Gitea, and Forgejo into one clean dashboard. Manage repositories, pull requests, issues, branches, and more without switching between different websites.",
  },
  {
    question: "Which Git providers are supported?",
    answer:
      "GitBro currently supports GitHub, GitLab, Bitbucket, Gitea, and Forgejo. Connect your preferred provider and manage your projects from one consistent interface.",
  },
  {
    question: "How are my access tokens protected?",
    answer:
      "Your access tokens are securely encrypted before storage and are only used to communicate with your connected Git provider over secure HTTPS connections. GitBro never exposes your credentials in the interface.",
  },
];
const rightFaqs = [
  {
    question: "What can I manage with GitBro?",
    answer:
      "Create repositories, browse code, manage issues, review pull requests, work with branches, monitor CI/CD pipelines, and perform everyday Git operations from a single dashboard.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No. GitBro is a web application. Connect your Git provider using OAuth or a personal access token and start managing your repositories instantly.",
  },
  {
    question: "Why use GitBro instead of each provider's website?",
    answer:
      "GitBro provides a faster, cleaner, and consistent experience across different Git platforms, helping you stay productive without learning multiple interfaces or constantly switching tabs.",
  },
];
export function FAQSection() {
  const [openLeft, setOpenLeft] = useState<number | null>(0);
  const [openRight, setOpenRight] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-background text-foreground transition-colors border-t border-border"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-border bg-muted/40 text-[11px] font-bold text-muted-foreground">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Common questions about gitbro. Need more help? Contact us
          </p>
        </div>

        {/* 2-Column Blueprint Grid matching Ossium screenshot */}
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

          <div className="grid grid-cols-1  gap-6">
            {/* Left Column */}
            <div className="space-y-3">
              {leftFaqs.map((faq, idx) => {
                const isOpen = openLeft === idx;
                return (
                  <div
                    key={faq.question}
                    className="border border-border bg-card rounded-xl overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenLeft(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-foreground hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-emerald-500 dark:text-emerald-400" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-muted-foreground border-t border-border pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              {rightFaqs.map((faq, idx) => {
                const isOpen = openRight === idx;
                return (
                  <div
                    key={faq.question}
                    className="border border-border bg-card rounded-xl overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenRight(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-foreground hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-emerald-500 dark:text-emerald-400" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-muted-foreground border-t border-border pt-3 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
