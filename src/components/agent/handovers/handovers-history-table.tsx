import React from "react"
import { Badge } from "@/components/ui/badge"
import { HistoryHandover } from "@/lib/mock/handovers-types"

interface HandoversHistoryTableProps {
  data: HistoryHandover[]
}

export const HandoversHistoryTable: React.FC<HandoversHistoryTableProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200/80 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-base font-semibold text-[#132A20]">
            Past Handovers &amp; Delegation Audit Log
          </h2>
          <p className="text-xs text-stone-600">
     `      Permanent tamper-evident operational ledger across all managed mandates.
          </p>
        </div>
        <span className="font-mono text-xs text-stone-500">Showing {data.length} of 9 records</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200/80 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-100/80 text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200/80">
              <th className="py-3 px-5">Property &amp; Unit</th>
              <th className="py-3 px-4">Outgoing Party</th>
              <th className="py-3 px-4">Incoming Party</th>
              <th className="py-3 px-4">Scope Tier</th>
              <th className="py-3 px-4">Final Status</th>
              <th className="py-3 px-4">Completed</th>
              <th className="py-3 px-5 font-mono">Audit ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                <td className="py-4 px-5 font-semibold text-[#132A20]">{row.propertyAddress}</td>
                <td className="py-4 px-4 text-stone-600">{row.outgoingParty}</td>
                <td className="py-4 px-4 font-medium text-[#132A20]">{row.incomingParty}</td>
                <td className="py-4 px-4">
                  <Badge variant="outline" className="bg-stone-100 text-stone-700 border-stone-300">
                    {row.scopeTier}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-100 font-semibold">
                    {row.status}
                  </Badge>
                </td>
                <td className="py-4 px-4 font-mono text-stone-600">{row.completedDate}</td>
                <td className="py-4 px-5 font-mono text-[#132A20]">{row.auditId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}