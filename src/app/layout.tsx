import type { Metadata } from "next";
import type { ReactNode } from "react";

import {
  Cormorant_Garamond,
  Manrope,
} from "next/font/google";

import SiteLayout from "@/components/layout/SiteLayout";

import "./globals.css";

/* =========================================
   FONTS
========================================= */

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* =========================================
   METADATA
========================================= */

export const metadata: Metadata = {
  title: {
    default: "NestVille | Ultra Premium Real Estate",
    template: "%s | NestVille",
  },

  description:
    "Discover extraordinary residences, luxury properties and iconic developments with NestVille.",

  keywords: [
    "NestVille",
    "Luxury Real Estate",
    "Premium Residences",
    "Luxury Properties",
    "Luxury Villas",
    "Premium Apartments",
    "Real Estate",
  ],

  authors: [
    {
      name: "NestVille",
    },
  ],

  creator: "NestVille",
  publisher: "NestVille",

  robots: {
    index: true,
    follow: true,
  },
};

/* =========================================
   ROOT LAYOUT
========================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${manrope.variable}
        ${cormorant.variable}
      `}
      suppressHydrationWarning
    >
      <body
        className="
          min-h-screen
          overflow-x-hidden
          bg-[#060806]
          font-[family-name:var(--font-manrope)]
          text-white
          antialiased
        "
      >
        <SiteLayout>
          {children}
        </SiteLayout>
      </body>
    </html>
  );
}