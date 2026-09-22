import React, { useState } from "react"
import { CreditCard, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentsModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (option: string) => void
}

export const PaymentsModal: React.FC<PaymentsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [selectedOption, setSelectedOption] = useState("autopay")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 transition-opacity">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#132A20] text-white flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#132A20]">
                Manage Autopay / Early Settlement
              </h3>
              <p className="text-xs text-stone-500">Flat 4B, 18 Kensington Gardens</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 mb-4 text-xs space-y-1.5">
          <div className="flex justify-between items-center text-stone-600">
            <span>Scheduled Amount</span>
            <span className="text-sm font-bold text-[#132A20] font-mono">£2,450.00</span>
          </div>
          <div className="flex justify-between items-center text-stone-600">
            <span>Current Due Date</span>
            <span className="font-mono text-[#132A20]">01 November 2024</span>
          </div>
          <div className="flex justify-between items-center text-stone-600">
            <span>Mandate</span>
            <span className="font-mono text-[#132A20]">Barclays Bank UK (•••• 4321)</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-6 text-xs">
          <label className="font-semibold text-[#132A20]">Payment Option</label>
          <label
            onClick={() => setSelectedOption("autopay")}
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              selectedOption === "autopay"
                ? "border-[#132A20] bg-stone-50"
                : "border-stone-200 hover:bg-stone-50/50"
            }`}
          >
            <input
              type="radio"
              name="payOption"
              checked={selectedOption === "autopay"}
              onChange={() => setSelectedOption("autopay")}
              className="mt-1 accent-[#132A20]"
            />
            <div>
              <span className="font-semibold text-[#132A20] block">
                Keep Autopay on 01 Nov 2024 (Recommended)
              </span>
              <span className="text-stone-500 block mt-0.5">
                Your bank account will automatically be debited through Bacs. No action required.
              </span>
            </div>
          </label>

          <label
            onClick={() => setSelectedOption("early")}
            className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
              selectedOption === "early"
                ? "border-[#132A20] bg-stone-50"
                : "border-stone-200 hover:bg-stone-50/50"
            }`}
          >
            <input
              type="radio"
              name="payOption"
              checked={selectedOption === "early"}
              onChange={() => setSelectedOption("early")}
              className="mt-1 accent-[#132A20]"
            />
            <div>
              <span className="font-semibold text-[#132A20] block">
                Pay Early Today via Instant UK Open Banking
              </span>
              <span className="text-stone-500 block mt-0.5">
                Clears instantly and marks November rent as settled immediately.
              </span>
            </div>
          </label>
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="h-8 text-xs text-stone-600 hover:bg-stone-100"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => onConfirm(selectedOption)}
            className="h-8 text-xs bg-[#132A20] hover:bg-[#1c3e30] text-white font-semibold"
          >
            <Check className="w-3.5 h-3.5 mr-1" />
            <span>Save Preferences</span>
          </Button>
        </div>
      </div>
    </div>
  )
}