"use client";

import { motion } from "framer-motion";
import { Mouse } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.a
      href="#residences"
      initial={{
        opacity: 0,
        x: -20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
        delay: 1.2,
      }}
      className="
        absolute
        bottom-[300px]
        left-8
        z-30
        hidden
        items-center
        gap-3
        lg:flex
        xl:left-170
      "
    >
      <span
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-[#c8a35b]/25
          text-[#d7b66e]
        "
      >
        <Mouse size={15} strokeWidth={1.4} />
      </span>

      <span
        className="
          text-[9px]
          uppercase
          tracking-[0.23em]
          text-white/45
        "
      >
        Scroll to explore
      </span>

      <span
        className="
          relative
          h-px
          w-14
          overflow-hidden
          bg-white/15
        "
      >
        <motion.span
          animate={{
            x: ["-100%", "120%"],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            inset-y-0
            left-0
            w-1/2
            bg-gradient-to-r
            from-transparent
            via-[#d7b66e]
            to-transparent
          "
        />
      </span>
    </motion.a>
  );
}