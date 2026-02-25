"use client";

import { addTaskAction } from "@/lib/actions/tripDetails";
import { theme } from "@/lib/theme";

export default function AddTaskForm({ tripId }: { tripId: string }) {
  return (
    <form action={addTaskAction} style={{ display: "grid", gap: 8 }}>
      <input type="hidden" name="tripId" value={tripId} />

      <input name="title" placeholder="タスク" style={input} />
      <input name="dueDate" type="date" style={input} />

      <button type="submit" style={btn}>追加</button>
    </form>
  );
}

const input: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 14,
  border: `1px solid ${theme.colors.border}`,
  background: "rgba(255,255,255,0.75)",
  fontWeight: 800,
  outline: "none",
};

const btn: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 14,
  border: `1px solid ${theme.colors.border}`,
  background: "rgba(255,255,255,0.75)",
  fontWeight: 900,
};