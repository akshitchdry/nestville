"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;

    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error.message);
        setLoading(false);
        return;
      }

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="
        group
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-white/[0.03]
        px-4
        py-3
        text-[9px]
        uppercase
        tracking-[0.18em]
        text-white/45
        transition-all
        duration-300
        hover:border-red-400/30
        hover:bg-red-400/[0.07]
        hover:text-red-300
        disabled:cursor-wait
        disabled:opacity-50
      "
    >
      <LogOut
        size={14}
        className="
          transition-transform
          duration-300
          group-hover:translate-x-0.5
        "
      />

      {loading ? "Signing Out..." : "Logout"}
    </button>
  );
}