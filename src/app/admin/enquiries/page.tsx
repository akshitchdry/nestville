"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Search,
  Phone,
  MapPin,
} from "lucide-react";

const enquiries = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    property: "The Celestia",
    location: "Dubai",
    status: "New",
    date: "Today, 11:20 AM",
  },
  {
    id: 2,
    name: "Sophia Miller",
    email: "sophia@example.com",
    phone: "+44 7700 900123",
    property: "Aurelia Bay",
    location: "Palm Jumeirah",
    status: "Contacted",
    date: "Today, 10:10 AM",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan@example.com",
    phone: "+91 98111 22334",
    property: "Oceanview Mansion",
    location: "Malibu",
    status: "New",
    date: "Yesterday",
  },
];

export default function AdminEnquiriesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.toLowerCase().trim();

    if (!value) return enquiries;

    return enquiries.filter((item) =>
      [
        item.name,
        item.email,
        item.phone,
        item.property,
        item.location,
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
                Enquiries
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
                Lead Management
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-light tracking-[-0.035em] sm:text-5xl">
              Client
              <span className="text-[#d6b56a]"> Enquiries.</span>
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
              placeholder="Search enquiries..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-4 pl-11 pr-5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d6b56a]/40"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat label="Total Enquiries" value={enquiries.length} />
          <Stat
            label="New"
            value={enquiries.filter((item) => item.status === "New").length}
          />
          <Stat
            label="Contacted"
            value={
              enquiries.filter((item) => item.status === "Contacted").length
            }
          />
        </div>

        <div className="mt-8 space-y-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5 sm:p-6"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-light">{item.name}</h3>

                    <span
                      className={`rounded-full px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] ${
                        item.status === "New"
                          ? "border border-[#d6b56a]/20 bg-[#d6b56a]/10 text-[#d6b56a]"
                          : "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-white/40">
                    Interested in{" "}
                    <span className="text-white/70">{item.property}</span>
                  </p>

                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/40">
                    <span className="flex items-center gap-2">
                      <Mail size={14} className="text-[#d6b56a]" />
                      {item.email}
                    </span>

                    <span className="flex items-center gap-2">
                      <Phone size={14} className="text-[#d6b56a]" />
                      {item.phone}
                    </span>

                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-[#d6b56a]" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">
                    {item.date}
                  </p>

                  <div className="flex gap-2">
                    <a
                      href={`tel:${item.phone}`}
                      className="rounded-full border border-white/10 px-4 py-2.5 text-[8px] uppercase tracking-[0.15em] text-white/50 transition-all hover:border-[#d6b56a]/30 hover:text-[#d6b56a]"
                    >
                      Call
                    </a>

                    <a
                      href={`mailto:${item.email}`}
                      className="rounded-full bg-[#d6b56a] px-4 py-2.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-black"
                    >
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] py-16 text-center text-sm text-white/35">
              No enquiries found.
            </div>
          )}
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

      <p className="mt-3 text-3xl font-light">{value}</p>
    </div>
  );
}