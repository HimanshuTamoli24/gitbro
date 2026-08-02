"use client";

import Link from "next/link";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@repo/ui/components/ui/sidebar";
import { Separator } from "@repo/ui/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@repo/ui/components/ui/breadcrumb";
import { DashboardSidebar } from "~/components/dashboard/dashboard-sidebar";
import { ThemeToggle } from "~/components/theme-toggle";
import { usePathname, useRouter } from "next/navigation";
import { Bell, RotateCw, Settings } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { ButtonGroup } from "@repo/ui/components/ui/button-group";

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/repositories": "Repositories",
  "/issues": "Issues",
  "/integration": "Integrations",
  "/settings": "Settings",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const pageTitle = pageTitles[pathname] ?? "Dashboard";

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-medium">{pageTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Top Header Controls */}
          <div className="flex items-center gap-2">
            <ButtonGroup>
              <Button
                variant="outline"
                size="icon-lg"
                onClick={() => router.refresh()}
                title="Refresh Data"
              >
                <RotateCw className="size-4" />
              </Button>
              <ThemeToggle variant="outline" size="icon-lg" />
              <Button variant="outline" size="icon-lg" title="Notifications">
                <Bell className="size-4" />
              </Button>
              <Button variant="outline" size="icon-lg" asChild title="Settings">
                <Link href="/settings">
                  <Settings className="size-4" />
                </Link>
              </Button>
            </ButtonGroup>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
