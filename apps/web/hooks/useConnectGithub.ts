import { trpc } from "~/trpc/client";

export const useConnectGithub = () => {
  return trpc.github.connectGithub.useQuery(undefined, {
    enabled: false, // Manual trigger / lazy query
  });
};
