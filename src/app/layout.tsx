import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Qubic Whale Guardian",
  description: "Real-time Qubic whale activity dashboard powered by EasyConnect.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
