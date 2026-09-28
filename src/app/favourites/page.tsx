"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  Loader2,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ConsultationSection from "@/components/consultation/ConsultationSection";

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
  featured: boolean | null;
}

export default function FavouritesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadFavourites() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/favourites", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (cancelled) return;

        if (response.status === 401) {
          setProperties([]);
          setError(
            "Please sign in to view your saved residences.",
          );
          return;
        }

        if (!response.ok) {
          throw new Error(
            data?.error || "Unable to load favourites.",
          );
        }

        setProperties(
          data?.favourites ??
            data?.properties ??
            [],
        );
      } catch (err) {
        if (cancelled) return;

        console.error(
          "Favourite page error:",
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load favourites.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    function handleFavouriteChange() {
      loadFavourites();
    }

    loadFavourites();

    window.addEventListener(
      "favourites-changed",
      handleFavouriteChange,
    );

    return () => {
      cancelled = true;

      window.removeEventListener(
        "favourites-changed",
        handleFavouriteChange,
      );
    };
  }, []);

  async function removeFavourite(
    propertyId: number,
  ) {
    try {
      setError("");

      const response = await fetch(
        "/api/favourites",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            propertyId,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to remove favourite.",
        );
      }

      setProperties((current) =>
        current.filter(
          (property) =>
            property.id !== propertyId,
        ),
      );

      window.dispatchEvent(
        new Event("favourites-changed"),
      );
    } catch (err) {
      console.error(
        "Remove favourite error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove favourite.",
      );
    }
  }

  async function clearAll() {
    if (
      clearing ||
      properties.length === 0
    ) {
      return;
    }

    try {
      setClearing(true);
      setError("");

      const response = await fetch(
        "/api/favourites",
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to clear favourites.",
        );
      }

      setProperties([]);

      window.dispatchEvent(
        new Event("favourites-changed"),
      );
    } catch (err) {
      console.error(
        "Clear favourites error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to clear favourites.",
      );
    } finally {
      setClearing(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative px-6 pb-16 pt-40 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#d6b56a]/10 blur-[190px]" />

        <div className="pointer-events-none absolute -right-40 top-60 h-[400px] w-[400px] rounded-full bg-emerald-950/10 blur-[180px]" />

        <div className="relative z-10 mx-auto max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Saved Collection
            </span>
          </div>

          <h1 className="mt-8 text-[clamp(4rem,9vw,8rem)] font-light leading-[0.84] tracking-[-0.055em]">
            Your favourite
            <span className="block text-[#d6b56a]">
              residences.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-[15px] leading-8 text-white/45">
            Keep the properties that caught your
            attention in one place.
          </p>
        </div>
      </section>

      {/* FAVOURITES */}

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1450px]">

          {/* LOADING */}

          {loading && (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025]"
                >
                  <div className="aspect-[4/3] animate-pulse bg-white/5" />

                  <div className="space-y-4 p-6">
                    <div className="h-3 w-28 animate-pulse rounded bg-white/5" />

                    <div className="h-6 w-3/4 animate-pulse rounded bg-white/5" />

                    <div className="h-3 w-1/2 animate-pulse rounded bg-white/5" />

                    <div className="flex gap-2">
                      <div className="h-8 w-20 animate-pulse rounded-full bg-white/5" />

                      <div className="h-8 w-20 animate-pulse rounded-full bg-white/5" />

                      <div className="h-8 w-24 animate-pulse rounded-full bg-white/5" />
                    </div>
                  </div>

                  <div className="border-t border-white/10 px-6 py-5">
                    <div className="h-3 w-36 animate-pulse rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="rounded-[32px] border border-red-400/20 bg-red-400/[0.05] px-6 py-20 text-center">
              <p className="text-[9px] uppercase tracking-[0.3em] text-red-300/70">
                Saved Collection
              </p>

              <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-light sm:text-4xl">
                {error}
              </h2>

              <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40">
                Browse our residences and save
                properties to build your collection.
              </p>

              <Link
                href="/properties"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#d6b56a] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-[#e5c77f]"
              >
                Explore Properties

                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            !error &&
            properties.length === 0 && (
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.025] px-6 py-24 text-center">
                <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d6b56a]/10 blur-[100px]" />

                <div className="relative">
                  <Heart
                    size={36}
                    strokeWidth={1.2}
                    className="mx-auto text-[#d6b56a]/60"
                  />

                  <p className="mt-7 text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                    Your Collection
                  </p>

                  <h2 className="mt-5 text-3xl font-light sm:text-4xl">
                    No saved residences yet.
                  </h2>

                  <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40">
                    Use the heart icon on a residence
                    to save it to your collection.
                  </p>

                  <Link
                    href="/properties"
                    className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#d6b56a] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-[1.03] hover:bg-[#e5c77f]"
                  >
                    Explore Properties

                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </div>
              </div>
            )}

          {/* PROPERTIES */}

          {!loading &&
            !error &&
            properties.length > 0 && (
              <>
                <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#d6b56a]">
                      Your Collection
                    </p>

                    <h2 className="mt-3 text-3xl font-light sm:text-4xl">
                      {properties.length}{" "}
                      {properties.length === 1
                        ? "saved residence"
                        : "saved residences"}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={clearing}
                    className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 px-5 py-3 text-[9px] uppercase tracking-[0.18em] text-white/45 transition-all hover:border-red-400/30 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
                  >
                    {clearing ? (
                      <Loader2
                        size={13}
                        className="animate-spin"
                      />
                    ) : (
                      <Trash2 size={13} />
                    )}

                    {clearing
                      ? "Clearing..."
                      : "Clear All"}
                  </button>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {properties.map(
                    (property) => {
                      const image =
                        property.image?.trim() ||
                        "/images/properties/residence-1.webp";

                      return (
                        <article
                          key={property.id}
                          className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-[#d6b56a]/30"
                        >
                          {/* IMAGE + LINK */}

                          <Link
                            href={`/properties/${property.slug}`}
                            className="block"
                          >
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#0b0c0b]">
                              <img
                                src={image}
                                alt={property.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                              {property.featured && (
                                <span className="absolute left-5 top-5 rounded-full border border-[#d6b56a]/30 bg-black/50 px-3 py-2 text-[8px] uppercase tracking-[0.18em] text-[#e6ca86] backdrop-blur-md">
                                  Featured
                                </span>
                              )}
                            </div>

                            <div className="p-6">
                              <p className="text-[9px] uppercase tracking-[0.18em] text-[#d6b56a]">
                                {property.category ||
                                  "Luxury Property"}
                              </p>

                              <div className="mt-3 flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                  <h3 className="line-clamp-2 text-xl font-light leading-tight">
                                    {property.title}
                                  </h3>

                                  <p className="mt-2 text-xs text-white/35">
                                    {property.location}
                                  </p>
                                </div>

                                <p className="shrink-0 text-sm text-[#d6b56a]">
                                  {property.price}
                                </p>
                              </div>

                              <div className="mt-5 flex flex-wrap gap-2">
                                <span className="rounded-full border border-white/10 px-3 py-2 text-[9px] text-white/40">
                                  {property.bedrooms ??
                                    0}{" "}
                                  Beds
                                </span>

                                <span className="rounded-full border border-white/10 px-3 py-2 text-[9px] text-white/40">
                                  {property.bathrooms ??
                                    0}{" "}
                                  Baths
                                </span>

                                <span className="rounded-full border border-white/10 px-3 py-2 text-[9px] text-white/40">
                                  {property.area ||
                                    "Area on Request"}
                                </span>
                              </div>
                            </div>
                          </Link>

                          {/* REMOVE */}

                          <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
                            <button
                              type="button"
                              onClick={() =>
                                removeFavourite(
                                  property.id,
                                )
                              }
                              className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-red-300"
                            >
                              <Trash2
                                size={13}
                              />

                              Remove
                            </button>

                            <Link
                              href={`/properties/${property.slug}`}
                              className="group/view inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-[#d6b56a]"
                            >
                              View

                              <ArrowUpRight
                                size={13}
                                className="transition-transform duration-300 group-hover/view:translate-x-1 group-hover/view:-translate-y-1"
                              />
                            </Link>
                          </div>
                        </article>
                      );
                    },
                  )}
                </div>
              </>
            )}
        </div>
      </section>

      {/* CONSULTATION */}

      <ConsultationSection />

      {/* FOOTER */}

      <Footer />
    </main>
  );
}