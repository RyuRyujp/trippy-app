import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { theme } from "@/lib/theme";

export default function SettingPage() {
  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 12 }}>
        <SectionTitle title="SETTING" />

        <Card>
          <div style={{ fontWeight: 900, color: theme.colors.text }}>アカウント</div>
          <div style={{ marginTop: 6, fontSize: 12, color: theme.colors.subtext }}>
            ログアウト、メール確認、などをここに追加
          </div>
        </Card>

        <Card>
          <div style={{ fontWeight: 900, color: theme.colors.text }}>テーマ</div>
          <div style={{ marginTop: 6, fontSize: 12, color: theme.colors.subtext }}>
            カラー/見た目設定をここに追加
          </div>
        </Card>
      </div>
    </div>
  );
}