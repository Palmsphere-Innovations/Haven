import React from "react"
import { Download, Gavel, Lock, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PortfolioHeaderProps {
  onExportDossier: () => void
  onViewMandates: () => void
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  onExportDossier,
  onViewMandates,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Sub-Header / Authority Scope Breadcrumb Strip */}
      {/* <div className="w-full bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="uppercase tracking-wider text-emerald-800 font-semibold">
            Delegated Workspace
          </span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-600 font-medium">Prime Heritage Management Ltd</span>
          <span className="text-stone-300">/</span>
          <span className="text-[#132A20] font-semibold">Managed Portfolio Registry</span>
          <div className="h-3.5 w-px bg-stone-300 mx-1 hidden sm:block" />
          <span className="text-stone-500 truncate">
            Eleanor Vance (MARLA Tier 1 #MAR-88219) • Managing 14 properties across 3 landlord mandates
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onExportDossier}
            className="h-8 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
            <span>Export Dossier (CSV)</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onViewMandates}
            className="h-8 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 shadow-sm"
          >
            <Gavel className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
            <span>Delegation Mandates</span>
          </Button>
        </div>
      </div> */}

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="flex flex-col gap-1 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
              My Portfolio
            </h1>
            <Badge className="bg-stone-100 text-stone-800 border-stone-300 font-semibold text-xs flex items-center gap-1.5 px-2.5 py-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span>Delegated Scope Locked • RICS / MARLA Governance</span>
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            14 properties managed under delegated authority across 3 principal landlord mandates. Operational tiers, financial visibility, and maintenance expenditure thresholds are enforced per statutory mandate.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-700 border border-stone-200 flex items-center gap-2 text-xs">
            <Lock className="w-3.5 h-3.5 text-stone-500" />
            <span>Intake Handled via Principal Delegation</span>
          </div>
        </div>
      </div>
    </div>
  )
}