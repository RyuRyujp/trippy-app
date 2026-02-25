import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/lib/config/env";

type CookiesToSet = Array<{
  name: string;
  value: string;
  options?: unknown;
}>;

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookiesToSet) {
          type SetOptions = Parameters<typeof response.cookies.set>[2];

          cookiesToSet.forEach(({ name, value, options }) => {
            // request.cookies.set は不要（NextRequest 側は基本読み取り用）
            response.cookies.set(name, value, options as unknown as SetOptions);
          });
        },
      },
    }
  );

  // セッションの更新/検証
  await supabase.auth.getUser();

  return response;
}