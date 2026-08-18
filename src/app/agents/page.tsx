import Navbar from "@/components/navbar/Navbar";
import AgentsSection from "@/components/agents/AgentsSection";
import ConsultationSection from "@/components/consultation/ConsultationSection";
import Footer from "@/components/footer/Footer";
export default function AgentsPage(){return <main className="min-h-screen overflow-hidden bg-[#050505] text-white"><Navbar/><section className="px-6 pb-8 pt-40 text-center"><span className="text-[10px] uppercase tracking-[0.4em] text-[#d6b56a]">Property Advisors</span><h1 className="mt-7 text-5xl font-light sm:text-6xl lg:text-7xl">Expertise Behind <span className="block text-[#d6b56a]">Every Address</span></h1></section><AgentsSection/><ConsultationSection/><Footer/></main>;}
