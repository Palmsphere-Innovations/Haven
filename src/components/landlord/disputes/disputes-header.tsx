"use client";

import React from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DisputesHeaderProps {
  totalDisputes: number;
  actionRequiredCount: number;
  onRaiseClaim: () => void;
  onExportCsv: () => void;
}

export const DisputesHeader: React.FC<DisputesHeaderProps> = ({
  totalDisputes,
  actionRequiredCount,
  onRaiseClaim,
  onExportCsv,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-stone-900">
            Disputes &amp; Statutory ADR
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-semibold tracking-wide uppercase border border-stone-200">
            PORTFOLIO ARBITRATION
          </span>
          {actionRequiredCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[11px] font-semibold tracking-wide border border-rose-200">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              {actionRequiredCount} Action{actionRequiredCount > 1 ? "s" : ""} Due
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          {totalDisputes} total cases logged across Vance Holdings portfolio · Independent ADR, Deposit Dilapidations &amp; Lease Grievances.
        </p>
      </div>

      <div className="flex items-center gap-2.5 self-start sm:self-auto">
        <Button
          variant="outline"
          onClick={onExportCsv}
          className="h-9 px-3.5 bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-stone-500 mr-1.5" />
          Export Evidence Docket
        </Button>
        <Button
          onClick={onRaiseClaim}
          className="h-9 px-4 bg-[#132A20] hover:bg-[#0b1b14] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Raise Tenancy Claim
        </Button>
      </div>
    </div>
  );
};
