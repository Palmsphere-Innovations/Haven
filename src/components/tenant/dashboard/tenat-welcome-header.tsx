import React from "react"
import { Download, PlusCircle, Building2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TenantWelcomeHeaderProps {
  onDownloadSummary: () => void
  onReportRepair: () => void
}

export const TenantWelcomeHeader: React.FC<TenantWelcomeHeaderProps> = ({
  onDownloadSummary,
  onReportRepair,
}) => {
  return (
    <section className="flex flex-col gap-4">
      {/* Header Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
              My Home
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-widest">
              18 Kensington Gardens
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
            Welcome home, Oliver
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            type="button"
            variant="outline"
            onClick={onDownloadSummary}
            className="h-9 border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 text-xs font-medium shadow-sm"
          >
            <Download className="w-4 h-4 mr-1.5 text-stone-500" />
            <span>Download Tenancy Summary</span>
          </Button>
          <Button
            type="button"
            onClick={onReportRepair}
            className="h-9 bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1.5 text-emerald-300" />
            <span>Report Repair / Maintenance</span>
          </Button>
        </div>
      </div>

      {/* Context Property Identity Strip */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start md:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 text-[#132A20]">
            <Building2 className="w-6 h-6 text-emerald-800" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-base text-[#132A20]">
                Flat 4B, 18 Kensington Gardens
              </span>
              <span className="text-xs text-stone-500">London W2 4QH</span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Assured Shorthold Tenancy (AST) <span className="mx-1">•</span> Managed by Vance Holdings Ltd &amp; Prime Heritage Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
          <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-xs font-semibold px-2.5 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            <span>Verified Tenancy</span>
          </Badge>
          <Badge variant="outline" className="bg-stone-100 text-stone-700 border-stone-300 text-xs font-medium">
            Council Tax Band: F
          </Badge>
        </div>
      </div>
    </section>
  )
}