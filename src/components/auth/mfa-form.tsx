"use client";

import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export const VerifyIdentityForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Detect if user came from 'signup' or default to 'login'
  const flow = searchParams.get("flow") || "login";
  const emailParam = searchParams.get("email") || "";

  // Dynamic link destination and label based on flow
  const backLinkHref = flow === "signup" ? "/sign-up" : "/sign-in";
  const backLinkLabel = flow === "signup" ? "Back to Sign up" : "Back to Login";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(30);
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canResend = timer === 0;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[0-9A-Za-z]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
        inputRefs.current[index + 1]?.select();
      }
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;
    setTimer(30);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp.join(""))) {
      setHasError(true);
      window.setTimeout(() => setHasError(false), 450);
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    // Direct user to appropriate destination after successful verification
    if (flow === "signup") {
      router.push("/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={hasError ? { x: [-4, 4, -4, 4, 0] } : { opacity: 1, scale: 1 }}
      transition={hasError ? { duration: 0.35 } : { duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-120 bg-white rounded-[28px] border border-neutral-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04),0_12px_32px_-6px_rgba(0,0,0,0.06)] px-8 py-10 sm:px-11 sm:py-12"
      data-purpose="verification-card"
    >
      {/* Card Heading & Description */}
      <div className="text-center mb-8">
        <h1 className="text-[28px] font-bold tracking-tight text-neutral-900 leading-tight">
          Verify your identity
        </h1>
        <p className="text-sm text-neutral-600 mt-3 leading-relaxed max-w-sm mx-auto">
          Enter the 6-digit code we sent to{" "}
          <span className="font-semibold text-neutral-900">
            {emailParam ? decodeURIComponent(emailParam) : "your email/phone"}
          </span>{" "}
          to finish {flow === "signup" ? "setting up your account" : "signing in"}.
        </p>
      </div>

      {/* Verification Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {hasError && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-center text-xs text-red-700">Enter the 6-digit verification code.</p>}
        {/* 6-Digit OTP Inputs */}
        <div className="space-y-3">
          <Label className="block text-xs font-semibold uppercase tracking-wider text-neutral-500 text-center mb-2">
            Verification Code
          </Label>
          <div
            className="flex items-center justify-between gap-2 sm:gap-3"
            data-purpose="otp-input-group"
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                aria-label={`Digit ${index + 1}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                placeholder="·"
                autoFocus={index === 0}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold text-brand placeholder:text-neutral-300 bg-white border border-neutral-300 rounded-xl focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition duration-150"
              />
            ))}
          </div>
        </div>

        {/* Resend Code Prompt & Dynamic Timer */}
        <div className="text-center pt-1" data-purpose="resend-countdown-group">
          <p className="text-sm text-neutral-600">
            Didn&apos;t get a code?{" "}
            <button
              type="button"
              disabled={!canResend}
              onClick={handleResendCode}
              className={`font-medium focus:outline-none focus:underline ml-1 ${
                canResend
                  ? "text-brand hover:underline cursor-pointer"
                  : "text-neutral-400 cursor-not-allowed"
              }`}
            >
              Resend code
            </button>
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            You can resend in{" "}
            <span className="font-medium text-neutral-500">
              {formatTimer(timer)}
            </span>
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-brand hover:bg-[#0e1f18] text-white font-medium text-base rounded-xl transition duration-150 shadow-sm flex items-center justify-center cursor-pointer"
          >
            {isSubmitting ? "Verifying..." : "Verify & Continue"}
          </Button>
        </div>

        {/* Dynamic Back Navigation Link */}
        <div className="text-center pt-2">
          <Link
            href={backLinkHref}
            className="inline-flex items-center justify-center text-sm font-medium text-brand hover:text-[#0b1712] hover:underline transition-colors"
          >
            {backLinkLabel}
          </Link>
        </div>
      </form>
    </motion.div>
  );
};