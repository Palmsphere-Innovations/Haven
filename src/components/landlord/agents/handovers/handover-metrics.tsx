"use client";

import React from "react";
import { RefreshCw, Clock, ClipboardCheck, ShieldCheck } from "lucide-react";

export function HandoverMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Stat 1 */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Active In-Progress
          </span>
          <div className="p-2 rounded-xl bg-[#E8EFEA] text-brand ">
            <RefreshCw className="w-4 h-4 animate-spin" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-stone-900 leading-none">02</span>
            <span className="text-xs font-semibold text-stone-500">Transitions</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-brand ">
            <span className="h-1.5 w-1.5 rounded-full bg-brand  animate-pulse" />
            <span>Dual verification stage active</span>
          </div>
        </div>
      </div>

      {/* Stat 2 */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Awaiting Signoff
          </span>
          <div className="p-2 rounded-xl bg-stone-100 text-stone-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-stone-900 leading-none">01</span>
            <span className="text-xs font-medium text-stone-500">Step pending</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-stone-500">
            <span>Apex Residential London</span>
          </div>
        </div>
      </div>

      {/* Stat 3 */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Completed Handovers
          </span>
          <div className="p-2 rounded-xl bg-stone-100 text-stone-600">
            <ClipboardCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-stone-900 leading-none">14</span>
            <span className="text-xs font-medium text-stone-500">Historic transitions</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-700">
            <span>100% statutory compliant</span>
          </div>
        </div>
      </div>

      {/* Stat 4 */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Root Custody Mandate
          </span>
          <div className="p-2 rounded-xl bg-[#E8EFEA] text-brand ">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-brand  leading-none">100%</span>
            <span className="text-xs font-medium text-stone-500">Sovereignty</span>
          </div>
          <div className="flex items-center gap-1 mt-2 text-xs text-stone-500 truncate">
            <span>Zero ledger severance to date</span>
          </div>
        </div>
      </div>
    </div>
  );
}