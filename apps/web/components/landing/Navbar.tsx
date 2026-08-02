"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import { ThemeToggle } from "~/components/theme-toggle";
import { FolderGit2, Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { useAuth } from "~/hooks/useAuth";
import { animate, motion } from "motion/react";
export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const routes = [
    {
      title: "integrations",
      href: "#integrations",
    },
    {
      title: "features",
      href: "#features",
    },
    {
      title: "faq",
      href: "#faq",
    },
  ];
  const navVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border transition-colors">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-black font-extrabold text-lg shadow-emerald-500/20 shadow-lg">
            <FolderGit2 className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-foreground font-extrabold text-2xl tracking-tight">gitbro</span>
        </Link>

        {/* Desktop Nav Links */}
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground"
        >
          {routes.map((route) => (
            <motion.div key={route.href} variants={itemVariants}>
              <Link
                href={route.href}
                className="relative block h-5 overflow-hidden text-sm font-medium text-muted-foreground capitalize group"
              >
                <motion.div
                  className="flex flex-col"
                  initial={{ y: 0 }}
                  whileHover={{ y: "-50%" }}
                  transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
                >
                  <span className="flex h-5 items-center transition-colors group-hover:text-emerald-500 dark:group-hover:text-emerald-400">
                    {route.title}
                  </span>
                  <span className="flex h-5 items-center text-emerald-500 dark:text-emerald-400 font-bold">
                    {route.title}
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <Link href="/auth">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg px-5 h-9"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/auth?mode=login">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg px-5 h-9 transition-all hover:shadow-lg hover:shadow-emerald-500/20"
              >
                Login Now
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-foreground"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-background p-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col gap-4 text-sm font-medium text-foreground">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>
              Features
            </a>
            <a href="#integrations" onClick={() => setMobileMenuOpen(false)}>
              Integrations
            </a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </a>
          </nav>
          <div className="pt-4 border-t border-border">
            <Link href="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-emerald-500 text-black font-bold py-5">Login Now</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
