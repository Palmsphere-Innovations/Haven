import React from "react"
import { Wrench, VolumeX, Receipt, Upload } from "lucide-react"

interface CommunicationQuickActionsProps {
  onSelectAction: (actionName: string) => void
}

export const CommunicationQuickActions: React.FC<CommunicationQuickActionsProps> = ({
  onSelectAction,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider whitespace-nowrap pr-2">
        Quick Actions
      </span>
      <button
        type="button"
        onClick={() => onSelectAction("Submit Maintenance Request")}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:bg-stone-50 transition-all text-[#132A20] text-xs font-medium whitespace-nowrap"
      >
        <Wrench className="w-4 h-4 text-emerald-800" />
        <span>Submit Maintenance Request</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectAction("Report Noise / Building Issue")}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:bg-stone-50 transition-all text-[#132A20] text-xs font-medium whitespace-nowrap"
      >
        <VolumeX className="w-4 h-4 text-stone-500" />
        <span>Report Noise / Building Issue</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectAction("Rent Adjustment Query")}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:bg-stone-50 transition-all text-[#132A20] text-xs font-medium whitespace-nowrap"
      >
        <Receipt className="w-4 h-4 text-stone-500" />
        <span>Rent Adjustment Query</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectAction("Upload Tenancy Document")}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-200/80 shadow-xs hover:bg-stone-50 transition-all text-[#132A20] text-xs font-medium whitespace-nowrap"
      >
        <Upload className="w-4 h-4 text-stone-500" />
        <span>Upload Tenancy Document</span>
      </button>
    </div>
  )
}