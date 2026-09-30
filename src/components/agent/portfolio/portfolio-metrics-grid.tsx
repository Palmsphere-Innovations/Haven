import React from "react"
import { Building2, Users, DoorClosed, Wallet } from "lucide-react"

export const PortfolioMetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Anchor Card */}
      <div className="bg-[#132A20] text-white rounded-xl p-5 flex flex-col justify-between shadow-md relative overflow-hidden">
        <div className="absolute -right-3 -bottom-3 opacity-10 pointer-events-none">
          <Building2 className="w-24 h-24" />
        </div>
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
            Total Portfolio
          </span>
          <div className="p-1.5 rounded-md bg-white/10 text-emerald-300">
            <Building2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold tracking-tight text-white font-mono leading-none">
            14
          </div>
          <div className="text-xs font-semibold text-stone-300 mt-1">Managed Properties</div>
          <div className="text-[11px] text-stone-400 mt-0.5">Across 3 Landlord Mandates</div>
        </div>
      </div>

      {/* Metric 2: Occupied Units */}
      <div className="bg-white text-stone-900 rounded-xl p-5 border border-stone-200/80 flex flex-col justify-between shadow-sm">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Occupancy Status
          </span>
          <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-800">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-[#132A20] font-mono leading-none">
              12
            </span>
            <span className="text-xs font-semibold text-emerald-800">85.7%</span>
          </div>
          <div className="text-xs font-semibold text-stone-800 mt-1">Occupied Units</div>
          <div className="text-[11px] text-stone-500 mt-0.5">2 under active turnover</div>
        </div>
      </div>

      {/* Metric 3: Vacancy & Transition */}
      <div className="bg-white text-stone-900 rounded-xl p-5 border border-stone-200/80 flex flex-col justify-between shadow-sm">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Turnover Pipeline
          </span>
          <div className="p-1.5 rounded-md bg-stone-100 text-stone-700">
            <DoorClosed className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-[#132A20] font-mono leading-none">
              2
            </span>
            <span className="text-[10px] font-semibold bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded">
              Action Req.
            </span>
          </div>
          <div className="text-xs font-semibold text-stone-800 mt-1">Vacant / Turnover</div>
          <div className="text-[11px] text-stone-500 mt-0.5">1 in referencing, 1 under works</div>
        </div>
      </div>

      {/* Metric 4: Monthly Rent Managed */}
      <div className="bg-white text-stone-900 rounded-xl p-5 border border-stone-200/80 flex flex-col justify-between shadow-sm">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Delegated Ledger
          </span>
          <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-800">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-3xl font-bold tracking-tight text-[#132A20] font-mono leading-none">
            £36,400
          </div>
          <div className="text-xs font-semibold text-stone-800 mt-1">Monthly Rent Managed</div>
          <div className="text-[11px] text-stone-500 mt-0.5">
            11 rent-authorized units (3 restricted)
          </div>
        </div>
      </div>
    </div>
  )
}