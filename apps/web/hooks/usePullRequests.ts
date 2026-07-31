import { trpc } from "~/trpc/client";
import type { ListPullRequestsInput, GetPullRequestInput } from "@repo/services/github";

export const usePullRequests = (input: ListPullRequestsInput) => {
  return trpc.github.pullRequestsList.useQuery(input, {
    enabled: Boolean(input.owner && input.repo),
  });
};

export const usePullRequest = (input: GetPullRequestInput) => {
  return trpc.github.pullRequestsGet.useQuery(input, {
    enabled: Boolean(input.owner && input.repo && input.pullNumber),
  });
};

export const useCreatePullRequestReview = () => {
  return trpc.github.pullRequestsCreateReview.useMutation();
};
