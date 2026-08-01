"use client";

import * as React from "react";
import {
  Palette,
  User,
  Sliders,
  Shield,
  Bell,
  CheckCircle2,
  Sparkles,
  Monitor,
  Moon,
  Sun,
  Laptop,
} from "lucide-react";
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
import { ThemeSelector, ThemeSegmentedToggle, ThemeToggle } from "~/components/theme-toggle";

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const [compactMode, setCompactMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [autoSync, setAutoSync] = React.useState(true);
  const [savedMessage, setSavedMessage] = React.useState(false);

  const userInitials = user?.email ? user.email.slice(0, 2).toUpperCase() : "GP";

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
            Manage your application preferences, theme appearance, and account settings.
          </p>
        </div>
        {savedMessage && (
          <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="size-4" />
            <span>Preferences saved successfully</span>
          </div>
        )}
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Sparkles className="size-5 text-primary" />
                    <span>Theme Customization</span>
                  </CardTitle>
                  <CardDescription>
                    Select your preferred color mode or synchronize with your device system
                    settings.
                  </CardDescription>
                </div>
                <ThemeSegmentedToggle />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Visual Card Theme Selector */}
              <div>
                <Label className="mb-3 block text-sm font-medium text-foreground">Theme Mode</Label>
                <ThemeSelector />
              </div>

              <Separator />

              {/* Theme Quick Test Button Header */}
              <div className="flex items-center justify-between rounded-xl border bg-muted/30 p-4">
                <div className="space-y-0.5">
                  <div className="font-semibold text-sm">Quick Theme Switcher</div>
                  <div className="text-xs text-muted-foreground">
                    Test how dropdown theme buttons look when placed in headers or toolbars.
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono">Demo:</span>
                  <ThemeToggle variant="outline" size="default" showLabel />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Interface Density</CardTitle>
              <CardDescription>
                Customize layout spacing and navigation appearance for your workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base font-medium cursor-pointer" htmlFor="compact-mode">
                    Compact Sidebar & Tables
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Reduce padding in lists and navigation items for higher information density.
                  </p>
                </div>
                <Switch id="compact-mode" checked={compactMode} onCheckedChange={setCompactMode} />
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
