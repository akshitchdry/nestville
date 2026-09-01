"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Heart,
  Mail,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  joined: string;
  favourites: number;
  enquiries: number;
  status: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/users", {
        method: "GET",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.error || "Failed to load users");
      }

      const mappedUsers: User[] = (result.users ?? []).map(
        (user: Record<string, unknown>) => ({
          id: String(user.id ?? ""),

          name:
            typeof user.name === "string"
              ? user.name
              : typeof user.full_name === "string"
                ? user.full_name
                : "Unnamed User",

          email: typeof user.email === "string" ? user.email : "",

          joined:
            typeof user.created_at === "string"
              ? new Date(user.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—",

          favourites: Number(user.favourites_count ?? user.favourites ?? 0),

          enquiries: Number(user.enquiries_count ?? user.enquiries ?? 0),

          status: user.status === "inactive" ? "Inactive" : "Active",
        }),
      );

      setUsers(mappedUsers);
    } catch (err) {
      console.error(err);

      setError(err instanceof Error ? err.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter((user) =>
      [user.name, user.email, user.status]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [query, users]);

  const activeUsers = users.filter((user) => user.status === "Active").length;

  const inactiveUsers = users.length - activeUsers;

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      {/* TOPBAR */}

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

              <h1 className="mt-1 text-xl font-light sm:text-2xl">Users</h1>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">
        {/* HEADER */}

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#d6b56a]" />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                User Management
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-light tracking-[-0.035em] sm:text-5xl">
              Registered
              <span className="text-[#d6b56a]"> Users.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              View registered users, their favourites and enquiry activity.
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
              placeholder="Search users..."
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-4 pl-11 pr-5 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#d6b56a]/40"
            />
          </div>
        </div>

        {/* STATS */}

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat label="Total Users" value={users.length} />

          <Stat label="Active Users" value={activeUsers} />

          <Stat label="Inactive Users" value={inactiveUsers} />
        </div>

        {/* ERROR */}

        {error && (
          <div className="mt-8 rounded-[22px] border border-red-400/20 bg-red-400/[0.05] p-5">
            <p className="text-sm text-red-300">Failed to load users</p>

            <p className="mt-2 text-xs text-red-300/60">{error}</p>

            <button
              type="button"
              onClick={loadUsers}
              className="mt-4 rounded-full border border-red-400/20 px-4 py-2 text-[8px] uppercase tracking-[0.15em] text-red-300 transition hover:bg-red-400/10"
            >
              Try Again
            </button>
          </div>
        )}

        {/* USER DIRECTORY */}

        <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-6">
            <div className="flex items-center gap-3">
              <UserRound size={17} className="text-[#d6b56a]" />

              <p className="text-sm text-white/70">User Directory</p>
            </div>

            <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
              {filteredUsers.length} results
            </p>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d6b56a]" />

              <p className="mt-5 text-sm text-white/35">Loading users...</p>
            </div>
          )}

          {/* DESKTOP */}

          {!loading && filteredUsers.length > 0 && (
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.07] text-left">
                    <Heading>User</Heading>
                    <Heading>Joined</Heading>
                    <Heading>Favourites</Heading>
                    <Heading>Enquiries</Heading>
                    <Heading>Status</Heading>
                    <Heading>Contact</Heading>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-white/[0.06] transition-colors last:border-none hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm text-white">{user.name}</p>

                        <p className="mt-1 text-xs text-white/35">
                          {user.email}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm text-white/45">
                        {user.joined}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm text-white/55">
                          <Heart size={14} className="text-[#d6b56a]" />

                          {user.favourites}
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-white/55">
                        {user.enquiries}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-[8px] uppercase tracking-[0.16em] ${
                            user.status === "Active"
                              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                              : "border-white/10 bg-white/[0.03] text-white/35"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {user.email ? (
                          <a
                            href={`mailto:${user.email}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/35 transition-all hover:border-[#d6b56a]/35 hover:bg-[#d6b56a]/10 hover:text-[#d6b56a]"
                          >
                            <Mail size={15} />
                          </a>
                        ) : (
                          <span className="text-xs text-white/20">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* MOBILE */}

          {!loading && filteredUsers.length > 0 && (
            <div className="divide-y divide-white/[0.07] md:hidden">
              {filteredUsers.map((user) => (
                <div key={user.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base text-white">{user.name}</p>

                      <p className="mt-1 text-xs text-white/35">{user.email}</p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-[8px] uppercase tracking-[0.14em] ${
                        user.status === "Active"
                          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                          : "border-white/10 bg-white/[0.03] text-white/35"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <MiniStat label="Joined" value={user.joined} />

                    <MiniStat label="Saved" value={String(user.favourites)} />

                    <MiniStat
                      label="Enquiries"
                      value={String(user.enquiries)}
                    />
                  </div>

                  {user.email && (
                    <a
                      href={`mailto:${user.email}`}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-[8px] uppercase tracking-[0.15em] text-white/45 hover:border-[#d6b56a]/30 hover:text-[#d6b56a]"
                    >
                      <Mail size={13} />
                      Email User
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* EMPTY */}

          {!loading && !error && filteredUsers.length === 0 && (
            <div className="py-20 text-center">
              <ShieldCheck size={32} className="mx-auto text-white/15" />

              <p className="mt-5 text-sm text-white/40">
                {query
                  ? "No users match your search."
                  : "No registered users found."}
              </p>

              <p className="mt-2 text-xs text-white/20">
                Registered users will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* STAT */

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.025] p-5">
      <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
        {label}
      </p>

      <p className="mt-3 text-3xl font-light">{value}</p>
    </div>
  );
}

/* TABLE HEADING */

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-4 text-[8px] font-medium uppercase tracking-[0.2em] text-white/30">
      {children}
    </th>
  );
}

/* MOBILE STAT */

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-white/[0.07] bg-black/20 p-3">
      <p className="text-[7px] uppercase tracking-[0.15em] text-white/25">
        {label}
      </p>

      <p className="mt-2 text-xs text-white/60">{value}</p>
    </div>
  );
}
