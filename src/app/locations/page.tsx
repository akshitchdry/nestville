import Navbar from "@/components/navbar/Navbar";
import LocationsSection from "@/components/locations/LocationsSection";
import Footer from "@/components/footer/Footer";
export default function LocationsPage(){return <main className="min-h-screen overflow-hidden bg-[#060806] text-white"><Navbar/><section className="px-6 pb-10 pt-40 text-center"><span className="text-[10px] uppercase tracking-[0.4em] text-[#d4af67]">Prime Addresses</span><h1 className="mt-7 text-5xl font-light sm:text-6xl lg:text-7xl">Locations That <span className="block text-[#d4af67]">Define Lifestyle</span></h1></section><LocationsSection/><Footer/></main>;}
