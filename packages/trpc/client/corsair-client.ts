import { createCorsair } from "corsair";
import { github } from "@corsair-dev/github";
import { env } from "@repo/env";
import { Pool } from "pg";

const db = new Pool({
  connectionString: env.DATABASE_URL,
});

export const corsair: ReturnType<typeof createCorsair> = createCorsair({
  kek: env.CORSAIR_KEK,
  database: db,
  hub: {
    projectApiKey: env.CORSAIR_DEV_API_KEY,
    signingSecret: env.CORSAIR_DEV_SIGNING_SECRET,
  },
  plugins: [github({ authType: "managed" })],
});

export { toExpressHandler } from "corsair";
