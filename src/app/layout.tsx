import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const popins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4Ride - Compartilhamento de Rotas Inteligente",
  description:
    "Conecte-se com outros passageiros e otimize suas viagens. 4Ride é a plataforma inteligente de compartilhamento de rotas com foco em economia, praticidade e segurança.",
  keywords: [
    "4Ride",
    "compartilhamento de rotas",
    "carona",
    "plataforma de caronas",
    "viagens colaborativas",
    "mobilidade urbana",
    "economia compartilhada",
    "transporte inteligente",
  ],
  authors: [{ name: "4Ride Team", url: "https://4ride.com" }],
  creator: "4Ride",
  publisher: "4Ride",
  metadataBase: new URL("https://4ride.com"),
  openGraph: {
    title: "4Ride - Compartilhamento de Rotas Inteligente",
    description:
      "Otimize suas viagens com 4Ride. Encontre caronas seguras, rápidas e econômicas.",
    url: "https://4ride.com",
    siteName: "4Ride",
    images: ["/banner.png"],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "4Ride - Compartilhamento de Rotas",
    description:
      "Encontre caronas seguras e compartilhe rotas com praticidade usando o 4Ride.",
    images: ["/banner.png"],
    creator: "@4RideOficial",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`scroll-smooth text-pretty w-screen overflow-x-hidden ${popins.variable}`}
    >
      <body> {children}</body>
    </html>
  );
}
