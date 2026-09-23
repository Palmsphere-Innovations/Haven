"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  showArrow?: boolean;
}

export const ProcessFlowSection: React.FC = () => {
  const steps: StepItem[] = [
    {
      step: "STEP 01",
      title: "Create Role Profile",
      description:
        "Register as a Landlord, Tenant, or Agent. Complete credential verification tailored for your specific regulatory path.",
      showArrow: true,
    },
    {
      step: "STEP 02",
      title: "List or Manage Property",
      description:
        "Connect existing tenancy parameters, upload statutory certificates, or configure portfolio tiers.",
      showArrow: true,
    },
    {
      step: "STEP 03",
      title: "Manage Digitally",
      description:
        "Collect payments, track repair requests, communicate instantly, and maintain auditable financial ledgers.",
      showArrow: false,
    },
  ];

  return (
    <section
      className="py-20 sm:py-28 border-t border-neutral-200/70 bg-white"
      id="how-it-works"
      data-purpose="how-it-works-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            THE PROCESS FLOW
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            How Haven Operates
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative flex flex-col p-6 rounded-2xl bg-[#FCF9F8] border border-neutral-200 shadow-xs"
            >
              <span className="text-xs font-mono font-bold text-neutral-400 mb-3">
                {item.step}
              </span>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {item.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {item.description}
              </p>
              {item.showArrow && (
                <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-10 text-neutral-400">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
