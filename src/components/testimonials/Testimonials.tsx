"use client";

import { motion } from "framer-motion";
import TestimonialCard, { Testimonial } from "./TestimonialCard";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Olivia Thompson",
    role: "Entrepreneur",
    location: "Palm Jumeirah",
    image: "/images/testimonials/client-1.webp",
    rating: 5,
    review:
      "NestVille made the entire buying experience effortless. Every detail was handled professionally and the property exceeded our expectations.",
  },
  {
    id: 2,
    name: "Michael Anderson",
    role: "Business Investor",
    location: "Downtown Dubai",
    image: "/images/testimonials/client-2.webp",
    rating: 5,
    review:
      "Their advisors understood exactly what we were looking for and introduced investment opportunities we would never have discovered ourselves.",
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "Interior Designer",
    location: "Dubai Marina",
    image: "/images/testimonials/client-3.webp",
    rating: 5,
    review:
      "The quality of service, transparency and attention to detail truly define luxury. I highly recommend NestVille to anyone seeking premium residences.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-24 h-[420px] w-[420px] rounded-full bg-[#d6b56a]/10 blur-[170px]" />

        <div className="absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full bg-[#d6b56a]/10 blur-[170px]" />
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
            duration: 0.8,
          }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/10 px-5 py-2 text-[11px] uppercase tracking-[0.35em] text-[#d6b56a]">
            Client Stories
          </span>

          <h2 className="mt-8 text-5xl font-light leading-tight text-white md:text-6xl">
            Trusted By
            <span className="block text-[#d6b56a]">Homeowners Worldwide</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Every successful transaction reflects our commitment to delivering
            exceptional homes, seamless experiences and long-term relationships
            with our clients.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
