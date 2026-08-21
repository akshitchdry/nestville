import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyOverview from "@/components/properties/PropertyOverview";
import PropertyAmenities from "@/components/properties/PropertyAmenities";
import PropertySidebar from "@/components/properties/PropertySidebar";
import PropertyAgent from "@/components/properties/PropertyAgent";
import PropertyMap from "@/components/properties/PropertyMap";
import SimilarProperties from "@/components/properties/SimilarProperties";

interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyDetailsPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />

      <div className="pt-24">
        <PropertyGallery
          title={
            slug
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
          }
        />
      </div>

      <section className="relative px-5 py-24 sm:px-6 lg:px-8">
        <div
          className="
            mx-auto
            grid
            max-w-[1450px]
            items-start
            gap-12
            lg:grid-cols-[minmax(0,1fr)_360px]
            xl:gap-16
          "
        >
          {/* LEFT CONTENT */}
          <div className="min-w-0 space-y-20">
            <PropertyOverview
              title="Royal Palm Villa"
              description="A refined luxury residence combining contemporary architecture, premium finishes, private outdoor spaces and smart-home technology for an elevated living experience."
              bedrooms={5}
              bathrooms={6}
              area="6,850 sq.ft."
              type="Luxury Villa"
              possession="Ready To Move"
              parking="4 Cars"
              facing="Sea Facing"
            />

            <PropertyAmenities />

            <PropertyAgent />

            <PropertyMap />
          </div>

          {/* STICKY SIDEBAR */}
          <aside className="lg:sticky lg:top-28">
            <PropertySidebar
              title="Royal Palm Villa"
              propertyId="NV-001"
              price="₹8.5 Cr"
              bookingAmount="₹25 Lakh"
              maintenance="₹35,000 / Month"
              possession="Ready To Move"
            />
          </aside>
        </div>
      </section>

      <SimilarProperties />

      <Footer />
    </main>
  );
}