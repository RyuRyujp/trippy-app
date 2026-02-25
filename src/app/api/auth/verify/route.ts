import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  if (e && typeof e === "object" && "message" in e) {
    const m = (e as { message?: unknown }).message;
    if (typeof m === "string") return m;
  }
  return "server error";
}

type VerifyBody = {
  email?: unknown;
  otp?: unknown;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as VerifyBody;
    const email = typeof body.email === "string" ? body.email : "";
    const otp = typeof body.otp === "string" ? body.otp : "";

    if (!email || !otp) {
      return NextResponse.json({ error: "email と otp は必須です" }, { status: 400 });
    }

    const supabase = await supabaseServer();
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user });
  } catch (e: unknown) {
    return NextResponse.json({ error: getErrorMessage(e) }, { status: 500 });
  }
}