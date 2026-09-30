"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const FinalCTASection: React.FC = () => {
  return (
    <section
      className="border-t border-neutral-200/70 bg-white py-16 sm:py-24 lg:py-32"
      id="pricing"
      data-purpose="final-cta"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
          Ready to simplify your property management?
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto mb-9 leading-relaxed">
          Join UK property professionals operating on the Haven standard. Account
          setup takes less than five minutes.
        </p>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            asChild
            size="md"
          className="w-full rounded-xl bg-brand px-8 py-4 text-white shadow-md hover:bg-brand sm:w-auto"
          >
            <Link href="/sign-up">Initialize Free Account</Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
