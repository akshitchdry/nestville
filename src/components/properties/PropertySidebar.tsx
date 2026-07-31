"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Download,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

interface PropertySidebarProps {
  price: string;
  propertyId?: string;
  title?: string;
  bookingAmount?: string;
  maintenance?: string;
  possession?: string;
  brochureHref?: string;
}

export default function PropertySidebar({
  price,
  propertyId = "NV-001",
  title = "Royal Palm Villa",
  bookingAmount = "$50,000",
  maintenance = "$1,250 / month",
  possession = "Ready to Move",
  brochureHref = "/brochures/property-brochure.pdf",
}: PropertySidebarProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const paymentDetails = useMemo(
    () => [
      {
        label: "Property Price",
        value: price,
      },
      {
        label: "Booking Amount",
        value: bookingAmount,
      },
      {
        label: "Maintenance",
        value: maintenance,
      },
      {
        label: "Possession",
        value: possession,
      },
    ],
    [bookingAmount, maintenance, possession, price],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
    });

    window.setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  }

  return (
    <aside className="relative">
      <motion.div
        initial={{
          opacity: 0,
          x: 35,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="sticky top-28 space-y-6"
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-white/10
            bg-[#0d0d0c]
            p-7
            shadow-[0_30px_100px_rgba(0,0,0,0.35)]
            backdrop-blur-2xl
            sm:p-8
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-64
              w-64
              rounded-full
              bg-[#d4af67]/10
              blur-[120px]
            "
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-5">
              <div>
                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.34em]
                    text-[#d4af67]
                  "
                >
                  Starting Price
                </span>

                <h3 className="mt-3 text-4xl font-light text-white">
                  {price}
                </h3>
              </div>

              <span
                className="
                  rounded-full
                  border
                  border-[#d4af67]/25
                  bg-[#d4af67]/10
                  px-4
                  py-2
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-[#d4af67]
                "
              >
                {propertyId}
              </span>
            </div>

            <div className="mt-8 space-y-4">
              {paymentDetails.map((item) => (
                <div
                  key={item.label}
                  className="
                    flex
                    items-center
                    justify-between
                    gap-5
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    px-5
                    py-4
                  "
                >
                  <span className="text-sm text-white/40">
                    {item.label}
                  </span>

                  <span className="text-right text-sm font-medium text-white">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={brochureHref}
              download
              className="
                group
                mt-6
                flex
                w-full
                items-center
                justify-between
                rounded-full
                border
                border-white/10
                bg-white/[0.03]
                px-6
                py-4
                text-[10px]
                uppercase
                tracking-[0.24em]
                text-white/60
                transition-all
                duration-300
                hover:border-[#d4af67]/40
                hover:bg-[#d4af67]/10
                hover:text-[#d4af67]
              "
            >
              Download Brochure

              <Download
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>
        </div>

        <div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border
            border-white/10
            bg-white/[0.035]
            p-7
            backdrop-blur-2xl
            sm:p-8
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-24
              h-64
              w-64
              rounded-full
              bg-[#d4af67]/10
              blur-[130px]
            "
          />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-[#d4af67]" />

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.32em]
                  text-[#d4af67]
                "
              >
                Private Enquiry
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-light leading-tight text-white">
              Schedule a Private Viewing
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/45">
              Share your details and our luxury property advisor will contact
              you regarding {title}.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/25
                  px-5
                  transition-colors
                  duration-300
                  focus-within:border-[#d4af67]/50
                "
              >
                <User size={17} className="shrink-0 text-[#d4af67]" />

                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  placeholder="Full name"
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

              <label
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/25
                  px-5
                  transition-colors
                  duration-300
                  focus-within:border-[#d4af67]/50
                "
              >
                <Mail size={17} className="shrink-0 text-[#d4af67]" />

                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="Email address"
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

              <label
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/25
                  px-5
                  transition-colors
                  duration-300
                  focus-within:border-[#d4af67]/50
                "
              >
                <Phone size={17} className="shrink-0 text-[#d4af67]" />

                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      phone: event.target.value,
                    }))
                  }
                  placeholder="Phone number"
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

              <label
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/25
                  px-5
                  transition-colors
                  duration-300
                  focus-within:border-[#d4af67]/50
                "
              >
                <CalendarDays
                  size={17}
                  className="shrink-0 text-[#d4af67]"
                />

                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      preferredDate: event.target.value,
                    }))
                  }
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
              </label>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-gradient-to-r
                  from-[#a67b34]
                  via-[#ddb86d]
                  to-[#a67b34]
                  px-6
                  py-5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.26em]
                  text-[#100d08]
                  shadow-[0_20px_50px_rgba(212,175,103,0.16)]
                "
              >
                Schedule Viewing

                <ArrowUpRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </motion.button>
            </form>

            {submitted && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mt-5
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-emerald-400/20
                  bg-emerald-400/10
                  px-5
                  py-4
                  text-sm
                  text-emerald-300
                "
              >
                <CheckCircle2 size={18} />

                Enquiry submitted successfully.
              </motion.div>
            )}
          </div>
        </div>

        <div
          className="
            rounded-[26px]
            border
            border-[#d4af67]/20
            bg-[#d4af67]/[0.06]
            px-6
            py-5
          "
        >
          <p className="text-sm leading-7 text-white/50">
            <span className="font-medium text-[#d4af67]">
              Verified listing.
            </span>{" "}
            Property details and pricing are subject to final confirmation by
            the developer or authorized advisor.
          </p>
        </div>
      </motion.div>
    </aside>
  );
}