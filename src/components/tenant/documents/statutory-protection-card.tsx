import React from "react"
import { Landmark, Headphones, ExternalLink } from "lucide-react"

export const StatutoryProtectionCard: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Landmark className="w-5 h-5 text-emerald-800" />
        <h4 className="text-sm font-semibold text-[#132A20]">Statutory Protection Notice</h4>
      </div>

      <p className="text-xs text-stone-600 leading-relaxed">
        All files stored within Haven adhere to the <strong>Housing Act 1988 (as amended)</strong>, <strong>Deregulation Act 2015</strong>, and <strong>UK GDPR</strong> data retention schedules. Your cryptographic copy is mirrored in real time with the Tenancy Deposit Scheme.
      </p>

      <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex flex-col gap-1 text-xs text-[#132A20]">
        <div className="flex items-center gap-1.5 font-semibold text-[10px] uppercase tracking-wider text-stone-500">
          <Headphones className="w-3.5 h-3.5 text-emerald-800" />
          <span>Managing Agent Contact</span>
        </div>
        <p className="font-semibold mt-1">Eleanor Vance</p>
        <p className="text-stone-500 text-[11px]">Prime Heritage Management (Mayfair)</p>
        <a
          href="mailto:eleanor.vance@primeheritage.co.uk"
          className="text-emerald-800 hover:underline font-medium text-[11px] mt-1 flex items-center gap-1"
        >
          <span>eleanor.vance@primeheritage.co.uk</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}