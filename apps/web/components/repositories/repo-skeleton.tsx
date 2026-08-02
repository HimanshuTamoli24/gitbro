"use client";

import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@repo/ui/components/ui/card";

export function RepoCardSkeleton() {
  return (
    <Card className="flex h-full flex-col rounded-2xl border-2 border-border/60">
      <CardHeader className="pb-5 border-dashed border-b">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3 min-w-0 flex-1">
            <Skeleton className="h-11 w-11 rounded-xl shrink-0" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 px-6 py-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-12 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-12 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-12 rounded-md" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RepoTableSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="w-full rounded-xl border border-border bg-card overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
            <tr>
              <th className="py-2.5 px-3 w-10"></th>
              <th className="py-2.5 px-3">Repository</th>
              <th className="py-2.5 px-3">Visibility</th>
              <th className="py-2.5 px-3">Language</th>
              <th className="py-2.5 px-3 text-center">Stars</th>
              <th className="py-2.5 px-3 text-center">Forks</th>
              <th className="py-2.5 px-3 text-center">Issues</th>
              <th className="py-2.5 px-3 text-right">Updated</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {Array.from({ length: count }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="py-3 px-3">
                  <Skeleton className="size-6 rounded-full" />
                </td>
                <td className="py-3 px-3 space-y-1.5">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-3 w-48 rounded-md" />
                </td>
                <td className="py-3 px-3">
                  <Skeleton className="h-4 w-14 rounded-full" />
                </td>
                <td className="py-3 px-3">
                  <Skeleton className="h-4 w-20 rounded-md" />
                </td>
                <td className="py-3 px-3">
                  <Skeleton className="h-4 w-8 mx-auto rounded-md" />
                </td>
                <td className="py-3 px-3">
                  <Skeleton className="h-4 w-8 mx-auto rounded-md" />
                </td>
                <td className="py-3 px-3">
                  <Skeleton className="h-4 w-8 mx-auto rounded-md" />
                </td>
                <td className="py-3 px-3">
                  <Skeleton className="h-4 w-16 ml-auto rounded-md" />
                </td>
                <td className="py-3 px-3">
                  <Skeleton className="h-7 w-7 ml-auto rounded-lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
