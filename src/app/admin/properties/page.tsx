"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Edit3,
  Eye,
  Plus,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type Property = {
  id: number;
  title: string;
  slug: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  category: string;
  image: string;
  description: string | null;
  status: string;
  featured: boolean;
  created_at: string;
};

async function fetchProperties(): Promise<Property[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as Property[];
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(
    [],
  );

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(
    null,
  );

  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function initialLoad() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchProperties();

        if (mounted) {
          setProperties(data);
        }
      } catch (err) {
        console.error(
          "Properties loading error:",
          err,
        );

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Properties load nahi ho paayi.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    initialLoad();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleRefresh() {
    try {
      setRefreshing(true);
      setError("");

      const data = await fetchProperties();

      setProperties(data);
    } catch (err) {
      console.error(
        "Properties refresh error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Properties refresh nahi ho paayi.",
      );
    } finally {
      setRefreshing(false);
    }
  }

  async function handleDelete(property: Property) {
    if (deletingId !== null) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${property.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(property.id);
      setError("");

      const supabase = createClient();

      const { error: deleteError } = await supabase
        .from("properties")
        .delete()
        .eq("id", property.id);

      if (deleteError) {
        throw new Error(deleteError.message);
      }

      setProperties((current) =>
        current.filter(
          (item) => item.id !== property.id,
        ),
      );
    } catch (err) {
      console.error(
        "Property delete error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Property delete nahi ho paayi.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  const filteredProperties = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return properties;
    }

    return properties.filter((property) => {
      return (
        (property.title || "")
          .toLowerCase()
          .includes(query) ||
        (property.location || "")
          .toLowerCase()
          .includes(query) ||
        (property.category || "")
          .toLowerCase()
          .includes(query) ||
        (property.slug || "")
          .toLowerCase()
          .includes(query) ||
        (property.status || "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [properties, search]);

  const totalProperties = properties.length;

  const publishedProperties = properties.filter(
    (property) =>
      property.status === "published",
  ).length;

  const draftProperties = properties.filter(
    (property) =>
      property.status === "draft",
  ).length;

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      {/* TOP BAR */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060806]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-[#d6b56a]/40 hover:text-[#d6b56a]"
            >
              <ArrowLeft size={17} />
            </Link>

            <div>
              <p className="text-[8px] uppercase tracking-[0.28em] text-[#d6b56a]">
                Admin Portal
              </p>

              <h1 className="mt-1 text-xl font-light sm:text-2xl">
                Properties
              </h1>
            </div>
          </div>

          <Link
            href="/admin/properties/new"
            className="flex items-center gap-2 rounded-full bg-[#d6b56a] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#050605] transition hover:scale-[1.03]"
          >
            <Plus size={15} />

            <span className="hidden sm:inline">
              Add Property
            </span>

            <span className="sm:hidden">
              Add
            </span>
          </Link>
        </div>
      </header>

      {/* CONTENT */}

      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* HEADER */}

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#d6b56a]" />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                Property Management
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-light tracking-[-0.03em] sm:text-5xl">
              Manage{" "}
              <span className="text-[#d6b56a]">
                Residences.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              View and manage properties displayed
              across the NestVille website.
            </p>
          </div>

          {/* SEARCH */}

          <div className="flex w-full gap-3 lg:max-w-[430px]">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search properties..."
                className="h-13 w-full rounded-full border border-white/10 bg-white/[0.03] py-4 pl-11 pr-5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6b56a]/40"
              />
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh"
              className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/45 transition hover:border-[#d6b56a]/40 hover:text-[#d6b56a] disabled:opacity-40"
            >
              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />
            </button>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-5">
            <p className="text-sm text-red-200/80">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRefresh}
              className="mt-4 rounded-full border border-white/10 px-4 py-2 text-[9px] uppercase tracking-[0.18em] text-white/60 transition hover:border-[#d6b56a]/40 hover:text-[#d6b56a]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* STATS */}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total Properties"
            value={totalProperties}
          />

          <SummaryCard
            label="Published"
            value={publishedProperties}
          />

          <SummaryCard
            label="Draft"
            value={draftProperties}
          />
        </div>

        {/* TABLE */}

        <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <Building2
                size={17}
                className="text-[#d6b56a]"
              />

              <p className="text-sm text-white/75">
                Property Inventory
              </p>
            </div>

            <p className="text-[9px] uppercase tracking-[0.18em] text-white/30">
              {filteredProperties.length} results
            </p>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="divide-y divide-white/[0.06]">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-5 px-6 py-6"
                >
                  <div className="h-14 w-20 animate-pulse rounded-xl bg-white/[0.06]" />

                  <div className="flex-1 space-y-3">
                    <div className="h-3 w-48 animate-pulse rounded bg-white/[0.06]" />

                    <div className="h-2 w-32 animate-pulse rounded bg-white/[0.04]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* DESKTOP */}

          {!loading && (
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.07] text-left">
                    <TableHeading>
                      Property
                    </TableHeading>

                    <TableHeading>
                      Category
                    </TableHeading>

                    <TableHeading>
                      Price
                    </TableHeading>

                    <TableHeading>
                      Details
                    </TableHeading>

                    <TableHeading>
                      Status
                    </TableHeading>

                    <th className="px-6 py-4 text-right text-[8px] font-medium uppercase tracking-[0.2em] text-white/30">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProperties.map(
                    (property) => (
                      <tr
                        key={property.id}
                        className="border-b border-white/[0.06] last:border-none hover:bg-white/[0.02]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                              {property.image ? (
                                <img
                                  src={property.image}
                                  alt={property.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <Building2
                                    size={18}
                                    className="text-white/15"
                                  />
                                </div>
                              )}
                            </div>

                            <div>
                              <p className="text-sm text-white">
                                {property.title}
                              </p>

                              <p className="mt-1 text-xs text-white/35">
                                {property.location}
                              </p>

                              <p className="mt-1 text-[9px] text-white/20">
                                /{property.slug}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm text-white/50">
                          {property.category ||
                            "—"}
                        </td>

                        <td className="px-6 py-5 text-sm text-[#d6b56a]">
                          {property.price ||
                            "—"}
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-xs text-white/45">
                            {property.bedrooms}{" "}
                            Beds ·{" "}
                            {property.bathrooms}{" "}
                            Baths
                          </p>

                          <p className="mt-1 text-xs text-white/30">
                            {property.area ||
                              "—"}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <StatusBadge
                            status={
                              property.status
                            }
                          />

                          {property.featured && (
                            <span className="ml-2 rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.15em] text-[#d6b56a]">
                              Featured
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <ActionLink
                              href={`/properties/${property.slug}`}
                              label="View"
                            >
                              <Eye size={15} />
                            </ActionLink>

                            <ActionLink
                              href={`/admin/properties/${property.slug}/edit`}
                              label="Edit"
                            >
                              <Edit3 size={15} />
                            </ActionLink>

                            <DeleteButton
                              loading={
                                deletingId ===
                                property.id
                              }
                              onClick={() =>
                                handleDelete(
                                  property,
                                )
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* MOBILE */}

          {!loading && (
            <div className="divide-y divide-white/[0.07] md:hidden">
              {filteredProperties.map(
                (property) => (
                  <div
                    key={property.id}
                    className="p-5"
                  >
                    <div className="flex gap-4">
                      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                        {property.image ? (
                          <img
                            src={property.image}
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Building2
                              size={18}
                              className="text-white/15"
                            />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-base text-white">
                              {property.title}
                            </p>

                            <p className="mt-1 text-xs text-white/35">
                              {property.location}
                            </p>
                          </div>

                          <span className="shrink-0 text-sm text-[#d6b56a]">
                            {property.price}
                          </span>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          <MiniBadge>
                            {property.category ||
                              "Property"}
                          </MiniBadge>

                          <MiniBadge>
                            {property.bedrooms}{" "}
                            Beds
                          </MiniBadge>

                          <MiniBadge>
                            {property.bathrooms}{" "}
                            Baths
                          </MiniBadge>

                          <StatusBadge
                            status={
                              property.status
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <ActionLink
                        href={`/properties/${property.slug}`}
                        label="View"
                      >
                        <Eye size={15} />
                      </ActionLink>

                      <ActionLink
                        href={`/admin/properties/${property.slug}/edit`}
                        label="Edit"
                      >
                        <Edit3 size={15} />
                      </ActionLink>

                      <DeleteButton
                        loading={
                          deletingId ===
                          property.id
                        }
                        onClick={() =>
                          handleDelete(
                            property,
                          )
                        }
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          )}

          {/* EMPTY */}

          {!loading &&
            filteredProperties.length ===
              0 && (
              <div className="px-6 py-20 text-center">
                <Building2
                  size={30}
                  className="mx-auto text-white/15"
                />

                <p className="mt-4 text-sm text-white/35">
                  {search
                    ? "No properties match your search."
                    : "No properties found."}
                </p>

                {!search && (
                  <Link
                    href="/admin/properties/new"
                    className="mt-5 inline-flex rounded-full bg-[#d6b56a] px-6 py-3 text-[9px] uppercase tracking-[0.18em] text-black"
                  >
                    Add Property
                  </Link>
                )}
              </div>
            )}
        </div>
      </div>
    </main>
  );
}

/* SUMMARY CARD */

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5">
      <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
        {label}
      </p>

      <p className="mt-3 text-3xl font-light text-white">
        {value}
      </p>
    </div>
  );
}

/* TABLE HEADING */

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

/* ACTION LINK */

function ActionLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40 transition hover:border-[#d6b56a]/35 hover:bg-[#d6b56a]/10 hover:text-[#d6b56a]"
    >
      {children}
    </Link>
  );
}

/* DELETE BUTTON */

function DeleteButton({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title="Delete"
      disabled={loading}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/35 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {loading ? (
        <RefreshCw
          size={14}
          className="animate-spin"
        />
      ) : (
        <Trash2 size={15} />
      )}
    </button>
  );
}

/* STATUS */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const published =
    status === "published";

  return (
    <span
      className={
        published
          ? "rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.15em] text-emerald-300"
          : "rounded-full border border-amber-400/15 bg-amber-400/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.15em] text-amber-300"
      }
    >
      {status || "draft"}
    </span>
  );
}

/* MOBILE BADGE */

function MiniBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] text-white/40">
      {children}
    </span>
  );
}