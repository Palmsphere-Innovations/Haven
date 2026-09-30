import React from "react"
import { Info, Trash2, VolumeX, Droplets } from "lucide-react"

export const TenantBuildingGuide: React.FC = () => {
  return (
    <div className="bg-stone-50 rounded-xl p-6 border border-stone-200/80 shadow-sm flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-stone-600" />
        <h3 className="text-xs font-semibold text-[#132A20]">Building Quick Guide</h3>
      </div>

      <div className="flex flex-col gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <Trash2 className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#132A20] block">Refuse &amp; Recycling</span>
            <span className="text-stone-600">Tuesday mornings. Bins in the rear courtyard gate #2.</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <VolumeX className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#132A20] block">Quiet Hours</span>
            <span className="text-stone-600">11:00 PM – 7:00 AM daily for residential comfort.</span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Droplets className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#132A20] block">Meters &amp; Stopcock</span>
            <span className="text-stone-600">Basement utility cupboard marked #4B. Key on apartment rack.</span>
          </div>
        </div>
      </div>
    </div>
  )
}