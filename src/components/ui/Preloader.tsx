"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-[#050605]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[500px]
              w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#d6b56a]/10
              blur-[180px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.03]
              [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
              [background-size:80px_80px]
            "
          />

          <div className="relative z-10 text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.45em]
                  text-[#d6b56a]
                "
              >
                NestVille
              </p>

              <h1
                className="
                  mt-5
                  text-5xl
                  font-light
                  tracking-[-0.04em]
                  text-white
                  sm:text-6xl
                "
              >
                Signature
                <span className="block text-[#d6b56a]">
                  Residences
                </span>
              </h1>
            </motion.div>

            <div
              className="
                mx-auto
                mt-10
                h-px
                w-52
                overflow-hidden
                bg-white/10
              "
            >
              <motion.span
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "100%",
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  block
                  h-full
                  w-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-[#d6b56a]
                  to-transparent
                "
              />
            </div>

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
              }}
              className="
                mt-6
                text-[8px]
                uppercase
                tracking-[0.3em]
                text-white/30
              "
            >
              Curated luxury living
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}