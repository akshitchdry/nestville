"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bath,
  BedDouble,
  Building2,
  MapPin,
  Search,
  X,
} from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoProperties = [
  {
    id: 1,
    title: "The Grand Aria",
    location: "Downtown Dubai",
    type: "Apartment",
    price: "$1.8M",
    bedrooms: 3,
    bathrooms: 4,
  },
  {
    id: 2,
    title: "Palm Signature Villa",
    location: "Palm Jumeirah",
    type: "Villa",
    price: "$6.5M",
    bedrooms: 5,
    bathrooms: 6,
  },
  {
    id: 3,
    title: "Marina Sky Penthouse",
    location: "Dubai Marina",
    type: "Penthouse",
    price: "$4.2M",
    bedrooms: 4,
    bathrooms: 5,
  },
  {
    id: 4,
    title: "Celestia Residences",
    location: "Dubai",
    type: "Project",
    price: "From $950K",
    bedrooms: 2,
    bathrooms: 2,
  },
];

export default function SearchModal({
  isOpen,
  onClose,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All Types");

  const results = useMemo(() => {
    return demoProperties.filter((property) => {
      const textMatch =
        query.trim() === "" ||
        property.title
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        property.location
          .toLowerCase()
          .includes(query.toLowerCase());

      const typeMatch =
        type === "All Types" ||
        property.type === type;

      return textMatch && typeMatch;
    });
  }, [query, type]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
            fixed
            inset-0
            z-[120]
            flex
            items-start
            justify-center
            overflow-y-auto
            bg-black/70
            px-4
            pb-10
            pt-24
            backdrop-blur-xl
            sm:px-6
            lg:pt-28
          "
        >
          {/* BACKDROP CLOSE */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="
              absolute
              inset-0
              h-full
              w-full
              cursor-default
            "
          />

          {/* MODAL */}

          <motion.div
            initial={{
              opacity: 0,
              y: -25,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10
              w-full
              max-w-[1050px]
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-[#070907]/95
              shadow-[0_35px_120px_rgba(0,0,0,0.7)]
              backdrop-blur-2xl
            "
          >
            {/* TOP */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-6
                border-b
                border-white/10
                px-5
                py-5
                sm:px-7
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.35em]
                    text-[#d6b56a]
                  "
                >
                  Property Search
                </p>

                <h2
                  className="
                    mt-2
                    text-2xl
                    font-light
                    text-white
                    sm:text-3xl
                  "
                >
                  Find your next address
                </h2>
              </div>

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{
                  rotate: 90,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                aria-label="Close search"
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-white/60
                  transition-colors
                  hover:border-[#d6b56a]/40
                  hover:text-[#d6b56a]
                "
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* SEARCH CONTROLS */}

            <div
              className="
                grid
                gap-3
                p-4
                sm:p-6
                md:grid-cols-[1fr_220px]
              "
            >
              <label
                className="
                  flex
                  min-h-[60px]
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  transition-colors
                  focus-within:border-[#d6b56a]/40
                "
              >
                <Search
                  size={17}
                  className="text-[#d6b56a]"
                />

                <input
                  value={query}
                  onChange={(event) =>
                    setQuery(event.target.value)
                  }
                  placeholder="Search by property or location..."
                  autoFocus
                  className="
                    w-full
                    bg-transparent
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/25
                  "
                />
              </label>

              <label
                className="
                  flex
                  min-h-[60px]
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  px-4
                "
              >
                <Building2
                  size={17}
                  className="text-[#d6b56a]"
                />

                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value)
                  }
                  className="
                    h-full
                    w-full
                    bg-transparent
                    text-sm
                    text-white
                    outline-none
                  "
                >
                  <option className="bg-[#080b09]">
                    All Types
                  </option>
                  <option className="bg-[#080b09]">
                    Villa
                  </option>
                  <option className="bg-[#080b09]">
                    Apartment
                  </option>
                  <option className="bg-[#080b09]">
                    Penthouse
                  </option>
                  <option className="bg-[#080b09]">
                    Project
                  </option>
                </select>
              </label>
            </div>

            {/* RESULT HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-y
                border-white/10
                px-5
                py-4
                sm:px-7
              "
            >
              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.25em]
                  text-white/30
                "
              >
                Search Results
              </p>

              <p
                className="
                  text-xs
                  text-white/45
                "
              >
                {results.length}{" "}
                {results.length === 1
                  ? "property"
                  : "properties"}
              </p>
            </div>

            {/* RESULTS */}

            <div
              className="
                max-h-[520px]
                overflow-y-auto
                p-4
                sm:p-6
              "
            >
              {results.length > 0 ? (
                <div
                  className="
                    grid
                    gap-3
                    md:grid-cols-2
                  "
                >
                  {results.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{
                        opacity: 0,
                        y: 12,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        group
                        rounded-[20px]
                        border
                        border-white/10
                        bg-white/[0.025]
                        p-5
                        transition-all
                        duration-300
                        hover:border-[#d6b56a]/30
                        hover:bg-[#d6b56a]/[0.04]
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >
                        <div>
                          <p
                            className="
                              text-[8px]
                              uppercase
                              tracking-[0.2em]
                              text-[#d6b56a]
                            "
                          >
                            {property.type}
                          </p>

                          <h3
                            className="
                              mt-2
                              text-xl
                              font-light
                              text-white
                            "
                          >
                            {property.title}
                          </h3>

                          <p
                            className="
                              mt-2
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-white/40
                            "
                          >
                            <MapPin
                              size={12}
                              className="text-[#d6b56a]"
                            />

                            {property.location}
                          </p>
                        </div>

                        <p
                          className="
                            shrink-0
                            text-sm
                            text-[#e4c77f]
                          "
                        >
                          {property.price}
                        </p>
                      </div>

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          gap-5
                          border-t
                          border-white/10
                          pt-4
                          text-xs
                          text-white/45
                        "
                      >
                        <span
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <BedDouble
                            size={14}
                            className="text-[#d6b56a]"
                          />

                          {property.bedrooms} Beds
                        </span>

                        <span
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <Bath
                            size={14}
                            className="text-[#d6b56a]"
                          />

                          {property.bathrooms} Baths
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div
                  className="
                    py-16
                    text-center
                  "
                >
                  <Search
                    size={26}
                    className="
                      mx-auto
                      text-[#d6b56a]
                    "
                  />

                  <h3
                    className="
                      mt-5
                      text-2xl
                      font-light
                      text-white
                    "
                  >
                    No results found
                  </h3>

                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-md
                      text-sm
                      leading-7
                      text-white/35
                    "
                  >
                    Try another property name,
                    location or property type.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}