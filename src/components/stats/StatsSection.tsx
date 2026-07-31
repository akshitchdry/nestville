"use client";

import { motion } from "framer-motion";
import StatCounter from "./StatCounter";

const stats = [
  {
    value: 2500,
    suffix: "+",
    label: "Luxury Residences",
    description:
      "Carefully designed luxury residences delivered across premium locations worldwide.",
  },
  {
    value: 18,
    suffix: "+",
    label: "Years Experience",
    description:
      "Helping families and investors discover extraordinary homes with confidence.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description:
      "Exceptional customer experience backed by premium service and expert guidance.",
  },
  {
    value: 65,
    suffix: "+",
    label: "Global Awards",
    description:
      "International recognition for architecture, sustainability and innovation.",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d6b56a]/10 blur-[180px]" />

        <div className="absolute -left-24 bottom-0 h-[360px] w-[360px] rounded-full bg-[#d6b56a]/10 blur-[150px]" />

        <div className="absolute -right-24 top-40 h-[360px] w-[360px] rounded-full bg-[#d6b56a]/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .8,
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/10 px-5 py-2 text-[11px] uppercase tracking-[0.35em] text-[#d6b56a]">
            By The Numbers
          </span>

          <h2 className="mt-8 text-5xl font-light leading-tight text-white md:text-6xl">
            Excellence
            <span className="block text-[#d6b56a]">
              Measured in Results
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Every achievement reflects our commitment to delivering iconic
            residences, trusted partnerships and exceptional client
            experiences.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item, index) => (
            <StatCounter
              key={item.label}
              value={item.value}
              suffix={item.suffix}
              label={item.label}
              description={item.description}
              delay={index * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}