import React from "react"
import { ShieldCheck } from "lucide-react"

export const ComplianceMandateMemo: React.FC = () => {
  return (
    <div className="bg-stone-100 p-6 rounded-xl border border-stone-200/80 flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#132A20] font-semibold text-sm">
          <ShieldCheck className="w-5 h-5 text-stone-600" />
          <span>Delegated Authority Mandate</span>
        </div>

        <div className="p-3.5 bg-white rounded-lg border border-stone-200 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-[#132A20] uppercase tracking-wider">
            Tier 1: Full Management
          </span>
          <p className="text-xs text-stone-600 leading-relaxed">
            Eleanor Vance (MARLA) holds explicit signing and operational authority to commission CP12 and EICR inspections within the standard <strong>£250 expenditure threshold</strong> without prior client countersign.
          </p>
        </div>

        <div className="p-3.5 bg-white rounded-lg border border-stone-200 flex flex-col gap-1">
          <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
            Tier 2: Maintenance &amp; Comms
          </span>
          <p className="text-xs text-stone-600 leading-relaxed">
            Under the Pembroke Estate Trust agreement, certificate commissioning and deposit registration remain reserved to the Principal Landlord. Compliance renewals must be countersigned or uploaded directly.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-stone-500 text-[11px]">
        <span>MARLA License: #V77109-UK</span>
        <span className="font-mono text-[#132A20] font-semibold">Haven Protocol v3.8</span>
      </div>
    </div>
  )
}