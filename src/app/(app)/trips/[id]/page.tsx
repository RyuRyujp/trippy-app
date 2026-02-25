import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { getTrip } from "@/lib/data/trips";
import type { PageProps } from "@/types/ui";
import type { TripTabKey } from "@/types/trip";
import TripTabs from "@/components/trips/TripTabs";

function resolveTab(raw: string | string[] | undefined): TripTabKey {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (v === "itinerary" || v === "memo_task" || v === "expense") return v;
  return "itinerary";
}

export default async function TripDetailPage(
  props: PageProps<{ id: string }>
) {
  const { id } = props.params;
  const tab = resolveTab(props.searchParams?.tab);

  const trip = await getTrip(id);
  if (!trip) {
    return (
      <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <Card>
            <div style={{ fontWeight: 900 }}>Trip not found</div>
          </Card>
        </div>
      </div>
    );
  }

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
          {tab === "itinerary" && <div>旅程（ここに日別の行程を実装）</div>}
          {tab === "memo_task" && <div>メモ・タスク（ここに一覧＋追加を実装）</div>}
          {tab === "expense" && <div>費用（割り勘計算）（ここに精算UIを実装）</div>}
        </Card>
      </div>
    </div>
  );
}