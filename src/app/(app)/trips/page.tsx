import Link from "next/link";
import { ChevronRight } from "lucide-react";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { theme } from "@/lib/theme";
import { listTrips } from "@/lib/data/trips";

function formatRange(start: string, end: string) {
    return `${start.replaceAll("-", "/")} – ${end.replaceAll("-", "/")}`;
}

export default async function TripsPage() {
    const trips = await listTrips();

    return (
        <div style={{ minHeight: "100vh", background: theme.colors.bg, padding: 16 }}>
            <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 12 }}>
                <SectionTitle title="TRIPS" right={`${trips.length}件`} />
                
                <Link href="/trips/new" style={{ textDecoration: "none", fontWeight: 900 }}>
                    + New Trip
                </Link>

                {trips.length === 0 ? (
                    <Card>
                        <div style={{ fontWeight: 900, color: theme.colors.text }}>旅行がありません</div>
                        <div style={{ marginTop: 6, color: theme.colors.subtext, fontSize: 12 }}>
                            追加UI（+ボタン/モーダル）は次に実装できます
                        </div>
                    </Card>
                ) : (
                    <div style={{ display: "grid", gap: 10 }}>
                        {trips.map((t) => (
                            <Link key={t.id} href={`/trips/${t.id}`} style={{ textDecoration: "none" }}>
                                <Card>
                                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                                        <div style={{ minWidth: 0 }}>
                                            <div style={{ fontWeight: 900, color: theme.colors.text }}>{t.title}</div>
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
                )}
            </div>
        </div>
    );
}