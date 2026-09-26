"use client";
import React from "react"
import {
  Building2,
  Landmark,
  CheckCircle2,
  AlertTriangle,
  Lock,
  MoreVertical,
  ShieldCheck,
  Wrench,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PortfolioProperty } from "@/lib/mock/portfolio"

interface PortfolioTableProps {
  properties: PortfolioProperty[]
  onViewUnit: (id: string) => void
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
  properties,
  onViewUnit,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 4
  const totalPages = Math.max(1, Math.ceil(properties.length / pageSize))
  const safePage = currentPage > totalPages ? 1 : currentPage
  const paginatedProperties = properties.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200/80 overflow-hidden flex flex-col">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-100/80 h-10 text-stone-600 uppercase tracking-wider font-semibold border-b border-stone-200/80">
              <th className="pl-4 pr-3 py-2">Property &amp; Principal Landlord</th>
              <th className="px-3 py-2">Unit Type</th>
              <th className="px-3 py-2">Current Tenant</th>
              <th className="px-3 py-2 text-right">Rent &amp; Ledger Status</th>
              <th className="px-3 py-2 text-center">Compliance</th>
              <th className="px-3 py-2">Delegated Tier</th>
              <th className="pr-4 pl-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60">
            {paginatedProperties.map((row) => (
              <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                {/* Property & Principal Landlord */}
                <td className="pl-4 pr-3 py-3.5 align-middle">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                      <Building2 className="w-4 h-4 text-emerald-800" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-sm text-[#132A20] truncate">
                        {row.title}
                      </span>
                      <span className="text-stone-500">{row.address}</span>
                      <div className="mt-1">
                        <Badge
                          variant="outline"
                          className="font-normal text-[10px] bg-stone-100 text-stone-700 border-stone-300 px-2 py-0.5 flex items-center gap-1 w-fit"
                        >
                          <Landmark className="w-3 h-3 text-stone-500" />
                          <span>Principal: {row.landlord}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Unit Type */}
                <td className="px-3 py-3.5 align-middle">
                  <div className="flex flex-col">
                    <span className="font-semibold text-stone-800">{row.unitType}</span>
                    <span className="text-stone-500">{row.specs}</span>
                  </div>
                </td>

                {/* Current Tenant */}
                <td className="px-3 py-3.5 align-middle">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        row.status === "occupied"
                          ? "bg-emerald-700"
                          : row.status === "vacant"
                          ? "bg-stone-400"
                          : "bg-amber-500"
                      }`}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#132A20]">{row.tenantName}</span>
                      <span className="text-stone-500">{row.tenantNote}</span>
                    </div>
                  </div>
                </td>

                {/* Rent & Ledger */}
                <td className="px-3 py-3.5 align-middle text-right">
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-semibold font-mono text-sm text-[#132A20]">
                      {row.rentAmount} {row.rentAmount !== "—" && <span className="text-stone-500 font-normal text-xs">/ mo</span>}
                    </span>
                    {row.paymentStatusType === "success" && (
                      <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 font-medium text-[10px] px-2 py-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                        <span>{row.paymentStatus}</span>
                      </Badge>
                    )}
                    {row.paymentStatusType === "warning" && (
                      <Badge className="bg-amber-100 text-amber-900 border-amber-200 font-medium text-[10px] px-2 py-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        <span>{row.paymentStatus}</span>
                      </Badge>
                    )}
                    {row.paymentStatusType === "redacted" && (
                      <Badge variant="outline" className="bg-stone-100 text-stone-500 border-stone-300 font-medium text-[10px] px-2 py-0.5 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-stone-400" />
                        <span>{row.paymentStatus}</span>
                      </Badge>
                    )}
                  </div>
                </td>

                {/* Compliance */}
                <td className="px-3 py-3.5 align-middle text-center">
                  {row.complianceValid ? (
                    <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 font-semibold text-[10px] px-2 py-1 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-800" />
                      <span>{row.complianceSummary}</span>
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-900 border-red-200 font-semibold text-[10px] px-2 py-1 inline-flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-800" />
                      <span>{row.complianceSummary}</span>
                    </Badge>
                  )}
                </td>

                {/* Delegated Tier */}
                <td className="px-3 py-3.5 align-middle">
                  {row.mandateTier === "Tier 1: Full Management" && (
                    <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 font-semibold text-[10px] px-2.5 py-1 flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3 h-3 text-emerald-800" />
                      <span>{row.mandateTier}</span>
                    </Badge>
                  )}
                  {row.mandateTier === "Tier 2: Maint + Comms" && (
                    <Badge className="bg-stone-100 text-stone-800 border-stone-300 font-semibold text-[10px] px-2.5 py-1 flex items-center gap-1 w-fit">
                      <MessageSquare className="w-3 h-3 text-stone-600" />
                      <span>{row.mandateTier}</span>
                    </Badge>
                  )}
                  {row.mandateTier === "Tier 3: Maintenance Only" && (
                    <Badge variant="outline" className="bg-stone-100 text-stone-700 border-stone-300 font-semibold text-[10px] px-2.5 py-1 flex items-center gap-1 w-fit">
                      <Wrench className="w-3 h-3 text-stone-500" />
                      <span>{row.mandateTier}</span>
                    </Badge>
                  )}
                </td>

                {/* Actions */}
                <td className="pr-4 pl-3 py-3.5 align-middle text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      type="button"
                      onClick={() => onViewUnit(row.id)}
                      className="bg-stone-100 hover:bg-[#132A20] hover:text-white text-[#132A20] text-xs h-7 px-3 font-semibold shadow-none border border-stone-200 transition-colors"
                    >
                      View Unit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => onViewUnit(row.id)}
                      title="View unit details"
                      className="h-7 w-7 p-0 text-stone-500 hover:text-[#132A20] cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination & Count */}
      <div className="p-3 bg-stone-100/80 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
        <div>
          Displaying{" "}
          <span className="font-mono font-semibold text-[#132A20]">
            {paginatedProperties.length}
          </span>{" "}
          of{" "}
          <span className="font-mono font-semibold text-[#132A20]">
            {properties.length}
          </span>{" "}
          delegated properties under active agent mandate
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="outline"
            disabled={safePage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="h-7 px-2.5 text-xs bg-white text-stone-700 border-stone-200 disabled:opacity-40 cursor-pointer"
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              type="button"
              variant={safePage === pageNum ? "default" : "outline"}
              onClick={() => setCurrentPage(pageNum)}
              className={`h-7 px-2.5 text-xs cursor-pointer ${
                safePage === pageNum
                  ? "bg-[#132A20] text-white hover:bg-[#1c3e30]"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-stone-50"
              }`}
            >
              {pageNum}
            </Button>
          ))}
          <Button
            type="button"
            variant="outline"
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="h-7 px-2.5 text-xs bg-white text-stone-700 border-stone-300 disabled:opacity-40 cursor-pointer"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}