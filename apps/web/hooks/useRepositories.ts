import { trpc } from "~/trpc/client";
import type {
  ListRepositoriesInput,
  ListBranchesInput,
  ListCommitsInput,
  GetContentInput,
} from "@repo/services/github";

export const useRepositories = (input?: ListRepositoriesInput) => {
  return trpc.github.repositoriesList.useQuery(input ?? {});
};

export const useUserRepos = () => {
  return trpc.github.repo.useQuery();
};

export const useStarRepository = () => {
  return trpc.github.repositoriesStar.useMutation();
};

export const useUnstarRepository = () => {
  return trpc.github.repositoriesUnstar.useMutation();
};

export const useRepositoryBranches = (input: ListBranchesInput) => {
  return trpc.github.repositoriesListBranches.useQuery(input, {
    enabled: Boolean(input.owner && input.repo),
  });
};

export const useRepositoryCommits = (input: ListCommitsInput) => {
  return trpc.github.repositoriesListCommits.useQuery(input, {
    enabled: Boolean(input.owner && input.repo),
  });
};

export const useRepositoryContent = (input: GetContentInput) => {
  return trpc.github.repositoriesContent.useQuery(input, {
    enabled: Boolean(input.owner && input.repo),
  });
};
