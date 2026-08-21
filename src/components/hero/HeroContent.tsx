"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

export default function HeroContent() {
  return (
    <div
      className="
        relative
        z-20
        w-full
        max-w-[760px]
      "
    >
      {/* EYEBROW */}
      <motion.p
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
          delay: 0.2,
        }}
        className="
          mb-4
          flex
          items-center
          gap-3
          text-[8px]
          uppercase
          tracking-[0.28em]
          text-[#d5b365]

          sm:mb-5
          sm:text-[10px]
          sm:tracking-[0.32em]
        "
      >
        <span className="h-px w-8 bg-[#c8a35b]/60 sm:w-10" />

        Private residences
      </motion.p>

      {/* MAIN HEADING */}
      <motion.h1
        initial={{
          opacity: 0,
          y: 45,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          font-display

          text-[clamp(2.75rem,13vw,4.3rem)]
          leading-[0.86]
          tracking-[-0.045em]
          text-[#f6f0e5]

          sm:text-[clamp(3.5rem,9vw,5rem)]

          lg:text-[clamp(4.8rem,6.5vw,7rem)]
          lg:leading-[0.82]
        "
      >
        Where Luxury
        <br />

        Finds Its{" "}

        <span className="text-gold-gradient">
          Address.
        </span>
      </motion.h1>

      {/* DESCRIPTION */}
      <motion.p
        initial={{
          opacity: 0,
          y: 22,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.75,
          delay: 0.48,
        }}
        className="
          mt-5
          max-w-[470px]
          text-[12px]
          leading-6
          text-white/55

          sm:mt-6
          sm:text-[14px]
          sm:leading-7
        "
      >
        Discover extraordinary homes in the world&apos;s most desirable
        locations, crafted for those who expect more from every space.
      </motion.p>

      {/* ACTIONS */}
      <motion.div
        initial={{
          opacity: 0,
          y: 22,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.75,
          delay: 0.62,
        }}
        className="
          mt-6
          flex
          w-full
          flex-col
          gap-3

          sm:mt-7
          sm:w-auto
          sm:flex-row
          sm:flex-wrap
        "
      >
        {/* EXPLORE */}
        <motion.div
          whileHover={{
            y: -3,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            w-full
            sm:w-auto
          "
        >
          <Link
            href="/#residences"
            className="
              group
              flex
              min-h-12
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-gradient-to-r
              from-[#a57b36]
              via-[#dfbd70]
              to-[#a57b36]
              px-6
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.13em]
              text-[#090b09]

              sm:w-auto
              sm:px-7
              sm:text-[10px]
            "
          >
            Explore residences

            <ArrowUpRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>
        </motion.div>

        {/* PRIVATE TOUR */}
        <motion.div
          whileHover={{
            y: -3,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="
            w-full
            sm:w-auto
          "
        >
          <Link
            href="/contact"
            className="
              group
              flex
              min-h-12
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              border
              border-white/15
              bg-black/20
              px-6
              text-[9px]
              uppercase
              tracking-[0.13em]
              text-white/75
              backdrop-blur-md
              transition-all
              duration-300

              hover:border-[#c8a35b]/40
              hover:bg-[#c8a35b]/10
              hover:text-[#e4c985]

              sm:w-auto
              sm:px-7
              sm:text-[10px]
            "
          >
            Book a private tour

            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/15
              "
            >
              <Play
                size={10}
                fill="currentColor"
              />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}