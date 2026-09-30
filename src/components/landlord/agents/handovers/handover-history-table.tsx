"use client";

import React from "react";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HandoverHistoryTable() {
  const history = [
    { property: "27 Blenheim Crescent, W11", outgoing: "Vanguard Realty Services", incoming: "Pembroke & Partners", tier: "Full Management", date: "15 Oct 2024", certId: "HAV-HO-2024-88" },
    { property: "12 Richmond Hill Mansions, TW10", outgoing: "Belgrave Asset Care", incoming: "Eleanor Vance (Prime Heritage)", tier: "Maint + Comms", date: "01 Jun 2024", certId: "HAV-HO-2024-42" },
    { property: "Unit 3A, St. John's Court, SW4", outgoing: "Self-Managed Landlord", incoming: "Siobhan Campbell (Apex)", tier: "Full Management", date: "15 Jan 2024", certId: "HAV-HO-2024-11" },
    { property: "Flat 2, 8 Camden Mews, NW1", outgoing: "Kensington Lettings Ltd", incoming: "Belgrave Property Mgmt", tier: "Maintenance-only", date: "10 Nov 2023", certId: "HAV-HO-2023-95" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#ECEEED]">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-stone-900">Completed Transitions &amp; History</h2>
          <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-semibold">
            14 Certified Records
          </span>
        </div>
        <Button variant="outline" size="sm" className="h-8 border-[#ECEEED] text-xs font-semibold text-stone-700">
          <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Export Full Registry
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F9F9F8] text-[10px] uppercase font-bold text-stone-500 border-b border-[#ECEEED]">
              <th className="py-2.5 px-3">Property Unit</th>
              <th className="py-2.5 px-3">Outgoing Agent</th>
              <th className="py-2.5 px-3">Incoming Agent</th>
              <th className="py-2.5 px-3">Permission Tier</th>
              <th className="py-2.5 px-3">Completed Date</th>
              <th className="py-2.5 px-3">Certificate ID</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECEEED]">
            {history.map((row) => (
              <tr key={row.certId} className="hover:bg-stone-50 transition-colors">
                <td className="py-3 px-3 font-semibold text-stone-900">{row.property}</td>
                <td className="py-3 px-3 text-stone-500">{row.outgoing}</td>
                <td className="py-3 px-3 font-medium text-stone-900">{row.incoming}</td>
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded bg-[#E8EFEA] text-brand  text-[10px] font-bold">
                    {row.tier}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono text-stone-600">{row.date}</td>
                <td className="py-3 px-3 font-mono font-semibold text-brand ">{row.certId}</td>
                <td className="py-3 px-3 text-right">
                  <button type="button" className="text-[11px] font-bold text-brand  hover:underline flex items-center justify-end gap-1 ml-auto">
                    <span>PDF</span>
                    <FileText className="w-3.5 h-3.5" />
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