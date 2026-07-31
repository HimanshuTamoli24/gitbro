import { trpc } from "~/trpc/client";
import type { GetRepositoryInput } from "@repo/services/github";

export const useRepository = (input: GetRepositoryInput) => {
  return trpc.github.repositoriesGet.useQuery(input, {
    enabled: Boolean(input.owner && input.repo),
  });
};
