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

export default function ConsultationForm() {
  const [formData, setFormData] =
    useState<ConsultationFormData>(initialFormData);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitted(true);
    setFormData(initialFormData);
  };

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
            Share your preferences and our property team will contact
            you with a curated selection of premium residences.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="group block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
              Full Name
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
              <User
                size={17}
                className="shrink-0 text-[#d6b56a]"
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
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
            </div>
          </label>

          <label className="group block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
              Email Address
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
              <Mail
                size={17}
                className="shrink-0 text-[#d6b56a]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@email.com"
                required
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
            </div>
          </label>

          <label className="group block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
              Phone Number
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
              <Phone
                size={17}
                className="shrink-0 text-[#d6b56a]"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+971 50 000 0000"
                required
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
            </div>
          </label>

          <label className="group block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
              Property Type
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
              <Building2
                size={17}
                className="shrink-0 text-[#d6b56a]"
              />

              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="
                  h-14
                  w-full
                  cursor-pointer
                  bg-transparent
                  text-sm
                  text-white
                  outline-none
                "
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
            </div>
          </label>

          <label className="group block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
              Preferred Location
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
              <MapPin
                size={17}
                className="shrink-0 text-[#d6b56a]"
              />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Dubai Marina"
                required
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
            </div>
          </label>

          <label className="group block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-white/45">
              Preferred Date
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
              <CalendarDays
                size={17}
                className="shrink-0 text-[#d6b56a]"
              />

              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className="
                  h-14
                  w-full
                  bg-transparent
                  text-sm
                  text-white
                  outline-none
                  [color-scheme:dark]
                "
              />
            </div>
          </label>
        </div>

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
            By submitting this form, you agree to be contacted by a
            NestVille property advisor regarding your enquiry.
          </p>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.03,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
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
            "
          >
            Request Consultation

            <ArrowUpRight size={17} />
          </motion.button>
        </div>

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
              border-[#d6b56a]/20
              bg-[#d6b56a]/10
              px-5
              py-4
              text-sm
              text-[#e5ca89]
            "
          >
            Thank you. A NestVille advisor will contact you shortly.
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
