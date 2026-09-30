import React from "react"
import { ChevronRight, Shield, Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VendorHeaderProps {
  onLogVisit: () => void
  onSubmitInvoice: () => void
}

export const VendorHeader: React.FC<VendorHeaderProps> = ({
  onLogVisit,
  onSubmitInvoice,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
      <div className="flex flex-col gap-1">
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <span>Contractor Portal</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span>Apex Heating &amp; Gas Ltd</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#132A20] font-semibold">Dashboard</span>
        </nav>

        <div className="flex flex-wrap items-center gap-3 mt-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
            Apex Heating &amp; Gas Ltd
          </h1>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="outline" className="bg-stone-100 text-stone-700 text-xs font-medium">
              Heating &amp; Plumbing
            </Badge>
            <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-xs font-semibold">
              Verified Trade Contractor
            </Badge>
            <Badge variant="outline" className="bg-stone-100 text-stone-800 font-mono text-xs flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-800" />
              <span>Gas Safe #48291</span>
            </Badge>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mt-0.5">
          Operational job queue, dispatched emergency call-outs, and pending invoice remittances across assigned Haven properties.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          variant="outline"
          onClick={onLogVisit}
          className="h-9 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 shadow-xs"
        >
          <Calendar className="w-4 h-4 mr-1.5 text-stone-500" />
          <span>Log Unscheduled Visit</span>
        </Button>
        <Button
          type="button"
          onClick={onSubmitInvoice}
          className="h-9 text-xs bg-[#132A20] hover:bg-[#1c3e30] text-white font-medium shadow-xs"
        >
          <Plus className="w-4 h-4 mr-1.5 text-emerald-300" />
          <span>Submit New Invoice</span>
        </Button>
      </div>
    </div>
  )
}