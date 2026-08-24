"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ArticleCard, { Article } from "./ArticleCard";

const articles: Article[] = [
  {
    id: 1,
    title: "How to Choose the Perfect Luxury Residence",
    category: "Buying Guide",
    image: "/images/journal/article-1.webp",
    excerpt:
      "Discover the essential factors that define a truly premium residence, from architecture and location to long-term investment potential.",
    date: "18 Jul 2026",
    readTime: "5 min read",
    href: "/journal/luxury-residence-guide",
  },
  {
    id: 2,
    title: "Interior Trends Defining Modern Luxury Homes",
    category: "Interior",
    image: "/images/journal/article-2.webp",
    excerpt:
      "Explore timeless interior trends combining elegant materials, warm minimalism and sophisticated living experiences.",
    date: "24 Jul 2026",
    readTime: "7 min read",
    href: "/journal/interior-trends",
  },
  {
    id: 3,
    title: "Real Estate Investment Outlook 2026",
    category: "Investment",
    image: "/images/journal/article-3.webp",
    excerpt:
      "A comprehensive look at emerging luxury markets, future growth opportunities and investment strategies.",
    date: "28 Jul 2026",
    readTime: "6 min read",
    href: "/journal/investment-outlook",
  },
];

export default function JournalSection() {
  return (
    <section
      id="journal"
      className="relative overflow-hidden bg-[#050505] py-20 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-[450px] w-[450px] rounded-full bg-[#d6b56a]/10 blur-[180px]" />

        <div className="absolute -right-32 bottom-10 h-[450px] w-[450px] rounded-full bg-[#d6b56a]/10 blur-[180px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* HEADING */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
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
          }}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20"
        >
          <span className="inline-flex rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/10 px-5 py-2 text-[10px] uppercase tracking-[0.3em] text-[#d6b56a] sm:text-[11px] sm:tracking-[0.35em]">
            Luxury Journal
          </span>

          <h2 className="mt-7 text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
            Stories That Inspire

            <span className="block text-[#d6b56a]">
              Exceptional Living
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-white/60 sm:mt-8 sm:text-lg sm:leading-8">
            Explore expert insights, design inspiration and investment
            strategies curated for homeowners, investors and luxury lifestyle
            enthusiasts.
          </p>
        </motion.div>

        {/* ARTICLES */}

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {articles.map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              index={index}
            />
          ))}
        </div>

        {/* VIEW ALL */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="mt-14 flex justify-center sm:mt-16 lg:mt-20"
        >
          <Link
            href="/journal"
            className="
              rounded-full
              border
              border-[#d6b56a]/25
              bg-[#d6b56a]/10
              px-7
              py-4
              text-center
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-[#d6b56a]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#d6b56a]
              hover:text-[#050505]
              sm:px-8
              sm:text-[11px]
              sm:tracking-[0.25em]
            "
          >
            View All Articles
          </Link>
        </motion.div>
      </div>
    </section>
  );
}