"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Mail,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";

interface PropertyAgentProps {
  name?: string;
  role?: string;
  image?: string;
  phone?: string;
  email?: string;
  experience?: string;
  properties?: number;
  rating?: number;
}

export default function PropertyAgent({
  name = "Sophia Williams",
  role = "Luxury Property Consultant",
  image = "/images/agents/agent-1.jpg",
  phone = "+1 (555) 123-4567",
  email = "sophia@nestville.com",
  experience = "12 Years",
  properties = 184,
  rating = 4.9,
}: PropertyAgentProps) {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute inset-0">
        <div className="absolute left-[-180px] top-0 h-[420px] w-[420px] rounded-full bg-[#d4af67]/10 blur-[170px]" />

        <div className="absolute right-[-180px] bottom-0 h-[420px] w-[420px] rounded-full bg-[#d4af67]/10 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[420px_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="relative overflow-hidden rounded-[34px]"
          >
            <Image
              src={image}
              alt={name}
              width={420}
              height={560}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

            <div className="absolute bottom-8 left-8">
              <span className="rounded-full border border-[#d4af67]/30 bg-[#d4af67]/10 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-[#d4af67]">
                Verified Agent
              </span>

              <h3 className="mt-5 text-3xl font-light text-white">
                {name}
              </h3>

              <p className="mt-2 text-white/60">
                {role}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.38em] text-[#d4af67]">
              Meet Your Advisor
            </span>

            <h2 className="mt-6 text-5xl font-light text-white">
              Dedicated Luxury Real Estate Expert
            </h2>

            <p className="mt-8 max-w-2xl leading-8 text-white/55">
              From exclusive villas to ultra-luxury penthouses,
              every property purchase deserves professional guidance.
              Our consultants help you through every step of the buying journey.
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center">
                <Award className="mx-auto text-[#d4af67]" size={28} />

                <h4 className="mt-5 text-3xl font-light text-white">
                  {experience}
                </h4>

                <p className="mt-2 text-sm text-white/45">
                  Experience
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center">
                <BadgeCheck className="mx-auto text-[#d4af67]" size={28} />

                <h4 className="mt-5 text-3xl font-light text-white">
                  {properties}+
                </h4>

                <p className="mt-2 text-sm text-white/45">
                  Properties Sold
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-center">
                <Star className="mx-auto text-[#d4af67]" size={28} />

                <h4 className="mt-5 text-3xl font-light text-white">
                  {rating}
                </h4>

                <p className="mt-2 text-sm text-white/45">
                  Client Rating
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-5">
              <Link
                href={`tel:${phone}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 transition hover:border-[#d4af67]/30"
              >
                <div className="flex items-center gap-4">
                  <Phone size={18} className="text-[#d4af67]" />

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                      Phone
                    </p>

                    <p className="mt-1 text-white">
                      {phone}
                    </p>
                  </div>
                </div>

                <ArrowUpRight size={18} className="text-white/50" />
              </Link>

              <Link
                href={`mailto:${email}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 transition hover:border-[#d4af67]/30"
              >
                <div className="flex items-center gap-4">
                  <Mail size={18} className="text-[#d4af67]" />

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/35">
                      Email
                    </p>

                    <p className="mt-1 text-white">
                      {email}
                    </p>
                  </div>
                </div>

                <ArrowUpRight size={18} className="text-white/50" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-5">
              <button
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-[#a67b34]
                  via-[#ddb86d]
                  to-[#a67b34]
                  px-8
                  py-4
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#100d08]
                "
              >
                Schedule Meeting

                <ArrowUpRight size={18} />
              </button>

              <button
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-8
                  py-4
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-white
                  transition
                  hover:border-[#d4af67]/30
                "
              >
                <MessageCircle size={18} />

                Chat Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
