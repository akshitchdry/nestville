"use client";

import { useRef } from "react";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { ArrowRight } from "lucide-react";

import ResidenceCard from "./ResidenceCard";
import { residences } from "@/data/residences";

gsap.registerPlugin(ScrollTrigger);

export default function ResidencesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;

      if (!section || !track) return;

      const getScrollDistance = () => {
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      const horizontalScroll = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            if (!progress) return;

            gsap.set(progress, {
              scaleX: self.progress,
              transformOrigin: "left center",
            });
          },
        },
      });

      const refreshScroll = () => {
        ScrollTrigger.refresh();
      };

      const refreshTimeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      window.addEventListener("resize", refreshScroll);

      return () => {
        window.clearTimeout(refreshTimeout);
        window.removeEventListener("resize", refreshScroll);

        horizontalScroll.scrollTrigger?.kill();
        horizontalScroll.kill();
      };
    },
    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="residences"
      className="
        relative
        h-screen
        min-h-[720px]
        overflow-hidden
        bg-[#060806]
      "
    >
      {/* Background glow */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-0
          h-[620px]
          w-[620px]
          rounded-full
          bg-emerald-950/20
          blur-[210px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-[520px]
          w-[520px]
          rounded-full
          bg-[#c8a35b]/10
          blur-[200px]
        "
      />

      {/* Grid texture */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          [background-image:linear-gradient(rgba(255,255,255,.25)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.25)_1px,transparent_1px)]
          [background-size:110px_110px]
        "
      />

      {/* Main sticky screen */}

      <div
        className="
          relative
          z-10
          flex
          h-full
          min-h-0
          flex-col
        "
      >
        {/* Heading area */}

        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1700px]
            shrink-0
            flex-col
            gap-5
            px-5
            pb-5
            pt-6
            sm:px-8
            sm:pt-8
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:px-12
            lg:pb-6
            lg:pt-8
            xl:px-16
          "
        >
          <div>
            <div className="mb-3 flex items-center gap-4">
              <span className="h-px w-12 bg-[#c8a35b]/60" />

              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-[#d5b365]
                "
              >
                Signature collection
              </p>
            </div>

            <h2
              className="
                font-display
                text-[clamp(3rem,5.6vw,6.2rem)]
                leading-[0.78]
                tracking-[-0.05em]
                text-white
              "
            >
              Extraordinary

              <br />

              <span className="text-gold-gradient">
                Residences.
              </span>
            </h2>
          </div>

          <div
            className="
              hidden
              max-w-[430px]
              pb-1
              lg:block
            "
          >
            <p
              className="
                text-[13px]
                leading-7
                text-white/45
              "
            >
              A curated collection of distinctive homes in the
              world&apos;s most desirable locations, designed around
              privacy, architecture and exceptional living.
            </p>

            <Link
              href="/properties"
              className="
                group
                mt-4
                inline-flex
                items-center
                gap-4
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-[#d8bb75]
              "
            >
              Explore all residences

              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c8a35b]/25
                  transition-all
                  duration-300
                  group-hover:border-[#c8a35b]
                  group-hover:bg-[#c8a35b]
                  group-hover:text-black
                "
              >
                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </span>
            </Link>
          </div>
        </div>

                <div
          className="
            relative
            flex
            min-h-0
            flex-1
            items-center
            overflow-hidden
          "
        >
          <div
            ref={trackRef}
            className="
              flex
              w-max
              items-center
              gap-7
              pl-5
              pr-[50vw]
              sm:gap-8
              sm:pl-8
              lg:gap-10
              lg:pl-12
              xl:pl-16
            "
          >
            {/* Scroll intro */}

            <div
              className="
                hidden
                h-[calc(100vh-280px)]
                min-h-[430px]
                max-h-[620px]
                w-[150px]
                shrink-0
                flex-col
                justify-between
                border-l
                border-white/10
                py-5
                pl-5
                xl:flex
              "
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-white/30
                  [writing-mode:vertical-rl]
                "
              >
                Scroll to discover
              </p>

              <span
                className="
                  font-display
                  text-[52px]
                  text-white/10
                "
              >
                01
              </span>
            </div>

            {/* Residence cards */}

            {residences.map((residence, index) => (
              <div
                key={residence.id}
                className="
                  h-[calc(100vh-280px)]
                  min-h-[430px]
                  max-h-[620px]
                  w-[88vw]
                  shrink-0

                  sm:w-[74vw]

                  md:w-[58vw]

                  lg:w-[500px]

                  xl:w-[540px]

                  2xl:w-[570px]
                "
              >
                <ResidenceCard
                  residence={residence}
                  index={index}
                />
              </div>
            ))}

            {/* Final card */}

            <div
              className="
                flex
                h-[calc(100vh-280px)]
                min-h-[430px]
                max-h-[620px]
                w-[86vw]
                shrink-0
                flex-col
                items-center
                justify-center
                rounded-[32px]
                border
                border-[#c8a35b]/20
                bg-[#0b0f0c]
                px-8
                text-center

                sm:w-[68vw]

                md:w-[50vw]

                lg:w-[400px]
              "
            >
              <p
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.28em]
                  text-[#d5b365]
                "
              >
                Continue exploring
              </p>

              <h3
                className="
                  mt-5
                  font-display
                  text-[clamp(2.8rem,4vw,4.5rem)]
                  leading-[0.86]
                  tracking-[-0.04em]
                  text-white
                "
              >
                Find your
                <br />
                next address.
              </h3>

              <p
                className="
                  mt-6
                  max-w-[270px]
                  text-[13px]
                  leading-7
                  text-white/40
                "
              >
                Explore a carefully selected portfolio of
                remarkable residences in exceptional locations.
              </p>

              <Link
                href="/properties"
                aria-label="Explore all properties"
                className="
                  group
                  mt-8
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c8a35b]/30
                  text-[#d8bb75]
                  transition-all
                  duration-500
                  hover:scale-110
                  hover:border-[#c8a35b]
                  hover:bg-[#c8a35b]
                  hover:text-black
                "
              >
                <ArrowRight
                  size={20}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>
        </div>
                {/* Progress */}

        <div
          className="
            mx-auto
            mt-6
            flex
            w-full
            max-w-[1700px]
            items-center
            gap-5
            px-5
            pb-6
            sm:px-8
            lg:px-12
            xl:px-16
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/25
            "
          >
            01
          </span>

          <div
            className="
              relative
              h-[2px]
              flex-1
              overflow-hidden
              rounded-full
              bg-white/10
            "
          >
            <span
              ref={progressRef}
              className="
                absolute
                inset-y-0
                left-0
                w-full
                origin-left
                scale-x-0
                rounded-full
                bg-gradient-to-r
                from-[#c8a35b]
                via-[#e3c16f]
                to-[#c8a35b]
              "
            />
          </div>

          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/25
            "
          >
            {String(residences.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}