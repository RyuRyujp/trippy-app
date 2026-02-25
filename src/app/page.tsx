import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { theme } from "@/lib/theme";
import { listTrips } from "@/lib/data/trips";
import type { TripSummary } from "@/types/trip";

function formatRange(start: string, end: string) {
  return `${start.replaceAll("-", "/")} – ${end.replaceAll("-", "/")}`;
}

function pickNextTrip(trips: TripSummary[]): TripSummary | null {
  // 今日以降の最短…の厳密化は次ステップで（timezone等）
  return trips.length > 0 ? trips[0] : null;
}

export default async function HomePage() {
  const trips = await listTrips();
  const nextTrip = pickNextTrip(trips);
  const recent = trips.slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 14 }}>
        <SectionTitle
          title="Next Trip"
          right={
            <Link href="/trips" style={{ textDecoration: "none", color: theme.colors.subtext }}>
              すべて見る <ChevronRight size={14} style={{ verticalAlign: "-2px" }} />
            </Link>
          }
        />

        {nextTrip ? (
          <Link href={`/trips/${nextTrip.id}`} style={{ textDecoration: "none" }}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 950, fontSize: 18, color: theme.colors.text }}>
                    {nextTrip.title}
                  </div>
                  <div style={{ marginTop: 6, color: theme.colors.subtext, fontSize: 12 }}>
                    {nextTrip.city ? `${nextTrip.city} • ` : ""}
                    {formatRange(nextTrip.startDate, nextTrip.endDate)}
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: 16,
                    padding: "10px 12px",
                    border: `1px solid ${theme.colors.border}`,
                    background: "rgba(255,255,255,0.7)",
                    fontWeight: 900,
                    color: theme.colors.text,
                    whiteSpace: "nowrap",
                    height: "fit-content",
                  }}
                >
                  Open
                </div>
              </div>
            </Card>
          </Link>
        ) : (
          <Card>
            <div style={{ fontWeight: 900, color: theme.colors.text }}>旅行がまだありません</div>
            <div style={{ marginTop: 6, color: theme.colors.subtext, fontSize: 12 }}>
              TRIPS から追加してください
            </div>
          </Card>
        )}

        <SectionTitle title="Recent Trips" />
        <div style={{ display: "grid", gap: 10 }}>
          {recent.map((t) => (
            <Link key={t.id} href={`/trips/${t.id}`} style={{ textDecoration: "none" }}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 900, color: theme.colors.text }}>{t.title}</div>
                    <div style={{ marginTop: 6, fontSize: 12, color: theme.colors.subtext }}>
                      {t.city ? `${t.city} • ` : ""}
                      {formatRange(t.startDate, t.endDate)}
                    </div>
                  </div>
                  <ChevronRight size={18} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}