import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";

import ResidencesSection from "@/components/residences/ResidencesSection";
import FeaturedProject from "@/components/projects/FeaturedProject";

import LifestyleSection from "@/components/lifestyle/LifestyleSection";
import LocationsSection from "@/components/locations/LocationsSection";
import AmenitiesSection from "@/components/amenities/AmenitiesSection";

import BuildingJourney from "@/components/building-journey/BuildingJourney";

import StatsSection from "@/components/stats/StatsSection";
import Testimonials from "@/components/testimonials/Testimonials";

import AgentsSection from "@/components/agents/AgentsSection";
import JournalSection from "@/components/journal/JournalSection";

import ConsultationSection from "@/components/consultation/ConsultationSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main
      className="
        relative
        overflow-hidden
        bg-[#060806]
        text-white
      "
    >
      {/* NAVIGATION */}
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* RESIDENCES */}
      <section id="residences">
        <ResidencesSection />
      </section>

      {/* FEATURED PROJECT */}
      <section id="featured-project">
        <FeaturedProject />
      </section>

      {/* LIFESTYLE */}
      <section id="lifestyle">
        <LifestyleSection />
      </section>

      {/* LOCATIONS PREVIEW */}
      <section id="locations">
        <LocationsSection />
      </section>

      {/* AMENITIES */}
      <section id="amenities">
        <AmenitiesSection />
      </section>

      {/* BUILDING JOURNEY */}
      <section id="building-journey">
        <BuildingJourney />
      </section>

      {/* NUMBERS / STATS */}
      <StatsSection />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* AGENTS */}
      <section id="agents">
        <AgentsSection />
      </section>

      {/* JOURNAL PREVIEW */}
      <section id="journal">
        <JournalSection />
      </section>

      {/* CONSULTATION */}
      <section id="consultation">
        <ConsultationSection />
      </section>

      {/* FOOTER */}
      <Footer />

      {/* GLOBAL GRAIN EFFECT */}
      <div
        className="
          site-grain
          pointer-events-none
          fixed
          inset-0
          z-[999]
        "
        aria-hidden="true"
      />
    </main>
  );
}