"use client";

import React from "react";
import { BadgePoundSterling, CheckCircle2, Scale } from "lucide-react";
import { LandlordDisputeRecord } from "@/lib/mock/landlord-disputes";

interface DisputesStatsProps {
  disputes: LandlordDisputeRecord[];
}

export const DisputesStats: React.FC<DisputesStatsProps> = ({ disputes }) => {
  const activeDisputes = disputes.filter((d) => d.status !== "resolved");
  const actionRequiredDisputes = disputes.filter((d) => d.status === "action_required");
  const resolvedDisputes = disputes.filter((d) => d.status === "resolved");

  // Calculate contested capital
  const totalContestedCapital = activeDisputes.reduce((acc, curr) => acc + curr.claimAmount, 0);
  const totalDepositEscrow = activeDisputes.reduce((acc, curr) => acc + curr.depositHeld, 0);

  // Find most urgent dispute
  const urgentDispute = activeDisputes
    .filter((d) => d.slaUrgent || d.daysRemaining <= 2)
    .sort((a, b) => a.daysRemaining - b.daysRemaining)[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Card 1: Active Cases */}
      <div className="bg-white rounded-2xl p-6 border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Active Escalations
          </span>
          <Scale className="w-5 h-5 text-stone-400" />
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-stone-900 tabular-nums">
            {activeDisputes.length} <span className="text-base font-normal text-stone-500">Open</span>
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {actionRequiredDisputes.length} Landlord Action · {activeDisputes.length - actionRequiredDisputes.length} In Formal ADR
          </div>
        </div>
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">ADR Statutory Compliance</span>
          <span className="font-semibold text-emerald-700">100% Adherence</span>
        </div>
      </div>

      {/* Card 2: HERO CARD - Urgent SLA Watch */}
      <div className="bg-[#132A20] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A3B8AD]">
            Urgent SLA Watch
          </span>
          {urgentDispute ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-[10px] font-semibold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              {urgentDispute.daysRemaining <= 1 ? "24h Response" : `${urgentDispute.daysRemaining}d Deadline`}
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-[10px] font-semibold tracking-wide">
              Nominal
            </div>
          )}
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-white tabular-nums">
            {urgentDispute ? "1" : "0"} <span className="text-base font-normal text-[#A3B8AD]">Urgent</span>
          </div>
          <div className="text-xs text-[#A3B8AD] mt-1 truncate">
            {urgentDispute
              ? `${urgentDispute.unit} · ${urgentDispute.categoryLabel}`
              : "All portfolio statutory response timers clear"}
          </div>
        </div>
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-[#A3B8AD]">
            {urgentDispute ? `Due: ${urgentDispute.deadlineDate}` : "Next Review"}
          </span>
          <span className="font-semibold text-white">
            {urgentDispute ? `${urgentDispute.daysRemaining} day remaining` : "Scheduled Q4"}
          </span>
        </div>
      </div>

      {/* Card 3: Capital in Dispute */}
      <div className="bg-white rounded-2xl p-6 border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Contested Capital
          </span>
          <BadgePoundSterling className="w-5 h-5 text-stone-400" />
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-stone-900 tabular-nums">
            £{totalContestedCapital.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            £{totalDepositEscrow.toLocaleString("en-GB")} in TDS custodial escrow
          </div>
        </div>
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Average Claim</span>
          <span className="font-semibold text-stone-900 tabular-nums">
            £{activeDisputes.length > 0 ? (totalContestedCapital / activeDisputes.length).toFixed(0) : "0"}
          </span>
        </div>
      </div>

      {/* Card 4: Historical Resolution Rate */}
      <div className="bg-white rounded-2xl p-6 border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            ADR Conciliation Rate
          </span>
          <CheckCircle2 className="w-5 h-5 text-stone-400" />
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-stone-900 tabular-nums">
            94.2% <span className="text-base font-normal text-stone-500">Pre-Tribunal</span>
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {resolvedDisputes.length} settled this quarter · 0 court escalations
          </div>
        </div>
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Avg. Turnaround</span>
          <span className="font-semibold text-stone-900">3.8 Days</span>
        </div>
      </div>
    </div>
  );
};
