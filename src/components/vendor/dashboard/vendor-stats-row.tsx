import React from "react"
import { Zap, CheckCircle2, ArrowRight } from "lucide-react"

export const VendorStatsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Stat 1: New Requests */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            New Job Requests
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200/60 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            Action Required
          </span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold text-[#132A20] tracking-tight">3 Pending</div>
          <div className="mt-1 text-xs text-stone-600 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-700" />
            <span>2 urgent dispatch call-outs</span>
          </div>
        </div>
      </div>

      {/* Stat 2: Active Jobs (Deep Forest Green Accent Card) */}
      <div className="p-5 rounded-2xl bg-[#132A20] text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between relative z-10">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-300">
            Active Jobs
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1c3e30] text-emerald-300 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Live Deployment
          </span>
        </div>
        <div className="mt-4 relative z-10">
          <div className="text-2xl font-bold tracking-tight text-white">6 In Progress</div>
          <div className="mt-1 text-xs text-stone-300">3 scheduled for today</div>
        </div>
        <a
          href="#active-jobs"
          className="mt-3 pt-3 border-t border-stone-700/60 flex items-center justify-between text-xs text-emerald-300 hover:text-white transition-colors relative z-10"
        >
          <span>View Live Schedule</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Stat 3: Completed This Month */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Completed (October)
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200/60 text-[10px] font-semibold">
            SLA Met
          </span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold text-[#132A20] tracking-tight">18 Jobs</div>
          <div className="mt-1 text-xs text-stone-600 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800" />
            <span>100% on-time resolution</span>
          </div>
        </div>
      </div>

      {/* Stat 4: Total Earned */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Month-to-Date Remittance
          </span>
          <span className="text-xs text-stone-400">Oct 2026</span>
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold font-mono text-[#132A20] tracking-tight">
            £4,860.00
          </div>
          <div className="mt-1 text-xs font-mono text-stone-500">£1,420.00 pending payment</div>
        </div>
      </div>
    </div>
  )
}