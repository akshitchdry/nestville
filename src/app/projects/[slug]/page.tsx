import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import ProjectHero from "@/components/projects/ProjectHero";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectTimeline from "@/components/projects/ProjectTimeline";
import ConsultationSection from "@/components/consultation/ConsultationSection";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailsPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const projectTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      {/* PROJECT HERO */}
      <ProjectHero />

      {/* PROJECT TITLE / INTRO */}
      <section className="relative px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Project Detail
            </span>
          </div>

          <h1
            className="
              mt-8
              max-w-5xl
              text-[clamp(3.5rem,7vw,7rem)]
              font-light
              leading-[0.9]
              tracking-[-0.05em]
              text-white
            "
          >
            {projectTitle}
          </h1>

          <p
            className="
              mt-8
              max-w-2xl
              text-[15px]
              leading-8
              text-white/45
            "
          >
            Discover the architecture, design vision and defining details
            behind this NestVille development.
          </p>
        </div>
      </section>

      {/* PROJECT GALLERY */}
      <ProjectGallery />

      {/* PROJECT TIMELINE */}
      <ProjectTimeline />

      {/* CONSULTATION */}
      <ConsultationSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}