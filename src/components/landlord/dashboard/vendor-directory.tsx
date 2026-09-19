import React from "react";
import { Contact, Phone, MoreHorizontal } from "lucide-react";

export const VendorDirectory: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-sm p-6 sm:p-7 flex flex-col">
      <div className="flex items-center justify-between pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Contact className="w-5 h-5 text-[#111827]" />
          <h2 className="text-base font-bold text-[#111827]">Vendor Directory</h2>
        </div>
        <button type="button" className="text-[#6B7280] hover:text-[#111827]">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-3 py-4">
        <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-200 text-[#111827] flex items-center justify-center font-semibold text-xs shrink-0">
              PP
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#111827]">
                Pimlico Emergency Gas &amp; Plumbing
              </span>
              <span className="text-[11px] text-[#6B7280]">24/7 SLA Response</span>
            </div>
          </div>
          <a
            href="tel:+442079241000"
            className="p-2 rounded-lg bg-white hover:bg-gray-100 text-[#111827] border border-gray-200 transition-colors"
            title="Call"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#6B7280]">
        <span>Client Money Protection: Propertymark</span>
        <span className="font-mono">ICO: ZA48291</span>
      </div>
    </div>
  );
};