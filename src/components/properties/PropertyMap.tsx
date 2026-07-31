"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Car,
  Coffee,
  Hospital,
  MapPin,
  Plane,
  School,
  ShoppingBag,
  Train,
} from "lucide-react";

interface NearbyPlace {
  icon: React.ElementType;
  title: string;
  distance: string;
}

const nearbyPlaces: NearbyPlace[] = [
  {
    icon: Train,
    title: "Metro Station",
    distance: "550 m",
  },
  {
    icon: School,
    title: "International School",
    distance: "1.2 km",
  },
  {
    icon: Hospital,
    title: "City Hospital",
    distance: "2.4 km",
  },
  {
    icon: ShoppingBag,
    title: "Luxury Mall",
    distance: "1.8 km",
  },
  {
    icon: Coffee,
    title: "Cafe & Restaurants",
    distance: "650 m",
  },
  {
    icon: Plane,
    title: "International Airport",
    distance: "18 km",
  },
  {
    icon: Building2,
    title: "Business District",
    distance: "4.2 km",
  },
  {
    icon: Car,
    title: "Express Highway",
    distance: "800 m",
  },
];

export default function PropertyMap() {
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
          <span className="text-[10px] uppercase tracking-[0.38em] text-[#d4af67]">
            Prime Location
          </span>

          <h2 className="mt-6 text-5xl font-light text-white">
            Connected To Everything
          </h2>

          <p className="mt-6 leading-8 text-white/55">
            Strategically located with seamless access to
            schools, hospitals, shopping destinations,
            transport hubs and business districts.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1.4fr_.6fr]">
          <motion.div
            initial={{
              opacity: 0,
              x: -40,
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
            }}
            className="
              relative
              h-[650px]
              overflow-hidden
              rounded-[34px]
              border
              border-white/10
              bg-[#111]
            "
          >
            <iframe
              title="Property Location"
              src="https://www.google.com/maps?q=Dubai&output=embed"
              className="absolute inset-0 h-full w-full grayscale contrast-125"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-black/20" />

            <div
              className="
                absolute
                left-8
                top-8
                rounded-2xl
                border
                border-white/10
                bg-black/60
                px-6
                py-5
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-3">
                <MapPin
                  size={18}
                  className="text-[#d4af67]"
                />

                <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af67]">
                  NestVille Residence
                </span>
              </div>

              <p className="mt-3 max-w-xs text-white/60">
                Palm Jumeirah, Dubai, UAE
              </p>
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
            className="space-y-5"
          >
            {nearbyPlaces.map((place) => {
              const Icon = place.icon;

              return (
                <div
                  key={place.title}
                  className="
                    group
                    flex
                    items-center
                    justify-between
                    rounded-[24px]
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                    transition-all
                    duration-300
                    hover:border-[#d4af67]/30
                  "
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#d4af67]/10
                        text-[#d4af67]
                      "
                    >
                      <Icon size={24} />
                    </div>

                    <div>
                      <h3 className="text-white">
                        {place.title}
                      </h3>

                      <p className="mt-1 text-sm text-white/45">
                        Nearby Landmark
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="block text-lg font-light text-white">
                      {place.distance}
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="ml-auto mt-2 text-[#d4af67]"
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}