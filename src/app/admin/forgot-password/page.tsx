"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, ArrowLeft, Mail, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [step, setStep] = useState<"email" | "otp" | "password">("email");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function sendOtp(e: FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("A 6-digit OTP has been sent to your email.");
    setStep("otp");
  }

  async function verifyOtp(e: FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");

    const cleanOtp = otp.replace(/\D/g, "");

    if (cleanOtp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: cleanOtp,
      type: "recovery",
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("OTP verified successfully.");
    setStep("password");
  }

  async function updatePassword(e: FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    await supabase.auth.signOut();

    setLoading(false);
    setMessage("Password updated successfully. You can now login.");

    setTimeout(() => {
      window.location.href = "/admin/login";
    }, 1500);
  }

  async function resendOtp() {
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase()
    );

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("A new OTP has been sent to your email.");
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <div className="text-3xl tracking-[0.35em] font-light text-[#d4af37]">
              NESTVILLE
            </div>

            <div className="text-[10px] tracking-[0.45em] text-white/40 mt-2">
              LUXURY REAL ESTATE
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0b0b0b] p-8 shadow-2xl">
          {/* EMAIL STEP */}
          {step === "email" && (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 flex items-center justify-center mb-5">
                  <Mail size={21} className="text-[#d4af37]" />
                </div>

                <h1 className="text-2xl font-medium">
                  Forgot Password
                </h1>

                <p className="text-sm text-white/45 mt-2 leading-6">
                  Enter your admin email address and we&apos;ll send you a
                  6-digit verification code.
                </p>
              </div>

              <form onSubmit={sendOtp} className="space-y-5">
                <div>
                  <label className="block text-xs tracking-wide text-white/50 mb-2">
                    ADMIN EMAIL
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@nestville.com"
                    autoComplete="email"
                    className="w-full h-12 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm outline-none transition focus:border-[#d4af37]/60"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="rounded-lg border border-[#d4af37]/20 bg-[#d4af37]/10 px-4 py-3 text-sm text-[#d4af37]">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-lg bg-[#d4af37] text-black text-sm font-semibold transition hover:bg-[#e2c15b] disabled:opacity-50"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            </>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 flex items-center justify-center mb-5">
                  <ShieldCheck size={22} className="text-[#d4af37]" />
                </div>

                <h1 className="text-2xl font-medium">
                  Verify OTP
                </h1>

                <p className="text-sm text-white/45 mt-2 leading-6">
                  Enter the 6-digit code sent to
                </p>

                <p className="text-sm text-[#d4af37] mt-1 break-all">
                  {email}
                </p>
              </div>

              <form onSubmit={verifyOtp} className="space-y-5">
                <div>
                  <label className="block text-xs tracking-wide text-white/50 mb-2">
                    VERIFICATION CODE
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="000000"
                    className="w-full h-14 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-center text-2xl tracking-[0.5em] outline-none transition focus:border-[#d4af37]/60"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="rounded-lg border border-[#d4af37]/20 bg-[#d4af37]/10 px-4 py-3 text-sm text-[#d4af37]">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-lg bg-[#d4af37] text-black text-sm font-semibold transition hover:bg-[#e2c15b] disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  type="button"
                  onClick={resendOtp}
                  disabled={loading}
                  className="w-full text-sm text-white/50 hover:text-[#d4af37] transition"
                >
                  Resend OTP
                </button>
              </form>
            </>
          )}

          {/* PASSWORD STEP */}
          {step === "password" && (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 flex items-center justify-center mb-5">
                  <ShieldCheck size={22} className="text-[#d4af37]" />
                </div>

                <h1 className="text-2xl font-medium">
                  Create New Password
                </h1>

                <p className="text-sm text-white/45 mt-2 leading-6">
                  Your OTP has been verified. Set a new password for your
                  admin account.
                </p>
              </div>

              <form onSubmit={updatePassword} className="space-y-5">
                {/* Password */}
                <div>
                  <label className="block text-xs tracking-wide text-white/50 mb-2">
                    NEW PASSWORD
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      className="w-full h-12 rounded-lg border border-white/10 bg-white/[0.03] px-4 pr-12 text-sm outline-none transition focus:border-[#d4af37]/60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm */}
                <div>
                  <label className="block text-xs tracking-wide text-white/50 mb-2">
                    CONFIRM PASSWORD
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                      className="w-full h-12 rounded-lg border border-white/10 bg-white/[0.03] px-4 pr-12 text-sm outline-none transition focus:border-[#d4af37]/60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      {showConfirm ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="rounded-lg border border-[#d4af37]/20 bg-[#d4af37]/10 px-4 py-3 text-sm text-[#d4af37]">
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-lg bg-[#d4af37] text-black text-sm font-semibold transition hover:bg-[#e2c15b] disabled:opacity-50"
                >
                  {loading ? "Updating Password..." : "Change Password"}
                </button>
              </form>
            </>
          )}

          {/* Back */}
          <div className="mt-7 pt-6 border-t border-white/10">
            <Link
              href="/admin/login"
              className="flex items-center justify-center gap-2 text-sm text-white/45 hover:text-[#d4af37] transition"
            >
              <ArrowLeft size={15} />
              Back to Admin Login
            </Link>
          </div>
        </div>

        <p className="text-center text-[11px] text-white/20 mt-7 tracking-wide">
          NESTVILLE ADMINISTRATION PORTAL
        </p>
      </div>
    </main>
  );
}