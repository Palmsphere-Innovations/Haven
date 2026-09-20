import React from "react"
import { Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PortfolioStatusFilter } from "@/lib/mock/portfolio"

interface PortfolioControlsProps {
  activeTab: PortfolioStatusFilter
  onSelectTab: (tab: PortfolioStatusFilter) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedMandate: string
  onMandateChange: (mandate: string) => void
  selectedTier: string
  onTierChange: (tier: string) => void
  counts: { all: number; occupied: number; vacant: number; maintenance: number }
}

export const PortfolioControls: React.FC<PortfolioControlsProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  selectedMandate,
  onMandateChange,
  selectedTier,
  onTierChange,
  counts,
}) => {
  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200/80 shadow-sm flex flex-col gap-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="inline-flex p-1 bg-stone-100 rounded-lg gap-1 overflow-x-auto border border-stone-200/60">
          <button
            type="button"
            onClick={() => onSelectTab("all")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold shrink-0 transition-all ${
              activeTab === "all"
                ? "bg-[#132A20] text-white shadow-sm"
                : "text-stone-600 hover:text-[#132A20] hover:bg-white"
            }`}
          >
            All <span className="font-mono text-[10px] opacity-80 ml-0.5">({counts.all})</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("occupied")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold shrink-0 transition-all ${
              activeTab === "occupied"
                ? "bg-[#132A20] text-white shadow-sm"
                : "text-stone-600 hover:text-[#132A20] hover:bg-white"
            }`}
          >
            Occupied <span className="font-mono text-[10px] opacity-80 ml-0.5">({counts.occupied})</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("vacant")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold shrink-0 transition-all ${
              activeTab === "vacant"
                ? "bg-[#132A20] text-white shadow-sm"
                : "text-stone-600 hover:text-[#132A20] hover:bg-white"
            }`}
          >
            Vacant <span className="font-mono text-[10px] opacity-80 ml-0.5">({counts.vacant})</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("maintenance")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold shrink-0 transition-all ${
              activeTab === "maintenance"
                ? "bg-[#132A20] text-white shadow-sm"
                : "text-stone-600 hover:text-[#132A20] hover:bg-white"
            }`}
          >
            Under Maintenance <span className="font-mono text-[10px] opacity-80 ml-0.5">({counts.maintenance})</span>
          </button>
        </div>

        {/* Search Bar and Dropdowns */}
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-1 lg:max-w-2xl justify-end">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Filter by address, tenant, postcode..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-8 text-xs border-stone-300 focus:border-[#132A20] bg-stone-50"
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedMandate}
              onChange={(e) => onMandateChange(e.target.value)}
              className="w-full sm:w-48 h-8 bg-stone-50 text-[#132A20] text-xs font-medium pl-3 pr-8 rounded-md border border-stone-300 focus:outline-none cursor-pointer appearance-none"
            >
              <option value="all">All Mandates (3)</option>
              <option value="Vance Holdings Ltd">Vance Holdings Ltd (8)</option>
              <option value="Pembroke Estate Trust">Pembroke Estate Trust (4)</option>
              <option value="Cavendish Real Estate Ltd">Cavendish Real Estate Ltd (2)</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-auto">
            <select
              value={selectedTier}
              onChange={(e) => onTierChange(e.target.value)}
              className="w-full sm:w-44 h-8 bg-stone-50 text-[#132A20] text-xs font-medium pl-3 pr-8 rounded-md border border-stone-300 focus:outline-none cursor-pointer appearance-none"
            >
              <option value="all">All Tiers</option>
              <option value="Tier 1">Tier 1: Full Mgmt</option>
              <option value="Tier 2">Tier 2: Maint + Comms</option>
              <option value="Tier 3">Tier 3: Maintenance</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}