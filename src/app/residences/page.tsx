import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import ResidencesSection from "@/components/residences/ResidencesSection";
import ConsultationSection from "@/components/consultation/ConsultationSection";

export default function ResidencesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}
      <section
        className="
          relative
          flex
          min-h-[68vh]
          items-end
          overflow-hidden
          px-6
          pb-20
          pt-36
          sm:px-8
          lg:px-12
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-16
            h-[600px]
            w-[600px]
            rounded-full
            bg-[#d6b56a]/10
            blur-[190px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            bottom-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-emerald-950/20
            blur-[180px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
            [background-size:90px_90px]
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Signature Collection
            </span>
          </div>

          <h1
            className="
              mt-8
              max-w-6xl
              text-[clamp(4rem,9vw,9rem)]
              font-light
              leading-[0.84]
              tracking-[-0.055em]
              text-white
            "
          >
            Extraordinary
            <br />

            <span className="text-[#d6b56a]">
              residences.
            </span>
          </h1>

          <p
            className="
              mt-8
              max-w-xl
              text-[14px]
              leading-8
              text-white/45
              sm:text-[15px]
            "
          >
            Explore a curated portfolio of distinctive homes designed around
            privacy, architecture and exceptional everyday living.
          </p>
        </div>
      </section>

      {/* RESIDENCE COLLECTION */}
      <section id="residences">
        <ResidencesSection />
      </section>

      {/* CONSULTATION */}
      <ConsultationSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}