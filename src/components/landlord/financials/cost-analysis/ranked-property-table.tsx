"use client";

import React from "react";
import { Search, ArrowRight, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function RankedPropertyTable() {
  const properties = [
    { rank: "01", name: "12 Richmond Hill Mansions", details: "TW10 6RF • 6 Units • Victorian Freehold", agent: "Eleanor Vance", avatar: "EV", spend: "£14,850.00", perUnit: "£2,475 / unit", driver: "Commercial Boiler Overhaul", status: "High Spend", badge: "bg-rose-50 text-rose-800 border-rose-200" },
    { rank: "02", name: "Flat 4B, 18 Kensington Gardens", details: "W2 4QH • Single Unit • Leasehold Apt", agent: "Eleanor Vance", avatar: "EV", spend: "£9,420.00", perUnit: "£9,420 / unit", driver: "Underfloor Leak Extraction", status: "Elevated", badge: "bg-amber-50 text-amber-800 border-amber-200" },
    { rank: "03", name: "27 Blenheim Crescent", details: "W11 2EF • 4 Units • Edwardian Terrace", agent: "Eleanor Pembroke", avatar: "EP", spend: "£8,150.00", perUnit: "£2,037 / unit", driver: "Masonry Repointing", status: "Normal", badge: "bg-[#E8EFEA] text-[#132A20] border-emerald-200" },
    { rank: "04", name: "8 Camden Mews", details: "NW1 9UX • 3 Units • Converted Mews", agent: "Siobhan Campbell", avatar: "SC", spend: "£5,640.00", perUnit: "£1,880 / unit", driver: "Gas Safe CP12 & EICR", status: "Normal", badge: "bg-[#E8EFEA] text-[#132A20] border-emerald-200" },
    { rank: "05", name: "Unit 3A, St. John's Court", details: "SW4 7TA • 2 Units • Modern Purpose-Built", agent: "Self-Managed", avatar: "SM", spend: "£2,320.00", perUnit: "£1,160 / unit", driver: "Optical Alarms & Tap Washers", status: "Controlled", badge: "bg-stone-100 text-stone-700 border-stone-200" },
  ];

  return (
    <div className="rounded-2xl bg-white border border-[#ECEEED] shadow-xs overflow-hidden flex flex-col space-y-4">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-[#ECEEED] flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#F9F9F8]">
        <div>
          <h3 className="text-xs font-bold text-stone-900">Cost by Property &amp; Risk Index</h3>
          <p className="text-[11px] text-stone-500">Individual property spend performance and drivers</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-stone-400 w-3.5 h-3.5 pointer-events-none" />
            <Input
              placeholder="Search address or postcode..."
              className="pl-8 bg-white border-[#ECEEED] text-xs h-8 rounded-xl w-52"
            />
          </div>
          <select className="h-8 px-3 bg-white border border-[#ECEEED] rounded-xl text-xs text-stone-900 font-semibold">
            <option>Sort: Spend (High → Low)</option>
            <option>Sort: Spend (Low → High)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-600 border-collapse">
          <thead>
            <tr className="bg-[#F9F9F8] border-b border-[#ECEEED] text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              <th className="py-2.5 px-4"># Rank &amp; Property Dossier</th>
              <th className="py-2.5 px-4">Managing Agent</th>
              <th className="py-2.5 px-4 text-right">12m Total Spend</th>
              <th className="py-2.5 px-4">Primary Cost Driver</th>
              <th className="py-2.5 px-4 text-center">Risk Status</th>
              <th className="py-2.5 px-4 text-right">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECEEED]">
            {properties.map((row) => (
              <tr key={row.rank} className="hover:bg-stone-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-start gap-3">
                    <span className="font-mono font-bold text-stone-400">{row.rank}</span>
                    <div>
                      <div className="font-bold text-stone-900">{row.name}</div>
                      <div className="text-[10px] text-stone-400 font-mono">{row.details}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-stone-100 border border-stone-200 text-stone-800 text-[10px] font-bold flex items-center justify-center">
                      {row.avatar}
                    </span>
                    <span className="font-medium text-stone-800">{row.agent}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="font-mono font-bold text-stone-900">{row.spend}</div>
                  <div className="text-[10px] text-stone-400">{row.perUnit}</div>
                </td>
                <td className="py-3 px-4 text-stone-800 font-medium">{row.driver}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${row.badge}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button type="button" className="text-xs font-bold text-[#132A20] hover:underline flex items-center justify-end gap-1 ml-auto">
                    <span>Ledger</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}