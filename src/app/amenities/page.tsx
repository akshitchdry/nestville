import Navbar from "@/components/navbar/Navbar";
import AmenitiesSection from "@/components/amenities/AmenitiesSection";
import Footer from "@/components/footer/Footer";
export default function AmenitiesPage(){return <main className="min-h-screen overflow-hidden bg-[#050505] text-white"><Navbar/><section className="px-6 pb-8 pt-40 text-center"><span className="text-[10px] uppercase tracking-[0.4em] text-[#d6b56a]">Elevated Living</span><h1 className="mt-7 text-5xl font-light sm:text-6xl lg:text-7xl">Amenities Designed <span className="block text-[#d6b56a]">Around You</span></h1></section><AmenitiesSection/><Footer/></main>;}
