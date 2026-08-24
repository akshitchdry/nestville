import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectTimeline from "@/components/projects/ProjectTimeline";
import ConsultationSection from "@/components/consultation/ConsultationSection";

export default function TheCelestiaPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative flex min-h-[72vh] items-end overflow-hidden px-6 pb-20 pt-36 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-40 top-16 h-[620px] w-[620px] rounded-full bg-[#d6b56a]/10 blur-[190px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-950/20 blur-[180px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Featured Development
            </span>
          </div>

          <h1 className="mt-8 max-w-6xl text-[clamp(4rem,9vw,9rem)] font-light leading-[0.84] tracking-[-0.055em]">
            The
            <span className="block text-[#d6b56a]">
              Celestia.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-white/45">
            A landmark residential development designed around privacy,
            architecture and elevated contemporary living.
          </p>

          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Status" value="Under Development" />
            <Stat label="Residences" value="168" />
            <Stat label="Bedrooms" value="2–5" />
            <Stat label="Completion" value="2028" />
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
              Project Overview
            </p>

            <h2 className="mt-5 text-4xl font-light leading-tight sm:text-5xl">
              Architecture with
              <span className="block text-[#d6b56a]">
                lasting presence.
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-[15px] leading-8 text-white/55">
            <p>
              The Celestia is envisioned as a refined residential destination
              where sculptural architecture, landscaped spaces and carefully
              planned interiors come together as one complete experience.
            </p>

            <p>
              Each residence is designed around natural light, privacy and
              generous proportions, while shared amenities support wellness,
              recreation and modern urban living.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <ProjectGallery />

      {/* TIMELINE */}
      <ProjectTimeline />

      {/* CONSULTATION */}
      <ConsultationSection />

      <Footer />
    </main>
  );
}

interface StatProps {
  label: string;
  value: string;
}

function Stat({
  label,
  value,
}: StatProps) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/[0.025] p-5">
      <p className="text-[8px] uppercase tracking-[0.22em] text-white/30">
        {label}
      </p>

      <p className="mt-3 text-2xl font-light text-white">
        {value}
      </p>
    </div>
  );
}