"use client";

import React from "react";
import { Receipt, Building2, Scale, AlertCircle, ArrowUp, CheckCircle2 } from "lucide-react";

export function CostMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Tile 1: Deep Forest Primary Anchor */}
      <div className="rounded-2xl p-5 bg-[#132A20] text-white flex flex-col justify-between shadow-md relative overflow-hidden">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B2CDBE]">
            Total Maintenance Spend
          </span>
          <Receipt className="w-4 h-4 text-[#B2CDBE]" />
        </div>
        <div className="my-3">
          <div className="text-2xl lg:text-3xl font-extrabold tracking-tight font-mono">
            £68,420<span className="text-lg font-normal text-[#B2CDBE]">.00</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#B2CDBE]/20 text-[#B2CDBE]">
              <ArrowUp className="w-3 h-3" /> +4.2%
            </span>
            <span className="text-[#B2CDBE]">vs prior 12m baseline</span>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-[#B2CDBE]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>94.8% digital work-order reconciled</span>
        </div>
      </div>

      {/* Tile 2: Cost Per Property */}
      <div className="rounded-2xl p-5 bg-white border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Average Cost per Unit
          </span>
          <Building2 className="w-4 h-4 text-stone-500" />
        </div>
        <div className="my-3">
          <div className="text-2xl lg:text-3xl font-extrabold tracking-tight text-stone-900 font-mono">
            £1,629<span className="text-lg font-normal text-stone-400">.05</span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8EFEA] text-[#132A20]">
              £135.75 / mo
            </span>
            <span className="text-xs text-stone-500">across 42 units</span>
          </div>
        </div>
        <div className="pt-2 border-t border-[#ECEEED] flex items-center justify-between text-xs text-stone-500">
          <span>Portfolio Median: £1,240.00</span>
          <span className="font-mono font-bold text-stone-900">38 Active Lets</span>
        </div>
      </div>

      {/* Tile 3: Repair vs Replace */}
      <div className="rounded-2xl p-5 bg-white border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Repair vs Replace Ratio
          </span>
          <Scale className="w-4 h-4 text-stone-500" />
        </div>
        <div className="my-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-[#132A20]">73%</span>
            <span className="text-base text-stone-400 font-normal">/ 27%</span>
          </div>
          {/* Split Bar */}
          <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden flex mt-2">
            <div className="h-full bg-[#132A20]" style={{ width: "73%" }} />
            <div className="h-full bg-emerald-600" style={{ width: "27%" }} />
          </div>
        </div>
        <div className="pt-2 border-t border-[#ECEEED] flex items-center justify-between text-xs text-stone-500">
          <span>Opex: £49.9k</span>
          <span>CapEx: £18.5k</span>
        </div>
      </div>

      {/* Tile 4: Highest Cost Unit */}
      <div className="rounded-2xl p-5 bg-white border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Highest-Cost Property
          </span>
          <AlertCircle className="w-4 h-4 text-rose-600" />
        </div>
        <div className="my-3">
          <div className="text-base font-bold text-stone-900 truncate" title="12 Richmond Hill Mansions">
            12 Richmond Hill
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-lg font-bold text-stone-900">£14,850.00</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              21.7% of spend
            </span>
          </div>
        </div>
        <div className="pt-2 border-t border-[#ECEEED] text-xs text-stone-500 truncate">
          Commercial boiler &amp; roof flashing
        </div>
      </div>
    </div>
  );
}