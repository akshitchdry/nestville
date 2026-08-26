"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ProjectCard from "./ProjectCard";
import { featuredProjects } from "./projectData";

/* =========================================
   SLIDER DATA
========================================= */

const projects = featuredProjects.map((project) => {
  const firstBedroomNumber = Number(project.bedrooms.match(/\d+/)?.[0] ?? 0);

  return {
    id: project.id,

    title: project.name,

    location: project.location,

    image: project.image,

    price: project.startingPrice,

    type: "Signature Project",

    status: project.status,

    bedrooms: firstBedroomNumber,

    slug: project.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
  };
});

export default function ProjectSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  /* =========================================
     SCROLL TO CARD
  ========================================= */

  function scrollToProject(index: number) {
    const slider = sliderRef.current;

    if (!slider) return;

    const cards = slider.querySelectorAll<HTMLElement>("[data-project-card]");

    const card = cards[index];

    if (!card) return;

    slider.scrollTo({
      left: card.offsetLeft - slider.offsetLeft,
      behavior: "smooth",
    });

    setActiveIndex(index);
  }

  /* =========================================
     PREVIOUS
  ========================================= */

  function handlePrevious() {
    const nextIndex = Math.max(0, activeIndex - 1);

    scrollToProject(nextIndex);
  }

  /* =========================================
     NEXT
  ========================================= */

  function handleNext() {
    const nextIndex = Math.min(projects.length - 1, activeIndex + 1);

    scrollToProject(nextIndex);
  }

  return (
    <section
      id="projects-list"
      className="
        relative
        overflow-hidden
        bg-[#050605]
        py-24

        sm:py-28

        lg:py-36
      "
    >
      {/* LEFT GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -left-48
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-[#d6b56a]/10
          blur-[190px]
        "
      />

      {/* RIGHT GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          -right-48
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-emerald-950/20
          blur-[190px]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1500px]
          px-6

          sm:px-8

          lg:px-12
        "
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            flex
            flex-col
            gap-8

            lg:flex-row
            lg:items-end
            lg:justify-between
          "
        >
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-[#d6b56a]
                "
              />

              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-[#d6b56a]
                "
              >
                Project Collection
              </span>
            </div>

            <h2
              className="
                mt-7
                text-[clamp(3.2rem,6vw,6.5rem)]
                font-light
                leading-[0.9]
                tracking-[-0.045em]
                text-white
              "
            >
              Landmark
              <br />
              <span
                className="
                  text-[#d6b56a]
                "
              >
                Developments.
              </span>
            </h2>
          </motion.div>

          {/* ARROWS */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <button
              type="button"
              onClick={handlePrevious}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                text-white
                transition-all
                duration-300

                hover:border-[#d6b56a]
                hover:bg-[#d6b56a]
                hover:text-black

                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={activeIndex === projects.length - 1}
              aria-label="Next project"
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                text-white
                transition-all
                duration-300

                hover:border-[#d6b56a]
                hover:bg-[#d6b56a]
                hover:text-black

                disabled:cursor-not-allowed
                disabled:opacity-30
              "
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* =====================================
            SLIDER
        ===================================== */}

        <div
          ref={sliderRef}
          className="
            mt-14
            flex
            snap-x
            snap-mandatory
            gap-7
            overflow-x-auto
            scroll-smooth
            pb-8

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-project-card
              className="
                  min-w-[88%]
                  snap-start

                  sm:min-w-[72%]

                  md:min-w-[60%]

                  lg:min-w-[46%]

                  xl:min-w-[32%]
                "
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        {/* =====================================
            BOTTOM NAVIGATION
        ===================================== */}

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-6
          "
        >
          {/* DOTS */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            {projects.map((project, index) => {
              const active = activeIndex === index;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => scrollToProject(index)}
                  aria-label={`Go to project ${index + 1}`}
                  className={`
                      h-[3px]
                      rounded-full
                      transition-all
                      duration-500

                      ${
                        active
                          ? "w-10 bg-[#d6b56a]"
                          : "w-5 bg-white/15 hover:bg-white/35"
                      }
                    `}
                />
              );
            })}
          </div>

          {/* COUNTER */}

          <div
            className="
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-white/30
            "
          >
            {String(activeIndex + 1).padStart(2, "0")}

            {" / "}

            {String(projects.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </section>
  );
}
