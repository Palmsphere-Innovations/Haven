import React from "react"
import { Wallet, ShieldCheck, Wrench, User, CheckCircle2, ArrowRight, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TenantQuickStatsProps {
  onPayRent: () => void
  onContactAgent: () => void
}

export const TenantQuickStats: React.FC<TenantQuickStatsProps> = ({
  onPayRent,
  onContactAgent,
}) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Anchor Forest Green Card (#132A20) */}
      <div className="bg-[#132A20] text-white p-5 rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/5 rounded-full blur-xl pointer-events-none" />
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Next Rent Payment
            </span>
            <Wallet className="w-5 h-5 text-emerald-300" />
          </div>
          <div className="text-3xl font-bold font-mono tracking-tight text-white mt-1">
            £2,450
          </div>
          <p className="text-xs text-stone-300 mt-1">
            Due 01 November 2024 <span className="text-emerald-300 font-semibold">(in 18 days)</span>
          </p>
        </div>
        <div className="mt-4 pt-2 border-t border-white/10 flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/10 text-xs text-stone-200 w-full truncate">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span className="truncate">Direct Debit Active • Autopay Set</span>
          </div>
          <button
            type="button"
            onClick={onPayRent}
            className="w-full text-left text-xs font-medium text-emerald-300 hover:text-white flex items-center justify-between transition-colors pt-1"
          >
            <span>View payment schedule</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card 2: Tenancy Status */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Tenancy Status
            </span>
            <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-[10px] font-semibold">
              AST Active
            </Badge>
          </div>
          <div className="text-xl font-bold text-[#132A20] tracking-tight mt-1">
            Good Standing
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Term: 01 Dec 2023 – 30 Nov 2025
          </p>
        </div>
        <div className="mt-4 pt-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
          <span className="text-[10px] text-stone-500 uppercase font-semibold block">
            Protected Custodial Deposit
          </span>
          <span className="font-mono text-xs text-[#132A20] font-bold">
            DPS • £2,826.92 verified
          </span>
        </div>
      </div>

      {/* Card 3: Open Maintenance */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Open Maintenance
            </span>
            <Badge variant="outline" className="bg-amber-50 text-amber-900 border-amber-200 text-[10px] font-semibold">
              In Progress
            </Badge>
          </div>
          <div className="text-xl font-bold text-[#132A20] tracking-tight mt-1">
            1 Active Request
          </div>
          <p className="text-xs text-stone-500 mt-1 truncate">
            Radiator valve inspection scheduled
          </p>
        </div>
        <div className="mt-4 pt-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">Visit Date</span>
            <span className="font-mono text-xs text-[#132A20] font-bold">Thu 17 Oct (Morning)</span>
          </div>
          <Calendar className="w-4 h-4 text-stone-500" />
        </div>
      </div>

      {/* Card 4: Primary Point of Contact */}
      <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Managing Agent
            </span>
            <User className="w-4 h-4 text-stone-500" />
          </div>
          <div className="text-xl font-bold text-[#132A20] tracking-tight mt-1">
            Eleanor Vance
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Prime Heritage Management
          </p>
        </div>
        <div className="mt-4 pt-2 flex items-center justify-between bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
          <span className="font-mono text-xs text-[#132A20]">020 7946 0912</span>
          <button
            type="button"
            onClick={onContactAgent}
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-0.5"
          >
            <span>Message</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </section>
  )
}