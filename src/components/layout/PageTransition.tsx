"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({
  children,
}: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative min-h-screen"
    >
      {/* PAGE CONTENT */}

      {children}

      {/* PAGE LOAD OVERLAY */}

      <motion.div
        initial={{
          scaleY: 1,
        }}
        animate={{
          scaleY: 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          transformOrigin: "top",
        }}
        className="
          pointer-events-none
          fixed
          inset-0
          z-[9998]
          bg-[#060806]
        "
      />

      {/* GOLD TRANSITION LINE */}

      <motion.div
        initial={{
          scaleX: 0,
          opacity: 1,
        }}
        animate={{
          scaleX: [0, 1, 0],
          opacity: [1, 1, 0],
        }}
        transition={{
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          h-px
          w-full
          origin-left
          bg-gradient-to-r
          from-transparent
          via-[#d6b56a]
          to-transparent
        "
      />
    </motion.div>
  );
}