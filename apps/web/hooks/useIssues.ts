import { trpc } from "~/trpc/client";
import type { ListIssuesInput, GetIssueInput } from "@repo/services/github";

export const useIssues = (input?: ListIssuesInput) => {
  return trpc.github.issuesList.useQuery(input ?? {});
};

export const useIssue = (input: GetIssueInput) => {
  return trpc.github.issuesGet.useQuery(input, {
    enabled: Boolean(input.owner && input.repo && input.issueNumber),
  });
};

export const useCreateIssue = () => {
  return trpc.github.issuesCreate.useMutation();
};

export const useUpdateIssue = () => {
  return trpc.github.issuesUpdate.useMutation();
};

export const useCreateIssueComment = () => {
  return trpc.github.issuesCreateComment.useMutation();
};
