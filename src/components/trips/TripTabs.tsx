"use client";

import Link from "next/link";
import { theme } from "@/lib/theme";
import type { TripTabKey } from "@/types/trip";

const tabs: ReadonlyArray<{ key: TripTabKey; label: string }> = [
  { key: "itinerary", label: "旅程" },
  { key: "memo_task", label: "メモ・タスク" },
  { key: "expense", label: "費用（割り勘）" },
];

export default function TripTabs({
  tripId,
  active,
}: {
  tripId: string;
  active: TripTabKey;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 8,
      }}
    >
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <Link
            key={t.key}
            href={`/trips/${encodeURIComponent(tripId)}?tab=${encodeURIComponent(t.key)}`}
            style={{
              textDecoration: "none",
              borderRadius: theme.radius.lg,
              border: `1px solid ${theme.colors.border}`,
              background: on ? "rgba(255,255,255,0.70)" : "rgba(255,255,255,0.45)",
              padding: "10px 10px",
              textAlign: "center",
              fontWeight: 900,
              color: on ? theme.colors.text : theme.colors.subtext,
            }}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}