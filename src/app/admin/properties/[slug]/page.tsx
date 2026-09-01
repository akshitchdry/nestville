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

import { createClient } from "@/lib/supabase/server";

interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyDetailsPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const {
    data: property,
    error,
  } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(
      "Property fetch error:",
      error.message
    );
  }

  if (!property) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <Navbar />

      {/* GALLERY */}

      <div className="pt-24">
        <PropertyGallery
          title={property.title}
        />
      </div>

      {/* DETAILS */}

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
          {/* LEFT */}

          <div className="min-w-0 space-y-20">
            <PropertyOverview
              title={property.title}
              description={property.description}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              type={property.category}
              possession="Ready To Move"
              parking="3 Cars"
              facing="Premium View"
            />

            <PropertyAmenities />

            <PropertyAgent />

            <PropertyMap />
          </div>

          {/* RIGHT SIDEBAR */}

          <aside className="lg:sticky lg:top-28">
            <PropertySidebar
              title={property.title}
              propertyId={`NV-${String(
                property.id
              ).padStart(3, "0")}`}
              price={property.price}
              bookingAmount="Contact for details"
              maintenance="Available on request"
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