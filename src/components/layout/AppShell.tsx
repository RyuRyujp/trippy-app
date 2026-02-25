import type React from "react";
import AppHeader from "@/components/layout/AppHeader";
import { theme } from "@/lib/theme";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg }}>
      <AppHeader />

      <main
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "14px 16px 40px",
        }}
      >
        {children}
      </main>
    </div>
  );
}