"use client";

import React, { useState } from "react";
import { Send, X, MessageSquare, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import type { LedgerRecord } from "@/types";

interface RentReminderModalProps {
  record: LedgerRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onDispatch: (record: LedgerRecord, channel: "sms" | "email" | "both") => void;
}

export const RentReminderModal: React.FC<RentReminderModalProps> = ({
  record,
  isOpen,
  onClose,
  onDispatch,
}) => {
  const [channel, setChannel] = useState<"both" | "email" | "sms">("both");

  if (!isOpen || !record) return null;

  return (
    <div
      id="rent-reminder-modal"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
    >
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Rent Payment Reminder</h3>
              <p className="text-[11px] text-stone-500">Automated Notification Dispatch</p>
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

        <div className="text-xs text-stone-600 space-y-3">
          <p>
            Send a polite payment reminder to{" "}
            <strong className="text-stone-900">{record.tenant}</strong> for{" "}
            <strong className="text-stone-900">{formatCurrency(record.rent, { showDecimals: true })}</strong> due on{" "}
            <strong className="text-stone-900">{record.dueDate}</strong>.
          </p>

          {/* Delivery Channel selector */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setChannel("both")}
              className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                channel === "both"
                  ? "bg-amber-50 border-amber-300 text-amber-900 font-semibold"
                  : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <MessageSquare className="w-3.5 h-3.5" />
              Email &amp; SMS
            </button>
            <button
              type="button"
              onClick={() => setChannel("email")}
              className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                channel === "email"
                  ? "bg-amber-50 border-amber-300 text-amber-900 font-semibold"
                  : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              Email Only
            </button>
            <button
              type="button"
              onClick={() => setChannel("sms")}
              className={`flex-1 py-1.5 px-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                channel === "sms"
                  ? "bg-amber-50 border-amber-300 text-amber-900 font-semibold"
                  : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              SMS Only
            </button>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 text-[11px] text-amber-900 font-mono leading-relaxed">
            &ldquo;Dear {record.tenant}, this is a reminder that your monthly rent of{" "}
            {formatCurrency(record.rent, { showDecimals: true })} for {record.address} was scheduled for{" "}
            {record.dueDate}. Please verify your payment or direct debit instruction.&rdquo;
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
              onDispatch(record, channel);
              onClose();
            }}
            className="flex-1 text-xs h-9 bg-brand hover:bg-[#0b1b14] text-white"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            Dispatch Reminder
          </Button>
        </div>
      </div>
    </div>
  );
};
