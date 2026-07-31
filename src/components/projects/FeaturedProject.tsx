"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  MapPin,
} from "lucide-react";

import { featuredProjects } from "./projectData";

export default function FeaturedProject() {
  const project = featuredProjects[0];

  return (
    <section
      id="projects"
      className="
        relative
        overflow-hidden
        bg-[#080b09]
        px-5
        py-28
        sm:px-8
        lg:px-12
        xl:px-16
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          left-[6%]
          top-[8%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-emerald-950/20
          blur-[170px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[4%]
          right-[4%]
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#c8a35b]/10
          blur-[160px]
        "
      />

      <div
        className="
          mx-auto
          max-w-[1600px]
        "
      >
        <div
          className="
            mb-10
            flex
            flex-col
            gap-6
            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
          <div>
            <div
              className="
                mb-5
                flex
                items-center
                gap-4
              "
            >
              <span className="h-px w-12 bg-[#c8a35b]/60" />

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.34em]
                  text-[#d6b56c]
                "
              >
                Featured development
              </p>
            </div>

            <h2
              className="
                font-display
                text-[clamp(3.8rem,7vw,7.6rem)]
                leading-[0.8]
                tracking-[-0.045em]
                text-white
              "
            >
              An icon in

              <br />

              <span className="text-gold-gradient">
                the making.
              </span>
            </h2>
          </div>

          <p
            className="
              max-w-[430px]
              text-[13px]
              leading-7
              text-white/43
            "
          >
            Discover a landmark residence where architecture,
            privacy and elevated lifestyle come together in one
            exceptional address.
          </p>
        </div>

        <motion.article
          initial={{
            opacity: 0,
            y: 60,
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
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            group
            relative
            min-h-[720px]
            overflow-hidden
            rounded-[34px]
            border
            border-white/[0.08]
            bg-[#0a0e0b]
          "
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority={false}
            sizes="100vw"
            className="
              object-cover
              transition-transform
              duration-[1600ms]
              ease-out
              group-hover:scale-[1.045]
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-[#030503]/95
              via-[#030503]/60
              to-[#030503]/15
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-[#030503]/85
              via-transparent
              to-[#030503]/25
            "
          />

          <div
            className="
              relative
              z-10
              flex
              min-h-[720px]
              flex-col
              justify-between
              p-6
              sm:p-9
              lg:p-12
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/12
                  bg-black/25
                  px-4
                  py-2
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-white/65
                  backdrop-blur-xl
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[#d8ba75]
                    shadow-[0_0_14px_rgba(216,186,117,.7)]
                  "
                />

                {project.status}
              </div>

              <div
                className="
                  hidden
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/12
                  bg-black/25
                  px-4
                  py-2
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-white/50
                  backdrop-blur-xl
                  sm:flex
                "
              >
                <MapPin size={13} className="text-[#d8ba75]" />

                {project.location}
              </div>
            </div>

            <div
              className="
                max-w-[760px]
              "
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.28em]
                  text-[#d6b56c]
                "
              >
                Introducing
              </p>

              <h3
                className="
                  font-display
                  mt-4
                  text-[clamp(4rem,8vw,8.5rem)]
                  leading-[0.74]
                  tracking-[-0.05em]
                  text-white
                "
              >
                The

                <br />

                Celestia.
              </h3>

              <p
                className="
                  mt-7
                  max-w-[560px]
                  text-[13px]
                  leading-7
                  text-white/55
                  sm:text-[14px]
                "
              >
                {project.description}
              </p>

              <div
                className="
                  mt-8
                  grid
                  max-w-[760px]
                  grid-cols-2
                  gap-3
                  lg:grid-cols-4
                "
              >
                <ProjectStat
                  label="Residences"
                  value={project.residences}
                  icon={<Building2 size={15} />}
                />

                <ProjectStat
                  label="Bedrooms"
                  value={project.bedrooms}
                  icon={<Building2 size={15} />}
                />

                <ProjectStat
                  label="Completion"
                  value={project.completion}
                  icon={<CalendarDays size={15} />}
                />

                <ProjectStat
                  label="Starting from"
                  value={project.startingPrice}
                  icon={<ArrowUpRight size={15} />}
                />
              </div>

              <Link
                href="/projects/the-celestia"
                className="
                  group/link
                  mt-8
                  inline-flex
                  min-h-12
                  items-center
                  gap-4
                  rounded-full
                  border
                  border-[#c8a35b]/30
                  bg-black/25
                  px-6
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-[#e0c27c]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:bg-[#c8a35b]
                  hover:text-black
                "
              >
                View project

                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover/link:translate-x-1
                    group-hover/link:-translate-y-1
                  "
                />
              </Link>
            </div>
          </div>

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.05]
              [background-image:linear-gradient(rgba(255,255,255,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.22)_1px,transparent_1px)]
              [background-size:90px_90px]
              [mask-image:linear-gradient(to_bottom,transparent,black)]
            "
          />
        </motion.article>
      </div>
    </section>
  );
}

interface ProjectStatProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

function ProjectStat({
  label,
  value,
  icon,
}: ProjectStatProps) {
  return (
    <div
      className="
        rounded-[18px]
        border
        border-white/[0.08]
        bg-black/25
        p-4
        backdrop-blur-xl
      "
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-[#c8a35b]/20
            text-[#d8ba75]
          "
        >
          {icon}
        </span>

        <span
          className="
            text-[7px]
            uppercase
            tracking-[0.18em]
            text-white/25
          "
        >
          {label}
        </span>
      </div>

      <p
        className="
          font-display
          mt-4
          text-[28px]
          text-white
        "
      >
        {value}
      </p>
    </div>
  );
}