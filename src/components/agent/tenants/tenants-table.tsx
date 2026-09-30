import React from "react"
import { Lock, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { TenantRecord } from "@/lib/mock/tenants"

interface TenantsTableProps {
  tenants: TenantRecord[]
  onViewTenant: (id: string) => void
  onViewDossier: (id: string) => void
}

export interface TenantRecord {
  id: string
  name: string
  initials: string
  email: string
  isApplicant?: boolean
  propertyTitle: string
  landlord: string
  mandateTier: "Tier 1: Full Management" | "Tier 2: Maint + Comms" | "Tier 3: Maintenance Only"
  tenancyDates: string
  rentStatus: string
  rentStatusType: "success" | "warning" | "neutral" | "redacted"
  stageLabel: string
  stageType: "active" | "screening" | "signature"
  isFinancialRestricted?: boolean
}

export const TenantsTable: React.FC<TenantsTableProps> = ({
  tenants,
  onViewTenant,
  onViewDossier,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 4
  const totalPages = Math.max(1, Math.ceil(tenants.length / pageSize))
  const safePage = currentPage > totalPages ? 1 : currentPage
  const paginatedTenants = tenants.slice((safePage - 1) * pageSize, safePage * pageSize)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200/80 overflow-hidden flex flex-col">
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-100/80 text-stone-600 uppercase tracking-wider font-semibold h-10 border-b border-stone-200/80">
              <th className="px-4 py-2">Tenant Name &amp; Contact</th>
              <th className="px-4 py-2">Property &amp; Principal Landlord</th>
              <th className="px-4 py-2">Mandate Tier</th>
              <th className="px-4 py-2">Tenancy Dates</th>
              <th className="px-4 py-2">Rent Status</th>
              <th className="px-4 py-2">Stage</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60">
            {paginatedTenants.map((row) => (
              <tr key={row.id} className="hover:bg-stone-50/80 transition-colors">
                {/* Tenant Name & Contact */}
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-100 border border-stone-300 text-[#132A20] flex items-center justify-center font-bold text-xs shrink-0">
                      {row.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-[#132A20] truncate">
                          {row.name}
                        </span>
                        {row.isApplicant && (
                          <Badge variant="outline" className="text-[10px] bg-stone-100 text-stone-700 border-stone-300 px-1 py-0 font-normal">
                            Applicant
                          </Badge>
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-stone-500 truncate">
                        {row.email}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Property & Landlord */}
                <td className="px-4 py-3.5">
                  <div className="flex flex-col">
                    <span className="font-medium text-[#132A20]">{row.propertyTitle}</span>
                    <span className="font-mono text-[11px] text-stone-500">
                      Principal: {row.landlord}
                    </span>
                  </div>
                </td>

                {/* Mandate Tier */}
                <td className="px-4 py-3.5">
                  <Badge variant="outline" className="text-[11px] bg-stone-100 text-stone-800 border-stone-300 font-medium">
                    {row.mandateTier}
                  </Badge>
                </td>

                {/* Dates */}
                <td className="px-4 py-3.5 font-mono text-stone-700">
                  {row.tenancyDates}
                </td>

                {/* Rent Status */}
                <td className="px-4 py-3.5">
                  {row.rentStatusType === "success" && (
                    <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 font-medium text-[11px] flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                      <span>{row.rentStatus}</span>
                    </Badge>
                  )}
                  {row.rentStatusType === "warning" && (
                    <Badge className="bg-amber-100 text-amber-900 border-amber-200 font-medium text-[11px] flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>{row.rentStatus}</span>
                    </Badge>
                  )}
                  {row.rentStatusType === "neutral" && (
                    <Badge variant="outline" className="bg-stone-100 text-stone-700 border-stone-300 text-[11px] w-fit">
                      {row.rentStatus}
                    </Badge>
                  )}
                  {row.rentStatusType === "redacted" && (
                    <div className="inline-flex items-center gap-1 font-mono text-stone-500 text-xs">
                      <span>—</span>
                      <Lock className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-[11px]">{row.rentStatus}</span>
                    </div>
                  )}
                </td>

                {/* Stage */}
                <td className="px-4 py-3.5">
                  {row.stageType === "active" && (
                    <Badge variant="outline" className="bg-stone-100 text-stone-700 border-stone-300 text-[11px]">
                      {row.stageLabel}
                    </Badge>
                  )}
                  {row.stageType === "screening" && (
                    <Badge className="bg-sky-100 text-sky-900 border-sky-200 text-[11px] flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse" />
                      <span>{row.stageLabel}</span>
                    </Badge>
                  )}
                  {row.stageType === "signature" && (
                    <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-[11px] flex items-center gap-1 w-fit">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>{row.stageLabel}</span>
                    </Badge>
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5 text-right">
                  <div className="inline-flex items-center gap-1 justify-end">
                    {row.isApplicant ? (
                      <Button
                        type="button"
                        onClick={() => onViewDossier(row.id)}
                        className="bg-stone-100 hover:bg-stone-200 text-[#132A20] text-xs h-7 px-3 font-semibold shadow-none border border-stone-300"
                      >
                        View Dossier
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => onViewTenant(row.id)}
                        className="bg-stone-100 hover:bg-[#132A20] hover:text-white text-[#132A20] text-xs h-7 px-3 font-semibold shadow-none border border-stone-200 transition-colors"
                      >
                        View
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => (row.isApplicant ? onViewDossier(row.id) : onViewTenant(row.id))}
                      title="View tenant actions"
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

      {/* Pagination Footer */}
      <div className="px-4 py-3 bg-stone-100/80 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
        <div>
          Showing{" "}
          <span className="font-semibold text-[#132A20]">
            {paginatedTenants.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-[#132A20]">
            {tenants.length}
          </span>{" "}
          active delegated records
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