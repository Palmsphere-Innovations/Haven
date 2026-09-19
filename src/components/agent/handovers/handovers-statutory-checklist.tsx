import React from "react"
import { ShieldCheck, Key, FolderArchive, PenTool } from "lucide-react"

export const HandoversStatutoryChecklist: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#132A20]">
          <ShieldCheck className="w-4 h-4" />
          <h3 className="text-sm font-semibold">Statutory Transfer Protocol &amp; Pre-requisites</h3>
        </div>
        <span className="text-xs text-stone-500">Section 11, Landlord &amp; Tenant Act 1985 Compliant</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200/80 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[#132A20] font-semibold text-xs">
            <Key className="w-4 h-4 text-emerald-800" />
            <span>1. Custodial Handover Check</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Keys and digital access transponders must be physically audited or securely logged into key locker lockers before tenant check-in transfer.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200/80 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[#132A20] font-semibold text-xs">
            <FolderArchive className="w-4 h-4 text-emerald-800" />
            <span>2. Statutory Pack Transference</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Gas Safety (CP12), EICR certificates, How to Rent guides, and DPS deposit certificates automatically attach to the recipient agent ledger.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200/80 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[#132A20] font-semibold text-xs">
            <PenTool className="w-4 h-4 text-emerald-800" />
            <span>3. Landlord Sovereign Countersignature</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            All agent-to-agent transitions trigger an automated digital endorsement request to the property owner&apos;s primary Haven portal.
          </p>
        </div>
      </div>
    </div>
  )
}