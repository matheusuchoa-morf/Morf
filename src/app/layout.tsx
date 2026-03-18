import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MORF — Sales Training Gamificado",
  description:
    "Plataforma gamificada de treinamento em vendas para mentorados que querem escalar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
