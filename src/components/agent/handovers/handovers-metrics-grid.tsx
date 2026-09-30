import React from "react"
import { AlertCircle, Clock, Archive, Gavel } from "lucide-react"

export const HandoversMetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Incoming */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-200/80 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Incoming Requests
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
        </div>
        <div className="my-3 flex items-baseline gap-1.5">
          <span className="text-4xl font-bold text-[#132A20] tracking-tight">02</span>
          <span className="font-mono text-xs text-stone-500">Properties</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-red-800 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Requires your acceptance or decline</span>
        </div>
      </div>

      {/* Card 2: Active Outgoing */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-200/80 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Active Outgoing
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
        </div>
        <div className="my-3 flex items-baseline gap-1.5">
          <span className="text-4xl font-bold text-[#132A20] tracking-tight">01</span>
          <span className="font-mono text-xs text-stone-500">In Flight</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-600">
          <Clock className="w-3.5 h-3.5 text-stone-500" />
          <span>Pending incoming agent sign-off</span>
        </div>
      </div>

      {/* Card 3: Historical Transfers */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-200/80 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Historical Transfers
          </span>
          <Archive className="w-4 h-4 text-stone-400" />
        </div>
        <div className="my-3 flex items-baseline gap-1.5">
          <span className="text-4xl font-bold text-[#132A20] tracking-tight">09</span>
          <span className="font-mono text-xs text-stone-500">Completed</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-600">
          <Clock className="w-3.5 h-3.5 text-stone-500" />
          <span>Archived audit records (Past 24 mos)</span>
        </div>
      </div>

      {/* Card 4: Statutory Rule Notice */}
      <div className="bg-[#132A20] text-white rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
            Statutory Rule Notice
          </span>
          <Gavel className="w-4 h-4 text-stone-300" />
        </div>
        <div className="my-2">
          <div className="text-base font-semibold leading-tight text-white">Landlord Sovereign</div>
          <div className="text-xs text-stone-300 mt-0.5">Tier Authority Lock Activated</div>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed">
          Agents cannot assign or modify tiers. Transfers preserve established scope.
        </p>
      </div>
    </div>
  )
}