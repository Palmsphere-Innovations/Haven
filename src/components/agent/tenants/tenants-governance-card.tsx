import React from "react"
import { Shield, UserCheck, EyeOff, FileCheck } from "lucide-react"

export const TenantsGovernanceCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-1 border-b border-stone-100">
        <Shield className="w-5 h-5 text-emerald-800" />
        <h3 className="text-sm font-semibold text-[#132A20]">
          Delegated Tenancy Governance &amp; Statutory Directives
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Col 1 */}
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-stone-50 border border-stone-200/60">
          <div className="flex items-center gap-2 font-semibold text-[#132A20]">
            <UserCheck className="w-4 h-4 text-emerald-800" />
            <span>Enrollment vs Direct Invitation</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            As a MARLA-certified Managing Agent, initiating tenancy triggers formal statutory onboarding workflows—including biometric Right to Rent verification (Immigration Act 2014) and OpenBanking affordability screening. Unvetted direct invitations remain strictly restricted to private self-managing landlords.
          </p>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-stone-50 border border-stone-200/60">
          <div className="flex items-center gap-2 font-semibold text-[#132A20]">
            <EyeOff className="w-4 h-4 text-stone-600" />
            <span>Tier-Scoped Rent Ledger Access</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            In accordance with Estate Agency mandates and GDPR confidentiality boundaries, tenancies classified under <strong className="text-[#132A20]">Tier 3: Maintenance Only</strong> redact financial ledgers and payment histories. Agents are delegated operational authority solely for repairs and statutory health &amp; safety works.
          </p>
        </div>

        {/* Col 3 */}
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-stone-50 border border-stone-200/60">
          <div className="flex items-center gap-2 font-semibold text-[#132A20]">
            <FileCheck className="w-4 h-4 text-emerald-800" />
            <span>Statutory AST Deposit Protection</span>
          </div>
          <p className="text-stone-600 leading-relaxed">
            All secured tenancy deposits are registered under Custodial Schemes (Deposit Protection Service / Tenancy Deposit Scheme) within statutory 30-day deadlines. Prescribed Information Packets and EPC/EICR compliance dockets are automatically synchronized prior to tenancy commencement.
          </p>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-stone-500 border-t border-stone-100">
        <div className="flex flex-wrap items-center gap-2">
          <span>Estate Agents Act 1979</span>
          <span>•</span>
          <span>Tenant Fees Act 2019</span>
          <span>•</span>
          <span>Immigration Act 2014</span>
          <span>•</span>
          <span>MARLA Delegated Operating Protocol</span>
        </div>
        <div className="flex items-center gap-1.5 text-stone-600 font-medium">
          <Shield className="w-3.5 h-3.5 text-emerald-800" />
          <span>All applicant PII encrypted under UK-GDPR Tier 1 Ledger standard</span>
        </div>
      </div>
    </div>
  )
}