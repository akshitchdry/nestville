"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  delay?: number;
}

export default function Badge({
  children,
  className = "",
  icon,
  delay = 0,
}: BadgeProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        group
        inline-flex
        items-center
        gap-3
        rounded-full
        border
        border-[#d6b56a]/20
        bg-[#d6b56a]/[0.06]
        px-5
        py-2.5
        backdrop-blur-xl
        ${className}
      `}
    >
      {/* GOLD DOT */}

      <span
        className="
          relative
          flex
          h-2
          w-2
          items-center
          justify-center
        "
      >
        <span
          className="
            absolute
            h-full
            w-full
            animate-ping
            rounded-full
            bg-[#d6b56a]/40
          "
        />

        <span
          className="
            relative
            h-1.5
            w-1.5
            rounded-full
            bg-[#d6b56a]
          "
        />
      </span>

      {/* OPTIONAL ICON */}

      {icon && (
        <span
          className="
            flex
            items-center
            justify-center
            text-[#d6b56a]
          "
        >
          {icon}
        </span>
      )}

      {/* TEXT */}

      <span
        className="
          text-[9px]
          font-medium
          uppercase
          tracking-[0.3em]
          text-[#d6b56a]
        "
      >
        {children}
      </span>

      {/* HOVER GLOW */}

      <span
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          rounded-full
          bg-[#d6b56a]/0
          blur-xl
          transition-all
          duration-500
          group-hover:bg-[#d6b56a]/10
        "
      />
    </motion.div>
  );
}