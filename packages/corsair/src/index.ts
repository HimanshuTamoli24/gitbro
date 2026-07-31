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
    redirectUri: `${env.BASE_URL}/api/oauth/callback`,
  },
  multiTenancy: true,
});

export { setupCorsair };
export { toExpressHandler } from "corsair";
export { processOAuthCallback } from "corsair/oauth";
