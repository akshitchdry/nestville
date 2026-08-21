"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

import {
  Bath,
  BedDouble,
  Building2,
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
  WalletCards,
} from "lucide-react";

const properties = [
  {
    id: 1,
    slug: "the-grand-aria",
    title: "The Grand Aria",
    location: "Greater Noida",
    type: "Villa",
    mode: "Buy",
    price: "₹8.5 Cr",
    bedrooms: 4,
    bathrooms: 5,
    image: "/images/properties/property-1.jpg",
  },
  {
    id: 2,
    slug: "skyline-residence",
    title: "Skyline Residence",
    location: "Noida",
    type: "Apartment",
    mode: "Buy",
    price: "₹3.2 Cr",
    bedrooms: 3,
    bathrooms: 3,
    image: "/images/properties/property-2.jpg",
  },
  {
    id: 3,
    slug: "emerald-penthouse",
    title: "Emerald Penthouse",
    location: "Gurugram",
    type: "Penthouse",
    mode: "Rent",
    price: "₹2.5 L / Month",
    bedrooms: 4,
    bathrooms: 4,
    image: "/images/properties/property-3.jpg",
  },
  {
    id: 4,
    slug: "nestville-signature",
    title: "NestVille Signature",
    location: "Greater Noida",
    type: "Project",
    mode: "Projects",
    price: "₹4.8 Cr onwards",
    bedrooms: 3,
    bathrooms: 3,
    image: "/images/properties/property-4.jpg",
  },
];

const tabs = ["Buy", "Rent", "Projects"];

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState("Buy");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");
  const [bedrooms, setBedrooms] = useState("Any");

  const results = useMemo(() => {
    return properties.filter((property) => {
      const modeMatch = property.mode === activeTab;

      const keywordMatch =
        !keyword ||
        property.title
          .toLowerCase()
          .includes(keyword.toLowerCase()) ||
        property.location
          .toLowerCase()
          .includes(keyword.toLowerCase());

      const locationMatch =
        location === "All Locations" ||
        property.location === location;

      const typeMatch =
        type === "All Types" ||
        property.type === type;

      const bedroomMatch =
        bedrooms === "Any" ||
        property.bedrooms === Number(bedrooms);

      return (
        modeMatch &&
        keywordMatch &&
        locationMatch &&
        typeMatch &&
        bedroomMatch
      );
    });
  }, [
    activeTab,
    keyword,
    location,
    type,
    bedrooms,
  ]);

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden px-5 pb-14 pt-36 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-40 top-10 h-[600px] w-[600px] rounded-full bg-[#d6b56a]/10 blur-[190px]" />

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
                onClick={() => setActiveTab(tab)}
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
                className="text-[#d6b56a]"
              />

              <input
                value={keyword}
                onChange={(event) =>
                  setKeyword(event.target.value)
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
              options={[
                "All Locations",
                "Greater Noida",
                "Noida",
                "Gurugram",
              ]}
            />

            {/* TYPE */}

            <SelectField
              icon={<Building2 size={17} />}
              value={type}
              onChange={setType}
              options={[
                "All Types",
                "Villa",
                "Apartment",
                "Penthouse",
                "Project",
              ]}
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
              ]}
            />

            <button
              type="button"
              className="flex min-h-[64px] items-center justify-center gap-3 rounded-2xl bg-[#d6b56a] px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-black"
            >
              <SlidersHorizontal size={17} />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* RESULTS */}

      <section className="px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1450px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                Search Results
              </p>

              <h2 className="mt-2 text-2xl font-light">
                {results.length}{" "}
                {results.length === 1
                  ? "property"
                  : "properties"}{" "}
                found
              </h2>
            </div>

            <WalletCards
              size={20}
              className="text-[#d6b56a]"
            />
          </div>

          {results.length > 0 ? (
            <div className="mt-8 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {results.map((property) => (
                <article
                  key={property.id}
                  className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
                >
                  <div className="relative h-[280px] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[8px] uppercase tracking-[0.2em] backdrop-blur-xl">
                      {property.type}
                    </span>

                    <div className="absolute bottom-5 left-5">
                      <p className="flex items-center gap-2 text-xs text-white/55">
                        <MapPin
                          size={13}
                          className="text-[#d6b56a]"
                        />

                        {property.location}
                      </p>

                      <h3 className="mt-2 text-2xl font-light">
                        {property.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-6 border-b border-white/10 pb-5">
                      <span className="flex items-center gap-2 text-xs text-white/50">
                        <BedDouble
                          size={15}
                          className="text-[#d6b56a]"
                        />
                        {property.bedrooms} Beds
                      </span>

                      <span className="flex items-center gap-2 text-xs text-white/50">
                        <Bath
                          size={15}
                          className="text-[#d6b56a]"
                        />
                        {property.bathrooms} Baths
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-xl text-[#d6b56a]">
                        {property.price}
                      </p>

                      <Link
                        href={
                          property.mode === "Projects"
                            ? `/projects/${property.slug}`
                            : `/properties/${property.slug}`
                        }
                        className="text-[9px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-[#d6b56a]"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-[30px] border border-white/10 bg-white/[0.025] px-6 py-20 text-center">
              <Search
                size={28}
                className="mx-auto text-[#d6b56a]"
              />

              <h3 className="mt-5 text-3xl font-light">
                No properties found
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/40">
                Try changing the location, property type or
                bedroom filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

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
    <label className="relative flex min-h-[64px] items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4">
      <span className="text-[#d6b56a]">
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