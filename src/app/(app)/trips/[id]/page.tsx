import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";

export default async function TripDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <h1 style={{ margin: "6px 0", color: theme.colors.text }}>旅行詳細</h1>

      <Card>
        <div style={{ fontWeight: 900, color: theme.colors.text }}>Trip ID: {id}</div>
        <p style={{ marginTop: 8, color: theme.colors.subtext }}>
          ここに「旅程」「メモ/タスク」「費用(割り勘)」などのタブを追加していきます。
        </p>
      </Card>
    </div>
  );
}