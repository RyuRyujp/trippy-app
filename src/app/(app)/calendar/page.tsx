import Link from "next/link";
import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { listTrips } from "@/lib/data/trips";
import type { TripSummary } from "@/types/trip";

type DayCell = {
  y: number;
  m: number; // 1-12
  d: number; // 1-31
  iso: string; // YYYY-MM-DD
  inMonth: boolean;
};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function toISODate(y: number, m: number, d: number) {
  return `${y}-${pad2(m)}-${pad2(d)}`;
}

function buildMonthGrid(year: number, month1to12: number): DayCell[] {
  const first = new Date(year, month1to12 - 1, 1);
  const startDow = first.getDay(); // 0=Sun
  const start = new Date(year, month1to12 - 1, 1 - startDow);

  const cells: DayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const dt = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const y = dt.getFullYear();
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    cells.push({
      y,
      m,
      d,
      iso: toISODate(y, m, d),
      inMonth: m === month1to12,
    });
  }
  return cells;
}

function isInRange(iso: string, start: string, end: string) {
  return start <= iso && iso <= end;
}

function tripsForDay(trips: TripSummary[], iso: string) {
  return trips.filter((t) => isInRange(iso, t.startDate, t.endDate));
}

export default async function CalendarPage() {
  const trips = await listTrips();

  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;

  const cells = buildMonthGrid(y, m);

  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 12 }}>
        <Card>
          <div style={{ fontWeight: 950, fontSize: 18, color: theme.colors.text }}>
            CALENDAR
          </div>
          <div style={{ marginTop: 6, fontSize: 12, color: theme.colors.subtext }}>
            {y}/{pad2(m)}
          </div>
        </Card>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 8,
          }}
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
            <div key={w} style={{ fontSize: 11, color: theme.colors.subtext, fontWeight: 800 }}>
              {w}
            </div>
          ))}

          {cells.map((c) => {
            const hits = tripsForDay(trips, c.iso);
            const hasTrip = hits.length > 0;

            return (
              <div
                key={c.iso}
                style={{
                  borderRadius: 14,
                  border: `1px solid ${theme.colors.border}`,
                  background: hasTrip
                    ? "rgba(255,255,255,0.75)"
                    : "rgba(255,255,255,0.45)",
                  padding: 10,
                  minHeight: 62,
                  opacity: c.inMonth ? 1 : 0.55,
                }}
              >
                <div style={{ fontWeight: 900, color: theme.colors.text }}>{c.d}</div>

                {hasTrip ? (
                  <div style={{ marginTop: 6, display: "grid", gap: 4 }}>
                    {hits.slice(0, 2).map((t) => (
                      <Link
                        key={t.id}
                        href={`/trips/${t.id}`}
                        style={{
                          textDecoration: "none",
                          fontSize: 11,
                          fontWeight: 800,
                          color: theme.colors.text,
                          border: `1px solid ${theme.colors.border}`,
                          borderRadius: 10,
                          padding: "4px 6px",
                          background: "rgba(255,255,255,0.65)",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        title={t.title}
                      >
                        {t.title}
                      </Link>
                    ))}
                    {hits.length > 2 ? (
                      <div style={{ fontSize: 11, color: theme.colors.subtext, fontWeight: 800 }}>
                        +{hits.length - 2}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}