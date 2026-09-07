"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        setError(
          "Your OTP verification session has expired. Please request a new OTP."
        );
      }

      setCheckingSession(false);
    }

    void checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw new Error(
          "Your verification session has expired. Please request a new OTP."
        );
      }

      const { error: updateError } =
        await supabase.auth.updateUser({
          password,
        });

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      setPassword("");
      setConfirmPassword("");

      await supabase.auth.signOut();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your password."
      );
    } finally {
      setLoading(false);
    }
  }

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-5">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#d4af37]" />
          <p className="mt-4 text-sm text-white/40">
            Verifying your session...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-semibold tracking-[0.18em]"
          >
            <span className="text-[#d4af37]">N</span>
            <span>NESTVILLE</span>
          </Link>

          <p className="mt-3 text-xs uppercase tracking-[0.3em] text-white/40">
            Luxury Real Estate
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 shadow-2xl sm:p-9">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10">
            {success ? (
              <CheckCircle2 className="h-6 w-6 text-[#d4af37]" />
            ) : (
              <LockKeyhole className="h-6 w-6 text-[#d4af37]" />
            )}
          </div>

          {success ? (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-semibold">
                  Password Updated
                </h1>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  Your NestVille admin password has been changed
                  successfully.
                </p>
              </div>

              <Link
                href="/admin/login"
                className="mt-8 block w-full rounded-xl bg-[#d4af37] px-5 py-3.5 text-center text-sm font-semibold text-black transition hover:bg-[#e2c45a]"
              >
                GO TO ADMIN LOGIN
              </Link>
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-semibold">
                  Create New Password
                </h1>

                <p className="mt-2 text-sm leading-6 text-white/50">
                  Your OTP has been verified. Create a new password
                  for your admin account.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300">
                  {error}
                </div>
              )}

              {!error.includes("expired") && (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* New Password */}
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                      New Password
                    </label>

                    <div className="relative">
                      <input
                        type={
                          showPassword ? "text" : "password"
                        }
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 pr-12 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/50">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 pr-12 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#d4af37]/60 focus:ring-1 focus:ring-[#d4af37]/30"
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs leading-5 text-white/30">
                    Use at least 6 characters for your new
                    password.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#d4af37] px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-[#e2c45a] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading
                      ? "UPDATING PASSWORD..."
                      : "CHANGE PASSWORD"}
                  </button>
                </form>
              )}

              {error.includes("expired") && (
                <Link
                  href="/admin/forgot-password"
                  className="mt-6 block w-full rounded-xl bg-[#d4af37] px-5 py-3.5 text-center text-sm font-semibold text-black transition hover:bg-[#e2c45a]"
                >
                  REQUEST NEW OTP
                </Link>
              )}
            </>
          )}

          {/* Back */}
          {!success && (
            <div className="mt-8 border-t border-white/10 pt-6 text-center">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-[#d4af37]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Admin Login
              </Link>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-white/25">
          NestVille Admin Portal
        </p>
      </div>
    </main>
  );
}