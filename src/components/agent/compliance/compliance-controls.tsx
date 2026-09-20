import React from "react"
import { Search, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ComplianceStatusFilter } from "@/lib/mock/compliance"

interface ComplianceControlsProps {
  activeFilter: ComplianceStatusFilter
  onFilterChange: (filter: ComplianceStatusFilter) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedMandate: string
  onMandateChange: (mandate: string) => void
  counts: { all: number; valid: number; expiring: number; urgent: number }
}

export const ComplianceControls: React.FC<ComplianceControlsProps> = ({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedMandate,
  onMandateChange,
  counts,
}) => {
  return (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-stone-200/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200/70 self-start">
        <button
          type="button"
          onClick={() => onFilterChange("ALL")}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeFilter === "ALL"
              ? "bg-[#132A20] text-white shadow-sm"
              : "text-stone-600 hover:text-[#132A20] hover:bg-white"
          }`}
        >
          <span>All Properties</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-stone-200/80 text-[#132A20]">
            {counts.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange("VALID")}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeFilter === "VALID"
              ? "bg-[#132A20] text-white shadow-sm"
              : "text-stone-600 hover:text-[#132A20] hover:bg-white"
          }`}
        >
          <span>Valid</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-stone-200/80 text-stone-700">
            {counts.valid}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange("EXPIRING")}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeFilter === "EXPIRING"
              ? "bg-[#132A20] text-white shadow-sm"
              : "text-stone-600 hover:text-[#132A20] hover:bg-white"
          }`}
        >
          <span>Expiring Soon</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
            {counts.expiring}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange("URGENT")}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
            activeFilter === "URGENT"
              ? "bg-[#132A20] text-white shadow-sm"
              : "text-stone-600 hover:text-red-800 hover:bg-white"
          }`}
        >
          <span>Expired / Urgent</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-red-200 text-red-900 font-bold">
            {counts.urgent}
          </span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <Input
            type="text"
            placeholder="Filter address, postcode, scheme ID..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-8 text-xs border-stone-300 focus:border-[#132A20]"
          />
        </div>

        <div className="relative">
          <select
            value={selectedMandate}
            onChange={(e) => onMandateChange(e.target.value)}
            className="w-full sm:w-auto h-8 bg-stone-100 text-[#132A20] text-xs font-medium pl-3 pr-8 rounded-md border border-stone-300 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="ALL">Portfolio: All Mandates (Vance Holdings &amp; Pembroke Estate)</option>
            <option value="Vance Holdings Ltd">Mandate: Vance Holdings Ltd (Tier 1 Full Mgt)</option>
            <option value="Pembroke Estate Trust">Mandate: Pembroke Estate Trust (Tier 2 Maintenance)</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}