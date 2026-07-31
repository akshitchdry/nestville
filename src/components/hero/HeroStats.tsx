"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "1,200+",
    label: "Luxury residences",
  },
  {
    value: "28",
    label: "Global locations",
  },
  {
    value: "98%",
    label: "Client satisfaction",
  },
];

export default function HeroStats() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 1,
      }}
      className="
        absolute
        bottom-[155px]
        right-12
        z-20
        hidden
        items-center
        gap-8
        2xl:flex
      "
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="
            relative
            pr-8
            last:pr-0
          "
        >
          <p
            className="
              font-display
              text-[28px]
              leading-none
              text-[#ead49b]
            "
          >
            {stat.value}
          </p>

          <p
            className="
              mt-2
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/35
            "
          >
            {stat.label}
          </p>

          {index !== stats.length - 1 && (
            <span
              className="
                absolute
                right-0
                top-1/2
                h-8
                w-px
                -translate-y-1/2
                bg-white/10
              "
            />
          )}
        </div>
      ))}
    </motion.div>
  );
}