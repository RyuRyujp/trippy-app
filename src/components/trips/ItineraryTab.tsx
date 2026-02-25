import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { listItinerary } from "@/lib/data/itinerary";
import AddItineraryForm from "@/components/trips/forms/AddItineraryForm";

export default async function ItineraryTab({ tripId }: { tripId: string }) {
  const items = await listItinerary(tripId);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <Card>
        <div style={{ fontWeight: 900, color: theme.colors.text }}>旅程</div>
        <div style={{ marginTop: 6, fontSize: 12, color: theme.colors.subtext }}>
          日付/時刻/内容を追加できます
        </div>
        <div style={{ marginTop: 10 }}>
          <AddItineraryForm tripId={tripId} />
        </div>
      </Card>

      {items.map((it) => (
        <Card key={it.id}>
          <div style={{ fontWeight: 900 }}>{it.title}</div>
          <div style={{ marginTop: 6, fontSize: 12, color: theme.colors.subtext }}>
            {it.dayDate.replaceAll("-", "/")} {it.timeText ?? ""}
          </div>
          {it.note ? <div style={{ marginTop: 8 }}>{it.note}</div> : null}
        </Card>
      ))}
    </div>
  );
}