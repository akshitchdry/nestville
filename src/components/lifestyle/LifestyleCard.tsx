"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { LifestyleItem } from "./lifestyleData";

interface LifestyleCardProps {
  item: LifestyleItem;
  index: number;
}

export default function LifestyleCard({
  item,
  index,
}: LifestyleCardProps) {
  const Icon = item.icon;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        min-h-[430px]
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-[#0b0f0c]
      "
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="
          (max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw
        "
        className="
          object-cover
          transition-transform
          duration-[1400ms]
          ease-out
          group-hover:scale-[1.09]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#030503]
          via-[#030503]/35
          to-[#030503]/15
        "
      />

      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-700
          group-hover:opacity-100
          [background:radial-gradient(circle_at_75%_20%,rgba(216,182,110,0.2),transparent_40%)]
        "
      />

      <div
        className="
          absolute
          left-5
          right-5
          top-5
          z-10
          flex
          items-start
          justify-between
        "
      >
        <span
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-black/25
            text-[#e1c27a]
            backdrop-blur-xl
            transition-all
            duration-500
            group-hover:rotate-6
            group-hover:border-[#c8a35b]/50
            group-hover:bg-[#c8a35b]
            group-hover:text-black
          "
        >
          <Icon size={18} strokeWidth={1.4} />
        </span>

        <span
          className="
            rounded-full
            border
            border-white/12
            bg-black/25
            px-4
            py-2
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/60
            backdrop-blur-xl
          "
        >
          {item.propertyCount}
        </span>
      </div>

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-10
          p-6
          sm:p-7
        "
      >
        <p
          className="
            text-[8px]
            uppercase
            tracking-[0.25em]
            text-[#d7b66e]
          "
        >
          Lifestyle collection
        </p>

        <h3
          className="
            font-display
            mt-3
            text-[40px]
            leading-[0.9]
            text-white
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-4
            max-w-[340px]
            text-[12px]
            leading-6
            text-white/48
          "
        >
          {item.description}
        </p>

        <Link
          href={item.href}
          className="
            group/link
            mt-6
            inline-flex
            items-center
            gap-4
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-[#dfc078]
          "
        >
          Explore collection

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
              transition-all
              duration-400
              group-hover/link:bg-[#c8a35b]
              group-hover/link:text-black
            "
          >
            <ArrowUpRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover/link:translate-x-1
                group-hover/link:-translate-y-1
              "
            />
          </span>
        </Link>
      </div>

      <span
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[28px]
          border
          border-[#e1c27a]/0
          transition-colors
          duration-700
          group-hover:border-[#e1c27a]/25
        "
      />

      <span
        className="
          absolute
          bottom-0
          left-0
          z-20
          h-px
          w-0
          bg-gradient-to-r
          from-transparent
          via-[#e1c27a]
          to-transparent
          transition-all
          duration-1000
          group-hover:w-full
        "
      />
    </motion.article>
  );
}