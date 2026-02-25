import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { listTripMembers } from "@/lib/data/tripMembers";
import { listExpenses, buildEqualSplitTransfers } from "@/lib/data/expense";
import AddMemberForm from "@/components/trips/forms/AddMemberForm";
import AddExpenseForm from "@/components/trips/forms/AddExpenseForm";

export default async function ExpenseTab({ tripId }: { tripId: string }) {
  const [members, expenses] = await Promise.all([listTripMembers(tripId), listExpenses(tripId)]);
  const transfers = buildEqualSplitTransfers(members, expenses);

  const nameById = new Map(members.map((m) => [m.id, m.name]));

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <Card>
        <div style={{ fontWeight: 900, color: theme.colors.text }}>参加者</div>
        <div style={{ marginTop: 10 }}>
          <AddMemberForm tripId={tripId} />
        </div>
        <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {members.map((m) => (
            <span
              key={m.id}
              style={{
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 999,
                padding: "6px 10px",
                background: "rgba(255,255,255,0.6)",
                fontWeight: 900,
                fontSize: 12,
              }}
            >
              {m.name}
            </span>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ fontWeight: 900, color: theme.colors.text }}>費用</div>
        <div style={{ marginTop: 10 }}>
          <AddExpenseForm tripId={tripId} members={members} />
        </div>
      </Card>

      {expenses.map((e) => (
        <Card key={e.id}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 900 }}>{e.title}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: theme.colors.subtext }}>
                {e.spentOn ? e.spentOn.replaceAll("-", "/") : ""}
                {e.paidByMemberId ? ` • paid by ${nameById.get(e.paidByMemberId) ?? "?"}` : ""}
              </div>
            </div>
            <div style={{ fontWeight: 950 }}>{e.amount.toLocaleString()}円</div>
          </div>
        </Card>
      ))}

      <Card>
        <div style={{ fontWeight: 900, color: theme.colors.text }}>精算（等分）</div>
        <div style={{ marginTop: 8, fontSize: 12, color: theme.colors.subtext }}>
          “全員が同額負担” のデモ精算です（後で個別参加/割合にも拡張できます）
        </div>

        <div style={{ marginTop: 10, display: "grid", gap: 8 }}>
          {transfers.length === 0 ? (
            <div style={{ color: theme.colors.subtext }}>送金は不要です</div>
          ) : (
            transfers.map((t, idx) => (
              <div
                key={idx}
                style={{
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: 14,
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.55)",
                  fontWeight: 900,
                }}
              >
                {nameById.get(t.fromMemberId) ?? "?"} → {nameById.get(t.toMemberId) ?? "?"} ：{" "}
                {t.amount.toLocaleString()}円
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}