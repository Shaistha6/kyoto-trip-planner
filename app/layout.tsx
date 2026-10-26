import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyoto Trip Planner",
  description: "Plan a whole Kyoto weekend in one chat.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 font-sans text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
