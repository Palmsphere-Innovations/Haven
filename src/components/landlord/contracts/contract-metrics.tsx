"use client";

import React, { useMemo } from "react";
import { ShieldCheck, PenTool, AlertTriangle, CheckCircle2 } from "lucide-react";
import { initialContracts, type ContractRecord } from "@/lib/mock/contracts";

interface ContractMetricsProps {
  contracts?: ContractRecord[];
}

export function ContractMetrics({ contracts = initialContracts }: ContractMetricsProps) {
  const { activeCount, awaitingCount, expiringCount, executedCount } = useMemo(() => {
    const active = contracts.filter((c) => c.status === "active").length;
    const awaiting = contracts.filter((c) => c.status === "awaiting" || c.status === "draft").length;
    const expiring = contracts.filter((c) => c.status === "expiring").length;
    const executed = contracts.filter((c) => c.status === "active" || c.status === "expiring").length;

    return {
      activeCount: active,
      awaitingCount: awaiting,
      expiringCount: expiring,
      executedCount: executed,
    };
  }, [contracts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Stat 1 */}
      <div className="p-5 rounded-2xl bg-white border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Active Enforceable Leases
          </span>
          <span className="p-2 rounded-xl bg-[#E8EFEA] text-[#132A20]">
            <ShieldCheck className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900 tracking-tight">{activeCount}</span>
            <span className="text-xs font-semibold text-emerald-700">100% compliant</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">DPS &amp; TDS custodial deposit backed</p>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="p-5 rounded-2xl bg-white border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Awaiting Signature
          </span>
          <span className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            <PenTool className="w-4 h-4 text-amber-600" />
          </span>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900 tracking-tight">{awaitingCount}</span>
            <span className="text-xs font-semibold text-amber-700">Action pending</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">Pending tenant / guarantor e-sign</p>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="p-5 rounded-2xl bg-white border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Expiring / Renewal Window
          </span>
          <span className="p-2 rounded-xl bg-rose-50 text-rose-800 border border-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </span>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900 tracking-tight">{expiringCount}</span>
            <span className="text-xs font-semibold text-rose-700">Renewal review</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">Section 21 / Renewal window open</p>
        </div>
      </div>

      {/* Stat 4 */}
      <div className="p-5 rounded-2xl bg-white border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            Fully Executed Leases
          </span>
          <span className="p-2 rounded-xl bg-stone-100 text-stone-700">
            <CheckCircle2 className="w-4 h-4" />
          </span>
        </div>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-stone-900 tracking-tight">{executedCount}</span>
            <span className="text-xs font-semibold text-stone-500">Recorded</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">Average execution turnaround</p>
        </div>
      </div>
    </div>
  );
}
