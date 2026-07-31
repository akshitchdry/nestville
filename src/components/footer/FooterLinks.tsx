"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Luxury Residences", href: "/properties" },
      { label: "Featured Projects", href: "/projects" },
      { label: "Prime Locations", href: "/locations" },
      { label: "Lifestyle Amenities", href: "/amenities" },
      { label: "Private Consultation", href: "/consultation" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About NestVille", href: "/about" },
      { label: "Our Advisors", href: "/agents" },
      { label: "Luxury Journal", href: "/journal" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: FaLinkedin,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebook,
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: FaTwitter,
  },
];

export default function FooterLinks() {
  return (
    <div>
      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {footerColumns.map((column, columnIndex) => (
          <motion.div
            key={column.title}
            initial={{
              opacity: 0,
              y: 28,
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
              duration: 0.7,
              delay: columnIndex * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3
              className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-[#d6b56a]
              "
            >
              {column.title}
            </h3>

            <ul className="mt-7 space-y-4">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      text-white/50
                      transition-colors
                      duration-300
                      hover:text-white
                    "
                  >
                    <span
                      className="
                        h-px
                        w-0
                        bg-[#d6b56a]
                        transition-all
                        duration-300
                        group-hover:w-4
                      "
                    />

                    {link.label}

                    <FaArrowRight
                      size={13}
                      className="
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:opacity-100
                      "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
          delay: 0.25,
        }}
        className="
          mt-14
          border-t
          border-white/10
          pt-8
        "
      >
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.28em]
            text-white/35
          "
        >
          Follow NestVille
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {socialLinks.map((social) => {
            const Icon = social.icon;

            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  y: -4,
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                aria-label={social.label}
                className="
                  group
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-white/55
                  transition-all
                  duration-300
                  hover:border-[#d6b56a]/35
                  hover:bg-[#d6b56a]/10
                  hover:text-[#d6b56a]
                "
              >
                <Icon
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
