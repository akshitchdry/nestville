"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
} from "framer-motion";

interface JourneySceneProps {
  activeStep: number;
}

interface JourneyVisual {
  title: string;
  phase: string;
  progress: number;
  image: string;
  position: string;
}

const journeyVisuals: JourneyVisual[] = [
  {
    title: "Foundation",
    phase: "Structural Planning",
    progress: 20,
    image: "/images/building/foundation.webp",
    position: "center center",
  },
  {
    title: "Architecture",
    phase: "Structural Framework",
    progress: 40,
    image: "/images/building/architecture.webp",
    position: "center center",
  },
  {
    title: "Interiors",
    phase: "Finishing in Progress",
    progress: 60,
    image: "/images/building/interiors.webp",
    position: "center center",
  },
  {
    title: "Amenities",
    phase: "External Development",
    progress: 80,
    image: "/images/building/amenities.webp",
    position: "center center",
  },
  {
    title: "Complete",
    phase: "Ready for You",
    progress: 100,
    image: "/images/building/complete.webp",
    position: "center center",
  },
];

const imageVariants = {
  enter: {
    opacity: 0,
    scale: 1.08,
    filter: "blur(10px)",
  },

  center: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },

  exit: {
    opacity: 0,
    scale: 0.97,
    filter: "blur(8px)",
  },
};

export default function JourneyScene({
  activeStep,
}: JourneySceneProps) {
  const safeStep = Math.min(
    Math.max(activeStep, 0),
    journeyVisuals.length - 1
  );

  const activeVisual =
    journeyVisuals[safeStep];

  return (
    <div
      className="
        relative
        min-h-[470px]
        w-full
        overflow-hidden
        rounded-[28px]
        border
        border-[#d6b56a]/15
        bg-[#080b09]
        sm:min-h-[540px]
        lg:min-h-[650px]
        lg:rounded-[34px]
      "
    >
      {/* BACKGROUND GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-[0.045]
          [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)]
          [background-size:52px_52px]
        "
      />

      {/* BACKGROUND GLOW */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.34, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#c8a35b]/15
          blur-[130px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          left-1/2
          z-0
          h-[260px]
          w-[80%]
          -translate-x-1/2
          rounded-full
          bg-emerald-950/25
          blur-[100px]
        "
      />

      {/* IMAGE FRAME */}

      <div
        className="
          absolute
          inset-4
          z-10
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.08]
          bg-[#0b0f0c]
          shadow-[0_35px_100px_rgba(0,0,0,0.6)]
          sm:inset-6
          sm:rounded-[26px]
          lg:inset-8
          lg:rounded-[30px]
        "
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeVisual.image}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={activeVisual.image}
              alt={`${activeVisual.title} construction stage`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 55vw"
              className="object-cover"
              style={{
                objectPosition:
                  activeVisual.position,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* OVERLAYS */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#050806]
            via-transparent
            to-black/25
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-r
            from-black/20
            via-transparent
            to-black/10
          "
        />

        {/* LIGHT SWEEP */}

        <motion.div
          key={`light-${safeStep}`}
          initial={{
            x: "-130%",
            opacity: 0,
          }}
          animate={{
            x: "150%",
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            z-20
            w-[32%]
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-[#f0cf85]/15
            to-transparent
            blur-xl
          "
        />

        {/* TOP STATUS */}

        <div
          className="
            absolute
            left-4
            right-4
            top-4
            z-30
            flex
            items-start
            justify-between
            gap-3
            sm:left-6
            sm:right-6
            sm:top-6
          "
        >
          <motion.div
            key={`stage-${safeStep}`}
            initial={{
              opacity: 0,
              x: -16,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              rounded-full
              border
              border-[#d6b56a]/25
              bg-black/45
              px-4
              py-2.5
              backdrop-blur-xl
            "
          >
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-[#e0c078]
              "
            >
              Stage{" "}
              {String(
                safeStep + 1
              ).padStart(2, "0")}
            </p>
          </motion.div>

          <div
            className="
              flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/10
              bg-black/45
              px-4
              py-2.5
              backdrop-blur-xl
            "
          >
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-[#dfbd6e]
                shadow-[0_0_14px_rgba(223,189,110,0.85)]
              "
            />

            <span
              className="
                hidden
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/55
                sm:block
              "
            >
              Live construction
            </span>

            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.18em]
                text-white/55
                sm:hidden
              "
            >
              Live
            </span>
          </div>
        </div>

        {/* BOTTOM INFO */}

        <motion.div
          key={`info-${safeStep}`}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            absolute
            bottom-5
            left-5
            right-5
            z-30
            rounded-[22px]
            border
            border-white/10
            bg-black/45
            p-5
            backdrop-blur-2xl
            sm:bottom-6
            sm:left-6
            sm:right-6
            lg:max-w-[520px]
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.28em]
                  text-[#ddb86d]
                "
              >
                {activeVisual.phase}
              </p>

              <h3
                className="
                  mt-2
                  font-display
                  text-[30px]
                  leading-none
                  text-white
                "
              >
                {activeVisual.title}
              </h3>
            </div>

            <div
              className="
                flex
                h-16
                w-16
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#d6b56a]/25
                bg-[#0f1311]
              "
            >
              <span
                className="
                  font-display
                  text-xl
                  text-[#e5c67f]
                "
              >
                {activeVisual.progress}%
              </span>
            </div>
          </div>

          <div
            className="
              mt-5
              h-[4px]
              overflow-hidden
              rounded-full
              bg-white/10
            "
          >
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${activeVisual.progress}%`,
              }}
              transition={{
                duration: 0.8,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-[#9c7433]
                via-[#d8b96d]
                to-[#f4deb0]
              "
            />
          </div>
        </motion.div>

        {/* FLOATING COMPLETION */}

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
          }}
          className="
            absolute
            bottom-24
            right-8
            hidden
            rounded-full
            border
            border-white/10
            bg-black/30
            px-5
            py-3
            backdrop-blur-xl
            lg:flex
            lg:flex-col
            lg:items-center
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.22em]
              text-white/40
            "
          >
            Completion
          </span>

          <span
            className="
              mt-1
              font-display
              text-[28px]
              text-[#e4c47d]
            "
          >
            {activeVisual.progress}%
          </span>
        </motion.div>
      </div>

      {/* CORNERS */}

      <div
        className="
          pointer-events-none
          absolute
          left-5
          top-5
          z-20
          h-12
          w-12
          border-l
          border-t
          border-[#d6b56a]/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          right-5
          z-20
          h-12
          w-12
          border-b
          border-r
          border-[#d6b56a]/20
        "
      />

      {/* FLOATING DOTS */}

      <motion.span
        animate={{
          y: [0, -12, 0],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-[8%]
          top-[18%]
          z-20
          h-2
          w-2
          rounded-full
          bg-[#d7b56c]
          shadow-[0_0_16px_rgba(215,181,108,.6)]
        "
      />

      <motion.span
        animate={{
          y: [0, 10, 0],
          opacity: [0.15, 0.5, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="
          pointer-events-none
          absolute
          bottom-[18%]
          right-[8%]
          z-20
          h-1.5
          w-1.5
          rounded-full
          bg-[#d7b56c]
          shadow-[0_0_12px_rgba(215,181,108,.5)]
        "
      />

      {/* LABEL */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-3
          left-1/2
          z-20
          -translate-x-1/2
          whitespace-nowrap
          text-[7px]
          uppercase
          tracking-[0.3em]
          text-white/20
          sm:text-[8px]
        "
      >
        NestVille architectural journey
      </div>
    </div>
  );
}