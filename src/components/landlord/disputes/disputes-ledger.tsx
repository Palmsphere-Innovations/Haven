"use client";

import React from "react";
import {
  Search,
  Wrench,
  ShieldAlert,
  ClipboardCheck,
  Receipt,
  AlertCircle,
  ChevronRight,
  FileText,
} from "lucide-react";
import { LandlordDisputeRecord, LandlordDisputeCategory } from "@/lib/mock/landlord-disputes";
import { Button } from "@/components/ui/button";

interface DisputesLedgerProps {
  disputes: LandlordDisputeRecord[];
  selectedDisputeId: string | null;
  onSelectDispute: (id: string) => void;
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
}

export const DisputesLedger: React.FC<DisputesLedgerProps> = ({
  disputes,
  selectedDisputeId,
  onSelectDispute,
  selectedTab,
  onSelectTab,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onResetFilters,
}) => {
  const getCategoryIcon = (category: LandlordDisputeCategory) => {
    switch (category) {
      case "maintenance":
        return <Wrench className="w-4 h-4 text-emerald-800" />;
      case "deposit":
        return <ClipboardCheck className="w-4 h-4 text-stone-700" />;
      case "service_charge":
        return <Receipt className="w-4 h-4 text-stone-700" />;
      case "breach":
        return <ShieldAlert className="w-4 h-4 text-amber-800" />;
      default:
        return <FileText className="w-4 h-4 text-stone-700" />;
    }
  };

  const getStatusBadge = (dispute: LandlordDisputeRecord) => {
    switch (dispute.status) {
      case "action_required":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            {dispute.statusLabel}
          </span>
        );
      case "under_review":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {dispute.statusLabel}
          </span>
        );
      case "negotiating":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Direct Conciliation
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            {dispute.statusLabel}
          </span>
        );
    }
  };

  const tabs = [
    { id: "all", label: "All Cases" },
    { id: "action_required", label: "Action Required" },
    { id: "under_review", label: "Under ADR Review" },
    { id: "resolved", label: "Resolved" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs p-5 sm:p-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
            Portfolio Dispute Ledger
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Select any case file to review evidence dockets, statutory deadlines, and authorize resolutions.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200/70 self-start lg:self-auto overflow-x-auto max-w-full">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-stone-900 shadow-xs font-semibold"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Secondary Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 pb-4">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by case reference (DSP-...), property, tenant, or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-3 rounded-xl border border-stone-200 bg-white text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20] transition-colors"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-stone-500 shrink-0 hidden sm:inline">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            aria-label="Filter by dispute category"
            className="h-9 px-3 rounded-xl border border-stone-200 bg-white text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20] transition-colors w-full sm:w-auto cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="maintenance">Maintenance &amp; Repairs</option>
            <option value="deposit">Deposit Dilapidations</option>
            <option value="breach">Lease Covenant Breach</option>
            <option value="service_charge">Service Charges</option>
          </select>
        </div>
      </div>

      {/* Ledger Items */}
      <div className="flex flex-col gap-2.5 mt-1">
        {disputes.length === 0 ? (
          <div className="p-10 text-center rounded-xl bg-stone-50 border border-dashed border-stone-200 my-2">
            <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-stone-800">No disputes found</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              No dispute records match your current filter parameters or search query.
            </p>
            <Button
              variant="outline"
              onClick={onResetFilters}
              className="mt-4 h-8 px-3 text-xs rounded-lg cursor-pointer"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          disputes.map((dispute) => {
            const isSelected = selectedDisputeId === dispute.id;
            return (
              <div
                key={dispute.id}
                onClick={() => onSelectDispute(dispute.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
                  isSelected
                    ? "bg-[#132A20]/[0.03] border-[#132A20] ring-1 ring-[#132A20]/20 shadow-xs"
                    : "bg-white border-stone-200/80 hover:bg-stone-50/70 hover:border-stone-300"
                }`}
              >
                {/* Left zone: Icon & Core Details */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                      isSelected
                        ? "bg-[#132A20] text-white border-transparent"
                        : "bg-stone-100 text-stone-700 border-stone-200"
                    }`}
                  >
                    {getCategoryIcon(dispute.category)}
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Top metadata line with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                      <span className="font-mono font-bold text-stone-900">
                        #{dispute.reference}
                      </span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="font-medium text-stone-700">{dispute.unit}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="truncate">{dispute.propertyAddress.split(",")[0]}</span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span>{dispute.categoryLabel}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-semibold text-stone-900 mt-1 line-clamp-1">
                      {dispute.title}
                    </h3>

                    {/* Subtext info */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-600 mt-1">
                      <span>Tenant: <strong className="font-medium text-stone-800">{dispute.tenantNames}</strong></span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span>Agent: <strong className="font-medium text-stone-800">{dispute.managingAgent}</strong></span>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="text-stone-500">Opened {dispute.openedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Right zone: Financials, Status & Action */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between xl:justify-end gap-3.5 shrink-0 pt-2 xl:pt-0 border-t xl:border-t-0 border-stone-100">
                  {/* Financial figure */}
                  <div className="text-left xl:text-right">
                    <div className="text-xs text-stone-500 font-medium">Claim Amount</div>
                    <div className="text-sm font-bold text-stone-900 font-mono tabular-nums">
                      £{dispute.claimAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {getStatusBadge(dispute)}
                  </div>

                  {/* Action Button */}
                  <Button
                    type="button"
                    variant={isSelected ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDispute(dispute.id);
                    }}
                    className={`h-8 px-3 text-xs rounded-lg font-medium cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-[#132A20] text-white hover:bg-[#0b1b14]"
                        : "bg-white border-stone-200 text-stone-800 hover:bg-stone-100"
                    }`}
                  >
                    <span>{isSelected ? "Inspecting" : "Review Dossier"}</span>
                    <ChevronRight className={`w-3.5 h-3.5 ml-1 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
