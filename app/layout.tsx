import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meow Office | Ivy’s studio",
  description: "A cozy workspace for your Research, Architect and Develop agent teams.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="antialiased">{children}</body>
    </html>
  );
}
