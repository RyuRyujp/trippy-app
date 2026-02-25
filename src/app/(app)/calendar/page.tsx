import Link from "next/link";
import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { listTrips } from "@/lib/data/trips";
import type { TripSummary } from "@/types/trip";

type DayCell = { iso: string; d: number; inMonth: boolean };

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function iso(y: number, m: number, d: number) {
  return `${y}-${pad2(m)}-${pad2(d)}`;
}

function buildGrid(y: number, m1: number): DayCell[] {
  const first = new Date(y, m1 - 1, 1);
  const startDow = first.getDay();
  const start = new Date(y, m1 - 1, 1 - startDow);

  const cells: DayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const dt = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    const yy = dt.getFullYear();
    const mm = dt.getMonth() + 1;
    const dd = dt.getDate();
    cells.push({ iso: iso(yy, mm, dd), d: dd, inMonth: mm === m1 && yy === y });
  }
  return cells;
}

function inRange(day: string, start: string, end: string) {
  return start <= day && day <= end;
}

function hits(trips: TripSummary[], day: string) {
  return trips.filter((t) => inRange(day, t.startDate, t.endDate));
}

// searchParams の中身
type SP = Record<string, string | string[] | undefined>;

export default async function CalendarPage({
  searchParams,
}: {
  searchParams?: Promise<SP>; // ★Promiseにする
}) {
  const now = new Date();

  const sp = (await searchParams) ?? {}; // ★awaitしてから使う
  const yRaw = sp.y;
  const mRaw = sp.m;

  const y = Number(Array.isArray(yRaw) ? yRaw[0] : yRaw) || now.getFullYear();
  const m = Number(Array.isArray(mRaw) ? mRaw[0] : mRaw) || now.getMonth() + 1;

  const prevY = m === 1 ? y - 1 : y;
  const prevM = m === 1 ? 12 : m - 1;
  const nextY = m === 12 ? y + 1 : y;
  const nextM = m === 12 ? 1 : m + 1;

  const trips = await listTrips();
  const cells = buildGrid(y, m);

  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 12 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <Link href={`/calendar?y=${prevY}&m=${pad2(prevM)}`} style={{ textDecoration: "none", fontWeight: 900 }}>
              ←
            </Link>
            <div style={{ fontWeight: 950 }}>
              {y}/{pad2(m)}
            </div>
            <Link href={`/calendar?y=${nextY}&m=${pad2(nextM)}`} style={{ textDecoration: "none", fontWeight: 900 }}>
              →
            </Link>
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
            <div key={w} style={{ fontSize: 11, color: theme.colors.subtext, fontWeight: 800 }}>
              {w}
            </div>
          ))}

          {cells.map((c) => {
            const list = hits(trips, c.iso);
            const has = list.length > 0;

            return (
              <div
                key={c.iso}
                style={{
                  borderRadius: 14,
                  border: `1px solid ${theme.colors.border}`,
                  background: has ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.45)",
                  padding: 10,
                  minHeight: 64,
                  opacity: c.inMonth ? 1 : 0.55,
                }}
              >
                <div style={{ fontWeight: 900 }}>{c.d}</div>

                {has ? (
                  <div style={{ marginTop: 6, display: "grid", gap: 4 }}>
                    {list.slice(0, 2).map((t) => (
                      <Link
                        key={t.id}
                        href={`/trips/${t.id}`}
                        style={{
                          textDecoration: "none",
                          fontSize: 11,
                          fontWeight: 900,
                          border: `1px solid ${theme.colors.border}`,
                          borderRadius: 10,
                          padding: "4px 6px",
                          background: "rgba(255,255,255,0.65)",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          color: theme.colors.text,
                        }}
                        title={t.title}
                      >
                        {t.title}
                      </Link>
                    ))}
                    {list.length > 2 ? (
                      <div style={{ fontSize: 11, color: theme.colors.subtext, fontWeight: 800 }}>
                        +{list.length - 2}
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