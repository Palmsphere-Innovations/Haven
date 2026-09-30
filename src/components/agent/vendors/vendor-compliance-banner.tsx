import React from "react"
import { ShieldCheck, ArrowRight } from "lucide-react"

export const VendorsComplianceBanner: React.FC = () => {
  return (
    <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 text-[#132A20] border border-stone-200">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-[#132A20]">
            UK Contractor Verification &amp; Statutory Compliance
          </span>
          <p className="text-xs text-stone-600 max-w-4xl leading-relaxed">
            All contractors in this directory maintain active public liability insurance (£2M+ minimum), statutory trade accreditations (Gas Safe, NICEIC, FMB), and signed Haven sub-contractor data processing agreements. Automated renewal alerts are triggered 30 days prior to certificate expiration.
          </p>
        </div>
      </div>

      <a
        href="#"
        className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-[#132A20] transition-colors shrink-0 self-end md:self-center"
      >
        <span>Review Compliance Framework (PDF)</span>
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  )
}