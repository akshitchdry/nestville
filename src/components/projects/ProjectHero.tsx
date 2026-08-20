"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  MapPin,
} from "lucide-react";

export default function ProjectHero() {
  function scrollToProjects() {
    const section = document.getElementById("projects-list");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <section
      id="projects-hero"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050605]
      "
    >
      {/* BACKGROUND IMAGE */}

      <div className="absolute inset-0">
        <Image
          src="/images/projects/project-hero.webp"
          alt="NestVille luxury residential projects"
          fill
          priority
          sizes="100vw"
          className="
            object-cover
            object-center
          "
        />

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-black/45" />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#050605]
            via-[#050605]/75
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#050605]
            via-transparent
            to-black/30
          "
        />
      </div>

      {/* GOLD GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -left-48
          top-1/3
          h-[600px]
          w-[600px]
          rounded-full
          bg-[#d6b56a]/10
          blur-[190px]
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-[1500px]
          items-center
          px-6
          pb-20
          pt-32
          sm:px-8
          lg:px-12
        "
      >
        <div className="grid w-full items-end gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-4
                rounded-full
                border
                border-[#d6b56a]/25
                bg-black/25
                px-5
                py-3
                backdrop-blur-xl
              "
            >
              <Building2
                size={14}
                strokeWidth={1.5}
                className="text-[#d6b56a]"
              />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-[#d6b56a]
                "
              >
                Signature Projects
              </span>
            </div>

            {/* HEADING */}

            <h1
              className="
                mt-8
                max-w-5xl
                text-[clamp(4rem,8.5vw,9rem)]
                font-light
                leading-[0.82]
                tracking-[-0.06em]
                text-white
              "
            >
              Places made
              <br />

              <span className="text-[#d6b56a]">
                remarkable.
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-9
                max-w-xl
                text-[14px]
                leading-8
                text-white/55
                sm:text-[15px]
              "
            >
              Discover a curated portfolio of exceptional residences
              shaped by architecture, location and an uncompromising
              approach to modern luxury living.
            </p>

            {/* BUTTONS */}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={scrollToProjects}
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
                  font-medium
                  uppercase
                  tracking-[0.22em]
                  text-[#080908]
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  hover:bg-[#e5ca85]
                "
              >
                Explore Projects

                <ArrowDown
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                />
              </button>

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
                  bg-black/25
                  px-7
                  py-4
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-white/70
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[#d6b56a]/40
                  hover:text-[#d6b56a]
                "
              >
                Enquire Now

                <ArrowUpRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT INFO */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              hidden
              justify-self-end
              lg:block
            "
          >
            <div
              className="
                w-[330px]
                rounded-[30px]
                border
                border-white/10
                bg-black/30
                p-7
                backdrop-blur-2xl
              "
            >
              <div className="flex items-center gap-3">
                <MapPin
                  size={15}
                  className="text-[#d6b56a]"
                />

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.3em]
                    text-white/45
                  "
                >
                  Prime Locations
                </span>
              </div>

              <p
                className="
                  mt-7
                  text-3xl
                  font-light
                  leading-tight
                  text-white
                "
              >
                Exceptional addresses.
                <span className="block text-[#d6b56a]">
                  Distinctive living.
                </span>
              </p>

              <div
                className="
                  mt-8
                  grid
                  grid-cols-2
                  gap-3
                  border-t
                  border-white/10
                  pt-6
                "
              >
                <div>
                  <p className="text-2xl font-light text-white">
                    12+
                  </p>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      text-white/35
                    "
                  >
                    Projects
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-light text-white">
                    08
                  </p>

                  <p
                    className="
                      mt-1
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      text-white/35
                    "
                  >
                    Locations
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}

      <button
        type="button"
        onClick={scrollToProjects}
        aria-label="Scroll to projects"
        className="
          group
          absolute
          bottom-8
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-3
          text-white/35
          transition-colors
          hover:text-[#d6b56a]
        "
      >
        <span
          className="
            text-[8px]
            uppercase
            tracking-[0.3em]
          "
        >
          Discover
        </span>

        <span
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-black/20
            backdrop-blur-xl
          "
        >
          <ArrowDown
            size={14}
            className="
              transition-transform
              duration-300
              group-hover:translate-y-1
            "
          />
        </span>
      </button>
    </section>
  );
}