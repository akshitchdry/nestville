"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function AboutVision() {
  return (
    <section
      className="
        relative
        min-h-[850px]
        overflow-hidden
        bg-black
      "
    >
      {/* BACKGROUND IMAGE */}

      <div className="absolute inset-0">
        <Image
          src="/images/about/about-vision.webp"
          alt="NestVille vision"
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* DARK OVERLAYS */}

        <div className="absolute inset-0 bg-black/50" />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black
            via-black/70
            to-black/20
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-transparent
            to-black/20
          "
        />
      </div>

      {/* GOLD GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/3
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#d6b56a]/10
          blur-[180px]
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[850px]
          max-w-7xl
          items-center
          px-6
          py-28
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-4xl"
        >
          {/* LABEL */}

          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-[#d6b56a]" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.4em]
                text-[#d6b56a]
              "
            >
              Our Vision
            </span>
          </div>

          {/* HEADING */}

          <h2
            className="
              mt-8
              text-[clamp(3.8rem,8vw,8.5rem)]
              font-light
              leading-[0.82]
              tracking-[-0.055em]
              text-white
            "
          >
            Creating the
            <br />

            <span className="text-[#d6b56a]">
              next landmark.
            </span>
          </h2>

          {/* DESCRIPTION */}

          <p
            className="
              mt-10
              max-w-2xl
              text-[15px]
              leading-8
              text-white/55
            "
          >
            Our ambition is to create residences that remain relevant
            beyond trends — places recognised for their architecture,
            thoughtful environments and the quality of life they enable.
          </p>

          {/* BUTTONS */}

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/properties"
              className="
                group
                inline-flex
                items-center
                gap-5
                rounded-full
                bg-[#d6b56a]
                px-7
                py-4
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-[#080908]
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:bg-[#e4c77f]
              "
            >
              Explore Residences

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

            <Link
              href="/contact"
              className="
                group
                inline-flex
                items-center
                gap-4
                rounded-full
                border
                border-white/15
                bg-black/20
                px-7
                py-4
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/70
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#d6b56a]/50
                hover:bg-[#d6b56a]/10
                hover:text-[#d6b56a]
              "
            >
              Speak to an advisor

              <ArrowUpRight
                size={14}
                className="
                  opacity-60
                  transition-all
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                  group-hover:opacity-100
                "
              />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE TEXT */}

      <div
        className="
          absolute
          bottom-10
          right-6
          z-10
          hidden
          lg:block
        "
      >
        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.35em]
            text-white/25
            [writing-mode:vertical-rl]
          "
        >
          Architecture · Community · Living
        </p>
      </div>

      {/* BOTTOM GOLD LINE */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          z-10
          h-px
          w-[80%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#d6b56a]/40
          to-transparent
        "
      />
    </section>
  );
}