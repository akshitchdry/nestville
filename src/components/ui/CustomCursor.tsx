"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, {
    stiffness: 700,
    damping: 45,
    mass: 0.2,
  });

  const springY = useSpring(mouseY, {
    stiffness: 700,
    damping: 45,
    mass: 0.2,
  });

  useEffect(() => {
    // Custom cursor sirf mouse/desktop devices par
    const pointerQuery = window.matchMedia("(pointer: fine)");

    if (!pointerQuery.matches) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);

      setVisible(true);

      const target = event.target as HTMLElement | null;

      if (!target) {
        setHovering(false);
        return;
      }

      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], [data-cursor-hover]"
      );

      setHovering(Boolean(interactive));
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseDown = () => {
      setPressed(true);
    };

    const handleMouseUp = () => {
      setPressed(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* OUTER CURSOR */}

      <motion.div
        ref={cursorRef}
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.8 : hovering ? 1.55 : 1,
        }}
        transition={{
          opacity: {
            duration: 0.2,
          },
          scale: {
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          hidden
          h-10
          w-10
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          border-[#d6b56a]/60
          mix-blend-difference
          md:block
        "
      />

      {/* CENTER DOT */}

      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 1.8 : hovering ? 0.5 : 1,
        }}
        transition={{
          opacity: {
            duration: 0.2,
          },
          scale: {
            duration: 0.2,
          },
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[10000]
          hidden
          h-[5px]
          w-[5px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#d6b56a]
          md:block
        "
      />

      {/* HOVER GLOW */}

      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          opacity: visible && hovering ? 0.2 : 0,
          scale: hovering ? 1 : 0.5,
        }}
        transition={{
          duration: 0.3,
        }}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9998]
          hidden
          h-20
          w-20
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#d6b56a]
          blur-2xl
          md:block
        "
      />
    </>
  );
}