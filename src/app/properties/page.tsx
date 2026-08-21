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
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* NAVBAR */}
      <Navbar />

      {/* PROPERTY DETAILS */}
      <section className="px-5 pb-28 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-[1450px]">
          {/* PROPERTY IMAGE GALLERY */}
          <PropertyGallery />

          {/* MAIN CONTENT */}
          <div
            className="
              mt-12
              grid
              items-start
              gap-12
              lg:grid-cols-[minmax(0,1fr)_360px]
              xl:gap-16
            "
          >
            {/* LEFT CONTENT */}
            <div className="min-w-0 space-y-16">
              {/* PROPERTY OVERVIEW */}
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

              {/* AMENITIES */}
              <PropertyAmenities />

              {/* AGENT */}
              <PropertyAgent />

              {/* LOCATION / MAP */}
              <PropertyMap />
            </div>

            {/* RIGHT SIDEBAR */}
            <aside
              className="
                lg:sticky
                lg:top-28
              "
            >
              <PropertySidebar price="₹8.5 Cr" title="The Grand Aria" />
            </aside>
          </div>

          {/* SIMILAR PROPERTIES */}
          <div className="mt-24 border-t border-white/10 pt-20">
            <SimilarProperties />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
