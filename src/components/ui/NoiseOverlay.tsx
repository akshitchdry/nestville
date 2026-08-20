"use client";

import { motion } from "framer-motion";

interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
  animated?: boolean;
}

export default function NoiseOverlay({
  opacity = 0.035,
  className = "",
  animated = true,
}: NoiseOverlayProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={false}
      animate={
        animated
          ? {
              x: [0, -2, 2, -1, 1, 0],
              y: [0, 1, -2, 2, -1, 0],
            }
          : undefined
      }
      transition={
        animated
          ? {
              duration: 0.35,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "linear",
            }
          : undefined
      }
      className={`
        pointer-events-none
        fixed
        inset-[-50%]
        z-[9997]
        h-[200%]
        w-[200%]
        ${className}
      `}
      style={{
        opacity,
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")
        `,
        backgroundRepeat: "repeat",
        backgroundSize: "180px 180px",
      }}
    />
  );
}