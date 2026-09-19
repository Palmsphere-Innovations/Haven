import React from "react"

export const HandoversFooter: React.FC = () => {
  return (
    <footer className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-stone-500 text-xs border-t border-stone-200/80">
      <div className="flex flex-col">
        <span>
          Operating in strict accordance with the Estate Agents Act 1979, Tenant Fees Act 2019, and RICS Property Management Regulations.
        </span>
        <span className="text-[#132A20] font-medium mt-0.5">
          Permission tier mandates remain sovereign to the registered Landlord. Agents hold delegated custodial operational power only.
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0 font-mono">
        <span>Session: #SES-LON-9932</span>
        <span className="text-stone-300">•</span>
        <span className="text-emerald-800 font-semibold">ARLA Propertymark Protected</span>
      </div>
    </footer>
  )
}