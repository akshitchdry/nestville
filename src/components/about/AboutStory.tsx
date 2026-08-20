"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutStory() {
  return (
    <section
      id="our-story"
      className="relative overflow-hidden bg-[#070907] py-28 lg:py-40"
    >
      <div className="pointer-events-none absolute right-[-180px] top-1/4 h-[500px] w-[500px] rounded-full bg-[#d6b56a]/10 blur-[190px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="relative h-[650px] overflow-hidden rounded-[36px]">
            <Image
              src="/images/about/about-story.webp"
              alt="NestVille architecture"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <div className="absolute -bottom-8 -right-4 hidden w-[240px] rounded-[26px] border border-white/10 bg-black/70 p-7 backdrop-blur-2xl md:block">
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
              Our Philosophy
            </p>

            <p className="mt-4 text-xl font-light leading-7 text-white">
              Details create the difference.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="lg:pl-12"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Who We Are
            </span>
          </div>

          <h2 className="mt-7 text-[clamp(3rem,5vw,5.5rem)] font-light leading-[0.92] tracking-[-0.04em] text-white">
            More than
            <br />
            <span className="text-[#d6b56a]">real estate.</span>
          </h2>

          <p className="mt-9 text-[15px] leading-8 text-white/55">
            NestVille was created around a simple idea: a home should
            offer more than beautiful spaces. It should improve the way
            people experience everyday life.
          </p>

          <p className="mt-6 text-[15px] leading-8 text-white/40">
            From carefully selected locations to architecture, landscape
            and resident experiences, every detail is considered as part
            of one complete vision.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <p className="text-4xl font-light text-[#d6b56a]">01</p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-white/40">
                Design with purpose
              </p>
            </div>

            <div>
              <p className="text-4xl font-light text-[#d6b56a]">02</p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-white/40">
                Built for longevity
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}