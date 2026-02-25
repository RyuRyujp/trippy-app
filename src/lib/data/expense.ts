import { supabaseServer } from "@/lib/supabase/server";
import type { Expense, Transfer, TripMember } from "@/types/expense";
import type { ISODate } from "@/types/common";

type Row = {
  id: string;
  trip_id: string;
  title: string;
  amount: number;
  currency: string;
  paid_by_member_id: string | null;
  spent_on: string | null;
  created_at: string;
};

function toExpense(r: Row): Expense {
  return {
    id: r.id,
    tripId: r.trip_id,
    title: r.title,
    amount: r.amount,
    currency: "JPY",
    paidByMemberId: r.paid_by_member_id,
    spentOn: (r.spent_on as ISODate | null),
    createdAt: r.created_at,
  };
}

export async function listExpenses(tripId: string): Promise<Expense[]> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("expenses")
    .select("id,trip_id,title,amount,currency,paid_by_member_id,spent_on,created_at")
    .eq("trip_id", tripId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => toExpense(r as Row));
}

export async function addExpense(input: {
  tripId: string;
  title: string;
  amount: number;
  paidByMemberId: string | null;
  spentOn: ISODate | null;
}): Promise<void> {
  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new Error("Not authenticated");

  const { error } = await supabase.from("expenses").insert({
    trip_id: input.tripId,
    user_id: u.user.id,
    title: input.title,
    amount: input.amount,
    currency: "JPY",
    paid_by_member_id: input.paidByMemberId,
    spent_on: input.spentOn,
  });

  if (error) throw new Error(error.message);
}

/**
 * 等分精算（全員参加・全員同額負担）：
 * - 各expenseは「支払者が全額支払った」扱い
 * - 負担は membersCount で等分
 * - net = paid - share
 * - net>0 が受け取る、net<0 が払う → transfers を作る
 */
export function buildEqualSplitTransfers(
  members: TripMember[],
  expenses: Expense[]
): Transfer[] {
  const n = members.length;
  if (n === 0) return [];

  const paidMap = new Map<string, number>();
  members.forEach((m) => paidMap.set(m.id, 0));

  for (const e of expenses) {
    if (!e.paidByMemberId) continue;
    if (!paidMap.has(e.paidByMemberId)) continue;
    paidMap.set(e.paidByMemberId, (paidMap.get(e.paidByMemberId) ?? 0) + e.amount);
  }

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const share = Math.floor(total / n);
  const remainder = total - share * n;

  // 端数は先頭メンバーから+1円ずつ負担（デモ用の簡易ルール）
  const shareMap = new Map<string, number>();
  members.forEach((m, idx) => {
    shareMap.set(m.id, share + (idx < remainder ? 1 : 0));
  });

  type Bal = { id: string; bal: number }; // +:受取 / -:支払
  const balances: Bal[] = members.map((m) => ({
    id: m.id,
    bal: (paidMap.get(m.id) ?? 0) - (shareMap.get(m.id) ?? 0),
  }));

  const creditors = balances.filter((b) => b.bal > 0).sort((a, b) => b.bal - a.bal);
  const debtors = balances.filter((b) => b.bal < 0).sort((a, b) => a.bal - b.bal);

  const transfers: Transfer[] = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const d = debtors[i];
    const c = creditors[j];

    const pay = Math.min(-d.bal, c.bal);
    if (pay > 0) {
      transfers.push({ fromMemberId: d.id, toMemberId: c.id, amount: pay });
      d.bal += pay;
      c.bal -= pay;
    }

    if (d.bal === 0) i++;
    if (c.bal === 0) j++;
  }

  return transfers;
}