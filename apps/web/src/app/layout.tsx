import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/features/auth";

export const metadata: Metadata = {
  title: "Relay Work",
  description: "팀 전달사항을 놓치지 않는 업무 소통 공간",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased font-sans">
      <body className="min-h-full bg-slate-50 text-foreground">
        <main className="min-h-dvh w-full">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
