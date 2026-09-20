import React from "react"
import { Search, ChevronDown, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TenancyStageFilter } from "@/lib/mock/tenants"

interface TenantsControlsProps {
  activeTab: TenancyStageFilter
  onSelectTab: (tab: TenancyStageFilter) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedLandlord: string
  onLandlordChange: (landlord: string) => void
  selectedTier: string
  onTierChange: (tier: string) => void
  counts: { all: number; active: number; application: number; invited: number; former: number }
}

export const TenantsControls: React.FC<TenantsControlsProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  selectedLandlord,
  onLandlordChange,
  selectedTier,
  onTierChange,
  counts,
}) => {
  return (
    <div className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-sm flex flex-col gap-4">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex p-1 rounded-lg bg-stone-100 border border-stone-200/60 gap-1 text-xs">
          <button
            type="button"
            onClick={() => onSelectTab("all")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === "all"
                ? "bg-[#132A20] text-white shadow-xs"
                : "text-stone-600 hover:text-[#132A20] hover:bg-white"
            }`}
          >
            All ({counts.all})
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("active")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === "active"
                ? "bg-[#132A20] text-white shadow-xs"
                : "text-stone-600 hover:text-[#132A20] hover:bg-white"
            }`}
          >
            Active ({counts.active})
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("application")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === "application"
                ? "bg-[#132A20] text-white shadow-xs"
                : "text-stone-600 hover:text-[#132A20] hover:bg-white"
            }`}
          >
            Application in Progress ({counts.application})
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("invited")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === "invited"
                ? "bg-[#132A20] text-white shadow-xs"
                : "text-stone-600 hover:text-[#132A20] hover:bg-white"
            }`}
          >
            Invited (Pending) ({counts.invited})
          </button>
          <button
            type="button"
            onClick={() => onSelectTab("former")}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              activeTab === "former"
                ? "bg-[#132A20] text-white shadow-xs"
                : "text-stone-600 hover:text-[#132A20] hover:bg-white"
            }`}
          >
            Former ({counts.former})
          </button>
        </div>

        {/* Counter & Status indicator */}
        <div className="flex items-center gap-2 text-stone-500 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-700" />
          <span>Live MARLA Statutory Audit Trail Enabled</span>
        </div>
      </div>

      {/* Filter Dropdowns & Live Search Field */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search tenant name, property, email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-9 bg-stone-50 text-xs border-stone-300 focus:border-[#132A20]"
          />
        </div>

        <div className="md:col-span-4 relative">
          <select
            value={selectedLandlord}
            onChange={(e) => onLandlordChange(e.target.value)}
            className="w-full h-9 bg-stone-50 text-[#132A20] text-xs font-medium pl-3 pr-8 rounded-md border border-stone-300 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="all">All Landlords (3)</option>
            <option value="Vance Holdings Ltd">Vance Holdings Ltd (11)</option>
            <option value="Pembroke Estate Trust">Pembroke Estate Trust (4)</option>
            <option value="Cavendish Real Estate Ltd">Cavendish Real Estate Ltd (3)</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
        </div>

        <div className="md:col-span-3 relative">
          <select
            value={selectedTier}
            onChange={(e) => onTierChange(e.target.value)}
            className="w-full h-9 bg-stone-50 text-[#132A20] text-xs font-medium pl-3 pr-8 rounded-md border border-stone-300 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="all">All Mandate Tiers</option>
            <option value="Tier 1">Tier 1: Full Management</option>
            <option value="Tier 2">Tier 2: Maint + Comms</option>
            <option value="Tier 3">Tier 3: Maintenance Only</option>
          </select>
          <Filter className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}