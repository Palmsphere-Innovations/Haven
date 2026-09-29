"use client";
import React from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { HandoverTab } from "@/lib/mock/handovers-types"

interface HandoversTabNavProps {
  activeTab: HandoverTab
  onTabChange: (tab: HandoverTab) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedPortfolio: string
  onPortfolioChange: (p: string) => void
}

export const HandoversTabNav: React.FC<HandoversTabNavProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  selectedPortfolio,
  onPortfolioChange,
}) => {
  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Tab Switcher */}
      <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200/70">
        <button
          type="button"
          onClick={() => onTabChange("incoming")}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === "incoming"
              ? "bg-[#132A20] text-white shadow-sm"
              : "text-stone-600 hover:text-[#132A20] hover:bg-white"
          }`}
        >
          <span>Incoming</span>
          <span className="px-1.5 py-0.5 rounded-full bg-stone-200/80 text-[#132A20] font-mono text-[10px]">
            2
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("outgoing")}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === "outgoing"
              ? "bg-[#132A20] text-white shadow-sm"
              : "text-stone-600 hover:text-[#132A20] hover:bg-white"
          }`}
        >
          <span>Outgoing</span>
          <span className="px-1.5 py-0.5 rounded-full bg-stone-200/80 text-stone-700 font-mono text-[10px]">
            1
          </span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("history")}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${
            activeTab === "history"
              ? "bg-[#132A20] text-white shadow-sm"
              : "text-stone-600 hover:text-[#132A20] hover:bg-white"
          }`}
        >
          <span>History</span>
          <span className="px-1.5 py-0.5 rounded-full bg-stone-200/80 text-stone-700 font-mono text-[10px]">
            9
          </span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-1 max-w-lg justify-end">
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search property or reference..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-8 text-xs border-stone-300 focus:border-[#132A20]"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-stone-100 border border-stone-300 px-2.5 py-1 rounded text-xs text-[#132A20]">
          <Filter className="w-3.5 h-3.5 text-stone-500" />
          <select
            value={selectedPortfolio}
            onChange={(e) => onPortfolioChange(e.target.value)}
            className="bg-transparent text-[#132A20] text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Portfolios</option>
            <option value="Vance Holdings Ltd">Vance Holdings Ltd</option>
            <option value="Pembroke Estate Trust">Pembroke Estate Trust</option>
          </select>
        </div>
      </div>
    </div>
  )
}