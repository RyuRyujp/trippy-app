import type React from "react";
import { theme } from "@/lib/theme";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: theme.colors.card,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.lg,
        boxShadow: theme.shadow.card,
        padding: 16,
      }}
    >
      {children}
    </div>
  );
}