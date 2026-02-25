import type React from "react";
import { theme } from "@/lib/theme";

export default function SectionTitle({
  title,
  right,
}: {
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 12,
        marginTop: 6,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 14, letterSpacing: 0.2, color: theme.colors.text }}>
        {title}
      </h2>
      {right ? <div style={{ fontSize: 12, color: theme.colors.subtext }}>{right}</div> : null}
    </div>
  );
}