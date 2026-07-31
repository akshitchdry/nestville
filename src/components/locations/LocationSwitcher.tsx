"use client";

import { motion } from "framer-motion";

interface LocationItem {
  id: number;
  city: string;
  country: string;
}

interface CitySwitcherProps {
  locations: LocationItem[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export default function CitySwitcher({
  locations,
  activeIndex,
  onChange,
}: CitySwitcherProps) {
  return (
    <div
      className="
        flex
        w-full
        gap-3
        overflow-x-auto
        pb-3
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {locations.map((location, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            key={location.id}
            type="button"
            onClick={() => onChange(index)}
            className="
              group
              relative
              shrink-0
              overflow-hidden
              rounded-full
              border
              border-white/10
              px-5
              py-3
              text-left
              transition-colors
              duration-500
            "
          >
            {isActive && (
              <motion.span
                layoutId="active-location-pill"
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 30,
                }}
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-[#d3ad61]
                "
              />
            )}

            <span
              className={`
                relative
                z-10
                flex
                items-center
                gap-3
                text-[9px]
                uppercase
                tracking-[0.18em]
                transition-colors
                duration-300
                ${
                  isActive
                    ? "text-black"
                    : "text-white/45 group-hover:text-white"
                }
              `}
            >
              <span
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  ${
                    isActive
                      ? "bg-black"
                      : "bg-[#d3ad61]"
                  }
                `}
              />

              {location.city}
            </span>
          </button>
        );
      })}
    </div>
  );
}