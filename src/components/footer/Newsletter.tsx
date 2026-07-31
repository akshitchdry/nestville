"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
} from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: .8,
      }}
      className="
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-white/10
        bg-white/[0.03]
        p-8
        backdrop-blur-2xl
      "
    >
      <div
        className="
          absolute
          -right-24
          -top-24
          h-72
          w-72
          rounded-full
          bg-[#d6b56a]/10
          blur-[150px]
        "
      />

      <div className="relative z-10">
        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-[#d6b56a]
          "
        >
          Newsletter
        </span>

        <h3
          className="
            mt-5
            text-4xl
            font-light
            leading-tight
            text-white
          "
        >
          Stay Ahead of
          <span className="block text-[#d6b56a]">
            Luxury Living
          </span>
        </h3>

        <p
          className="
            mt-6
            max-w-lg
            text-[15px]
            leading-8
            text-white/55
          "
        >
          Receive exclusive property launches, market insights,
          architecture inspiration and premium investment
          opportunities directly in your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="
            mt-10
            flex
            flex-col
            gap-4
            lg:flex-row
          "
        >
          <div
            className="
              flex
              flex-1
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-black/25
              px-6
            "
          >
            <Mail
              size={18}
              className="text-[#d6b56a]"
            />

            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                h-16
                w-full
                bg-transparent
                text-white
                outline-none
                placeholder:text-white/30
              "
            />
          </div>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: .97,
            }}
            type="submit"
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-full
              bg-gradient-to-r
              from-[#a67b34]
              via-[#ddb86d]
              to-[#a67b34]
              px-8
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#050505]
            "
          >
            Subscribe

            <ArrowUpRight size={18} />
          </motion.button>
        </form>

        {subscribed && (
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
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[#d6b56a]/20
              bg-[#d6b56a]/10
              px-5
              py-4
              text-[#e4c67e]
            "
          >
            <CheckCircle2 size={18} />

            Thanks for subscribing.
          </motion.div>
        )}

        <motion.div
          initial={{
            scaleX: 0,
          }}
          whileInView={{
            scaleX: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
          }}
          className="
            mt-8
            h-px
            origin-left
            bg-gradient-to-r
            from-transparent
            via-[#d6b56a]
            to-transparent
          "
        />

        <p
          className="
            mt-6
            text-xs
            leading-6
            text-white/35
          "
        >
          No spam. Only carefully curated luxury real estate
          updates, design inspiration and exclusive invitations.
        </p>
      </div>

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