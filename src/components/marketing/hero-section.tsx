"use client";

import Link from "next/link";
import React from "react";
import { HeroDashboardMockup } from "./hero-dashboard-mockup";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative hero-glow overflow-hidden px-0 pb-16 pt-8 sm:pb-24 sm:pt-12" data-purpose="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Pill Badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <Badge
          variant="outline"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/5 border-brand/10 text-brand text-xs font-semibold tracking-wider uppercase mb-7"
        >
          {/* <span className="w-1.5 h-1.5 rounded-full bg-brand" /> */}
          UK Property Management
        </Badge>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="mx-auto max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight text-neutral-900 min-[400px]:text-4xl sm:text-5xl md:text-6xl">
          Connecting Landlords, Tenants, and Agents Seamlessly
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }} className="mx-auto mt-5 max-w-2xl text-base font-normal leading-relaxed text-neutral-600 sm:mt-6 sm:text-xl">
          A unified platform for rent tracking, maintenance requests, and verified artisans — everything landlords, tenants, and agents need in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }} className="mx-auto mt-7 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:gap-4">
          <Button asChild size="md" className="w-full rounded-xl bg-brand px-7 py-3.5 text-white hover:bg-[#1c3429] sm:w-auto">
            <Link href="/sign-up">Create Account</Link>
          </Button>
          <Button asChild variant="outline" size="md" className="w-full rounded-xl border-neutral-300 bg-white px-7 py-3.5 text-neutral-800 hover:bg-neutral-50 sm:w-auto">
            <Link href="#agency">Inquire as Agent</Link>
          </Button>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}>
          <HeroDashboardMockup />
        </motion.div>
      </div>
    </section>
  );
};
