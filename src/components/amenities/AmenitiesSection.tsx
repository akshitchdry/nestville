"use client";

import { motion } from "framer-motion";
import {
  Dumbbell,
  Trees,
  Waves,
  ShieldCheck,
  Car,
  Building2,
} from "lucide-react";

import AmenityCard, { Amenity } from "./AmenityCard";

const amenities: Amenity[] = [
  {
    id: 1,
    title: "Private Sky Lounge",
    description:
      "Panoramic skyline lounges crafted for relaxation, entertaining guests and unforgettable evenings above the city.",
    image: "/images/amenities/lounge.webp",
    icon: <Building2 size={28} />,
  },
  {
    id: 2,
    title: "Infinity Pool",
    description:
      "Resort-inspired infinity pool surrounded by premium landscaping and luxury leisure spaces.",
    image: "/images/amenities/pool.webp",
    icon: <Waves size={28} />,
  },
  {
    id: 3,
    title: "Luxury Fitness",
    description:
      "World-class gym equipped with premium wellness facilities and dedicated personal training areas.",
    image: "/images/amenities/gym.webp",
    icon: <Dumbbell size={28} />,
  },
  {
    id: 4,
    title: "Green Landscapes",
    description:
      "Beautiful gardens, walking trails and nature-inspired outdoor environments for peaceful living.",
    image: "/images/amenities/garden.webp",
    icon: <Trees size={28} />,
  },
  {
    id: 5,
    title: "Smart Security",
    description:
      "24×7 surveillance, biometric access and intelligent monitoring designed for complete peace of mind.",
    image: "/images/amenities/security.webp",
    icon: <ShieldCheck size={28} />,
  },
  {
    id: 6,
    title: "Private Parking",
    description:
      "Secure underground parking with EV charging stations and dedicated resident access.",
    image: "/images/amenities/parking.webp",
    icon: <Car size={28} />,
  },
];

export default function AmenitiesSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-32 h-[420px] w-[420px] rounded-full bg-[#d6b56a]/10 blur-[170px]" />

        <div className="absolute -right-28 bottom-0 h-[460px] w-[460px] rounded-full bg-[#d6b56a]/10 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/10 px-5 py-2 text-[11px] uppercase tracking-[0.35em] text-[#d6b56a]">
            Lifestyle Amenities
          </span>

          <h2 className="mt-8 text-5xl font-light leading-tight text-white md:text-6xl">
            Designed Around
            <span className="block text-[#d6b56a]">
              Elevated Living
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Every residence is complemented by carefully curated amenities
            delivering wellness, comfort, luxury and convenience every day.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {amenities.map((amenity, index) => (
            <AmenityCard
              key={amenity.id}
              amenity={amenity}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}