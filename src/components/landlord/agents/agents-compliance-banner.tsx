"use client";

import React from "react";
import { ShieldCheck, ChevronRight } from "lucide-react";

export function AgentComplianceBanner() {
  return (
    <div className="p-4 rounded-2xl bg-white border border-[#ECEEED] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] flex items-center justify-center text-[#132A20] shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-bold text-stone-900 flex items-center gap-2">
            UK Property Ombudsman &amp; Client Money Protection (CMP)
            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
              Statutory Mandate
            </span>
          </div>
          <p className="text-[11px] text-stone-500 mt-0.5 max-w-3xl">
            All delegated agents must hold verified CMP certification, professional indemnity insurance (£2M+), and redress scheme membership (PRS / TPO) under the Housing and Planning Act 2016. Haven audits renewals automatically 30 days prior to expiry.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="text-xs font-semibold text-[#132A20] hover:underline flex items-center gap-1 shrink-0 self-end md:self-center"
      >
        View Agent Compliance Vault <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}