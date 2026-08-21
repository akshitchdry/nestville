"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { navItems } from "./navData";

export default function DesktopMenu() {
  return (
    <nav className="hidden items-center gap-1 xl:flex">
      {navItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{
            opacity: 0,
            y: -14,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            delay: 0.25 + index * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={item.href}
            className="
              group
              relative
              block
              px-4
              py-4
              text-[11px]
              font-medium
              uppercase
              tracking-[0.12em]
              text-white/65
              transition-colors
              duration-300
              hover:text-[#ead49b]
            "
          >
            <span className="relative z-10">{item.label}</span>

            <span
              className="
                absolute
                bottom-2
                left-4
                right-4
                h-px
                origin-left
                scale-x-0
                bg-gradient-to-r
                from-transparent
                via-[#d4af62]
                to-transparent
                transition-transform
                duration-500
                group-hover:scale-x-100
              "
            />

            <span
              className="
                absolute
                inset-1
                -z-0
                rounded-full
                bg-[#c8a35b]/0
                blur-xl
                transition-colors
                duration-500
                group-hover:bg-[#c8a35b]/5
              "
            />
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}
