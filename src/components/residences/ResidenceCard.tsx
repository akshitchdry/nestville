"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Expand,
  Heart,
  MapPin,
} from "lucide-react";

import type { Residence } from "@/data/residences";

interface ResidenceCardProps {
  residence: Residence;
  index: number;
}

export default function ResidenceCard({
  residence,
  index,
}: ResidenceCardProps) {
  return (
    <motion.article
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
        amount: 0.25,
      }}
      transition={{
        duration: 0.9,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        h-full
        w-full
        overflow-hidden
        rounded-[34px]
        border
        border-white/10
        bg-[#0b0f0c]
        shadow-[0_25px_80px_rgba(0,0,0,0.45)]
      "
    >
      {/* IMAGE */}

      <div className="relative h-[72%] overflow-hidden">
        <Image
          src={residence.image}
          alt={residence.title}
          fill
          sizes="(max-width:768px)100vw,540px"
          className="
            object-cover
            transition-transform
            duration-[1800ms]
            ease-out
            group-hover:scale-[1.08]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#030503]
            via-[#030503]/10
            to-transparent
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-0
            transition-all
            duration-700
            group-hover:opacity-100
            [background:radial-gradient(circle_at_70%_18%,rgba(218,180,103,.20),transparent_40%)]
          "
        />

        {/* TOP BAR */}

        <div
          className="
            absolute
            left-6
            right-6
            top-6
            z-20
            flex
            items-center
            justify-between
          "
        >
          <div
            className="
              rounded-full
              border
              border-white/15
              bg-black/35
              px-4
              py-2
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/80
              backdrop-blur-xl
            "
          >
            {residence.category}
          </div>

          <motion.button
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-white/15
              bg-black/35
              text-white/70
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-[#d5b365]
              hover:bg-[#c8a35b]
              hover:text-black
            "
          >
            <Heart
              size={16}
              strokeWidth={1.5}
            />
          </motion.button>
        </div>
      </div>
             {/* CONTENT */}

      <div
        className="
          flex
          h-[28%]
          flex-col
          justify-between
          px-5
          py-4
          sm:px-6
          sm:py-5
        "
      >
        <div>
          <div
            className="
              mb-2
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-white/45
            "
          >
            <MapPin
              size={12}
              className="text-[#d5b365]"
            />

            {residence.location}
          </div>

          <h3
            className="
              font-display
              line-clamp-1
              text-[30px]
              leading-[0.95]
              tracking-[-0.03em]
              text-white
              sm:text-[34px]
              lg:text-[38px]
            "
          >
            {residence.title}
          </h3>
        </div>

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-x-4
            gap-y-2
            border-y
            border-white/10
            py-3
          "
        >
          <Feature
            icon={<BedDouble size={13} />}
            value={`${residence.bedrooms} Beds`}
          />

          <Feature
            icon={<Bath size={13} />}
            value={`${residence.bathrooms} Baths`}
          />

          <Feature
            icon={<Expand size={13} />}
            value={residence.area}
          />
        </div>

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-[7px]
                uppercase
                tracking-[0.2em]
                text-white/35
              "
            >
              Starting price
            </p>

            <p
              className="
                font-display
                mt-1
                truncate
                text-[24px]
                leading-none
                text-[#e4c87f]
                sm:text-[26px]
              "
            >
              {residence.price}
            </p>
          </div>

          <Link
            href={`/properties/${residence.slug}`}
            className="
              group/link
              flex
              h-11
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-[#c8a35b]/30
              bg-black/20
              px-4
              text-[8px]
              uppercase
              tracking-[0.15em]
              text-[#e1c37b]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:border-[#c8a35b]
              hover:bg-[#c8a35b]
              hover:text-black
            "
          >
            View

            <ArrowUpRight
              size={14}
              className="
                transition-transform
                duration-300
                group-hover/link:translate-x-1
                group-hover/link:-translate-y-1
              "
            />
          </Link>
        </div>
      </div>

      {/* BORDER HOVER */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[34px]
          border
          border-[#e2c47d]/0
          transition-all
          duration-700
          group-hover:border-[#e2c47d]/25
          group-hover:shadow-[inset_0_0_40px_rgba(216,182,110,0.05)]
        "
      />

      {/* BOTTOM LINE */}

      <span
        className="
          absolute
          bottom-0
          left-0
          z-20
          h-px
          w-0
          bg-gradient-to-r
          from-transparent
          via-[#e2c47d]
          to-transparent
          transition-all
          duration-1000
          group-hover:w-full
        "
      />
    </motion.article>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  value: string;
}

function Feature({
  icon,
  value,
}: FeatureProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        whitespace-nowrap
        text-[9px]
        text-white/55
      "
    >
      <span className="text-[#d5b365]">
        {icon}
      </span>

      {value}
    </div>
  );
}
      