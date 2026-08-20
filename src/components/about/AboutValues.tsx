"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Gem,
  Leaf,
  ShieldCheck,
} from "lucide-react";

const values = [
  {
    number: "01",
    icon: Building2,
    title: "Thoughtful Architecture",
    description:
      "Architecture shaped around people, natural light, privacy and a timeless sense of place.",
  },
  {
    number: "02",
    icon: Gem,
    title: "Refined Quality",
    description:
      "Materials, finishes and details selected to create residences that feel exceptional for years.",
  },
  {
    number: "03",
    icon: Leaf,
    title: "Better Living",
    description:
      "Landscapes and amenities designed to bring wellness, calm and connection into everyday life.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Enduring Trust",
    description:
      "Clear communication, thoughtful decisions and long-term relationships guide everything we do.",
  },
];

export default function AboutValues() {
  return (
    <section className="relative overflow-hidden bg-[#050605] py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#d6b56a]" />

              <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
                Our Values
              </span>
            </div>

            <h2 className="mt-7 text-[clamp(3.2rem,6vw,6.5rem)] font-light leading-[0.88] tracking-[-0.045em] text-white">
              What defines
              <br />
              <span className="text-[#d6b56a]">NestVille.</span>
            </h2>
          </div>

          <p className="max-w-md text-[14px] leading-8 text-white/45">
            Four principles guide the way we select locations, design
            spaces and create lasting residential experiences.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                className="
                  group
                  relative
                  min-h-[360px]
                  border-b
                  border-white/10
                  p-8
                  transition-colors
                  duration-500
                  hover:bg-white/[0.025]
                  md:p-12
                  md:odd:border-r
                "
              >
                <div className="flex items-start justify-between">
                  <span className="text-[9px] tracking-[0.25em] text-white/25">
                    {value.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/5 text-[#d6b56a] transition-all duration-500 group-hover:bg-[#d6b56a] group-hover:text-black">
                    <Icon size={21} strokeWidth={1.3} />
                  </div>
                </div>

                <div className="mt-20">
                  <h3 className="text-3xl font-light text-white">
                    {value.title}
                  </h3>

                  <p className="mt-5 max-w-md text-[14px] leading-7 text-white/45">
                    {value.description}
                  </p>
                </div>

                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#d6b56a] transition-all duration-700 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}