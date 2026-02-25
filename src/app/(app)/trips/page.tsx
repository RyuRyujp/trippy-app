import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";

export default function TripsPage() {
  // ここは後で Supabase から取得に差し替える
  const mock = [
    { id: "1", title: "Paris", date: "2026-03-10" },
    { id: "2", title: "London", date: "2026-03-12" },
  ];

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: "6px 0", color: theme.colors.text }}>旅行一覧</h1>

      {mock.map((t) => (
        <a key={t.id} href={`/trips/${t.id}`} style={{ textDecoration: "none" }}>
          <Card>
            <div style={{ fontWeight: 900, color: theme.colors.text }}>{t.title}</div>
            <div style={{ marginTop: 6, color: theme.colors.subtext }}>{t.date}</div>
          </Card>
        </a>
      ))}
    </div>
  );
}