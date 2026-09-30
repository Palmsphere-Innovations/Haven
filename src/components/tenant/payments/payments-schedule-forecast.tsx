import React from "react"
import { Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { UpcomingPaymentSchedule } from "@/types/index"

interface PaymentsScheduleForecastProps {
  schedules: UpcomingPaymentSchedule[]
}

export const PaymentsScheduleForecast: React.FC<PaymentsScheduleForecastProps> = ({
  schedules,
}) => {
  return (
    <div className="rounded-2xl bg-white p-6 border border-stone-200/80 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-base font-semibold text-[#132A20]">Upcoming Rent Schedule</h2>
          <p className="text-xs text-stone-500">
            Pre-authorized upcoming debits through the winter quarter
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-100 px-3 py-1 rounded-lg border border-stone-200/60 self-start sm:self-auto">
          <Lock className="w-3.5 h-3.5 text-emerald-800" />
          <span>Fixed rent rate locked until 30 Nov 2025</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {schedules.map((s) => (
          <div
            key={s.id}
            className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                  {s.month}
                </span>
                <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-[10px] font-medium">
                  {s.status}
                </Badge>
              </div>
              <p className="font-mono font-bold text-lg text-[#132A20]">{s.amount}</p>
              <p className="text-xs text-stone-500 mt-0.5">Due {s.dueDate}</p>
            </div>
            <div className="mt-4 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>Ref: {s.reference}</span>
              <span className="text-[#132A20] font-medium">Bacs Mandate</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}