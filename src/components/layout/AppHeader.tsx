"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Home, Map, CalendarDays, Settings } from "lucide-react";

import { theme } from "@/lib/theme";
import { appConfig } from "@/lib/config/app";

type NavItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number }>;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items: readonly NavItem[] = useMemo(
    () => [
      { href: appConfig.nav.home.href, label: appConfig.nav.home.label, Icon: Home },
      { href: appConfig.nav.trips.href, label: appConfig.nav.trips.label, Icon: Map },
      { href: appConfig.nav.calendar.href, label: appConfig.nav.calendar.label, Icon: CalendarDays },
      { href: appConfig.nav.setting.href, label: appConfig.nav.setting.label, Icon: Settings },
    ],
    []
  );

  // ドロワーが開いている間は背景スクロールを止める（iOSっぽい挙動）
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(246, 247, 251, 0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${theme.colors.border}`,
        }}
      >
        <div
          style={{
            maxWidth: 980,
            margin: "0 auto",
            padding: "12px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* Left: App icon + logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: theme.colors.text,
              minWidth: 0,
            }}
          >
            {/* App Icon */}
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                overflow: "hidden",
                border: `1px solid ${theme.colors.border}`,
                background: "rgba(255,255,255,0.7)",
                flex: "0 0 auto",
              }}
            >
              <Image
                src={appConfig.appIconSrc}
                alt="App Icon"
                width={34}
                height={34}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                priority
              />
            </div>

            {/* Logo */}
            <div style={{ minWidth: 0 }}>
              {appConfig.logoSrc ? (
                <Image
                  src={appConfig.logoSrc}
                  alt={appConfig.name}
                  width={120}
                  height={24}
                  style={{ height: 22, width: "auto" }}
                  priority
                />
              ) : (
                <div
                  style={{
                    fontWeight: 900,
                    letterSpacing: 0.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {appConfig.logoText}
                </div>
              )}
              <div style={{ fontSize: 12, color: theme.colors.subtext, marginTop: 2 }}>
                {items.find((x) => isActive(pathname, x.href))?.label ?? ""}
              </div>
            </div>
          </Link>

          {/* Right: Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              width: 40,
              height: 40,
              borderRadius: 14,
              border: `1px solid ${theme.colors.border}`,
              background: "rgba(255,255,255,0.65)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Drawer Overlay */}
      {open && (
        <div
          role="presentation"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            background: "rgba(0,0,0,0.25)",
          }}
        >
          {/* Drawer */}
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "min(340px, 86vw)",
              background: "rgba(246, 247, 251, 0.92)",
              backdropFilter: "blur(12px)",
              borderLeft: `1px solid ${theme.colors.border}`,
              padding: "14px 14px calc(14px + env(safe-area-inset-bottom))",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 900 }}>{appConfig.name}</div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 14,
                  border: `1px solid ${theme.colors.border}`,
                  background: "rgba(255,255,255,0.65)",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ height: 8 }} />

            <div style={{ display: "grid", gap: 8 }}>
              {items.map((it) => {
                const active = isActive(pathname, it.href);
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    style={{
                      textDecoration: "none",
                      color: theme.colors.text,
                      borderRadius: theme.radius.lg,
                      border: active ? `1px solid ${theme.colors.border}` : `1px solid transparent`,
                      background: active ? "rgba(255,255,255,0.70)" : "transparent",
                      padding: "12px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontWeight: 900,
                    }}
                  >
                    <it.Icon size={18} />
                    <span>{it.label}</span>
                  </Link>
                );
              })}
            </div>

            <div style={{ flex: 1 }} />

            <div style={{ color: theme.colors.subtext, fontSize: 12 }}>
              v0.1.0
            </div>
          </div>
        </div>
      )}
    </>
  );
}