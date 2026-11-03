import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Instrument_Sans, Outfit } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { site } from "@/content/site";
import "./globals.css";

const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", style: ["normal", "italic"], display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["200", "300", "400"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nikomsevents.com"),
  title: { default: `${site.name} | Event hall in Yaba, Lagos`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, type: "website", locale: "en_NG" },
};

export const viewport: Viewport = { themeColor: "#0d0a10" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${bodoni.variable} ${instrument.variable} ${outfit.variable}`}>
      <body>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
