import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import AmenitiesSection from "@/components/amenities/AmenitiesSection";
import LifestyleSection from "@/components/lifestyle/LifestyleSection";
import ConsultationSection from "@/components/consultation/ConsultationSection";

export default function AmenitiesPage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#050605]
        text-white
      "
    >
      {/* NAVBAR */}
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
        {/* LEFT GOLD GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-20
            h-[600px]
            w-[600px]
            rounded-full
            bg-[#d6b56a]/10
            blur-[190px]
          "
        />

        {/* RIGHT DARK GREEN GLOW */}
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

        {/* GRID */}
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

        <div
          className="
            relative
            z-10
            mx-auto
            w-full
            max-w-[1450px]
          "
        >
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
              Elevated Living
            </span>
          </div>

          {/* HEADING */}
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
            Designed around
            <br />

            <span className="text-[#d6b56a]">
              your lifestyle.
            </span>
          </h1>

          {/* BOTTOM INFO */}
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
                text-[14px]
                leading-8
                text-white/45
                sm:text-[15px]
              "
            >
              From wellness and recreation to private social spaces,
              every NestVille amenity is designed to make everyday
              living feel extraordinary.
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
                  Amenities
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
                  Experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES CARDS */}
      <section id="amenities">
        <AmenitiesSection />
      </section>

      {/* LIFESTYLE */}
      <LifestyleSection />

      {/* CONSULTATION */}
      <ConsultationSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}