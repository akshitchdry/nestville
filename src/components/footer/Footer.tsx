"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import FooterBackground from "./FooterBackground";
import FooterLinks from "./FooterLinks";
import FooterLogo from "./FooterLogo";
import Newsletter from "./Newsletter";

export default function Footer() {
  function scrollToTop() {
    // Browser ka native smooth scroll temporarily disable karta hai.
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlBehavior = html.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    // Exact page top par le jaata hai.
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    html.scrollTop = 0;
    body.scrollTop = 0;

    // Hero section available ho to uske exact start par position confirm karega.
    const hero =
      document.querySelector<HTMLElement>("#hero") ||
      document.querySelector<HTMLElement>("main > section:first-of-type");

    if (hero) {
      hero.scrollIntoView({
        behavior: "instant",
        block: "start",
      });
    }

    // URL me #footer ya doosra hash ho to remove karega.
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }

    // GSAP pin/transform ke baad bhi exact top ensure karna.
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      body.scrollTop = 0;

      requestAnimationFrame(() => {
        window.scrollTo(0, 0);

        html.style.scrollBehavior = previousHtmlBehavior;
        body.style.scrollBehavior = previousBodyBehavior;
      });
    });
  }

  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-black"
    >
      <FooterBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 pt-24">
        <Newsletter />

        <div
          className="
            mt-20
            grid
            gap-16
            border-t
            border-white/10
            pt-16
            lg:grid-cols-[0.85fr_1.15fr]
          "
        >
          <div>
            <FooterLogo />

            <div className="mt-12 space-y-5">
              <a
                href="tel:+971504567890"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  text-sm
                  text-white/50
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-[#d6b56a]
                    transition-all
                    duration-300
                    group-hover:border-[#d6b56a]/30
                    group-hover:bg-[#d6b56a]/10
                  "
                >
                  <Phone size={16} />
                </span>

                +971 50 456 7890
              </a>

              <a
                href="mailto:hello@nestville.com"
                className="
                  group
                  flex
                  items-center
                  gap-4
                  text-sm
                  text-white/50
                  transition-colors
                  duration-300
                  hover:text-white
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-[#d6b56a]
                    transition-all
                    duration-300
                    group-hover:border-[#d6b56a]/30
                    group-hover:bg-[#d6b56a]/10
                  "
                >
                  <Mail size={16} />
                </span>

                hello@nestville.com
              </a>

              <div
                className="
                  flex
                  items-start
                  gap-4
                  text-sm
                  leading-7
                  text-white/50
                "
              >
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    text-[#d6b56a]
                  "
                >
                  <MapPin size={16} />
                </span>

                <span>
                  Level 24, Boulevard Plaza
                  <br />
                  Downtown Dubai, UAE
                </span>
              </div>
            </div>
          </div>

          <FooterLinks />
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
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
          }}
          className="
            mt-16
            flex
            flex-col
            gap-6
            border-t
            border-white/10
            pt-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div
            className="
              flex
              flex-col
              gap-3
              text-xs
              text-white/35
              sm:flex-row
              sm:items-center
              sm:gap-6
            "
          >
            <p>
              © {new Date().getFullYear()} NestVille. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              <Link
                href="/privacy"
                className="
                  transition-colors
                  duration-300
                  hover:text-[#d6b56a]
                "
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="
                  transition-colors
                  duration-300
                  hover:text-[#d6b56a]
                "
              >
                Terms
              </Link>

              <Link
                href="/cookies"
                className="
                  transition-colors
                  duration-300
                  hover:text-[#d6b56a]
                "
              >
                Cookies
              </Link>
            </div>
          </div>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{
              y: -4,
              scale: 1.04,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              group
              inline-flex
              items-center
              gap-3
              self-start
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              px-5
              py-3
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-white/55
              transition-all
              duration-300
              hover:border-[#d6b56a]/30
              hover:bg-[#d6b56a]/10
              hover:text-[#d6b56a]
              md:self-auto
            "
            aria-label="Go directly to the top of the page"
          >
            Back to top

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-[#d6b56a]/20
                bg-[#d6b56a]/10
                transition-transform
                duration-300
                group-hover:-translate-y-1
              "
            >
              <ArrowUp size={14} />
            </span>
          </motion.button>
        </motion.div>

        <div
          className="
            pointer-events-none
            mt-12
            overflow-hidden
            whitespace-nowrap
            border-t
            border-white/[0.06]
            pt-8
          "
        >
          <motion.p
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              w-max
              text-[48px]
              font-light
              uppercase
              leading-none
              tracking-[0.14em]
              text-white/[0.035]
              sm:text-[72px]
              lg:text-[96px]
            "
          >
            NestVille Signature Residences&nbsp;&nbsp;&nbsp;
            NestVille Signature Residences&nbsp;&nbsp;&nbsp;
          </motion.p>
        </div>
      </div>
    </footer>
  );
}