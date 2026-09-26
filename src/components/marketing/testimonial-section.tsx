"use client";

import React, { useEffect, useRef, useState } from "react";
import { ShieldCheck, Lock, Sparkles } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, type Variants } from "framer-motion";

// Helper Component for Animated Number Counters
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [displayValue, setDisplayValue] = useState(value);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 70,
    damping: 20,
    duration: 1.2,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl font-extrabold text-brand">
      {displayValue}{suffix}
    </span>
  );
}

export const TestimonialSection: React.FC = () => {
  // Stagger animation variants for smooth cascading entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-20 sm:py-28 border-t border-neutral-200/70 bg-[#FAF7F5] overflow-hidden" data-purpose="mission-and-metrics-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Part: Platform Standard & Mission */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-4xl mx-auto text-center space-y-6"
        >
          <motion.p variants={itemVariants} className="text-xs font-semibold tracking-widest text-brand uppercase">
            OUR PLATFORM STANDARD
          </motion.p>

          <motion.blockquote
            variants={itemVariants}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 leading-snug"
          >
            “Built from the ground up for UK landlords and property managers who demand uncompromising statutory compliance, absolute ledger clarity, and zero administrative friction.”
          </motion.blockquote>

          <motion.div variants={itemVariants} className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-neutral-600 font-medium">
            <motion.span
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-xs cursor-default"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Law of Property Act 1925 Compliant
            </motion.span>

            <motion.span
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-xs cursor-default"
            >
              <Lock className="w-4 h-4 text-brand" />
              Immutable Audit Trail
            </motion.span>

            <motion.span
              whileHover={{ y: -2, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full border border-neutral-200 shadow-xs cursor-default"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              Sovereignty Guaranteed
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Bottom Part: Key System Metrics with Animated Counter */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="pt-12 border-t border-neutral-200/80"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            {/* Stat 1 */}
            <div className="space-y-1.5 p-4 rounded-2xl hover:bg-white/50 transition-colors">
              <div className="flex items-center justify-center">
                <Counter value={100} suffix="%" />
              </div>
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Statutory Audit Protection
              </div>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                Automated tracking for CP12, EICR, EPC &amp; DPS compliance certificates.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1.5 p-4 rounded-2xl border-y md:border-y-0 md:border-x border-neutral-200/80 py-6 md:py-4 hover:bg-white/50 transition-colors">
              <div className="flex items-center justify-center">
                <Counter value={0} suffix="s" />
              </div>
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Silent Handover Risk
              </div>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                Cryptographic two-party signoff on all property delegation transfers.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1.5 p-4 rounded-2xl hover:bg-white/50 transition-colors">
              <div className="flex items-center justify-center">
                <span className="font-mono text-3xl sm:text-4xl font-extrabold text-brand">
                  Tier 1
                </span>
              </div>
              <div className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Data Sovereignty
              </div>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                Landlords maintain permanent root access over all portfolio logs.
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
