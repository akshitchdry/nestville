"use client";

import { motion } from "framer-motion";

import type { JourneyStep } from "./journeyData";

interface JourneyStepsProps {
  steps: JourneyStep[];
  activeStep: number;
  onStepChange: (index: number) => void;
}

export default function JourneySteps({
  steps,
  activeStep,
  onStepChange,
}: JourneyStepsProps) {
  return (
    <div className="relative">
      <div
        className="
          absolute
          bottom-6
          left-[21px]
          top-6
          w-px
          bg-white/10
        "
      />

      <motion.div
        animate={{
          height: `${(activeStep / (steps.length - 1)) * 100}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 110,
          damping: 24,
        }}
        className="
          absolute
          left-[21px]
          top-6
          w-px
          bg-gradient-to-b
          from-[#e3c47e]
          to-[#9d7534]
        "
      />

      <div className="space-y-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const active = index === activeStep;
          const completed = index < activeStep;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepChange(index)}
              className="
                group
                relative
                flex
                w-full
                items-start
                gap-5
                rounded-[20px]
                px-2
                py-5
                text-left
                transition-colors
                duration-300
                hover:bg-white/[0.025]
              "
            >
              <motion.span
                animate={{
                  scale: active ? 1.08 : 1,
                  borderColor:
                    active || completed
                      ? "rgba(216,182,110,.65)"
                      : "rgba(255,255,255,.12)",
                  backgroundColor: active
                    ? "rgba(200,163,91,.16)"
                    : "rgba(6,8,6,.8)",
                }}
                className="
                  relative
                  z-10
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  text-[#d8b66e]
                  backdrop-blur-xl
                "
              >
                <Icon size={16} strokeWidth={1.4} />
              </motion.span>

              <div className="flex-1">
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <div>
                    <p
                      className={`
                        text-[8px]
                        uppercase
                        tracking-[0.24em]
                        transition-colors
                        ${
                          active
                            ? "text-[#d8b66e]"
                            : "text-white/25"
                        }
                      `}
                    >
                      {step.number}
                    </p>

                    <h3
                      className={`
                        font-display
                        mt-1
                        text-[31px]
                        leading-none
                        transition-colors
                        ${
                          active
                            ? "text-white"
                            : "text-white/38"
                        }
                      `}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <span
                    className={`
                      hidden
                      text-[8px]
                      uppercase
                      tracking-[0.18em]
                      transition-colors
                      sm:block
                      ${
                        active
                          ? "text-[#d8b66e]"
                          : "text-white/20"
                      }
                    `}
                  >
                    {step.progress}%
                  </span>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: active ? "auto" : 0,
                    opacity: active ? 1 : 0,
                    marginTop: active ? 14 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <p
                    className="
                      text-[12px]
                      uppercase
                      tracking-[0.15em]
                      text-white/35
                    "
                  >
                    {step.subtitle}
                  </p>

                  <p
                    className="
                      mt-3
                      max-w-xl
                      text-[13px]
                      leading-6
                      text-white/45
                    "
                  >
                    {step.description}
                  </p>

                  <p
                    className="
                      mt-4
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-[#d8b66e]
                    "
                  >
                    {step.accent}
                  </p>
                </motion.div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}