"use client";

import Link from "next/link";
import React from "react";
import { HeroDashboardMockup } from "./hero-dashboard-mockup";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative hero-glow pt-10 pb-20 sm:pt-14 sm:pb-28 overflow-hidden" data-purpose="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Pill Badge */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <Badge
          variant="outline"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#132A20]/5 border-[#132A20]/10 text-[#132A20] text-xs font-semibold tracking-wider uppercase mb-7"
        >
          {/* <span className="w-1.5 h-1.5 rounded-full bg-[#132A20]" /> */}
          UK Property Management
        </Badge>
        </motion.div>

        {/* Hero Heading */}
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 max-w-4xl mx-auto leading-[1.12]">
          Connecting Landlords, Tenants, and Agents Seamlessly
        </motion.h1>

        {/* Subtitle */}
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.16 }} className="mt-6 text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
          A unified platform for rent tracking, maintenance requests, and verified artisans — everything landlords, tenants, and agents need in one place.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.24 }} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="md" className="w-full sm:w-auto px-7 py-3.5 bg-[#132A20] hover:bg-[#1c3429] text-white rounded-xl">
            <Link href="/signup">Create Account</Link>
          </Button>
          <Button variant="outline" size="md" className="w-full sm:w-auto px-7 py-3.5 bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50 rounded-xl">
            <Link href="#agency">Inquire as Agency</Link>
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