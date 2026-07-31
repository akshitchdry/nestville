"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Construction,
  Flag,
} from "lucide-react";

interface TimelineItem {
  id: number;
  phase: string;
  title: string;
  description: string;
  date: string;
  progress: number;
  completed: boolean;
}

const timeline: TimelineItem[] = [
  {
    id: 1,
    phase: "01",
    title: "Project Launch",
    description:
      "Official launch with architectural unveiling and investor preview.",
    date: "January 2025",
    progress: 100,
    completed: true,
  },
  {
    id: 2,
    phase: "02",
    title: "Foundation & Structure",
    description:
      "Excavation, structural framework and engineering milestones.",
    date: "August 2025",
    progress: 100,
    completed: true,
  },
  {
    id: 3,
    phase: "03",
    title: "Interior Development",
    description:
      "Luxury interiors, smart-home systems and premium finishes.",
    date: "March 2026",
    progress: 72,
    completed: false,
  },
  {
    id: 4,
    phase: "04",
    title: "Final Delivery",
    description:
      "Quality inspection, landscape completion and homeowner handover.",
    date: "December 2026",
    progress: 0,
    completed: false,
  },
];

export default function ProjectTimeline() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute inset-0">
        <div className="absolute left-[-150px] top-24 h-[420px] w-[420px] rounded-full bg-[#d4af67]/10 blur-[170px]" />

        <div className="absolute right-[-160px] bottom-0 h-[420px] w-[420px] rounded-full bg-[#d4af67]/10 blur-[170px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af67]">
            Construction Timeline
          </span>

          <h2 className="mt-6 text-5xl font-light text-white">
            Development Progress
          </h2>

          <p className="mt-6 text-white/55 leading-8">
            Every milestone reflects our commitment to precision,
            craftsmanship and timely delivery.
          </p>
        </motion.div>

        <div className="relative mt-24">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#d4af67] via-white/15 to-transparent lg:block" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: index % 2 ? 50 : -50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                transition={{
                  duration: .8,
                  delay: index * .15,
                }}
                className="relative lg:pl-20"
              >
                <div className="absolute left-0 top-8 hidden lg:flex">
                  <div
                    className={`
                      flex h-12 w-12 items-center justify-center
                      rounded-full border
                      ${
                        item.completed
                          ? "border-[#d4af67] bg-[#d4af67] text-black"
                          : "border-white/20 bg-[#111]"
                      }
                    `}
                  >
                    {item.completed ? (
                      <CheckCircle2 size={20} />
                    ) : item.progress > 0 ? (
                      <Construction size={20} className="text-[#d4af67]" />
                    ) : (
                      <Flag size={18} className="text-white/60" />
                    )}
                  </div>
                </div>

                <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
                  <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.35em] text-[#d4af67]">
                        Phase {item.phase}
                      </span>

                      <h3 className="mt-3 text-3xl font-light text-white">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-5 py-3">
                      <CalendarDays
                        size={16}
                        className="text-[#d4af67]"
                      />

                      <span className="text-sm text-white/60">
                        {item.date}
                      </span>
                    </div>
                  </div>

                  <p className="mt-8 max-w-3xl leading-8 text-white/55">
                    {item.description}
                  </p>

                  <div className="mt-10">
                    <div className="mb-3 flex justify-between text-sm">
                      <span className="text-white/40">
                        Progress
                      </span>

                      <span className="text-[#d4af67]">
                        {item.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${item.progress}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: .2,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-[#a67b34] via-[#ddb86d] to-[#a67b34]"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    {item.completed ? (
                      <>
                        <CheckCircle2
                          size={18}
                          className="text-green-400"
                        />

                        <span className="text-sm text-green-400">
                          Completed
                        </span>
                      </>
                    ) : item.progress > 0 ? (
                      <>
                        <CircleDashed
                          size={18}
                          className="text-[#d4af67]"
                        />

                        <span className="text-sm text-[#d4af67]">
                          In Progress
                        </span>
                      </>
                    ) : (
                      <>
                        <Flag
                          size={18}
                          className="text-white/45"
                        />

                        <span className="text-sm text-white/45">
                          Upcoming
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}