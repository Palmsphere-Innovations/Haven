import React from "react";
import { HeroSection } from "@/components/marketing/hero-section";
import { StakeholderSection } from "@/components/marketing/stakeholder-section";
import { VerticalsSection } from "@/components/marketing/verticals-section";
import { ProcessFlowSection } from "@/components/marketing/process-flow-section";
import { TestimonialSection } from "@/components/marketing/testimonial-section";
import { FinalCTASection } from "@/components/marketing/final-cta-section";

export default function MarketingPage() {
  return (
    <div className="bg-brand-surface text-neutral-900 flex flex-col min-h-screen selection:bg-brand selection:text-white">
      <main className="grow">
        <HeroSection />
        <StakeholderSection />
        <VerticalsSection />
        <ProcessFlowSection />
        <TestimonialSection />
        <FinalCTASection />
      </main>
    </div>
  );
}