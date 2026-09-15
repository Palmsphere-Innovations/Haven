"use client";

import React from "react";
import { Folder, AlertTriangle, ShieldCheck } from "lucide-react";

export const StatCardsRow: React.FC = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Repository */}
      <div className="border border-stone-200/80 rounded-2xl p-5 flex flex-col justify-between bg-white shadow-xs">
        <div>
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-stone-500">
              Total Repository
            </span>
            <Folder className="w-4 h-4 text-stone-400" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold text-stone-900 tracking-tight">184</span>
            <span className="text-xs font-medium text-stone-600">Active Files</span>
          </div>
          <p className="text-xs text-stone-500">142 Certificates • 28 Leases • 14 Inventory</p>
        </div>
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
          <span className="text-stone-400">Vault Storage</span>
          <span className="font-semibold text-stone-800">1.8 GB / 10 GB</span>
        </div>
      </div>

      {/* Card 2: Hero Card (Expiring Soon) */}
      <div className="bg-[#132A20] text-white rounded-2xl p-5 flex flex-col justify-between shadow-xs relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-200">
              Expiring Soon
            </span>
            <div className="flex items-center gap-1.5 bg-[#1c3d2f] px-2 py-0.5 rounded-full text-[10px] font-medium text-rose-300">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>30d Window</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold tracking-tight text-white">3</span>
            <span className="text-xs font-medium text-emerald-100">Certificates</span>
          </div>
          <p className="text-xs text-emerald-100/80">Flat 4B Gas Safety (CP12) • 2 EICRs</p>
        </div>
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-emerald-200/70">Time remaining</span>
          <span className="font-bold text-white tracking-wide">6 Days</span>
        </div>
      </div>

      {/* Card 3: Action Needed */}
      <div className="border border-stone-200/80 rounded-2xl p-5 flex flex-col justify-between bg-white shadow-xs">
        <div>
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-stone-500">
              Action Needed
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl font-bold text-stone-900 tracking-tight">1</span>
            <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded text-[11px] font-medium">
              Overdue Notice
            </span>
          </div>
          <p className="text-xs text-stone-500">7 Grosvenor Vale — EPC Rating F (MEES)</p>
        </div>
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
          <span className="text-stone-400">Action Required</span>
          <span className="font-semibold text-rose-700">Commission Retrofit</span>
        </div>
      </div>

      {/* Card 4: Portfolio Compliance Rate */}
      <div className="border border-stone-200/80 rounded-2xl p-5 flex flex-col justify-between bg-white shadow-xs">
        <div>
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-stone-500">
              Portfolio Compliance
            </span>
            <ShieldCheck className="w-4 h-4 text-stone-400" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold text-stone-900 tracking-tight">97.6%</span>
            <span className="text-xs font-medium text-stone-600">Fully Certified</span>
          </div>
          <p className="text-xs text-stone-500">41 of 42 units compliant with UK PRS statutes</p>
        </div>
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
          <span className="text-stone-400">RICS Adherence</span>
          <span className="font-semibold text-stone-800">100%</span>
        </div>
      </div>
    </section>
  );
};