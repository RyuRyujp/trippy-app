"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

type Created = { id: string };

export async function createTripAction(formData: FormData): Promise<void> {
  const title = String(formData.get("title") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const start = String(formData.get("startDate") ?? "").trim();
  const end = String(formData.get("endDate") ?? "").trim();

  if (!title || !start || !end) {
    throw new Error("title/startDate/endDate は必須です");
  }

  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) redirect("/login");

  const { data, error } = await supabase
    .from("trips")
    .insert({
      user_id: u.user.id,
      title,
      city: city || null,
      start_date: start,
      end_date: end,
      cover_url: null,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  const id = (data as Created).id;
  redirect(`/trips/${encodeURIComponent(id)}`);
}