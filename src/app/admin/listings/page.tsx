"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  Search,
  X,
} from "lucide-react";

const listingRequests = [
  {
    id: 1,
    owner: "Karan Malhotra",
    email: "karan@example.com",
    phone: "+91 98765 43210",
    title: "Palm Crest Villa",
    location: "Dubai",
    type: "Luxury Villa",
    price: "$5.8M",
    bedrooms: "5",
    area: "7,900 sq.ft.",
    status: "Pending",
  },
  {
    id: 2,
    owner: "Ritika Arora",
    email: "ritika@example.com",
    phone: "+91 98111 22334",
    title: "Skyline Penthouse",
    location: "Gurugram",
    type: "Penthouse",
    price: "₹6.4 Cr",
    bedrooms: "4",
    area: "4,850 sq.ft.",
    status: "Pending",
  },
  {
    id: 3,
    owner: "Aditya Kapoor",
    email: "aditya@example.com",
    phone: "+91 99110 55443",
    title: "Serenity House",
    location: "Goa",
    type: "Villa",
    price: "₹8.2 Cr",
    bedrooms: "5",
    area: "6,200 sq.ft.",
    status: "Approved",
  },
];

export default function AdminListingsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) return listingRequests;

    return listingRequests.filter((item) =>
      [
        item.owner,
        item.title,
        item.location,
        item.type,
        item.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(value)
    );
  }, [query]);

  return (
    <main className="min-h-screen bg-[#050605] text-white">
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
        </div>
      </header>

      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">
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
              <span className="text-[#d6b56a]"> Listings.</span>
            </h2>
          </div>

          <div className="relative w-full lg:max-w-[360px]">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
            />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search listing requests..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-4 pl-11 pr-5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6b56a]/40"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat
            label="Total Requests"
            value={listingRequests.length}
          />

          <Stat
            label="Pending"
            value={
              listingRequests.filter(
                (item) => item.status === "Pending"
              ).length
            }
          />

          <Stat
            label="Approved"
            value={
              listingRequests.filter(
                (item) => item.status === "Approved"
              ).length
            }
          />
        </div>

        <div className="mt-8 space-y-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-light text-white">
                      {item.title}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] ${
                        item.status === "Approved"
                          ? "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                          : "border border-[#d6b56a]/20 bg-[#d6b56a]/10 text-[#d6b56a]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-white/40">
                    Submitted by{" "}
                    <span className="text-white/70">
                      {item.owner}
                    </span>
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <Info
                      label="Location"
                      value={item.location}
                    />

                    <Info
                      label="Type"
                      value={item.type}
                    />

                    <Info
                      label="Price"
                      value={item.price}
                    />

                    <Info
                      label="Bedrooms"
                      value={item.bedrooms}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="flex h-10 items-center gap-2 rounded-full border border-white/10 px-4 text-[8px] uppercase tracking-[0.15em] text-white/45 transition-all hover:border-[#d6b56a]/30 hover:text-[#d6b56a]"
                  >
                    <Eye size={14} />
                    View
                  </button>

                  {item.status === "Pending" && (
                    <>
                      <button
                        type="button"
                        className="flex h-10 items-center gap-2 rounded-full bg-[#d6b56a] px-4 text-[8px] font-semibold uppercase tracking-[0.15em] text-black"
                      >
                        <Check size={14} />
                        Approve
                      </button>

                      <button
                        type="button"
                        className="flex h-10 items-center gap-2 rounded-full border border-red-400/20 bg-red-400/[0.06] px-4 text-[8px] uppercase tracking-[0.15em] text-red-300"
                      >
                        <X size={14} />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

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

      <p className="mt-2 text-sm text-white/65">
        {value}
      </p>
    </div>
  );
}