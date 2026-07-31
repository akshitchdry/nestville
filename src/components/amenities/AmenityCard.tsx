"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface Amenity {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

interface AmenityCardProps {
  amenity: Amenity;
  index?: number;
}

export default function AmenityCard({
  amenity,
  index = 0,
}: AmenityCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 50,
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
        delay: index * 0.1,
      }}
      whileHover={{
        y: -12,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-white/10
        bg-[#090909]
      "
    >
      <div className="absolute inset-0">
        <img
          src={amenity.image}
          alt={amenity.title}
          className="
            h-full
            w-full
            object-cover
            transition-all
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/55 to-transparent" />
      </div>

      <div
        className="
          absolute
          right-[-100px]
          top-[-100px]
          h-56
          w-56
          rounded-full
          bg-[#d6b56a]/10
          blur-[120px]
          transition-all
          duration-700
          group-hover:bg-[#d6b56a]/20
        "
      />

      <div
        className="
          relative
          flex
          min-h-[520px]
          flex-col
          justify-end
          p-8
        "
      >
        <motion.div
          whileHover={{
            rotate: 10,
            scale: 1.08,
          }}
          className="
            mb-8
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            border
            border-[#d6b56a]/20
            bg-[#d6b56a]/10
            text-[#d6b56a]
            backdrop-blur-xl
          "
        >
          {amenity.icon}
        </motion.div>

        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-[#d6b56a]
          "
        >
          Premium Amenity
        </span>

        <h3
          className="
            mt-4
            text-4xl
            font-light
            text-white
          "
        >
          {amenity.title}
        </h3>

        <p
          className="
            mt-5
            max-w-md
            text-[15px]
            leading-8
            text-white/60
          "
        >
          {amenity.description}
        </p>
                <div
          className="
            mt-8
            flex
            items-center
            justify-between
            gap-5
            rounded-[22px]
            border
            border-white/10
            bg-black/35
            px-5
            py-4
            backdrop-blur-2xl
          "
        >
          <div>
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/35
              "
            >
              Curated for residents
            </p>

            <p
              className="
                mt-1
                text-sm
                font-medium
                text-white/85
              "
            >
              Discover the experience
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{
              scale: 1.08,
              rotate: 6,
            }}
            whileTap={{
              scale: 0.94,
            }}
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#d6b56a]/25
              bg-[#d6b56a]/10
              text-[#e4c77f]
              transition-colors
              duration-300
              hover:bg-[#d6b56a]
              hover:text-[#080908]
            "
            aria-label={`Explore ${amenity.title}`}
          >
            <ArrowUpRight size={18} />
          </motion.button>
        </div>

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay: 0.25 + index * 0.08,
          }}
          className="
            mt-6
            h-px
            origin-left
            bg-gradient-to-r
            from-transparent
            via-[#d6b56a]/65
            to-transparent
          "
        />

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-[8px]
              uppercase
              tracking-[0.24em]
              text-white/30
            "
          >
            NestVille Living
          </span>

          <motion.span
            initial={{
              x: 0,
            }}
            whileHover={{
              x: 5,
            }}
            className="
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[#d6b56a]
            "
          >
            Explore

            <ArrowUpRight size={13} />
          </motion.span>
        </div>
      </div>

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[inherit]
          border
          border-transparent
          transition-all
          duration-700
          group-hover:border-[#d6b56a]/25
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-10
          bottom-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#d6b56a]/0
          to-transparent
          transition-all
          duration-700
          group-hover:via-[#d6b56a]/80
        "
      />
    </motion.article>
  );
}