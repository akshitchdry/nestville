"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Heart,
  Mail,
  Search,
  Eye,
  Trash2,
  Users,
  Building2,
} from "lucide-react";

type Favourite = {
  id: number;
  userName: string;
  userEmail: string;
  property: string;
  location: string;
  price: string;
  savedAt: string;
};

export default function AdminFavouritesPage() {
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchFavourites() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/admin/favourites", {
          method: "GET",
          cache: "no-store",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data?.error || "Failed to load favourites"
          );
        }

        if (mounted) {
          setFavourites(data?.favourites ?? []);
        }
      } catch (err) {
        console.error("Favourites error:", err);

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load favourites"
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchFavourites();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredFavourites = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return favourites;

    return favourites.filter((item) =>
      [
        item.userName,
        item.userEmail,
        item.property,
        item.location,
        item.price,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [favourites, search]);

  async function removeFavourite(id: number) {
    const confirmed = window.confirm(
      "Remove this favourite?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch("/api/admin/favourites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error || "Failed to remove favourite"
        );
      }

      setFavourites((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error("Remove favourite error:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed to remove favourite"
      );
    }
  }

  const uniqueUsers = new Set(
    favourites.map((item) => item.userEmail)
  ).size;

  const uniqueProperties = new Set(
    favourites.map((item) => item.property)
  ).size;

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060806]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <Link
            href="/admin"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#d6b56a]/40 hover:text-[#d6b56a]"
          >
            <ArrowLeft size={17} />
          </Link>

          <div>
            <p className="text-[8px] uppercase tracking-[0.28em] text-[#d6b56a]">
              Admin Portal
            </p>

            <h1 className="mt-1 text-xl font-light sm:text-2xl">
              Favourites
            </h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#d6b56a]" />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                User Activity
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-light tracking-[-0.03em] sm:text-5xl">
              Property
              <span className="text-[#d6b56a]">
                {" "}
                Favourites.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              View properties that users have saved to
              their favourite list.
            </p>
          </div>

          <div className="relative w-full lg:max-w-[360px]">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search favourites..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-4 pl-11 pr-5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6b56a]/40"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            icon={<Heart size={17} />}
            label="Total Favourites"
            value={favourites.length}
          />

          <SummaryCard
            icon={<Users size={17} />}
            label="Users Saving"
            value={uniqueUsers}
          />

          <SummaryCard
            icon={<Building2 size={17} />}
            label="Saved Properties"
            value={uniqueProperties}
          />
        </div>

        <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Heart
                size={17}
                className="text-[#d6b56a]"
              />

              <p className="text-sm text-white/75">
                Favourite Activity
              </p>
            </div>

            {!loading && (
              <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
                {filteredFavourites.length} results
              </p>
            )}
          </div>

          {loading && (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-[#d6b56a]" />

              <p className="mt-5 text-sm text-white/40">
                Loading favourites...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="px-6 py-20 text-center">
              <Heart
                size={30}
                className="mx-auto text-red-300/30"
              />

              <p className="mt-4 text-sm text-red-300/70">
                Failed to load favourites
              </p>

              <p className="mx-auto mt-2 max-w-lg text-xs text-white/30">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-full border border-white/10 px-5 py-3 text-[8px] uppercase tracking-[0.15em] text-white/50 hover:border-[#d6b56a]/30 hover:text-[#d6b56a]"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && filteredFavourites.length > 0 && (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.07] text-left">
                      <TableHeading>User</TableHeading>
                      <TableHeading>Property</TableHeading>
                      <TableHeading>Price</TableHeading>
                      <TableHeading>Saved</TableHeading>

                      <th className="px-6 py-4 text-right text-[8px] font-medium uppercase tracking-[0.2em] text-white/30">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredFavourites.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-white/[0.06] transition-colors last:border-none hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-5">
                          <p className="text-sm text-white">
                            {item.userName}
                          </p>

                          <p className="mt-1 text-xs text-white/30">
                            {item.userEmail}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-sm text-white">
                            {item.property}
                          </p>

                          <p className="mt-1 text-xs text-white/35">
                            {item.location}
                          </p>
                        </td>

                        <td className="px-6 py-5 text-sm text-[#d6b56a]">
                          {item.price}
                        </td>

                        <td className="px-6 py-5 text-xs text-white/40">
                          {item.savedAt}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <Link
                              href={`/properties/${slugify(
                                item.property
                              )}`}
                              title="View Property"
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-[#d6b56a]/35 hover:bg-[#d6b56a]/10 hover:text-[#d6b56a]"
                            >
                              <Eye size={15} />
                            </Link>

                            <button
                              type="button"
                              title="Remove"
                              onClick={() =>
                                removeFavourite(item.id)
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/35 hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-white/[0.07] md:hidden">
                {filteredFavourites.map((item) => (
                  <div key={item.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm text-white">
                          {item.userName}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/30">
                          {item.userEmail}
                        </p>
                      </div>

                      <span className="shrink-0 text-sm text-[#d6b56a]">
                        {item.price}
                      </span>
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-sm text-white/80">
                        {item.property}
                      </p>

                      <p className="mt-1 text-xs text-white/35">
                        {item.location}
                      </p>

                      <p className="mt-3 text-[8px] uppercase tracking-[0.18em] text-[#d6b56a]">
                        Saved {item.savedAt}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/properties/${slugify(
                          item.property
                        )}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 hover:border-[#d6b56a]/35 hover:text-[#d6b56a]"
                      >
                        <Eye size={15} />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          removeFavourite(item.id)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/35 hover:border-red-400/30 hover:text-red-300"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading &&
            !error &&
            filteredFavourites.length === 0 && (
              <div className="px-6 py-20 text-center">
                <Heart
                  size={30}
                  className="mx-auto text-white/15"
                />

                <p className="mt-4 text-sm text-white/35">
                  {search
                    ? "No favourites found."
                    : "No users have saved any properties yet."}
                </p>
              </div>
            )}
        </div>
      </section>
    </main>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5">
      <div className="flex items-center gap-3 text-[#d6b56a]">
        {icon}

        <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
          {label}
        </p>
      </div>

      <p className="mt-4 text-3xl font-light">
        {value}
      </p>
    </div>
  );
}

function TableHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-6 py-4 text-[8px] font-medium uppercase tracking-[0.2em] text-white/30">
      {children}
    </th>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}