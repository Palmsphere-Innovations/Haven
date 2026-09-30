"use client";

import React from "react";
import { AlertCircle, X, FileText, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import type { LedgerRecord } from "@/types";

interface ArrearsNoticeModalProps {
  record: LedgerRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onServeNotice: (record: LedgerRecord) => void;
}

export const ArrearsNoticeModal: React.FC<ArrearsNoticeModalProps> = ({
  record,
  isOpen,
  onClose,
  onServeNotice,
}) => {
  if (!isOpen || !record) return null;

  return (
    <div
      id="arrears-notice-modal"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Arrears Formal Demand Notice</h3>
              <p className="text-[11px] text-stone-500">Statutory Pre-Action Protocol Compliance</p>
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

        <div className="space-y-3 text-xs text-stone-600">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 space-y-2">
            <div className="flex justify-between items-center font-semibold text-rose-950">
              <span>Outstanding Rent Arrears:</span>
              <span className="font-mono text-sm">{formatCurrency(record.rent, { showDecimals: true })}</span>
            </div>
            <div className="flex justify-between text-[11px] text-rose-800">
              <span>Days in Arrears:</span>
              <span className="font-medium">{record.daysOverdue || 14} days overdue (Due date: {record.dueDate})</span>
            </div>
            <div className="flex justify-between text-[11px] text-rose-800">
              <span>Target Tenant:</span>
              <span className="font-medium">{record.tenant}</span>
            </div>
            <div className="flex justify-between text-[11px] text-rose-800">
              <span>Demised Property:</span>
              <span className="font-medium">{record.address} ({record.propertyCode})</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-[11px] text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/80 leading-relaxed">
            <Scale className="w-4 h-4 text-stone-700 mt-0.5 shrink-0" />
            <p>
              Serving this statutory letter satisfies preliminary requirements under the
              Pre-Action Protocol for Possession Claims by Private Landlords. An official audit
              entry will be logged to the tenant dossier.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 text-xs h-9"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onServeNotice(record);
              onClose();
            }}
            className="flex-1 text-xs h-9 bg-rose-700 hover:bg-rose-800 text-white"
          >
            <FileText className="w-3.5 h-3.5 mr-1.5" />
            Serve Formal Notice
          </Button>
        </div>
      </div>
    </div>
  );
};
