"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
} from "lucide-react";
import Image from "next/image";

const properties = [
  {
    id: 1,
    image: "/images/properties/property-1.jpg",
    title: "Royal Palm Villa",
    location: "Palm Jumeirah",
    price: "$4.8M",
    beds: 5,
    baths: 6,
    area: "6850 ft²",
  },
  {
    id: 2,
    image: "/images/properties/property-2.jpg",
    title: "Skyline Penthouse",
    location: "Downtown Dubai",
    price: "$3.2M",
    beds: 4,
    baths: 5,
    area: "5200 ft²",
  },
  {
    id: 3,
    image: "/images/properties/property-3.jpg",
    title: "Emerald Mansion",
    location: "Dubai Hills",
    price: "$7.1M",
    beds: 7,
    baths: 8,
    area: "11000 ft²",
  },
];
export default function SimilarProperties() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute inset-0">
        <div className="absolute left-[-150px] top-10 h-[450px] w-[450px] rounded-full bg-[#d4af67]/10 blur-[180px]" />
        <div className="absolute right-[-180px] bottom-0 h-[450px] w-[450px] rounded-full bg-[#d4af67]/10 blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <motion.div
          initial={{opacity:0,y:30}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true}}
          transition={{duration:.8}}
          className="flex items-end justify-between"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af67]">
              Recommended
            </span>

            <h2 className="mt-5 text-5xl font-light text-white">
              Similar Properties
            </h2>

            <p className="mt-5 max-w-2xl text-white/55 leading-8">
              Explore luxury residences matching your
              preferences and investment goals.
            </p>
          </div>

          <Link
            href="/properties"
            className="hidden lg:flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-7 py-4 text-[11px] uppercase tracking-[0.22em] text-white hover:border-[#d4af67]/40"
          >
            View All
            <ArrowRight size={17}/>
          </Link>

        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {properties.map((property,index)=>(

            <motion.div
              key={property.id}
              initial={{
                opacity:0,
                y:45
              }}
              whileInView={{
                opacity:1,
                y:0
              }}
              viewport={{
                once:true
              }}
              transition={{
                duration:.7,
                delay:index*.08
              }}
              whileHover={{
                y:-8
              }}
              className="
              group
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.03]
              "
            >

              <div className="relative h-[290px] overflow-hidden">

                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition duration-[1200ms] group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"/>

                <span className="absolute left-5 top-5 rounded-full bg-[#d4af67] px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-black">
                  Luxury
                </span>

              </div>

              <div className="p-7">

                <div className="flex items-center gap-2 text-[#d4af67]">

                  <Building2 size={15}/>

                  <span className="text-[10px] uppercase tracking-[0.25em]">
                    Premium Residence
                  </span>

                </div>

                <h3 className="mt-5 text-2xl font-light text-white">
                  {property.title}
                </h3>

                <div className="mt-4 flex items-center gap-3 text-white/50">

                  <MapPin size={16}/>

                  {property.location}

                </div>

                <div className="mt-7 grid grid-cols-3 rounded-2xl border border-white/10 bg-black/20 py-5">

                  <div className="text-center">

                    <BedDouble
                      size={17}
                      className="mx-auto text-[#d4af67]"
                    />

                    <p className="mt-3 text-white">
                      {property.beds}
                    </p>

                  </div>

                  <div className="text-center">

                    <Bath
                      size={17}
                      className="mx-auto text-[#d4af67]"
                    />

                    <p className="mt-3 text-white">
                      {property.baths}
                    </p>

                  </div>

                  <div className="text-center">

                    <Maximize2
                      size={17}
                      className="mx-auto text-[#d4af67]"
                    />

                    <p className="mt-3 text-white text-sm">
                      {property.area}
                    </p>

                  </div>

                </div>

                <div className="mt-8 flex items-center justify-between">

                  <div>

                    <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                      Starting Price
                    </span>

                    <h4 className="mt-2 text-3xl font-light text-white">
                      {property.price}
                    </h4>

                  </div>

                  <Link
                    href={`/properties/${property.id}`}
                    className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[#d4af67]
                    text-black
                    transition
                    group-hover:rotate-45
                    "
                  >
                    <ArrowRight size={20}/>
                  </Link>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}