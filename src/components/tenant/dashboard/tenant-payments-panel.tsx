import React from "react"
import { ChevronRight, CheckCircle2, Receipt, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RentPaymentRecord } from "@/lib/mock/tenants"

interface TenantPaymentsPanelProps {
  payments: RentPaymentRecord[]
  onViewAllPayments: () => void
  onDownloadReceipt: (id: string) => void
}

export const TenantPaymentsPanel: React.FC<TenantPaymentsPanelProps> = ({
  payments,
  onViewAllPayments,
  onDownloadReceipt,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold text-[#132A20]">Rent &amp; Payments</h2>
          <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-xs font-medium">
            Next Due: 01 Nov 2024
          </Badge>
        </div>
        <button
          type="button"
          onClick={onViewAllPayments}
          className="text-xs font-semibold text-[#132A20] hover:underline flex items-center gap-1"
        >
          <span>View All Payments</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/60 flex items-start gap-2 text-xs text-stone-600">
        <Info className="w-4 h-4 text-[#132A20] shrink-0 mt-0.5" />
        <p>
          Your monthly rent is <strong className="text-[#132A20] font-semibold">£2,450.00</strong>, collected automatically on the 1st of every month via Direct Debit mandate <span className="font-mono text-stone-500">#HA-9941</span>.
        </p>
      </div>

      {/* Mini Payment Ledger List */}
      <div className="flex flex-col divide-y divide-stone-200/60">
        {payments.map((p) => (
          <div
            key={p.id}
            className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50 px-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-emerald-800 shrink-0 border border-stone-200">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-[#132A20]">{p.period}</span>
                  <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-[10px] px-1.5 py-0">
                    {p.status}
                  </Badge>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Paid {p.date} <span className="mx-1">•</span> Direct Debit <span className="font-mono">{p.directDebitRef}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 pl-12 sm:pl-0">
              <span className="font-mono font-bold text-sm text-[#132A20]">{p.amount}</span>
              <Button
                type="button"
                variant="ghost"
                onClick={() => onDownloadReceipt(p.id)}
                className="h-7 px-2 text-xs text-[#132A20] hover:bg-stone-100 font-medium flex items-center gap-1"
              >
                <Receipt className="w-3.5 h-3.5 text-stone-500" />
                <span>Receipt</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-xs text-stone-500 border-t border-stone-100">
        Looking to adjust payment details or banking mandate? Contact your property manager or visit payment settings.
      </div>
    </div>
  )
}