import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nayarit Digital — Gobernanza Digital Municipal",
  description:
    "Plataforma que implementa la ley federal de digitalización en municipios de Nayarit. Trámites digitales, transparencia y gestión documental con ~90% de cobertura legal.",
  keywords: [
    "Nayarit Digital",
    "Gobernanza Digital",
    "municipios",
    "digitalización",
    "trámites digitales",
    "transparencia",
    "Nayarit",
  ],
  openGraph: {
    title: "Nayarit Digital — Gobernanza Digital Municipal",
    description:
      "Plataforma que implementa la ley federal de digitalización en municipios de Nayarit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
