"use client";

import { useState } from "react";
import { addMemberAction } from "@/lib/actions/tripDetails";
import { theme } from "@/lib/theme";

export default function AddMemberForm({ tripId }: { tripId: string }) {
  const [name, setName] = useState("");

  return (
    <form action={addMemberAction} style={{ display: "flex", gap: 8 }}>
      <input type="hidden" name="tripId" value={tripId} />
      <input
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="メンバー名"
        style={input}
      />
      <button type="submit" style={btn} onClick={() => setName("")}>
        追加
      </button>
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