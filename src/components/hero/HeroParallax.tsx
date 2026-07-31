"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { useEffect } from "react";

export default function HeroParallax() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 55,
    damping: 22,
    mass: 0.7,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 55,
    damping: 22,
    mass: 0.7,
  });

  const layerOneX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-22, 22],
  );

  const layerOneY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-18, 18],
  );

  const layerTwoX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [32, -32],
  );

  const layerTwoY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [25, -25],
  );

  const layerThreeX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-45, 45],
  );

  const layerThreeY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-32, 32],
  );

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const x =
        event.clientX / window.innerWidth - 0.5;

      const y =
        event.clientY / window.innerHeight - 0.5;

      mouseX.set(x);
      mouseY.set(y);
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
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-[6]
        overflow-hidden
      "
    >
      <motion.div
        style={{
          x: layerOneX,
          y: layerOneY,
        }}
        className="
          absolute
          right-[8%]
          top-[18%]
          hidden
          h-28
          w-28
          rounded-full
          border
          border-[#d8b66e]/20
          lg:block
        "
      >
        <span
          className="
            absolute
            left-1/2
            top-1/2
            h-px
            w-[150%]
            -translate-x-1/2
            -translate-y-1/2
            rotate-45
            bg-gradient-to-r
            from-transparent
            via-[#d8b66e]/20
            to-transparent
          "
        />

        <span
          className="
            absolute
            left-1/2
            top-1/2
            h-[150%]
            w-px
            -translate-x-1/2
            -translate-y-1/2
            rotate-45
            bg-gradient-to-b
            from-transparent
            via-[#d8b66e]/20
            to-transparent
          "
        />
      </motion.div>

      <motion.div
        style={{
          x: layerTwoX,
          y: layerTwoY,
        }}
        className="
          absolute
          bottom-[23%]
          right-[16%]
          hidden
          h-5
          w-5
          rotate-45
          border
          border-[#e2c47d]/40
          xl:block
        "
      />

      <motion.div
        style={{
          x: layerThreeX,
          y: layerThreeY,
        }}
        className="
          absolute
          left-[8%]
          top-[25%]
          hidden
          h-[260px]
          w-px
          bg-gradient-to-b
          from-transparent
          via-[#d8b66e]/25
          to-transparent
          lg:block
        "
      />

      <motion.div
        style={{
          x: layerTwoX,
          y: layerOneY,
        }}
        className="
          absolute
          bottom-[30%]
          left-[45%]
          hidden
          items-center
          gap-3
          xl:flex
        "
      >
        <span className="h-px w-16 bg-[#d8b66e]/25" />

        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.32em]
            text-white/25
          "
        >
          25.2048° N
        </span>
      </motion.div>

      <FloatingOrb
        className="right-[4%] top-[44%]"
        delay={0}
        size={7}
      />

      <FloatingOrb
        className="left-[42%] top-[18%]"
        delay={0.8}
        size={4}
      />

      <FloatingOrb
        className="bottom-[26%] left-[14%]"
        delay={1.4}
        size={5}
      />
    </div>
  );
}

interface FloatingOrbProps {
  className: string;
  delay: number;
  size: number;
}

function FloatingOrb({
  className,
  delay,
  size,
}: FloatingOrbProps) {
  return (
    <motion.span
      animate={{
        y: [0, -14, 0],
        opacity: [0.25, 0.8, 0.25],
        scale: [1, 1.4, 1],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        width: size,
        height: size,
      }}
      className={`
        absolute
        rounded-full
        bg-[#e0c17a]
        shadow-[0_0_18px_rgba(224,193,122,0.7)]
        ${className}
      `}
    />
  );
}