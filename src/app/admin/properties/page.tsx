"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Building2,
  Edit3,
  Eye,
  Plus,
  Search,
  Trash2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

interface Property {
  id: number;
  slug: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  category: string;
  description: string;
  status: string;
  featured: boolean;
  created_at: string;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] =
    useState<Property[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      setError("");

      const supabase = createClient();

      const {
        data,
        error: fetchError,
      } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (fetchError) {
        console.error(
          "Properties fetch error:",
          fetchError
        );

        setError(
          "Properties load nahi ho paayi."
        );

        setLoading(false);
        return;
      }

      setProperties(
        (data ?? []) as Property[]
      );

      setLoading(false);
    }

    loadProperties();
  }, []);

  const filteredProperties =
    useMemo(() => {
      const query = search
        .trim()
        .toLowerCase();

      if (!query) {
        return properties;
      }

      return properties.filter(
        (property) =>
          property.title
            .toLowerCase()
            .includes(query) ||
          property.location
            .toLowerCase()
            .includes(query) ||
          property.category
            .toLowerCase()
            .includes(query) ||
          property.status
            .toLowerCase()
            .includes(query)
      );
    }, [properties, search]);

  const publishedCount =
    properties.filter(
      (property) =>
        property.status === "published"
    ).length;

  const draftCount =
    properties.filter(
      (property) =>
        property.status === "draft"
    ).length;

  async function handleDelete(
    property: Property
  ) {
    const confirmed =
      window.confirm(
        `Delete "${property.title}"?`
      );

    if (!confirmed) return;

    setDeletingId(property.id);

    const supabase = createClient();

    const { error: deleteError } =
      await supabase
        .from("properties")
        .delete()
        .eq("id", property.id);

    if (deleteError) {
      console.error(
        "Property delete error:",
        deleteError
      );

      alert(
        `Delete failed: ${deleteError.message}`
      );

      setDeletingId(null);
      return;
    }

    setProperties((current) =>
      current.filter(
        (item) =>
          item.id !== property.id
      )
    );

    setDeletingId(null);
  }

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      {/* TOP BAR */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060806]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white/50
                transition-all
                hover:border-[#d6b56a]/40
                hover:text-[#d6b56a]
              "
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
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-[#d6b56a]
              px-5
              py-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#050605]
              transition-transform
              hover:scale-[1.03]
            "
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
        {/* PAGE HEADING */}

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#d6b56a]" />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                Property Management
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-light tracking-[-0.03em] sm:text-5xl">
              Manage

              <span className="text-[#d6b56a]">
                {" "}
                Residences.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              View and manage properties stored
              in the NestVille database.
            </p>
          </div>

          {/* SEARCH */}

          <div className="relative w-full lg:max-w-[360px]">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search properties..."
              className="
                w-full
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                py-4
                pl-11
                pr-5
                text-sm
                text-white
                outline-none
                transition-all
                placeholder:text-white/25
                focus:border-[#d6b56a]/40
              "
            />
          </div>
        </div>

        {/* STATS */}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total Properties"
            value={properties.length}
          />

          <SummaryCard
            label="Published"
            value={publishedCount}
          />

          <SummaryCard
            label="Draft"
            value={draftCount}
          />
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-[20px] border border-red-400/15 bg-red-400/[0.06] p-5 text-sm text-red-300">
            {error}
          </div>
        )}

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
              {filteredProperties.length}{" "}
              results
            </p>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="px-6 py-20 text-center">
              <p className="text-sm text-white/35">
                Loading properties...
              </p>
            </div>
          )}

          {!loading && (
            <>
              {/* DESKTOP */}

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
                          className="
                            border-b
                            border-white/[0.06]
                            transition-colors
                            last:border-none
                            hover:bg-white/[0.02]
                          "
                        >
                          <td className="px-6 py-5">
                            <p className="text-sm text-white">
                              {
                                property.title
                              }
                            </p>

                            <p className="mt-1 text-xs text-white/35">
                              {
                                property.location
                              }
                            </p>
                          </td>

                          <td className="px-6 py-5 text-sm text-white/50">
                            {
                              property.category
                            }
                          </td>

                          <td className="px-6 py-5 text-sm text-[#d6b56a]">
                            {
                              property.price
                            }
                          </td>

                          <td className="px-6 py-5">
                            <p className="text-xs text-white/45">
                              {
                                property.bedrooms
                              }{" "}
                              Beds ·{" "}
                              {
                                property.bathrooms
                              }{" "}
                              Baths
                            </p>

                            <p className="mt-1 text-xs text-white/30">
                              {
                                property.area
                              }
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <StatusBadge
                              status={
                                property.status
                              }
                            />
                          </td>

                          <td className="px-6 py-5">
                            <div className="flex justify-end gap-2">
                              <ActionLink
                                href={`/properties/${property.slug}`}
                                label="View"
                              >
                                <Eye
                                  size={
                                    15
                                  }
                                />
                              </ActionLink>

                              <ActionLink
                                href={`/admin/properties/${property.slug}/edit`}
                                label="Edit"
                              >
                                <Edit3
                                  size={
                                    15
                                  }
                                />
                              </ActionLink>

                              <button
                                type="button"
                                title="Delete"
                                disabled={
                                  deletingId ===
                                  property.id
                                }
                                onClick={() =>
                                  handleDelete(
                                    property
                                  )
                                }
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                  border-white/10
                                  text-white/35
                                  transition-all
                                  hover:border-red-400/30
                                  hover:bg-red-400/10
                                  hover:text-red-300
                                  disabled:cursor-wait
                                  disabled:opacity-30
                                "
                              >
                                <Trash2
                                  size={15}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* MOBILE */}

              <div className="divide-y divide-white/[0.07] md:hidden">
                {filteredProperties.map(
                  (property) => (
                    <div
                      key={property.id}
                      className="p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-base text-white">
                            {
                              property.title
                            }
                          </p>

                          <p className="mt-1 text-xs text-white/35">
                            {
                              property.location
                            }
                          </p>
                        </div>

                        <span className="text-sm text-[#d6b56a]">
                          {
                            property.price
                          }
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <MiniBadge>
                          {
                            property.category
                          }
                        </MiniBadge>

                        <MiniBadge>
                          {
                            property.bedrooms
                          }{" "}
                          Beds
                        </MiniBadge>

                        <MiniBadge>
                          {
                            property.bathrooms
                          }{" "}
                          Baths
                        </MiniBadge>
                      </div>

                      <div className="mt-4">
                        <StatusBadge
                          status={
                            property.status
                          }
                        />
                      </div>

                      <div className="mt-5 flex items-center gap-2">
                        <ActionLink
                          href={`/properties/${property.slug}`}
                          label="View"
                        >
                          <Eye
                            size={15}
                          />
                        </ActionLink>

                        <ActionLink
                          href={`/admin/properties/${property.slug}/edit`}
                          label="Edit"
                        >
                          <Edit3
                            size={15}
                          />
                        </ActionLink>

                        <button
                          type="button"
                          disabled={
                            deletingId ===
                            property.id
                          }
                          onClick={() =>
                            handleDelete(
                              property
                            )
                          }
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            text-white/35
                            transition-colors
                            hover:border-red-400/30
                            hover:text-red-300
                            disabled:opacity-30
                          "
                        >
                          <Trash2
                            size={15}
                          />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>

              {filteredProperties.length ===
                0 && (
                <div className="px-6 py-20 text-center">
                  <Building2
                    size={30}
                    className="mx-auto text-white/15"
                  />

                  <p className="mt-4 text-sm text-white/35">
                    No properties found.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

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
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        text-white/40
        transition-all
        hover:border-[#d6b56a]/35
        hover:bg-[#d6b56a]/10
        hover:text-[#d6b56a]
      "
    >
      {children}
    </Link>
  );
}

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

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const published =
    status === "published";

  return (
    <span
      className={`
        inline-flex
        rounded-full
        border
        px-3
        py-1.5
        text-[8px]
        uppercase
        tracking-[0.15em]

        ${
          published
            ? "border-emerald-400/15 bg-emerald-400/10 text-emerald-300"
            : "border-[#d6b56a]/20 bg-[#d6b56a]/10 text-[#d6b56a]"
        }
      `}
    >
      {status}
    </span>
  );
}