import React from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ActiveJob } from "./vendor-types"

interface ActiveJobsTableProps {
  jobs: ActiveJob[]
  onUpdateStatus: (id: string) => void
}

export const ActiveJobsTable: React.FC<ActiveJobsTableProps> = ({
  jobs,
  onUpdateStatus,
}) => {
  return (
    <div className="flex flex-col gap-3 mb-6" id="active-jobs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#132A20]">Jobs In Progress</h2>
          <p className="text-xs text-stone-500">
            Confirmed orders currently in transit, on site, or awaiting replacement components.
          </p>
        </div>
        <a
          href="#"
          className="text-xs font-semibold text-[#132A20] hover:underline inline-flex items-center gap-1"
        >
          <span>View All Active Jobs ({jobs.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200/80 text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4">Job Reference</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Scope of Work</th>
                <th className="py-3 px-4">Scheduled Time</th>
                <th className="py-3 px-4">Operational Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#132A20]">
                    #{job.reference}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#132A20]">{job.property}</div>
                    <div className="text-[11px] text-stone-500">{job.location}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-stone-800">{job.scope}</div>
                    <div className="text-[11px] text-stone-400">PO #{job.poNumber}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {job.isToday ? (
                      <span className="font-semibold text-amber-800">{job.scheduledTime}</span>
                    ) : (
                      <span className="text-stone-600">{job.scheduledTime}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {job.status === "In Progress" && (
                      <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        <span>In Progress</span>
                      </Badge>
                    )}
                    {job.status === "Awaiting Parts" && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-900 border-blue-200 text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        <span>Awaiting Parts</span>
                      </Badge>
                    )}
                    {job.status === "Scheduled" && (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-900 border-emerald-200 text-[10px] font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                        <span>Scheduled</span>
                      </Badge>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onUpdateStatus(job.id)}
                      className="h-7 px-2.5 text-[11px] border-stone-200 text-[#132A20] hover:bg-stone-100"
                    >
                      <span>Update Status</span>
                      <ChevronDown className="w-3 h-3 ml-1 text-stone-400" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}