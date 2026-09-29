"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface StakeholderCardProps {
  step: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  index: number;
}

const StakeholderCard: React.FC<StakeholderCardProps> = ({
  step,
  title,
  description,
  ctaText,
  ctaHref,
  index,
}) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.45, delay: index * 0.1 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-brand-surface p-6 transition-all duration-200 hover:border-brand/30 hover:shadow-md sm:p-8"
  >
    <div>
      <span className="mb-4 inline-block rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-400 sm:mb-6">
        {step}
      </span>
      <h3 className="mb-3 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
        {title}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-neutral-600 sm:mb-8">
        {description}
      </p>
    </div>
    <div>
      <Link
        className="inline-flex items-center text-sm font-semibold text-brand hover:text-brand-hover group"
        href={ctaHref}
      >
        {ctaText}
        <span className="ml-1.5 transition-transform group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  </motion.article>
);

export const StakeholderSection: React.FC = () => {
  const stakeholders = [
    {
      step: "01",
      title: "I'm a Landlord",
      description:
        "Automate rent collection, process background checks, manage compliance documents, and dispatch verified maintenance professionals.",
      ctaText: "Get Started",
      ctaHref: "/sign-up?role=landlord",
    },
    {
      step: "02",
      title: "I'm a Tenant",
      description:
        "Track your rent, submit maintenance requests, and stay in touch with your landlord or agent, all in one place.",
      ctaText: "Ask for access",
      ctaHref: "/sign-in?role=tenant",
    },
    {
      step: "03",
      title: "I'm an Agent",
      description:
        "Oversee entire agency portfolios, coordinate landlord-tenant communication, manage compliance across properties.",
      ctaText: "Get Started",
      ctaHref: "/sign-up?role=agent",
    },
  ];

  return (
    <section
      className="border-t border-neutral-200/70 bg-white py-16 sm:py-20 lg:py-24"
      id="features"
      data-purpose="stakeholders-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 lg:mb-16"
        >
          <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            CHOOSE YOUR INTERFACE
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            Designed for Every Stakeholder
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {stakeholders.map((item, index) => (
            <StakeholderCard key={item.step} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
