"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { createClient } from "@/lib/supabase/client";

interface Property {
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
  description: string | null;
  status: string | null;
  featured: boolean | null;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        setError("");

        const supabase = createClient();

        const { data, error: supabaseError } = await supabase
          .from("properties")
          .select(
            `
              id,
              slug,
              title,
              location,
              price,
              bedrooms,
              bathrooms,
              area,
              image,
              category,
              description,
              status,
              featured
            `,
          )
          .eq("status", "published")
          .order("created_at", {
            ascending: false,
          });

        if (supabaseError) {
          console.error(
            "Error loading properties:",
            supabaseError.message,
          );

          setError("Unable to load properties right now.");
          return;
        }

        setProperties((data as Property[]) || []);
      } catch (err) {
        console.error("Properties error:", err);
        setError("Unable to load properties right now.");
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

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

          {/* LOADING */}
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]"
                >
                  <div className="aspect-[4/3] animate-pulse bg-white/5" />

                  <div className="space-y-4 p-6">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-white/5" />

                    <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />

                    <div className="flex gap-2">
                      <div className="h-7 w-20 animate-pulse rounded-full bg-white/5" />
                      <div className="h-7 w-20 animate-pulse rounded-full bg-white/5" />
                      <div className="h-7 w-24 animate-pulse rounded-full bg-white/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERROR */}
          {!loading && error && (
            <div className="rounded-[28px] border border-red-500/20 bg-red-500/5 px-6 py-20 text-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-red-400">
                Something went wrong
              </p>

              <h2 className="mt-5 text-3xl font-light text-white">
                Properties could not be loaded
              </h2>

              <p className="mt-4 text-sm text-white/40">
                Please refresh the page and try again.
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-8 rounded-full bg-[#d6b56a] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#e5c77f]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* EMPTY */}
          {!loading && !error && properties.length === 0 && (
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
          )}

          {/* PROPERTY GRID */}
          {!loading && !error && properties.length > 0 && (
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
  property: Property;
}) {
  const image =
    property.image &&
    property.image.trim() !== ""
      ? property.image
      : "/images/properties/residence-1.webp";

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="
        group
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.025]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#d6b56a]/30
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0b0c0b]">
        <img
          src={image}
          alt={property.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* FEATURED */}
        {property.featured && (
          <span
            className="
              absolute
              left-5
              top-5
              rounded-full
              border
              border-[#d6b56a]/30
              bg-black/50
              px-3
              py-2
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-[#e6ca86]
              backdrop-blur-md
            "
          >
            Featured
          </span>
        )}

        {/* CATEGORY */}
        <span
          className="
            absolute
            bottom-5
            left-5
            rounded-full
            border
            border-white/10
            bg-black/50
            px-3
            py-2
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/70
            backdrop-blur-md
          "
        >
          {property.category || "Luxury Property"}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2
              className="
                line-clamp-2
                text-xl
                font-light
                leading-tight
                text-white
              "
            >
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
          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/40
              transition-colors
              group-hover:text-[#d6b56a]
            "
          >
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
    <span
      className="
        rounded-full
        border
        border-white/10
        px-3
        py-2
        text-[9px]
        text-white/40
      "
    >
      {children}
    </span>
  );
}