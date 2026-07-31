"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

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
    amount: 0.5,
  });

  const motionValue = useMotionValue(0);

  const springValue = useSpring(motionValue, {
    damping: 22,
    stiffness: 55,
  });

  const rounded = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

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
      }}
      transition={{
        duration: .8,
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

      <div
        className="
          relative
          z-10
        "
      >
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

        <motion.h3
          className="
            mt-6
            text-6xl
            font-light
            text-white
          "
        >
          {prefix}

          <motion.span>
            {rounded}
          </motion.span>

          {suffix}
        </motion.h3>

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

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: .2,
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