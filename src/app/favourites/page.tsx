"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ConsultationSection from "@/components/consultation/ConsultationSection";
import ResidenceCard from "@/components/residences/ResidenceCard";

import { residences } from "@/data/residences";

const STORAGE_KEY = "nestville-favourites";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("favourites-changed", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("favourites-changed", callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

export default function FavouritesPage() {
  const storedValue = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  let savedSlugs: string[] = [];

  try {
    const parsed: unknown = JSON.parse(storedValue);

    if (Array.isArray(parsed)) {
      savedSlugs = parsed.filter(
        (item): item is string => typeof item === "string",
      );
    }
  } catch {
    savedSlugs = [];
  }

  const favouriteResidences = residences.filter((residence) =>
    savedSlugs.includes(residence.slug),
  );

  function clearFavourites() {
    window.localStorage.removeItem(STORAGE_KEY);

    window.dispatchEvent(new Event("favourites-changed"));
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative px-6 pb-16 pt-40 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#d6b56a]/10 blur-[190px]" />

        <div className="relative z-10 mx-auto max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              Saved Collection
            </span>
          </div>

          <h1 className="mt-8 text-[clamp(4rem,9vw,8rem)] font-light leading-[0.84] tracking-[-0.055em]">
            Your favourite
            <span className="block text-[#d6b56a]">residences.</span>
          </h1>

          <p className="mt-8 max-w-xl text-[15px] leading-8 text-white/45">
            Keep the properties that caught your attention in one place and
            return to them whenever you are ready.
          </p>
        </div>
      </section>

      {/* FAVOURITES */}

      <section className="px-6 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          {favouriteResidences.length > 0 ? (
            <>
              <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#d6b56a]">
                    Your Collection
                  </p>

                  <h2 className="mt-3 text-3xl font-light text-white sm:text-4xl">
                    {favouriteResidences.length}{" "}
                    {favouriteResidences.length === 1
                      ? "saved residence"
                      : "saved residences"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={clearFavourites}
                  className="
                    self-start
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.025]
                    px-6
                    py-3
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/45
                    transition-all
                    duration-300
                    hover:border-[#d6b56a]/40
                    hover:bg-[#d6b56a]/10
                    hover:text-[#d6b56a]
                    sm:self-auto
                  "
                >
                  Clear All
                </button>
              </div>

              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {favouriteResidences.map((residence, index) => (
                  <div key={residence.id} className="min-h-[680px]">
                    <ResidenceCard residence={residence} index={index} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-white/10
                bg-white/[0.025]
                px-6
                py-16
                text-center
                sm:px-10
                sm:py-20
              "
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6b56a]/10 blur-[140px]" />

              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#d6b56a]">
                  Your Collection
                </p>

                <h2 className="mt-5 text-3xl font-light text-white sm:text-4xl">
                  No saved residences yet.
                </h2>

                <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40">
                  Use the heart icon on residence cards to save your favourite
                  homes and find them here later.
                </p>

                <Link
                  href="/#residences"
                  className="
                    mt-8
                    inline-flex
                    items-center
                    justify-center
                    rounded-full
                    bg-[#d6b56a]
                    px-7
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-[#050505]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#e5c77f]
                  "
                >
                  Explore Residences
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <ConsultationSection />

      <Footer />
    </main>
  );
}
