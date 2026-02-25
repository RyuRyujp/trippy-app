import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { createTripAction } from "@/lib/actions/trips";

export default function NewTripPage() {
  return (
    <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Card>
          <h1 style={{ margin: 0, color: theme.colors.text }}>New Trip</h1>

          <form action={createTripAction} style={{ display: "grid", gap: 10, marginTop: 12 }}>
            <label style={{ fontWeight: 800 }}>
              Title
              <input name="title" placeholder="Paris Graduation Trip" style={inputStyle} />
            </label>

            <label style={{ fontWeight: 800 }}>
              City
              <input name="city" placeholder="Paris" style={inputStyle} />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <label style={{ fontWeight: 800 }}>
                Start
                <input name="startDate" type="date" style={inputStyle} />
              </label>
              <label style={{ fontWeight: 800 }}>
                End
                <input name="endDate" type="date" style={inputStyle} />
              </label>
            </div>

            <button type="submit" style={primaryBtn}>
              Create
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 6,
  padding: "12px 12px",
  borderRadius: 14,
  border: "1px solid rgba(0,0,0,0.10)",
  outline: "none",
  fontWeight: 700,
};

const primaryBtn: React.CSSProperties = {
  padding: "12px 12px",
  borderRadius: 14,
  border: "none",
  background: "#2563EB",
  color: "white",
  fontWeight: 900,
};