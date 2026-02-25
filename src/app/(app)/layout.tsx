import type React from "react";
import AppShell from "@/components/layout/AppShell"
import { requireUser } from "@/lib/auth/requireUser";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // ここで全アプリページを一括ガード
  await requireUser();

  return <AppShell>{children}</AppShell>;
}