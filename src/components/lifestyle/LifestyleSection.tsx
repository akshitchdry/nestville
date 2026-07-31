"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import LifestyleCard from "./LifestyleCard";
import { lifestyleItems } from "./lifestyleData";

export default function LifestyleSection() {
  return (
    <section
      id="lifestyle"
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
          left-[2%]
          top-[10%]
          h-[440px]
          w-[440px]
          rounded-full
          bg-emerald-950/20
          blur-[170px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[5%]
          right-[3%]
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
          opacity-[0.03]
          [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]
          [background-size:100px_100px]
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
            mb-12
            flex
            flex-col
            gap-7
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
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
                  tracking-[0.34em]
                  text-[#d6b56c]
                "
              >
                Designed around you
              </p>
            </motion.div>

            <motion.h2
              initial={{
                opacity: 0,
                y: 45,
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
                text-[clamp(3.8rem,7vw,7.6rem)]
                leading-[0.8]
                tracking-[-0.045em]
                text-white
              "
            >
              Explore by

              <br />

              <span className="text-gold-gradient">
                lifestyle.
              </span>
            </motion.h2>
          </div>

          <div className="max-w-[430px]">
            <p
              className="
                text-[13px]
                leading-7
                text-white/43
              "
            >
              From waterfront estates to elevated city homes,
              discover residences selected around the way you
              want to live.
            </p>

            <Link
              href="/properties"
              className="
                group
                mt-6
                inline-flex
                items-center
                gap-4
                text-[9px]
                uppercase
                tracking-[0.19em]
                text-[#d9bb75]
              "
            >
              View all lifestyles

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
            </Link>
          </div>
        </div>

        <div
          className="
            grid
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {lifestyleItems.map((item, index) => (
            <LifestyleCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}