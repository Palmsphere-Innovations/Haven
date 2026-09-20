import React from "react"
import { Search, UserPlus, Download, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface VendorsHeaderProps {
  searchQuery: string
  onSearchChange: (q: string) => void
  onAddVendor: () => void
  onExportCsv: () => void
}

export const VendorsHeader: React.FC<VendorsHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddVendor,
  onExportCsv,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Top Context Sub-header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-stone-200/80 shadow-sm">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 flex-wrap text-xs font-semibold text-stone-500 uppercase tracking-wider">
            <span className="text-emerald-800">Delegated Workspace</span>
            <span>•</span>
            <span>Prime Heritage Management Ltd</span>
            <span>/</span>
            <span className="text-[#132A20]">Vendor Management &amp; Contractor Directory</span>
          </div>
          <p className="text-xs text-stone-600">
            Accredited trades &amp; vetted contractor network operating under MARLA compliance standards for Eleanor Vance&apos;s managed properties.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onExportCsv}
            className="border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 text-xs font-semibold h-8"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
            <span>Export Directory (CSV)</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-stone-200 bg-stone-100 text-[#132A20] hover:bg-stone-200 text-xs font-semibold h-8"
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-800" />
            <span>Compliance Log (NICEIC / Gas Safe)</span>
          </Button>
        </div>
      </div>

      {/* Main Page Header & Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
            Vendor Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Verified contractors and tradespeople for your managed properties across Greater London.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative w-72 sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search vendors by name, trade, postcode..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-10 text-xs border-stone-300 focus:border-[#132A20] bg-white shadow-sm"
            />
          </div>
          <Button
            type="button"
            onClick={onAddVendor}
            className="bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold h-10 px-4 shadow-sm flex items-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add Vendor</span>
          </Button>
        </div>
      </div>
    </div>
  )
}