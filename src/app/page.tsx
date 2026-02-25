import Link from "next/link";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { theme } from "@/lib/theme";
import { homeMock } from "@/lib/mock/homeMock";

import { ChevronRight } from "lucide-react";

type Trip = {
  id: string;
  title: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string;   // "YYYY-MM-DD"
  city?: string;
};

type HomeMock = {
  trips: Trip[];
};

function formatRange(start: string, end: string) {
  // 例: 2026-03-10 -> 2026/03/10
  const s = start.replaceAll("-", "/");
  const e = end.replaceAll("-", "/");
  return `${s} – ${e}`;
}

function pickNextTrip(trips: Trip[]): Trip | null {
  if (trips.length === 0) return null;

  // “次の旅行”は一旦単純に startDate の昇順で最小を採用（後で today 比較にする）
  const sorted = [...trips].sort((a, b) => (a.startDate < b.startDate ? -1 : 1));
  return sorted[0] ?? null;
}

export default function HomePage() {
  // homeMock の中身を「この画面で必要な形」として型付け（any は使わない）
  const { trips } = homeMock as unknown as HomeMock;

  const nextTrip = pickNextTrip(trips);
  const recent = trips.slice(0, 3);

  const nextTripHref = nextTrip ? `/trips/${nextTrip.id}` : "#";

  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 14 }}>
        {/* ===== Next Trip ===== */}
        <SectionTitle
          title="Next Trip"
          right={
            <Link href="/trips" style={{ textDecoration: "none", color: theme.colors.subtext }}>
              すべて見る <ChevronRight size={12} style={{ verticalAlign: "-2px" }} />
            </Link>
          }
        />

        <Link
          href={nextTripHref}
          aria-disabled={!nextTrip}
          style={{
            textDecoration: "none",
            pointerEvents: nextTrip ? "auto" : "none",
            opacity: nextTrip ? 1 : 0.7,
          }}
        >
          <Card>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 950, fontSize: 18, color: theme.colors.text, lineHeight: 1.2 }}>
                  {nextTrip?.title ?? "No trip"}
                </div>
                <div style={{ marginTop: 6, color: theme.colors.subtext, fontSize: 12 }}>
                  {nextTrip?.city ? `${nextTrip.city} • ` : ""}
                  {nextTrip ? formatRange(nextTrip.startDate, nextTrip.endDate) : "—"}
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

            <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              <MiniStat label="Days" value="—" />
              <MiniStat label="Memos" value="—" />
              <MiniStat label="Expenses" value="—" />
            </div>
          </Card>
        </Link>

        {/* ===== Recent Trips ===== */}
        <SectionTitle title="Recent Trips" />
        <div style={{ display: "grid", gap: 10 }}>
          {recent.map((t) => (
            <Link key={t.id} href={`/trips/${t.id}`} style={{ textDecoration: "none" }}>
              <Card>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 900, color: theme.colors.text, lineHeight: 1.2 }}>{t.title}</div>
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

        <div style={{ height: 10 }} />
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: `1px solid ${theme.colors.border}`,
        background: "rgba(255,255,255,0.55)",
        padding: 12,
      }}
    >
      <div style={{ fontSize: 11, color: theme.colors.subtext, fontWeight: 800 }}>{label}</div>
      <div style={{ marginTop: 4, fontSize: 16, fontWeight: 950, color: theme.colors.text }}>{value}</div>
    </div>
  );
}