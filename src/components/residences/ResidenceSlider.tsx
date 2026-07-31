"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  BedDouble,
  MapPin,
  Maximize2,
} from "lucide-react";

const residences = [
  {
    id: 1,
    title: "The Azure Residence",
    location: "Palm Jumeirah, Dubai",
    image: "/images/residences/residence-1.jpg",
    price: "$4.8M",
    bedrooms: 5,
    bathrooms: 6,
    area: "6,850 ft²",
    category: "Luxury Villa",
  },
  {
    id: 2,
    title: "Skyline Penthouse",
    location: "Downtown Dubai",
    image: "/images/residences/residence-2.jpg",
    price: "$3.2M",
    bedrooms: 4,
    bathrooms: 5,
    area: "5,200 ft²",
    category: "Penthouse",
  },
  {
    id: 3,
    title: "Emerald Mansion",
    location: "Dubai Hills Estate",
    image: "/images/residences/residence-3.jpg",
    price: "$7.1M",
    bedrooms: 7,
    bathrooms: 8,
    area: "11,000 ft²",
    category: "Private Mansion",
  },
  {
    id: 4,
    title: "Marina Crown",
    location: "Dubai Marina",
    image: "/images/residences/residence-4.jpg",
    price: "$2.9M",
    bedrooms: 4,
    bathrooms: 4,
    area: "4,750 ft²",
    category: "Waterfront Residence",
  },
  {
    id: 5,
    title: "The Royal Estate",
    location: "Emirates Hills",
    image: "/images/residences/residence-5.jpg",
    price: "$8.6M",
    bedrooms: 8,
    bathrooms: 9,
    area: "13,500 ft²",
    category: "Signature Estate",
  },
];

export default function ResidenceSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollSlider(direction: "left" | "right") {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector<HTMLElement>("[data-residence-card]");

    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 24;
    const scrollAmount = cardWidth + gap;

    slider.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });

    setActiveIndex((current) => {
      if (direction === "right") {
        return Math.min(current + 1, residences.length - 1);
      }

      return Math.max(current - 1, 0);
    });
  }

  function scrollToSlide(index: number) {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector<HTMLElement>("[data-residence-card]");

    if (!card) return;

    slider.scrollTo({
      left: index * (card.offsetWidth + 24),
      behavior: "smooth",
    });

    setActiveIndex(index);
  }

  return (
    <div className="relative w-full">
      <div
        ref={sliderRef}
        className="
          flex
          snap-x
          snap-mandatory
          gap-6
          overflow-x-auto
          scroll-smooth
          pb-6
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {residences.map((residence, index) => (
          <motion.article
            key={residence.id}
            data-residence-card
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
            }}
            className="
              group
              relative
              min-w-[88%]
              snap-start
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.04]
              sm:min-w-[70%]
              lg:min-w-[44%]
              xl:min-w-[32%]
            "
          >
            <div className="relative h-[420px] overflow-hidden">
              <Image
                src={residence.image}
                alt={residence.title}
                fill
                sizes="
                  (max-width: 640px) 88vw,
                  (max-width: 1024px) 70vw,
                  (max-width: 1280px) 44vw,
                  32vw
                "
                className="
                  object-cover
                  transition-transform
                  duration-[1400ms]
                  ease-out
                  group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute left-5 top-5">
                <span
                  className="
                    rounded-full
                    border
                    border-white/20
                    bg-black/35
                    px-4
                    py-2
                    text-[9px]
                    uppercase
                    tracking-[0.24em]
                    text-white
                    backdrop-blur-xl
                  "
                >
                  {residence.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <div className="mb-3 flex items-center gap-2 text-white/60">
                      <MapPin size={15} className="text-[#d4af67]" />

                      <span className="text-sm">
                        {residence.location}
                      </span>
                    </div>

                    <h3 className="text-3xl font-light tracking-[-0.03em] text-white">
                      {residence.title}
                    </h3>
                  </div>

                  <div className="shrink-0 text-right">
                    <span className="text-[9px] uppercase tracking-[0.24em] text-white/40">
                      Starting
                    </span>

                    <p className="mt-1 text-xl font-medium text-[#d4af67]">
                      {residence.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-white/10">
              <div className="flex items-center justify-center gap-3 border-r border-white/10 px-3 py-5">
                <BedDouble size={17} className="text-[#d4af67]" />

                <div>
                  <p className="text-sm text-white">
                    {residence.bedrooms}
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                    Beds
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 border-r border-white/10 px-3 py-5">
                <Bath size={17} className="text-[#d4af67]" />

                <div>
                  <p className="text-sm text-white">
                    {residence.bathrooms}
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                    Baths
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 px-3 py-5">
                <Maximize2 size={17} className="text-[#d4af67]" />

                <div>
                  <p className="text-sm text-white">
                    {residence.area}
                  </p>

                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/35">
                    Area
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {residences.map((residence, index) => (
            <button
              key={residence.id}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to residence ${index + 1}`}
              className={`
                h-[3px]
                rounded-full
                transition-all
                duration-500
                ${
                  activeIndex === index
                    ? "w-10 bg-[#d4af67]"
                    : "w-5 bg-white/20 hover:bg-white/40"
                }
              `}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollSlider("left")}
            disabled={activeIndex === 0}
            aria-label="Previous residence"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              text-white
              transition
              hover:border-[#d4af67]/50
              hover:bg-[#d4af67]
              hover:text-black
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => scrollSlider("right")}
            disabled={activeIndex === residences.length - 1}
            aria-label="Next residence"
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.04]
              text-white
              transition
              hover:border-[#d4af67]/50
              hover:bg-[#d4af67]
              hover:text-black
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}