"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, CalendarDays, Settings } from "lucide-react";
import { theme } from "@/lib/theme";

type Tab = {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
};

const tabs: readonly Tab[] = [
  { href: "/", label: "HOME", Icon: Home },
  { href: "/trips", label: "TRIPS", Icon: Map },
  { href: "/calendar", label: "CALENDAR", Icon: CalendarDays },
  { href: "/setting", label: "SETTING", Icon: Settings },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        background: "rgba(246, 247, 251, 0.85)",
        backdropFilter: "blur(10px)",
        borderTop: `1px solid ${theme.colors.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "10px 12px calc(10px + env(safe-area-inset-bottom))",
          display: "grid",
          gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
          gap: 6,
        }}
      >
        {tabs.map((t) => {
          const active = isActive(pathname, t.href);
          const color = active ? theme.colors.text : theme.colors.subtext;

          return (
            <Link
              key={t.href}
              href={t.href}
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "8px 8px",
                paddingBottom: "12px",
                borderRadius: 14,
                border: active ? `1px solid ${theme.colors.border}` : "1px solid transparent",
                background: active ? "rgba(255,255,255,0.65)" : "transparent",
                color,
                fontWeight: 800,
              }}
            >
              <t.Icon size={20} />
              <span style={{ fontSize: 11, letterSpacing: 0.2 }}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}