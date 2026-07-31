"use client";

import { motion } from "framer-motion";

export default function FooterBackground() {
  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#050505]
            via-[#080808]
            to-black
          "
        />

        {/* Top Glow */}
        <motion.div
          animate={{
            opacity: [0.15, 0.3, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-[-220px]
            h-[700px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#d6b56a]
            blur-[220px]
          "
        />

        {/* Left Glow */}
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-56
            top-44
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#d6b56a]/10
            blur-[170px]
          "
        />

        {/* Right Glow */}
        <motion.div
          animate={{
            x: [0, -25, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-56
            bottom-20
            h-[540px]
            w-[540px]
            rounded-full
            bg-[#d6b56a]/10
            blur-[180px]
          "
        />

        {/* Small Floating Orbs */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -35, 0],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            className="absolute"
            style={{
              left: `${8 + i * 9}%`,
              top: `${15 + (i % 5) * 15}%`,
            }}
          >
            <div
              className="
                h-3
                w-3
                rounded-full
                bg-[#d6b56a]
                blur-[2px]
              "
            />
          </motion.div>
        ))}

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />

        {/* Noise */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            mix-blend-soft-light
            [background-image:url('/images/noise.png')]
            bg-repeat
          "
        />

        {/* Bottom Fade */}
        <div
          className="
            absolute
            bottom-0
            left-0
            h-56
            w-full
            bg-gradient-to-t
            from-black
            to-transparent
          "
        />
      </div>
    </>
  );
}