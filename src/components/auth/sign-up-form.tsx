"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { registerUser } from "@/lib/auth";
import { signUpSchema, type SignUpFormData } from "@/lib/validations/auth";
import { motion } from "framer-motion";

const fieldClass =
  "w-full rounded-lg border border-gray-300 px-3.5 text-[14px] placeholder:text-gray-400 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition-colors";

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      role: "landlord",
    },
  });

  const selectedRole = useWatch({ control, name: "role" });
  const agreeToTerms = useWatch({ control, name: "agreeToTerms" });
  const password = useWatch({ control, name: "password" }) || "";

  // Password Requirements Check
  const passwordRequirements = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "At least 1 uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "At least 1 number", valid: /[0-9]/.test(password) },
    { label: "At least 1 special character", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const passedRequirementsCount = passwordRequirements.filter((r) => r.valid).length;

  const getStrengthLabel = () => {
    if (passedRequirementsCount === 0) return { label: "", color: "bg-gray-200" };
    if (passedRequirementsCount <= 1) return { label: "Weak", color: "bg-red-500" };
    if (passedRequirementsCount <= 3) return { label: "Medium", color: "bg-amber-500" };
    return { label: "Strong", color: "bg-emerald-600" };
  };

  const strength = getStrengthLabel();

  const onSubmit = async (data: SignUpFormData) => {
    const response = await registerUser(data);
    router.push(
      `/mfa?flow=signup&email=${encodeURIComponent(response.user.email)}&role=${response.user.role}`
    );
  };

  const error = (name: keyof SignUpFormData) =>
    errors[name] ? (
      <p className="mt-1 text-xs font-medium text-red-600" role="alert">
        {errors[name]?.message}
      </p>
    ) : null;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} className="my-4 w-full max-w-135 rounded-2xl border border-gray-200/90 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] sm:p-11">
      <div className="mb-8 text-center">
        <h1 className="text-[28px] font-bold tracking-tight text-gray-950">
          Create Account
        </h1>
        <p className="mt-2 text-[14px] text-gray-500">
          Register as a verified Haven network participant
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left" noValidate>
        {/* Role Selector */}
        <div>
          <Label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-gray-900">
            Select Platform Role
          </Label>
          <div aria-label="Platform Role" className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group">
            {(["landlord", "agent", "vendor", "tenant"] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setValue("role", role, { shouldValidate: true })}
                className={`w-full rounded-lg border px-3 py-2 text-xs capitalize transition-all cursor-pointer ${
                  selectedRole === role
                    ? "border-brand bg-brand font-semibold text-white shadow-xs"
                    : "border-gray-300 bg-gray-50/70 font-medium text-gray-700 hover:bg-gray-100"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          {selectedRole === "vendor" && (
            <p className="mt-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md p-2">
              Note: Commercial trade partners can also use the{" "}
              <Link href="/vendor/join" className="font-semibold underline">
                Contractor Statutory Verification Portal →
              </Link>
            </p>
          )}
          {error("role")}
        </div>

        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="mb-1.5 block text-[13px] font-semibold text-gray-800">
            Full Name (Legal Spec)
          </Label>
          <Input id="fullName" placeholder="e.g. Robert Smith" {...register("fullName")} className={`${fieldClass} h-11`} />
          {error("fullName")}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-gray-800">
            Email Address
          </Label>
          <Input id="email" type="email" placeholder="e.g. robert.smith@domain.co.uk" {...register("email")} className={`${fieldClass} h-11`} />
          {error("email")}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold text-gray-800">
            Phone Number (UK Country Code)
          </Label>
          <Input id="phone" type="tel" placeholder="e.g. +447123456789" {...register("phone")} className={`${fieldClass} h-11`} />
          {error("phone")}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="mb-1.5 block text-[13px] font-semibold text-gray-800">
            Choose Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••••"
              {...register("password")}
              className={`${fieldClass} h-11 pr-20`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-gray-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-200"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="mt-2.5 space-y-2 rounded-lg bg-gray-50/80 p-3 border border-gray-100">
              <div className="flex items-center justify-between text-xs font-medium text-gray-600">
                <span>Password Strength</span>
                <span className="font-semibold text-gray-900">{strength.label}</span>
              </div>

              {/* Progress Bar Bars */}
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      passedRequirementsCount >= step ? strength.color : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Requirements Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {passwordRequirements.map((req, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                    {req.valid ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    ) : (
                      <X className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                    )}
                    <span className={req.valid ? "text-gray-900 font-medium" : "text-gray-500"}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error("password")}
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword" className="mb-1.5 block text-[13px] font-semibold text-gray-800">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••••••"
              {...register("confirmPassword")}
              className={`${fieldClass} h-11 pr-20`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-gray-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-200"
            >
              {showConfirmPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
          {error("confirmPassword")}
        </div>

        {/* Redesigned Terms and Conditions Checkbox */}
        <div className="space-y-1.5 pt-1">
          <div className="flex my-4 items-start text-base gap-3">
            <Checkbox
              id="terms"
              checked={agreeToTerms}
              onCheckedChange={(checked) =>
                setValue("agreeToTerms", checked === true, { shouldValidate: true })
              }
              aria-invalid={Boolean(errors.agreeToTerms)}
              className={`mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 text-brand focus-visible:ring-1 focus-visible:ring-brand ${
                errors.agreeToTerms ? "border-red-500 ring-1 ring-red-500" : ""
              }`}
            />
            <div
              // htmlFor="terms"
              className="cursor-pointer select-none text-[13px] font-normal leading-normal text-gray-600"
            >
              I agree to Haven&apos;s standard{" "}
              <Link href="/#terms" className="font-semibold text-brand underline-offset-2 hover:underline">
                Terms &amp; Conditions
              </Link>{" "}
              and regulatory{" "}
              <Link href="/#privacy" className="font-semibold text-brand underline-offset-2 hover:underline">
                Privacy Policy
              </Link>{" "}
              as required under UK real estate data compliance guidelines.
            </div>

          </div>
          {error("agreeToTerms")}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-brand text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#0c1b14] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Register Secure Account"}
        </Button>

        {/* Log In Redirect */}
        <div className="pt-2 text-center text-[14px] text-gray-600">
          Already have an account?{" "}
          <Link className="ml-1 font-semibold text-brand hover:underline" href="/sign-in">
            Log in
          </Link>
        </div>

        {/* Vendor Onboarding Link */}
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <Link
            href="/vendor/join"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>Are you a contractor or trade partner?</span>
            <span className="font-semibold underline">Join Haven as a Vendor →</span>
          </Link>
        </div>
      </form>
    </motion.div>
  );
};
