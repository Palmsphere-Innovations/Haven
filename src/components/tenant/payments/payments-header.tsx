import React from "react"
import { ChevronRight, Download, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentsHeaderProps {
  onDownloadSchedule: () => void
  onDownloadStatement: () => void
}

export const PaymentsHeader: React.FC<PaymentsHeaderProps> = ({
  onDownloadSchedule,
  onDownloadStatement,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-xs text-stone-500">
        <span className="hover:text-[#132A20] transition-colors cursor-pointer">My Home</span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="hover:text-[#132A20] transition-colors cursor-pointer">
          Flat 4B, 18 Kensington Gardens
        </span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-[#132A20] font-semibold">Rent &amp; Payments</span>
      </div>

      {/* Page Title & Action Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
            Rent &amp; Payments
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Flat 4B, 18 Kensington Gardens, London W2 4QH • Monthly rent schedule, payment records, and mandate details under Assured Shorthold Tenancy (AST)
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onDownloadSchedule}
            className="h-9 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 shadow-sm"
          >
            <Download className="w-4 h-4 mr-1.5 text-stone-500" />
            <span>Download Schedule (PDF)</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onDownloadStatement}
            className="h-9 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 shadow-sm"
          >
            <Receipt className="w-4 h-4 mr-1.5 text-stone-500" />
            <span>Tax &amp; Accounting Summary</span>
          </Button>
        </div>
      </div>
    </div>
  )
}