import React, { useState } from "react"
import { X, ChevronDown, Upload, FolderArchive, XCircle, ShieldCheck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface RaiseDisputeFormData {
  category: string
  value: string
  title: string
  description: string
}

interface RaiseDisputeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (formData: RaiseDisputeFormData) => void
}

export const RaiseDisputeModal: React.FC<RaiseDisputeModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [category, setCategory] = useState("deposit")
  const [value, setValue] = useState("£280.00")
  const [title, setTitle] = useState("Dispute regarding end-of-term cleaning fee quotation")
  const [description, setDescription] = useState(
    "The proposed check-out cleaning invoice includes £280 for carpet deep extraction in the master suite. As noted in the Check-in Inventory Report dated 12 Oct 2023, the carpet showed existing pile wear and light shading at inception. Photos attached demonstrating standard fair wear and tear as defined by the Tenancy Deposit Scheme guidelines."
  )

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ category, value, title, description })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-stone-200/80 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-stone-100 flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#132A20]" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                Statutory ADR Form
              </span>
            </div>
            <h2 className="text-lg font-semibold text-[#132A20] mt-1">Raise a New Formal Dispute</h2>
            <p className="text-xs text-stone-500">
              Initiate an auditable resolution request with Vance Holdings Ltd &amp; Eleanor Vance.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:text-[#132A20] hover:bg-stone-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-[#132A20]">Dispute Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 pr-8 rounded-xl bg-stone-50 text-xs text-[#132A20] font-medium border border-stone-300 focus:outline-none focus:border-[#132A20] cursor-pointer appearance-none"
                >
                  <option value="deposit">Deposit / Dilapidations</option>
                  <option value="maintenance">Maintenance / Failure to Repair</option>
                  <option value="rent">Rent / Service Charge Calculation</option>
                  <option value="breach">Breach of Quiet Enjoyment</option>
                  <option value="other">Other Statutory Breach</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-semibold text-[#132A20]">Claimed Value / Remedy (£)</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. £280.00 or 'Invoice Retraction'"
                className="w-full h-10 px-3 rounded-xl bg-stone-50 text-xs text-[#132A20] border border-stone-300 focus:outline-none focus:border-[#132A20]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#132A20]">Dispute Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-stone-50 text-xs text-[#132A20] border border-stone-300 focus:outline-none focus:border-[#132A20]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#132A20]">
              Grounds of Dispute &amp; Prior Communications
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Provide factual context: dates, communication already attempted with the letting agent, and statutory clause reference if known..."
              className="w-full p-3 rounded-xl bg-stone-50 text-xs text-[#132A20] border border-stone-300 focus:outline-none focus:border-[#132A20] resize-none"
            />
          </div>

          {/* Evidence Drag & Drop Placeholder */}
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-[#132A20]">Evidence Upload &amp; Receipts</label>
            <div className="p-6 rounded-2xl bg-stone-50 border-2 border-dashed border-stone-300 flex flex-col items-center justify-center text-center hover:bg-stone-100/80 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#132A20] mb-2 shadow-xs">
                <Upload className="w-5 h-5" />
              </div>
              <p className="font-semibold text-xs text-[#132A20]">
                Drag &amp; drop photographic proof, contractor invoices, or signed tenancy schedules
              </p>
              <p className="text-[10px] text-stone-500 mt-0.5">Supports PDF, PNG, JPG, CSV up to 25MB each</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-1">
              <div className="px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-200/80 flex items-center gap-2 text-xs font-medium text-stone-800">
                <FolderArchive className="w-3.5 h-3.5 text-emerald-800" />
                <span>Inventory_Photos_Oct26.zip (4.2 MB)</span>
                <XCircle className="w-3.5 h-3.5 text-stone-400 hover:text-red-700 cursor-pointer ml-1" />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-emerald-950 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="font-semibold text-xs text-[#132A20]">Your landlord/agent will be notified and can respond here.</span>
              <p className="text-[11px] text-stone-600">
                All entries comply with the Housing Act 1988, Tenant Fees Act 2019, and statutory Alternative Dispute Resolution (ADR) guidelines.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="h-9 px-4 text-xs text-stone-600 hover:bg-stone-100"
            >
              Cancel / Save Draft
            </Button>
            <Button
              type="submit"
              className="h-9 px-6 rounded-xl bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Submit Dispute</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}