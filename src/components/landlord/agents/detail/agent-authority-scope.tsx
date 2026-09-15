"use client";

import React from "react";
import { ShieldCheck, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

export function AgentAuthorityScope() {
  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs overflow-hidden">
      <div className="p-5 bg-[#F9F9F8] border-b border-[#ECEEED] flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] text-[#132A20] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-stone-900">
                Statutory Authority: Tier 2 Delegation
              </h2>
              <span className="px-2 py-0.5 rounded bg-[#E8EFEA] text-[#132A20] text-[10px] font-bold uppercase tracking-wider">
                Tier 2 Active
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Maintenance Triage + Direct Tenant Communications Mandate (Law of Property Act 1925 compliant)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#ECEEED] text-xs">
          <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
          <div>
            <span className="text-[10px] text-stone-400 uppercase font-semibold block leading-none">
              Statutory Review
            </span>
            <span className="font-mono font-semibold text-stone-900">15 Oct 2026</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <p className="text-xs text-stone-600 leading-relaxed max-w-4xl">
          Grants full delegated power to triage, approve, and dispatch statutory trades up to the strict{" "}
          <strong className="text-stone-900 font-bold">£750 statutory limit</strong> per incident, communicate directly with AST tenants via Haven secure channels, and schedule required compliance reviews (Gas Safety CP12, EICR).{" "}
          <span className="text-rose-600 font-semibold">Explicitly excludes</span> bank ledger disbursements or deposit release authorisations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 border-t border-[#ECEEED]">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-900">Maintenance Dispatch</div>
              <div className="text-[10px] text-stone-500">Up to £750 per contractor event</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-900">Direct AST Messaging</div>
              <div className="text-[10px] text-stone-500">Haven encrypted messaging thread</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-900">Compliance &amp; Inspections</div>
              <div className="text-[10px] text-stone-500">CP12, EICR &amp; HMO periodic booking</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-[#ECEEED] opacity-75">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-900">Rent Ledger Payouts</div>
              <div className="text-[10px] text-stone-500">Restricted to Principal Landlord</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-[#ECEEED] opacity-75">
            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-900">AST Notice Services</div>
              <div className="text-[10px] text-stone-500">Section 8 / Section 21 reserved</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-stone-900">Key Custody Registry</div>
              <div className="text-[10px] text-stone-500">Physical key holding enabled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}