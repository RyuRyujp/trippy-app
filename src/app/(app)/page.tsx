import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <Card>
        <h2 style={{ margin: 0 }}>ホーム</h2>
        <p style={{ marginTop: 8 }}>次に作る画面へ進めます。</p>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Button onClick={() => (window.location.href = "/trips")}>旅行一覧へ</Button>
          <Button variant="ghost" onClick={() => (window.location.href = "/settings")}>
            設定へ
          </Button>
        </div>
      </Card>
    </div>
  );
}