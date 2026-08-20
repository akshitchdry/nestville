"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BedDouble,
  Bath,
  MapPin,
  Maximize2,
} from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    location: string;
    image: string;
    price: string;
    type?: string;
    status?: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: string;
    slug?: string;
  };
  index?: number;
}

export default function ProjectCard({
  project,
  index = 0,
}: ProjectCardProps) {
  const href = `/projects/${project.slug ?? project.id}`;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 45,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.75,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[#0b0d0b]
        transition-all
        duration-500
        hover:border-[#d6b56a]/30
      "
    >
      <div className="relative h-[380px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="
            object-cover
            transition-transform
            duration-[1400ms]
            ease-out
            group-hover:scale-[1.08]
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

        <div className="absolute left-5 top-5 flex gap-3">
          {project.type && (
            <span
              className="
                rounded-full
                border
                border-white/15
                bg-black/35
                px-4
                py-2
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/70
                backdrop-blur-xl
              "
            >
              {project.type}
            </span>
          )}

          {project.status && (
            <span
              className="
                rounded-full
                border
                border-[#d6b56a]/30
                bg-[#d6b56a]/10
                px-4
                py-2
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-[#d6b56a]
                backdrop-blur-xl
              "
            >
              {project.status}
            </span>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-white/50">
                <MapPin size={14} className="text-[#d6b56a]" />

                <span className="text-[10px] uppercase tracking-[0.18em]">
                  {project.location}
                </span>
              </div>

              <h3 className="mt-3 text-3xl font-light text-white">
                {project.title}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-[8px] uppercase tracking-[0.2em] text-white/35">
                Starting
              </span>

              <p className="mt-1 text-xl text-[#e2c47d]">
                {project.price}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {(project.bedrooms ||
          project.bathrooms ||
          project.area) && (
          <div
            className="
              grid
              grid-cols-3
              divide-x
              divide-white/10
              rounded-2xl
              border
              border-white/10
              bg-white/[0.025]
              py-4
            "
          >
            <div className="text-center">
              <BedDouble
                size={16}
                className="mx-auto text-[#d6b56a]"
              />

              <p className="mt-2 text-sm text-white">
                {project.bedrooms ?? "-"}
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/30">
                Beds
              </p>
            </div>

            <div className="text-center">
              <Bath
                size={16}
                className="mx-auto text-[#d6b56a]"
              />

              <p className="mt-2 text-sm text-white">
                {project.bathrooms ?? "-"}
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/30">
                Baths
              </p>
            </div>

            <div className="text-center">
              <Maximize2
                size={16}
                className="mx-auto text-[#d6b56a]"
              />

              <p className="mt-2 text-sm text-white">
                {project.area ?? "-"}
              </p>

              <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/30">
                Area
              </p>
            </div>
          </div>
        )}

        <Link
          href={href}
          className="
            group/link
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-white/10
            pt-5
          "
        >
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.24em]
              text-white/45
              transition-colors
              duration-300
              group-hover/link:text-[#d6b56a]
            "
          >
            View Project
          </span>

          <span
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              text-white/60
              transition-all
              duration-300
              group-hover/link:border-[#d6b56a]
              group-hover/link:bg-[#d6b56a]
              group-hover/link:text-black
            "
          >
            <ArrowUpRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover/link:translate-x-1
                group-hover/link:-translate-y-1
              "
            />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}