"use client";

import { addExpenseAction } from "@/lib/actions/tripDetails";
import { theme } from "@/lib/theme";
import type { TripMember } from "@/types/expense";

export default function AddExpenseForm({
  tripId,
  members,
}: {
  tripId: string;
  members: TripMember[];
}) {
  return (
    <form action={addExpenseAction} style={{ display: "grid", gap: 8 }}>
      <input type="hidden" name="tripId" value={tripId} />

      <input name="title" placeholder="例：ホテル" style={input} />
      <input name="amount" inputMode="numeric" placeholder="金額（円）" style={input} />
      <input name="spentOn" type="date" style={input} />

      <select name="paidByMemberId" style={input}>
        <option value="">支払者（任意）</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

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