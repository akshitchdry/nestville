"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  Globe,
  Lock,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

interface Settings {
  adminName: string;
  adminEmail: string;
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  notifications: boolean;
  enquiryAlerts: boolean;
}

const defaultSettings: Settings = {
  adminName: "",
  adminEmail: "",
  siteName: "NestVille",
  contactEmail: "info@nestville.com",
  contactPhone: "+91 00000 00000",
  notifications: true,
  enquiryAlerts: true,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] =
    useState<Settings>(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  /*
   * LOAD SETTINGS
   */

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const supabase = createClient();

        /* CURRENT USER */

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw new Error(userError.message);
        }

        if (!user) {
          throw new Error("Admin session not found.");
        }

        /* PROFILE */

        const { data: profile, error: profileError } =
          await supabase
            .from("profiles")
            .select("full_name, email")
            .eq("id", user.id)
            .maybeSingle();

        if (profileError) {
          console.error(
            "Profile load error:",
            profileError.message
          );
        }

        /* SITE SETTINGS */

        const {
          data: siteSettings,
          error: siteError,
        } = await supabase
          .from("site_settings")
          .select(
            "id, site_name, contact_email, contact_phone, notifications, enquiry_alerts"
          )
          .limit(1)
          .maybeSingle();

        if (siteError) {
          throw new Error(siteError.message);
        }

        if (!mounted) return;

        setSettings({
          adminName:
            profile?.full_name ??
            user.user_metadata?.full_name ??
            "",

          adminEmail:
            profile?.email ??
            user.email ??
            "",

          siteName:
            siteSettings?.site_name ??
            "NestVille",

          contactEmail:
            siteSettings?.contact_email ??
            "info@nestville.com",

          contactPhone:
            siteSettings?.contact_phone ??
            "+91 00000 00000",

          notifications:
            siteSettings?.notifications ??
            true,

          enquiryAlerts:
            siteSettings?.enquiry_alerts ??
            true,
        });
      } catch (err) {
        console.error("Settings loading error:", err);

        if (!mounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load settings."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * UPDATE FIELD
   */

  function updateField<K extends keyof Settings>(
    field: K,
    value: Settings[K]
  ) {
    setSaved(false);

    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  }

  /*
   * SAVE SETTINGS
   */

  async function handleSave() {
    try {
      setSaving(true);
      setSaved(false);
      setError("");

      const supabase = createClient();

      /* CURRENT USER */

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw new Error(userError.message);
      }

      if (!user) {
        throw new Error("Admin session not found.");
      }

      /* PROFILE */

      const { error: profileError } =
        await supabase
          .from("profiles")
          .upsert(
            {
              id: user.id,
              full_name: settings.adminName,
              email: settings.adminEmail,
            },
            {
              onConflict: "id",
            }
          );

      if (profileError) {
        throw new Error(
          `Profile: ${profileError.message}`
        );
      }

      /* CHECK SITE SETTINGS */

      const {
        data: existing,
        error: existingError,
      } = await supabase
        .from("site_settings")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (existingError) {
        throw new Error(
          `Site settings: ${existingError.message}`
        );
      }

      /* UPDATE */

      if (existing?.id) {
        const { error: updateError } =
          await supabase
            .from("site_settings")
            .update({
              site_name: settings.siteName,
              contact_email: settings.contactEmail,
              contact_phone: settings.contactPhone,
              notifications: settings.notifications,
              enquiry_alerts: settings.enquiryAlerts,
              updated_at: new Date().toISOString(),
            })
            .eq("id", existing.id);

        if (updateError) {
          throw new Error(
            `Site settings: ${updateError.message}`
          );
        }
      }

      /* INSERT */

      else {
        const { error: insertError } =
          await supabase
            .from("site_settings")
            .insert({
              site_name: settings.siteName,
              contact_email: settings.contactEmail,
              contact_phone: settings.contactPhone,
              notifications: settings.notifications,
              enquiry_alerts: settings.enquiryAlerts,
            });

        if (insertError) {
          throw new Error(
            `Site settings: ${insertError.message}`
          );
        }
      }

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error("Settings save error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save settings."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * PASSWORD RESET
   */

  async function handlePasswordChange() {
    try {
      setError("");

      if (!settings.adminEmail) {
        setError("Admin email is not available.");
        return;
      }

      const supabase = createClient();

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          settings.adminEmail,
          {
            redirectTo:
              `${window.location.origin}/admin/settings`,
          }
        );

      if (error) {
        throw new Error(error.message);
      }

      alert(
        "Password reset link has been sent to your admin email."
      );
    } catch (err) {
      console.error(
        "Password reset error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to send password reset email."
      );
    }
  }

  /*
   * LOADING
   */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050605] text-white">
        <div className="text-center">
          <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#d6b56a]" />

          <p className="mt-5 text-[9px] uppercase tracking-[0.3em] text-white/35">
            Loading Settings
          </p>
        </div>
      </main>
    );
  }

  /*
   * PAGE
   */

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      {/* TOP BAR */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060806]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all hover:border-[#d6b56a]/40 hover:text-[#d6b56a]"
            >
              <ArrowLeft size={17} />
            </Link>

            <div>
              <p className="text-[8px] uppercase tracking-[0.28em] text-[#d6b56a]">
                Admin Portal
              </p>

              <h1 className="mt-1 text-xl font-light sm:text-2xl">
                Settings
              </h1>
            </div>
          </div>

          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="flex items-center gap-2 rounded-full bg-[#d6b56a] px-5 py-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#050605] transition-all hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={15} />

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </header>

      {/* CONTENT */}

      <section className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 lg:px-10">
        {/* HEADING */}

        <div className="mb-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#d6b56a]" />

            <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
              System Configuration
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-light tracking-[-0.03em] sm:text-5xl">
            Manage
            <span className="text-[#d6b56a]">
              {" "}Settings.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
            Manage your NestVille admin profile,
            website information and notification
            preferences.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-7 rounded-[18px] border border-red-400/20 bg-red-400/[0.06] px-5 py-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {saved && (
          <div className="mb-7 rounded-[18px] border border-emerald-400/20 bg-emerald-400/[0.06] px-5 py-4 text-sm text-emerald-300">
            ✓ Settings saved successfully.
          </div>
        )}

        <div className="space-y-7">
          {/* ADMIN PROFILE */}

          <SettingsSection
            icon={<UserRound size={18} />}
            title="Admin Profile"
            description="Your administrator account information."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Admin Name"
                value={settings.adminName}
                onChange={(value) =>
                  updateField("adminName", value)
                }
              />

              <InputField
                label="Admin Email"
                type="email"
                value={settings.adminEmail}
                onChange={(value) =>
                  updateField("adminEmail", value)
                }
                icon={<Mail size={15} />}
              />
            </div>
          </SettingsSection>

          {/* WEBSITE */}

          <SettingsSection
            icon={<Globe size={18} />}
            title="Website Information"
            description="Basic information displayed across NestVille."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <InputField
                label="Website Name"
                value={settings.siteName}
                onChange={(value) =>
                  updateField("siteName", value)
                }
              />

              <InputField
                label="Contact Email"
                type="email"
                value={settings.contactEmail}
                onChange={(value) =>
                  updateField("contactEmail", value)
                }
                icon={<Mail size={15} />}
              />

              <InputField
                label="Contact Phone"
                value={settings.contactPhone}
                onChange={(value) =>
                  updateField("contactPhone", value)
                }
                icon={<Phone size={15} />}
              />
            </div>
          </SettingsSection>

          {/* NOTIFICATIONS */}

          <SettingsSection
            icon={<Bell size={18} />}
            title="Notifications"
            description="Control admin notifications and enquiry alerts."
          >
            <div className="space-y-4">
              <ToggleRow
                title="Admin Notifications"
                description="Receive important admin notifications."
                checked={settings.notifications}
                onChange={(value) =>
                  updateField(
                    "notifications",
                    value
                  )
                }
              />

              <ToggleRow
                title="New Enquiry Alerts"
                description="Get notified whenever a new property enquiry arrives."
                checked={settings.enquiryAlerts}
                onChange={(value) =>
                  updateField(
                    "enquiryAlerts",
                    value
                  )
                }
              />
            </div>
          </SettingsSection>

          {/* SECURITY */}

          <SettingsSection
            icon={<ShieldCheck size={18} />}
            title="Security"
            description="Manage administrator account security."
          >
            <div className="rounded-[20px] border border-white/10 bg-black/20 p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/[0.06] text-[#d6b56a]">
                    <Lock size={17} />
                  </div>

                  <div>
                    <p className="text-sm text-white/80">
                      Password
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                      Send a password reset link to your admin email.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePasswordChange}
                  className="rounded-full border border-white/10 px-5 py-3 text-[9px] uppercase tracking-[0.16em] text-white/50 transition-all hover:border-[#d6b56a]/40 hover:text-[#d6b56a]"
                >
                  Change Password
                </button>
              </div>
            </div>
          </SettingsSection>

          {/* SAVE */}

          <div className="flex flex-col items-stretch justify-between gap-4 rounded-[26px] border border-white/10 bg-white/[0.025] p-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-white/70">
                Save your changes
              </p>

              <p className="mt-1 text-xs text-white/30">
                Changes are stored in Supabase.
              </p>
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#a57b36] via-[#dfbd71] to-[#a57b36] px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#050605] transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              <Save size={15} />

              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================
   SETTINGS SECTION
========================================= */

function SettingsSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 sm:p-7">
      <div className="mb-7 flex items-start gap-4 border-b border-white/[0.07] pb-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d6b56a]/20 bg-[#d6b56a]/[0.06] text-[#d6b56a]">
          {icon}
        </div>

        <div>
          <h3 className="text-xl font-light">
            {title}
          </h3>

          <p className="mt-2 text-xs text-white/35">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

/* =========================================
   INPUT
========================================= */

function InputField({
  label,
  value,
  onChange,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d6b56a]/60">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={`w-full rounded-[18px] border border-white/10 bg-black/20 py-4 pr-4 text-sm text-white outline-none transition-all focus:border-[#d6b56a]/40 ${
            icon ? "pl-11" : "pl-4"
          }`}
        />
      </div>
    </label>
  );
}

/* =========================================
   TOGGLE
========================================= */

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 rounded-[20px] border border-white/10 bg-black/20 p-5">
      <div>
        <p className="text-sm text-white/75">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-white/30">
          {description}
        </p>
      </div>

      <button
        type="button"
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full border transition-all ${
          checked
            ? "border-[#d6b56a]/40 bg-[#d6b56a]/20"
            : "border-white/10 bg-white/[0.04]"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full transition-all ${
            checked
              ? "left-6 bg-[#d6b56a]"
              : "left-1 bg-white/30"
          }`}
        />
      </button>
    </div>
  );
}