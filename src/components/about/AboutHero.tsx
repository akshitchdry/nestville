"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050605]">
      <div className="absolute inset-0">
        <Image
          src="/images/about/about-hero.webp"
          alt="NestVille luxury residence"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050605] via-[#050605]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050605] via-transparent to-black/30" />
      </div>

      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-[#d6b56a]/10 blur-[180px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-end px-6 pb-20 pt-36 lg:pb-24">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-[#d6b56a]" />

            <span className="text-[10px] uppercase tracking-[0.4em] text-[#d6b56a]">
              The NestVille Story
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-5xl text-[clamp(4rem,9vw,9rem)] font-light leading-[0.82] tracking-[-0.055em] text-white"
          >
            Built around
            <br />
            <span className="text-[#d6b56a]">better living.</span>
          </motion.h1>

          <div className="mt-12 flex flex-col gap-8 border-t border-white/15 pt-8 lg:flex-row lg:items-end lg:justify-between">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="max-w-xl text-[15px] leading-8 text-white/55"
            >
              We create distinctive residences where architecture, thoughtful
              design and exceptional locations come together to shape a more
              refined way of living.
            </motion.p>

            <motion.a
              href="#our-story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="group flex items-center gap-4 self-start text-[9px] uppercase tracking-[0.25em] text-white/60"
            >
              Discover our story
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6b56a]/30 text-[#d6b56a] transition-all duration-300 group-hover:bg-[#d6b56a] group-hover:text-black">
                <ArrowDownRight size={17} />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
