import type { Metadata } from "next";
import "./globals.css";

import AppHeader from "@/components/layout/AppHeader";
import TabBar from "@/components/nav/TabBar";

export const metadata: Metadata = {
  title: "Trippy",
  description: "Trippy",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AppHeader />
        <div style={{ paddingBottom: 84 }}>{children}</div>
        <TabBar />
      </body>
    </html>
  );
}