import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 border-t border-neutral-200/70 bg-white" id="pricing" data-purpose="final-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
          Ready to simplify your property management?
        </h2>
        <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto mb-9 leading-relaxed">
          Join UK property professionals operating on the Haven standard. Account setup takes less than five minutes.
        </p>
        <Button  size="md" className="px-8 py-4 bg-[#132A20] hover:bg-[#1B3A2C] text-white rounded-xl shadow-md">
          <Link href="/signup">Initialize Free Account</Link>
        </Button>
      </div>
    </section>
  );
};