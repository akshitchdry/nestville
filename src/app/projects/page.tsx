import Navbar from "@/components/navbar/Navbar";
import FeaturedProject from "@/components/projects/FeaturedProject";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectTimeline from "@/components/projects/ProjectTimeline";
import Footer from "@/components/footer/Footer";

export default function ProjectsPage(){return <main className="relative overflow-hidden bg-[#050505] text-white"><Navbar/><section className="relative px-6 pb-16 pt-40 text-center"><div className="relative z-10 mx-auto max-w-4xl"><span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af67]">Landmark Developments</span><h1 className="mt-7 text-5xl font-light sm:text-6xl lg:text-7xl">Projects Shaped <span className="block text-[#d4af67]">For The Future</span></h1></div></section><FeaturedProject/><ProjectGallery/><ProjectTimeline/><Footer/></main>;}
