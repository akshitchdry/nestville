"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BedDouble,
  Building2,
  MapPin,
} from "lucide-react";

export default function FloatingPropertyCard() {
  return (
    <motion.article
      initial={{
        opacity: 0,
        x: 60,
        rotateY: -12,
      }}
      animate={{
        opacity: 1,
        x: 0,
        rotateY: 0,
      }}
      transition={{
        duration: 1,
        delay: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        rotateX: 2,
        rotateY: -3,
      }}
      className="
  absolute
  right-[4%]
  top-1/2
  z-30
  hidden
  w-[310px]
  -translate-y-[62%]
  overflow-hidden
  rounded-[24px]
  border
  border-[#d7b56b]/20
  bg-[#080b09]/72
  p-5
  shadow-[0_30px_90px_rgba(0,0,0,0.5)]
  backdrop-blur-2xl
  2xl:block
"
      style={{
        transformPerspective: 1000,
      }}
    >
      <div
        className="
          absolute
          -right-16
          -top-16
          h-36
          w-36
          rounded-full
          bg-[#c8a35b]/15
          blur-[50px]
        "
      />

      <div className="relative">
        <div className="flex items-center justify-between">
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/40
            "
          >
            Featured residence
          </p>

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              text-[#d7b66e]
            "
          >
            <Building2 size={14} />
          </span>
        </div>

        <div className="mt-7">
          <h2
            className="
              font-display
              text-[38px]
              leading-none
              text-[#f3ede0]
            "
          >
            The Aurelia
          </h2>

          <div
            className="
              mt-3
              flex
              items-center
              gap-2
              text-[11px]
              text-white/45
            "
          >
            <MapPin size={13} />

            <span>Palm Jumeirah, Dubai</span>
          </div>
        </div>

        <div
          className="
            mt-7
            grid
            grid-cols-2
            gap-3
          "
        >
          <div
            className="
              rounded-[14px]
              border
              border-white/[0.07]
              bg-white/[0.025]
              p-3
            "
          >
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-white/30
              "
            >
              Starting from
            </p>

            <p
              className="
                mt-1
                font-display
                text-[25px]
                text-[#e2c47f]
              "
            >
              $1.8M
            </p>
          </div>

          <div
            className="
              rounded-[14px]
              border
              border-white/[0.07]
              bg-white/[0.025]
              p-3
            "
          >
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-white/30
              "
            >
              Residence
            </p>

            <p
              className="
                mt-2
                flex
                items-center
                gap-2
                text-[12px]
                text-white/75
              "
            >
              <BedDouble size={14} />

              4 Beds
            </p>
          </div>
        </div>

        <a
          href="#properties"
          className="
            group
            mt-5
            flex
            items-center
            justify-between
            border-t
            border-white/[0.08]
            pt-4
            text-[10px]
            uppercase
            tracking-[0.16em]
            text-[#d9bb76]
          "
        >
          View residence

          <span
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#c8a35b]/20
              transition-all
              duration-300
              group-hover:bg-[#c8a35b]
              group-hover:text-black
            "
          >
            <ArrowUpRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:rotate-45
              "
            />
          </span>
        </a>
      </div>
    </motion.article>
  );
}