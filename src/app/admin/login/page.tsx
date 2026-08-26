"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (signInError) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  }

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#050605]
        px-5
        py-12
        text-white
      "
    >
      {/* BACKGROUND */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-0
          h-[550px]
          w-[550px]
          rounded-full
          bg-[#d6b56a]/10
          blur-[190px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-emerald-950/20
          blur-[180px]
        "
      />

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

      {/* LOGIN CARD */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-[460px]
        "
      >
        {/* LOGO */}

        <div className="mb-8 text-center">
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-3
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
                border-[#d6b56a]/30
                font-medium
                text-[#d6b56a]
              "
            >
              N
            </span>

            <div className="text-left">
              <p
                className="
                  text-[15px]
                  tracking-[0.24em]
                  text-[#e4cc93]
                "
              >
                NESTVILLE
              </p>

              <p
                className="
                  mt-1
                  text-[7px]
                  uppercase
                  tracking-[0.28em]
                  text-white/30
                "
              >
                Admin Portal
              </p>
            </div>
          </Link>
        </div>

        {/* CARD */}

        <div
          className="
            rounded-[32px]
            border
            border-white/10
            bg-white/[0.025]
            p-6
            shadow-[0_35px_120px_rgba(0,0,0,.45)]
            backdrop-blur-2xl
            sm:p-8
          "
        >
          <div>
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#d6b56a]
              "
            >
              Secure Access
            </p>

            <h1
              className="
                mt-4
                text-4xl
                font-light
                tracking-[-0.035em]
                text-white
              "
            >
              Admin Login
            </h1>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-white/40
              "
            >
              Sign in with your NestVille
              administrator account.
            </p>
          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            {/* EMAIL */}

            <label className="block">
              <span
                className="
                  mb-3
                  block
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                Email Address
              </span>

              <div
                className="
                  flex
                  h-14
                  items-center
                  gap-3
                  rounded-[18px]
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  transition-colors
                  focus-within:border-[#d6b56a]/40
                "
              >
                <Mail
                  size={16}
                  className="text-[#d6b56a]"
                />

                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Admin email"
                  className="
                    w-full
                    bg-transparent
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/20
                  "
                />
              </div>
            </label>

            {/* PASSWORD */}

            <label className="block">
              <span
                className="
                  mb-3
                  block
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                Password
              </span>

              <div
                className="
                  flex
                  h-14
                  items-center
                  gap-3
                  rounded-[18px]
                  border
                  border-white/10
                  bg-black/20
                  px-4
                  transition-colors
                  focus-within:border-[#d6b56a]/40
                "
              >
                <LockKeyhole
                  size={16}
                  className="text-[#d6b56a]"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter password"
                  className="
                    w-full
                    bg-transparent
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-white/20
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    text-white/30
                    transition-colors
                    hover:text-[#d6b56a]
                  "
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </label>

            {/* ERROR */}

            {error && (
              <div
                className="
                  rounded-[16px]
                  border
                  border-red-400/15
                  bg-red-400/[0.06]
                  px-4
                  py-3
                  text-xs
                  text-red-300
                "
              >
                {error}
              </div>
            )}

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                group
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
                tracking-[0.2em]
                text-[#050605]
                transition-transform
                hover:scale-[1.02]
                disabled:cursor-wait
                disabled:opacity-60
              "
            >
              {loading
                ? "Signing In..."
                : "Sign In"}

              {!loading && (
                <ArrowRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              )}
            </button>
          </form>

          {/* RETURN */}

          <div
            className="
              mt-7
              border-t
              border-white/10
              pt-6
              text-center
            "
          >
            <Link
              href="/"
              className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-white/35
                transition-colors
                hover:text-[#d6b56a]
              "
            >
              ← Return to website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}