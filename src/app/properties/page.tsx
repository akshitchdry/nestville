import Link from "next/link";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import { createClient } from "@/lib/supabase/server";

export default async function PropertiesPage() {
  const supabase = await createClient();

  const { data: properties, error } = await supabase
    .from("properties")
    .select("*")
    .eq("status", "published")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Error loading properties:",
      error.message
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* HERO */}

      <section className="px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
            NestVille Residences
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
            Exceptional Properties
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/40">
            Explore our collection of extraordinary residences,
            villas and premium properties curated by NestVille.
          </p>
        </div>
      </section>

      {/* PROPERTIES */}

      <section className="px-5 pb-28 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1450px]">
          {!properties || properties.length === 0 ? (
            <div className="rounded-[28px] border border-white/10 bg-white/[0.025] px-6 py-24 text-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                NestVille Properties
              </p>

              <h2 className="mt-5 text-3xl font-light">
                No properties available
              </h2>

              <p className="mt-4 text-sm text-white/40">
                Published properties will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* =========================================
   PROPERTY CARD
========================================= */

function PropertyCard({
  property,
}: {
  property: {
    id: number;
    slug: string;
    title: string;
    location: string;
    price: string;
    bedrooms: number | null;
    bathrooms: number | null;
    area: string | null;
    image: string | null;
    category: string | null;
    featured: boolean | null;
  };
}) {
  const image =
    property.image &&
    property.image.startsWith("/")
      ? property.image
      : "/images/properties/residence-1.webp";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-[#d6b56a]/30"
    >
      {/* IMAGE */}

      <div className="relative aspect-[4/3] overflow-hidden bg-[#0b0c0b]">
        <img
          src={image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {property.featured && (
          <span className="absolute left-5 top-5 rounded-full border border-[#d6b56a]/30 bg-black/50 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-[#e6ca86] backdrop-blur-md">
            Featured
          </span>
        )}

        <span className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
          {property.category || "Luxury Property"}
        </span>
      </div>

      {/* CONTENT */}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-light text-white">
              {property.title}
            </h2>

            <p className="mt-2 text-xs text-white/35">
              {property.location}
            </p>
          </div>

          <p className="shrink-0 text-sm text-[#d6b56a]">
            {property.price}
          </p>
        </div>

        {/* DETAILS */}

        <div className="mt-6 flex flex-wrap gap-2">
          <InfoBadge>
            {property.bedrooms ?? 0} Beds
          </InfoBadge>

          <InfoBadge>
            {property.bathrooms ?? 0} Baths
          </InfoBadge>

          <InfoBadge>
            {property.area || "Area on Request"}
          </InfoBadge>
        </div>

        {/* VIEW */}

        <div className="mt-6 border-t border-white/10 pt-5">
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-[#d6b56a]">
            Explore Residence →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================
   BADGE
========================================= */

function InfoBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-white/10 px-3 py-2 text-[9px] text-white/40">
      {children}
    </span>
  );
}