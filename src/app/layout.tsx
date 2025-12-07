import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qubic Whale Guardian | Real-Time Whale Tracking",
  description: "Enterprise-grade real-time Qubic whale activity monitoring and analytics platform powered by EasyConnect.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
