import React from "react"
import { BadgeCheck, Clock, ShieldCheck, Check, TrendingDown } from "lucide-react"

interface VendorsQuickStatsProps {
  totalCount: number
}

export const VendorsQuickStats: React.FC<VendorsQuickStatsProps> = ({ totalCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1 */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Verified Network
          </span>
          <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#132A20]">
            <BadgeCheck className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-[#132A20] tracking-tight font-mono">
            {totalCount}
          </div>
          <div className="text-xs text-stone-600 mt-0.5">Active Vetted Contractors</div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
          <Check className="w-3.5 h-3.5" />
          <span>MARLA Tier 1 compliant</span>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Active Workorders
          </span>
          <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#132A20]">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-[#132A20] tracking-tight font-mono">4</div>
          <div className="text-xs text-stone-600 mt-0.5">Dispatches In Flight</div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <span className="w-2 h-2 rounded-full bg-emerald-700" />
          <span>2 emergency boilers, 2 electrical</span>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Dispatch SLA
          </span>
          <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#132A20]">
            <TrendingDown className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-[#132A20] tracking-tight font-mono">
            24.8 <span className="text-sm text-stone-500 font-normal">hrs</span>
          </div>
          <div className="text-xs text-stone-600 mt-0.5">Average SLA Resolution</div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
          <TrendingDown className="w-3.5 h-3.5" />
          <span>-4.2 hrs vs portfolio average</span>
        </div>
      </div>

      {/* Metric 4 */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col justify-between gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Statutory Cover
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#132A20] text-white flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-[#132A20] tracking-tight font-mono">100%</div>
          <div className="text-xs text-stone-600 mt-0.5">Public Liability &amp; Certs on File</div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
          <Check className="w-3.5 h-3.5" />
          <span>0 expired certificates</span>
        </div>
      </div>
    </div>
  )
}