import { z } from "zod";

export const listRepositoriesInput = z.object({
  type: z.enum(["all", "owner", "public", "private", "member"]).optional().default("owner"),
  sort: z.enum(["created", "updated", "pushed", "full_name"]).optional().default("updated"),
  perPage: z.number().min(1).max(100).optional().default(30),
});
export type ListRepositoriesInput = z.input<typeof listRepositoriesInput>;

export const getRepositoryInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
});
export type GetRepositoryInput = z.input<typeof getRepositoryInput>;

export const getContentInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  path: z.string().optional().default(""),
});
export type GetContentInput = z.input<typeof getContentInput>;

export const listBranchesInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
});
export type ListBranchesInput = z.input<typeof listBranchesInput>;

export const listCommitsInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  sha: z.string().optional(),
  perPage: z.number().min(1).max(100).optional().default(30),
});
export type ListCommitsInput = z.input<typeof listCommitsInput>;

export const starRepoInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
});
export type StarRepoInput = z.input<typeof starRepoInput>;

export const listIssuesInput = z.object({
  owner: z.string().optional(),
  repo: z.string().optional(),
  state: z.enum(["open", "closed", "all"]).optional().default("open"),
  perPage: z.number().min(1).max(100).optional().default(30),
});
export type ListIssuesInput = z.input<typeof listIssuesInput>;

export const getIssueInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  issueNumber: z.number().int().positive(),
});
export type GetIssueInput = z.input<typeof getIssueInput>;

export const createIssueInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  title: z.string().min(1),
  body: z.string().optional(),
  labels: z.array(z.string()).optional(),
  assignees: z.array(z.string()).optional(),
});
export type CreateIssueInput = z.input<typeof createIssueInput>;

export const updateIssueInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  issueNumber: z.number().int().positive(),
  title: z.string().optional(),
  body: z.string().optional(),
  state: z.enum(["open", "closed"]).optional(),
  labels: z.array(z.string()).optional(),
  assignees: z.array(z.string()).optional(),
});
export type UpdateIssueInput = z.input<typeof updateIssueInput>;

export const createIssueCommentInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  issueNumber: z.number().int().positive(),
  body: z.string().min(1),
});
export type CreateIssueCommentInput = z.input<typeof createIssueCommentInput>;

export const listPullRequestsInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  state: z.enum(["open", "closed", "all"]).optional().default("open"),
  perPage: z.number().min(1).max(100).optional().default(30),
});
export type ListPullRequestsInput = z.input<typeof listPullRequestsInput>;

export const getPullRequestInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  pullNumber: z.number().int().positive(),
});
export type GetPullRequestInput = z.input<typeof getPullRequestInput>;

export const createPullRequestReviewInput = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  pullNumber: z.number().int().positive(),
  body: z.string().optional(),
  event: z.enum(["APPROVE", "REQUEST_CHANGES", "COMMENT"]).optional().default("COMMENT"),
});
export type CreatePullRequestReviewInput = z.input<typeof createPullRequestReviewInput>;
