"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import { useRef } from "react";

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.02, 1.18],
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 0.65, 0],
  );

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        opacity,
      }}
      className="
        absolute
        inset-0
        h-full
        w-full
      "
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero/hero-villa.webp"
        className="
          h-full
          w-full
          object-cover
          object-center
        "
      >
        <source
          src="/videos/nestville-hero.mp4"
          type="video/mp4"
        />
      </video>

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_65%_45%,transparent_0%,rgba(2,5,3,0.12)_42%,rgba(2,5,3,0.72)_100%)]
        "
      />
    </motion.div>
  );
}