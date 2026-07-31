"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import LocationSwitcher from "./LocationSwitcher";
import LocationCard from "./LocationCard";
import { locations } from "./locationData";

export default function LocationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeLocation = locations[activeIndex];

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        current === locations.length - 1
          ? 0
          : current + 1,
      );
    }, 6500);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused]);

  function handlePrevious() {
    setActiveIndex((current) =>
      current === 0
        ? locations.length - 1
        : current - 1,
    );
  }

  function handleNext() {
    setActiveIndex((current) =>
      current === locations.length - 1
        ? 0
        : current + 1,
    );
  }

  return (
    <section
      id="locations"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="
        relative
        overflow-hidden
        bg-[#060806]
        px-5
        py-28
        sm:px-8
        lg:px-12
        xl:px-16
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          left-[5%]
          top-[8%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-emerald-950/20
          blur-[180px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[5%]
          right-[2%]
          h-[400px]
          w-[400px]
          rounded-full
          bg-[#c8a35b]/8
          blur-[170px]
        "
      />

      <div
        className="
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]
          [background-size:110px_110px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1600px]
        "
      >
        <div
          className="
            mb-10
            flex
            flex-col
            gap-8
            xl:flex-row
            xl:items-end
            xl:justify-between
          "
        >
          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                mb-5
                flex
                items-center
                gap-4
              "
            >
              <span className="h-px w-12 bg-[#c8a35b]/60" />

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-[#d6b56d]
                "
              >
                Global destinations
              </p>
            </motion.div>

            <motion.h2
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                font-display
                text-[clamp(3.8rem,7vw,7.7rem)]
                leading-[0.79]
                tracking-[-0.05em]
                text-white
              "
            >
              Iconic places.

              <br />

              <span className="text-gold-gradient">
                Exceptional homes.
              </span>
            </motion.h2>
          </div>

          <div className="max-w-[450px]">
            <p
              className="
                text-[13px]
                leading-7
                text-white/43
              "
            >
              Explore a curated portfolio of landmark
              residences across the world&apos;s most
              influential cities and destinations.
            </p>

            <button
              type="button"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-4
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#d9ba73]
              "
            >
              Discover all destinations

              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c8a35b]/25
                  transition-all
                  duration-300
                  group-hover:bg-[#c8a35b]
                  group-hover:text-black
                "
              >
                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </span>
            </button>
          </div>
        </div>

        <LocationSwitcher
          locations={locations}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
        />

        <div className="mt-7">
          <LocationCard location={activeLocation} />
        </div>

        <div
          className="
            mt-7
            flex
            items-center
            justify-between
            gap-6
          "
        >
          <div
            className="
              flex
              flex-1
              items-center
              gap-4
            "
          >
            <span
              className="
                min-w-[28px]
                text-[8px]
                tracking-[0.2em]
                text-white/30
              "
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <div
              className="
                relative
                h-px
                flex-1
                overflow-hidden
                bg-white/10
              "
            >
              <motion.span
                key={activeIndex}
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 6.5,
                  ease: "linear",
                }}
                style={{
                  transformOrigin: "left",
                }}
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-[#c8a35b]
                  to-[#e4c77e]
                "
              />
            </div>

            <span
              className="
                min-w-[28px]
                text-right
                text-[8px]
                tracking-[0.2em]
                text-white/30
              "
            >
              {String(locations.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous location"
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white/55
                transition-all
                duration-300
                hover:border-[#c8a35b]/50
                hover:bg-[#c8a35b]
                hover:text-black
              "
            >
              <ArrowRight
                size={16}
                className="rotate-180"
              />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next location"
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white/55
                transition-all
                duration-300
                hover:border-[#c8a35b]/50
                hover:bg-[#c8a35b]
                hover:text-black
              "
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}