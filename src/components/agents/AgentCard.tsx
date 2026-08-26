"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
} from "lucide-react";

export interface Agent {
  id: number;
  slug: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  image: string;
  phone: string;
  email: string;
  properties: number;
  specialty: string;
}

interface AgentCardProps {
  agent: Agent;
  index?: number;
}

export default function AgentCard({
  agent,
  index = 0,
}: AgentCardProps) {
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
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -10,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-[#0a0d0b]
        shadow-[0_30px_90px_rgba(0,0,0,0.38)]
        sm:rounded-[32px]
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-20
          rounded-[inherit]
          border
          border-transparent
          transition-all
          duration-700
          group-hover:border-[#d6b56a]/20
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          z-0
          h-60
          w-60
          rounded-full
          bg-[#c8a35b]/0
          transition-all
          duration-700
          group-hover:bg-[#c8a35b]/15
        "
      />

      <div
        className="
          relative
          h-[420px]
          overflow-hidden
          sm:h-[460px]
          lg:h-[500px]
        "
      >
        <motion.div
          whileHover={{
            scale: 1.055,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0"
        >
          <Image
            src={agent.image}
            alt={`${agent.name}, ${agent.role}`}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              object-cover
              object-top
              transition-all
              duration-700
              group-hover:saturate-[1.08]
            "
          />
        </motion.div>

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#050706]
            via-[#050706]/15
            to-black/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-r
            from-black/10
            via-transparent
            to-black/15
          "
        />

        <div
          className="
            absolute
            left-5
            right-5
            top-5
            z-20
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div
            className="
              flex
              items-center
              gap-2.5
              rounded-full
              border
              border-white/10
              bg-black/35
              px-3.5
              py-2.5
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-[#d9b86d]
                shadow-[0_0_14px_rgba(217,184,109,.75)]
              "
            />

            <span
              className="
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-white/65
              "
            >
              Verified advisor
            </span>
          </div>

          <div
            className="
              rounded-full
              border
              border-[#d6b56a]/20
              bg-black/35
              px-3.5
              py-2.5
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-[#e0c078]
            "
          >
            {agent.experience}
          </div>
        </div>

        <div
          className="
            absolute
            bottom-5
            left-5
            right-5
            z-20
          "
        >
          <div
            className="
              rounded-[22px]
              border
              border-white/10
              bg-black/45
              p-5
            "
          >
            <div
              className="
                flex
                items-start
                justify-between
                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.24em]
                    text-[#d9b86d]
                  "
                >
                  {agent.role}
                </p>

                <h3
                  className="
                    mt-2
                    font-display
                    text-[30px]
                    leading-none
                    tracking-[-0.035em]
                    text-white
                    sm:text-[34px]
                  "
                >
                  {agent.name}
                </h3>

                <p
                  className="
                    mt-3
                    text-[11px]
                    uppercase
                    tracking-[0.16em]
                    text-white/42
                  "
                >
                  {agent.location}
                </p>
              </div>

              <motion.a
                href={`mailto:${agent.email}`}
                whileHover={{
                  rotate: 8,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.94,
                }}
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#d6b56a]/22
                  bg-[#d6b56a]/10
                  text-[#e6c980]
                  transition-colors
                  duration-300
                  hover:bg-[#d6b56a]
                  hover:text-[#090b09]
                "
                aria-label={`Email ${agent.name}`}
              >
                <ArrowUpRight size={17} />
              </motion.a>
            </div>

            <div
              className="
                mt-6
                grid
                grid-cols-2
                gap-4
              "
            >
              <div>
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-white/35
                  "
                >
                  Specialty
                </p>

                <p
                  className="
                    mt-2
                    text-[13px]
                    font-medium
                    text-white/88
                  "
                >
                  {agent.specialty}
                </p>
              </div>

              <div className="text-right">
                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-white/35
                  "
                >
                  Properties
                </p>

                <p
                  className="
                    mt-2
                    font-display
                    text-[28px]
                    leading-none
                    text-[#e3c47d]
                  "
                >
                  {agent.properties}
                </p>
              </div>
            </div>

            <div
              className="
                mt-7
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <motion.a
                href={`tel:${agent.phone}`}
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  group
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-[#a57b36]
                  via-[#ddb86d]
                  to-[#a57b36]
                  px-5
                  py-3.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[#090b09]
                "
              >
                <Phone size={15} />
                Call Now
              </motion.a>

              <motion.a
                href={`mailto:${agent.email}`}
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  group
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-white/12
                  bg-white/5
                  px-5
                  py-3.5
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-white/80
                "
              >
                <Mail size={15} />
                Email
              </motion.a>
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
                delay: 0.25,
              }}
              className="
                mt-7
                h-px
                origin-left
                bg-gradient-to-r
                from-transparent
                via-[#d6b56c]/55
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
                  tracking-[0.22em]
                  text-white/35
                "
              >
                NestVille Signature Advisor
              </span>

              <Link
                href={`/agents/${agent.slug}`}
                className="
                  group/profile
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-[#ddb86d]
                  transition-colors
                  hover:text-[#f0d99b]
                "
              >
                View Profile

                <ArrowUpRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover/profile:translate-x-1
                    group-hover/profile:-translate-y-1
                  "
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}