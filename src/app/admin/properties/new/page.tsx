"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
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

interface PropertyForm {
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
}

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
};

export default function AddPropertyPage() {
  const [form, setForm] =
    useState<PropertyForm>(initialForm);

  const [submitting, setSubmitting] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  function updateField(
    field: keyof PropertyForm,
    value: string
  ) {
    setSuccess(false);

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleTitleChange(value: string) {
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setForm((current) => ({
      ...current,
      title: value,
      slug,
    }));

    setSuccess(false);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSubmitting(true);
    setSuccess(false);

    // Temporary frontend simulation.
    // Database/API will replace this next.
    await new Promise((resolve) =>
      setTimeout(resolve, 700)
    );

    setSubmitting(false);
    setSuccess(true);
  }

  return (
    <main className="min-h-screen bg-[#050605] text-white">
      {/* TOPBAR */}

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#060806]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/properties"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                text-white/45
                transition-all
                hover:border-[#d6b56a]/40
                hover:text-[#d6b56a]
              "
            >
              <ArrowLeft size={17} />
            </Link>

            <div>
              <p className="text-[8px] uppercase tracking-[0.28em] text-[#d6b56a]">
                Property Management
              </p>

              <h1 className="mt-1 text-xl font-light sm:text-2xl">
                Add Property
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="px-5 py-10 sm:px-8 lg:px-10">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[1400px]"
        >
          {/* HEADING */}

          <div className="mb-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#d6b56a]" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                New Residence
              </span>
            </div>

            <h2 className="mt-5 text-4xl font-light tracking-[-0.035em] sm:text-5xl">
              Create a
              <span className="text-[#d6b56a]">
                {" "}property.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
              Enter the property information that will
              eventually be displayed across the NestVille
              website.
            </p>
          </div>

          <div className="grid gap-7 xl:grid-cols-[1fr_360px]">
            {/* LEFT FORM */}

            <div className="space-y-7">
              {/* BASIC INFORMATION */}

              <FormSection
                title="Basic Information"
                description="Main information about the residence."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Property Title"
                    placeholder="The Aurelia Estate"
                    value={form.title}
                    onChange={handleTitleChange}
                    required
                  />

                  <InputField
                    label="Slug"
                    placeholder="the-aurelia-estate"
                    value={form.slug}
                    onChange={(value) =>
                      updateField("slug", value)
                    }
                    required
                  />

                  <InputField
                    label="Location"
                    placeholder="Palm Jumeirah, Dubai"
                    value={form.location}
                    onChange={(value) =>
                      updateField("location", value)
                    }
                    icon={<MapPin size={15} />}
                    required
                  />

                  <InputField
                    label="Starting Price"
                    placeholder="$6.2M"
                    value={form.price}
                    onChange={(value) =>
                      updateField("price", value)
                    }
                    required
                  />

                  <InputField
                    label="Category"
                    placeholder="Waterfront Estate"
                    value={form.category}
                    onChange={(value) =>
                      updateField("category", value)
                    }
                    icon={<Building2 size={15} />}
                    required
                  />

                  <InputField
                    label="Area"
                    placeholder="8,400 sq. ft."
                    value={form.area}
                    onChange={(value) =>
                      updateField("area", value)
                    }
                    required
                  />
                </div>
              </FormSection>

              {/* PROPERTY DETAILS */}

              <FormSection
                title="Property Details"
                description="Residence specifications and configuration."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Bedrooms"
                    type="number"
                    placeholder="5"
                    value={form.bedrooms}
                    onChange={(value) =>
                      updateField("bedrooms", value)
                    }
                    icon={<BedDouble size={15} />}
                    required
                  />

                  <InputField
                    label="Bathrooms"
                    type="number"
                    placeholder="7"
                    value={form.bathrooms}
                    onChange={(value) =>
                      updateField("bathrooms", value)
                    }
                    icon={<Bath size={15} />}
                    required
                  />
                </div>
              </FormSection>

              {/* MEDIA */}

              <FormSection
                title="Property Media"
                description="Add the main property image."
              >
                <InputField
                  label="Image Path"
                  placeholder="/images/properties/residence-6.webp"
                  value={form.image}
                  onChange={(value) =>
                    updateField("image", value)
                  }
                  icon={<ImageIcon size={15} />}
                  required
                />

                <p className="mt-3 text-xs leading-6 text-white/30">
                  For now enter an image path from your
                  public folder. Image upload will be added
                  when storage/backend is connected.
                </p>
              </FormSection>

              {/* DESCRIPTION */}

              <FormSection
                title="Description"
                description="Write a short introduction for the property."
              >
                <label className="block">
                  <span className="mb-3 block text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Property Description
                  </span>

                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      updateField(
                        "description",
                        event.target.value
                      )
                    }
                    rows={7}
                    placeholder="Describe the residence..."
                    className="
                      w-full
                      resize-none
                      rounded-[20px]
                      border
                      border-white/10
                      bg-black/20
                      px-5
                      py-4
                      text-sm
                      leading-7
                      text-white
                      outline-none
                      transition-all
                      placeholder:text-white/20
                      focus:border-[#d6b56a]/40
                      focus:bg-white/[0.025]
                    "
                  />
                </label>
              </FormSection>
            </div>

            {/* RIGHT SIDEBAR */}

            <aside className="space-y-5 xl:sticky xl:top-28 xl:self-start">
              {/* PUBLISH */}

              <div className="rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[#d6b56a]">
                  Publish Property
                </p>

                <p className="mt-4 text-sm leading-7 text-white/40">
                  Review the information before adding this
                  residence.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    mt-6
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-gradient-to-r
                    from-[#a57b36]
                    via-[#dfbd71]
                    to-[#a57b36]
                    px-6
                    py-4
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-[#050605]
                    transition-transform
                    hover:scale-[1.02]
                    disabled:cursor-wait
                    disabled:opacity-60
                  "
                >
                  <Save size={15} />

                  {submitting
                    ? "Saving..."
                    : "Add Property"}
                </button>

                {success && (
                  <div className="mt-5 flex items-start gap-3 rounded-[18px] border border-emerald-400/15 bg-emerald-400/[0.07] p-4">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-emerald-300"
                    />

                    <div>
                      <p className="text-xs text-emerald-200">
                        Property form saved.
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-white/35">
                        Database connection will make this
                        permanent.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* PREVIEW */}

              <div className="rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
                <p className="text-[9px] uppercase tracking-[0.24em] text-[#d6b56a]">
                  Preview
                </p>

                <div className="mt-5 overflow-hidden rounded-[20px] border border-white/10 bg-black/20">
                  <div className="flex h-44 items-center justify-center bg-white/[0.025]">
                    {form.image ? (
                      <img
                        src={form.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon
                        size={30}
                        className="text-white/15"
                      />
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-[#d6b56a]">
                      {form.category ||
                        "Property Category"}
                    </p>

                    <h3 className="mt-3 text-xl font-light">
                      {form.title ||
                        "Property Title"}
                    </h3>

                    <p className="mt-2 text-xs text-white/35">
                      {form.location ||
                        "Property location"}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-xs text-white/35">
                        Starting price
                      </span>

                      <span className="text-lg text-[#d6b56a]">
                        {form.price || "—"}
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

/* =========================================
   FORM SECTION
========================================= */

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
        <h3 className="text-xl font-light text-white">
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

/* =========================================
   INPUT
========================================= */

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
              ? 0
              : undefined
          }
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className={`
            w-full
            rounded-[18px]
            border
            border-white/10
            bg-black/20
            py-4
            pr-4
            text-sm
            text-white
            outline-none
            transition-all
            placeholder:text-white/20
            focus:border-[#d6b56a]/40
            focus:bg-white/[0.025]

            ${icon ? "pl-11" : "pl-4"}
          `}
        />
      </div>
    </label>
  );
}