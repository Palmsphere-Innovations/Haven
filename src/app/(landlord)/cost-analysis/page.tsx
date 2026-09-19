"use client";

import React from "react";
import { Gavel } from "lucide-react";
import { CostHeader } from "@/components/landlord/financials/cost-analysis/cost-header";
import { CostMetrics } from "@/components/landlord/financials/cost-analysis/cost-metrics";
import { SpendChart } from "@/components/landlord/financials/cost-analysis/spend-chart";
import { TradeBreakdown } from "@/components/landlord/financials/cost-analysis/trade-breakdown";
import { RankedPropertyTable } from "@/components/landlord/financials/cost-analysis/ranked-property-table";

export default function CostAnalysisPage() {
  return (
    <div className="space-y-6 pb-12">
      <CostHeader />
      <CostMetrics />
      <SpendChart />
      <TradeBreakdown />
      <RankedPropertyTable />

      {/* Statutory Footer */}
      <footer className="p-4 rounded-2xl bg-[#F9F9F8] border border-[#ECEEED] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <Gavel className="w-4 h-4 text-[#132A20]" />
          <span>
            Operating in strict compliance with <strong className="text-stone-900">Landlord and Tenant Act 1985 Section 11</strong> and <strong className="text-stone-900">HMRC Property Income Manual (PIM2020)</strong>.
          </span>
        </div>
        <span className="font-mono text-[10px] text-stone-400">REF: UK-ACC-2026-VANCE</span>
      </footer>
    </div>
  );
}