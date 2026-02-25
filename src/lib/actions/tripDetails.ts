"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import type { ISODate } from "@/types/common";

export async function addMemberAction(formData: FormData): Promise<void> {
  const tripId = String(formData.get("tripId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!tripId || !name) throw new Error("tripId/name required");

  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/login");

  const { error } = await supabase.from("trip_members").insert({ trip_id: tripId, user_id: u.user.id, name });
  if (error) throw new Error(error.message);
}

export async function addItineraryAction(formData: FormData): Promise<void> {
  const tripId = String(formData.get("tripId") ?? "");
  const dayDate = String(formData.get("dayDate") ?? "") as ISODate;
  const timeText = String(formData.get("timeText") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const note = String(formData.get("note") ?? "").trim();
  if (!tripId || !dayDate || !title) throw new Error("tripId/dayDate/title required");

  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/login");

  const { error } = await supabase.from("itinerary_items").insert({
    trip_id: tripId,
    user_id: u.user.id,
    day_date: dayDate,
    time_text: timeText || null,
    title,
    note: note || null,
  });
  if (error) throw new Error(error.message);
}

export async function addMemoAction(formData: FormData): Promise<void> {
  const tripId = String(formData.get("tripId") ?? "");
  const content = String(formData.get("content") ?? "").trim();
  if (!tripId || !content) throw new Error("tripId/content required");

  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/login");

  const { error } = await supabase.from("memos").insert({ trip_id: tripId, user_id: u.user.id, content });
  if (error) throw new Error(error.message);
}

export async function addTaskAction(formData: FormData): Promise<void> {
  const tripId = String(formData.get("tripId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const dueDateRaw = String(formData.get("dueDate") ?? "").trim();
  const dueDate = (dueDateRaw ? (dueDateRaw as ISODate) : null);

  if (!tripId || !title) throw new Error("tripId/title required");

  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/login");

  const { error } = await supabase.from("tasks").insert({
    trip_id: tripId,
    user_id: u.user.id,
    title,
    due_date: dueDate,
  });
  if (error) throw new Error(error.message);
}

export async function toggleTaskAction(formData: FormData): Promise<void> {
  const taskId = String(formData.get("taskId") ?? "");
  const done = String(formData.get("done") ?? "") === "true";
  if (!taskId) throw new Error("taskId required");

  const supabase = await supabaseServer();
  const { error } = await supabase.from("tasks").update({ done }).eq("id", taskId);
  if (error) throw new Error(error.message);
}

export async function addExpenseAction(formData: FormData): Promise<void> {
  const tripId = String(formData.get("tripId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const amount = Number(formData.get("amount") ?? 0);
  const paidByMemberIdRaw = String(formData.get("paidByMemberId") ?? "");
  const spentOnRaw = String(formData.get("spentOn") ?? "").trim();

  if (!tripId || !title || !Number.isFinite(amount) || amount <= 0) {
    throw new Error("tripId/title/amount required");
  }

  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/login");

  const { error } = await supabase.from("expenses").insert({
    trip_id: tripId,
    user_id: u.user.id,
    title,
    amount: Math.trunc(amount),
    currency: "JPY",
    paid_by_member_id: paidByMemberIdRaw ? paidByMemberIdRaw : null,
    spent_on: spentOnRaw ? spentOnRaw : null,
  });
  if (error) throw new Error(error.message);
}