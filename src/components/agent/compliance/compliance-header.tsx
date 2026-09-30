import React from "react"
import { PieChart, Download, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ComplianceHeaderProps {
  totalUnits: number
  onExportDossier: () => void
}

export const ComplianceHeader: React.FC<ComplianceHeaderProps> = ({
  totalUnits,
  onExportDossier,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
          <span>Delegated Workspace</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-600 font-medium">Prime Heritage Management Ltd</span>
          <span className="text-stone-300">/</span>
          <span className="text-brand font-semibold">Compliance Vault &amp; Statutory Tracking</span>
        </div>
        <div className="flex items-baseline gap-3 flex-wrap mt-0.5">
          <h1 className="text-2xl sm:text-3xl font-semibold text-brand tracking-tight">
            Compliance Status
          </h1>
          <Badge variant="outline" className="font-mono text-xs bg-stone-100 text-stone-700 border-stone-300">
            {totalUnits} Units Monitored • FY24 Audited
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 max-w-4xl mt-0.5 leading-relaxed">
          Statutory compliance across your managed properties in strict accordance with the Landlord and Tenant Act 1985, Gas Safety Regulations 1998, and Electrical Safety Standards 2020.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
        <Button
          variant="outline"
          className="border-stone-300 bg-white text-brand hover:bg-stone-100 text-xs font-semibold shadow-sm"
        >
          <PieChart className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
          <span>Audit Summary</span>
        </Button>
        <Button
          onClick={onExportDossier}
          className="bg-brand hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Compliance Dossier</span>
          <span className="font-mono text-[10px] text-stone-300 uppercase ml-0.5">(CSV/PDF)</span>
        </Button>
      </div>
    </div>
  )
}