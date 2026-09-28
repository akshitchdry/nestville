"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { createClient } from "@/lib/supabase/client";

import {
  Bath,
  BedDouble,
  Building2,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  WalletCards,
  RotateCcw,
  ArrowUpRight
} from "lucide-react";

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

const tabs = ["Buy", "Rent", "Projects"];

export default function SearchPage() {
  const [properties, setProperties] =
    useState<Property[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("Buy");

  const [keyword, setKeyword] =
    useState("");

  const [location, setLocation] =
    useState("All Locations");

  const [type, setType] =
    useState("All Types");

  const [bedrooms, setBedrooms] =
    useState("Any");

  useEffect(() => {
    let mounted = true;

    async function loadProperties() {
      try {
        setLoading(true);
        setError("");

        const supabase = createClient();

        const {
          data,
          error: supabaseError,
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
          .eq("status", "published")
          .order("created_at", {
            ascending: false,
          });

        if (!mounted) return;

        if (supabaseError) {
          console.error(
            "Search properties error:",
            supabaseError,
          );

          setError(
            "Unable to load properties right now.",
          );

          return;
        }

        setProperties(
          (data as Property[]) ?? [],
        );
      } catch (err) {
        console.error(
          "Search loading error:",
          err,
        );

        if (mounted) {
          setError(
            "Unable to load properties right now.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProperties();

    return () => {
      mounted = false;
    };
  }, []);

  const locations = useMemo(() => {
    const uniqueLocations = Array.from(
      new Set(
        properties
          .map((property) =>
            property.location?.trim(),
          )
          .filter(Boolean),
      ),
    ) as string[];

    return [
      "All Locations",
      ...uniqueLocations.sort(),
    ];
  }, [properties]);

  const types = useMemo(() => {
    const uniqueTypes = Array.from(
      new Set(
        properties
          .map((property) =>
            property.category?.trim(),
          )
          .filter(Boolean),
      ),
    ) as string[];

    return [
      "All Types",
      ...uniqueTypes.sort(),
    ];
  }, [properties]);

  const results = useMemo(() => {
    const searchTerm =
      keyword.trim().toLowerCase();

    return properties.filter((property) => {
      /*
       * Current database schema does not have a
       * confirmed Buy/Rent field.
       *
       * Therefore:
       * Buy  -> all published properties
       * Rent -> all published properties
       * Projects -> category containing "project"
       *
       * This avoids inventing listing types.
       */
      const tabMatch =
        activeTab === "Projects"
          ? (
              property.category ?? ""
            )
              .toLowerCase()
              .includes("project")
          : true;

      const keywordMatch =
        !searchTerm ||
        property.title
          .toLowerCase()
          .includes(searchTerm) ||
        property.location
          .toLowerCase()
          .includes(searchTerm) ||
        (
          property.category ?? ""
        )
          .toLowerCase()
          .includes(searchTerm);

      const locationMatch =
        location === "All Locations" ||
        property.location === location;

      const typeMatch =
        type === "All Types" ||
        property.category === type;

      const bedroomMatch =
        bedrooms === "Any" ||
        property.bedrooms === Number(bedrooms);

      return (
        tabMatch &&
        keywordMatch &&
        locationMatch &&
        typeMatch &&
        bedroomMatch
      );
    });
  }, [
    properties,
    activeTab,
    keyword,
    location,
    type,
    bedrooms,
  ]);

  function resetFilters() {
    setKeyword("");
    setLocation("All Locations");
    setType("All Types");
    setBedrooms("Any");
    setActiveTab("Buy");
  }

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden px-5 pb-14 pt-36 sm:px-8 lg:px-12">
        <div
          className="
            pointer-events-none
            absolute
            -left-40
            top-10
            h-[600px]
            w-[600px]
            rounded-full
            bg-[#d6b56a]/10
            blur-[190px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            bottom-0
            h-[400px]
            w-[400px]
            rounded-full
            bg-emerald-950/15
            blur-[180px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Property Search
            </span>
          </div>

          <h1 className="mt-7 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.86] tracking-[-0.05em]">
            Find your
            <span className="block text-[#d6b56a]">
              perfect address.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-7 text-white/40">
            Search NestVille&apos;s published
            collection by location, property type,
            bedrooms and more.
          </p>
        </div>
      </section>

      {/* SEARCH BOX */}

      <section className="px-5 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1450px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          {/* TABS */}

          <div className="flex border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`
                  relative
                  flex-1
                  px-5
                  py-5
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  transition-colors
                  ${
                    activeTab === tab
                      ? "text-[#d6b56a]"
                      : "text-white/40 hover:text-white"
                  }
                `}
              >
                {tab}

                {activeTab === tab && (
                  <span className="absolute inset-x-5 bottom-0 h-px bg-[#d6b56a]" />
                )}
              </button>
            ))}
          </div>

          {/* FILTERS */}

          <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-5">
            {/* SEARCH */}

            <div className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4">
              <Search
                size={17}
                className="shrink-0 text-[#d6b56a]"
              />

              <input
                value={keyword}
                onChange={(event) =>
                  setKeyword(
                    event.target.value,
                  )
                }
                placeholder="Search property..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />
            </div>

            {/* LOCATION */}

            <SelectField
              icon={<MapPin size={17} />}
              value={location}
              onChange={setLocation}
              options={locations}
            />

            {/* TYPE */}

            <SelectField
              icon={<Building2 size={17} />}
              value={type}
              onChange={setType}
              options={types}
            />

            {/* BEDROOMS */}

            <SelectField
              icon={<BedDouble size={17} />}
              value={bedrooms}
              onChange={setBedrooms}
              options={[
                "Any",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
              ]}
            />

            {/* RESET */}

            <button
              type="button"
              onClick={resetFilters}
              className="
                flex
                min-h-[64px]
                items-center
                justify-center
                gap-3
                rounded-2xl
                bg-[#d6b56a]
                px-6
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-black
                transition
                hover:bg-[#e4c77e]
              "
            >
              <RotateCcw size={16} />
              Reset Search
            </button>
          </div>
        </div>
      </section>

      {/* RESULTS */}

      <section className="px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          {/* RESULT HEADER */}

          <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                Search Results
              </p>

              <h2 className="mt-2 text-2xl font-light">
                {loading
                  ? "Finding properties..."
                  : `${results.length} ${
                      results.length === 1
                        ? "property"
                        : "properties"
                    } found`}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <SlidersHorizontal
                size={17}
                className="text-[#d6b56a]"
              />

              <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                {activeTab}
              </span>

              <WalletCards
                size={20}
                className="ml-2 text-[#d6b56a]"
              />
            </div>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
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
            <div className="mt-8 rounded-[30px] border border-red-500/20 bg-red-500/5 px-6 py-20 text-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-red-400">
                Search Error
              </p>

              <h3 className="mt-5 text-3xl font-light">
                Properties could not be loaded
              </h3>

              <p className="mt-4 text-sm text-white/40">
                Please try again.
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-8 rounded-full bg-[#d6b56a] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#e5c77f]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* RESULTS */}

          {!loading &&
            !error &&
            results.length > 0 && (
              <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
                {results.map(
                  (property) => (
                    <PropertyResultCard
                      key={property.id}
                      property={property}
                    />
                  ),
                )}
              </div>
            )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            results.length === 0 && (
              <div className="mt-8 rounded-[30px] border border-white/10 bg-white/[0.025] px-6 py-24 text-center">
                <Search
                  size={30}
                  className="mx-auto text-[#d6b56a]"
                />

                <h3 className="mt-5 text-3xl font-light">
                  No properties found
                </h3>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/40">
                  Try changing your search,
                  location, property type or
                  bedroom filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-8 rounded-full border border-[#d6b56a]/30 px-7 py-4 text-[9px] uppercase tracking-[0.2em] text-[#d6b56a] transition hover:bg-[#d6b56a] hover:text-black"
                >
                  Clear Filters
                </button>
              </div>
            )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* =========================================
   PROPERTY RESULT CARD
========================================= */

function PropertyResultCard({
  property,
}: {
  property: Property;
}) {
  const image =
    property.image?.trim() ||
    "/images/properties/residence-1.webp";

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.03]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#d6b56a]/30
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.3)]
      "
    >
      {/* IMAGE */}

      <Link
        href={`/properties/${property.slug}`}
        className="block"
      >
        <div className="relative h-[280px] overflow-hidden bg-[#0b0c0b]">
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

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
                px-4
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
            {property.category ||
              "Luxury Property"}
          </span>

          <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-all group-hover:border-[#d6b56a]/40 group-hover:bg-[#d6b56a] group-hover:text-black">
            <ArrowUpRightIcon />
          </div>
        </div>
      </Link>

      {/* CONTENT */}

      <div className="p-6">
        <Link
          href={`/properties/${property.slug}`}
          className="block"
        >
          <p className="flex items-center gap-2 text-xs text-white/35">
            <MapPin
              size={13}
              className="text-[#d6b56a]"
            />

            {property.location}
          </p>

          <h3 className="mt-3 line-clamp-2 text-2xl font-light leading-tight text-white transition-colors group-hover:text-[#e3c47d]">
            {property.title}
          </h3>
        </Link>

        <div className="mt-6 flex flex-wrap gap-2 border-y border-white/10 py-4">
          <InfoBadge
            icon={<BedDouble size={13} />}
            value={`${property.bedrooms ?? 0} Beds`}
          />

          <InfoBadge
            icon={<Bath size={13} />}
            value={`${property.bathrooms ?? 0} Baths`}
          />

          <InfoBadge
            value={
              property.area ||
              "Area on Request"
            }
          />
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[8px] uppercase tracking-[0.2em] text-white/25">
              Starting Price
            </p>

            <p className="mt-2 truncate text-xl text-[#d6b56a]">
              {property.price}
            </p>
          </div>

          <Link
            href={`/properties/${property.slug}`}
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              px-4
              py-3
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-white/45
              transition-all
              hover:border-[#d6b56a]/40
              hover:text-[#d6b56a]
            "
          >
            View
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* =========================================
   SELECT
========================================= */

interface SelectFieldProps {
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

function SelectField({
  icon,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <label className="relative flex min-h-[64px] items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 transition-colors focus-within:border-[#d6b56a]/40">
      <span className="shrink-0 text-[#d6b56a]">
        {icon}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-full w-full appearance-none bg-transparent text-sm text-white outline-none"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#090b09]"
          >
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-4 text-white/30"
      />
    </label>
  );
}

/* =========================================
   BADGE
========================================= */

function InfoBadge({
  icon,
  value,
}: {
  icon?: React.ReactNode;
  value: string;
}) {
  return (
    <span className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[9px] text-white/40">
      {icon && (
        <span className="text-[#d6b56a]">
          {icon}
        </span>
      )}

      {value}
    </span>
  );
}

/* =========================================
   ARROW
========================================= */

function ArrowUpRightIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}