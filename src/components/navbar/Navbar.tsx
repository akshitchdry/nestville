"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import NavActions from "./NavActions";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    setIsScrolled(current > 30);

    if (current < 100) {
      setIsVisible(true);
      return;
    }

    if (current > previous && !menuOpen) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{
          opacity: 0,
          y: -30,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -110,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          fixed
          left-0
          right-0
          top-0
          z-50
          transition-all
          duration-500
          ${
            isScrolled
              ? "border-b border-white/[0.07] bg-[#060806]/75 shadow-[0_15px_50px_rgba(0,0,0,.25)] backdrop-blur-2xl"
              : "bg-transparent"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[78px]
            w-full
            max-w-[1600px]
            items-center
            justify-between
            px-5
            sm:px-8
            lg:h-[88px]
            lg:px-12
            2xl:px-16
          "
        >
          {/* LOGO */}

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.15,
            }}
          >
            <Link
              href="/"
              className="
                group
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border
                  border-[#d4b46f]/35
                "
              >
                <span
                  className="
                    absolute
                    inset-[3px]
                    rounded-full
                    border
                    border-[#d4b46f]/15
                  "
                />

                <span
                  className="
                    font-display
                    text-[16px]
                    font-semibold
                    text-[#e2c986]
                  "
                >
                  N
                </span>

                <span
                  className="
                    absolute
                    -bottom-5
                    h-7
                    w-7
                    rounded-full
                    bg-[#c8a35b]/35
                    blur-md
                    transition-all
                    duration-500
                    group-hover:-bottom-2
                  "
                />
              </span>

              <span>
                <span
                  className="
                    font-display
                    block
                    text-[20px]
                    leading-none
                    tracking-[0.23em]
                    text-[#e4cc93]
                  "
                >
                  NESTVILLE
                </span>

                <span
                  className="
                    mt-1
                    hidden
                    text-[7px]
                    uppercase
                    tracking-[0.36em]
                    text-white/35
                    sm:block
                  "
                >
                  Private Residences
                </span>
              </span>
            </Link>
          </motion.div>

          {/* DESKTOP NAV */}

          <DesktopMenu />

          {/* RIGHT ACTIONS */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.75,
              delay: 0.3,
            }}
            className="
              flex
              items-center
              gap-2
            "
          >
            <NavActions />

            {/* MOBILE MENU BUTTON */}

            <motion.button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="
                ml-1
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/12
                bg-white/[0.035]
                text-white/80
                backdrop-blur-md
                xl:hidden
              "
            >
              <Menu
                size={19}
                strokeWidth={1.4}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* BOTTOM LINE */}

        <motion.div
          animate={{
            scaleX: isScrolled ? 1 : 0,
          }}
          className="
            absolute
            bottom-0
            left-0
            h-px
            w-full
            origin-left
            bg-gradient-to-r
            from-transparent
            via-[#c8a35b]/35
            to-transparent
          "
        />
      </motion.header>

      {/* MOBILE MENU */}

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}