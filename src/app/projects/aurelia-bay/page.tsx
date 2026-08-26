import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectTimeline from "@/components/projects/ProjectTimeline";
import ConsultationSection from "@/components/consultation/ConsultationSection";

export default function AureliaBayPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      <section className="relative flex min-h-[72vh] items-end overflow-hidden px-6 pb-20 pt-36 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-40 top-16 h-[620px] w-[620px] rounded-full bg-[#d6b56a]/10 blur-[190px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Waterfront Development
            </span>
          </div>

          <h1 className="mt-8 max-w-6xl text-[clamp(4rem,9vw,9rem)] font-light leading-[0.84] tracking-[-0.055em]">
            Aurelia
            <span className="block text-[#d6b56a]">
              Bay.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-white/45">
            Waterfront residences shaped around privacy, natural light and
            uninterrupted views across the Arabian Gulf.
          </p>

          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Status" value="Private Release" />
            <Stat label="Residences" value="28" />
            <Stat label="Bedrooms" value="4–7" />
            <Stat label="Completion" value="2029" />
          </div>
        </div>
      </section>

      <ProjectGallery />
      <ProjectTimeline />
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

      <p className="mt-3 text-2xl font-light text-white">
        {value}
      </p>
    </div>
  );
}