"use client";

import React, { useState } from "react";
import { Search, Filter, Home, CheckCircle2, AlertTriangle, Clock, FileEdit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface ContractRow {
  id: string;
  property: string;
  postcode: string;
  tenants: string;
  tenancyType: string;
  instrument: string;
  termWindow: string;
  duration: string;
  status: "active" | "expiring" | "awaiting" | "draft";
  statusText: string;
}

const mockContracts: ContractRow[] = [
  { id: "1", property: "Flat 4B, 18 Kensington Gardens", postcode: "London, W2 4QH", tenants: "Oliver Davies & Clara Finch", tenancyType: "Joint & Several", instrument: "AST (Joint Fixed)", termWindow: "01 Oct 2024 – 30 Sep 2026", duration: "24m", status: "active", statusText: "Signed (Active)" },
  { id: "2", property: "8 Camden Mews", postcode: "London, NW1 9UX", tenants: "Elena Rostova", tenancyType: "Sole Tenant", instrument: "AST (Standard Fixed)", termWindow: "15 Jun 2024 – 14 Jun 2026", duration: "24m", status: "active", statusText: "Signed (Active)" },
  { id: "3", property: "Unit 3A, St. John's Court", postcode: "London, SW4", tenants: "Maya Lin & S. Patel", tenancyType: "Joint & Several", instrument: "AST (Joint Fixed)", termWindow: "15 Jan 2024 – 14 Jan 2027", duration: "36m", status: "expiring", statusText: "Expiring Soon (52d)" },
  { id: "4", property: "12 Richmond Hill Mansions", postcode: "Richmond, TW10 6RF", tenants: "Dr. Aris Thorne", tenancyType: "Individual Lease", instrument: "Non-Housing Act (>£100k)", termWindow: "01 Nov 2024 – 31 Oct 2026", duration: "24m", status: "awaiting", statusText: "Awaiting Signature" },
  { id: "5", property: "27 Blenheim Crescent", postcode: "Notting Hill, W11 2EF", tenants: "Marcus Vance (Family Trust)", tenancyType: "Statutory Periodic", instrument: "AST (Statutory Periodic)", termWindow: "01 Oct 2023 – Continuous", duration: "Periodic", status: "active", statusText: "Signed (Active)" },
  { id: "6", property: "Flat 2, 8 Camden Mews", postcode: "London, NW1 9UX", tenants: "Sophie Montgomery", tenancyType: "Applicant (Screened)", instrument: "Standard AST (12m Fixed)", termWindow: "01 Nov 2025 – 31 Oct 2026", duration: "12m", status: "draft", statusText: "Draft (Review)" },
];

export function ContractsTable({
  selectedId,
  onSelectContract,
}: {
  selectedId: string;
  onSelectContract: (id: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"all" | "awaiting" | "active" | "expiring" | "draft">("all");
  const [search, setSearch] = useState("");

  const filteredContracts = mockContracts.filter((item) => {
    const matchesSearch = `${item.property} ${item.tenants} ${item.postcode}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "awaiting" && item.status === "awaiting") ||
      (activeTab === "active" && item.status === "active") ||
      (activeTab === "expiring" && item.status === "expiring") ||
      (activeTab === "draft" && item.status === "draft");

    return matchesSearch && matchesTab;
  });

  const renderBadge = (status: ContractRow["status"], text: string) => {
    if (status === "active") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          {text}
        </span>
      );
    }
    if (status === "expiring") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
          <AlertTriangle className="w-3 h-3 text-rose-600" />
          {text}
        </span>
      );
    }
    if (status === "awaiting") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <Clock className="w-3 h-3 text-amber-600" />
          {text}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
        <FileEdit className="w-3 h-3 text-stone-500" />
        {text}
      </span>
    );
  };

  return (
    <div className="rounded-2xl bg-white border border-[#ECEEED] shadow-xs overflow-hidden flex flex-col">
      {/* Filter Tabs & Toolbar */}
      <div className="p-4 border-b border-[#ECEEED] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex bg-[#F9F9F8] border border-[#ECEEED] p-1 rounded-xl text-xs font-medium text-stone-600 overflow-x-auto">
            {(["all", "awaiting", "active", "expiring", "draft"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-1.5 capitalize transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white shadow-xs text-stone-900 font-bold"
                    : "hover:text-stone-900"
                }`}
              >
                {tab === "all" ? "All Contracts (43)" : tab}
              </button>
            ))}
          </div>

          <Button variant="outline" size="sm" className="h-8 border-[#ECEEED] text-xs font-semibold text-stone-700">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
            More Filters
          </Button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-stone-400 w-4 h-4 pointer-events-none" />
          <Input
            placeholder="Search by tenant name, property, or postcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#F9F9F8] border-[#ECEEED] text-xs h-9 rounded-xl focus:bg-white"
          />
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-600 border-collapse">
          <thead>
            <tr className="bg-[#F9F9F8] border-b border-[#ECEEED] text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              <th className="py-2.5 px-4">Property &amp; Demised Unit</th>
              <th className="py-2.5 px-4">Named Tenant(s)</th>
              <th className="py-2.5 px-4">Instrument Type</th>
              <th className="py-2.5 px-4">Term Window</th>
              <th className="py-2.5 px-4">Legal Status</th>
              <th className="py-2.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECEEED]">
            {filteredContracts.map((row) => {
              const isSelected = row.id === selectedId;
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectContract(row.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-[#E8EFEA] border-l-4 border-l-[#132A20]" : "hover:bg-stone-50"
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-stone-900">
                    <div className="flex items-center gap-1.5">
                      <Home className="w-3.5 h-3.5 text-[#132A20] shrink-0" />
                      {row.property}
                    </div>
                    <div className="text-[10px] font-mono text-stone-400 font-normal">{row.postcode}</div>
                  </td>
                  <td className="py-3 px-4 text-stone-800">
                    <div className="font-semibold">{row.tenants}</div>
                    <div className="text-[10px] text-stone-400">{row.tenancyType}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-stone-700">{row.instrument}</td>
                  <td className="py-3 px-4 font-mono text-xs text-stone-700">
                    {row.termWindow} <span className="text-stone-400">({row.duration})</span>
                  </td>
                  <td className="py-3 px-4">{renderBadge(row.status, row.statusText)}</td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={`h-7 px-3 text-[11px] font-semibold rounded-lg ${
                        isSelected ? "bg-[#132A20] text-white" : "border-[#ECEEED] text-stone-800"
                      }`}
                    >
                      {isSelected ? "Viewing" : "View Contract"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}