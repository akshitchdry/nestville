"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import JourneyScene from "./JourneyScene";
import JourneySteps from "./JourneySteps";
import { journeySteps } from "./journeyData";

export default function BuildingJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const totalScrollable =
        section.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) {
        return;
      }

      const travelled = Math.min(
        Math.max(-rect.top, 0),
        totalScrollable,
      );

      const progress = travelled / totalScrollable;

      const nextStep = Math.min(
        journeySteps.length - 1,
        Math.floor(progress * journeySteps.length),
      );

      setActiveStep(nextStep);
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="building-journey"
      className="
        relative
        min-h-[150vh]
        bg-[#070a08]
      "
    >
      <div
        className="
          sticky
          top-0
          min-h-screen
          overflow-hidden
          px-5
          py-20
          sm:px-8
          lg:px-12
          xl:px-16
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-[5%]
            top-[10%]
            h-[440px]
            w-[440px]
            rounded-full
            bg-emerald-950/20
            blur-[170px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            bottom-[5%]
            right-[3%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#c8a35b]/8
            blur-[170px]
          "
        />

        <div
          className="
            mx-auto
            flex
            min-h-[calc(100vh-160px)]
            max-w-[1600px]
            flex-col
            justify-center
          "
        >
          <div
            className="
              mb-9
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
                <span
                  className="
                    h-px
                    w-12
                    bg-[#c8a35b]/60
                  "
                />

                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.34em]
                    text-[#d6b56c]
                  "
                >
                  The making of an icon
                </p>
              </div>

              <h2
                className="
                  font-display
                  text-[clamp(3.8rem,7vw,7.5rem)]
                  leading-[0.8]
                  tracking-[-0.045em]
                  text-white
                "
              >
                From vision

                <br />

                <span className="text-gold-gradient">
                  to masterpiece.
                </span>
              </h2>
            </div>

            <div className="max-w-[410px]">
              <p
                className="
                  text-[13px]
                  leading-7
                  text-white/43
                "
              >
                Follow every defining stage behind a
                NestVille residence—from structural vision
                to the final crafted environment.
              </p>

              <div
                className="
                  mt-5
                  flex
                  items-center
                  gap-4
                "
              >
                <span
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                    text-white/25
                  "
                >
                  Journey progress
                </span>

                <div
                  className="
                    relative
                    h-px
                    flex-1
                    overflow-hidden
                    bg-white/10
                  "
                >
                  <motion.span
                    animate={{
                      width: `${journeySteps[activeStep].progress}%`,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 22,
                    }}
                    className="
                      absolute
                      inset-y-0
                      left-0
                      bg-gradient-to-r
                      from-[#9c7433]
                      to-[#e1c27a]
                    "
                  />
                </div>

                <span
                  className="
                    font-display
                    text-[22px]
                    text-[#e2c47d]
                  "
                >
                  {journeySteps[activeStep].progress}%
                </span>
              </div>
            </div>
          </div>

          <div
            className="
              grid
              gap-7
              lg:grid-cols-[1.1fr_0.9fr]
              lg:items-center
            "
          >
            <JourneyScene activeStep={activeStep} />

            <JourneySteps
              steps={journeySteps}
              activeStep={activeStep}
              onStepChange={setActiveStep}
            />
          </div>
        </div>
      </div>
    </section>
  );
}