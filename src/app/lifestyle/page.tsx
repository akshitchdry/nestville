import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import LifestyleSection from "@/components/lifestyle/LifestyleSection";
import AmenitiesSection from "@/components/amenities/AmenitiesSection";
import ConsultationSection from "@/components/consultation/ConsultationSection";

export default function LifestylePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}
      <section
        className="
          relative
          flex
          min-h-[70vh]
          items-end
          overflow-hidden
          px-6
          pb-20
          pt-36
          sm:px-8
          lg:px-12
        "
      >
        {/* GOLD GLOW */}
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

        {/* GREEN GLOW */}
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

        {/* BACKGROUND GRID */}
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
          {/* LABEL */}
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.35em]
                text-[#d6b56a]
              "
            >
              NestVille Living
            </span>
          </div>

          {/* TITLE */}
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
            More than
            <br />

            <span className="text-[#d6b56a]">
              a residence.
            </span>
          </h1>

          {/* DESCRIPTION + STATS */}
          <div
            className="
              mt-10
              grid
              gap-8
              border-t
              border-white/10
              pt-8
              lg:grid-cols-[1fr_auto]
              lg:items-end
            "
          >
            <p
              className="
                max-w-xl
                text-[15px]
                leading-8
                text-white/45
              "
            >
              Thoughtful spaces, private experiences and carefully curated
              amenities come together to create a lifestyle built around
              comfort, wellness and exceptional everyday moments.
            </p>

            <div className="flex gap-10">
              <div>
                <p className="text-3xl font-light text-white">
                  20+
                </p>

                <p
                  className="
                    mt-2
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/30
                  "
                >
                  Experiences
                </p>
              </div>

              <div>
                <p className="text-3xl font-light text-white">
                  24/7
                </p>

                <p
                  className="
                    mt-2
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-white/30
                  "
                >
                  Luxury Living
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section id="lifestyle">
        <LifestyleSection />
      </section>

      {/* AMENITIES */}
      <section id="amenities">
        <AmenitiesSection />
      </section>

      {/* CONSULTATION */}
      <ConsultationSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}