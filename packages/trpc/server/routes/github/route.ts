import { z, zodUndefinedModel } from "../../schema";
import { publicProcedure, router } from "../../trpc";

export const githubRouter = router({
  connectGithub: publicProcedure
    .meta({ openapi: { method: "GET", path: "/connect-github" } })
    .input(zodUndefinedModel)
    .output(
      z.object({
        status: z.literal("healthy").describe("status of the server"),
      }),
    )
    .query(async () => {
      return {
        status: "healthy",
      };
    }),
});
