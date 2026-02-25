import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { getTrip } from "@/lib/data/trips";
import type { TripTabKey } from "@/types/trip";
import TripTabs from "@/components/trips/TripTabs";
import ItineraryTab from "@/components/trips/ItineraryTab";
import MemoTaskTab from "@/components/trips/MemoTaskTab";
import ExpenseTab from "@/components/trips/ExpenseTab";
import { notFound } from "next/navigation";

function resolveTab(raw: string | string[] | undefined): TripTabKey {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "itinerary" || v === "memo_task" || v === "expense") return v;
  return "itinerary";
}

type SP = { tab?: string | string[] };

export default async function TripDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<SP>;
}) {
  const { id } = await params;                 // ★ await
  const sp = (await searchParams) ?? {};       // ★ await（無い場合は {}）
  const tab = resolveTab(sp.tab);

  if (!id) notFound();

  const trip = await getTrip(id);
  if (!trip) notFound();

  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 12 }}>
        <Card>
          <div style={{ fontWeight: 950, fontSize: 18, color: theme.colors.text }}>{trip.title}</div>
          <div style={{ marginTop: 6, fontSize: 12, color: theme.colors.subtext }}>
            {trip.city ? `${trip.city} • ` : ""}
            {trip.startDate.replaceAll("-", "/")} – {trip.endDate.replaceAll("-", "/")}
          </div>
        </Card>

        <TripTabs tripId={trip.id} active={tab} />

        <Card>
          {tab === "itinerary" && <ItineraryTab tripId={trip.id} />}
          {tab === "memo_task" && <MemoTaskTab tripId={trip.id} />}
          {tab === "expense" && <ExpenseTab tripId={trip.id} />}
        </Card>
      </div>
    </div>
  );
}