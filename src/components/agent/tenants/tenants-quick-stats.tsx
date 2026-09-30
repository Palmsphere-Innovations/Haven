import React from "react"
import { Users, CheckCircle2, Clock, Wallet } from "lucide-react"

export const TenantsQuickStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Card 1 */}
      <div className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-stone-500 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Total Tenancies
          </span>
          <Users className="w-5 h-5 text-emerald-800" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-3xl font-bold text-[#132A20] font-mono tracking-tight">18</span>
          <span className="text-xs text-stone-500">
            Across 3 Client Landlords • 14 Properties
          </span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-stone-500 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Active &amp; Good Standing
          </span>
          <CheckCircle2 className="w-5 h-5 text-emerald-800" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-3xl font-bold text-[#132A20] font-mono tracking-tight">14</span>
          <span className="text-xs text-stone-500">AST Tenancies with clean compliance</span>
        </div>
      </div>

      {/* Card 3 (High-Contrast Forest Green Highlight Card) */}
      <div className="bg-[#132A20] text-white rounded-xl p-5 shadow-md flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 rounded-full bg-white/5 pointer-events-none" />
        <div className="flex items-center justify-between pb-2 text-stone-300">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Applications In Progress
          </span>
          <Clock className="w-5 h-5 text-emerald-300" />
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white font-mono tracking-tight">3</span>
            <span className="text-xs text-emerald-200">Active Dossiers</span>
          </div>
          <span className="text-xs text-stone-300">
            3 In Referencing • 1 Awaiting Signature
          </span>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-stone-500 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Managed Monthly Rent
          </span>
          <Wallet className="w-5 h-5 text-emerald-800" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-3xl font-bold text-[#132A20] font-mono tracking-tight">
            £41,250
          </span>
          <span className="text-xs text-stone-500">
            15 rent-authorized tenancies, 3 restricted
          </span>
        </div>
      </div>
    </div>
  )
}