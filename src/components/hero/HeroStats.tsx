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
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 0.9,
      }}
      className="
        mx-auto
        grid
        w-full
        max-w-[760px]
        grid-cols-3
        items-center
        rounded-[22px]
        border
        border-white/10
        bg-black/25
        px-4
        py-4
        backdrop-blur-xl

        sm:px-6

        lg:mx-0
        lg:max-w-[620px]

        2xl:flex
        2xl:w-auto
        2xl:max-w-none
        2xl:gap-8
        2xl:rounded-none
        2xl:border-0
        2xl:bg-transparent
        2xl:px-0
        2xl:py-0
        2xl:backdrop-blur-none
      "
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="
            relative
            min-w-0
            px-2
            text-center

            sm:px-4

            2xl:pr-8
            2xl:text-left
            2xl:last:pr-0
          "
        >
          <p
            className="
              font-display
              truncate
              text-[19px]
              leading-none
              text-[#ead49b]

              sm:text-[23px]

              2xl:text-[28px]
            "
          >
            {stat.value}
          </p>

          <p
            className="
              mt-2
              text-[6px]
              uppercase
              leading-4
              tracking-[0.12em]
              text-white/35

              sm:text-[7px]
              sm:tracking-[0.15em]

              2xl:text-[8px]
              2xl:tracking-[0.18em]
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