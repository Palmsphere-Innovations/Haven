"use client";

import React from "react";
import { FileCheck, ChevronRight } from "lucide-react";

export function TenantsRegulatoryBanner() {
  return (
    <div className="p-4 rounded-2xl bg-white border border-[#ECEEED] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] flex items-center justify-center text-brand shrink-0 mt-0.5">
          <FileCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-stone-900">
            UK Statutory Tenancy Compliance
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Agreements strictly comply with the{" "}
            <span className="font-medium text-stone-900">Tenant Fees Act 2019</span>, Home Office{" "}
            <span className="font-medium text-stone-900">Right to Rent</span> checks, and custodial deposit protection (
            <span className="font-medium text-stone-900">TDS/DPS</span>) within 30 days.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="text-xs font-semibold text-[#132A20] hover:underline flex items-center gap-1 shrink-0"
      >
        Compliance Vault <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}