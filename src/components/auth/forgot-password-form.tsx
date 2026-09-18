"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { sendResetLink } from "@/lib/auth";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/validations/auth";
import { AnimatePresence, motion } from "framer-motion";

export const ForgotPasswordForm: React.FC = () => {
  const [viewState, setViewState] = useState<"form" | "sent">("form");
  const [resentStatus, setResentStatus] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });
  const [email, setEmail] = useState("");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    await sendResetLink(data);
    setEmail(data.email);
    setViewState("sent");
  };

  const handleResend = () => {
    setResentStatus(true);
    setTimeout(() => {
      setResentStatus(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Centered Floating Auth Card */}
      <div className="w-full max-w-120 rounded-2xl border border-[#ECEEEC] bg-white p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] transition-all sm:p-11">
        {/* STATE 1: Email Entry Form (Default) */}
        <AnimatePresence mode="wait" initial={false}>
        {viewState === "form" && (
          <motion.section key="form" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }} transition={{ duration: 0.25 }}
            data-purpose="reset-password-form-state"
          >
            {/* Card Header Text */}
            <div className="text-center mb-8">
              <h1 className="text-[28px] font-bold tracking-tight text-brand mb-2.5">
                Reset Password
              </h1>
              <p className="mx-auto max-w-100 text-[14px] leading-relaxed text-[#5A605C]">
                Enter your email and we&apos;ll send you a password reset link to re-verify your identity.
              </p>
            </div>

            {/* Password Reset Request Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left" noValidate>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-brand"
                >
                  Account Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. user@domain.co.uk"
                  {...register("email")}
                  aria-invalid={Boolean(errors.email)}
                  className="w-full px-4 py-5.5 bg-white border border-[#D5D8D6] rounded-lg text-sm text-brand placeholder-[#8C938F] focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors"
                />
                {errors.email && (
                  <p id="email-error" className="text-xs font-medium text-red-700" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5.5 px-6 rounded-lg bg-brand hover:bg-[#0c1b14] active:scale-[0.99] text-white font-semibold text-sm tracking-wide shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            {/* Bottom Navigation Links */}
            <div className="mt-8 pt-6 border-t border-[#F0F2F0] flex items-center justify-between text-xs font-medium">
              <span className="text-[#656A67]">
                Not your account?{" "}
                <Link
                  className="text-brand font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                  href="/#contact"
                >
                  Request Help
                </Link>
              </span>
              <Link
                className="text-brand font-semibold hover:opacity-80 transition-opacity"
                href="/sign-in"
              >
                Back to Login
              </Link>
            </div>
          </motion.section>
        )}

        {/* STATE 2: Check Email Confirmation (Mutually Exclusive) */}
        {viewState === "sent" && (
          <motion.section key="sent" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.25 }}
            data-purpose="email-sent-confirmation-state"
            aria-live="polite"
          >
            <div className="text-center py-3">
              {/* Checkmark Icon Circle */}
              <div className="mx-auto w-14 h-14 rounded-full bg-[#E6EFE8] flex items-center justify-center mb-6">
                <Check className="w-6 h-6 text-brand" strokeWidth={2.5} />
              </div>

              <h2 className="text-[26px] font-bold tracking-tight text-brand mb-2.5">
                Check your email
              </h2>

              <p className="mx-auto mb-8 max-w-85 text-[14px] leading-relaxed text-[#5A605C]">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-semibold text-brand">
                  {email.trim() ? email : "your registered email address"}
                </span>
                . Please follow instructions to establish credentials.
              </p>

              {/* Back to Login Primary Action */}
              <div className="space-y-4">
                <Link
                  href="/sign-in"
                  className="flex w-full items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-sm transition-all hover:bg-[#0c1b14] focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                >
                  Back to Login
                </Link>

                <p className="text-xs text-[#6B726E]">
                  Didn&apos;t receive email?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    className={`font-semibold underline underline-offset-2 hover:opacity-80 focus:outline-none transition-colors ${
                      resentStatus ? "text-emerald-700" : "text-brand"
                    }`}
                  >
                    {resentStatus ? "Link resent!" : "Resend link"}
                  </button>
                </p>
              </div>
            </div>

            {/* Confirmation Bottom Help Link */}
            <div className="mt-8 pt-6 border-t border-[#F0F2F0] text-center text-xs">
              <button
                type="button"
                onClick={() => {
                  setValue("email", email);
                  setViewState("form");
                }}
                className="text-[#656A67] hover:text-brand transition-colors"
              >
                Entered wrong email?{" "}
                <span className="font-semibold text-brand underline underline-offset-2">
                  Try another address
                </span>
              </button>
            </div>
          </motion.section>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};