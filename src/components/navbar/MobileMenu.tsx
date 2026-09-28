"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  X,
} from "lucide-react";

import {
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

import { navItems } from "./navData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-[100]
            h-[100dvh]
            overflow-y-auto
            overscroll-contain
            bg-[#060806]
          "
        >
          {/* BACKGROUND */}

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              transformOrigin: "right center",
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_80%_20%,rgba(36,77,53,0.38),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(200,163,91,0.12),transparent_30%),#060806]
            "
          />

          {/* GRID */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.035]
              [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)]
              [background-size:80px_80px]
            "
          />

          {/* CONTENT */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[100dvh]
              flex-col
              px-5
              py-5
              sm:px-10
              sm:py-7
            "
          >
            {/* TOP BAR */}

            <div className="flex shrink-0 items-center justify-between">
              <Link
                href="/"
                onClick={onClose}
                className="
                  font-display
                  text-[21px]
                  tracking-[0.2em]
                  text-[#e4cb90]
                  sm:text-[25px]
                  sm:tracking-[0.23em]
                "
              >
                NESTVILLE
              </Link>

              <motion.button
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                whileHover={{
                  rotate: 90,
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.035]
                  text-white
                  backdrop-blur-md
                  sm:h-12
                  sm:w-12
                "
              >
                <X
                  size={19}
                  strokeWidth={1.5}
                />
              </motion.button>
            </div>

            {/* NAVIGATION */}

            <div className="flex flex-1 items-center py-8 sm:py-12">
              <nav className="w-full">
                <p
                  className="
                    mb-5
                    text-[9px]
                    uppercase
                    tracking-[0.35em]
                    text-white/35
                    sm:mb-7
                    sm:text-[10px]
                  "
                >
                  Explore NestVille
                </p>

                <div>
                  {navItems.map(
                    (item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{
                          opacity: 0,
                          x: 60,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: 35,
                        }}
                        transition={{
                          duration: 0.65,
                          delay:
                            0.18 +
                            index * 0.065,
                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="
                            group
                            flex
                            items-center
                            justify-between
                            gap-4
                            border-b
                            border-white/[0.08]
                            py-3
                            sm:py-4
                          "
                        >
                          <span
                            className="
                              font-display
                              text-[clamp(1.8rem,8vw,4.8rem)]
                              leading-[0.95]
                              text-white/88
                              transition-all
                              duration-500
                              group-hover:translate-x-3
                              group-hover:text-[#d8b569]
                              sm:text-[clamp(2.3rem,8vw,4.8rem)]
                            "
                          >
                            {item.label}
                          </span>

                          <span
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              -rotate-45
                              items-center
                              justify-center
                              rounded-full
                              border
                              border-white/10
                              text-white/45
                              transition-all
                              duration-500
                              group-hover:rotate-0
                              group-hover:border-[#c8a35b]
                              group-hover:bg-[#c8a35b]
                              group-hover:text-black
                              sm:h-10
                              sm:w-10
                            "
                          >
                            <ArrowUpRight
                              size={16}
                            />
                          </span>
                        </Link>
                      </motion.div>
                    ),
                  )}
                </div>
              </nav>
            </div>

            {/* BOTTOM */}

            <div
              className="
                flex
                shrink-0
                flex-col
                gap-5
                border-t
                border-white/10
                pt-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.28em]
                    text-white/35
                    sm:text-[9px]
                  "
                >
                  Private enquiries
                </p>

                <a
                  href="mailto:hello@nestville.com"
                  className="
                    mt-1
                    block
                    text-xs
                    text-white/70
                    transition-colors
                    duration-300
                    hover:text-[#d8b569]
                    sm:text-sm
                  "
                >
                  hello@nestville.com
                </a>
              </div>

              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/55
                    transition-all
                    duration-300
                    hover:border-[#c8a35b]/40
                    hover:bg-[#c8a35b]/10
                    hover:text-[#d8b569]
                  "
                >
                  <FaInstagram size={16} />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-white/55
                    transition-all
                    duration-300
                    hover:border-[#c8a35b]/40
                    hover:bg-[#c8a35b]/10
                    hover:text-[#d8b569]
                  "
                >
                  <FaLinkedinIn size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}