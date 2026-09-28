"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  ImageIcon,
  MapPin,
  Save,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type PropertyForm = {
  title: string;
  slug: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  category: string;
  image: string;
  description: string;
  status: "published" | "draft";
  featured: boolean;
};

const initialForm: PropertyForm = {
  title: "",
  slug: "",
  location: "",
  price: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  category: "",
  image: "",
  description: "",
  status: "published",
  featured: false,
};

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();

  const slugParam = Array.isArray(params.slug)
    ? params.slug[0]
    : String(params.slug || "");

  const [form, setForm] =
    useState<PropertyForm>(initialForm);

  const [propertyId, setPropertyId] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProperty() {
      if (!slugParam) {
        if (mounted) {
          setError("Invalid property URL.");
          setLoading(false);
        }

        return;
      }

      try {
        setLoading(true);
        setError("");

        const supabase = createClient();

        const { data, error: fetchError } =
          await supabase
            .from("properties")
            .select("*")
            .eq("slug", slugParam)
            .maybeSingle();

        if (!mounted) {
          return;
        }

        if (fetchError) {
          console.error(
            "Property fetch error:",
            fetchError,
          );

          setError(
            fetchError.message ||
              "Property load nahi ho paayi.",
          );

          return;
        }

        if (!data) {
          setError("Property nahi mili.");
          return;
        }

        setPropertyId(data.id);

        setForm({
          title: data.title ?? "",
          slug: data.slug ?? "",
          location: data.location ?? "",
          price: data.price ?? "",
          bedrooms: String(
            data.bedrooms ?? "",
          ),
          bathrooms: String(
            data.bathrooms ?? "",
          ),
          area: data.area ?? "",
          category: data.category ?? "",
          image: data.image ?? "",
          description:
            data.description ?? "",
          status:
            data.status === "draft"
              ? "draft"
              : "published",
          featured: Boolean(
            data.featured,
          ),
        });
      } catch (err) {
        console.error(
          "Property loading error:",
          err,
        );

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Property load nahi ho paayi.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProperty();

    return () => {
      mounted = false;
    };
  }, [slugParam]);

  function updateField(
    field: keyof PropertyForm,
    value: string | boolean,
  ) {
    setSuccess(false);
    setError("");

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(value: string) {
    updateField("title", value);

    setForm((current) => ({
      ...current,
      title: value,
      slug: createSlug(value),
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (saving || propertyId === null) {
      return;
    }

    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      const title = form.title.trim();
      const slug = form.slug.trim();
      const location = form.location.trim();
      const price = form.price.trim();
      const area = form.area.trim();
      const category = form.category.trim();
      const image = form.image.trim();
      const description =
        form.description.trim();

      const bedrooms = Number(
        form.bedrooms,
      );

      const bathrooms = Number(
        form.bathrooms,
      );

      if (!title) {
        setError(
          "Property title required hai.",
        );
        return;
      }

      if (!slug) {
        setError(
          "Property slug required hai.",
        );
        return;
      }

      if (!location) {
        setError(
          "Location required hai.",
        );
        return;
      }

      if (!price) {
        setError(
          "Starting price required hai.",
        );
        return;
      }

      if (!Number.isInteger(bedrooms) || bedrooms < 1) {
        setError(
          "Bedrooms ki valid value enter karo.",
        );
        return;
      }

      if (
        !Number.isInteger(bathrooms) ||
        bathrooms < 1
      ) {
        setError(
          "Bathrooms ki valid value enter karo.",
        );
        return;
      }

      if (!area) {
        setError(
          "Property area required hai.",
        );
        return;
      }

      if (!category) {
        setError(
          "Property category required hai.",
        );
        return;
      }

      if (!image) {
        setError(
          "Property image path required hai.",
        );
        return;
      }

      if (!description) {
        setError(
          "Property description required hai.",
        );
        return;
      }

      const supabase = createClient();

      const { error: updateError } =
        await supabase
          .from("properties")
          .update({
            title,
            slug,
            location,
            price,
            bedrooms,
            bathrooms,
            area,
            category,
            image,
            description,
            status: form.status,
            featured: form.featured,
          })
          .eq("id", propertyId);

      if (updateError) {
        console.error(
          "Property update error:",
          updateError,
        );

        if (updateError.code === "23505") {
          setError(
            "Ye slug kisi aur property me already use ho raha hai.",
          );
        } else {
          setError(
            updateError.message ||
              "Property update nahi ho paayi.",
          );
        }

        return;
      }

      setSuccess(true);

      setTimeout(() => {
        router.push("/admin/properties");
        router.refresh();
      }, 800);
    } catch (err) {
      console.error(
        "Property update error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Property update karte waqt error aa gaya.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050605] text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border border-white/10 border-t-[#d6b56a]" />

          <p className="mt-5 text-sm text-white/40">
            Loading property...
          </p>
        </div>
      </main>
    );
  }

  if (propertyId === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050605] px-6 text-white">
        <div className="max-w-md text-center">
          <Building2
            size={34}
            className="mx-auto text-white/15"
          />

          <p className="mt-5 text-sm text-red-300/80">
            {error || "Property nahi mili."}
          </p>

          <Link
            href="/admin/properties"
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-[9px] uppercase tracking-[0.18em] text-white/50 transition hover:border-[#d6b56a]/40 hover:text-[#d6b56a]"
          >
            <ArrowLeft size={13} />
            Back to Properties
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      {/* HEADER */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060806]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/properties"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:border-[#d6b56a]/40 hover:text-[#d6b56a]"
            >
              <ArrowLeft size={17} />
            </Link>

            <div>
              <p className="text-[8px] uppercase tracking-[0.28em] text-[#d6b56a]">
                Property Management
              </p>

              <h1 className="mt-1 text-xl font-light sm:text-2xl">
                Edit Property
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[1400px]"
        >
          <div className="mb-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#d6b56a]" />

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                Existing Residence
              </p>
            </div>

            <h2 className="mt-5 text-4xl font-light tracking-[-0.035em] sm:text-5xl">
              Update{" "}
              <span className="text-[#d6b56a]">
                property.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              Changes save hote hi Supabase
              database me update ho jayenge.
            </p>
          </div>

          <div className="grid gap-7 xl:grid-cols-[1fr_360px]">
            {/* FORM */}

            <div className="space-y-7">
              <FormSection
                title="Basic Information"
                description="Main property information."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Property Title"
                    placeholder="The Aurelia Estate"
                    value={form.title}
                    onChange={
                      handleTitleChange
                    }
                    required
                  />

                  <InputField
                    label="Slug"
                    placeholder="the-aurelia-estate"
                    value={form.slug}
                    onChange={(value) =>
                      updateField(
                        "slug",
                        value,
                      )
                    }
                    required
                  />

                  <InputField
                    label="Location"
                    placeholder="Palm Jumeirah, Dubai"
                    value={form.location}
                    onChange={(value) =>
                      updateField(
                        "location",
                        value,
                      )
                    }
                    icon={
                      <MapPin size={15} />
                    }
                    required
                  />

                  <InputField
                    label="Starting Price"
                    placeholder="$6.2M"
                    value={form.price}
                    onChange={(value) =>
                      updateField(
                        "price",
                        value,
                      )
                    }
                    required
                  />

                  <InputField
                    label="Category"
                    placeholder="Waterfront Estate"
                    value={form.category}
                    onChange={(value) =>
                      updateField(
                        "category",
                        value,
                      )
                    }
                    icon={
                      <Building2 size={15} />
                    }
                    required
                  />

                  <InputField
                    label="Area"
                    placeholder="8,400 sq. ft."
                    value={form.area}
                    onChange={(value) =>
                      updateField(
                        "area",
                        value,
                      )
                    }
                    required
                  />
                </div>
              </FormSection>

              <FormSection
                title="Property Details"
                description="Residence configuration."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Bedrooms"
                    type="number"
                    placeholder="5"
                    value={form.bedrooms}
                    onChange={(value) =>
                      updateField(
                        "bedrooms",
                        value,
                      )
                    }
                    icon={
                      <BedDouble size={15} />
                    }
                    required
                  />

                  <InputField
                    label="Bathrooms"
                    type="number"
                    placeholder="7"
                    value={form.bathrooms}
                    onChange={(value) =>
                      updateField(
                        "bathrooms",
                        value,
                      )
                    }
                    icon={
                      <Bath size={15} />
                    }
                    required
                  />
                </div>
              </FormSection>

              <FormSection
                title="Property Media"
                description="Main property image."
              >
                <InputField
                  label="Image Path"
                  placeholder="/images/properties/residence-1.webp"
                  value={form.image}
                  onChange={(value) =>
                    updateField(
                      "image",
                      value,
                    )
                  }
                  icon={
                    <ImageIcon size={15} />
                  }
                  required
                />

                <p className="mt-3 text-[10px] leading-5 text-white/25">
                  Example: /images/properties/residence-1.webp
                </p>
              </FormSection>

              <FormSection
                title="Description"
                description="Property introduction."
              >
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value,
                    )
                  }
                  required
                  rows={8}
                  placeholder="Describe this residence..."
                  className="w-full resize-none rounded-[20px] border border-white/10 bg-black/20 px-5 py-4 text-sm leading-7 text-white outline-none placeholder:text-white/20 focus:border-[#d6b56a]/40"
                />
              </FormSection>

              <FormSection
                title="Publishing"
                description="Control website visibility."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/40">
                      Status
                    </span>

                    <select
                      value={form.status}
                      onChange={(event) =>
                        updateField(
                          "status",
                          event.target
                            .value as
                            | "published"
                            | "draft",
                        )
                      }
                      className="w-full rounded-[18px] border border-white/10 bg-[#080a08] px-4 py-4 text-sm text-white outline-none focus:border-[#d6b56a]/40"
                    >
                      <option value="published">
                        Published
                      </option>

                      <option value="draft">
                        Draft
                      </option>
                    </select>
                  </label>

                  <label className="flex cursor-pointer items-center gap-4 rounded-[18px] border border-white/10 bg-black/20 px-5 py-4">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(event) =>
                        updateField(
                          "featured",
                          event.target.checked,
                        )
                      }
                      className="h-4 w-4 accent-[#d6b56a]"
                    />

                    <span>
                      <span className="block text-sm text-white/70">
                        Featured Property
                      </span>

                      <span className="mt-1 block text-xs text-white/30">
                        Highlight this residence.
                      </span>
                    </span>
                  </label>
                </div>
              </FormSection>
            </div>

            {/* SIDEBAR */}

            <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[#d6b56a]">
                  Save Changes
                </p>

                <p className="mt-4 text-sm leading-7 text-white/40">
                  Review your changes and update
                  the residence.
                </p>

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#a57b36] via-[#dfbd71] to-[#a57b36] px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#050605] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={15} />

                  {saving
                    ? "Updating..."
                    : "Update Property"}
                </button>

                {error && (
                  <div className="mt-5 rounded-[18px] border border-red-400/15 bg-red-400/[0.06] p-4 text-xs leading-6 text-red-300">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mt-5 flex gap-3 rounded-[18px] border border-emerald-400/15 bg-emerald-400/[0.07] p-4">
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-emerald-300"
                    />

                    <p className="text-xs text-emerald-200">
                      Property updated successfully.
                    </p>
                  </div>
                )}
              </div>

              {/* PREVIEW */}

              <div className="rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[#d6b56a]">
                  Live Preview
                </p>

                <div className="mt-5 overflow-hidden rounded-[20px] border border-white/10 bg-black/20">
                  <div className="h-44 bg-white/[0.025]">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt={
                          form.title ||
                          "Property"
                        }
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon
                          size={30}
                          className="text-white/15"
                        />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[#d6b56a]">
                      {form.category ||
                        "Property"}
                    </p>

                    <h3 className="mt-3 text-xl font-light">
                      {form.title ||
                        "Property Title"}
                    </h3>

                    <p className="mt-2 text-xs text-white/35">
                      {form.location ||
                        "Location"}
                    </p>

                    <p className="mt-4 text-lg text-[#d6b56a]">
                      {form.price ||
                        "$0"}
                    </p>

                    <div className="mt-5 flex gap-3 border-t border-white/10 pt-4 text-[9px] text-white/35">
                      <span>
                        {form.bedrooms ||
                          "0"}{" "}
                        Beds
                      </span>

                      <span>
                        {form.bathrooms ||
                          "0"}{" "}
                        Baths
                      </span>

                      <span>
                        {form.area ||
                          "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </form>
      </section>
    </main>
  );
}

/* FORM SECTION */

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 sm:p-7">
      <div className="mb-7 border-b border-white/[0.07] pb-5">
        <h3 className="text-xl font-light">
          {title}
        </h3>

        <p className="mt-2 text-xs text-white/35">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

/* INPUT */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
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
          required={required}
          min={
            type === "number"
              ? 1
              : undefined
          }
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          placeholder={placeholder}
          className={`w-full rounded-[18px] border border-white/10 bg-black/20 py-4 pr-4 text-sm text-white outline-none placeholder:text-white/20 focus:border-[#d6b56a]/40 ${
            icon ? "pl-11" : "pl-4"
          }`}
        />
      </div>
    </label>
  );
}