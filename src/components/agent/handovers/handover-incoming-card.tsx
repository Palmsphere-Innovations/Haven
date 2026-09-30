"use client";
import React, { useState } from "react"
import { Check, X, Lock, ExternalLink, Key, CheckCircle, Zap, Flame, Calendar, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IncomingHandover } from "@/lib/mock/handovers-types"

interface HandoversIncomingCardProps {
  item: IncomingHandover
  onAccept: (id: string, name: string) => void
  onDecline: (id: string, name: string) => void
}

export const HandoversIncomingCard: React.FC<HandoversIncomingCardProps> = ({
  item,
  onAccept,
  onDecline,
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)

  const handleAcceptClick = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsAccepted(true)
      onAccept(item.id, item.propertyAddress)
    }, 600)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200/80 overflow-hidden flex flex-col">
      {/* Top Banner */}
      <div className="p-5 bg-white flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
            <img src={item.imageUrl} alt={item.propertyAddress} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-semibold text-[#132A20]">{item.propertyAddress}</span>
              <Badge variant="outline" className="bg-stone-100 text-stone-800 border-stone-300 font-medium">
                {item.landlord}
              </Badge>
              <span className="font-mono text-xs text-stone-500">Ref: {item.reference}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-600 mt-1 flex-wrap">
              <span>
                Outgoing: <strong className="text-[#132A20]">{item.outgoingAgent}</strong> ({item.outgoingAgentCode})
              </span>
              <span className="text-stone-300">•</span>
              <span>
                Delegated Landlord: <strong className="text-[#132A20]">{item.landlordName}</strong>
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-red-800 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                Target Handover: {item.targetHandoverDate} ({item.daysRemaining} days remaining)
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {isAccepted ? (
            <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 py-1.5 px-3 text-xs font-semibold">
              <Check className="w-3.5 h-3.5 mr-1" />
              Accepted
            </Badge>
          ) : (
            <>
              <Button
                type="button"
                onClick={handleAcceptClick}
                disabled={isProcessing}
                className="bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                {isProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Check className="w-3.5 h-3.5" />
                )}
                <span>Accept Handover</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onDecline(item.id, item.propertyAddress)}
                className="border-red-200 text-red-800 hover:bg-red-50 text-xs font-medium"
              >
                Decline
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-stone-50/70 border-t border-stone-200/80">
        {/* Col 1 */}
        <div className="flex flex-col gap-1.5 p-3.5 bg-white rounded-lg border border-stone-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-semibold text-stone-500">
              Granted Scope Mandate
            </span>
            <Badge variant="outline" className="text-[10px] bg-stone-100 text-stone-700 border-stone-300">
              <Lock className="w-3 h-3 mr-1 text-[#132A20]" />
              Read-only • Principal Set
            </Badge>
          </div>
          <div className="text-sm font-semibold text-[#132A20] mt-1">{item.scopeTier}</div>
          <p className="text-xs text-stone-600 leading-relaxed">{item.scopeDescription}</p>
        </div>

        {/* Col 2 */}
        <div className="flex flex-col gap-1.5 p-3.5 bg-white rounded-lg border border-stone-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-semibold text-stone-500">
              Current Tenancy State
            </span>
            <Badge className="bg-stone-200 text-stone-800 border-stone-300 hover:bg-stone-200 text-[10px] font-semibold">
              {item.tenancyStatus}
            </Badge>
          </div>
          <div className="text-sm font-semibold text-[#132A20] mt-1">{item.tenantName}</div>
          <div className="flex flex-col text-xs text-stone-600">
            <span className="font-mono text-[#132A20] font-semibold">
              £{item.rentPcm.toLocaleString("en-GB")}.00 / month
            </span>
            <span>AST valid to {item.astExpiry}</span>
            <span className="text-emerald-800 text-[11px] font-medium mt-1">
              DPS Custodial ID: {item.dpsId}
            </span>
          </div>
        </div>

        {/* Col 3 */}
        <div className="flex flex-col gap-1.5 p-3.5 bg-white rounded-lg border border-stone-200/80">
          <span className="text-[11px] uppercase font-semibold text-stone-500">
            Attached Records &amp; Assets
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs text-[#132A20] mt-1">
            <div className="flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-emerald-800" />
              <span>{item.keysCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-emerald-800" />
              <span>CP12: {item.cp12Status}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-800" />
              <span>EICR: {item.eicrStatus}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-800" />
              <span>EPC: {item.epcRating}</span>
            </div>
          </div>
          <div className="pt-2 mt-auto">
            <a href="#" className="inline-flex items-center gap-1 text-xs text-[#132A20] font-semibold hover:underline">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Full Inventory &amp; Audit Pack</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}