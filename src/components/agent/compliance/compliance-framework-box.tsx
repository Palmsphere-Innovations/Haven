import React from "react"
import { ShieldCheck } from "lucide-react"

export const ComplianceFrameworkBox: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200/80 flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[#132A20] font-semibold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
          <span>UK Statutory Compliance Framework</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          All residential tenancies under Haven administration are subject to rigorous legislative audits. Failing to hold valid certificates exposes both the entity and designated agents to civil penalties up to £30,000 per breach and renders Section 21 eviction notices null and void under the Deregulation Act 2015.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-stone-200/80 text-xs">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-[#132A20] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
              Gas Safety Regs 1998 (CP12)
            </span>
            <p className="text-stone-600 leading-relaxed">
              Mandatory annual inspection for every pipework, boiler, and flue installation. Must be delivered to existing tenants within 28 days of check.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold text-[#132A20] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
              Electrical Safety (EICR 2020)
            </span>
            <p className="text-stone-600 leading-relaxed">
              Mandatory 5-year fixed electrical wiring inspection by a qualified professional. Any C1 or C2 investigative codes require remedial works within 28 days.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold text-[#132A20] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
              EPC Minimum Energy Efficiency (MEES)
            </span>
            <p className="text-stone-600 leading-relaxed">
              Under Energy Performance of Buildings Regs 2012, all let properties must achieve Rating E or higher unless statutory exemption is registered on the PRS register.
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold text-[#132A20] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
              Tenancy Deposit Protection (Housing Act 2004)
            </span>
            <p className="text-stone-600 leading-relaxed">
              Must be lodged in a government-backed scheme (DPS or TDS) within 30 days of receipt, accompanied by Prescribed Information served on the tenant.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}