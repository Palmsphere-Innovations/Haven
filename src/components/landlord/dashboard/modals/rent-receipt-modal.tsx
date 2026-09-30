"use client";

import React from "react";
import { Receipt, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import type { LedgerRecord } from "@/types";

interface RentReceiptModalProps {
  record: LedgerRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onExportPdf?: (record: LedgerRecord) => void;
}

export const RentReceiptModal: React.FC<RentReceiptModalProps> = ({
  record,
  isOpen,
  onClose,
  onExportPdf,
}) => {
  if (!isOpen || !record) return null;

  return (
    <div
      id="rent-receipt-modal"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Statutory Rent Receipt</h3>
              <p className="text-[11px] text-stone-500">Official Client Account Record</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 space-y-2.5 text-xs">
          <div className="flex justify-between">
            <span className="text-stone-500">Receipt Ref:</span>
            <span className="font-mono font-bold text-stone-900">{record.referenceNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Property:</span>
            <span className="font-medium text-stone-900">{record.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Tenant:</span>
            <span className="font-medium text-stone-900">{record.tenant}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Rent Paid:</span>
            <span className="font-bold text-emerald-800 text-sm font-mono">
              {formatCurrency(record.rent, { showDecimals: true })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Payment Route:</span>
            <span className="font-medium text-stone-900">{record.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Settlement Date:</span>
            <span className="font-medium text-stone-900">
              {record.paidDate || record.dueDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 text-xs h-9"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              if (onExportPdf) {
                onExportPdf(record);
              }
              onClose();
            }}
            className="flex-1 text-xs h-9 bg-brand hover:bg-[#0b1b14] text-white"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
