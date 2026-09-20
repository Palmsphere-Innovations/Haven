import React from "react"
import { Building2, AlertTriangle, AlertCircle, Lock, Wrench, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ComplianceProperty } from "@/lib/mock/compliance"

interface ComplianceTableProps {
  properties: ComplianceProperty[]
  onOrderWorkOrder: (propAddress: string) => void
}

export const ComplianceTable: React.FC<ComplianceTableProps> = ({
  properties,
  onOrderWorkOrder,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200/80 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-100/80 h-10 border-b border-stone-200/80 text-stone-600 uppercase tracking-wider font-semibold">
              <th className="px-4 py-2">Property &amp; Mandate</th>
              <th className="px-4 py-2">Gas Safety (CP12)</th>
              <th className="px-4 py-2">EPC Rating &amp; Expiry</th>
              <th className="px-4 py-2">EICR Electrical</th>
              <th className="px-4 py-2">Tenancy Deposit Protection</th>
              <th className="px-4 py-2 text-right">Delegated Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60">
            {properties.map((row) => {
              const isUrgentRow =
                row.gasSafety.status === "EXPIRED" || row.eicr.status === "EXPIRED"

              return (
                <tr
                  key={row.id}
                  className={`hover:bg-stone-50 transition-colors ${
                    isUrgentRow ? "bg-red-50/30" : ""
                  }`}
                >
                  {/* Property & Mandate */}
                  <td className="px-4 py-3.5 align-top">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        {isUrgentRow ? (
                          <AlertCircle className="w-4 h-4 text-red-800 shrink-0" />
                        ) : (
                          <Building2 className="w-4 h-4 text-[#132A20] shrink-0" />
                        )}
                        <span className="font-semibold text-sm text-[#132A20]">{row.address}</span>
                      </div>
                      <span className="text-stone-500 pl-5">{row.postcode}</span>
                      <div className="flex items-center gap-2 pl-5 mt-1.5">
                        <span className="text-stone-700 font-medium">{row.landlord}</span>
                        <span className="w-1 h-1 rounded-full bg-stone-300" />
                        <Badge
                          variant="outline"
                          className="font-mono text-[10px] bg-stone-100 text-stone-800 border-stone-300 px-1.5 py-0"
                        >
                          {row.mandateTier}
                        </Badge>
                      </div>
                    </div>
                  </td>

                  {/* Gas Safety */}
                  <td className="px-4 py-3.5 align-top">
                    <div className="flex flex-col gap-1">
                      {row.gasSafety.status === "EXPIRED" ? (
                        <Badge className="bg-red-100 text-red-900 border-red-200 hover:bg-red-100 font-semibold w-fit">
                          <AlertTriangle className="w-3 h-3 mr-1 text-red-800" />
                          <span>Expired {row.gasSafety.expiryDate}</span>
                        </Badge>
                      ) : row.gasSafety.status === "EXPIRING" ? (
                        <Badge className="bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-100 font-semibold w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1 animate-pulse" />
                          <span>Expiring in {row.gasSafety.daysRemaining} Days</span>
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-100 font-semibold w-fit">
                          Valid
                        </Badge>
                      )}
                      <span className="font-mono text-stone-800">
                        {row.gasSafety.expiryDate}
                      </span>
                      <span className="text-stone-500">{row.gasSafety.certNumber}</span>
                    </div>
                  </td>

                  {/* EPC */}
                  <td className="px-4 py-3.5 align-top">
                    <div className="flex flex-col gap-1">
                      {row.epc.status === "EXPIRING" ? (
                        <Badge className="bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-100 font-semibold w-fit">
                          Expiring Soon • {row.epc.rating}
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-100 font-semibold w-fit">
                          Valid • {row.epc.rating}
                        </Badge>
                      )}
                      <span className="font-mono text-stone-600">Exp: {row.epc.expiryDate}</span>
                      <span className="text-stone-500">{row.epc.type}</span>
                    </div>
                  </td>

                  {/* EICR */}
                  <td className="px-4 py-3.5 align-top">
                    <div className="flex flex-col gap-1">
                      {row.eicr.status === "EXPIRING" ? (
                        <Badge className="bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-100 font-semibold w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1" />
                          <span>Expiring in {row.eicr.daysRemaining} Days</span>
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-100 font-semibold w-fit">
                          Valid
                        </Badge>
                      )}
                      <span className="font-mono text-stone-600">Exp: {row.eicr.expiryDate}</span>
                      <span className="text-stone-500">{row.eicr.certBody}</span>
                    </div>
                  </td>

                  {/* Tenancy Deposit */}
                  <td className="px-4 py-3.5 align-top">
                    <div className="flex flex-col gap-1">
                      <Badge variant="outline" className="bg-stone-100 text-stone-800 border-stone-300 w-fit">
                        {row.deposit.isRestricted && <Lock className="w-3 h-3 mr-1 text-stone-500" />}
                        <span>{row.deposit.scheme}</span>
                      </Badge>
                      <span className="font-mono text-stone-800">{row.deposit.id}</span>
                      <span className="text-emerald-800 font-medium">
                        {row.deposit.protectedAmount
                          ? `Protected (${row.deposit.protectedAmount})`
                          : "Restricted Access"}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 align-top text-right">
                    {row.mandateTier === "Tier 1: Full Mgt" ? (
                      <div className="flex flex-col items-end gap-1">
                        <Button
                          onClick={() => onOrderWorkOrder(row.address)}
                          className="bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs h-8 px-3 shadow-sm flex items-center gap-1.5"
                        >
                          <Wrench className="w-3.5 h-3.5" />
                          <span>Order CP12 Renewal</span>
                        </Button>
                        <span className="text-[10px] text-stone-500">Authorized to £250 cap</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end gap-1">
                        <Button
                          disabled
                          variant="outline"
                          className="bg-stone-100 text-stone-500 border-stone-300 text-xs h-8 px-3 cursor-not-allowed opacity-80"
                        >
                          <Lock className="w-3.5 h-3.5 mr-1" />
                          <span>View Only (Tier 2)</span>
                        </Button>
                        <span className="text-[10px] text-stone-500 text-right">
                          Owner countersign required
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-4 py-3 bg-stone-100/80 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <span>Showing {properties.length} of 14 delegated properties</span>
          <span className="text-stone-300">•</span>
          <span className="font-mono text-[11px]">8 additional compliant units omitted for concise view</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" className="h-7 px-2.5 text-xs bg-white text-[#132A20] border-stone-300">
            1
          </Button>
          <Button variant="ghost" className="h-7 px-2.5 text-xs text-stone-600">
            2
          </Button>
          <Button variant="ghost" className="h-7 px-2.5 text-xs text-stone-600">
            Next →
          </Button>
        </div>
      </div>
    </div>
  )
}