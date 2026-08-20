"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
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
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        ${isCenter ? "mx-auto text-center" : ""}
        ${className}
      `}
    >
      {/* EYEBROW */}

      {eyebrow && (
        <div
          className={`
            flex
            items-center
            gap-4
            ${isCenter ? "justify-center" : ""}
          `}
        >
          <span className="h-px w-10 bg-[#d6b56a]" />

          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-[#d6b56a]
            "
          >
            {eyebrow}
          </span>

          {isCenter && (
            <span className="h-px w-10 bg-[#d6b56a]" />
          )}
        </div>
      )}

      {/* TITLE */}

      <h2
        className="
          mt-7
          text-[clamp(3rem,6vw,6.5rem)]
          font-light
          leading-[0.9]
          tracking-[-0.045em]
          text-white
        "
      >
        {title}

        {highlight && (
          <>
            <br />

            <span className="text-[#d6b56a]">
              {highlight}
            </span>
          </>
        )}
      </h2>

      {/* DESCRIPTION */}

      {description && (
        <p
          className={`
            mt-7
            max-w-xl
            text-[14px]
            leading-8
            text-white/45
            ${isCenter ? "mx-auto" : ""}
          `}
        >
          {description}
        </p>
      )}

      {/* DECORATIVE LINE */}

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
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`
          mt-9
          h-px
          w-24
          origin-left
          bg-gradient-to-r
          from-[#d6b56a]
          to-transparent
          ${isCenter ? "mx-auto origin-center" : ""}
        `}
      />
    </motion.div>
  );
}