"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Search,
  Phone,
  MapPin,
  RefreshCw,
  Loader2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

interface Enquiry {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  property: string | null;
  location: string | null;
  status: string | null;
  message: string | null;
  created_at: string | null;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function fetchEnquiries() {
      setLoading(true);
      setError("");

      const supabase = createClient();

      const { data, error: fetchError } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (!mounted) return;

      if (fetchError) {
        console.error("Enquiries fetch error:", fetchError);
        setError(fetchError.message);
        setEnquiries([]);
        setLoading(false);
        return;
      }

      setEnquiries((data ?? []) as Enquiry[]);
      setLoading(false);
    }

    fetchEnquiries();

    return () => {
      mounted = false;
    };
  }, []);

  async function refreshEnquiries() {
    setRefreshing(true);
    setError("");

    const supabase = createClient();

    const { data, error: fetchError } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (fetchError) {
      console.error("Enquiries refresh error:", fetchError);
      setError(fetchError.message);
      setRefreshing(false);
      return;
    }

    setEnquiries((data ?? []) as Enquiry[]);
    setRefreshing(false);
  }

  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) {
      return enquiries;
    }

    return enquiries.filter((item) => {
      const searchableText = [
        item.name ?? "",
        item.email ?? "",
        item.phone ?? "",
        item.property ?? "",
        item.location ?? "",
        item.status ?? "",
        item.message ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(value);
    });
  }, [query, enquiries]);

  const totalCount = enquiries.length;

  const newCount = enquiries.filter(
    (item) => (item.status ?? "").toLowerCase() === "new"
  ).length;

  const contactedCount = enquiries.filter(
    (item) => (item.status ?? "").toLowerCase() === "contacted"
  ).length;

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060806]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/45 transition-all hover:border-[#d6b56a]/40 hover:text-[#d6b56a]"
            >
              <ArrowLeft size={17} />
            </Link>

            <div>
              <p className="text-[8px] uppercase tracking-[0.28em] text-[#d6b56a]">
                Admin Portal
              </p>

              <h1 className="mt-1 text-xl font-light sm:text-2xl">
                Enquiries
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={refreshEnquiries}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-3 text-[9px] uppercase tracking-[0.16em] text-white/50 transition-all hover:border-[#d6b56a]/40 hover:text-[#d6b56a] disabled:cursor-wait disabled:opacity-40"
          >
            {refreshing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RefreshCw size={14} />
            )}

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">
        {/* HEADING */}
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#d6b56a]" />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                Lead Management
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-light tracking-[-0.035em] sm:text-5xl">
              Client
              <span className="text-[#d6b56a]">
                {" "}
                Enquiries.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              Manage enquiries received from the NestVille website.
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
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search enquiries..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-4 pl-11 pr-5 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#d6b56a]/40"
            />
          </div>
        </div>

        {/* STATS */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat
            label="Total Enquiries"
            value={totalCount}
          />

          <Stat
            label="New"
            value={newCount}
          />

          <Stat
            label="Contacted"
            value={contactedCount}
          />
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-8 rounded-[22px] border border-red-400/20 bg-red-400/[0.06] p-5">
            <p className="text-sm text-red-300">
              Enquiries load nahi ho paayi.
            </p>

            <p className="mt-2 break-all text-xs text-red-300/60">
              {error}
            </p>

            <button
              type="button"
              onClick={refreshEnquiries}
              className="mt-4 rounded-full border border-red-400/20 px-4 py-2 text-[8px] uppercase tracking-[0.15em] text-red-300 transition-all hover:bg-red-400/10"
            >
              Try Again
            </button>
          </div>
        )}

        {/* LIST */}
        <div className="mt-8 space-y-4">
          {/* LOADING */}
          {loading && (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] py-20 text-center">
              <Loader2
                size={25}
                className="mx-auto animate-spin text-[#d6b56a]"
              />

              <p className="mt-4 text-sm text-white/35">
                Loading enquiries...
              </p>
            </div>
          )}

          {/* DATA */}
          {!loading &&
            filtered.map((item) => (
              <article
                key={item.id}
                className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 transition-all hover:border-[#d6b56a]/20 sm:p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  {/* LEFT */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-light">
                        {item.name || "Unknown Client"}
                      </h3>

                      <StatusBadge
                        status={item.status || "New"}
                      />
                    </div>

                    <p className="mt-2 text-sm text-white/40">
                      Interested in{" "}
                      <span className="text-white/70">
                        {item.property || "Property enquiry"}
                      </span>
                    </p>

                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/40">
                      {item.email && (
                        <span className="flex items-center gap-2">
                          <Mail
                            size={14}
                            className="text-[#d6b56a]"
                          />

                          {item.email}
                        </span>
                      )}

                      {item.phone && (
                        <span className="flex items-center gap-2">
                          <Phone
                            size={14}
                            className="text-[#d6b56a]"
                          />

                          {item.phone}
                        </span>
                      )}

                      {item.location && (
                        <span className="flex items-center gap-2">
                          <MapPin
                            size={14}
                            className="text-[#d6b56a]"
                          />

                          {item.location}
                        </span>
                      )}
                    </div>

                    {item.message && (
                      <div className="mt-5 rounded-xl border border-white/[0.07] bg-black/20 p-4">
                        <p className="text-[8px] uppercase tracking-[0.18em] text-white/25">
                          Message
                        </p>

                        <p className="mt-2 text-xs leading-6 text-white/45">
                          {item.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* RIGHT */}
                  <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                      {formatDate(item.created_at)}
                    </p>

                    <div className="flex gap-2">
                      {item.phone && (
                        <a
                          href={`tel:${item.phone}`}
                          className="rounded-full border border-white/10 px-4 py-2.5 text-[8px] uppercase tracking-[0.15em] text-white/50 transition-all hover:border-[#d6b56a]/30 hover:text-[#d6b56a]"
                        >
                          Call
                        </a>
                      )}

                      {item.email && (
                        <a
                          href={`mailto:${item.email}`}
                          className="rounded-full bg-[#d6b56a] px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-black transition-transform hover:scale-[1.03]"
                        >
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}

          {/* EMPTY */}
          {!loading && filtered.length === 0 && (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] py-20 text-center">
              <Mail
                size={30}
                className="mx-auto text-white/15"
              />

              <p className="mt-4 text-sm text-white/35">
                {query
                  ? "No enquiries match your search."
                  : "No enquiries found."}
              </p>

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="mt-4 text-[9px] uppercase tracking-[0.18em] text-[#d6b56a]"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>

        {/* RESULT COUNT */}
        {!loading && filtered.length > 0 && (
          <p className="mt-5 text-right text-[9px] uppercase tracking-[0.18em] text-white/25">
            Showing {filtered.length} of {enquiries.length} enquiries
          </p>
        )}
      </section>
    </main>
  );
}

/* =========================
   STAT
========================= */

function Stat({
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

      <p className="mt-3 text-3xl font-light">
        {value}
      </p>
    </div>
  );
}

/* =========================
   STATUS BADGE
========================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized = status.toLowerCase();

  const isNew = normalized === "new";
  const isContacted = normalized === "contacted";

  let className =
    "border-white/10 bg-white/[0.04] text-white/50";

  if (isNew) {
    className =
      "border-[#d6b56a]/20 bg-[#d6b56a]/10 text-[#d6b56a]";
  }

  if (isContacted) {
    className =
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  }

  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] ${className}`}
    >
      {status}
    </span>
  );
}

/* =========================
   DATE FORMAT
========================= */

function formatDate(date: string | null) {
  if (!date) {
    return "Date unavailable";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}