"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Receipt,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatters";
import { INITIAL_MONTHLY_LEDGERS } from "@/lib/mock/ledger";
import type { LedgerRecord, LedgerStatus } from "@/types";
import {
  RentReceiptModal,
  RentReminderModal,
  ArrearsNoticeModal,
} from "@/components/landlord/dashboard/modals";

export const RentLedgerCard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("Oct 2025");
  const [monthData, setMonthData] = useState<Record<string, LedgerRecord[]>>(INITIAL_MONTHLY_LEDGERS);
  const [statusFilter, setStatusFilter] = useState<"all" | "overdue" | "due_soon" | "paid">("all");

  // Interactive modal active records
  const [activeReceipt, setActiveReceipt] = useState<LedgerRecord | null>(null);
  const [activeReminder, setActiveReminder] = useState<LedgerRecord | null>(null);
  const [activeNotice, setActiveNotice] = useState<LedgerRecord | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const currentRecords = useMemo(
    () => monthData[selectedMonth] || [],
    [monthData, selectedMonth]
  );

  // Dynamic calculations for cashflow metrics
  const {
    totalExpected,
    paidTotal,
    dueSoonTotal,
    overdueTotal,
    paidPct,
    duePct,
    overduePct,
  } = useMemo(() => {
    let total = 0;
    let paid = 0;
    let dueSoon = 0;
    let overdue = 0;

    currentRecords.forEach((rec) => {
      total += rec.rent;
      if (rec.status.startsWith("paid")) {
        paid += rec.rent;
      } else if (rec.status === "due_soon") {
        dueSoon += rec.rent;
      } else if (rec.status.startsWith("overdue")) {
        overdue += rec.rent;
      }
    });

    const pPct = total > 0 ? Math.round((paid / total) * 100) : 0;
    const dPct = total > 0 ? Math.round((dueSoon / total) * 100) : 0;
    const oPct = total > 0 ? Math.max(0, 100 - pPct - dPct) : 0;

    return {
      totalExpected: total,
      paidTotal: paid,
      dueSoonTotal: dueSoon,
      overdueTotal: overdue,
      paidPct: pPct,
      duePct: dPct,
      overduePct: oPct,
    };
  }, [currentRecords]);

  // Filtered rows
  const filteredRecords = useMemo(() => {
    return currentRecords.filter((rec) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "overdue") return rec.status.startsWith("overdue");
      if (statusFilter === "due_soon") return rec.status === "due_soon";
      if (statusFilter === "paid") return rec.status.startsWith("paid");
      return true;
    });
  }, [currentRecords, statusFilter]);

  // Quick action: Mark as Paid & Reconcile
  const handleMarkAsPaid = (recordId: string) => {
    setMonthData((prev) => {
      const updated = { ...prev };
      updated[selectedMonth] = (updated[selectedMonth] || []).map((rec) => {
        if (rec.id === recordId) {
          return {
            ...rec,
            status: "paid_bacs" as LedgerStatus,
            paidDate: "Today, reconciled via Client Account",
            daysOverdue: undefined,
          };
        }
        return rec;
      });
      return updated;
    });
    showToast("Rent successfully marked as paid & reconciled.");
  };

  // Status tag renderer
  const renderStatusTag = (status: LedgerStatus) => {
    switch (status) {
      case "overdue_14":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#991B1B] text-[11px] font-medium bg-[#FDE8E8] text-[#991B1B]">
            <AlertCircle className="w-3 h-3 text-[#991B1B]" />
            Overdue (14 days)
          </span>
        );
      case "overdue_7":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#991B1B] text-[11px] font-medium bg-[#FDE8E8] text-[#991B1B]">
            <AlertCircle className="w-3 h-3 text-[#991B1B]" />
            Overdue (7 days)
          </span>
        );
      case "due_soon":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#8D6E18] text-[11px] font-medium bg-[#FEF7E6] text-[#8D6E18]">
            <Clock className="w-3 h-3 text-[#8D6E18]" />
            Due in 3 days
          </span>
        );
      case "paid_dd":
      case "paid_so":
      case "paid_bacs":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#1B5E20] text-[11px] font-medium bg-[#EAF4ED] text-[#1B5E20]">
            <CheckCircle2 className="w-3 h-3 text-[#1B5E20]" />
            {status === "paid_dd"
              ? "Paid (Direct Debit)"
              : status === "paid_so"
              ? "Paid (Standing Order)"
              : "Paid (BACS Reconciled)"}
          </span>
        );
    }
  };

  return (
    <div id="rent-ledger-card" className="bg-white rounded-2xl border border-[#ECEEED] shadow-sm p-6 sm:p-7 flex flex-col relative">
      {/* Toast Alert */}
      {toast && (
        <div className="absolute top-4 right-6 z-30 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header & Month Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#111827]">
              Rent Ledger &amp; Cashflow Status
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold">
              Live Bank Sync
            </span>
          </div>
          <p className="text-xs text-[#6B7280] mt-0.5">
            {selectedMonth} collection roll • Statutory Client Money Account (Barclays #40291)
          </p>
        </div>

        {/* Interactive Month Switcher */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
          {["Oct 2025", "Sep 2025", "Aug 2025"].map((month) => {
            const isActive = selectedMonth === month;
            return (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  isActive
                    ? "bg-white text-[#111827] shadow-sm"
                    : "text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {month}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Cashflow Meter */}
      <div className="py-5">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6B7280]">Total Expected:</span>
              <span className="font-bold text-[#111827]">
                {formatCurrency(totalExpected, { showDecimals: true })}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#374151]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-700" />
                Paid {formatCurrency(paidTotal)} ({paidPct}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Due Soon {formatCurrency(dueSoonTotal)} ({duePct}%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-600" />
                Overdue {formatCurrency(overdueTotal)} ({overduePct}%)
              </span>
            </div>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden flex shadow-inner">
            <div
              className="h-full bg-emerald-700 transition-all duration-500"
              style={{ width: `${paidPct}%` }}
              title={`Paid: ${paidPct}%`}
            />
            <div
              className="h-full bg-amber-400 transition-all duration-500"
              style={{ width: `${duePct}%` }}
              title={`Due Soon: ${duePct}%`}
            />
            <div
              className="h-full bg-rose-500 transition-all duration-500"
              style={{ width: `${overduePct}%` }}
              title={`Overdue: ${overduePct}%`}
            />
          </div>
        </div>
      </div>

      {/* Quick Status Filter Tabs */}
      <div className="flex items-center justify-between gap-2 pb-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === "all"
                ? "bg-stone-900 text-white"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            All ({currentRecords.length})
          </button>
          <button
            onClick={() => setStatusFilter("overdue")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === "overdue"
                ? "bg-rose-100 text-rose-800 border border-rose-200"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Overdue ({currentRecords.filter((r) => r.status.startsWith("overdue")).length})
          </button>
          <button
            onClick={() => setStatusFilter("due_soon")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === "due_soon"
                ? "bg-amber-100 text-amber-800 border border-amber-200"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Due Soon ({currentRecords.filter((r) => r.status === "due_soon").length})
          </button>
          <button
            onClick={() => setStatusFilter("paid")}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === "paid"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : "text-stone-600 hover:bg-stone-100"
            }`}
          >
            Paid ({currentRecords.filter((r) => r.status.startsWith("paid")).length})
          </button>
        </div>
      </div>

      {/* Tenancies Collection Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold">
              <th className="py-3 pr-4">Property Address</th>
              <th className="py-3 px-3">Tenant Name</th>
              <th className="py-3 px-3 text-right">Rent / P.C.M</th>
              <th className="py-3 px-3">Due Date</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 pl-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-stone-500">
                  No tenancy ledger records match the selected filter.
                </td>
              </tr>
            ) : (
              filteredRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50/70 transition-colors">
                  {/* Property Address */}
                  <td className="py-3.5 pr-4 font-medium text-[#111827]">
                    <Link
                      href={`/properties/${rec.propertyId}`}
                      className="hover:text-brand hover:underline inline-flex items-center gap-1 max-w-[200px] truncate"
                      title={rec.address}
                    >
                      <span className="font-semibold text-stone-900">{rec.address}</span>
                      <span className="text-[10px] text-stone-400 font-normal">({rec.propertyCode})</span>
                    </Link>
                  </td>

                  {/* Tenant Name */}
                  <td className="py-3.5 px-3 text-[#6B7280]">
                    <Link
                      href={`/tenants/${rec.tenantId}`}
                      className="hover:text-[#111827] hover:underline max-w-[160px] truncate block font-medium"
                      title={rec.tenant}
                    >
                      {rec.tenant}
                    </Link>
                  </td>

                  {/* Rent amount */}
                  <td className="py-3.5 px-3 text-right font-semibold text-[#111827] font-mono">
                    {formatCurrency(rec.rent, { showDecimals: true })}
                  </td>

                  {/* Due Date */}
                  <td className="py-3.5 px-3 text-[#6B7280] font-mono text-[11px] whitespace-nowrap">
                    {rec.dueDate}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    {renderStatusTag(rec.status)}
                  </td>

                  {/* Interactive Action Buttons */}
                  <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {rec.status === "overdue_14" && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setActiveNotice(rec)}
                            className="h-7 px-2.5 text-[11px] font-semibold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Notice
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsPaid(rec.id)}
                            className="h-7 px-2 text-[10px] text-stone-500 hover:text-emerald-700 hover:bg-emerald-50"
                            title="Mark as paid"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                        </>
                      )}

                      {rec.status === "overdue_7" && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setActiveReminder(rec)}
                            className="h-7 px-2.5 text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Reminder
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsPaid(rec.id)}
                            className="h-7 px-2 text-[10px] text-stone-500 hover:text-emerald-700 hover:bg-emerald-50"
                            title="Mark as paid"
                          >
                            <Check className="w-3 h-3" />
                          </Button>
                        </>
                      )}

                      {rec.status === "due_soon" && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setActiveReminder(rec)}
                          className="h-7 px-2.5 text-[11px] font-medium bg-gray-100 hover:bg-gray-200 text-[#111827]"
                        >
                          <Send className="w-3 h-3 mr-1 text-stone-500" />
                          Send Early
                        </Button>
                      )}

                      {rec.status.startsWith("paid") && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setActiveReceipt(rec)}
                          className="h-7 px-2.5 text-[11px] font-medium bg-gray-100 hover:bg-gray-200 text-[#111827]"
                        >
                          <Receipt className="w-3 h-3 mr-1 text-emerald-700" />
                          Receipt
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary with Dynamic Counts */}
      <div className="pt-5 mt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B7280]">
        <span>
          Showing {filteredRecords.length} of {currentRecords.length} tenancy collection records
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/tenants"
            className="font-medium text-stone-600 hover:text-stone-900 transition-colors"
          >
            All Tenants
          </Link>
          <Link
            href="/properties"
            className="font-semibold text-brand hover:underline flex items-center gap-1"
          >
            <span>Complete Rent Roll</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Standalone Modular Modals */}
      <RentReceiptModal
        record={activeReceipt}
        isOpen={Boolean(activeReceipt)}
        onClose={() => setActiveReceipt(null)}
        onExportPdf={() => showToast("Statutory PDF receipt downloaded.")}
      />

      <RentReminderModal
        record={activeReminder}
        isOpen={Boolean(activeReminder)}
        onClose={() => setActiveReminder(null)}
        onDispatch={(rec, channel) =>
          showToast(`Reminder dispatched to ${rec.tenant} via ${channel === "both" ? "Email & SMS" : channel.toUpperCase()}.`)
        }
      />

      <ArrearsNoticeModal
        record={activeNotice}
        isOpen={Boolean(activeNotice)}
        onClose={() => setActiveNotice(null)}
        onServeNotice={(rec) =>
          showToast(`Formal 14-day statutory arrears notice served to ${rec.tenant}.`)
        }
      />
    </div>
  );
};
