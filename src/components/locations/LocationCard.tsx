"use client";

import Image from "next/image";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Home,
  MapPin,
} from "lucide-react";

export interface LocationItem {
  id: number;
  city: string;
  country: string;
  image: string;
  projects: number;
  residences: number;
  price: string;
}

interface LocationCardProps {
  location: LocationItem;
}

export default function LocationCard({
  location,
}: LocationCardProps) {
  return (
    <div
      className="
        relative
        min-h-[620px]
        overflow-hidden
        rounded-[34px]
        border
        border-white/[0.08]
        bg-[#0a0d0b]
      "
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.id}
          initial={{
            opacity: 0,
            scale: 1.05,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={location.image}
            alt={`${location.city}, ${location.country}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#030503]/95
          via-[#030503]/60
          to-transparent
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/85
          via-transparent
          to-black/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.07]
          [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)]
          [background-size:90px_90px]
        "
      />

      <motion.div
        key={`content-${location.id}`}
        initial={{
          opacity: 0,
          x: -45,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.75,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10
          flex
          min-h-[620px]
          flex-col
          justify-between
          p-6
          sm:p-9
          lg:p-12
        "
      >
        <div className="flex items-start justify-between gap-5">
          <div
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-black/25
              px-4
              py-2.5
              backdrop-blur-xl
            "
          >
            <MapPin
              size={14}
              className="text-[#d6b56d]"
            />

            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/65
              "
            >
              Featured destination
            </span>
          </div>

          <span
            className="
              hidden
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-black/20
              text-white/55
              backdrop-blur-xl
              sm:flex
            "
          >
            <ArrowUpRight size={17} />
          </span>
        </div>

        <div>
          <p
            className="
              mb-4
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-[#d7b66f]
            "
          >
            {location.country}
          </p>

          <h3
            className="
              font-display
              text-[clamp(4.5rem,10vw,10rem)]
              leading-[0.72]
              tracking-[-0.06em]
              text-white
            "
          >
            {location.city}
          </h3>

          <p
            className="
              mt-7
              max-w-[480px]
              text-[13px]
              leading-7
              text-white/48
            "
          >
            Discover extraordinary residences shaped by
            world-class architecture, iconic surroundings and
            elevated modern living.
          </p>

          <div
            className="
              mt-9
              grid
              max-w-[680px]
              grid-cols-1
              gap-3
              sm:grid-cols-3
            "
          >
            <StatBox
              icon={Building2}
              value={location.projects.toString()}
              label="Projects"
            />

            <StatBox
              icon={Home}
              value={location.residences.toLocaleString()}
              label="Residences"
            />

            <StatBox
              value={location.price}
              label="Starting from"
            />
          </div>

          <Link
            href={`/properties?location=${location.city.toLowerCase()}`}
            className="
              group
              mt-9
              inline-flex
              items-center
              gap-4
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[#dfc078]
            "
          >
            Explore properties

            <span
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-[#c8a35b]/30
                transition-all
                duration-500
                group-hover:rotate-45
                group-hover:bg-[#c8a35b]
                group-hover:text-black
              "
            >
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

interface StatBoxProps {
  value: string;
  label: string;
  icon?: React.ElementType;
}

function StatBox({
  value,
  label,
  icon: Icon,
}: StatBoxProps) {
  return (
    <div
      className="
        rounded-[20px]
        border
        border-white/[0.08]
        bg-black/25
        p-5
        backdrop-blur-xl
      "
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="
            font-display
            text-[30px]
            text-white
          "
        >
          {value}
        </span>

        {/* {Icon && (
          <Icon
            size={16}
            strokeWidth={1.4}
            className="text-[#d5b369]"
          />
        )} */}
      </div>

      <p
        className="
          mt-2
          text-[8px]
          uppercase
          tracking-[0.18em]
          text-white/35
        "
      >
        {label}
      </p>
    </div>
  );
}