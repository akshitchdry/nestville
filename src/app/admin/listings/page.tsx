"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  Search,
  X,
  RefreshCw,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type ListingRequest = {
  id: number | string;
  owner: string | null;
  email: string | null;
  phone: string | null;
  title: string | null;
  location: string | null;
  type: string | null;
  price: string | null;
  bedrooms: string | null;
  area: string | null;
  status: string | null;
};

export default function AdminListingsPage() {
  const supabase = createClient();

  const [requests, setRequests] = useState<ListingRequest[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<number | string | null>(null);

  /* =========================
     LOAD LISTING REQUESTS
  ========================= */

  const loadRequests = useCallback(async () => {
    try {
      setError("");

      const { data, error: fetchError } = await supabase
        .from("listing_requests")
        .select(
          `
            id,
            owner,
            email,
            phone,
            title,
            location,
            type,
            price,
            bedrooms,
            area,
            status
          `
        )
        .order("id", { ascending: false });

      if (fetchError) {
        console.error("Listing requests load error:", fetchError);
        setError(fetchError.message);
        return;
      }

      setRequests((data as ListingRequest[]) || []);
    } catch (err) {
      console.error("Listing requests error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load listing requests."
      );
    }
  }, [supabase]);

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      await loadRequests();
      setLoading(false);
    };

    run();
  }, [loadRequests]);

  /* =========================
     REFRESH
  ========================= */

  async function handleRefresh() {
    setRefreshing(true);
    await loadRequests();
    setRefreshing(false);
  }

  /* =========================
     APPROVE / REJECT
  ========================= */

  async function updateStatus(
    id: number | string,
    status: "approved" | "rejected"
  ) {
    try {
      setUpdatingId(id);
      setError("");

      const { error: updateError } = await supabase
        .from("listing_requests")
        .update({
          status,
        })
        .eq("id", id);

      if (updateError) {
        console.error(
          "Listing request update error:",
          updateError
        );

        setError(updateError.message);
        return;
      }

      setRequests((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );
    } catch (err) {
      console.error("Status update error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to update request."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  /* =========================
     SEARCH
  ========================= */

  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) {
      return requests;
    }

    return requests.filter((item) => {
      const searchableText = [
        item.owner ?? "",
        item.email ?? "",
        item.phone ?? "",
        item.title ?? "",
        item.location ?? "",
        item.type ?? "",
        item.price ?? "",
        item.bedrooms ?? "",
        item.area ?? "",
        item.status ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(value);
    });
  }, [query, requests]);

  /* =========================
     STATS
  ========================= */

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (item) => (item.status ?? "").toLowerCase() === "pending"
  ).length;

  const approvedRequests = requests.filter(
    (item) => (item.status ?? "").toLowerCase() === "approved"
  ).length;

  const rejectedRequests = requests.filter(
    (item) => (item.status ?? "").toLowerCase() === "rejected"
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
                Listing Requests
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-[8px] uppercase tracking-[0.15em] text-white/45 transition-all hover:border-[#d6b56a]/30 hover:text-[#d6b56a] disabled:opacity-40"
          >
            <RefreshCw
              size={13}
              className={refreshing ? "animate-spin" : ""}
            />

            Refresh
          </button>
        </div>
      </header>

      {/* CONTENT */}

      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">
        {/* TITLE + SEARCH */}

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#d6b56a]" />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                Property Submissions
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-light tracking-[-0.035em] sm:text-5xl">
              Review
              <span className="text-[#d6b56a]">
                {" "}
                Listings.
              </span>
            </h2>
          </div>

          <div className="relative w-full lg:max-w-[360px]">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              value={query}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              placeholder="Search listing requests..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-4 pl-11 pr-5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6b56a]/40"
            />
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-5">
            <p className="text-sm text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRefresh}
              className="mt-3 text-[8px] uppercase tracking-[0.15em] text-[#d6b56a]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* STATS */}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label="Total Requests"
            value={totalRequests}
          />

          <Stat
            label="Pending"
            value={pendingRequests}
          />

          <Stat
            label="Approved"
            value={approvedRequests}
          />

          <Stat
            label="Rejected"
            value={rejectedRequests}
          />
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.025] py-20 text-center">
            <RefreshCw
              size={24}
              className="mx-auto animate-spin text-[#d6b56a]"
            />

            <p className="mt-4 text-sm text-white/35">
              Loading listing requests...
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {/* RESULTS */}

            {filtered.map((item) => {
              const status =
                (item.status ?? "pending").toLowerCase();

              const isPending = status === "pending";
              const isApproved = status === "approved";

              return (
                <article
                  key={item.id}
                  className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 transition-all hover:border-white/15 sm:p-6"
                >
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                    {/* INFO */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-light text-white">
                          {item.title || "Untitled Property"}
                        </h3>

                        <StatusBadge
                          status={status}
                        />
                      </div>

                      <p className="mt-2 text-sm text-white/40">
                        Submitted by{" "}
                        <span className="text-white/70">
                          {item.owner || "Unknown owner"}
                        </span>
                      </p>

                      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <Info
                          label="Location"
                          value={
                            item.location || "Not provided"
                          }
                        />

                        <Info
                          label="Type"
                          value={
                            item.type || "Not provided"
                          }
                        />

                        <Info
                          label="Price"
                          value={
                            item.price || "Not provided"
                          }
                        />

                        <Info
                          label="Bedrooms"
                          value={
                            item.bedrooms || "Not provided"
                          }
                        />
                      </div>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <Info
                          label="Area"
                          value={
                            item.area || "Not provided"
                          }
                        />

                        <Info
                          label="Contact"
                          value={
                            item.email ||
                            item.phone ||
                            "Not provided"
                          }
                        />
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-[8px] uppercase tracking-[0.15em] text-white/45 transition-all hover:border-[#d6b56a]/30 hover:text-[#d6b56a]"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      {isPending && (
                        <>
                          <button
                            type="button"
                            disabled={
                              updatingId === item.id
                            }
                            onClick={() =>
                              updateStatus(
                                item.id,
                                "approved"
                              )
                            }
                            className="flex h-10 items-center gap-2 rounded-full bg-[#d6b56a] px-4 text-[8px] font-semibold uppercase tracking-[0.15em] text-black disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Check size={14} />

                            {updatingId === item.id
                              ? "Updating..."
                              : "Approve"}
                          </button>

                          <button
                            type="button"
                            disabled={
                              updatingId === item.id
                            }
                            onClick={() =>
                              updateStatus(
                                item.id,
                                "rejected"
                              )
                            }
                            className="flex h-10 items-center gap-2 rounded-full border border-red-400/20 bg-red-400/[0.06] px-4 text-[8px] uppercase tracking-[0.15em] text-red-300 disabled:opacity-40"
                          >
                            <X size={14} />
                            Reject
                          </button>
                        </>
                      )}

                      {isApproved && (
                        <span className="flex h-10 items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 text-[8px] uppercase tracking-[0.15em] text-emerald-300">
                          Approved
                        </span>
                      )}

                      {status === "rejected" && (
                        <span className="flex h-10 items-center rounded-full border border-red-400/20 bg-red-400/10 px-4 text-[8px] uppercase tracking-[0.15em] text-red-300">
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}

            {/* EMPTY */}

            {filtered.length === 0 && (
              <div className="rounded-[24px] border border-white/10 bg-white/[0.025] py-20 text-center">
                <p className="text-sm text-white/35">
                  {query
                    ? "No listing requests match your search."
                    : "No listing requests found."}
                </p>
              </div>
            )}
          </div>
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

      <p className="mt-3 text-3xl font-light text-white">
        {value}
      </p>
    </div>
  );
}

/* =========================
   STATUS
========================= */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  if (status === "approved") {
    return (
      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-emerald-300">
        Approved
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-red-300">
        Rejected
      </span>
    );
  }

  return (
    <span className="rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/10 px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] text-[#d6b56a]">
      Pending
    </span>
  );
}

/* =========================
   INFO
========================= */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] border border-white/[0.07] bg-black/20 p-4">
      <p className="text-[7px] uppercase tracking-[0.18em] text-white/25">
        {label}
      </p>

      <p className="mt-2 truncate text-sm text-white/65">
        {value}
      </p>
    </div>
  );
}