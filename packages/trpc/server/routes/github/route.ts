import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../../trpc";
import { githubService } from "../../services";
import {
  listRepositoriesInput,
  getRepositoryInput,
  getContentInput,
  listBranchesInput,
  listCommitsInput,
  starRepoInput,
  listIssuesInput,
  getIssueInput,
  createIssueInput,
  updateIssueInput,
  createIssueCommentInput,
  listPullRequestsInput,
  getPullRequestInput,
  createPullRequestReviewInput,
} from "@repo/services/github";

export const githubRouter = router({
  // --- AUTH / CONNECT ---
  connectGithub: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    try {
      return await githubService.getConnectLink(ctx.user.id);
    } catch (err: unknown) {
      console.error("Failed to create connect link:", err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: err instanceof Error ? err.message : "Failed to create GitHub connect link",
      });
    }
  }),

  // --- REPOSITORIES ---

  /**
   * Main repositories list query (preserves backward compatibility with repo query).
   */
  repo: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.id) {
      return { connected: false, repos: [] };
    }
    return await githubService.listRepositories(ctx.user.id, {
      type: "owner",
      sort: "updated",
      perPage: 30,
    });
  }),

  repositoriesList: protectedProcedure
    .input(listRepositoriesInput)
    .query(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }
      return await githubService.listRepositories(ctx.user.id, input);
    }),

  repositoriesGet: protectedProcedure.input(getRepositoryInput).query(async ({ ctx, input }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    return await githubService.getRepository(ctx.user.id, input);
  }),

  repositoriesContent: protectedProcedure.input(getContentInput).query(async ({ ctx, input }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    return await githubService.getRepositoryContent(ctx.user.id, input);
  }),

  repositoriesListBranches: protectedProcedure
    .input(listBranchesInput)
    .query(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }
      return await githubService.listBranches(ctx.user.id, input);
    }),

  repositoriesListCommits: protectedProcedure
    .input(listCommitsInput)
    .query(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }
      return await githubService.listCommits(ctx.user.id, input);
    }),

  repositoriesStar: protectedProcedure.input(starRepoInput).mutation(async ({ ctx, input }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    return await githubService.starRepository(ctx.user.id, input);
  }),

  repositoriesUnstar: protectedProcedure.input(starRepoInput).mutation(async ({ ctx, input }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    return await githubService.unstarRepository(ctx.user.id, input);
  }),

  // --- ISSUES ---

  issuesList: protectedProcedure.input(listIssuesInput).query(async ({ ctx, input }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    return await githubService.listIssues(ctx.user.id, input);
  }),

  issuesGet: protectedProcedure.input(getIssueInput).query(async ({ ctx, input }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    return await githubService.getIssue(ctx.user.id, input);
  }),

  issuesCreate: protectedProcedure.input(createIssueInput).mutation(async ({ ctx, input }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    return await githubService.createIssue(ctx.user.id, input);
  }),

  issuesUpdate: protectedProcedure.input(updateIssueInput).mutation(async ({ ctx, input }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    return await githubService.updateIssue(ctx.user.id, input);
  }),

  issuesCreateComment: protectedProcedure
    .input(createIssueCommentInput)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }
      return await githubService.createIssueComment(ctx.user.id, input);
    }),

  // --- PULL REQUESTS ---

  pullRequestsList: protectedProcedure
    .input(listPullRequestsInput)
    .query(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }
      return await githubService.listPullRequests(ctx.user.id, input);
    }),

  pullRequestsGet: protectedProcedure.input(getPullRequestInput).query(async ({ ctx, input }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
    }
    return await githubService.getPullRequest(ctx.user.id, input);
  }),

  pullRequestsCreateReview: protectedProcedure
    .input(createPullRequestReviewInput)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      }
      return await githubService.createPullRequestReview(ctx.user.id, input);
    }),
});
