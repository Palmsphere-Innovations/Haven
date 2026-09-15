"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { complianceCertificates, type ComplianceItem } from "@/lib/data/mock-data";

interface ComplianceMatrixProps {
  onService: (property: string, service: string) => void;
}

export const ComplianceMatrix: React.FC<ComplianceMatrixProps> = ({ onService }) => {
  const [activeTab, setActiveTab] = useState<"all" | "valid" | "expiring" | "action">("all");
  const [search, setSearch] = useState("");

  // Calculate dynamic tab counters from mock data
  const counts = useMemo(() => {
    return {
      all: complianceCertificates.length,
      valid: complianceCertificates.filter((item) =>
        [item.gasType, item.epcType, item.eicrType].every((status) => status === "valid")
      ).length,
      expiring: complianceCertificates.filter((item) =>
        [item.gasType, item.epcType, item.eicrType].includes("warning")
      ).length,
      action: complianceCertificates.filter((item) =>
        [item.gasType, item.epcType, item.eicrType].includes("action")
      ).length,
    };
  }, []);

  // Filter compliance rows by active tab and search query
  const rows = useMemo(() => {
    return complianceCertificates.filter((row) => {
      const matchesSearch = `${row.property} ${row.address}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const statuses = [row.gasType, row.epcType, row.eicrType];

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "valid" && statuses.every((s) => s === "valid")) ||
        (activeTab === "expiring" && statuses.includes("warning")) ||
        (activeTab === "action" && statuses.includes("action"));

      return matchesSearch && matchesTab;
    });
  }, [search, activeTab]);

  const renderStatusBadge = (text: string, type: "valid" | "warning" | "action") => {
    if (type === "warning") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200/80 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {text}
        </span>
      );
    }
    if (type === "action") {
      return (
        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200/80 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
          {text}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-stone-700 font-medium text-xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        {text}
      </span>
    );
  };

  const handleActionClick = (row: ComplianceItem) => {
    if (row.actionLabel === "Order EPC") {
      onService(row.property, "EPC Assessment");
    } else if (row.actionLabel === "Book Gas Safe") {
      onService(row.property, "Gas Safe Inspection");
    } else if (row.actionLabel === "Schedule EICR") {
      onService(row.property, "EICR Electrical Inspection");
    } else {
      onService(row.property, "Statutory Compliance Audit");
    }
  };

  return (
    <section className="border border-[#ECEEED] rounded-2xl bg-white p-5 shadow-xs flex flex-col gap-4">
      {/* Filter Tabs & Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2">
        <div className="inline-flex bg-[#F9F9F8] border border-[#ECEEED] p-1 rounded-xl text-xs font-medium text-stone-600">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "all"
                ? "bg-white shadow-xs text-stone-900 font-semibold"
                : "hover:text-stone-900"
            }`}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("valid")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "valid"
                ? "bg-white shadow-xs text-stone-900 font-semibold"
                : "hover:text-stone-900"
            }`}
          >
            Valid ({counts.valid})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("expiring")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "expiring"
                ? "bg-white shadow-xs text-amber-900 font-semibold"
                : "hover:text-stone-900"
            }`}
          >
            Expiring Soon ({counts.expiring})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("action")}
            className={`rounded-lg px-3 py-1.5 transition-all ${
              activeTab === "action"
                ? "bg-white shadow-xs text-rose-900 font-semibold"
                : "hover:text-stone-900"
            }`}
          >
            Action Needed ({counts.action})
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            <Input
              placeholder="Filter by address or postcode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#F9F9F8] border-[#ECEEED] rounded-xl pl-8 pr-3 text-xs text-stone-800 placeholder:text-stone-400 w-60 h-8 focus:bg-white"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-[#ECEEED] text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-xl"
          >
            <Filter className="w-3.5 h-3.5 text-stone-500 mr-1.5" />
            All Mandates
          </Button>
        </div>
      </div>

      {/* Compliance Matrix Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-stone-600 border-collapse">
          <thead>
            <tr className="border-b border-[#ECEEED] text-[10px] font-bold text-stone-400 uppercase tracking-wider bg-[#F9F9F8]">
              <th className="py-2.5 px-3">Property &amp; Unit</th>
              <th className="py-2.5 px-3">Gas Safety (CP12)</th>
              <th className="py-2.5 px-3">EPC Rating</th>
              <th className="py-2.5 px-3">EICR (Electrical)</th>
              <th className="py-2.5 px-3">Deposit Protection</th>
              <th className="py-2.5 px-3 text-right">Action Required</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECEEED]">
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-stone-900">{row.property}</div>
                    <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                      {row.address}
                    </div>
                  </td>
                  <td className="py-3 px-3">{renderStatusBadge(row.gasStatus, row.gasType)}</td>
                  <td className="py-3 px-3">{renderStatusBadge(row.epcStatus, row.epcType)}</td>
                  <td className="py-3 px-3">{renderStatusBadge(row.eicrStatus, row.eicrType)}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF4ED] text-[#1E5E2F]">
                      {row.depositStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      onClick={() => handleActionClick(row)}
                      variant="outline"
                      size="sm"
                      className="h-7 px-3 text-[11px] font-semibold border-[#ECEEED] text-stone-800 rounded-lg hover:bg-brand hover:text-white transition-colors"
                    >
                      {row.actionLabel}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-stone-400 text-xs">
                  <AlertCircle className="w-5 h-5 mx-auto mb-1.5 text-stone-300" />
                  No matching compliance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};