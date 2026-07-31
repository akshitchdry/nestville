"use client";

import { motion } from "framer-motion";
import AgentCard, { Agent } from "./AgentCard";

const agents: Agent[] = [
  {
    id: 1,
    name: "Akshit choudhary",
    role: "Luxury Property Consultant",
    location: "Dubai Marina",
    experience: "12+ Years",
    image: "/images/agents/agent-1.webp",
    phone: "+98791670401",
    email: "daniel@nestville.com",
    properties: 148,
    specialty: "Waterfront Villas",
  },
  {
    id: 2,
    name: "Anshul malik",
    role: "Senior Investment Advisor",
    location: "Palm Jumeirah",
    experience: "9+ Years",
    image: "/images/agents/agent-2.webp",
    phone: "+971502223344",
    email: "sophia@nestville.com",
    properties: 126,
    specialty: "Luxury Apartments",
  },
  {
    id: 3,
    name: "Siya goyal",
    role: "Elite Property Specialist",
    location: "Downtown Dubai",
    experience: "14+ Years",
    image: "/images/agents/agent-3.webp",
    phone: "+971503334455",
    email: "james@nestville.com",
    properties: 192,
    specialty: "Penthouses",
  },
];

export default function AgentsSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-32 h-96 w-96 rounded-full" />

        <div className="absolute right-0 bottom-20 h-[420px] w-[420px] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/10 px-5 py-2 text-[11px] uppercase tracking-[0.35em] text-[#d6b56a]">
            Meet Our Experts
          </span>

          <h2 className="mt-8 text-5xl font-light leading-tight text-white md:text-6xl">
            Advisors Behind
            <span className="block text-[#d6b56a]">Extraordinary Homes</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Our experienced advisors combine market expertise, local knowledge
            and personalized service to help clients discover exceptional
            residences and investment opportunities.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
