import { notFound } from "next/navigation";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ConsultationSection from "@/components/consultation/ConsultationSection";

import { agents } from "@/data/agents";

interface AgentProfilePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AgentProfilePage({
  params,
}: AgentProfilePageProps) {
  const { slug } = await params;

  const agent = agents.find(
    (item) => item.slug === slug
  );

  if (!agent) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative px-6 pb-20 pt-36 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-40 top-10 h-[560px] w-[560px] rounded-full bg-[#d6b56a]/10 blur-[190px]" />

        <div className="relative z-10 mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Signature Advisor
            </p>

            <h1 className="mt-6 text-[clamp(4rem,8vw,8rem)] font-light leading-[0.86] tracking-[-0.05em]">
              {agent.name}
            </h1>

            <p className="mt-5 text-sm uppercase tracking-[0.18em] text-white/40">
              {agent.role}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Stat
              label="Experience"
              value={agent.experience}
            />

            <Stat
              label="Properties"
              value={String(agent.properties)}
            />

            <Stat
              label="Specialty"
              value={agent.specialty}
            />
          </div>
        </div>
      </section>

      {/* PROFILE */}

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[420px_1fr]">
          {/* IMAGE */}

          <div className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.02]">
            <img
              src={agent.image}
              alt={agent.name}
              className="h-full min-h-[520px] w-full object-cover object-top"
            />
          </div>

          {/* INFO */}

          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
              About
            </p>

            <h2 className="mt-5 text-4xl font-light leading-tight sm:text-5xl">
              Expert guidance,
              <span className="block text-[#d6b56a]">
                personal approach.
              </span>
            </h2>

            <p className="mt-7 max-w-3xl text-[15px] leading-8 text-white/55">
              {agent.bio}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <InfoBlock
                label="Location"
                value={agent.location}
              />

              <InfoBlock
                label="Languages"
                value={agent.languages.join(", ")}
              />

              <InfoBlock
                label="Email"
                value={agent.email}
              />

              <InfoBlock
                label="Phone"
                value={agent.phone}
              />
            </div>

            {/* ACTIONS */}

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`tel:${agent.phone}`}
                className="
                  rounded-full
                  bg-[#d6b56a]
                  px-7
                  py-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-black
                  transition-transform
                  hover:scale-[1.03]
                "
              >
                Call Advisor
              </a>

              <a
                href={`mailto:${agent.email}`}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-7
                  py-4
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white/65
                  transition-all
                  hover:border-[#d6b56a]/40
                  hover:text-[#d6b56a]
                "
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      <ConsultationSection />

      <Footer />
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.025] p-5">
      <p className="text-[8px] uppercase tracking-[0.22em] text-white/30">
        {label}
      </p>

      <p className="mt-3 text-xl font-light text-white">
        {value}
      </p>
    </div>
  );
}

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.025] p-5">
      <p className="text-[8px] uppercase tracking-[0.22em] text-white/30">
        {label}
      </p>

      <p className="mt-3 text-sm text-white/70">
        {value}
      </p>
    </div>
  );
}