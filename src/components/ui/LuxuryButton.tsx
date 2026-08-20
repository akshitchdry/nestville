"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface LuxuryButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "gold" | "outline" | "dark";
  showArrow?: boolean;
  disabled?: boolean;
}

export default function LuxuryButton({
  children,
  href,
  onClick,
  className = "",
  variant = "gold",
  showArrow = true,
  disabled = false,
}: LuxuryButtonProps) {
  const variants = {
    gold: `
      border-[#d6b56a]
      bg-[#d6b56a]
      text-[#080908]
      hover:bg-[#e5ca85]
      hover:border-[#e5ca85]
    `,

    outline: `
      border-[#d6b56a]/30
      bg-transparent
      text-[#d6b56a]
      hover:border-[#d6b56a]
      hover:bg-[#d6b56a]
      hover:text-[#080908]
    `,

    dark: `
      border-white/10
      bg-white/[0.04]
      text-white/75
      backdrop-blur-xl
      hover:border-[#d6b56a]/35
      hover:bg-[#d6b56a]/10
      hover:text-[#d6b56a]
    `,
  };

  const classes = `
    group
    relative
    inline-flex
    min-h-12
    items-center
    justify-center
    gap-5
    overflow-hidden
    rounded-full
    border
    px-7
    py-4
    text-[9px]
    font-medium
    uppercase
    tracking-[0.22em]
    transition-all
    duration-500
    disabled:cursor-not-allowed
    disabled:opacity-40
    ${variants[variant]}
    ${className}
  `;

  const content = (
    <>
      {/* HOVER SHINE */}

      <span
        className="
          pointer-events-none
          absolute
          -left-[120%]
          top-0
          h-full
          w-[70%]
          skew-x-[-20deg]
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
          transition-all
          duration-700
          group-hover:left-[140%]
        "
      />

      {/* TEXT */}

      <span className="relative z-10">
        {children}
      </span>

      {/* ARROW */}

      {showArrow && (
        <span
          className="
            relative
            z-10
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-current/20
          "
        >
          <ArrowUpRight
            size={13}
            strokeWidth={1.5}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-[2px]
              group-hover:-translate-y-[2px]
            "
          />
        </span>
      )}
    </>
  );

  if (href && !disabled) {
    return (
      <motion.div
        className="inline-flex"
        whileHover={{
          scale: 1.025,
          y: -2,
        }}
        whileTap={{
          scale: 0.97,
        }}
      >
        <Link
          href={href}
          className={classes}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={
        disabled
          ? undefined
          : {
              scale: 1.025,
              y: -2,
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.97,
            }
      }
      className={classes}
    >
      {content}
    </motion.button>
  );
}