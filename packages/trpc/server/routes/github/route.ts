import { TRPCError } from "@trpc/server";
import { corsair } from "@repo/corsair";
import { z, zodUndefinedModel } from "../../schema";
import { protectedProcedure, publicProcedure, router } from "../../trpc";

export const githubRouter = router({
  connectGithub: publicProcedure
    .meta({ openapi: { method: "GET", path: "/connect-github" } })
    .input(zodUndefinedModel)
    .output(
      z.object({
        url: z.string().describe("Redirect URL to connect GitHub"),
      }),
    )
    .query(async ({ ctx }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }
      try {
        const link = await corsair.manage.connect.createLink({
          plugin: "github",
          tenantId: ctx.user.id,
        });

        let redirectUrl = link.connectUrl;
        try {
          const parsedUrl = new URL(link.connectUrl);
          const state = parsedUrl.searchParams.get("state");
          if (state) {
            const resolved = await corsair.manage.connect.resolve(state);
            if (resolved?.oauthUrl) {
              redirectUrl = resolved.oauthUrl;
            }
          }
        } catch (e) {
          console.warn("Could not resolve direct OAuth URL, falling back to connect URL:", e);
        }

        return {
          url: redirectUrl,
        };
      } catch (err: unknown) {
        console.error("Failed to create connect link:", err);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: err instanceof Error ? err.message : "Failed to create GitHub connect link",
        });
      }
    }),

  repo: protectedProcedure
    .meta({ openapi: { method: "GET", path: "/repo" } })
    .output(
      z.object({
        connected: z.boolean(),
        repos: z.array(
          z.object({
            name: z.string(),
            url: z.string(),
            description: z.string().optional(),
            stars: z.number().optional(),
            forks: z.number().optional(),
            language: z.string().optional(),
            isPrivate: z.boolean().optional(),
          }),
        ),
      }),
    )
    .query(async ({ ctx }) => {
      if (!ctx.user?.id) {
        return { connected: false, repos: [] };
      }

      try {
        const tenant = corsair.withTenant(ctx.user.id);
        const api = tenant.github?.api as any;
        if (!api?.repositories?.list) {
          return { connected: false, repos: [] };
        }
        const items = await api.repositories.list({
          type: "owner",
          sort: "updated",
          perPage: 30,
        });

        return {
          connected: true,
          repos: (items ?? []).map((repo: any) => ({
            name: repo?.name ?? "",
            url: repo?.htmlUrl ?? repo?.html_url ?? repo?.url ?? "",
            description: repo?.description ?? undefined,
            stars:
              typeof repo?.stargazersCount === "number"
                ? repo.stargazersCount
                : typeof repo?.stargazers_count === "number"
                  ? repo.stargazers_count
                  : undefined,
            forks:
              typeof repo?.forksCount === "number"
                ? repo.forksCount
                : typeof repo?.forks_count === "number"
                  ? repo.forks_count
                  : undefined,
            language: repo?.language ?? undefined,
            isPrivate: Boolean(repo?.private),
          })),
        };
      } catch (err: unknown) {
        console.warn(
          "GitHub repositories fetch failed (account might not be connected):",
          err instanceof Error ? err.message : err,
        );
        return { connected: false, repos: [] };
      }
    }),
});
