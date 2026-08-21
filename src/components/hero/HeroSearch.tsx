"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  BedDouble,
  Building2,
  ChevronDown,
  MapPin,
  Search,
  WalletCards,
  X,
} from "lucide-react";

const searchTabs = ["Buy", "Rent", "Projects"];

const locations = [
  "All Locations",
  "Dubai",
  "Palm Jumeirah",
  "Downtown Dubai",
  "Dubai Marina",
];

const propertyTypes = [
  "All Types",
  "Villa",
  "Apartment",
  "Penthouse",
  "Townhouse",
  "Project",
];

const priceRanges = [
  "Any Price",
  "$500K – $1M",
  "$1M – $2M",
  "$2M – $5M",
  "$5M+",
];

const bedroomOptions = ["Any", "1", "2", "3", "4", "5+"];

const demoProperties = [
  {
    id: 1,
    title: "The Grand Aria",
    mode: "Buy",
    location: "Downtown Dubai",
    type: "Apartment",
    price: "$1.8M",
    priceBand: "$1M – $2M",
    bedrooms: "3",
  },
  {
    id: 2,
    title: "Palm Signature Villa",
    mode: "Buy",
    location: "Palm Jumeirah",
    type: "Villa",
    price: "$6.5M",
    priceBand: "$5M+",
    bedrooms: "5+",
  },
  {
    id: 3,
    title: "Marina Sky Penthouse",
    mode: "Rent",
    location: "Dubai Marina",
    type: "Penthouse",
    price: "$18K / month",
    priceBand: "$2M – $5M",
    bedrooms: "4",
  },
  {
    id: 4,
    title: "Celestia Residences",
    mode: "Projects",
    location: "Dubai",
    type: "Project",
    price: "From $950K",
    priceBand: "$500K – $1M",
    bedrooms: "2",
  },
];

export default function HeroSearch() {
  const [activeTab, setActiveTab] = useState("Buy");

  const [location, setLocation] = useState("All Locations");
  const [propertyType, setPropertyType] = useState("All Types");
  const [priceRange, setPriceRange] = useState("Any Price");
  const [bedrooms, setBedrooms] = useState("Any");

  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    return demoProperties.filter((property) => {
      const tabMatch = property.mode === activeTab;

      const locationMatch =
        location === "All Locations" || property.location === location;

      const typeMatch =
        propertyType === "All Types" || property.type === propertyType;

      const priceMatch =
        priceRange === "Any Price" || property.priceBand === priceRange;

      const bedroomMatch = bedrooms === "Any" || property.bedrooms === bedrooms;

      return (
        tabMatch && locationMatch && typeMatch && priceMatch && bedroomMatch
      );
    });
  }, [activeTab, location, propertyType, priceRange, bedrooms]);

  function handleDiscover() {
    setShowResults(true);
  }

  function clearResults() {
    setShowResults(false);
  }

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
              onClick={() => {
                setActiveTab(tab);
                setShowResults(false);
              }}
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
                  "
                />
              )}
            </button>
          ))}
        </div>

        {/* FILTERS */}

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
          <SelectField
            icon={<MapPin size={15} />}
            label="Location"
            value={location}
            options={locations}
            onChange={(value) => {
              setLocation(value);
              setShowResults(false);
            }}
          />

          <SelectField
            icon={<Building2 size={15} />}
            label="Property type"
            value={propertyType}
            options={propertyTypes}
            onChange={(value) => {
              setPropertyType(value);
              setShowResults(false);
            }}
          />

          <SelectField
            icon={<WalletCards size={15} />}
            label="Price range"
            value={priceRange}
            options={priceRanges}
            onChange={(value) => {
              setPriceRange(value);
              setShowResults(false);
            }}
          />

          <SelectField
            icon={<BedDouble size={15} />}
            label="Bedrooms"
            value={bedrooms}
            options={bedroomOptions}
            onChange={(value) => {
              setBedrooms(value);
              setShowResults(false);
            }}
          />

          <motion.button
            type="button"
            onClick={handleDiscover}
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
              w-full
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

            <span className="relative z-10">Discover</span>

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

        {/* INLINE RESULTS */}

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="
                overflow-hidden
                border-t
                border-white/10
              "
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="
                        text-[8px]
                        uppercase
                        tracking-[0.25em]
                        text-white/30
                      "
                    >
                      Search results
                    </p>

                    <p className="mt-1 text-sm text-white/70">
                      {results.length} matching{" "}
                      {results.length === 1 ? "property" : "properties"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={clearResults}
                    aria-label="Close results"
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      text-white/45
                      transition-colors
                      hover:border-[#d6b56a]/30
                      hover:text-[#d6b56a]
                    "
                  >
                    <X size={14} />
                  </button>
                </div>

                {results.length > 0 ? (
                  <div
                    className="
                      mt-4
                      grid
                      gap-3
                      sm:grid-cols-2
                      lg:grid-cols-4
                    "
                  >
                    {results.map((property) => (
                      <div
                        key={property.id}
                        className="
                          rounded-[18px]
                          border
                          border-white/10
                          bg-white/[0.025]
                          p-4
                        "
                      >
                        <p
                          className="
                            text-[8px]
                            uppercase
                            tracking-[0.18em]
                            text-[#d6b56a]
                          "
                        >
                          {property.type}
                        </p>

                        <h3 className="mt-2 text-base text-white">
                          {property.title}
                        </h3>

                        <p className="mt-2 text-xs text-white/40">
                          {property.location}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                          <span className="text-sm text-[#e5c981]">
                            {property.price}
                          </span>

                          <span className="text-[9px] text-white/40">
                            {property.bedrooms} Beds
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    className="
                      mt-4
                      rounded-[18px]
                      border
                      border-white/10
                      bg-white/[0.02]
                      px-5
                      py-10
                      text-center
                    "
                  >
                    <p className="text-sm text-white/45">
                      No matching properties found.
                    </p>

                    <p className="mt-2 text-xs text-white/25">
                      Try changing one or more filters.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface SelectFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function SelectField({
  icon,
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <label
      className="
        group
        relative
        flex
        min-h-[56px]
        items-center
        gap-3
        rounded-[15px]
        border
        border-white/[0.07]
        bg-white/[0.025]
        px-3.5
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
          "
        >
          {label}
        </span>

        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="
            mt-1
            block
            w-full
            appearance-none
            bg-transparent
            pr-6
            text-[11px]
            text-white/75
            outline-none
            sm:text-[12px]
          "
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
              className="bg-[#080b09] text-white"
            >
              {option}
            </option>
          ))}
        </select>
      </span>

      <ChevronDown
        size={13}
        className="
          pointer-events-none
          absolute
          right-4
          shrink-0
          text-white/30
        "
      />
    </label>
  );
}
