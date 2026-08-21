"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Search } from "lucide-react";

import SearchModal from "./SearchModal";

export default function NavActions() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {/* SEARCH */}
        <motion.button
          type="button"
          aria-label="Search properties"
          onClick={() => setSearchOpen(true)}
          whileHover={{
            scale: 1.07,
          }}
          whileTap={{
            scale: 0.93,
          }}
          className="
            hidden
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/[0.025]
            text-white/65
            transition-all
            duration-300
            hover:border-[#d3ad5b]/35
            hover:bg-[#d3ad5b]/10
            hover:text-[#e3c988]
            sm:flex
          "
        >
          <Search
            size={16}
            strokeWidth={1.5}
          />
        </motion.button>

        {/* FAVOURITES */}
        <motion.div
          whileHover={{
            scale: 1.07,
          }}
          whileTap={{
            scale: 0.93,
          }}
          className="hidden sm:block"
        >
          <Link
            href="/favourites"
            aria-label="Favourites"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.025]
              text-white/65
              transition-all
              duration-300
              hover:border-[#d3ad5b]/35
              hover:bg-[#d3ad5b]/10
              hover:text-[#e3c988]
            "
          >
            <Heart
              size={16}
              strokeWidth={1.5}
            />
          </Link>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          whileHover={{
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          className="hidden lg:block"
        >
          <Link
            href="/contact"
            className="
              group
              relative
              flex
              min-h-10
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-[#c8a35b]/40
              px-5
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#e6cd94]
            "
          >
            <span
              className="
                absolute
                inset-0
                -translate-x-[105%]
                bg-gradient-to-r
                from-[#987233]
                via-[#dfbd70]
                to-[#a47a36]
                transition-transform
                duration-500
                group-hover:translate-x-0
              "
            />

            <span
              className="
                relative
                z-10
                transition-colors
                duration-500
                group-hover:text-[#090b09]
              "
            >
              Contact Us
            </span>
          </Link>
        </motion.div>
      </div>

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}