import { frontendEnv } from "@repo/env/client";
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    frontendEnv.NEXT_PUBLIC_SUPABASE_URL!,
    frontendEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
