"use client";

import { motion } from "framer-motion";
import {
  BedDouble,
  Building2,
  ChevronDown,
  MapPin,
  Search,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

const searchTabs = ["Buy", "Rent", "Projects"];

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState("Buy");

  return (
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
        duration: 0.9,
        delay: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
  absolute
  bottom-7
  left-1/2
  z-40
  w-[calc(100%-32px)]
  max-w-[1180px]
  -translate-x-1/2
  mb-13
"
    >
      <div
        className="
          overflow-hidden
          rounded-[24px]
          border
          border-white/10
          bg-[#080b09]/75
          shadow-[0_30px_100px_rgba(0,0,0,0.5)]
          backdrop-blur-2xl
        "
      >
        <div className="flex border-b border-white/[0.08]">
          {searchTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="
                relative
                min-w-[100px]
                px-6
                py-4
                text-[11px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/45
                transition-colors
                hover:text-white
              "
            >
              <span
                className={
                  activeTab === tab
                    ? "relative z-10 text-[#e5c981]"
                    : "relative z-10"
                }
              >
                {tab}
              </span>

              {activeTab === tab && (
                <motion.span
                  layoutId="active-search-tab"
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-[#c8a35b]/15
                    to-transparent
                  "
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              )}

              {activeTab === tab && (
                <motion.span
                  layoutId="active-search-line"
                  className="
                    absolute
                    bottom-0
                    left-5
                    right-5
                    h-px
                    bg-[#d5b464]
                  "
                />
              )}
            </button>
          ))}
        </div>

        <div
          className="
            grid
            gap-2
            p-3
            md:grid-cols-2
            lg:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto]
          "
        >
          <SearchField
            icon={<MapPin size={16} />}
            label="Location"
            value="Enter location"
          />

          <SearchField
            icon={<Building2 size={16} />}
            label="Property type"
            value="Select type"
          />

          <SearchField
            icon={<WalletCards size={16} />}
            label="Price range"
            value="$500K – $5M"
          />

          <SearchField
            icon={<BedDouble size={16} />}
            label="Bedrooms"
            value="Any"
          />

          <motion.button
            type="button"
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              group
              relative
              flex
              min-h-[68px]
              items-center
              justify-center
              gap-3
              overflow-hidden
              rounded-[16px]
              bg-gradient-to-r
              from-[#a47b36]
              via-[#dfbd71]
              to-[#a47b36]
              px-7
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-[#090b09]
            "
          >
            <span
              className="
                absolute
                inset-y-0
                -left-1/2
                w-1/3
                skew-x-[-20deg]
                bg-white/30
                blur-md
                transition-all
                duration-700
                group-hover:left-[120%]
              "
            />

            <span className="relative z-10">
              Discover
            </span>

            <Search
              size={17}
              className="
                relative
                z-10
                transition-transform
                duration-300
                group-hover:rotate-12
                group-hover:scale-110
              "
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

interface SearchFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SearchField({
  icon,
  label,
  value,
}: SearchFieldProps) {
  return (
    <button
      type="button"
      className="
        group
        flex
        min-h-[68px]
        items-center
        gap-3
        rounded-[16px]
        border
        border-white/[0.07]
        bg-white/[0.025]
        px-4
        text-left
        transition-all
        duration-300
        hover:border-[#c8a35b]/25
        hover:bg-white/[0.045]
      "
    >
      <span
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[#c8a35b]/20
          text-[#d6b66d]
        "
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="
            block
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-white/35
          "
        >
          {label}
        </span>

        <span
          className="
            mt-1
            block
            truncate
            text-[12px]
            text-white/75
          "
        >
          {value}
        </span>
      </span>

      <ChevronDown
        size={14}
        className="
          text-white/30
          transition-transform
          duration-300
          group-hover:translate-y-0.5
          group-hover:text-[#d6b66d]
        "
      />
    </button>
  );
}