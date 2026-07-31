"use client";

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
            z-[100]
            overflow-hidden
            bg-[#060806]
          "
        >
          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: 1,
            }}
            exit={{
              scaleX: 0,
            }}
            transition={{
              duration: 0.75,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              transformOrigin: "right center",
            }}
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_80%_20%,rgba(36,77,53,0.38),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(200,163,91,0.12),transparent_30%),#060806]
            "
          />

          <div
            className="
              absolute
              inset-0
              opacity-[0.035]
              [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)]
              [background-size:80px_80px]
            "
          />

          <div
            className="
              relative
              z-10
              flex
              min-h-screen
              flex-col
              px-6
              py-6
              sm:px-10
            "
          >
            <div className="flex items-center justify-between">
              <a
                href="#home"
                onClick={onClose}
                className="
                  font-display
                  text-[25px]
                  tracking-[0.23em]
                  text-[#e4cb90]
                "
              >
                NESTVILLE
              </a>

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
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.035]
                  text-white
                  backdrop-blur-md
                "
              >
                <X size={20} strokeWidth={1.5} />
              </motion.button>
            </div>

            <div className="flex flex-1 items-center">
              <nav className="w-full">
                <p
                  className="
                    mb-7
                    text-[10px]
                    uppercase
                    tracking-[0.35em]
                    text-white/35
                  "
                >
                  Explore NestVille
                </p>

                <div>
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
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
                        delay: 0.18 + index * 0.065,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        group
                        flex
                        items-center
                        justify-between
                        border-b
                        border-white/[0.08]
                        py-3
                        sm:py-4
                      "
                    >
                      <span
                        className="
                          font-display
                          text-[clamp(2.3rem,8vw,4.8rem)]
                          leading-none
                          text-white/88
                          transition-all
                          duration-500
                          group-hover:translate-x-3
                          group-hover:text-[#d8b569]
                        "
                      >
                        {item.label}
                      </span>

                      <span
                        className="
                          flex
                          h-10
                          w-10
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
                        "
                      >
                        <ArrowUpRight size={17} />
                      </span>
                    </motion.a>
                  ))}
                </div>
              </nav>
            </div>

            <div
              className="
                flex
                items-center
                justify-between
                border-t
                border-white/10
                pt-5
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.28em]
                    text-white/35
                  "
                >
                  Private enquiries
                </p>

                <a
                  href="mailto:hello@nestville.com"
                  className="
                    mt-1
                    block
                    text-sm
                    text-white/70
                  "
                >
                  hello@nestville.com
                </a>
              </div>

              <div className="flex gap-2">
                <a
                  href="#instagram"
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
                  "
                >
                  <FaInstagram size={16} />
                </a>

                <a
                  href="#linkedin"
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