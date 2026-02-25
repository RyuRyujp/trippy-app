"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "@/lib/theme";
import { appConfig } from "@/lib/config/app";

const tabs = [
  { href: "/", label: "ホーム" },
  { href: "/trips", label: "旅行" },
  { href: "/settings", label: "設定" },
] as const;

export default function AppHeader() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: theme.colors.bg,
        borderBottom: `1px solid ${theme.colors.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ fontWeight: 800, color: theme.colors.text }}>{appConfig.name}</div>

        <nav style={{ display: "flex", gap: 10 }}>
          {tabs.map((t) => {
            const active = pathname === t.href;
            return (
              <Link
                key={t.href}
                href={t.href}
                style={{
                  padding: "8px 10px",
                  borderRadius: 12,
                  textDecoration: "none",
                  color: active ? theme.colors.text : theme.colors.subtext,
                  border: active ? `1px solid ${theme.colors.border}` : "1px solid transparent",
                  background: active ? "rgba(255,255,255,0.6)" : "transparent",
                  fontWeight: 700,
                }}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}