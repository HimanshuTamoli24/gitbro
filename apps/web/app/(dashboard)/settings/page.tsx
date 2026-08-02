"use client";

import * as React from "react";
import { Palette, User, Sliders, Shield, CheckCircle2, Sparkles, RotateCcw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@repo/ui/components/ui/card";
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { Switch } from "@repo/ui/components/ui/switch";
import { Label } from "@repo/ui/components/ui/label";
import { Separator } from "@repo/ui/components/ui/separator";
import { Badge } from "@repo/ui/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { useAuth } from "~/hooks/useAuth";
import { ThemeSelector } from "~/components/theme-toggle";

import { useLocalStorage } from "@repo/ui";

const DEFAULT_ACCENT_COLOR = "#10B981";
const DEFAULT_RADIUS = "0.5rem";

const presetAccents = [
  { name: "Emerald", color: "#10B981" },
  { name: "Blue", color: "#3B82F6" },
  { name: "Violet", color: "#8B5CF6" },
  { name: "Amber", color: "#F59E0B" },
  { name: "Rose", color: "#F43F5E" },
];

const radiusOptions = [
  { name: "Sharp", value: "0rem", label: "0px" },
  { name: "Small", value: "0.25rem", label: "4px" },
  { name: "Medium", value: "0.5rem", label: "8px" },
  { name: "Large", value: "0.75rem", label: "12px" },
  { name: "Full", value: "1rem", label: "16px" },
];

export default function SettingsPage() {
  const { user, signOut } = useAuth();

  // Use centralized useLocalStorage hook from @repo/ui
  const [accentColor, setAccentColor] = useLocalStorage(
    "gitbro_accent_color",
    DEFAULT_ACCENT_COLOR,
  );
  const [activeRadius, setActiveRadius] = useLocalStorage("gitbro_border_radius", DEFAULT_RADIUS);

  const [compactMode, setCompactMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [autoSync, setAutoSync] = React.useState(true);
  const [savedMessage, setSavedMessage] = React.useState(false);

  const userInitials = user?.email ? user.email.slice(0, 2).toUpperCase() : "GP";

  // Sync CSS properties when state updates
  React.useEffect(() => {
    if (accentColor) {
      document.documentElement.style.setProperty("--primary", accentColor);
    }
    if (activeRadius) {
      document.documentElement.style.setProperty("--radius", activeRadius);
    }
  }, [accentColor, activeRadius]);

  const applyAccentColor = (colorHex: string) => {
    setAccentColor(colorHex);
    document.documentElement.style.setProperty("--primary", colorHex);
  };

  const applyRadius = (radiusVal: string) => {
    setActiveRadius(radiusVal);
    document.documentElement.style.setProperty("--radius", radiusVal);
  };

  const handleResetToDefault = () => {
    applyAccentColor(DEFAULT_ACCENT_COLOR);
    applyRadius(DEFAULT_RADIUS);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleSaveSettings = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-10">
      {/* Header Banner */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm">
            Manage your application preferences, theme appearance, primary colors, and element
            borders.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetToDefault}
            className="flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset Appearance</span>
          </Button>
          {savedMessage && (
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="size-4" />
              <span>Saved & Applied</span>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="appearance" className="w-full space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-md bg-muted/60">
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="size-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="size-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Sliders className="size-4" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>

        {/* --- APPEARANCE TAB --- */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                <span>Theme Mode</span>
              </CardTitle>
              <CardDescription>
                Select Light or Dark mode preference for your GitBro workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSelector />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Color & Border Customization</CardTitle>
              <CardDescription>
                Choose an accent color or enter a custom hex value, and customize corner rounding
                for UI elements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary Color Picker & Presets */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Primary Accent Color</Label>
                <div className="flex flex-wrap items-center gap-4">
                  {/* Native Hex Color Picker Input */}
                  <div className="flex items-center gap-2.5 rounded-lg border bg-card p-1.5 pr-3 shadow-xs">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => applyAccentColor(e.target.value)}
                      className="h-8 w-8 rounded cursor-pointer border-none bg-transparent"
                    />
                    <span className="text-xs font-mono font-medium uppercase text-foreground">
                      {accentColor}
                    </span>
                  </div>

                  <Separator orientation="vertical" className="h-8 hidden sm:block" />

                  {/* Preset Accent Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {presetAccents.map((acc) => {
                      const isSelected = accentColor.toLowerCase() === acc.color.toLowerCase();
                      return (
                        <button
                          key={acc.name}
                          type="button"
                          onClick={() => applyAccentColor(acc.color)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                              : "border-border bg-card hover:bg-muted"
                          }`}
                        >
                          <span
                            className="h-3.5 w-3.5 rounded-full shadow-xs"
                            style={{ backgroundColor: acc.color }}
                          />
                          <span>{acc.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Corner Rounding Control */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">
                  Corner Rounding (Border Radius)
                </Label>
                <div className="flex flex-wrap items-center gap-3">
                  {radiusOptions.map((r) => {
                    const isSelected = activeRadius === r.value;
                    return (
                      <button
                        key={r.name}
                        type="button"
                        onClick={() => applyRadius(r.value)}
                        className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow-sm"
                            : "border-border bg-card hover:bg-muted text-foreground"
                        }`}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- PROFILE TAB --- */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">User Profile</CardTitle>
              <CardDescription>
                Your current account details and authentication state.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4 rounded-xl border p-4 bg-muted/20">
                <Avatar className="size-14 border-2 border-primary/20">
                  <AvatarFallback className="text-lg bg-primary text-primary-foreground font-bold">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base">{user?.email ?? "Guest User"}</h3>
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary border-primary/20"
                    >
                      Active
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">
                    User ID: {user?.id ?? "local-session"}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 space-y-1">
                  <span className="text-xs text-muted-foreground font-medium">
                    Authentication Provider
                  </span>
                  <p className="font-medium text-sm flex items-center gap-1.5">
                    <Shield className="size-4 text-emerald-500" /> Supabase Auth / Local Session
                  </p>
                </div>
                <div className="rounded-lg border p-4 space-y-1">
                  <span className="text-xs text-muted-foreground font-medium">GitHub Status</span>
                  <p className="font-medium text-sm text-foreground">Connected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- PREFERENCES TAB --- */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">System Preferences</CardTitle>
              <CardDescription>Configure background sync and notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium cursor-pointer" htmlFor="auto-sync">
                    Automatic Repository Sync
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically poll latest pull requests and repository issues in the background.
                  </p>
                </div>
                <Switch id="auto-sync" checked={autoSync} onCheckedChange={setAutoSync} />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium cursor-pointer" htmlFor="notifications">
                    In-App Notifications
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Show toast notifications when GitHub sync updates complete.
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button onClick={handleSaveSettings}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
