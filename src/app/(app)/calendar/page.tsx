import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";

export default function CalendarPage() {
  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 12 }}>
        <Card>
          <h1 style={{ margin: 0 }}>CALENDAR</h1>
          <p style={{ marginTop: 8, color: theme.colors.subtext }}>旅行がある日をハイライトする。</p>
        </Card>
      </div>
    </div>
  );
}