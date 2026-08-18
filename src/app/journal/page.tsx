import Navbar from "@/components/navbar/Navbar";
import JournalSection from "@/components/journal/JournalSection";
import Footer from "@/components/footer/Footer";
export default function JournalPage(){return <main className="min-h-screen overflow-hidden bg-[#050505] text-white"><Navbar/><section className="px-6 pb-8 pt-40 text-center"><span className="text-[10px] uppercase tracking-[0.4em] text-[#d6b56a]">NestVille Journal</span><h1 className="mt-7 text-5xl font-light sm:text-6xl lg:text-7xl">Ideas For <span className="block text-[#d6b56a]">Exceptional Living</span></h1></section><JournalSection/><Footer/></main>;}
