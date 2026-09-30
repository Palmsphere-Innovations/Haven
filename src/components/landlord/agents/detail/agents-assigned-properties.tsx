"use client";

import React, { useState } from "react";
import { Download, Search, MoreVertical, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface AssignedProperty {
  id: string;
  title: string;
  ref: string;
  tenant: string;
  astType: string;
  grantStart: string;
  grantExpiry: string;
  daysRemaining: string;
  status: string;
}

interface AgentAssignedPropertiesProps {
  properties: AssignedProperty[];
}

export function AgentAssignedProperties({ properties }: AgentAssignedPropertiesProps) {
  const [query, setQuery] = useState("");

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tenant.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs overflow-hidden space-y-4 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECEEED]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-stone-900">Active Property Grants</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#F0EEE9] text-stone-700 text-[10px] font-bold">
              {properties.length} properties assigned
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time delegation status across portfolio units
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5 pointer-events-none" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter units..."
              className="h-8 pl-8 pr-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-lg w-44"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs border-[#ECEEED] rounded-lg"
          >
            <Download className="w-3.5 h-3.5 mr-1 text-stone-500" />
            Grant Ledger (PDF)
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F9F9F8] text-[10px] uppercase tracking-wider font-semibold text-stone-500 border-b border-[#ECEEED]">
              <th className="py-2.5 px-3">Property &amp; Unit</th>
              <th className="py-2.5 px-3">Current Tenancy</th>
              <th className="py-2.5 px-3">Grant Start</th>
              <th className="py-2.5 px-3">Authority Expiry</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECEEED]">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-stone-50 transition-colors">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#E8EFEA] text-[#132A20] flex items-center justify-center shrink-0">
                      <Home className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900">{item.title}</div>
                      <div className="text-[10px] font-mono text-stone-400">{item.ref}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-3">
                  <div className="font-medium text-stone-900">{item.tenant}</div>
                  <div className="text-[10px] text-stone-500">{item.astType}</div>
                </td>

                <td className="py-3 px-3 font-mono text-stone-600">{item.grantStart}</td>

                <td className="py-3 px-3 font-mono">
                  <span className="text-stone-900 font-semibold">{item.grantExpiry}</span>
                  <span className="text-[10px] text-stone-400 block">{item.daysRemaining}</span>
                </td>

                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF4ED] text-[#1E5E2F]">
                    {item.status}
                  </span>
                </td>

                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2.5 text-[11px] border-[#ECEEED] rounded-md"
                    >
                      Manage
                    </Button>
                    <button type="button" className="p-1 text-stone-400 hover:text-stone-700">
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}