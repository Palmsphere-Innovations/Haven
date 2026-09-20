import React from "react"
import { ShieldCheck, MessageSquare, Wrench, Lock } from "lucide-react"

export const PortfolioMandateFramework: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-[#132A20] font-semibold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
          <h2>MARLA Delegated Authority Framework &amp; Regulatory Protocol</h2>
        </div>
        <span className="text-xs font-mono text-stone-500">Ref: MAR-REG-2024.B</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Tier 1 Brief */}
        <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/60 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[#132A20] font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-800" />
            <span>Tier 1: Full Management</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Autonomous operations including tenancy renewal, repairs up to £250 statutory authorization limit, and full access to custodial client account ledgers.
          </p>
        </div>

        {/* Tier 2 Brief */}
        <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/60 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[#132A20] font-semibold">
            <MessageSquare className="w-4 h-4 text-stone-600" />
            <span>Tier 2: Maintenance &amp; Comms</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Authorized to log maintenance works and manage tenant liaison. Direct banking, tenant arrears recovery, and lease variation are retained by the Principal.
          </p>
        </div>

        {/* Tier 3 Brief */}
        <div className="p-4 rounded-lg bg-stone-50 border border-stone-200/60 flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-brand font-semibold">
            <Lock className="w-4 h-4 text-stone-500" />
            <span>Tier 3: Maintenance Only</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            Strict contractor dispatch and emergency works coordination. All financial balances, rental deposits, and private tenancy documents are strictly redacted.
          </p>
        </div>
      </div>

      {/* Legal Citations Bar */}
      <div className="pt-2 flex flex-wrap items-center justify-between text-stone-500 text-[11px] border-t border-stone-100 gap-2">
        <span>Estate Agents Act 1979 • Tenant Fees Act 2019 • Client Money Protection (CMP) Registered #CMP004912</span>
        <span className="text-emerald-800 font-medium">Haven Operations Core • UK Property Practice Standard</span>
      </div>
    </div>
  )
}