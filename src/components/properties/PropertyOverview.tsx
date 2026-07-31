"use client";

import { motion } from "framer-motion";
import {
  Bath,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  Check,
  Compass,
  Home,
  Maximize2,
  ShieldCheck,
} from "lucide-react";

interface PropertyOverviewProps {
  title: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  possession: string;
  parking: string;
  facing: string;
}

export default function PropertyOverview({
  title,
  description,
  bedrooms,
  bathrooms,
  area,
  type,
  possession,
  parking,
  facing,
}: PropertyOverviewProps) {
  const specifications = [
    {
      icon: Home,
      label: "Property Type",
      value: type,
    },
    {
      icon: BedDouble,
      label: "Bedrooms",
      value: bedrooms,
    },
    {
      icon: Bath,
      label: "Bathrooms",
      value: bathrooms,
    },
    {
      icon: Maximize2,
      label: "Area",
      value: area,
    },
    {
      icon: CalendarDays,
      label: "Possession",
      value: possession,
    },
    {
      icon: Car,
      label: "Parking",
      value: parking,
    },
    {
      icon: Compass,
      label: "Facing",
      value: facing,
    },
    {
      icon: Building2,
      label: "Construction",
      value: "Premium",
    },
  ];

  const highlights = [
    "Premium imported marble flooring",
    "Floor to ceiling glass facade",
    "Private landscaped garden",
    "Smart home automation",
    "Luxury modular kitchen",
    "Italian designer interiors",
    "High-speed elevators",
    "24×7 security surveillance",
  ];

  return (
    <section className="relative overflow-hidden bg-[#070707] py-28">
      <div className="absolute inset-0">
        <div className="absolute left-[-180px] top-20 h-[420px] w-[420px] rounded-full bg-[#d4af67]/10 blur-[170px]" />

        <div className="absolute right-[-180px] bottom-0 h-[420px] w-[420px] rounded-full bg-[#d4af67]/10 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_.7fr]">
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
              duration: .8,
            }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af67]">
              Property Overview
            </span>

            <h2 className="mt-6 text-5xl font-light text-white">
              {title}
            </h2>

            <p className="mt-8 leading-8 text-white/55">
              {description}
            </p>

            <div className="mt-14">
              <h3 className="text-2xl font-light text-white">
                Property Highlights
              </h3>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4af67]/10 text-[#d4af67]">
                      <Check size={15} />
                    </div>

                    <span className="text-white/70">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: .8,
              delay: .15,
            }}
          >
            <div
              className="
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.03]
                p-8
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={18}
                  className="text-[#d4af67]"
                />

                <span className="text-[10px] uppercase tracking-[0.35em] text-[#d4af67]">
                  Specifications
                </span>
              </div>

              <div className="mt-8 space-y-5">
                {specifications.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/25
                        px-5
                        py-4
                      "
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-[#d4af67]/10
                            text-[#d4af67]
                          "
                        >
                          <Icon size={18} />
                        </div>

                        <span className="text-white/55">
                          {item.label}
                        </span>
                      </div>

                      <span className="font-medium text-white">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}