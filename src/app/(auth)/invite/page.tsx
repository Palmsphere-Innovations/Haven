"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Home, Lock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function TenantInviteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract query params if passed via email magic link (e.g. /invite?email=...&name=...)
  const initialEmail = searchParams?.get("email") || "oliver.davies@kensington-tenants.co.uk";
  const initialName = searchParams?.get("name") || "Oliver Davies";

  const [fullName, setFullName] = useState(initialName);
  const [phone, setPhone] = useState("+44 7911 123456");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (fullName.trim().length < 2) {
      setError("Please enter your full legal name.");
      return;
    }
    if (!/^\+44\d{10}$/.test(phone.replace(/\s/g, ""))) {
      setError("Please enter a valid UK phone number, for example +447911123456.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreedTerms) {
      setError("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/tenant/dashboard");
  };

  return (
    <div className="w-full max-w-[560px] bg-white rounded-2xl border border-[#E8E5E1] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] p-8 sm:p-10 my-10">
      {/* Context Badge & Heading */}
      <div className="text-center mb-7">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#132A20]/5 text-[#132A20] text-xs font-semibold uppercase tracking-wider mb-3">
          <Mail className="w-3.5 h-3.5" />
          Exclusive Tenant Invitation
        </div>

        <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-900 tracking-tight leading-snug">
          You&apos;ve been invited to Haven
        </h1>

        {/* Invite Highlight Box */}
        <div className="mt-4 p-3.5 bg-[#F8F6F3] rounded-xl border border-[#EBE8E3] text-left flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#132A20]/10 shrink-0 flex items-center justify-center text-[#132A20] mt-0.5">
            <Home className="w-4 h-4" />
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <span className="font-semibold text-neutral-900">Belgrave Property Management</span> has
            invited you to manage your tenancy at{" "}
            <span className="font-medium text-neutral-900">
              Flat 4B, 18 Kensington Mansions, London SW5 9TF
            </span>
            .
          </div>
        </div>
      </div>

      {/* Setup Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        {/* Full Name */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider" htmlFor="full-name">
              Full Name (Legal Spec)
            </label>
            <span className="text-[11px] text-neutral-400 font-medium">Pre-filled by inviter</span>
          </div>
          <Input
            id="full-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border-[#DDD8D1] rounded-lg text-sm text-neutral-900 focus-visible:ring-[#132A20] h-11"
            required
          />
        </div>

        {/* Email Address (Locked) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#132A20] bg-[#132A20]/5 px-2 py-0.5 rounded">
              <Lock className="w-3 h-3" />
              Verified via invite link
            </span>
          </div>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={initialEmail}
              readOnly
              className="w-full px-3.5 py-2.5 bg-[#F6F4F1] border-[#E0DDD8] rounded-lg text-sm text-neutral-600 cursor-not-allowed select-none h-11 pr-10"
            />
            <CheckCircle className="w-4 h-4 text-emerald-700 absolute right-3 top-3.5 pointer-events-none" />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5" htmlFor="phone">
            Phone Number (UK Country Code)
          </label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border-[#DDD8D1] rounded-lg text-sm text-neutral-900 focus-visible:ring-[#132A20] h-11"
            required
          />
        </div>

        {/* Choose Password */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5" htmlFor="password">
            Choose Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border-[#DDD8D1] rounded-lg text-sm text-neutral-900 focus-visible:ring-[#132A20] h-11 pr-16"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-xs font-semibold text-neutral-500 hover:text-[#132A20] transition"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border-[#DDD8D1] rounded-lg text-sm text-neutral-900 focus-visible:ring-[#132A20] h-11 pr-16"
              required
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-600 leading-relaxed select-none">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="mt-0.5 rounded border-neutral-300 text-[#132A20] focus:ring-[#132A20] w-4 h-4 accent-[#132A20]"
              required
            />
            <span>
              I agree to Haven&apos;s standard{" "}
              <Link href="/terms" className="text-[#132A20] font-semibold underline underline-offset-2">
                Terms &amp; Conditions
              </Link>{" "}
              and regulatory{" "}
              <Link href="/privacy" className="text-[#132A20] font-semibold underline underline-offset-2">
                Privacy Policy
              </Link>{" "}
              as required under UK residential tenancy data compliance guidelines.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 h-11 bg-brand hover:bg-[#0e1f17] text-white font-medium text-sm rounded-lg transition duration-150 shadow-sm flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? "Setting up account..." : "Complete Account Setup"}</span>
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>

        {/* Expiry Note */}
        <div className="pt-4 text-center border-t border-neutral-100 mt-4">
          <p className="text-xs text-neutral-500">
            This invite expires in <span className="font-semibold text-neutral-800">4 days</span>. Trouble accepting it?{" "}
            <Link href="/support" className="text-[#132A20] font-semibold hover:underline ml-1">
              Request Help
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default function TenantInvitePage() {
  return (
    <Suspense fallback={<div className="min-h-96 w-full max-w-[560px] rounded-2xl bg-white" />}>
      <TenantInviteForm />
    </Suspense>
  );
}
