import { supabaseServer } from "@/lib/supabase/server";
import type { TripMember } from "@/types/expense";

type Row = {
  id: string;
  trip_id: string;
  name: string;
  created_at: string;
};

function toMember(r: Row): TripMember {
  return { id: r.id, tripId: r.trip_id, name: r.name, createdAt: r.created_at };
}

export async function listTripMembers(tripId: string): Promise<TripMember[]> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("trip_members")
    .select("id,trip_id,name,created_at")
    .eq("trip_id", tripId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => toMember(r as Row));
}

export async function addTripMember(tripId: string, name: string): Promise<void> {
  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new Error("Not authenticated");

  const { error } = await supabase.from("trip_members").insert({
    trip_id: tripId,
    user_id: u.user.id,
    name,
  });

  if (error) throw new Error(error.message);
}