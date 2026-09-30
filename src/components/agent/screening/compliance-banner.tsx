import React from 'react';
import { Gavel } from 'lucide-react';

export function ComplianceBanner() {
  return (
    <div className="bg-[#f0eded] rounded-lg p-4 flex items-start sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-start sm:items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-[#dce5de] flex items-center justify-center shrink-0 text-[#132A20]">
          <Gavel className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <span className="text-sm text-[#1c1b1b] font-semibold block">Human-in-the-Loop Mandate Active</span>
          <p className="text-xs text-[#424844]">
            Automated hard declines are strictly disabled under Haven Compliance rules. Flagged applicants require accredited agent assessment before any determination.
          </p>
        </div>
      </div>
      <span className="shrink-0 px-2 py-1 rounded bg-white text-xs font-mono text-[#132A20] font-medium shadow-sm">
        MARLA Core Spec 4.2
      </span>
    </div>
  );
}