import Navbar from "@/components/navbar/Navbar";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectSlider from "@/components/projects/ProjectSlider";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectTimeline from "@/components/projects/ProjectTimeline";
import ConsultationSection from "@/components/consultation/ConsultationSection";
import Footer from "@/components/footer/Footer";

export default function ProjectsPage() {
  return (
    <main className="relative overflow-hidden bg-[#050605] text-white">
      <Navbar />

      <ProjectHero />

      <ProjectSlider />

      <ProjectGallery />

      <ProjectTimeline />

      <ConsultationSection />

      <Footer />
    </main>
  );
}