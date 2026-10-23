import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Blessing Voices",
  description: "Read. Reflect. Grow in Faith. Bible stories and free study booklets.",
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
