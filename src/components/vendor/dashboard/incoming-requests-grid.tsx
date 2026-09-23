import React from "react"
import { MapPin, Key, User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IncomingJobRequest } from "./vendor-types"

interface IncomingRequestsGridProps {
  requests: IncomingJobRequest[]
  onAcceptJob: (id: string) => void
  onDeclineJob: (id: string) => void
}

export const IncomingRequestsGrid: React.FC<IncomingRequestsGridProps> = ({
  requests,
  onAcceptJob,
  onDeclineJob,
}) => {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-[#132A20]">Incoming Job Requests</h2>
          <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-xs font-semibold">
            {requests.length} Actionable
          </Badge>
        </div>
        <span className="text-xs text-stone-500 hidden sm:inline">
          Review scope &amp; access credentials prior to acceptance
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col justify-between"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                {req.priority === "urgent" ? (
                  <Badge className="bg-rose-100 text-rose-900 border-rose-200 text-[10px] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                    <span>{req.priorityLabel}</span>
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-stone-100 text-stone-700 text-[10px]">
                    {req.priorityLabel}
                  </Badge>
                )}
                <span className="font-mono text-xs font-bold text-[#132A20]">
                  {req.cappedPrice}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1 text-xs text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="font-semibold text-[#132A20] truncate">
                    {req.propertyAddress}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#132A20] mt-1 leading-snug">
                  {req.title}
                </p>
                <span className="inline-block mt-1 text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                  Trade: {req.tradeCategory}
                </span>
              </div>

              {/* Access Protocol Box */}
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/60 text-xs text-stone-800 flex items-start gap-2">
                {req.accessCode?.includes("Key") || req.accessProtocol.includes("concierge") ? (
                  <Key className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                ) : req.accessProtocol.includes("Lockbox") ? (
                  <Lock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                ) : (
                  <User className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                )}
                <div className="leading-relaxed text-[11px]">
                  <strong className="font-semibold text-[#132A20]">Access:</strong> {req.accessProtocol}{" "}
                  {req.accessCode && (
                    <span className="font-mono font-semibold text-[#132A20]">
                      {req.accessCode}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-stone-500">
                Dispatched by <span className="font-medium text-[#132A20]">{req.dispatchedBy}</span> • Logged {req.timeAgo}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-stone-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onDeclineJob(req.id)}
                className="h-8 text-xs text-stone-600 hover:bg-stone-100"
              >
                Decline
              </Button>
              <Button
                type="button"
                onClick={() => onAcceptJob(req.id)}
                className="h-8 px-4 rounded-xl bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-xs"
              >
                Accept Job
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}