"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2 } from "lucide-react";

export default function FooterLogo() {
  return (
    <div className="max-w-md">
      <Link
        href="/"
        aria-label="NestVille home"
        className="inline-flex items-center gap-4"
      >
        <motion.span
          whileHover={{
            rotate: 8,
            scale: 1.05,
          }}
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            border
            border-[#d6b56a]/25
            bg-[#d6b56a]/10
            text-[#d6b56a]
            shadow-[0_15px_40px_rgba(214,181,106,0.12)]
          "
        >
          <Building2 size={25} />
        </motion.span>

        <div>
          <span
            className="
              block
              text-[25px]
              font-light
              uppercase
              tracking-[0.18em]
              text-white
            "
          >
            NestVille
          </span>

          <span
            className="
              mt-1
              block
              text-[8px]
              uppercase
              tracking-[0.38em]
              text-[#d6b56a]
            "
          >
            Signature Residences
          </span>
        </div>
      </Link>

      <p
        className="
          mt-8
          max-w-sm
          text-[15px]
          leading-8
          text-white/50
        "
      >
        Curating exceptional residences, timeless architecture and
        personalized property experiences for discerning homeowners and
        investors worldwide.
      </p>

      <motion.div
        initial={{
          scaleX: 0,
        }}
        whileInView={{
          scaleX: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1,
          delay: 0.15,
        }}
        className="
          mt-8
          h-px
          w-full
          origin-left
          bg-gradient-to-r
          from-[#d6b56a]/70
          via-[#d6b56a]/20
          to-transparent
        "
      />

      <Link
        href="/properties"
        className="
          group
          mt-8
          inline-flex
          items-center
          gap-3
          text-[10px]
          uppercase
          tracking-[0.25em]
          text-[#d6b56a]
        "
      >
        Explore Residences

        <motion.span
          whileHover={{
            x: 4,
            y: -2,
          }}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-[#d6b56a]/20
            bg-[#d6b56a]/10
            transition-colors
            duration-300
            group-hover:bg-[#d6b56a]
            group-hover:text-[#050505]
          "
        >
          <ArrowUpRight size={15} />
        </motion.span>
      </Link>
    </div>
  );
}