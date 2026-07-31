"use client";

import { motion } from "framer-motion";
import ConsultationForm from "./ConsultationForm";
import FloatingAdvisorCard from "./FloatingAdvisorCard";

export default function ConsultationSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            left-[-180px]
            top-0
            h-[520px]
            w-[520px]
            rounded-full
            bg-[#d6b56a]/10
            blur-[190px]
          "
        />

        <div
          className="
            absolute
            right-[-180px]
            bottom-[-100px]
            h-[540px]
            w-[540px]
            rounded-full
            bg-[#d6b56a]/10
            blur-[200px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.04]
            [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
            [background-size:60px_60px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
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
          }}
          transition={{
            duration: 0.8,
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span
            className="
              inline-flex
              rounded-full
              border
              border-[#d6b56a]/20
              bg-[#d6b56a]/10
              px-5
              py-2
              text-[11px]
              uppercase
              tracking-[0.35em]
              text-[#d6b56a]
            "
          >
            Private Consultation
          </span>

          <h2
            className="
              mt-8
              text-5xl
              font-light
              leading-tight
              text-white
              md:text-6xl
            "
          >
            Lets Find Your
            <span className="block text-[#d6b56a]">
              Dream Residence
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-8
              max-w-2xl
              text-lg
              leading-8
              text-white/60
            "
          >
            Speak directly with our luxury property advisors and receive a
            curated collection of residences based on your lifestyle,
            investment goals and preferred location.
          </p>
        </motion.div>

        <div
          className="
            grid
            gap-10
            xl:grid-cols-[1.25fr_.75fr]
            xl:items-start
          "
        >
          <ConsultationForm />

          <div className="sticky top-28">
            <FloatingAdvisorCard />
          </div>
        </div>
      </div>
    </section>
  );
}