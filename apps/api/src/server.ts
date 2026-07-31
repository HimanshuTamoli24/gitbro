import express from "express";
import { logger } from "@repo/logger";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as trpcExpress from "@trpc/server/adapters/express";
import { generateOpenApiDocument, createOpenApiExpressMiddleware } from "trpc-to-openapi";
import { apiReference } from "@scalar/express-api-reference";

import { serverRouter, createContext } from "@repo/trpc/server";
import { corsair, toExpressHandler, processOAuthCallback } from "@repo/corsair";
import { env } from "@repo/env";

export const app = express();
const openApiDocument = generateOpenApiDocument(serverRouter, {
  title: "Streamyst OpenAPI",
  version: "1.0.0",
  baseUrl: env.BASE_URL.concat("/api"),
});

if (env.NODE_ENV !== "prod") {
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  );
}

app.use(cookieParser());

app.use(express.json());

app.get("/api/oauth/callback", async (req, res) => {
  const code = req.query.code as string;
  const state = req.query.state as string;
  if (!code || !state) {
    return res.status(400).send("Missing code or state in OAuth callback.");
  }
  try {
    const result = await processOAuthCallback(corsair, {
      code,
      state,
      redirectUri: `${env.BASE_URL}/api/oauth/callback`,
    });
    console.log("[corsair] Successfully completed OAuth callback for tenant:", result);
    return res.redirect("http://localhost:3000");
  } catch (err: unknown) {
    console.error("OAuth Callback Error Detail:", err);
    return res.redirect(
      `http://localhost:3000/connect?error=${encodeURIComponent(
        err instanceof Error ? err.message : "OAuth callback failed",
      )}`,
    );
  }
});

app.use("/api/corsair", toExpressHandler(corsair));

app.get("/", (req, res) => {
  return res.json({ message: "Streamyst is up and running..." });
});

app.get("/health", (req, res) => {
  return res.json({ message: "Streamyst server is healthy", healthy: true });
});

logger.debug(`openapi.json: ${env.BASE_URL}/openapi.json`);
app.get("/openapi.json", (req, res) => {
  return res.json(openApiDocument);
});

logger.debug(`docs: ${env.BASE_URL}/docs`);
app.use("/docs", apiReference({ url: "/openapi.json" }));

app.use(
  "/api",
  createOpenApiExpressMiddleware({
    router: serverRouter,
    createContext,
  }),
);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: serverRouter,
    createContext,
  }),
);

export default app;
