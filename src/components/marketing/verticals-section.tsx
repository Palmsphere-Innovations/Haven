"use client";

import React, { ReactNode } from "react";
import { CreditCard, Wrench, ShieldCheck, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface VerticalModuleProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const VerticalCard: React.FC<VerticalModuleProps & { index: number }> = ({ icon, title, description, index }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.08 }} whileHover={{ y: -4, scale: 1.01 }} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between">
    <div>
      <div className="w-11 h-11 rounded-xl bg-[#132A20]/5 flex items-center justify-center text-[#132A20] mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export const VerticalsSection: React.FC = () => {
  const modules: VerticalModuleProps[] = [
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Rent Tracking",
      description: "Automatic ledger recording, recurring card setup, and instant payout processing for landlords with instant notification triggers.",
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: "Maintenance",
      description: "Tenants log issues with photo diagnostic files; notifications route instantly to assigned agents or landlords.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Verified Artisans",
      description: "Curated tradesperson dispatch network with background validation, pricing assurance, and compliance checks.",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "Compliance & Documents",
      description: "Statutory certificate management (CP12, EPC, EICR), tenancy agreement vaults, and automated renewal reminder schedules.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 border-t border-neutral-200/70 bg-[#FAF7F5]" data-purpose="verticals-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-14 max-w-2xl">
          <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            PLATFORM MODULES
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Key Functional Verticals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m, index) => (
            <VerticalCard key={m.title} {...m} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
