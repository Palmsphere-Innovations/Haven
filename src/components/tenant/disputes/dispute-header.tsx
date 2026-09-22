import React from "react"
import { ChevronRight, Download, PlusCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DisputeHeaderProps {
  onDownloadRecord: () => void
  onRaiseDispute: () => void
  showToast: boolean
  onDismissToast: () => void
}

export const DisputeHeader: React.FC<DisputeHeaderProps> = ({
  onDownloadRecord,
  onRaiseDispute,
  showToast,
  onDismissToast,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Breadcrumb Navigation & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <span className="hover:text-[#132A20] transition-colors cursor-pointer">My Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="hover:text-[#132A20] transition-colors cursor-pointer truncate max-w-[200px] md:max-w-none">
              Flat 4B, 18 Kensington Gardens
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#132A20] font-semibold">Disputes &amp; Formal Enquiries</span>
          </nav>
          
          <div className="flex items-baseline gap-3 mt-1">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
              Disputes &amp; Formal Resolutions
            </h1>
            <Badge className="hidden sm:inline-flex bg-emerald-100 text-emerald-900 border-emerald-200 text-xs font-medium">
              Statutory Framework Active
            </Badge>
          </div>
          
          <p className="text-xs sm:text-sm text-stone-600 max-w-3xl">
            Flat 4B, 18 Kensington Gardens, London W2 4QH • Logged statutory dispute proceedings, deposit claims, and mediation records under UK Tenancy Regulations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onDownloadRecord}
            className="h-9 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 shadow-sm"
          >
            <Download className="w-4 h-4 mr-1.5 text-stone-500" />
            <span>Download Dispute Record (PDF)</span>
          </Button>
          <Button
            type="button"
            onClick={onRaiseDispute}
            className="h-9 text-xs bg-[#132A20] hover:bg-[#1c3e30] text-white font-medium shadow-sm"
          >
            <PlusCircle className="w-4 h-4 mr-1.5 text-emerald-300" />
            <span> Raise a Dispute</span>
          </Button>
        </div>
      </div>

      {/* Audit Toast Feedback */}
      {showToast && (
        <div className="p-3 px-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl flex items-center justify-between text-xs transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
            <span>
              Dispute Dossier compiled: <strong>Haven_Audit_Record_Kensington4B_Oct2026.pdf</strong> ready for inspection.
            </span>
          </div>
          <button
            type="button"
            onClick={onDismissToast}
            className="text-[11px] uppercase font-semibold text-emerald-950 underline hover:no-underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  )
}