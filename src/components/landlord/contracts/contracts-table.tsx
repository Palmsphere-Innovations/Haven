"use client";

import React, { useState } from "react";
import { Search, Filter, Home, CheckCircle2, AlertTriangle, Clock, FileEdit } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { initialContracts, type ContractRecord } from "@/lib/mock/contracts";

export type { ContractRecord as ContractRow };

export function ContractsTable({
  contracts = initialContracts,
  selectedId,
  onSelectContract,
}: {
  contracts?: ContractRecord[];
  selectedId: string;
  onSelectContract: (id: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"all" | "awaiting" | "active" | "expiring" | "draft">("all");
  const [search, setSearch] = useState("");

  const filteredContracts = contracts.filter((item) => {
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

  const renderBadge = (status: ContractRecord["status"], text: string) => {
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
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <AlertTriangle className="w-3 h-3 text-amber-600" />
          {text}
        </span>
      );
    }
    if (status === "awaiting") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <Clock className="w-3 h-3 text-blue-600" />
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
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-[#ECEEED] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-[#F9F9F8] p-1 rounded-xl border border-[#ECEEED] self-start md:self-auto overflow-x-auto">
          {(
            [
              { key: "all", label: `All (${contracts.length})` },
              { key: "active", label: "Signed / Active" },
              { key: "awaiting", label: "Awaiting Signature" },
              { key: "expiring", label: "Expiring Soon" },
              { key: "draft", label: "Drafts" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === t.key
                  ? "bg-white text-stone-900 font-bold shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by property, tenant, postcode..."
            className="pl-9 h-9 bg-[#F9F9F8] border-[#ECEEED] text-xs rounded-xl"
          />
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F9F9F8] text-[10px] uppercase tracking-wider font-semibold text-stone-500 border-b border-[#ECEEED]">
              <th className="py-3 px-4">Demised Property</th>
              <th className="py-3 px-4">Tenant / Counterparty</th>
              <th className="py-3 px-4">Instrument</th>
              <th className="py-3 px-4">Term Window</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECEEED]">
            {filteredContracts.map((c) => {
              const isSelected = selectedId === c.id;
              return (
                <tr
                  key={c.id}
                  onClick={() => onSelectContract(c.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? "bg-[#F3F7F4]" : "hover:bg-stone-50/70"
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-stone-900">{c.property}</div>
                    <div className="font-mono text-[10px] text-stone-400">{c.postcode}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-stone-900">{c.tenants}</div>
                    <div className="text-[10px] text-stone-500">{c.tenancyType}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-stone-600">{c.instrument}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-stone-700">{c.termWindow}</span>
                    <span className="text-[10px] text-stone-400 ml-1">({c.duration})</span>
                  </td>
                  <td className="py-3.5 px-4">{renderBadge(c.status, c.statusText)}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={`h-7 px-3 text-xs rounded-lg cursor-pointer ${
                        isSelected
                          ? "bg-brand text-white hover:bg-[#1E3A2E]"
                          : "border-[#ECEEED] text-stone-700"
                      }`}
                    >
                      {isSelected ? "Viewing" : "Inspect"}
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
