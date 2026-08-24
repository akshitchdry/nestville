"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  delay?: number;
}

export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  description,
  delay = 0,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.25,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;

    const duration = 1800;
    const startTime = performance.now();

    const animateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      // Smooth ease-out animation
      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(
        easedProgress * value
      );

      setCount(currentValue);

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animateCounter);
      } else {
        // Always finish on exact value
        setCount(value);
      }
    };

    animationFrame =
      requestAnimationFrame(animateCounter);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        delay,
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[#090909]
        p-8
      "
    >
      {/* GOLD GLOW */}

      <div
        className="
          absolute
          -right-20
          -top-20
          h-52
          w-52
          rounded-full
          bg-[#d6b56a]/10
          blur-[120px]
          transition-all
          duration-700
          group-hover:bg-[#d6b56a]/20
        "
      />

      <div className="relative z-10">
        {/* LABEL */}

        <p
          className="
            text-[11px]
            uppercase
            tracking-[0.35em]
            text-[#d6b56a]
          "
        >
          {label}
        </p>

        {/* COUNTER */}

        <h3
          className="
            mt-6
            text-5xl
            font-light
            tabular-nums
            text-white
            sm:text-6xl
          "
        >
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-6
            text-[15px]
            leading-8
            text-white/60
          "
        >
          {description}
        </p>

        {/* GOLD LINE */}

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            delay: delay + 0.2,
          }}
          className="
            mt-8
            h-px
            origin-left
            bg-gradient-to-r
            from-transparent
            via-[#d6b56a]
            to-transparent
          "
        />

        {/* STATUS */}

        <div
          className="
            mt-6
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-[#d6b56a]
            "
          />

          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.24em]
              text-white/40
            "
          >
            Updated Regularly
          </span>
        </div>
      </div>

      {/* HOVER BORDER */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[inherit]
          border
          border-transparent
          transition-all
          duration-700
          group-hover:border-[#d6b56a]/20
        "
      />
    </motion.div>
  );
}