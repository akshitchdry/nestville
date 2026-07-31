import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import ResidencesSection from "@/components/residences/ResidencesSection";
import FeaturedProject from "@/components/projects/FeaturedProject";
import LifestyleSection from "@/components/lifestyle/LifestyleSection";
import LocationsSection from "@/components/locations/LocationsSection";
import BuildingJourney from "@/components/building-journey/BuildingJourney";

// New Sections
import StatsSection from "@/components/stats/StatsSection";


import AmenitiesSection from "@/components/amenities/AmenitiesSection";
import Testimonials from "@/components/testimonials/Testimonials";
import AgentsSection from "@/components/agents/AgentsSection";
import JournalSection from "@/components/journal/JournalSection";
import ConsultationSection from "@/components/consultation/ConsultationSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#060806] text-white">
      <Navbar />

      <Hero />

      <StatsSection />

      

     

      <ResidencesSection />

      <FeaturedProject />

      <LifestyleSection />

      <LocationsSection />

      <AmenitiesSection />

      <BuildingJourney />

      <Testimonials />

      <AgentsSection />

      <JournalSection />

      <ConsultationSection />

      <Footer />

      <div className="site-grain" />
    </main>
  );
}
