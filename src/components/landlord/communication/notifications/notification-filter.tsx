"use client";

import React from "react";
import { Search, Archive } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type FilterCategory = "all" | "unread" | "rent" | "maintenance" | "compliance" | "agent";

interface NotificationsFilterProps {
  activeFilter: FilterCategory;
  onFilterChange: (cat: FilterCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  counts: Record<FilterCategory, number>;
  onArchiveRead: () => void;
}

export function NotificationsFilter({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  counts,
  onArchiveRead,
}: NotificationsFilterProps) {
  const tabs: { key: FilterCategory; label: string }[] = [
    { key: "all", label: `All (${counts.all})` },
    { key: "unread", label: `Unread (${counts.unread})` },
    { key: "rent", label: `Rent & Ledger (${counts.rent})` },
    { key: "maintenance", label: `Maintenance (${counts.maintenance})` },
    { key: "compliance", label: `Compliance (${counts.compliance})` },
    { key: "agent", label: `Agents & Handovers (${counts.agent})` },
  ];

  return (
    <div className="bg-white border border-[#ECEEED] rounded-2xl p-2.5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      {/* Category Tabs */}
      <div className="inline-flex bg-[#F9F9F8] border border-[#ECEEED] p-1 rounded-xl text-xs font-medium text-stone-600 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onFilterChange(tab.key)}
            className={`rounded-lg px-3 py-1.5 transition-all whitespace-nowrap ${
              activeFilter === tab.key
                ? "bg-white shadow-xs text-stone-900 font-bold"
                : "hover:text-stone-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="relative w-full lg:w-64">
          <Search className="absolute left-3 top-2.5 text-stone-400 w-3.5 h-3.5 pointer-events-none" />
          <Input
            placeholder="Filter by address, tenant, ref..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 bg-[#F9F9F8] border-[#ECEEED] text-xs h-8 rounded-xl focus:bg-white"
          />
        </div>
        <Button
          onClick={onArchiveRead}
          variant="outline"
          size="sm"
          className="h-8 border-[#ECEEED] text-xs font-semibold text-stone-700"
        >
          <Archive className="w-3.5 h-3.5 mr-1 text-stone-500" />
          <span className="hidden xl:inline">Archive Read</span>
        </Button>
      </div>
    </div>
  );
}