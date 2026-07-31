"use client";

import { motion } from "framer-motion";
import {
  Car,
  Dumbbell,
  ShieldCheck,
  Trees,
  Waves,
  Wifi,
  Building2,
  Sparkles,
  Flame,
  Camera,
  Coffee,
  Baby,
} from "lucide-react";

interface Amenity {
  title: string;
  description: string;
  icon: React.ElementType;
}

const amenities: Amenity[] = [
  {
    title: "Infinity Pool",
    description: "Temperature controlled luxury swimming pool.",
    icon: Waves,
  },
  {
    title: "Private Parking",
    description: "Covered parking with EV charging stations.",
    icon: Car,
  },
  {
    title: "Fitness Center",
    description: "State-of-the-art gym & wellness zone.",
    icon: Dumbbell,
  },
  {
    title: "24×7 Security",
    description: "AI surveillance and biometric access.",
    icon: ShieldCheck,
  },
  {
    title: "Landscaped Gardens",
    description: "Beautiful green open spaces.",
    icon: Trees,
  },
  {
    title: "High Speed Wi-Fi",
    description: "Fiber internet in every residence.",
    icon: Wifi,
  },
  {
    title: "Club House",
    description: "Premium lounge & indoor recreation.",
    icon: Building2,
  },
  {
    title: "Luxury Spa",
    description: "Spa, sauna & steam rooms.",
    icon: Sparkles,
  },
  {
    title: "BBQ Area",
    description: "Outdoor entertainment spaces.",
    icon: Flame,
  },
  {
    title: "Smart CCTV",
    description: "Complete property monitoring.",
    icon: Camera,
  },
  {
    title: "Cafe Lounge",
    description: "Premium coffee & dining experience.",
    icon: Coffee,
  },
  {
    title: "Kids Zone",
    description: "Safe indoor & outdoor play area.",
    icon: Baby,
  },
];

export default function PropertyAmenities() {
  return (
    <section className="relative overflow-hidden bg-[#060606] py-28">
      <div className="absolute inset-0">
        <div className="absolute left-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-[#d4af67]/10 blur-[170px]" />

        <div className="absolute right-[-180px] bottom-0 h-[420px] w-[420px] rounded-full bg-[#d4af67]/10 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af67]">
            Luxury Amenities
          </span>

          <h2 className="mt-6 text-5xl font-light text-white">
            Everything You Need
          </h2>

          <p className="mt-6 leading-8 text-white/55">
            Carefully curated amenities that redefine luxury living
            and elevate everyday experiences.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {amenities.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                  duration: .6,
                  delay: index * .05,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-8
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-[#d4af67]/30
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-[#d4af67]/0
                    via-[#d4af67]/0
                    to-[#d4af67]/5
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                <div
                  className="
                    relative
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#d4af67]/10
                    text-[#d4af67]
                    transition-all
                    duration-500
                    group-hover:rotate-6
                    group-hover:scale-110
                  "
                >
                  <Icon size={28} />
                </div>

                <h3 className="mt-8 text-2xl font-light text-white">
                  {item.title}
                </h3>

                <p className="mt-5 leading-7 text-white/50">
                  {item.description}
                </p>

                <div
                  className="
                    mt-8
                    h-px
                    w-full
                    bg-gradient-to-r
                    from-[#d4af67]
                    to-transparent
                    opacity-40
                  "
                />

                <div className="mt-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#d4af67]" />

                  <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                    Premium Feature
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}