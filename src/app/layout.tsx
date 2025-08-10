import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mecánico Profesional | Reparación y Mantención",
  description: "Servicio mecánico de confianza, mantención, diagnóstico y reparación.",
  openGraph: {
    title: "Mecánico Profesional",
    description: "Servicio mecánico de confianza, mantención, diagnóstico y reparación.",
    url: "https://tu-dominio.com",
    siteName: "Mecánico Profesional",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "Mecánico" },
    ],
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
