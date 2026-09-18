"use client";

import React, { useMemo } from "react";
import { Search, ArrowUpDown, List, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { propertiesData } from "@/lib/data/mock-data";

export type ViewMode = "table" | "grid";

interface ToolbarProps {
  filterTab: string;
  setFilterTab: (tab: "all" | "occupied" | "vacant" | "maintenance") => void;
  search: string;
  setSearch: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  borough: string;
  setBorough: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const PropertiesToolbar: React.FC<ToolbarProps> = ({
  filterTab,
  setFilterTab,
  search,
  setSearch,
  type,
  setType,
  borough,
  setBorough,
  sort,
  setSort,
  viewMode,
  setViewMode,
}) => {
  const counts = useMemo(() => {
    return propertiesData.reduce(
      (acc, item) => {
        if (item.isVacant) {
          acc.vacant++;
        } else {
          acc.occupied++;
        }

        if (item.complianceStatus === "warning" || item.complianceStatus === "action") {
          acc.maintenance++;
        }

        const numericRent = parseFloat(item.rent.replace(/[^0-9.-]+/g, ""));
        if (!isNaN(numericRent)) {
          acc.monthlyRoll += numericRent;
        }

        return acc;
      },
      { vacant: 0, occupied: 0, maintenance: 0, monthlyRoll: 0 }
    );
  }, []);

  const totalProperties = propertiesData.length || 1;
  const occupiedPct = ((counts.occupied / totalProperties) * 100).toFixed(1);
  const vacantPct = ((counts.vacant / totalProperties) * 100).toFixed(1);

  return (
    <div className="space-y-3 font-sans">
      {/* Segmented Filter Control */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="inline-flex p-1 bg-[#eeece6] rounded-xl text-xs font-medium">
          {(["all", "occupied", "vacant", "maintenance"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg capitalize transition-colors ${
                filterTab === tab
                  ? "bg-white text-stone-900 shadow-sm font-semibold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {tab === "maintenance" ? "Under Maintenance" : tab}{" "}
              <span className="ml-1 text-[11px] text-stone-500 font-normal">
                (
                {tab === "all"
                  ? propertiesData.length
                  : tab === "occupied"
                  ? counts.occupied
                  : tab === "vacant"
                  ? counts.vacant
                  : counts.maintenance}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Portfolio Quick Stats */}
        <div className="hidden xl:flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#e4e1da] text-stone-600">
            <strong className="font-semibold text-stone-800">{counts.occupied}</strong> Occupied ({occupiedPct}%)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#e4e1da] text-stone-600">
            <strong className="font-semibold text-stone-800">{counts.vacant}</strong> Vacant ({vacantPct}%)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#e4e1da] text-stone-700">
            Monthly Roll:{" "}
            <strong className="font-semibold text-stone-900 font-mono">
              £{counts.monthlyRoll.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
            </strong>
          </span>
        </div>
      </div>

      {/* Sub-Filters & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-[#e5e2dc]">
        <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            <Input
              type="text"
              placeholder="Filter by street, unit code, or postcode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f8f7f4] border-0 rounded-lg text-stone-700 placeholder-stone-400 focus-visible:ring-1 focus-visible:ring-stone-300 h-8"
            />
          </div>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="text-xs bg-[#f8f7f4] border-0 rounded-lg py-1.5 px-3 text-stone-700 focus:ring-1 focus:ring-stone-300 h-8 cursor-pointer"
          >
            <option value="">All Property Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>

          <select
            value={borough}
            onChange={(e) => setBorough(e.target.value)}
            className="text-xs bg-[#f8f7f4] border-0 rounded-lg py-1.5 px-3 text-stone-700 focus:ring-1 focus:ring-stone-300 h-8 hidden md:inline-block cursor-pointer"
          >
            <option value="">All Boroughs (London &amp; Surrey)</option>
            <option value="Camden">Camden</option>
            <option value="Kensington">Kensington &amp; Chelsea</option>
            <option value="Clapham">Clapham</option>
            <option value="Richmond">Richmond</option>
            <option value="Ruislip">Ruislip</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs bg-transparent border-0 font-medium text-stone-700 focus:ring-0 py-1 pl-1 pr-6 cursor-pointer"
            >
              <option value="address">Sort: Address (A–Z)</option>
              <option value="rent-desc">Sort: Highest Rent</option>
              <option value="rent-asc">Sort: Lowest Rent</option>
              <option value="compliance">Sort: Compliance Urgency</option>
            </select>
          </div>

          <div className="h-4 w-[1px] bg-stone-200" />

          {/* Functional View Mode Selector */}
          <div className="inline-flex p-0.5 bg-[#f0ede6] rounded-lg">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`p-1 rounded transition-colors ${
                viewMode === "table"
                  ? "bg-white text-stone-800 shadow-xs"
                  : "text-stone-500 hover:text-stone-800"
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded transition-colors ${
                viewMode === "grid"
                  ? "bg-white text-stone-800 shadow-xs"
                  : "text-stone-500 hover:text-stone-800"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};