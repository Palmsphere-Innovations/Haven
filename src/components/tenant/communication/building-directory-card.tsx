import React from "react"
import { Phone, UserCheck, Building2, AlertTriangle, FileText } from "lucide-react"

export const BuildingDirectoryCard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Directory Card */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-[#132A20]">Key Building Contacts</h4>

        <div className="flex flex-col gap-3">
          {/* Item 1: Concierge */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-[#132A20]">
                <UserCheck className="w-4 h-4 text-emerald-800" />
              </div>
              <div>
                <p className="font-semibold text-xs text-[#132A20]">Front Desk Concierge</p>
                <p className="text-[11px] text-stone-500">Gatehouse • 24/7 on duty</p>
              </div>
            </div>
            <a
              href="tel:02079460188"
              className="p-2 rounded-lg bg-white text-[#132A20] border border-stone-200 hover:bg-stone-100 shadow-xs"
              title="Call Concierge"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Item 2: Superintendent */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-[#132A20]">
                <Building2 className="w-4 h-4 text-emerald-800" />
              </div>
              <div>
                <p className="font-semibold text-xs text-[#132A20]">Marcus Bell (Superintendent)</p>
                <p className="text-[11px] text-stone-500">Refuse, parcels &amp; car park access</p>
              </div>
            </div>
            <a
              href="tel:02079460190"
              className="p-2 rounded-lg bg-white text-[#132A20] border border-stone-200 hover:bg-stone-100 shadow-xs"
              title="Call Superintendent"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Item 3: Emergency */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/50 border border-red-200/60">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-900">
                <AlertTriangle className="w-4 h-4 text-red-700" />
              </div>
              <div>
                <p className="font-semibold text-xs text-red-900">Haven Emergency Line</p>
                <p className="text-[11px] text-stone-500">Burst pipes, gas leaks, lockouts</p>
              </div>
            </div>
            <a
              href="tel:08004589120"
              className="p-2 rounded-lg bg-red-800 text-white hover:bg-red-900 transition-colors shadow-xs"
              title="Emergency Call"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

        <p className="text-xs text-stone-500 leading-normal">
          Non-urgent queries outside business hours are queued for reply the following business day at 09:00 BST.
        </p>
      </div>

      {/* Statutory Notice Card */}
      <div className="p-4 rounded-2xl bg-stone-100/80 border border-stone-200/80 flex items-start gap-3">
        <FileText className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5 text-xs">
          <span className="font-semibold text-[#132A20]">Statutory Notice Acknowledgement</span>
          <p className="text-stone-600 leading-relaxed">
            Official notices regarding rent revisions, safety inspections, and building works are also posted to your physical mailbox under Section 196 of the Law of Property Act 1925.
          </p>
        </div>
      </div>
    </div>
  )
}