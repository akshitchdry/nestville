import Navbar from "@/components/navbar/Navbar";
import PropertyFilters from "@/components/properties/PropertyFilters";
import PropertyGrid from "@/components/properties/PropertyGrid";
import Footer from "@/components/footer/Footer";

export default function PropertiesPage(){return <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white"><Navbar/><section className="relative px-6 pb-16 pt-40 text-center"><div className="pointer-events-none absolute left-1/2 top-16 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#d4af67]/10 blur-[190px]"/><div className="relative z-10 mx-auto max-w-4xl"><span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af67]">Signature Collection</span><h1 className="mt-7 text-5xl font-light sm:text-6xl lg:text-7xl">Exceptional <span className="block text-[#d4af67]">Properties</span></h1><p className="mx-auto mt-7 max-w-2xl leading-8 text-white/50">Discover villas, penthouses, apartments and landmark residences curated for exceptional living.</p></div></section><PropertyFilters/><PropertyGrid/><Footer/></main>;}
