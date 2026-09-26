"use client";
import React from "react"
import { ShieldCheck, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { OutgoingHandover } from "@/lib/mock/handovers-types"

interface HandoversOutgoingTableProps {
  data: OutgoingHandover[]
  onCancelRequest: (id: string) => void
  onOpenNewDrawer: () => void
}

export const HandoversOutgoingTable: React.FC<HandoversOutgoingTableProps> = ({
  data,
  onCancelRequest,
  onOpenNewDrawer,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200/80 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-base font-semibold text-[#132A20]">
            Outgoing Handovers Initiated by You
          </h2>
          <p className="text-xs text-stone-600">
            Transfers currently awaiting incoming agent counter-acceptance or Landlord mandate sign-off.
          </p>
        </div>
        <Button
          onClick={onOpenNewDrawer}
          className="bg-[#132A20] text-white hover:bg-[#1c3e30] text-xs font-semibold"
        >
          New Outgoing Request
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-stone-200/80 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-100/80 text-stone-600 font-semibold uppercase tracking-wider border-b border-stone-200/80">
              <th className="py-3 px-5">Property &amp; Landlord</th>
              <th className="py-3 px-4">Proposed Incoming Agent</th>
              <th className="py-3 px-4">Inherited Scope</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Initiated</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                <td className="py-4 px-5">
                  <div className="font-semibold text-sm text-[#132A20]">{row.propertyAddress}</div>
                  <div className="text-stone-500 font-normal">
                    {row.landlord} ({row.reference})
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="font-medium text-[#132A20]">{row.incomingAgent}</div>
                  <div className="text-stone-500">{row.incomingAgentCode}</div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant="outline" className="bg-stone-100 text-[#132A20] border-stone-300 font-medium flex items-center gap-1 w-fit">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{row.scopeTier}</span>
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <Badge className="bg-stone-200 text-stone-800 border-stone-300 hover:bg-stone-200 text-[11px] font-semibold">
                    {row.status}
                  </Badge>
                </td>
                <td className="py-4 px-4 font-mono text-[#132A20]">{row.initiatedDate}</td>
                <td className="py-4 px-5 text-right">
                  <Button
                    variant="ghost"
                    onClick={() => onCancelRequest(row.id)}
                    className="text-red-800 hover:text-red-900 hover:bg-red-50 text-xs h-8 px-2"
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    <span>Cancel Request</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}