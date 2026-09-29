"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginUser, DEMO_ACCOUNTS } from "@/lib/auth";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck } from "lucide-react";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await loginUser(data);
    router.push(
      `/mfa?flow=login&email=${encodeURIComponent(response.user.email)}&role=${response.user.role}`,
    );
  };

  const handleQuickFill = (email: string) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", "SecurePassword123!", { shouldValidate: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-115 rounded-2xl border border-gray-200/90 bg-white p-7 sm:p-9 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.06)]"
      data-purpose="login-card"
    >
      <div className="mb-6 text-left">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md mb-2 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Haven Multi-Role Identity Access</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-snug">Log in to Haven</h1>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
          Sign in to access your role-scoped portfolio, maintenance, and compliance workspaces.
        </p>
      </div>

      {/* Quick Demo Role Fillers for seamless testing */}
      <div className="mb-5 p-3 rounded-xl bg-stone-50 border border-stone-200/90 text-left">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-stone-700 flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-stone-500" />
            Quick Demo Logins:
          </span>
          <span className="text-[10px] text-stone-400">Click to autofill credentials</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {DEMO_ACCOUNTS.map((acc) => (
            <button
              key={acc.role}
              type="button"
              onClick={() => handleQuickFill(acc.email)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 hover:border-stone-300 text-stone-800 transition-colors cursor-pointer capitalize"
            >
              {acc.role}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left" noValidate data-purpose="login-form">
        <div className="space-y-1.5 text-left">
          <Label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
            Work Email Address
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. robert.smith@domain.co.uk"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-xs text-gray-900 placeholder:text-gray-400 transition-colors focus:border-brand focus:bg-white focus:ring-1 focus:ring-brand"
          />
          {errors.email && <p className="text-xs text-red-700" role="alert">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5 text-left">
          <Label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••••••"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-3.5 pr-16 text-xs text-gray-900 placeholder:text-gray-400 transition-colors focus:border-brand focus:bg-white focus:ring-1 focus:ring-brand"
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:bg-gray-200 cursor-pointer"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-700" role="alert">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end pt-0.5">
          <Link href="/forgot-password" className="text-xs font-semibold text-brand transition-all hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          size="md"
          className="w-full rounded-lg bg-[#132A20] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#0c1c15] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Signing in..." : "Continue to Security Verification"}
        </Button>
      </form>

      <div className="mt-6 border-t border-gray-100 pt-4 flex flex-col gap-2 text-center">
        <p className="text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-semibold text-brand hover:underline">
            Register here
          </Link>
        </p>
        <p className="text-xs text-stone-500">
          Contractor / Trade Partner?{" "}
          <Link href="/vendor/join" className="font-semibold text-emerald-800 hover:underline">
            Join as a Vendor
          </Link>
        </p>
      </div>
    </motion.div>
  );
};
