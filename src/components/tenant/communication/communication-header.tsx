import React from "react"
import { ChevronRight, PhoneCall, ShieldCheck } from "lucide-react"

export const CommunicationHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Breadcrumbs & Status Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <span className="hover:text-[#132A20] transition-colors cursor-pointer">My Home</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="hover:text-[#132A20] transition-colors cursor-pointer">
            Flat 4B, 18 Kensington Gardens
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#132A20] font-semibold">Contact &amp; Messages</span>
        </div>

        {/* Dispatch & Operational Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200/80 text-xs text-stone-600 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="font-semibold text-[#132A20]">Agent Online</span>
            <span className="text-stone-300">•</span>
            <span>Replies in ~2 hrs (Mon–Fri, 9–6)</span>
          </div>

          <a
            href="tel:08004589120"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-red-900 font-mono text-xs hover:bg-red-100 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-700" />
            <span className="font-semibold">24/7 Haven Dispatch:</span>
            <span>0800 458 9120</span>
          </a>
        </div>
      </div>

      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
            Contact &amp; Messages
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Direct communication channel with your managing agent:{" "}
            <strong className="text-[#132A20] font-semibold">Eleanor Vance</strong> (Prime Heritage Management) on behalf of Vance Holdings Ltd.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-1.5 text-stone-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-800" />
          <span>Statutory Tenancy Audit Active</span>
        </div>
      </div>
    </div>
  )
}