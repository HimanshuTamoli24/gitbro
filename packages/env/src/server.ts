import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import z from "zod";

function findEnvFile(startPath: string): string | undefined {
  let currentPath = startPath;
  while (currentPath !== path.parse(currentPath).root) {
    const envPath = path.join(currentPath, ".env");
    if (fs.existsSync(envPath)) {
      return envPath;
    }
    currentPath = path.dirname(currentPath);
  }
  return undefined;
}

const envPath = findEnvFile(process.cwd());
if (envPath) {
  dotenv.config({ path: envPath });
}

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),

  GEMINI_API_KEY: z.string().min(1),
  NODE_ENV: z.enum(["development", "production", "prod", "test"]).default("development"),
  LOGGER_LEVEL: z.enum(["error", "info", "debug"]).optional(),

  PORT: z.string().optional(),

  BASE_URL: z.string().url().default("http://localhost:8000"),
  JWT_SECRET: z.string().optional(),

  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),

  CORSAIR_KEK: z.string().min(32),
  CORSAIR_DEV_API_KEY: z.string().min(1),
  CORSAIR_DEV_SIGNING_SECRET: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errors = parsed.error.issues.map((issue) => {
    const key = issue.path.join(".");
    return `• ${key}: ${issue.message}`;
  });

  throw new Error(`❌ Environment validation failed\n\n${errors.join("\n")}`);
}

export const env = parsed.data;
