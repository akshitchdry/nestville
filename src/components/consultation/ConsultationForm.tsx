"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  User,
  Loader2,
} from "lucide-react";

interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  location: string;
  preferredDate: string;
  message: string;
}

const initialFormData: ConsultationFormData = {
  name: "",
  email: "",
  phone: "",
  propertyType: "",
  location: "",
  preferredDate: "",
  message: "",
};

function getToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function ConsultationForm() {
  const [formData, setFormData] =
    useState<ConsultationFormData>(initialFormData);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmitted(false);
    setSubmitError("");
  };

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (submitting) return;

    setSubmitting(true);
    setSubmitted(false);
    setSubmitError("");

    try {
      if (
        formData.preferredDate &&
        formData.preferredDate < getToday()
      ) {
        throw new Error(
          "Please select today or a future consultation date.",
        );
      }

      const response = await fetch(
        "/api/enquiries",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to submit enquiry.",
        );
      }

      setSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error(
        "Consultation submit error:",
        error,
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to submit enquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 45,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-white/10
        bg-white/[0.035]
        p-6
        shadow-[0_35px_100px_rgba(0,0,0,0.38)]
        backdrop-blur-2xl
        sm:p-8
        lg:p-10
      "
    >
      {/* GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-[#d6b56a]/10
          blur-[135px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-28
          -left-24
          h-72
          w-72
          rounded-full
          bg-[#d6b56a]/5
          blur-[140px]
        "
      />

      <form
        onSubmit={handleSubmit}
        className="relative z-10"
      >
        {/* HEADER */}
        <div className="mb-9">
          <span
            className="
              text-[10px]
              uppercase
              tracking-[0.32em]
              text-[#d6b56a]
            "
          >
            Private Enquiry
          </span>

          <h3
            className="
              mt-4
              text-3xl
              font-light
              leading-tight
              text-white
              sm:text-4xl
            "
          >
            Begin Your
            <span className="block text-[#d6b56a]">
              Property Journey
            </span>
          </h3>

          <p
            className="
              mt-5
              max-w-xl
              text-[15px]
              leading-7
              text-white/55
            "
          >
            Share your preferences and our property
            team will contact you with a curated
            selection of premium residences.
          </p>
        </div>

        {/* FIELDS */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* NAME */}
          <FormField
            label="Full Name"
            icon={<User size={17} />}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              autoComplete="name"
              className={inputClass}
            />
          </FormField>

          {/* EMAIL */}
          <FormField
            label="Email Address"
            icon={<Mail size={17} />}
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@email.com"
              required
              autoComplete="email"
              className={inputClass}
            />
          </FormField>

          {/* PHONE */}
          <FormField
            label="Phone Number"
            icon={<Phone size={17} />}
          >
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+971 50 000 0000"
              required
              autoComplete="tel"
              className={inputClass}
            />
          </FormField>

          {/* PROPERTY TYPE */}
          <FormField
            label="Property Type"
            icon={<Building2 size={17} />}
          >
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option
                value=""
                className="bg-[#0a0a0a]"
              >
                Select property
              </option>

              <option
                value="villa"
                className="bg-[#0a0a0a]"
              >
                Luxury Villa
              </option>

              <option
                value="penthouse"
                className="bg-[#0a0a0a]"
              >
                Penthouse
              </option>

              <option
                value="apartment"
                className="bg-[#0a0a0a]"
              >
                Premium Apartment
              </option>

              <option
                value="townhouse"
                className="bg-[#0a0a0a]"
              >
                Townhouse
              </option>
            </select>
          </FormField>

          {/* LOCATION */}
          <FormField
            label="Preferred Location"
            icon={<MapPin size={17} />}
          >
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Dubai Marina"
              required
              autoComplete="address-level2"
              className={inputClass}
            />
          </FormField>

          {/* DATE */}
          <FormField
            label="Preferred Date"
            icon={<CalendarDays size={17} />}
          >
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              min={getToday()}
              className={`${inputClass} [color-scheme:dark]`}
            />
          </FormField>
        </div>

        {/* MESSAGE */}
        <label className="mt-5 block">
          <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
            Your Requirements
          </span>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your preferred budget, location, bedrooms and investment goals..."
            rows={5}
            className="
              w-full
              resize-none
              rounded-[20px]
              border
              border-white/10
              bg-black/25
              px-5
              py-4
              text-sm
              leading-7
              text-white
              outline-none
              transition-all
              duration-300
              placeholder:text-white/25
              focus:border-[#d6b56a]/45
              focus:bg-black/35
            "
          />
        </label>

        {/* BOTTOM */}
        <div
          className="
            mt-7
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              max-w-md
              text-xs
              leading-6
              text-white/35
            "
          >
            By submitting this form, you agree to be
            contacted by a NestVille property advisor
            regarding your enquiry.
          </p>

          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{
              scale: submitting ? 1 : 1.03,
              y: submitting ? 0 : -2,
            }}
            whileTap={{
              scale: submitting ? 1 : 0.97,
            }}
            className="
              inline-flex
              min-h-14
              shrink-0
              items-center
              justify-center
              gap-3
              rounded-full
              bg-gradient-to-r
              from-[#a87c34]
              via-[#ddb86d]
              to-[#a87c34]
              px-7
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[#050505]
              shadow-[0_14px_45px_rgba(214,181,106,0.18)]
              transition-opacity
              disabled:cursor-wait
              disabled:opacity-60
            "
          >
            {submitting ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Submitting...
              </>
            ) : (
              <>
                Request Consultation
                <ArrowUpRight size={17} />
              </>
            )}
          </motion.button>
        </div>

        {/* ERROR */}
        {submitError && (
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-6
              rounded-[18px]
              border
              border-red-400/20
              bg-red-400/10
              px-5
              py-4
              text-sm
              leading-6
              text-red-300
            "
          >
            {submitError}
          </motion.div>
        )}

        {/* SUCCESS */}
        {submitted && (
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              mt-6
              rounded-[18px]
              border
              border-emerald-400/20
              bg-emerald-400/10
              px-5
              py-4
            "
          >
            <p className="text-sm text-emerald-300">
              Consultation request submitted successfully.
            </p>

            <p className="mt-1 text-xs leading-5 text-emerald-300/60">
              A NestVille advisor will contact you shortly.
            </p>
          </motion.div>
        )}
      </form>

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[inherit]
          border
          border-transparent
          transition-all
          duration-700
          hover:border-[#d6b56a]/20
        "
      />
    </motion.div>
  );
}

const inputClass = `
  h-14
  w-full
  bg-transparent
  text-sm
  text-white
  outline-none
  placeholder:text-white/25
`;

function FormField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
        {label}
      </span>

      <div
        className="
          flex
          items-center
          gap-3
          rounded-[18px]
          border
          border-white/10
          bg-black/25
          px-4
          transition-all
          duration-300
          focus-within:border-[#d6b56a]/45
          focus-within:bg-black/35
        "
      >
        <span className="shrink-0 text-[#d6b56a]">
          {icon}
        </span>

        {children}
      </div>
    </label>
  );
}