"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Building2,
  Heart,
  MapPin,
  Maximize2,
} from "lucide-react";
import { useState } from "react";

export interface Property {
  id: number;
  title: string;
  location: string;
  image: string;
  price: string;
  type: string;
  status?: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  featured?: boolean;
  href?: string;
}

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({
  property,
  index = 0,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const {
    title,
    location,
    image,
    price,
    type,
    status = "Available",
    bedrooms,
    bathrooms,
    area,
    featured = false,
    href = `/properties/${property.id}`,
  } = property;

  return (
    <motion.article
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/[0.08]
        bg-[#0d0d0c]
        shadow-[0_30px_90px_rgba(0,0,0,0.35)]
        transition-all
        duration-500
        hover:border-[#d4af67]/30
      "
    >
      <div className="relative h-[330px] overflow-hidden sm:h-[360px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="
            object-cover
            transition-transform
            duration-[1200ms]
            ease-out
            group-hover:scale-[1.08]
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/20
            to-black/10
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[#c79d52]/0
            transition-colors
            duration-500
            group-hover:bg-[#c79d52]/10
          "
        />

        <div className="absolute left-5 top-5 flex flex-wrap gap-3">
          {featured && (
            <span
              className="
                rounded-full
                border
                border-[#d4af67]/40
                bg-[#d4af67]
                px-4
                py-2
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#15110a]
              "
            >
              Featured
            </span>
          )}

          <span
            className="
              rounded-full
              border
              border-white/15
              bg-black/35
              px-4
              py-2
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/75
              backdrop-blur-xl
            "
          >
            {status}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsFavorite((current) => !current)}
          aria-label={
            isFavorite
              ? "Remove property from favorites"
              : "Add property to favorites"
          }
          className={`
            absolute
            right-5
            top-5
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            backdrop-blur-xl
            transition-all
            duration-300
            ${
              isFavorite
                ? "border-[#d4af67] bg-[#d4af67] text-black"
                : "border-white/15 bg-black/30 text-white hover:border-[#d4af67]/50 hover:text-[#d4af67]"
            }
          `}
        >
          <Heart
            size={17}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="flex items-end justify-between gap-5">
            <div>
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.32em]
                  text-[#d4af67]
                "
              >
                Starting From
              </span>

              <p className="mt-2 text-2xl font-light text-white sm:text-3xl">
                {price}
              </p>
            </div>

            <motion.div
              whileHover={{
                rotate: 8,
                scale: 1.05,
              }}
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                bg-white/[0.08]
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                group-hover:border-[#d4af67]
                group-hover:bg-[#d4af67]
                group-hover:text-black
              "
            >
              <ArrowUpRight size={19} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between gap-5">
          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              px-3
              py-2
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/45
            "
          >
            <Building2 size={13} className="text-[#d4af67]" />

            {type}
          </span>

          <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
            ID {String(property.id).padStart(3, "0")}
          </span>
        </div>

        <Link href={href} className="mt-6 block">
          <h3
            className="
              text-2xl
              font-light
              leading-snug
              text-white
              transition-colors
              duration-300
              group-hover:text-[#e0bf7a]
            "
          >
            {title}
          </h3>
        </Link>

        <div className="mt-4 flex items-start gap-3 text-sm text-white/45">
          <MapPin
            size={16}
            className="mt-0.5 shrink-0 text-[#d4af67]"
          />

          <span className="leading-6">{location}</span>
        </div>

        <div
          className="
            mt-7
            grid
            grid-cols-3
            divide-x
            divide-white/10
            rounded-[20px]
            border
            border-white/[0.08]
            bg-white/[0.025]
            px-2
            py-4
          "
        >
          <div className="flex flex-col items-center gap-2 px-2">
            <BedDouble size={17} className="text-[#d4af67]" />

            <span className="text-sm text-white">{bedrooms}</span>

            <span className="text-[8px] uppercase tracking-[0.18em] text-white/30">
              Beds
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 px-2">
            <Bath size={17} className="text-[#d4af67]" />

            <span className="text-sm text-white">{bathrooms}</span>

            <span className="text-[8px] uppercase tracking-[0.18em] text-white/30">
              Baths
            </span>
          </div>

          <div className="flex flex-col items-center gap-2 px-2">
            <Maximize2 size={17} className="text-[#d4af67]" />

            <span className="text-sm text-white">{area}</span>

            <span className="text-[8px] uppercase tracking-[0.18em] text-white/30">
              Area
            </span>
          </div>
        </div>

        <Link
          href={href}
          className="
            group/button
            mt-7
            flex
            items-center
            justify-between
            border-t
            border-white/10
            pt-6
          "
        >
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.28em]
              text-white/45
              transition-colors
              duration-300
              group-hover/button:text-[#d4af67]
            "
          >
            View Property
          </span>

          <span
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              text-white/60
              transition-all
              duration-300
              group-hover/button:border-[#d4af67]
              group-hover/button:bg-[#d4af67]
              group-hover/button:text-black
            "
          >
            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-300
                group-hover/button:-translate-y-0.5
                group-hover/button:translate-x-0.5
              "
            />
          </span>
        </Link>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          inset-x-10
          bottom-0
          h-px
          scale-x-0
          bg-gradient-to-r
          from-transparent
          via-[#d4af67]
          to-transparent
          transition-transform
          duration-700
          group-hover:scale-x-100
        "
      />
    </motion.article>
  );
}