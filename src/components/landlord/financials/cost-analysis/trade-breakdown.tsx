"use client";

import React from "react";
import { Lightbulb, Wrench, Flame, Zap, ShieldAlert, WashingMachine } from "lucide-react";

export function TradeBreakdown() {
  const tradeCategories = [
    { title: "Plumbing & Drainage", icon: Wrench, jobs: "48 jobs", avg: "£517.70", amount: "£24,850.00", pct: "36.3%", color: "bg-[#132A20]" },
    { title: "Heating & Gas Safety (Gas Safe Reg.)", icon: Flame, jobs: "31 jobs", avg: "CP12 & repairs", amount: "£18,200.00", pct: "26.6%", color: "bg-emerald-800" },
    { title: "Electrical & Access Systems (NICEIC)", icon: Zap, jobs: "26 jobs", avg: "EICR certs", amount: "£11,420.00", pct: "16.7%", color: "bg-emerald-600" },
    { title: "Structural, Masonry & Roofing", icon: ShieldAlert, jobs: "12 jobs", avg: "Parapets & valley", amount: "£8,150.00", pct: "11.9%", color: "bg-stone-500" },
    { title: "Domestic Appliances (White Goods)", icon: WashingMachine, jobs: "39 jobs", avg: "Washing/hobs", amount: "£5,800.00", pct: "8.5%", color: "bg-stone-400" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left (5 cols): Repair vs Replace */}
      <div className="lg:col-span-5 rounded-2xl bg-white border border-[#ECEEED] p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          <div className="pb-3 border-b border-[#ECEEED]">
            <h3 className="text-xs font-bold text-stone-900">Repair vs. Replace Breakdown</h3>
            <p className="text-[11px] text-stone-500">Capital expenditure vs operational maintenance</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 py-4">
            {/* SVG Donut */}
            <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="46" fill="transparent" stroke="#ECEEED" strokeWidth="14" />
                <circle cx="60" cy="60" r="46" fill="transparent" stroke="#132A20" strokeWidth="14" strokeDasharray="211 289" />
                <circle cx="60" cy="60" r="46" fill="transparent" stroke="#059669" strokeWidth="14" strokeDasharray="78 289" strokeDashoffset="-211" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] uppercase font-bold text-stone-400">Total</span>
                <span className="text-base font-extrabold text-stone-900">£68.4k</span>
                <span className="text-[10px] text-emerald-700 font-semibold">156 Orders</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-3 w-full text-xs">
              <div className="p-2.5 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
                <div className="flex justify-between font-bold text-stone-900">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#132A20]" /> Triage / Opex
                  </span>
                  <span>73.0%</span>
                </div>
                <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                  <span>142 Work Orders</span>
                  <span className="font-mono font-bold text-stone-800">£49,946.00</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
                <div className="flex justify-between font-bold text-stone-900">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" /> CapEx Install
                  </span>
                  <span>27.0%</span>
                </div>
                <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                  <span>14 Replacements</span>
                  <span className="font-mono font-bold text-stone-800">£18,474.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#E8EFEA] border border-emerald-200 flex items-start gap-3">
          <Lightbulb className="w-4 h-4 text-[#132A20] shrink-0 mt-0.5" />
          <div className="text-[11px] text-stone-700 leading-relaxed">
            <strong className="text-stone-900 font-bold">CapEx Advisory:</strong> Properties over 15 years old show <strong className="text-stone-900">40% higher emergency boiler calls</strong>. Replacing boilers at Flat 4B &amp; 27 Blenheim will avert ~£3,800 in reactive fees.
          </div>
        </div>
      </div>

      {/* Right (7 cols): Trade Category Bars */}
      <div className="lg:col-span-7 rounded-2xl bg-white border border-[#ECEEED] p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#ECEEED]">
            <div>
              <h3 className="text-xs font-bold text-stone-900">Cost by Trade Category</h3>
              <p className="text-[11px] text-stone-500">Ranked expenditure across accredited trades</p>
            </div>
            <span className="text-[10px] font-semibold bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
              5 Accredited Sectors
            </span>
          </div>

          <div className="space-y-4 pt-4">
            {tradeCategories.map((cat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <cat.icon className="w-3.5 h-3.5 text-stone-500" />
                    <span className="font-bold text-stone-900">{cat.title}</span>
                    <span className="text-[10px] text-stone-400">({cat.jobs})</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="font-bold text-stone-900">{cat.amount}</span>
                    <span className="text-[10px] font-semibold text-stone-400 w-10 text-right">{cat.pct}</span>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: cat.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#ECEEED] flex items-center justify-between text-xs text-stone-500">
          <span>100% of trades verified against TrustMark / Gas Safe statutory registry</span>
          <a href="#" className="font-bold text-[#132A20] hover:underline">Manage Contractors &rarr;</a>
        </div>
      </div>
    </div>
  );
}