"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({
  children,
}: SmoothScrollProps) {
  useEffect(() => {
    const html = document.documentElement;

    const previousScrollBehavior = html.style.scrollBehavior;

    html.style.scrollBehavior = "smooth";

    return () => {
      html.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
      "
    >
      {children}
    </div>
  );
}