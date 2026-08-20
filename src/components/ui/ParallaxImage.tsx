"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  speed?: number;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  speed = 80,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-speed, speed],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.08, 1, 1.08],
  );

  return (
    <div
      ref={containerRef}
      className={`
        relative
        overflow-hidden
        ${className}
      `}
    >
      <motion.div
        style={{
          y,
          scale,
        }}
        className="
          absolute
          inset-[-12%]
        "
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={`
            object-cover
            ${imageClassName}
          `}
        />
      </motion.div>

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-black/20
          via-transparent
          to-black/10
        "
      />
    </div>
  );
}