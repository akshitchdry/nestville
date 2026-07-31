"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

export interface Article {
  id: number;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
  readTime: string;
  href: string;
}

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export default function ArticleCard({
  article,
  index = 0,
}: ArticleCardProps) {
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
        amount: .2,
      }}
      transition={{
        duration: .8,
        delay: index * .1,
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
      "
    >
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/20" />

        <div className="absolute left-6 top-6">
          <span
            className="
              rounded-full
              border
              border-[#d6b56a]/20
              bg-black/40
              px-4
              py-2
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-[#d6b56a]
              backdrop-blur-xl
            "
          >
            {article.category}
          </span>
        </div>
      </div>

      <div className="relative p-8">
        <div className="flex items-center gap-6 text-sm text-white/45">
          <div className="flex items-center gap-2">
            <CalendarDays size={15} />
            {article.date}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={15} />
            {article.readTime}
          </div>
        </div>

        <h3
          className="
            mt-6
            text-3xl
            font-light
            leading-tight
            text-white
            transition-colors
            duration-300
            group-hover:text-[#d6b56a]
          "
        >
          {article.title}
        </h3>

        <p
          className="
            mt-5
            text-[15px]
            leading-8
            text-white/60
          "
        >
          {article.excerpt}
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

        <Link
          href={article.href}
          className="
            mt-7
            inline-flex
            items-center
            gap-3
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-[#d6b56a]
          "
        >
          Read Article

          <motion.span
            whileHover={{
              x: 4,
              y: -2,
            }}
          >
            <ArrowUpRight size={16} />
          </motion.span>
        </Link>
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
    </motion.article>
  );
}