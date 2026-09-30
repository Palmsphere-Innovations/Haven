"use client";

import React from "react";
import { Clock, Gavel, ShieldCheck } from "lucide-react";
import { DisputeRecord } from "@/types/index";

interface DisputeMetricsRowProps {
  disputes: DisputeRecord[];
}

export const DisputeMetricsRow: React.FC<DisputeMetricsRowProps> = ({ disputes }) => {
  const openDisputes = disputes.filter((d) => d.status !== "resolved");
  const activeCase = disputes.find((d) => d.isSelected) || openDisputes[0] || disputes[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Card 1: Active Proceedings */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Active Proceedings
          </span>
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#132A20]">{openDisputes.length} Open</span>
            {activeCase && (
              <span className="text-xs font-semibold text-amber-800">
                Case #{activeCase.reference}
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 mt-1 truncate">
            {activeCase ? activeCase.title : "No active claims logged"}
          </p>
        </div>
        <div className="mt-4 pt-2.5 flex items-center justify-between text-[11px] text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/60">
          <span>
            Remedy sought:{" "}
            <strong className="text-[#132A20]">{activeCase?.remedy || "Operational notation"}</strong>
          </span>
          <span className="text-emerald-800 font-semibold">{activeCase?.statusLabel}</span>
        </div>
      </div>

      {/* Card 2: Resolution Channel */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Resolution Channel
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center justify-center">
            <Gavel className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#132A20]">DPS Alternative Dispute Resolution</div>
          <p className="text-xs text-stone-500 mt-1">
            Independent Tenancy Mediation &amp; Adjudication Service
          </p>
        </div>
        <div className="mt-4 pt-2.5 flex items-center justify-between text-[11px] text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/60">
          <span>
            Custodial ID: <strong className="font-mono text-[#132A20]">DPS-883921-LDN</strong>
          </span>
          <span className="text-emerald-800 font-semibold">Verified Active</span>
        </div>
      </div>

      {/* Card 3: Statutory Protection */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Statutory Protection
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#132A20]">Housing Act 1988 &amp; TFA 2019</div>
          <p className="text-xs text-stone-500 mt-1">
            Assisted by TDS Custodial Deposit Guarantee Scheme
          </p>
        </div>
        <div className="mt-4 pt-2.5 flex items-center justify-between text-[11px] text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/60">
          <span>
            Protected Sum: <strong className="font-mono text-[#132A20]">£2,826.92</strong>
          </span>
          <span className="text-stone-700 font-medium">Fully Ring-fenced</span>
        </div>
      </div>
    </div>
  );
};