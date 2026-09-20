import React from "react"
import { TradeCategory } from "@/lib/mock/vendor-types"

interface VendorsFilterBarProps {
  activeTrade: TradeCategory
  onSelectTrade: (category: TradeCategory) => void
  visibleCount: number
}

export const VendorsFilterBar: React.FC<VendorsFilterBarProps> = ({
  activeTrade,
  onSelectTrade,
  visibleCount,
}) => {
  const tabs: { key: TradeCategory; label: string; count: number }[] = [
    { key: "all", label: "All", count: 18 },
    { key: "plumbing", label: "Plumbing", count: 4 },
    { key: "electrical", label: "Electrical", count: 3 },
    { key: "heating-gas", label: "Heating & Gas", count: 4 },
    { key: "general-building", label: "General Building", count: 4 },
    { key: "specialist", label: "Other / Specialist", count: 3 },
  ]

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-2.5 rounded-xl border border-stone-200/80 shadow-sm">
        {/* Scrollable Trade Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5">
          {tabs.map((tab) => {
            const isActive = activeTrade === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onSelectTrade(tab.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#132A20] text-white shadow-sm"
                    : "text-stone-600 hover:text-[#132A20] hover:bg-stone-100"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-stone-700 text-white" : "bg-stone-200 text-stone-700"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Secondary Options */}
        <div className="flex items-center gap-2 flex-wrap self-end lg:self-auto text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-100 border border-stone-200 text-[#132A20]">
            <span className="text-stone-500">Sort:</span>
            <span className="font-semibold">Rating (Highest)</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-100 border border-stone-200 text-[#132A20]">
            <span className="text-stone-500">Availability:</span>
            <span className="font-semibold">Available Today</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-100 border border-stone-200 text-[#132A20]">
            <span className="text-stone-500">Mandate:</span>
            <span className="font-semibold">Under £250 Cap</span>
          </div>
        </div>
      </div>

      {/* Active Count Banner */}
      <div className="flex items-center justify-between text-stone-500 text-xs px-1">
        <span>
          Showing <strong className="text-[#132A20]">{visibleCount}</strong> primary certified contractors for Vance Holdings Ltd
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
          Real-time dispatch status verified
        </span>
      </div>
    </div>
  )
}