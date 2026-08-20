import Navbar from "@/components/navbar/Navbar";

import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutValues from "@/components/about/AboutValues";
import AboutVision from "@/components/about/AboutVision";

import StatsSection from "@/components/stats/StatsSection";
import Testimonials from "@/components/testimonials/Testimonials";
import ConsultationSection from "@/components/consultation/ConsultationSection";
import Footer from "@/components/footer/Footer";

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <AboutHero />
      <AboutStory />

      <StatsSection />

      <AboutValues />
      <AboutVision />

      <Testimonials />

      <ConsultationSection />
      <Footer />
    </main>
  );
}