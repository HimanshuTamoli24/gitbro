import { corsair } from "@repo/corsair";
import type {
  ListRepositoriesInput,
  GetRepositoryInput,
  GetContentInput,
  ListBranchesInput,
  ListCommitsInput,
  StarRepoInput,
  ListIssuesInput,
  GetIssueInput,
  CreateIssueInput,
  UpdateIssueInput,
  CreateIssueCommentInput,
  ListPullRequestsInput,
  GetPullRequestInput,
  CreatePullRequestReviewInput,
} from "./model";

export * from "./model";

export class GithubService {
  /**
   * Generates a GitHub OAuth connect link for a user tenant.
   */
  public async getConnectLink(userId: string) {
    const link = await corsair.manage.connect.createLink({
      plugin: "github",
      tenantId: userId,
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
      console.warn("Could not resolve direct OAuth URL, falling back to connectUrl:", e);
    }

    return { url: redirectUrl };
  }

  /**
   * Helper to retrieve the initialized Corsair GitHub API for a given tenant.
   */
  private getGithubApi(userId: string) {
    const tenant = corsair.withTenant(userId);
    const api = (tenant as any).github?.api;
    if (!api) {
      throw new Error("GitHub integration is not connected for this tenant.");
    }
    return api;
  }

  // --- REPOSITORIES ---

  public async listRepositories(userId: string, input: ListRepositoriesInput) {
    try {
      const api = this.getGithubApi(userId);
      const items = await api.repositories.list({
        type: input.type,
        sort: input.sort,
        perPage: input.perPage,
      });

      return {
        connected: true,
        repos: (items ?? []).map((repo: any) => ({
          id: repo?.id,
          name: repo?.name ?? "",
          fullName: repo?.fullName ?? repo?.full_name ?? repo?.name ?? "",
          url: repo?.htmlUrl ?? repo?.html_url ?? repo?.url ?? "",
          description: repo?.description ?? undefined,
          stars:
            typeof repo?.stargazersCount === "number"
              ? repo.stargazersCount
              : typeof repo?.stargazers_count === "number"
                ? repo.stargazers_count
                : 0,
          forks:
            typeof repo?.forksCount === "number"
              ? repo.forksCount
              : typeof repo?.forks_count === "number"
                ? repo.forks_count
                : 0,
          openIssues:
            typeof repo?.openIssuesCount === "number"
              ? repo.openIssuesCount
              : typeof repo?.open_issues_count === "number"
                ? repo.open_issues_count
                : 0,
          language: repo?.language ?? undefined,
          isPrivate: Boolean(repo?.private),
          updatedAt: repo?.updatedAt ?? repo?.updated_at ?? new Date().toISOString(),
        })),
      };
    } catch (err: unknown) {
      console.warn("listRepositories error:", err instanceof Error ? err.message : err);
      return { connected: false, repos: [] };
    }
  }

  public async getRepository(userId: string, input: GetRepositoryInput) {
    const api = this.getGithubApi(userId);
    return await api.repositories.get({
      owner: input.owner,
      repo: input.repo,
    });
  }

  public async getRepositoryContent(userId: string, input: GetContentInput) {
    const api = this.getGithubApi(userId);
    return await api.repositories.getContent({
      owner: input.owner,
      repo: input.repo,
      path: input.path || "",
    });
  }

  public async listBranches(userId: string, input: ListBranchesInput) {
    const api = this.getGithubApi(userId);
    return await api.repositories.listBranches({
      owner: input.owner,
      repo: input.repo,
    });
  }

  public async listCommits(userId: string, input: ListCommitsInput) {
    const api = this.getGithubApi(userId);
    return await api.repositories.listCommits({
      owner: input.owner,
      repo: input.repo,
      sha: input.sha,
      perPage: input.perPage,
    });
  }

  public async starRepository(userId: string, input: StarRepoInput) {
    const api = this.getGithubApi(userId);
    return await api.repositories.star({
      owner: input.owner,
      repo: input.repo,
    });
  }

  public async unstarRepository(userId: string, input: StarRepoInput) {
    const api = this.getGithubApi(userId);
    return await api.repositories.unstar({
      owner: input.owner,
      repo: input.repo,
    });
  }

  // --- ISSUES ---

  public async listIssues(userId: string, input: ListIssuesInput) {
    const api = this.getGithubApi(userId);
    const params: any = {
      state: input.state,
      perPage: input.perPage,
    };
    if (input.owner) params.owner = input.owner;
    if (input.repo) params.repo = input.repo;

    return await api.issues.list(params);
  }

  public async getIssue(userId: string, input: GetIssueInput) {
    const api = this.getGithubApi(userId);
    return await api.issues.get({
      owner: input.owner,
      repo: input.repo,
      issueNumber: input.issueNumber,
    });
  }

  public async createIssue(userId: string, input: CreateIssueInput) {
    const api = this.getGithubApi(userId);
    return await api.issues.create({
      owner: input.owner,
      repo: input.repo,
      title: input.title,
      body: input.body,
      labels: input.labels,
      assignees: input.assignees,
    });
  }

  public async updateIssue(userId: string, input: UpdateIssueInput) {
    const api = this.getGithubApi(userId);
    return await api.issues.update({
      owner: input.owner,
      repo: input.repo,
      issueNumber: input.issueNumber,
      title: input.title,
      body: input.body,
      state: input.state,
      labels: input.labels,
      assignees: input.assignees,
    });
  }

  public async createIssueComment(userId: string, input: CreateIssueCommentInput) {
    const api = this.getGithubApi(userId);
    return await api.issues.createComment({
      owner: input.owner,
      repo: input.repo,
      issueNumber: input.issueNumber,
      body: input.body,
    });
  }

  // --- PULL REQUESTS ---

  public async listPullRequests(userId: string, input: ListPullRequestsInput) {
    const api = this.getGithubApi(userId);
    return await api.pullRequests.list({
      owner: input.owner,
      repo: input.repo,
      state: input.state,
      perPage: input.perPage,
    });
  }

  public async getPullRequest(userId: string, input: GetPullRequestInput) {
    const api = this.getGithubApi(userId);
    return await api.pullRequests.get({
      owner: input.owner,
      repo: input.repo,
      pullNumber: input.pullNumber,
    });
  }

  public async createPullRequestReview(userId: string, input: CreatePullRequestReviewInput) {
    const api = this.getGithubApi(userId);
    return await api.pullRequests.createReview({
      owner: input.owner,
      repo: input.repo,
      pullNumber: input.pullNumber,
      body: input.body,
      event: input.event,
    });
  }
}
