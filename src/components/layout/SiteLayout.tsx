"use client";

import type { ReactNode } from "react";

import PageTransition from "./PageTransition";
import ScrollToTop from "./ScrollToTop";
import SmoothScroll from "./SmoothScroll";

import CustomCursor from "@/components/ui/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({
  children,
}: SiteLayoutProps) {
  return (
    <>
      {/* PAGE NAVIGATION SCROLL RESET */}
      <ScrollToTop />

      {/* SMOOTH WEBSITE SCROLL */}
      <SmoothScroll>
        {/* PAGE TRANSITION */}
        <PageTransition>
          {children}
        </PageTransition>
      </SmoothScroll>

      {/* PREMIUM CUSTOM CURSOR */}
      <CustomCursor />

      {/* GLOBAL FILM GRAIN */}
      <NoiseOverlay
        opacity={0.025}
        animated
      />
    </>
  );
}