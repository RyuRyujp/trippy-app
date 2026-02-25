"use client";

import { useState } from "react";
import { addMemoAction } from "@/lib/actions/tripDetails";
import { theme } from "@/lib/theme";

export default function AddMemoForm({ tripId }: { tripId: string }) {
  const [content, setContent] = useState("");

  return (
    <form action={addMemoAction} style={{ display: "flex", gap: 8 }}>
      <input type="hidden" name="tripId" value={tripId} />
      <input
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="メモを追加"
        style={input}
      />
      <button type="submit" style={btn} onClick={() => setContent("")}>追加</button>
    </form>
  );
}

const input: React.CSSProperties = {
  flex: 1,
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