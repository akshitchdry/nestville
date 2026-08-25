import { notFound } from "next/navigation";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyOverview from "@/components/properties/PropertyOverview";
import PropertyAmenities from "@/components/properties/PropertyAmenities";
import PropertySidebar from "@/components/properties/PropertySidebar";
import PropertyAgent from "@/components/properties/PropertyAgent";
import PropertyMap from "@/components/properties/PropertyMap";
import SimilarProperties from "@/components/properties/SimilarProperties";

import { residences } from "@/data/residences";

interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyDetailsPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;

  // Find the correct property using URL slug
  const property = residences.find(
    (residence) => residence.slug === slug
  );

  // Invalid slug = Next.js 404
  if (!property) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />

      {/* PROPERTY GALLERY */}
      <div className="pt-24">
        <PropertyGallery title={property.title} />
      </div>

      {/* PROPERTY DETAILS */}
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
              title={property.title}
              description={`Discover ${property.title}, an exceptional ${property.category.toLowerCase()} located in ${property.location}. Designed for refined modern living with premium spaces, sophisticated architecture and an elevated residential experience.`}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              type={property.category}
              possession="Ready To Move"
              parking={
                property.bedrooms >= 5
                  ? "4 Cars"
                  : "3 Cars"
              }
              facing={getFacing(property.slug)}
            />

            <PropertyAmenities />

            <PropertyAgent />

            <PropertyMap />
          </div>

          {/* SIDEBAR */}

          <aside className="lg:sticky lg:top-28">
            <PropertySidebar
              title={property.title}
              propertyId={`NV-${String(property.id).padStart(
                3,
                "0"
              )}`}
              price={property.price}
              bookingAmount="Contact for details"
              maintenance="Available on request"
              possession="Ready To Move"
            />
          </aside>
        </div>
      </section>

      {/* SIMILAR PROPERTIES */}

      <SimilarProperties />

      <Footer />
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| Property specific display helpers
|--------------------------------------------------------------------------
*/

function getFacing(slug: string) {
  switch (slug) {
    case "the-aurelia-estate":
      return "Waterfront";

    case "horizon-villa":
      return "City View";

    case "oceanview-mansion":
      return "Ocean Facing";

    case "celestia-penthouse":
      return "Skyline View";

    case "the-serenity-house":
      return "Garden Facing";

    default:
      return "Premium View";
  }
}