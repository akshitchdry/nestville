"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BedDouble,
  Building2,
  ChevronDown,
  MapPin,
  Search,
  WalletCards,
} from "lucide-react";

const searchTabs = ["Buy", "Rent", "Projects"];

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState("Buy");

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
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
        mx-auto
        w-full
        max-w-[1180px]
      "
    >
      <div
        className="
          overflow-hidden
          rounded-[22px]
          border
          border-white/10
          bg-[#080b09]/90
          shadow-[0_24px_80px_rgba(0,0,0,0.5)]
          backdrop-blur-2xl

          sm:rounded-[24px]
        "
      >
        {/* TABS */}

        <div
          className="
            flex
            overflow-x-auto
            border-b
            border-white/[0.08]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {searchTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="
                relative
                min-w-[88px]
                flex-1
                px-4
                py-3.5
                text-[9px]
                font-medium
                uppercase
                tracking-[0.16em]
                text-white/45
                transition-colors
                hover:text-white

                sm:min-w-[100px]
                sm:px-6
                sm:py-4
                sm:text-[11px]
                sm:tracking-[0.18em]
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
                    left-4
                    right-4
                    h-px
                    bg-[#d5b464]

                    sm:left-5
                    sm:right-5
                  "
                />
              )}
            </button>
          ))}
        </div>

        {/* SEARCH FIELDS */}

        <div
          className="
            grid
            grid-cols-1
            gap-2
            p-2.5

            sm:grid-cols-2
            sm:p-3

            lg:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto]
          "
        >
          <SearchField
            icon={<MapPin size={15} />}
            label="Location"
            value="Enter location"
          />

          <SearchField
            icon={<Building2 size={15} />}
            label="Property type"
            value="Select type"
          />

          <SearchField
            icon={<WalletCards size={15} />}
            label="Price range"
            value="$500K – $5M"
          />

          <SearchField
            icon={<BedDouble size={15} />}
            label="Bedrooms"
            value="Any"
          />

          <motion.button
            type="button"
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              group
              relative
              flex
              min-h-[56px]
              items-center
              justify-center
              gap-3
              overflow-hidden
              rounded-[15px]
              bg-gradient-to-r
              from-[#a47b36]
              via-[#dfbd71]
              to-[#a47b36]
              px-6
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.13em]
              text-[#090b09]

              sm:min-h-[62px]
              sm:text-[10px]

              lg:min-h-[68px]
              lg:px-7
              lg:text-[11px]
              lg:tracking-[0.14em]
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
              size={16}
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
        min-h-[56px]
        items-center
        gap-3
        rounded-[15px]
        border
        border-white/[0.07]
        bg-white/[0.025]
        px-3.5
        text-left
        transition-all
        duration-300
        hover:border-[#c8a35b]/25
        hover:bg-white/[0.045]

        sm:min-h-[62px]
        sm:px-4

        lg:min-h-[68px]
      "
    >
      <span
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          border-[#c8a35b]/20
          text-[#d6b66d]

          sm:h-9
          sm:w-9
        "
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className="
            block
            text-[7px]
            uppercase
            tracking-[0.15em]
            text-white/35

            sm:text-[8px]

            lg:text-[9px]
            lg:tracking-[0.18em]
          "
        >
          {label}
        </span>

        <span
          className="
            mt-1
            block
            truncate
            text-[11px]
            text-white/75

            sm:text-[12px]
          "
        >
          {value}
        </span>
      </span>

      <ChevronDown
        size={13}
        className="
          shrink-0
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