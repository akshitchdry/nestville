"use client";

import {
  type MouseEvent,
  type ReactNode,
  useRef,
} from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.28,
  onClick,
  disabled = false,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 15,
    mass: 0.2,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 15,
    mass: 0.2,
  });

  function handleMouseMove(
    event: MouseEvent<HTMLButtonElement>,
  ) {
    if (disabled) return;

    const button = buttonRef.current;

    if (!button) return;

    const rect = button.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.94,
            }
      }
      className={`
        group
        relative
        inline-flex
        items-center
        justify-center
        overflow-hidden
        rounded-full
        border
        border-[#d6b56a]/25
        bg-[#d6b56a]/[0.07]
        px-7
        py-4
        text-[9px]
        font-medium
        uppercase
        tracking-[0.22em]
        text-[#d6b56a]
        backdrop-blur-xl
        transition-colors
        duration-500
        hover:border-[#d6b56a]
        hover:bg-[#d6b56a]
        hover:text-[#080908]
        disabled:cursor-not-allowed
        disabled:opacity-40
        ${className}
      `}
    >
      {/* BACKGROUND GLOW */}

      <span
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-0
          w-0
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#d6b56a]
          transition-all
          duration-500
          group-hover:h-[220px]
          group-hover:w-[220px]
        "
      />

      {/* SHINE */}

      <span
        className="
          pointer-events-none
          absolute
          -left-full
          top-0
          h-full
          w-1/2
          skew-x-[-25deg]
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
          transition-all
          duration-700
          group-hover:left-[140%]
        "
      />

      {/* CONTENT */}

      <span className="relative z-10">
        {children}
      </span>

      {/* OUTER GLOW */}

      <span
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          rounded-full
          bg-[#d6b56a]/0
          blur-2xl
          transition-all
          duration-500
          group-hover:bg-[#d6b56a]/20
        "
      />
    </motion.button>
  );
}