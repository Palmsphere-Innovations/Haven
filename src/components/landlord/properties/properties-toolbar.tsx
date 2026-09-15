"use client";

import React from "react";
import { Search, ArrowUpDown, List, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";

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
}

export const PropertiesToolbar: React.FC<ToolbarProps> = ({ filterTab, setFilterTab, search, setSearch, type, setType, borough, setBorough, sort, setSort }) => {
  return (
    <div className="space-y-3">
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
                ({tab === "all" ? 42 : tab === "occupied" ? 39 : tab === "vacant" ? 3 : 4})
              </span>
            </button>
          ))}
        </div>

        {/* Portfolio Quick Stats */}
        <div className="hidden xl:flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#e4e1da] text-stone-600">
            <strong className="font-semibold text-stone-800">39</strong> Occupied (92.8%)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#e4e1da] text-stone-600">
            <strong className="font-semibold text-stone-800">3</strong> Vacant (7.2%)
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white border border-[#e4e1da] text-stone-700">
            Monthly Roll: <strong className="font-semibold text-stone-900 font-mono">£92,050.00</strong>
          </span>
        </div>
      </div>

      {/* Sub-Filters & View Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-[#e5e2dc]">
        <div className="flex items-center gap-2.5 flex-1 min-w-[280px]">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            <Input
              type="text"
              placeholder="Filter by street, unit code, or postcode..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f8f7f4] border-0 rounded-lg text-stone-700 placeholder-stone-400 focus-visible:ring-1 focus-visible:ring-stone-300 h-8"
            />
          </div>
          <select value={type} onChange={(event) => setType(event.target.value)} className="text-xs bg-[#f8f7f4] border-0 rounded-lg py-1.5 px-3 text-stone-700 focus:ring-1 focus:ring-stone-300 h-8 cursor-pointer">
            <option>All Property Types</option>
            <option>Residential</option>
            <option>Commercial</option>
          </select>
          <select value={borough} onChange={(event) => setBorough(event.target.value)} className="text-xs bg-[#f8f7f4] border-0 rounded-lg py-1.5 px-3 text-stone-700 focus:ring-1 focus:ring-stone-300 h-8 hidden md:inline-block cursor-pointer">
            <option>All Boroughs (London &amp; Surrey)</option>
            <option>Camden</option>
            <option>Kensington &amp; Chelsea</option>
            <option>Westminster</option>
            <option>Richmond upon Thames</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="text-xs bg-transparent border-0 font-medium text-stone-700 focus:ring-0 py-1 pl-1 pr-6 cursor-pointer">
              <option>Sort: Address (A–Z)</option>
              <option>Sort: Highest Rent</option>
              <option>Sort: Lowest Rent</option>
              <option>Sort: Compliance Urgency</option>
            </select>
          </div>
          <div className="h-4 w-[1px] bg-stone-200" />
          <div className="inline-flex p-0.5 bg-[#f0ede6] rounded-lg">
            <button type="button" className="p-1 rounded bg-white text-stone-800 shadow-xs" title="Table View">
              <List className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-1 rounded text-stone-500 hover:text-stone-800" title="Grid View">
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};