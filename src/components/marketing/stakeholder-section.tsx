import Link from "next/link";
import React from "react";

interface StakeholderCardProps {
  step: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

const StakeholderCard: React.FC<StakeholderCardProps> = ({ step, title, description, ctaText, ctaHref }) => (
  <article className="flex flex-col justify-between p-8 rounded-2xl bg-brand-surface border border-neutral-200 hover:border-brand/30 hover:shadow-md transition-all duration-200">
    <div>
      <span className="inline-block text-xs font-semibold text-neutral-400 bg-white px-2.5 py-1 rounded-md border border-neutral-200 mb-6">
        {step}
      </span>
      <h3 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">{title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed mb-8">{description}</p>
    </div>
    <div>
      <Link className="inline-flex items-center text-sm font-semibold text-brand hover:text-brand-hover group" href={ctaHref}>
        {ctaText}
        <span className="ml-1.5 transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  </article>
);

export const StakeholderSection: React.FC = () => {
  const stakeholders: StakeholderCardProps[] = [
    {
      step: "01",
      title: "I'm a Landlord",
      description: "Automate rent collection, process background checks, manage compliance documents, and dispatch verified maintenance professionals.",
      ctaText: "Get Started",
      ctaHref: "/sign-up?role=landlord",
    },
    {
      step: "02",
      title: "I'm a Tenant",
      description: "Track your rent, submit maintenance requests, and stay in touch with your landlord or agent, all in one place.",
      ctaText: "Ask for access",
      ctaHref: "/sign-in?role=tenant",
    },
    {
      step: "03",
      title: "I'm an Agent",
      description: "Oversee entire agency portfolios, coordinate landlord-tenant communication, manage compliance across properties.",
      ctaText: "Get Started",
      ctaHref: "/sign-up?role=agent",
    },
  ];

  return (
    <section className="py-20 sm:py-24 border-t border-neutral-200/70 bg-white" id="features" data-purpose="stakeholders-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-widest text-neutral-500 uppercase mb-3">
            CHOOSE YOUR INTERFACE
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            Designed for Every Stakeholder
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stakeholders.map((item) => (
            <StakeholderCard key={item.step} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};