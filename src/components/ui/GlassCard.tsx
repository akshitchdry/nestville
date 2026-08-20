"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        hover
          ? {
              y: -8,
              scale: 1.01,
            }
          : undefined
      }
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.035]
        backdrop-blur-2xl
        ${className}
      `}
    >
      {/* GOLD GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-56
          w-56
          rounded-full
          bg-[#d6b56a]/0
          blur-[90px]
          transition-all
          duration-700
          group-hover:bg-[#d6b56a]/10
        "
      />

      {/* TOP LIGHT */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-10
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/15
          to-transparent
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">
        {children}
      </div>

      {/* HOVER BORDER */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[inherit]
          border
          border-transparent
          transition-all
          duration-500
          group-hover:border-[#d6b56a]/25
        "
      />

      {/* BOTTOM GOLD LINE */}

      <span
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-px
          w-0
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#d6b56a]
          to-transparent
          transition-all
          duration-700
          group-hover:w-[75%]
        "
      />
    </motion.div>
  );
}