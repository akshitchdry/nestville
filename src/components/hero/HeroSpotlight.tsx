"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { useEffect } from "react";

export default function HeroSpotlight() {
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove,
      );
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        className="
          pointer-events-none
          fixed
          z-[8]
          hidden
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(218,180,103,0.11)_0%,rgba(218,180,103,0.04)_35%,transparent_70%)]
          blur-[10px]
          lg:block
        "
      />

      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
        }}
        className="
          pointer-events-none
          fixed
          z-[9]
          hidden
          h-[10px]
          w-[10px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#e2c47d]
          shadow-[0_0_25px_rgba(226,196,125,0.8)]
          lg:block
        "
      />
    </>
  );
}