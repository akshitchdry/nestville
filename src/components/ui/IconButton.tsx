"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "gold" | "glass";
  disabled?: boolean;
}

export default function IconButton({
  icon,
  label,
  onClick,
  className = "",
  size = "md",
  variant = "default",
  disabled = false,
}: IconButtonProps) {
  const sizes = {
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  };

  const variants = {
    default: `
      border-white/10
      bg-white/[0.03]
      text-white/65
      hover:border-[#d6b56a]/30
      hover:bg-[#d6b56a]/10
      hover:text-[#d6b56a]
    `,
    gold: `
      border-[#d6b56a]/30
      bg-[#d6b56a]/10
      text-[#d6b56a]
      hover:bg-[#d6b56a]
      hover:text-black
    `,
    glass: `
      border-white/15
      bg-black/25
      text-white/75
      backdrop-blur-xl
      hover:border-[#d6b56a]/35
      hover:text-[#d6b56a]
    `,
  };

  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      whileHover={
        disabled
          ? undefined
          : {
              scale: 1.08,
              rotate: 4,
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.92,
            }
      }
      className={`
        group
        relative
        inline-flex
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        transition-all
        duration-300
        disabled:cursor-not-allowed
        disabled:opacity-35
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      <span
        className="
          relative
          z-10
          flex
          items-center
          justify-center
          transition-transform
          duration-300
          group-hover:scale-110
        "
      >
        {icon}
      </span>

      <span
        className="
          pointer-events-none
          absolute
          inset-0
          scale-0
          rounded-full
          bg-[#d6b56a]/10
          transition-transform
          duration-500
          group-hover:scale-100
        "
      />
    </motion.button>
  );
}