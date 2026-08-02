"use client";

import Link from "next/link";
import { FolderGit2 } from "lucide-react";
import { ThemeToggle } from "~/components/theme-toggle";

export function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border py-12 transition-colors">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        {/* Footer Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <div className="flex items-center gap-2 font-bold text-foreground text-base">
            <div className="h-6 w-6 rounded-md bg-emerald-500 text-black flex items-center justify-center font-extrabold text-xs">
              <FolderGit2 className="h-4 w-4" />
            </div>
            <span>gitbro</span>
          </div>

          <p>
            © {new Date().getFullYear()} GitBro. All rights reserved. The True OSS & Repository
            Helper.
          </p>

          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#integrations" className="hover:text-foreground transition-colors">
              Integrations
            </a>
            <a href="#faq" className="hover:text-foreground transition-colors">
              FAQ
            </a>
            <Link href="/auth?mode=login" className="hover:text-foreground transition-colors">
              Login
            </Link>
            <ThemeToggle className="text-muted-foreground hover:text-foreground" />
          </div>
        </div>
      </div>
    </footer>
  );
}
