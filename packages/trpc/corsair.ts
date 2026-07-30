import { createCorsair, setupCorsair } from "corsair";
import { github } from "@corsair-dev/github";
import { Pool } from "pg";
import { env } from "@repo/env";

const db = new Pool({ connectionString: env.DATABASE_URL });

export const corsair = createCorsair({
  plugins: [github({ authType: "oauth_2" })],
  database: db,
  kek: env.CORSAIR_KEK,
  manual: {
    baseUrl: `${env.BASE_URL}/api/corsair/connect`,
    redirectUri: `${env.BASE_URL}/api/corsair/github/callback`,
  },
  multiTenancy: true,
});

if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
  (async () => {
    try {
      if (env.GITHUB_CLIENT_SECRET.length !== 40) {
        console.warn(
          `[corsair] WARNING: GITHUB_CLIENT_SECRET length is ${env.GITHUB_CLIENT_SECRET.length} characters (GitHub client secrets must be exactly 40 hex characters). Please check your .env file!`,
        );
      }
      await setupCorsair(corsair);
      await corsair.keys.github.set_client_id(env.GITHUB_CLIENT_ID);
      await corsair.keys.github.set_client_secret(env.GITHUB_CLIENT_SECRET);
      console.log(
        `[corsair] GitHub OAuth credentials configured successfully (Client ID: ${env.GITHUB_CLIENT_ID}).`,
      );
    } catch (err) {
      console.error("[corsair] Error setting up GitHub credentials:", err);
    }
  })();
}

export { toExpressHandler } from "corsair";
