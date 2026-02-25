"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

type NewTripRow = {
  id: string;
};

export async function seedDemoAction(): Promise<void> {
  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/login");

  // 1) trip作成
  const { data: tripData, error: tripErr } = await supabase
    .from("trips")
    .insert({
      user_id: u.user.id,
      title: "Demo Trip - Paris",
      city: "Paris",
      start_date: "2026-03-10",
      end_date: "2026-03-15",
      cover_url: null,
    })
    .select("id")
    .single();

  if (tripErr) throw new Error(tripErr.message);
  const tripId = (tripData as NewTripRow).id;

  // 2) members
  const { data: members, error: memErr } = await supabase
    .from("trip_members")
    .insert([
      { trip_id: tripId, user_id: u.user.id, name: "Leo" },
      { trip_id: tripId, user_id: u.user.id, name: "Alice" },
      { trip_id: tripId, user_id: u.user.id, name: "Bob" },
    ])
    .select("id,name")
    .order("created_at", { ascending: true });

  if (memErr) throw new Error(memErr.message);
  const m = (members ?? []) as Array<{ id: string; name: string }>;
  const leo = m.find((x) => x.name === "Leo")?.id ?? null;
  const alice = m.find((x) => x.name === "Alice")?.id ?? null;

  // 3) itinerary
  const { error: itiErr } = await supabase.from("itinerary_items").insert([
    { trip_id: tripId, user_id: u.user.id, day_date: "2026-03-10", time_text: "10:00", title: "到着 → ホテル", note: "荷物預ける" },
    { trip_id: tripId, user_id: u.user.id, day_date: "2026-03-11", time_text: "09:30", title: "ルーブル美術館", note: "" },
    { trip_id: tripId, user_id: u.user.id, day_date: "2026-03-12", time_text: "19:00", title: "ディナー", note: "予約" },
  ]);
  if (itiErr) throw new Error(itiErr.message);

  // 4) memos / tasks
  const { error: memoErr } = await supabase.from("memos").insert([
    { trip_id: tripId, user_id: u.user.id, content: "美術館チケット事前予約" },
    { trip_id: tripId, user_id: u.user.id, content: "地下鉄の乗り方メモ" },
  ]);
  if (memoErr) throw new Error(memoErr.message);

  const { error: taskErr } = await supabase.from("tasks").insert([
    { trip_id: tripId, user_id: u.user.id, title: "パスポート確認", done: true, due_date: "2026-03-05" },
    { trip_id: tripId, user_id: u.user.id, title: "eSIM購入", done: false, due_date: "2026-03-07" },
  ]);
  if (taskErr) throw new Error(taskErr.message);

  // 5) expenses
  const { error: expErr } = await supabase.from("expenses").insert([
    { trip_id: tripId, user_id: u.user.id, title: "ホテル", amount: 30000, currency: "JPY", paid_by_member_id: leo, spent_on: "2026-03-10" },
    { trip_id: tripId, user_id: u.user.id, title: "ミュージアム", amount: 9000, currency: "JPY", paid_by_member_id: alice, spent_on: "2026-03-11" },
    { trip_id: tripId, user_id: u.user.id, title: "ディナー", amount: 12000, currency: "JPY", paid_by_member_id: leo, spent_on: "2026-03-12" },
  ]);
  if (expErr) throw new Error(expErr.message);
}