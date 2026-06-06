import "./globals.css";

import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

const fontInter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Maison Verdant — A Century of Quiet Grandeur",
  description:
    "An editorial luxury wedding venue set within 220 acres of rolling sage hills. A single celebration per weekend.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontPlayfair.variable} ${fontInter.variable}`}>
      <body className="bg-alabaster text-charcoal antialiased selection:bg-sage selection:text-alabaster min-h-screen">
        <div
          aria-hidden
          className="film-grain pointer-events-none fixed inset-0 z-[100] opacity-[0.03]"
        />
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
