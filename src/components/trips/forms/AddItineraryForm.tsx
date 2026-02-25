"use client";

import { addItineraryAction } from "@/lib/actions/tripDetails";
import { theme } from "@/lib/theme";

export default function AddItineraryForm({ tripId }: { tripId: string }) {
  return (
    <form action={addItineraryAction} style={{ display: "grid", gap: 8 }}>
      <input type="hidden" name="tripId" value={tripId} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <input name="dayDate" type="date" style={input} />
        <input name="timeText" placeholder="10:00" style={input} />
      </div>

      <input name="title" placeholder="予定" style={input} />
      <input name="note" placeholder="メモ（任意）" style={input} />

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