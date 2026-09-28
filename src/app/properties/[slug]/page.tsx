import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  Heart,
} from "lucide-react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import PropertyGallery from "@/components/properties/PropertyGallery";
import PropertyOverview from "@/components/properties/PropertyOverview";
import PropertyAmenities from "@/components/properties/PropertyAmenities";
import PropertyMap from "@/components/properties/PropertyMap";
import PropertySidebar from "@/components/properties/PropertySidebar";
import PropertyAgent from "@/components/properties/PropertyAgent";
import SimilarProperties from "@/components/properties/SimilarProperties";

import { createClient } from "@/lib/supabase/server";

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

interface PropertyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PropertyDetailPage({
  params,
}: PropertyPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const supabase = await createClient();

  const {
    data: property,
    error,
  } = await supabase
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
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error(
      "Property detail fetch error:",
      error,
    );

    notFound();
  }

  if (!property) {
    notFound();
  }

  const data = property as Property;

  const image =
    data.image?.trim() ||
    "/images/properties/residence-1.webp";

  const bedrooms = data.bedrooms ?? 0;
  const bathrooms = data.bathrooms ?? 0;
  const area = data.area || "Area on Request";

  const category =
    data.category || "Luxury Property";

  const description =
    data.description ||
    `Discover ${data.title}, an exceptional ${category.toLowerCase()} located in ${data.location}. Experience refined architecture, premium interiors and an elevated lifestyle with NestVille.`;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#050505] px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        {/* GOLD GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-0
            h-[600px]
            w-[600px]
            rounded-full
            bg-[#d6b56a]/10
            blur-[190px]
          "
        />

        {/* GREEN GLOW */}
        <div
          className="
            pointer-events-none
            absolute
            -right-40
            bottom-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-emerald-950/20
            blur-[180px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1450px]">
          {/* BACK */}
          <Link
            href="/properties"
            className="
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-white/[0.025]
              px-5
              py-3
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/45
              transition-all
              hover:border-[#d6b56a]/40
              hover:text-[#d6b56a]
            "
          >
            <ArrowLeft size={14} />
            All Properties
          </Link>

          {/* BREADCRUMB */}
          <div className="mt-10 flex flex-wrap items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/25">
            <Link
              href="/"
              className="transition hover:text-white/60"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/properties"
              className="transition hover:text-white/60"
            >
              Properties
            </Link>

            <span>/</span>

            <span className="text-[#d6b56a]">
              {data.title}
            </span>
          </div>

          {/* TITLE */}
          <div className="mt-8 max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#d6b56a]/25 bg-[#d6b56a]/10 px-4 py-2 text-[8px] uppercase tracking-[0.2em] text-[#d6b56a]">
                {category}
              </span>

              {data.featured && (
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[8px] uppercase tracking-[0.2em] text-white/55">
                  Featured Residence
                </span>
              )}
            </div>

            <h1 className="mt-7 text-[clamp(3rem,7vw,7rem)] font-light leading-[0.88] tracking-[-0.05em]">
              {data.title}
            </h1>

            <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
              <div className="flex items-center gap-2 text-sm text-white/45">
                <MapPin
                  size={16}
                  className="text-[#d6b56a]"
                />

                {data.location}
              </div>

              <div className="h-4 w-px bg-white/10" />

              <div className="text-sm text-[#d6b56a]">
                {data.price}
              </div>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative mt-14 overflow-hidden rounded-[34px] border border-white/10 bg-[#0b0c0b] shadow-[0_35px_100px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[16/8] min-h-[380px]">
              <img
                src={image}
                alt={data.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                {/* STATS */}
                <div className="flex flex-wrap gap-2">
                  <HeroStat
                    icon={<BedDouble size={15} />}
                    value={`${bedrooms} Beds`}
                  />

                  <HeroStat
                    icon={<Bath size={15} />}
                    value={`${bathrooms} Baths`}
                  />

                  <HeroStat
                    icon={<Maximize2 size={15} />}
                    value={area}
                  />
                </div>

                {/* ACTION */}
                <Link
                  href="#viewing"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-[#d6b56a]
                    px-6
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-black
                    transition-all
                    hover:scale-[1.03]
                    hover:bg-[#e5ca85]
                  "
                >
                  Schedule Viewing
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* QUICK INFO */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <QuickInfo
              label="Starting Price"
              value={data.price}
            />

            <QuickInfo
              label="Property Type"
              value={category}
            />

            <QuickInfo
              label="Location"
              value={data.location}
            />
          </div>
        </div>
      </section>

      {/* OVERVIEW + SIDEBAR */}
      <section className="relative bg-[#070707] px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] gap-10 xl:grid-cols-[1fr_420px]">
          <PropertyOverview
            title={data.title}
            description={description}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            area={area}
            type={category}
            possession="Ready to Move"
            parking="Private Parking"
            facing="Premium"
          />

          <div
            id="viewing"
            className="xl:pt-28"
          >
            <PropertySidebar
              price={data.price}
              propertyId={`NV-${String(data.id).padStart(3, "0")}`}
              title={data.title}
              bookingAmount="On Request"
              maintenance="On Request"
              possession="Ready to Move"
              brochureHref="/brochures/property-brochure.pdf"
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <PropertyGallery
        title={data.title}
        images={[
          {
            id: 1,
            src: image,
            alt: `${data.title} exterior`,
            label: "Residence",
          },
        ]}
      />

      {/* AMENITIES */}
      <PropertyAmenities />

      {/* LOCATION */}
      <PropertyMap />

      {/* AGENT */}
      <PropertyAgent />

      {/* SIMILAR */}
      <SimilarProperties />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}

/* =========================================
   HERO STAT
========================================= */

function HeroStat({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-3 text-[9px] text-white/70 backdrop-blur-xl">
      <span className="text-[#d6b56a]">
        {icon}
      </span>

      {value}
    </div>
  );
}

/* =========================================
   QUICK INFO
========================================= */

function QuickInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.025] px-6 py-5">
      <p className="text-[8px] uppercase tracking-[0.2em] text-white/25">
        {label}
      </p>

      <p className="mt-2 truncate text-sm text-white/70">
        {value}
      </p>
    </div>
  );
}