"use client";

import { Heart, Menu, Search } from "lucide-react";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";

import { useEffect, useState } from "react";

import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

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
    document.body.style.overflow = menuOpen ? "hidden" : "";

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
          <motion.a
            href="#home"
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
          </motion.a>

          <DesktopMenu />

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
            className="flex items-center gap-2"
          >
            <NavIcon label="Search">
              <Search size={16} strokeWidth={1.5} />
            </NavIcon>

            <NavIcon label="Favourites">
              <Heart size={16} strokeWidth={1.5} />
            </NavIcon>

            <MagneticContactButton />

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
              <Menu size={19} strokeWidth={1.4} />
            </motion.button>
          </motion.div>
        </div>

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

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

interface NavIconProps {
  label: string;
  children: React.ReactNode;
}

function NavIcon({ label, children }: NavIconProps) {
  return (
    <motion.button
      type="button"
      aria-label={label}
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
        transition-colors
        hover:border-[#d3ad5b]/35
        hover:bg-[#d3ad5b]/8
        hover:text-[#e3c988]
        sm:flex
      "
    >
      {children}
    </motion.button>
  );
}

function MagneticContactButton() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;

    const y = event.clientY - rect.top - rect.height / 2;

    setPosition({
      x: x * 0.16,
      y: y * 0.16,
    });
  }

  function resetPosition() {
    setPosition({
      x: 0,
      y: 0,
    });
  }

  return (
    <motion.a
      href="#consultation"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetPosition}
      animate={position}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
        mass: 0.4,
      }}
      className="
        group
        relative
        hidden
        overflow-hidden
        rounded-full
        border
        border-[#c8a35b]/40
        px-5
        py-3
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.16em]
        text-[#e6cd94]
        lg:inline-flex
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
        Contact US
      </span>
    </motion.a>
  );
}
