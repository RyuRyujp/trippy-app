import { supabaseServer } from "@/lib/supabase/server";
import type { Trip, TripSummary } from "@/types/trip";

type TripRow = {
    id: string;
    title: string;
    city: string | null;
    start_date: string; // ISODate想定
    end_date: string;   // ISODate想定
    cover_url: string | null;
    created_at: string;
};

function toTrip(row: TripRow): Trip {
    return {
        id: row.id,
        title: row.title,
        city: row.city,
        startDate: row.start_date as Trip["startDate"],
        endDate: row.end_date as Trip["endDate"],
        coverUrl: row.cover_url,
        createdAt: row.created_at,
    };
}

function toTripSummary(row: TripRow): TripSummary {
    const t = toTrip(row);
    return {
        id: t.id,
        title: t.title,
        city: t.city,
        startDate: t.startDate,
        endDate: t.endDate,
        coverUrl: t.coverUrl,
    };
}

export async function listTrips(): Promise<TripSummary[]> {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
        .from("trips")
        .select("id,title,city,start_date,end_date,cover_url,created_at")
        .order("start_date", { ascending: true });

    if (error) throw new Error(error.message);
    if (!data) return [];

    return (data as TripRow[]).map(toTripSummary);
}

export async function getTrip(id: string): Promise<Trip | null> {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
        .from("trips")
        .select("id,title,city,start_date,end_date,cover_url,created_at")
        .eq("id", id)
        .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return null;

    return toTrip(data as TripRow);
}