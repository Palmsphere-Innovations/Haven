import React from "react"
import { Download, ShieldCheck, UserPlus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TenantsHeaderProps {
  onExportCsv: () => void
  onOpenScreening: () => void
  onEnrollTenant: () => void
}

export const TenantsHeader: React.FC<TenantsHeaderProps> = ({
  onExportCsv,
  onOpenScreening,
  onEnrollTenant,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Sub-header Operational Path & Utility Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-2 border-b border-stone-300/60 text-xs">
        <div className="flex flex-wrap items-center gap-2 font-mono text-stone-600">
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            Delegated Workspace
          </span>
          <span className="text-stone-300">•</span>
          <span className="text-[#132A20] font-semibold">PRIME HERITAGE MANAGEMENT LTD</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-600">TENANCY LEDGER &amp; ENROLLMENT</span>
          <span className="text-stone-300">•</span>
          <span className="text-stone-500">Eleanor Vance (MARLA Tier 1 #MAR-88219)</span>
          <span className="text-stone-300">•</span>
          <span className="text-emerald-800 font-medium">18 active tenancies across 3 landlord mandates</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-start lg:self-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onExportCsv}
            className="h-8 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
            <span>Export Tenancy Ledger (CSV)</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onOpenScreening}
            className="h-8 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
            <span>Screening Pipeline</span>
          </Button>
        </div>
      </div>

      {/* Page Title & Primary Action Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-3xl flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
            Tenants
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            18 active tenancies across your managed properties under delegated authority. Direct applicant onboarding, referencing status, and rent ledger visibility scoped by statutory mandate tier.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            onClick={onEnrollTenant}
            className="bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold h-10 px-5 shadow-sm flex items-center gap-2 active:scale-[0.98] transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Enroll Tenant</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-80" />
          </Button>
        </div>
      </div>
    </div>
  )
}