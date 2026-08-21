import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import LocationsSection from "@/components/locations/LocationsSection";
import ResidencesSection from "@/components/residences/ResidencesSection";
import ConsultationSection from "@/components/consultation/ConsultationSection";

export default function LocationsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-white">
      {/* NAVBAR */}
      <Navbar />

      {/* PAGE HERO */}
      <section className="relative flex min-h-[65vh] items-end overflow-hidden px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        {/* BACKGROUND GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[600px]
            w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#d6b56a]/10
            blur-[180px]
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Prime Locations
            </span>
          </div>

          <h1
            className="
              mt-8
              max-w-5xl
              text-[clamp(4rem,9vw,9rem)]
              font-light
              leading-[0.84]
              tracking-[-0.055em]
              text-white
            "
          >
            Exceptional
            <br />

            <span className="text-[#d6b56a]">
              addresses.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-[15px] leading-8 text-white/45">
            Explore carefully selected destinations where architecture,
            connectivity and extraordinary living come together.
          </p>
        </div>
      </section>

      {/* LOCATIONS */}
      <section id="locations">
        <LocationsSection />
      </section>

      {/* RESIDENCES */}
      <section id="residences">
        <ResidencesSection />
      </section>

      {/* CTA */}
      <ConsultationSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}