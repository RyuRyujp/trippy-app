"use client";

import { toggleTaskAction } from "@/lib/actions/tripDetails";
import { theme } from "@/lib/theme";
import type { ISODate } from "@/types/common";

export default function TaskToggle({
  taskId,
  done,
  title,
  dueDate,
}: {
  taskId: string;
  done: boolean;
  title: string;
  dueDate: ISODate | null;
}) {
  return (
    <form action={toggleTaskAction} style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <input type="hidden" name="taskId" value={taskId} />
      <input type="hidden" name="done" value={String(!done)} />

      <button
        type="submit"
        style={{
          width: 34,
          height: 34,
          borderRadius: 12,
          border: `1px solid ${theme.colors.border}`,
          background: done ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.7)",
          fontWeight: 900,
        }}
        aria-label="toggle"
      >
        {done ? "✓" : ""}
      </button>

      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 900, textDecoration: done ? "line-through" : "none" }}>{title}</div>
        {dueDate ? (
          <div style={{ marginTop: 4, fontSize: 12, color: theme.colors.subtext }}>
            Due: {dueDate.replaceAll("-", "/")}
          </div>
        ) : null}
      </div>
    </form>
  );
}