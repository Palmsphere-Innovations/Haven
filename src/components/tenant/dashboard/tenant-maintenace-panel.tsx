import React from "react"
import { Wrench, Check, AlertTriangle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MaintenanceTicket } from "@/lib/mock/tenants"

interface TenantMaintenancePanelProps {
  tickets: MaintenanceTicket[]
  onSubmitNewRequest: () => void
  onViewTicketDetails: (id: string) => void
}

export const TenantMaintenancePanel: React.FC<TenantMaintenancePanelProps> = ({
  tickets,
  onSubmitNewRequest,
  onViewTicketDetails,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-sm flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#132A20]">
            Maintenance &amp; Repairs
            </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Report repairs and track certified contractor visits in real time.
          </p>
        </div>
        <Button
          type="button"
          onClick={onSubmitNewRequest}
          className="bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold h-8 px-3.5 rounded-lg shadow-sm shrink-0"
        >
          <Wrench className="w-3.5 h-3.5 mr-1.5 text-emerald-300" />
          <span>+ Submit New Request</span>
        </Button>
      </div>

      {/* Active & Recent Requests List */}
      <div className="flex flex-col gap-3">
        {tickets.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-xl border flex flex-col gap-2 ${
              t.status === "Visit Scheduled"
                ? "bg-stone-50 border-stone-200/80"
                : "bg-white border-stone-200/60 hover:bg-stone-50/50 transition-colors"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-[#132A20]">{t.title}</span>
                <Badge variant="outline" className="bg-stone-100 text-stone-700 text-[10px]">
                  {t.category}
                </Badge>
              </div>
              {t.status === "Visit Scheduled" ? (
                <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-[10px] font-semibold flex items-center gap-1 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>{t.status}</span>
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-emerald-50 text-emerald-900 border-emerald-200 text-[10px] font-semibold flex items-center gap-1 w-fit">
                  <Check className="w-3 h-3 text-emerald-700" />
                  <span>{t.status}</span>
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-600 pt-1">
              <div>
                <span className="text-[10px] text-stone-400 uppercase block font-semibold">Logged</span>
                <span className="font-medium text-[#132A20]">{t.loggedDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase block font-semibold">Assigned Contractor</span>
                <span className="font-medium text-[#132A20]">{t.contractor}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase block font-semibold">Appointment Window</span>
                <span className="font-semibold text-[#132A20]">
                  {t.appointmentWindow || t.resolutionDate || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 mt-1 border-t border-stone-200/50 text-xs">
              <span className="text-stone-400 font-mono text-[11px]">Reference: {t.reference}</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onViewTicketDetails(t.id)}
                  className="font-semibold text-[#132A20] hover:underline"
                >
                  View Details
                </button>
                {t.status === "Visit Scheduled" && (
                  <button type="button" className="text-stone-500 hover:text-[#132A20]">
                    Reschedule
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Banner */}
      <div className="mt-2 p-4 rounded-xl bg-stone-100 border border-stone-200/80 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs">
          <p className="font-semibold text-[#132A20]">24/7 Haven Emergency Dispatch</p>
          <p className="text-stone-600 mt-0.5 leading-relaxed">
            For urgent burst pipes, total electrical blackout, or suspected gas leaks, telephone{" "}
            <strong className="text-[#132A20] font-mono">0800 458 9120</strong> immediately.
          </p>
        </div>
      </div>
    </div>
  )
}