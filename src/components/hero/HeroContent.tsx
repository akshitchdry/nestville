"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";

export default function HeroContent() {
  return (
    <div
      className="
        relative
        z-20
        w-full
        max-w-[760px]
      "
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="
          mb-5
          flex
          items-center
          gap-3
          text-[9px]
          uppercase
          tracking-[0.32em]
          text-[#d5b365]
          sm:text-[10px]
        "
      >
        <span className="h-px w-10 bg-[#c8a35b]/60" />
        Private residences
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 45 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          font-display
          text-[clamp(3.4rem,6.5vw,7rem)]
          leading-[0.82]
          tracking-[-0.045em]
          text-[#f6f0e5]
        
          
        "
      >
        Where Luxury
        <br />
        Finds Its{" "}
        <span className="text-gold-gradient">
          Address.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.48 }}
        className="
          mt-6
          max-w-[500px]
          text-[13px]
          leading-7
          text-white/55
          sm:text-[14px]
        "
      >
        Discover extraordinary homes in the world&apos;s most desirable
        locations, crafted for those who expect more from every space.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.62 }}
        className="
          mt-7
          flex
          flex-col
          gap-3
          sm:flex-row
        "
      >
        <motion.a
          href="#residences"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="
            group
            flex
            min-h-12
            items-center
            justify-center
            gap-3
            rounded-full
            bg-gradient-to-r
            from-[#a57b36]
            via-[#dfbd70]
            to-[#a57b36]
            px-7
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.14em]
            text-[#090b09]
          "
        >
          Explore residences
          <ArrowUpRight
            size={15}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </motion.a>

        <motion.a
          href="#consultation"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="
            group
            flex
            min-h-12
            items-center
            justify-center
            gap-3
            rounded-full
            border
            border-white/15
            bg-black/20
            px-7
            text-[10px]
            uppercase
            tracking-[0.14em]
            text-white/75
            backdrop-blur-md
          "
        >
          Book a private tour

          <span
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-white/15
            "
          >
            <Play size={10} fill="currentColor" />
          </span>
        </motion.a>
      </motion.div>
    </div>
  );
}