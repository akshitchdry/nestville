import Link from "next/link";
import {
  Building2,
  Heart,
  Home,
  LayoutDashboard,
  Mail,
  Settings,
  UserRound,
} from "lucide-react";

import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#050605] text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        {/* SIDEBAR */}
        <aside className="hidden border-r border-white/10 bg-[#080a08] lg:block">
          <div className="sticky top-0 flex min-h-screen flex-col p-6">
            <Link
              href="/"
              className="flex items-center gap-3 border-b border-white/10 pb-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6b56a]/30 text-[#d6b56a]">
                N
              </div>

              <div>
                <p className="text-sm tracking-[0.22em] text-[#e4cc93]">
                  NESTVILLE
                </p>

                <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-white/30">
                  Admin Portal
                </p>
              </div>
            </Link>

            <nav className="mt-8 space-y-2">
              <SidebarLink
                href="/admin"
                icon={<LayoutDashboard size={17} />}
                label="Dashboard"
                active
              />

              <SidebarLink
                href="/admin/properties"
                icon={<Building2 size={17} />}
                label="Properties"
              />

              <SidebarLink
                href="/admin/enquiries"
                icon={<Mail size={17} />}
                label="Enquiries"
              />

              <SidebarLink
                href="/admin/listings"
                icon={<Home size={17} />}
                label="Listing Requests"
              />

              <SidebarLink
                href="/admin/users"
                icon={<UserRound size={17} />}
                label="Users"
              />

              <SidebarLink
                href="/admin/favourites"
                icon={<Heart size={17} />}
                label="Favourites"
              />

              <SidebarLink
                href="/admin/settings"
                icon={<Settings size={17} />}
                label="Settings"
              />
            </nav>

            <div className="mt-auto border-t border-white/10 pt-6">
              <p className="text-[8px] uppercase tracking-[0.22em] text-white/25">
                NestVille Admin
              </p>

              <p className="mt-2 text-xs text-white/45">
                Property management console
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <section>
          {/* TOPBAR */}
          <header className="border-b border-white/10 bg-[#060806]/80 px-5 py-5 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.28em] text-[#d6b56a]">
                  Admin Dashboard
                </p>

                <h1 className="mt-2 text-2xl font-light text-white sm:text-3xl">
                  Welcome back
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="
                    rounded-full
                    border
                    border-white/10
                    px-5
                    py-3
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-white/55
                    transition-all
                    hover:border-[#d6b56a]/40
                    hover:text-[#d6b56a]
                  "
                >
                  View Website
                </Link>

                <AdminLogoutButton />
              </div>
            </div>
          </header>

          {/* CONTENT */}
          <div className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            {/* STATS */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Total Properties"
                value="128"
                change="+12 this month"
              />

              <StatCard
                label="Active Enquiries"
                value="42"
                change="+8 today"
              />

              <StatCard
                label="Listing Requests"
                value="17"
                change="6 awaiting review"
              />

              <StatCard
                label="Registered Users"
                value="684"
                change="+31 this week"
              />
            </div>

            {/* CONTENT GRID */}
            <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              {/* RECENT PROPERTIES */}
              <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.22em] text-[#d6b56a]">
                      Properties
                    </p>

                    <h2 className="mt-2 text-2xl font-light">
                      Recent Properties
                    </h2>
                  </div>

                  <Link
                    href="/admin/properties"
                    className="text-[9px] uppercase tracking-[0.18em] text-white/40 transition-colors hover:text-[#d6b56a]"
                  >
                    View All
                  </Link>
                </div>

                <div className="mt-6 space-y-3">
                  <PropertyRow
                    title="The Aurelia Estate"
                    location="Palm Jumeirah, Dubai"
                    price="$6.2M"
                    status="Published"
                  />

                  <PropertyRow
                    title="The Horizon Villa"
                    location="Beverly Hills, California"
                    price="$4.8M"
                    status="Published"
                  />

                  <PropertyRow
                    title="Oceanview Mansion"
                    location="Malibu, California"
                    price="$9.5M"
                    status="Draft"
                  />
                </div>
              </div>

              {/* RECENT ENQUIRIES */}
              <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.22em] text-[#d6b56a]">
                    Enquiries
                  </p>

                  <h2 className="mt-2 text-2xl font-light">
                    Recent Leads
                  </h2>
                </div>

                <div className="mt-6 space-y-4">
                  <LeadRow
                    name="Aarav Sharma"
                    property="The Celestia"
                    time="12 min ago"
                  />

                  <LeadRow
                    name="Sophia Miller"
                    property="Aurelia Bay"
                    time="38 min ago"
                  />

                  <LeadRow
                    name="Rohan Mehta"
                    property="Oceanview Mansion"
                    time="1 hr ago"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        gap-3
        rounded-2xl
        px-4
        py-3
        text-sm
        transition-all
        ${
          active
            ? "bg-[#d6b56a]/10 text-[#e6ca86]"
            : "text-white/45 hover:bg-white/[0.04] hover:text-white"
        }
      `}
    >
      {icon}
      {label}
    </Link>
  );
}

function StatCard({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-6">
      <p className="text-[8px] uppercase tracking-[0.22em] text-white/30">
        {label}
      </p>

      <p className="mt-4 text-4xl font-light text-white">
        {value}
      </p>

      <p className="mt-3 text-xs text-[#d6b56a]">
        {change}
      </p>
    </div>
  );
}

function PropertyRow({
  title,
  location,
  price,
  status,
}: {
  title: string;
  location: string;
  price: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="min-w-0">
        <p className="truncate text-sm text-white">
          {title}
        </p>

        <p className="mt-1 truncate text-xs text-white/35">
          {location}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm text-[#d6b56a]">
          {price}
        </p>

        <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-white/30">
          {status}
        </p>
      </div>
    </div>
  );
}

function LeadRow({
  name,
  property,
  time,
}: {
  name: string;
  property: string;
  time: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm text-white">
        {name}
      </p>

      <p className="mt-1 text-xs text-white/40">
        Interested in {property}
      </p>

      <p className="mt-3 text-[8px] uppercase tracking-[0.18em] text-[#d6b56a]">
        {time}
      </p>
    </div>
  );
}