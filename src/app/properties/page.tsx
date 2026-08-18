import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyOverview from "@/components/properties/PropertyOverview";
import PropertyAmenities from "@/components/properties/PropertyAmenities";
import PropertySidebar from "@/components/properties/PropertySidebar";
import PropertyAgent from "@/components/properties/PropertyAgent";
import PropertyMap from "@/components/properties/PropertyMap";
import SimilarProperties from "@/components/properties/SimilarProperties";

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      <section className="px-6 pb-24 pt-32">
        <div className="mx-auto max-w-7xl">
          <PropertyGallery />

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
            <div className="space-y-16">
              <PropertyAmenities />
              <PropertyAgent />
              <PropertyMap />
            </div>
            <PropertyOverview
              title="The Grand Aria"
              description="An exceptional luxury residence designed for refined living, combining timeless architecture, premium materials and modern technology."
              bedrooms={4}
              bathrooms={5}
              area="4,850 sq.ft."
              type="Luxury Villa"
              possession="Ready to Move"
              parking="3 Cars"
              facing="East"
            />

            <aside>
              <PropertySidebar price="₹8.5 Cr" title="The Grand Aria" />
            </aside>
          </div>

          <div className="mt-20">
            <SimilarProperties />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
