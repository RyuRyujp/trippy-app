import { supabaseServer } from "@/lib/supabase/server";
import type { ItineraryItem } from "@/types/itinerary";
import type { ISODate } from "@/types/common";

type Row = {
  id: string;
  trip_id: string;
  day_date: string;
  time_text: string | null;
  title: string;
  note: string | null;
  created_at: string;
};

function toItem(r: Row): ItineraryItem {
  return {
    id: r.id,
    tripId: r.trip_id,
    dayDate: r.day_date as ISODate,
    timeText: r.time_text,
    title: r.title,
    note: r.note,
    createdAt: r.created_at,
  };
}

export async function listItinerary(tripId: string): Promise<ItineraryItem[]> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase
    .from("itinerary_items")
    .select("id,trip_id,day_date,time_text,title,note,created_at")
    .eq("trip_id", tripId)
    .order("day_date", { ascending: true })
    .order("time_text", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => toItem(r as Row));
}

export async function addItineraryItem(input: {
  tripId: string;
  dayDate: ISODate;
  timeText: string | null;
  title: string;
  note: string | null;
}): Promise<void> {
  const supabase = await supabaseServer();
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new Error("Not authenticated");

  const { error } = await supabase.from("itinerary_items").insert({
    trip_id: input.tripId,
    user_id: u.user.id,
    day_date: input.dayDate,
    time_text: input.timeText,
    title: input.title,
    note: input.note,
  });

  if (error) throw new Error(error.message);
}