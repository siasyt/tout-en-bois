import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Tout en Bois | 全木工艺",
};

export default function RootRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}