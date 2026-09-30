import React from "react"
import { Search, SlidersHorizontal, ArrowRight, Package, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { JobItem } from "./job-types"

interface JobQueueSidebarProps {
  jobs: JobItem[]
  selectedTab: string
  onSelectTab: (tab: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onSelectJob: (id: string) => void
}

export const JobQueueSidebar: React.FC<JobQueueSidebarProps> = ({
  jobs,
  selectedTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onSelectJob,
}) => {
  const tabs = [
    { id: "all", label: "All (24)" },
    { id: "new", label: "New", badge: 3 },
    { id: "active", label: "Active (6)" },
    { id: "completed", label: "Completed (15)" },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* Filter Tabs & Search Controls */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm p-4 space-y-3">
        <div className="flex items-center justify-between gap-1 bg-stone-100 p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1 ${
                selectedTab === tab.id
                  ? "bg-white text-[#132A20] shadow-xs font-bold"
                  : "text-stone-600 hover:text-[#132A20]"
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 bg-rose-600 text-white text-[10px] font-mono rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-7 relative">
            <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Filter address, PO..."
              className="w-full h-9 pl-8 pr-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#132A20] placeholder:text-stone-400 focus:outline-none focus:border-[#132A20] focus:bg-white transition-all"
            />
          </div>
          <div className="col-span-5">
            <div className="relative">
              <select className="w-full h-9 px-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-[#132A20] font-medium focus:outline-none cursor-pointer appearance-none">
                <option>All Priorities</option>
                <option>Urgent • Same Day</option>
                <option>Routine (48hr)</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Job Stream */}
      <div className="space-y-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => onSelectJob(job.id)}
            className={`relative bg-white rounded-2xl p-4 border transition-all cursor-pointer shadow-xs ${
              job.isFocused
                ? "border-[#132A20] bg-stone-50/50 ring-1 ring-[#132A20]"
                : "border-stone-200/80 hover:bg-stone-50/80"
            }`}
          >
            {job.isFocused && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#132A20] rounded-l-2xl" />
            )}

            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-xs text-[#132A20]">
                  #{job.reference}
                </span>
                {job.priority === "urgent" ? (
                  <Badge className="bg-rose-100 text-rose-900 border-rose-200 text-[10px] font-semibold">
                    Urgent • Today
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-stone-100 text-stone-700 text-[10px]">
                    Routine
                  </Badge>
                )}
              </div>

              {job.status === "In Progress" && (
                <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-[10px] font-semibold">
                  In Progress
                </Badge>
              )}
              {job.status === "New Request" && (
                <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-[10px] font-semibold">
                  New Request
                </Badge>
              )}
              {job.status === "Awaiting Parts" && (
                <Badge variant="outline" className="bg-blue-50 text-blue-900 border-blue-200 text-[10px] font-semibold">
                  Awaiting Parts
                </Badge>
              )}
              {job.status === "Completed" && (
                <Badge variant="outline" className="bg-stone-100 text-stone-700 text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  Completed
                </Badge>
              )}
            </div>

            <h2 className="font-semibold text-xs text-[#132A20] line-clamp-1">{job.title}</h2>
            <p className="text-xs text-stone-500 truncate mt-0.5">{job.propertyAddress}</p>

            <div className="mt-3 pt-2 flex items-center justify-between border-t border-stone-100 text-[11px] text-stone-500">
              <span className="font-mono font-medium">Pre-Auth: {job.preAuthCap}</span>
              <div className="flex items-center gap-1 font-semibold text-[#132A20]">
                <span>{job.isFocused ? "Dossier Active" : "View Scope"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}