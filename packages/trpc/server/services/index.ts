import { UserService } from "@repo/services/user";
import { GithubService } from "@repo/services/github";

export const userService = new UserService();
export const githubService = new GithubService();
