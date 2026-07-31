"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star, ArrowUpRight } from "lucide-react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  location: string;
  rating: number;
  review: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
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
        amount: 0.25,
      }}
      transition={{
        duration: .8,
        delay: index * .12,
      }}
      whileHover={{
        y: -10,
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
      "
    >
      <div
        className="
          absolute
          -right-20
          -top-20
          h-64
          w-64
          rounded-full
          bg-[#d6b56a]/10
          blur-[130px]
          transition-all
          duration-700
          group-hover:bg-[#d6b56a]/20
        "
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {Array.from({
              length: testimonial.rating,
            }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-[#d6b56a] text-[#d6b56a]"
              />
            ))}
          </div>

          <Quote
            size={34}
            className="text-[#d6b56a]/60"
          />
        </div>

        <p
          className="
            mt-8
            text-[17px]
            leading-9
            text-white/75
          "
        >
          “{testimonial.review}”
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

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="
                relative
                h-16
                w-16
                overflow-hidden
                rounded-full
                border
                border-[#d6b56a]/25
              "
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-lg text-white">
                {testimonial.name}
              </h3>

              <p className="mt-1 text-sm text-white/45">
                {testimonial.role}
              </p>

              <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-[#d6b56a]">
                {testimonial.location}
              </span>
            </div>
          </div>

          <motion.div
            whileHover={{
              rotate: 10,
              scale: 1.1,
            }}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              border
              border-[#d6b56a]/20
              bg-[#d6b56a]/10
              text-[#d6b56a]
            "
          >
            <ArrowUpRight size={18} />
          </motion.div>
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
    </motion.article>
  );
}