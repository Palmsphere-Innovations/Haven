"use client";

import React, { useState } from "react";
import { X, Scale, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandlordDisputeRecord } from "@/lib/mock/landlord-disputes";

interface CounterOfferModalProps {
  dispute: LandlordDisputeRecord;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (counterAmount: number, notes: string) => void;
}

export const CounterOfferModal: React.FC<CounterOfferModalProps> = ({
  dispute,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState<string>(
    dispute.counterOfferAmount ? dispute.counterOfferAmount.toString() : (dispute.claimAmount * 0.5).toFixed(0)
  );
  const [notes, setNotes] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 0) {
      setError("Please enter a valid monetary figure (e.g. 100.00).");
      return;
    }
    if (numAmount > dispute.claimAmount) {
      setError(`Counter-offer cannot exceed the total claimed amount of £${dispute.claimAmount.toFixed(2)}.`);
      return;
    }
    setError(null);
    onSubmit(numAmount, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center shrink-0">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900">
              Submit Statutory Counter-Offer
            </h3>
            <p className="text-xs text-stone-500">
              Case Ref: <span className="font-mono font-semibold text-stone-800">#{dispute.reference}</span> · {dispute.unit}
            </p>
          </div>
        </div>

        <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200/80 mb-4 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-stone-500">Original Claimed Amount:</span>
            <span className="font-mono font-bold text-stone-900">£{dispute.claimAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Tenancy Deposit in Escrow:</span>
            <span className="font-mono text-stone-700">£{dispute.depositHeld.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Claimant:</span>
            <span className="font-medium text-stone-800">{dispute.tenantNames}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Proposed Compromise Figure (£)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-mono text-sm">
                £
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full h-10 pl-8 pr-3 rounded-xl border border-stone-300 text-sm font-mono font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20]"
                placeholder="0.00"
              />
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              This formal figure will be transmitted to the managing agent and statutory arbitrator as the Landlord&apos;s settlement proposal.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-800 mb-1">
              Justification &amp; Settlement Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="State rationale for counter-offer (e.g., deducting 1-day emergency heater allowance vs full 4-day requested rent concession)..."
              className="w-full p-3 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20] placeholder:text-stone-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-stone-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 px-4 text-xs rounded-xl cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 px-4 bg-[#132A20] hover:bg-[#0b1b14] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Transmit Counter-Offer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
