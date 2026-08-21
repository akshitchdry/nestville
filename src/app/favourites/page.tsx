import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import SimilarProperties from "@/components/properties/SimilarProperties";
import ConsultationSection from "@/components/consultation/ConsultationSection";

export default function FavouritesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative px-6 pb-16 pt-40 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#d6b56a]/10 blur-[190px]" />

        <div className="relative z-10 mx-auto max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Saved Collection
            </span>
          </div>

          <h1 className="mt-8 text-[clamp(4rem,9vw,8rem)] font-light leading-[0.84] tracking-[-0.055em]">
            Your favourite
            <span className="block text-[#d6b56a]">residences.</span>
          </h1>

          <p className="mt-8 max-w-xl text-[15px] leading-8 text-white/45">
            Keep the properties that caught your attention in one place and
            return to them whenever you are ready.
          </p>
        </div>
      </section>

      {/* SAVED PROPERTIES */}
      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.025] p-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6b56a]">
              Your Collection
            </p>

            <h2 className="mt-5 text-4xl font-light">
              Saved properties will appear here.
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40">
              Use the heart icon on property and residence cards to add homes to
              your favourites.
            </p>
          </div>

          <div className="mt-20">
            <SimilarProperties />
          </div>
        </div>
      </section>

      <ConsultationSection />

      <Footer />
    </main>
  );
}
