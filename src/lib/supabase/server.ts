import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/lib/config/env";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

export const supabaseServer = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            // Next.js の実行環境によって cookies() が Readonly で set できない場合がある
            const store = cookieStore as unknown as {
              set?: (name: string, value: string, options?: CookieOptions) => void;
            };

            if (!store.set) return;

            cookiesToSet.forEach(({ name, value, options }) => {
              store.set!(name, value, options);
            });
          } catch {
            // Server Components などで set できないケースは握りつぶし（middlewareで更新される前提）
          }
        },
      },
    }
  );
};