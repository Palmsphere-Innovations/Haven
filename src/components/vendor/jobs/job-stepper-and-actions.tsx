
import React from "react"
import { Check, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JobStepperAndActionsProps {
  onMarkComplete: () => void
  onReschedule: () => void
  onHoldForParts: () => void
}

export const JobStepperAndActions: React.FC<JobStepperAndActionsProps> = ({
  onMarkComplete,
  onReschedule,
  onHoldForParts,
}) => {
  return (
    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px]">
          Workflow Status
        </span>
        <span className="font-semibold text-[#132A20]">Stage 3 of 4: Engineer Active</span>
      </div>

      <div className="grid grid-cols-4 gap-2 relative">
        {/* Step 1 */}
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-full bg-[#132A20] rounded-full" />
          <div className="text-[11px] font-semibold text-[#132A20] flex items-center gap-1 mt-1">
            <Check className="w-3 h-3 text-emerald-700" />
            <span>Accepted</span>
          </div>
          <div className="font-mono text-[10px] text-stone-400">16 Oct, 09:15</div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-full bg-[#132A20] rounded-full" />
          <div className="text-[11px] font-semibold text-[#132A20] flex items-center gap-1 mt-1">
            <Check className="w-3 h-3 text-emerald-700" />
            <span>Scheduled</span>
          </div>
          <div className="font-mono text-[10px] text-stone-400">14:00 - 16:00</div>
        </div>

        {/* Step 3 (Current) */}
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-full bg-[#132A20] rounded-full relative">
            <span className="absolute right-0 -top-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75" />
          </div>
          <div className="text-[11px] font-semibold text-[#132A20] flex items-center gap-1 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>In Progress</span>
          </div>
          <div className="font-mono text-[10px] text-[#132A20] font-medium">On-Site Diagnostics</div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col gap-1 opacity-50">
          <div className="h-1.5 w-full bg-stone-200 rounded-full" />
          <div className="text-[11px] font-medium text-stone-500 mt-1">Sign-off</div>
          <div className="font-mono text-[10px] text-stone-400">Pending completion</div>
        </div>
      </div>

      <div className="pt-3 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onReschedule}
            className="h-8 text-xs border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
          >
            Reschedule Window
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onHoldForParts}
            className="h-8 text-xs border-stone-300 bg-white text-stone-700 hover:bg-stone-100"
          >
            Hold for Parts
          </Button>
        </div>

        <Button
          type="button"
          onClick={onMarkComplete}
          className="h-9 px-4 rounded-xl bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>Mark Complete &amp; Sign Off</span>
        </Button>
      </div>
    </div>
  )
}