import React from "react"
import { Clock, Gavel, ShieldCheck } from "lucide-react"

export const DisputeMetricsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Card 1: Active Proceedings */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Active Proceedings
          </span>
          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#132A20]">1 Open</span>
            <span className="text-xs font-semibold text-amber-800">Case #DSP-2024-0982</span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Under formal evaluation by Prime Heritage Management
          </p>
        </div>
        <div className="mt-4 pt-2.5 flex items-center justify-between text-[11px] text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/60">
          <span>Remedy sought: <strong className="text-[#132A20]">£185.00 Credit</strong></span>
          <span className="text-emerald-800 font-semibold">Stage 3 of 4</span>
        </div>
      </div>

      {/* Card 2: Resolution Channel */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Resolution Channel
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center justify-center">
            <Gavel className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#132A20]">DPS Alternative Dispute</div>
          <p className="text-xs text-stone-500 mt-1">
            Independent Tenancy Mediation &amp; Adjudication Service
          </p>
        </div>
        <div className="mt-4 pt-2.5 flex items-center justify-between text-[11px] text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/60">
          <span>Custodial ID: <strong className="font-mono text-[#132A20]">DPS-883921-LDN</strong></span>
          <span className="text-emerald-800 font-semibold">Verified Active</span>
        </div>
      </div>

      {/* Card 3: Statutory Protection */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Statutory Protection
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-lg font-bold text-[#132A20]">Housing Act 1988 &amp; TFA 2019</div>
          <p className="text-xs text-stone-500 mt-1">
            Assisted by TDS Custodial Deposit Guarantee Scheme
          </p>
        </div>
        <div className="mt-4 pt-2.5 flex items-center justify-between text-[11px] text-stone-600 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/60">
          <span>Protected Sum: <strong className="font-mono text-[#132A20]">£2,450.00</strong></span>
          <span className="text-stone-700 font-medium">Fully Ring-fenced</span>
        </div>
      </div>
    </div>
  )
}