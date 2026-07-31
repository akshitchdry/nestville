"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  CalendarDays,
  Star,
  ArrowUpRight,
} from "lucide-react";

export default function FloatingAdvisorCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 40,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        y: {
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        },
        opacity: {
          duration: .8,
        },
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-white/10
        bg-[#090909]
        p-8
        shadow-[0_35px_90px_rgba(0,0,0,.45)]
      "
    >
      <div
        className="
          absolute
          -right-20
          -top-20
          h-72
          w-72
          rounded-full
          bg-[#d6b56a]/10
          blur-[140px]
          transition-all
          duration-700
          group-hover:bg-[#d6b56a]/20
        "
      />

      <div className="relative z-10">
        <div className="flex items-center gap-5">
          <div
            className="
              relative
              h-24
              w-24
              overflow-hidden
              rounded-full
              border
              border-[#d6b56a]/30
            "
          >
            <Image
              src="/images/agents/advisor.webp"
              alt="Advisor"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#d6b56a]">
              Senior Advisor
            </span>

            <h3 className="mt-2 text-3xl font-light text-white">
              Daniel Morgan
            </h3>

            <p className="mt-2 text-white/50">
              Luxury Property Consultant
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-[#d6b56a] text-[#d6b56a]"
            />
          ))}

          <span className="ml-2 text-sm text-white/45">
            4.9 Client Rating
          </span>
        </div>

        <p className="mt-8 text-[15px] leading-8 text-white/65">
          Schedule a one-on-one consultation with our senior advisor
          to discover premium residences tailored to your lifestyle
          and investment goals.
        </p>

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
          }}
          className="
            mt-8
            h-px
            origin-left
            bg-gradient-to-r
            from-transparent
            via-[#d6b56a]
            to-transparent
          "
        />

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-4 text-white/70">
            <Phone
              size={18}
              className="text-[#d6b56a]"
            />

            +971 50 456 7890
          </div>

          <div className="flex items-center gap-4 text-white/70">
            <Mail
              size={18}
              className="text-[#d6b56a]"
            />

            advisor@nestville.com
          </div>

          <div className="flex items-center gap-4 text-white/70">
            <CalendarDays
              size={18}
              className="text-[#d6b56a]"
            />

            Mon – Sat • 9:00 AM – 7:00 PM
          </div>
        </div>

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: .97,
          }}
          className="
            mt-10
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-full
            bg-gradient-to-r
            from-[#a87c34]
            via-[#ddb86d]
            to-[#a87c34]
            py-4
            text-[11px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#050505]
          "
        >
          Schedule Consultation

          <ArrowUpRight size={18} />
        </motion.button>
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
          group-hover:border-[#d6b56a]/20
        "
      />
    </motion.div>
  );
}