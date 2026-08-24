import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function LuxuryResidenceGuidePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-4xl">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#d6b56a]">
            Buying Guide
          </span>

          <h1 className="mt-6 text-5xl font-light leading-tight md:text-7xl">
            How to Choose the Perfect
            <span className="block text-[#d6b56a]">
              Luxury Residence
            </span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-white/55">
            A luxury residence should combine location, architecture,
            privacy, lifestyle amenities and long-term value.
          </p>

          <div className="mt-14 space-y-10 text-[16px] leading-8 text-white/65">
            <p>
              Start with the location. Premium neighbourhoods usually offer
              stronger connectivity, better infrastructure and more stable
              long-term demand.
            </p>

            <p>
              Next, study the architecture and floor plan. Natural light,
              privacy, usable spaces and quality materials matter more than
              visual styling alone.
            </p>

            <p>
              Amenities should support everyday living rather than simply
              increase the feature list. Wellness spaces, security, parking
              and resident services can significantly improve the ownership
              experience.
            </p>

            <p>
              Finally, consider long-term value. Developer reputation,
              maintenance quality and future development around the location
              can affect resale and investment potential.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}