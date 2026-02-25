import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { seedDemoAction } from "@/lib/actions/seedDemo";

export default function SettingPage() {
  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 12 }}>
        <Card>
          <div style={{ fontWeight: 900, color: theme.colors.text }}>Demo</div>
          <div style={{ marginTop: 6, fontSize: 12, color: theme.colors.subtext }}>
            デモデータ（Trip/旅程/メモ/タスク/費用）を作成します
          </div>

          <form action={seedDemoAction} style={{ marginTop: 12 }}>
            <button
              type="submit"
              style={{
                padding: "10px 12px",
                borderRadius: 14,
                border: `1px solid ${theme.colors.border}`,
                background: "rgba(255,255,255,0.75)",
                fontWeight: 900,
              }}
            >
              Seed Demo Data
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}