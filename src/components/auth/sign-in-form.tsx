"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/auth";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { motion } from "framer-motion";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    const response = await loginUser(data);
    router.push(
      `/mfa?flow=login&email=${encodeURIComponent(response.user.email)}`,
    );
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: "easeOut" }} className="w-full max-w-110 rounded-2xl border border-gray-200/90 bg-white p-8 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.06)] sm:p-10" data-purpose="login-card">
      <div className="mb-7 text-left">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-snug">Log in to Haven</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">Manage your properties, tenancies, and maintenance in one place.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate data-purpose="login-form">
        <div className="space-y-1.5 text-left">
          <Label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">Email Address</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="e.g. robert.smith@domain.co.uk" aria-invalid={Boolean(errors.email)} {...register("email")} className="w-full rounded-lg border border-gray-300 px-3.5 py-5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10" />
          {errors.email && <p className="text-xs text-red-700" role="alert">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5 text-left">
          <Label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-700">Password</Label>
          <div className="relative">
            <Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="••••••••••••" aria-invalid={Boolean(errors.password)} {...register("password")} className="w-full rounded-lg border border-gray-300 py-5.5 pl-3.5 pr-20 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/10" />
            <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-gray-200 bg-gray-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:bg-gray-200">
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-700" role="alert">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end pt-0.5">
          <Link href="/forgot-password" className="text-xs font-semibold text-brand transition-all hover:underline">Forgot password?</Link>
        </div>
        <p className="pt-1 text-left text-xs leading-normal text-gray-500">You&apos;ll receive a verification code after signing in.</p>
        <Button type="submit" disabled={isSubmitting} size="md" className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#1B3B2D] disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? "Signing in..." : "Login"}
        </Button>
      </form>

      <div className="mt-6 border-t border-gray-100 pt-5 text-left">
        <p className="text-xs leading-relaxed text-gray-500">New tenant? You&apos;ll receive an invite from your landlord or agent.</p>
      </div>
    </motion.div>
  );
};
