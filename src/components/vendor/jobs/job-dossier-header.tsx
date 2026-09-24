import React from "react"
import { MapPin, Key, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { JobItem } from "./job-types"

interface JobDossierHeaderProps {
  job: JobItem
}

export const JobDossierHeader: React.FC<JobDossierHeaderProps> = ({ job }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-base text-[#132A20]">#{job.reference}</span>
          <span className="font-mono text-xs text-stone-500">PO #{job.poNumber}</span>
          {job.priority === "urgent" ? (
            <Badge className="bg-rose-100 text-rose-900 border-rose-200 text-[10px] font-semibold">
              Urgent • Same Day
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-stone-100 text-stone-700 text-[10px]">
              Routine
            </Badge>
          )}
          <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-[10px] font-semibold">
            {job.status}
          </Badge>
        </div>

        {/* Pre-approval Cap Indicator */}
        <div className="bg-stone-50 border border-stone-200/80 px-3 py-1.5 rounded-xl text-right">
          <div className="text-[10px] font-semibold text-stone-500 uppercase">Authorised Cap Limit</div>
          <div className="font-mono text-sm font-bold text-[#132A20]">
            {job.preAuthCap} <span className="text-[10px] font-normal text-stone-500">(Landlord Pre-Approved)</span>
          </div>
        </div>
      </div>

      {/* Job Title & Property Spec */}
      <div>
        <h2 className="text-xl font-bold text-[#132A20] tracking-tight">{job.title}</h2>
        <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-1">
          <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
          <span>{job.propertyAddress}</span>
        </div>
      </div>

      {/* Access Details Banner */}
      <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#132A20] shrink-0 shadow-xs">
            <Key className="w-4 h-4 text-emerald-800" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#132A20]">Operational Access Details</div>
            <div className="text-xs text-stone-600 mt-0.5">
              {job.accessDetails} • Passcode: <span className="font-mono font-semibold text-[#132A20]">{job.conciergePasscode}</span> • Key Safe: <span className="font-mono font-semibold text-[#132A20]">{job.keySafeCode}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-200 rounded-lg text-stone-600 text-xs shadow-xs whitespace-nowrap">
          <ShieldCheck className="w-4 h-4 text-emerald-800" />
          <span>Tenant Contact Shielded by Haven</span>
        </div>
      </div>
    </div>
  )
}