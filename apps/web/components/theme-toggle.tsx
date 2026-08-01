"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { cn } from "@repo/ui/lib/utils";

interface ThemeToggleProps {
  variant?: "ghost" | "outline" | "default" | "secondary";
  size?: "default" | "sm" | "lg" | "icon" | "icon-lg";
  className?: string;
  showLabel?: boolean;
}

/**
 * Dropdown / Quick Toggle Button for switching Light, Dark, System themes.
 * Ideal for Header navbar, Sidebar footer, or next to Logo.
 */
export function ThemeToggle({
  variant = "ghost",
  size = "icon",
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant={variant} size={size} className={cn("relative", className)} disabled>
        <Sun className="size-4 animate-spin text-muted-foreground" />
        {showLabel && <span className="ml-2 font-medium text-xs">Theme</span>}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={cn("relative group", className)}>
          <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-slate-100" />
          <span className="sr-only">Toggle theme</span>
          {showLabel && <span className="ml-2 font-medium text-xs capitalize">{theme} theme</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Sun className="size-4 text-amber-500" />
            <span>Light</span>
          </span>
          {theme === "light" && <Check className="size-4 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Moon className="size-4 text-indigo-400" />
            <span>Dark</span>
          </span>
          {theme === "dark" && <Check className="size-4 text-primary" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Monitor className="size-4 text-slate-400" />
            <span>System</span>
          </span>
          {theme === "system" && <Check className="size-4 text-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * Segmented Control Switcher (Light | Dark | System)
 * Great for inline forms or quick preferences.
 */
export function ThemeSegmentedToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-48 animate-pulse rounded-lg bg-muted" />;
  }

  const options = [
    { value: "light", label: "Light", icon: Sun, iconColor: "text-amber-500" },
    { value: "dark", label: "Dark", icon: Moon, iconColor: "text-indigo-400" },
    { value: "system", label: "System", icon: Monitor, iconColor: "text-muted-foreground" },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg bg-muted p-1 text-muted-foreground",
        className,
      )}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "hover:bg-background/50 hover:text-foreground",
            )}
          >
            <Icon className={cn("size-3.5", opt.iconColor)} />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/**
 * Visual Card Selector for Settings Page
 * Shows interactive cards for Light, Dark, and System modes with mock previews.
 */
export function ThemeSelector({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-xl border bg-muted/30 animate-pulse" />
        ))}
      </div>
    );
  }

  const themes = [
    {
      id: "light",
      name: "Light Mode",
      description: "Clean, bright interface optimized for daylight.",
      icon: Sun,
      iconColor: "text-amber-500",
      previewBg: "bg-slate-50 border-slate-200",
      previewHeader: "bg-white border-slate-200",
      previewSidebar: "bg-slate-100 border-slate-200",
      previewContent: "bg-white border-slate-200",
      previewLine: "bg-slate-200",
    },
    {
      id: "dark",
      name: "Dark Mode",
      description: "Sleek, high-contrast dark theme gentle on the eyes.",
      icon: Moon,
      iconColor: "text-indigo-400",
      previewBg: "bg-slate-950 border-slate-800",
      previewHeader: "bg-slate-900 border-slate-800",
      previewSidebar: "bg-slate-900/60 border-slate-800",
      previewContent: "bg-slate-900 border-slate-800",
      previewLine: "bg-slate-700",
    },
    {
      id: "system",
      name: "System Default",
      description: "Automatically matches your operating system theme.",
      icon: Monitor,
      iconColor: "text-cyan-500",
      previewBg:
        "bg-gradient-to-r from-slate-100 to-slate-900 border-slate-300 dark:border-slate-700",
      previewHeader: "bg-slate-200/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700",
      previewSidebar: "bg-slate-300/50 dark:bg-slate-900/80 border-slate-300 dark:border-slate-700",
      previewContent: "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700",
      previewLine: "bg-slate-400 dark:bg-slate-600",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-3", className)}>
      {themes.map((t) => {
        const isSelected = theme === t.id;
        const Icon = t.icon;

        return (
          <div
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={cn(
              "group relative flex cursor-pointer flex-col justify-between rounded-xl border-2 p-4 transition-all duration-200 hover:border-primary/50",
              isSelected
                ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                : "border-border bg-card",
            )}
          >
            {/* Selection Checkmark Badge */}
            {isSelected && (
              <div className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                <Check className="size-3 stroke-[3]" />
              </div>
            )}

            {/* Visual Mini Mockup */}
            <div
              className={cn(
                "mb-4 h-24 w-full rounded-lg border p-2 overflow-hidden shadow-xs",
                t.previewBg,
              )}
            >
              <div className="flex h-full gap-1.5">
                {/* Mini Sidebar */}
                <div className={cn("w-1/4 rounded border p-1 space-y-1", t.previewSidebar)}>
                  <div className={cn("h-1.5 w-3/4 rounded-full", t.previewLine)} />
                  <div className={cn("h-1.5 w-1/2 rounded-full", t.previewLine)} />
                  <div className={cn("h-1.5 w-2/3 rounded-full", t.previewLine)} />
                </div>
                {/* Mini Main Content */}
                <div className="flex flex-1 flex-col gap-1.5">
                  <div
                    className={cn(
                      "h-3 w-full rounded border flex items-center px-1",
                      t.previewHeader,
                    )}
                  >
                    <div className={cn("h-1 w-8 rounded-full", t.previewLine)} />
                  </div>
                  <div className={cn("flex-1 rounded border p-1 space-y-1", t.previewContent)}>
                    <div className={cn("h-1.5 w-1/2 rounded-full", t.previewLine)} />
                    <div className={cn("h-1.5 w-5/6 rounded-full", t.previewLine)} />
                    <div className={cn("h-1.5 w-2/3 rounded-full", t.previewLine)} />
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Description */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Icon className={cn("size-4", t.iconColor)} />
                <span className="font-semibold text-sm text-foreground">{t.name}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
