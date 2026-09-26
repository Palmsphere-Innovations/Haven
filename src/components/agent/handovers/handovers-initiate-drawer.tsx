"use client";
import React, { useState } from "react"
import { X, Send, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface HandoversInitiateDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Record<string, unknown>) => void
}

export const HandoversInitiateDrawer: React.FC<HandoversInitiateDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedProp, setSelectedProp] = useState("Flat 4B, 18 Kensington Gardens")
  const [targetDate, setTargetDate] = useState("2025-11-15")
  const [notes, setNotes] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ selectedProp, targetDate, notes })
  }

  const isTier2 = selectedProp.includes("Richmond Hill")

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#132A20]/40 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 bg-stone-100 border-b border-stone-200 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold text-[#132A20] uppercase tracking-wider">
              Protocol 09-B
            </span>
            <h3 className="text-lg font-semibold text-[#132A20] mt-0.5">
              Initiate Handover Protocol
            </h3>
            <p className="text-xs text-stone-600 mt-1">
              Transfer day-to-day management of an existing property to another accredited agent.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-500 hover:text-[#132A20] rounded hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form id="handover-drawer-form" onSubmit={handleSubmit} className="p-6 flex flex-col gap-5 flex-1">
          {/* Managed Property */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-[#132A20] flex justify-between">
              <span>Select Managed Property</span>
              <span className="text-stone-500 font-normal">Scoped to your mandate</span>
            </Label>
            <select
              value={selectedProp}
              onChange={(e) => setSelectedProp(e.target.value)}
              className="w-full h-10 px-3 rounded border border-stone-300 bg-white text-xs font-medium text-[#132A20] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#132A20]"
            >
              <option value="Flat 4B, 18 Kensington Gardens">
                Flat 4B, 18 Kensington Gardens (Vance Holdings Ltd)
              </option>
              <option value="12 Richmond Hill Mansions">
                12 Richmond Hill Mansions (Pembroke Estate Trust)
              </option>
              <option value="8 Camden Mews">8 Camden Mews (Vance Holdings Ltd)</option>
            </select>
          </div>

          {/* Incoming Agent */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-[#132A20]">
              Select Accredited Incoming Agent
            </Label>
            <select className="w-full h-10 px-3 rounded border border-stone-300 bg-white text-xs font-medium text-[#132A20] shadow-sm focus:outline-none focus:ring-1 focus:ring-[#132A20]">
              <option>Eleanor Pembroke — Pembroke &amp; Partners (ARLA #8819)</option>
              <option>Siobhan Campbell — Apex Residential London (ARLA #7231)</option>
              <option>Marcus Sterling — Mayfair Property Assets (RICS #004812)</option>
              <option>Julian Thorne — Belgrave Property Management (MARLA #4820)</option>
            </select>
            <span className="text-[11px] text-stone-500">
              Only Propertymark or RICS verified firms are eligible for statutory transfer.
            </span>
          </div>

          {/* Locked Tier Callout */}
          <div className="p-4 bg-stone-100 rounded-lg border border-stone-200/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#132A20] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-[#132A20]">
                Permission Tier Locked:{" "}
                <span className="underline">
                  {isTier2 ? "Tier 2 • Maintenance + Communication" : "Tier 1 • Full Management"}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Agents cannot assign, upgrade, or degrade permission tiers. The incoming agent will inherit your existing Landlord-approved scope subject to Landlord countersignature.
              </p>
            </div>
          </div>

          {/* Target Handover Date */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-[#132A20]">Target Handover Date</Label>
            <Input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="font-mono text-xs border-stone-300"
            />
            <span className="text-[11px] text-stone-500">
              Minimum 72-hour statutory notice required for tenant advisory letter dispatch.
            </span>
          </div>

          {/* Transfer Note */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-semibold text-[#132A20]">
              Transfer Note &amp; Operational Context
            </Label>
            <Textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Reason for handover, outstanding vendor invoices, pending maintenance tickets, tenant contact preference..."
              className="text-xs border-stone-300 focus:border-[#132A20]"
            />
          </div>

          {/* Statutory Checklist */}
          <div className="flex flex-col gap-2 p-3 bg-stone-50 rounded border border-stone-200">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox defaultChecked />
              <span className="text-xs text-stone-700">
                Auto-attach active CP12, EICR &amp; EPC to recipient dossier
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Checkbox defaultChecked />
              <span className="text-xs text-stone-700">
                Notify Landlord (Alistair Vance) for sovereign digital signature
              </span>
            </label>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="p-5 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3">
          <Button type="button" variant="ghost" onClick={onClose} className="text-xs text-stone-600">
            Discard
          </Button>
          <Button
            type="submit"
            form="handover-drawer-form"
            className="bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Handover Request</span>
          </Button>
        </div>
      </div>
    </div>
  )
}