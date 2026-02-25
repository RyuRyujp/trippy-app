"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { appConfig } from "@/lib/config/app";
import { theme } from "@/lib/theme";

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "string") return e;
  if (e && typeof e === "object" && "message" in e) {
    const m = (e as { message?: unknown }).message;
    if (typeof m === "string") return m;
  }
  return "不明なエラーが発生しました";
}

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const supabase = supabaseBrowser();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });
      if (error) throw error;

      setStep("otp");
      setMsg("認証コードをメールに送信しました。");
    } catch (e: unknown) {
      setErr(getErrorMessage(e) || "送信に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setErr(null);
    setMsg(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      // 失敗時に JSON じゃない可能性もあるのでガード
      const json: unknown = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          typeof (json as { error?: unknown })?.error === "string"
            ? (json as { error: string }).error
            : "認証に失敗しました";
        throw new Error(message);
      }

      window.location.href = "/";
    } catch (e: unknown) {
      setErr(getErrorMessage(e) || "認証に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div
        style={{
          maxWidth: 420,
          margin: "40px auto",
          background: theme.colors.card,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radius.lg,
          boxShadow: theme.shadow.card,
          padding: 18,
        }}
      >
        <h1 style={{ margin: 0, color: theme.colors.text }}>{appConfig.name} ログイン</h1>
        <p style={{ marginTop: 8, color: theme.colors.subtext }}>
          メールアドレスだけでログインできます。
        </p>

        {step === "email" ? (
          <>
            <label style={{ display: "block", marginTop: 14, color: theme.colors.text }}>
              メール
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: "100%",
                marginTop: 8,
                padding: "12px 12px",
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                outline: "none",
              }}
            />
            <button
              onClick={sendOtp}
              disabled={loading || !email}
              style={{
                width: "100%",
                marginTop: 14,
                padding: "12px 12px",
                borderRadius: theme.radius.md,
                border: "none",
                background: theme.colors.primary,
                color: "white",
                fontWeight: 700,
                opacity: loading || !email ? 0.6 : 1,
              }}
            >
              {loading ? "送信中..." : "認証コードを送る"}
            </button>
          </>
        ) : (
          <>
            <label style={{ display: "block", marginTop: 14, color: theme.colors.text }}>
              認証コード（{appConfig.auth.otpLength}桁）
            </label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              inputMode="numeric"
              style={{
                width: "100%",
                marginTop: 8,
                padding: "12px 12px",
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                outline: "none",
                letterSpacing: 2,
              }}
            />
            <button
              onClick={verifyOtp}
              disabled={loading || otp.length < 4}
              style={{
                width: "100%",
                marginTop: 14,
                padding: "12px 12px",
                borderRadius: theme.radius.md,
                border: "none",
                background: theme.colors.primary,
                color: "white",
                fontWeight: 700,
                opacity: loading || otp.length < 4 ? 0.6 : 1,
              }}
            >
              {loading ? "確認中..." : "ログイン"}
            </button>

            <button
              onClick={() => setStep("email")}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: 10,
                padding: "10px 12px",
                borderRadius: theme.radius.md,
                border: `1px solid ${theme.colors.border}`,
                background: "transparent",
              }}
            >
              メールを変更
            </button>
          </>
        )}

        {msg && <p style={{ marginTop: 12, color: theme.colors.text }}>{msg}</p>}
        {err && <p style={{ marginTop: 12, color: "crimson" }}>{err}</p>}
      </div>
    </div>
  );
}