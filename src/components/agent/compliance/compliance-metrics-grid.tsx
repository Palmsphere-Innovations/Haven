import React from "react"
import { AlertTriangle, Building2, BadgeCheck, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ComplianceMetricsGridProps {
  totalUnits: number
  urgentCount: number
  validCount: number
  expiringCount: number
}

export const ComplianceMetricsGrid: React.FC<ComplianceMetricsGridProps> = ({
  totalUnits,
  urgentCount,
  validCount,
  expiringCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Card 1: Urgent Action (Primary #132A20) */}
      <div className="bg-[#132A20] text-white p-5 rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
              Statutory Intervention
            </span>
            <span className="text-4xl font-bold leading-none text-white mt-2 tracking-tight font-mono">
              {urgentCount < 10 ? `0${urgentCount}` : urgentCount}
            </span>
          </div>
          <Badge className="bg-red-800 text-white hover:bg-red-800 text-xs font-semibold flex items-center gap-1 px-2 py-0.5">
            <AlertTriangle className="w-3 h-3" />
            <span>Action Required</span>
          </Badge>
        </div>
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-1">
          <p className="text-xs text-stone-300 leading-relaxed">
            <strong className="text-white font-semibold">1 Gas Safety (CP12) + 1 EICR</strong> expired or due within 7 days. Automatic contractor dispatch queue active.
          </p>
        </div>
      </div>

      {/* Card 2: Total Units */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-stone-200/80 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Total Properties
            </span>
            <span className="text-4xl font-bold leading-none text-[#132A20] mt-2 tracking-tight font-mono">
              {totalUnits}
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-[#132A20]">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Assigned units across</span>
          <span className="font-mono text-[#132A20] font-semibold">2 Active Mandates</span>
        </div>
      </div>

      {/* Card 3: Fully Valid */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-stone-200/80 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Fully Valid Dossiers
            </span>
            <span className="text-4xl font-bold leading-none text-emerald-800 mt-2 tracking-tight font-mono">
              {validCount < 10 ? `0${validCount}` : validCount}
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-800">
            <BadgeCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Complete statutory certification</span>
          <span className="font-mono text-emerald-800 font-semibold">&gt; 60 Days Headroom</span>
        </div>
      </div>

      {/* Card 4: Expiring Soon */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-stone-200/80 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Notice Window (30d)
            </span>
            <span className="text-4xl font-bold leading-none text-amber-800 mt-2 tracking-tight font-mono">
              {expiringCount < 10 ? `0${expiringCount}` : expiringCount}
            </span>
          </div>
          <Badge className="bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-100 text-xs font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Expiring Soon</span>
          </Badge>
        </div>
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Certificates expiring within</span>
          <span className="font-mono text-amber-900 font-semibold">Next 30 Days</span>
        </div>
      </div>
    </div>
  )
}