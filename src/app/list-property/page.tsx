"use client";

import { FormEvent, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ConsultationSection from "@/components/consultation/ConsultationSection";
import {
  ArrowUpRight,
  BedDouble,
  Building2,
  IndianRupee,
  Mail,
  MapPin,
  Maximize2,
  Phone,
  Upload,
  User,
} from "lucide-react";

export default function ListPropertyPage() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyTitle: "",
    location: "",
    propertyType: "Luxury Villa",
    price: "",
    bedrooms: "",
    area: "",
    description: "",
  });

  function updateField(field: keyof typeof formData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);

    window.setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050605] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-16 pt-40 sm:px-8 lg:px-12">
        <div className="pointer-events-none absolute -left-40 top-16 h-[600px] w-[600px] rounded-full bg-[#d6b56a]/10 blur-[190px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-950/20 blur-[180px]" />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)]
            [background-size:90px_90px]
          "
        />

        <div className="relative z-10 mx-auto max-w-[1450px]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[#d6b56a]" />

            <span className="text-[9px] uppercase tracking-[0.35em] text-[#d6b56a]">
              List With NestVille
            </span>
          </div>

          <h1 className="mt-8 max-w-6xl text-[clamp(4rem,9vw,9rem)] font-light leading-[0.84] tracking-[-0.055em]">
            Present your
            <span className="block text-[#d6b56a]">property beautifully.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-[15px] leading-8 text-white/45">
            Share your property details with our team. We&apos;ll review the
            information and help position your residence for the right audience.
          </p>
        </div>
      </section>

      {/* FORM AREA */}
      <section className="relative px-6 pb-28 pt-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1450px] gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          {/* LEFT INFO */}
          <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
              <p className="text-[9px] uppercase tracking-[0.3em] text-[#d6b56a]">
                Why NestVille
              </p>

              <h2 className="mt-5 text-4xl font-light leading-tight">
                A refined approach to
                <span className="block text-[#d6b56a]">
                  property presentation.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/45">
                Our team focuses on premium positioning, clear property
                information and a curated experience for buyers and owners.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Premium property presentation",
                  "Qualified buyer enquiries",
                  "Dedicated property advisor",
                  "Professional listing review",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border-t border-white/10 pt-4"
                  >
                    <span className="text-xs text-[#d6b56a]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm text-white/60">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d6b56a]/20 bg-[#d6b56a]/[0.05] p-7">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#d6b56a]">
                Need assistance?
              </p>

              <p className="mt-4 text-sm leading-7 text-white/50">
                Our property team can guide you through the listing process.
              </p>

              <a
                href="mailto:hello@nestville.com"
                className="mt-5 inline-flex items-center gap-3 text-sm text-white transition-colors hover:text-[#d6b56a]"
              >
                <Mail size={16} className="text-[#d6b56a]" />
                hello@nestville.com
              </a>
            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[36px] border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:p-10"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.32em] text-[#d6b56a]">
                Property Submission
              </p>

              <h2 className="mt-4 text-4xl font-light">
                Tell us about your property.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <Field
                icon={<User size={17} />}
                placeholder="Full name"
                value={formData.name}
                onChange={(value) => updateField("name", value)}
              />

              <Field
                icon={<Mail size={17} />}
                placeholder="Email address"
                type="email"
                value={formData.email}
                onChange={(value) => updateField("email", value)}
              />

              <Field
                icon={<Phone size={17} />}
                placeholder="Phone number"
                type="tel"
                value={formData.phone}
                onChange={(value) => updateField("phone", value)}
              />

              <Field
                icon={<Building2 size={17} />}
                placeholder="Property title"
                value={formData.propertyTitle}
                onChange={(value) => updateField("propertyTitle", value)}
              />

              <Field
                icon={<MapPin size={17} />}
                placeholder="Location"
                value={formData.location}
                onChange={(value) => updateField("location", value)}
              />

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/20
                  px-5
                  transition-colors
                  focus-within:border-[#d6b56a]/45
                "
              >
                <Building2 size={17} className="shrink-0 text-[#d6b56a]" />

                <select
                  value={formData.propertyType}
                  onChange={(event) =>
                    updateField("propertyType", event.target.value)
                  }
                  className="h-14 w-full bg-transparent text-sm text-white outline-none"
                >
                  <option className="bg-[#0b0c0b]">Luxury Villa</option>
                  <option className="bg-[#0b0c0b]">Apartment</option>
                  <option className="bg-[#0b0c0b]">Penthouse</option>
                  <option className="bg-[#0b0c0b]">Mansion</option>
                  <option className="bg-[#0b0c0b]">Townhouse</option>
                  <option className="bg-[#0b0c0b]">Plot / Land</option>
                </select>
              </div>

              <Field
                icon={<IndianRupee size={17} />}
                placeholder="Expected price"
                value={formData.price}
                onChange={(value) => updateField("price", value)}
              />

              <Field
                icon={<BedDouble size={17} />}
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={(value) => updateField("bedrooms", value)}
              />

              <Field
                icon={<Maximize2 size={17} />}
                placeholder="Area (sq.ft.)"
                value={formData.area}
                onChange={(value) => updateField("area", value)}
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-5">
              <textarea
                required
                value={formData.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Tell us about the property, highlights, amenities, condition and any other useful details..."
                rows={7}
                className="
                  w-full
                  resize-none
                  rounded-[24px]
                  border
                  border-white/10
                  bg-black/20
                  p-5
                  text-sm
                  leading-7
                  text-white
                  outline-none
                  transition-colors
                  placeholder:text-white/25
                  focus:border-[#d6b56a]/45
                "
              />
            </div>

            {/* IMAGE AREA */}
            <label
              className="
                mt-5
                flex
                min-h-40
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-[24px]
                border
                border-dashed
                border-white/15
                bg-black/15
                px-6
                text-center
                transition-all
                hover:border-[#d6b56a]/40
                hover:bg-[#d6b56a]/[0.03]
              "
            >
              <Upload size={24} className="text-[#d6b56a]" />

              <p className="mt-4 text-sm text-white/65">
                Upload property images
              </p>

              <p className="mt-2 text-xs text-white/30">JPG, PNG or WEBP</p>

              <input type="file" accept="image/*" multiple className="hidden" />
            </label>

            <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-md text-xs leading-6 text-white/30">
                By submitting this form, you confirm that the property
                information provided is accurate to the best of your knowledge.
              </p>

              <button
                type="submit"
                className="
                  group
                  inline-flex
                  shrink-0
                  items-center
                  justify-center
                  gap-4
                  rounded-full
                  bg-[#d6b56a]
                  px-8
                  py-4
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-[#080908]
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  hover:bg-[#e5ca85]
                "
              >
                Submit Property
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>

            {submitted && (
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm text-emerald-300">
                Property details submitted successfully.
              </div>
            )}
          </form>
        </div>
      </section>

      <ConsultationSection />

      <Footer />
    </main>
  );
}

interface FieldProps {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

function Field({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: FieldProps) {
  return (
    <label
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-black/20
        px-5
        transition-colors
        focus-within:border-[#d6b56a]/45
      "
    >
      <span className="shrink-0 text-[#d6b56a]">{icon}</span>

      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="
          h-14
          w-full
          bg-transparent
          text-sm
          text-white
          outline-none
          placeholder:text-white/25
        "
      />
    </label>
  );
}
