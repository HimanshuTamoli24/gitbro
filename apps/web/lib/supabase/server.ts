import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { frontendEnv } from "@repo/env/client";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    frontendEnv.NEXT_PUBLIC_SUPABASE_URL!,
    frontendEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet, _headers) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
