"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PaymentsHeader } from "@/components/tenant/payments/payments-header";
import { PaymentsHeroGrid } from "@/components/tenant/payments/payments-hero-grid";
import { PaymentsScheduleForecast } from "@/components/tenant/payments/payments-schedule-forecast";
import { PaymentsHistoryTable } from "@/components/tenant/payments/payments-history-table";
import { PaymentsAgentAssistance } from "@/components/tenant/payments/payments-agent-assiatance";
import { PaymentsModal } from "@/components/tenant/payments/modal/payments-modal";
import { PaymentHistoryRecord, UpcomingPaymentSchedule } from "@/types/index";
import { DocumentViewerModal } from "@/components/tenant/documents/document-viewer-modal";
import { TenancyDocument } from "@/lib/mock/tenants";
import { CheckCircle2, X, Calendar, Landmark } from "lucide-react";

const UPCOMING_SCHEDULES: UpcomingPaymentSchedule[] = [
  {
    id: "s-1",
    month: "November 2024",
    amount: "£2,450.00",
    dueDate: "Fri, 01 Nov 2024",
    reference: "NOV24-4B",
    status: "Autopay Active",
  },
  {
    id: "s-2",
    month: "December 2024",
    amount: "£2,450.00",
    dueDate: "Sun, 01 Dec 2024",
    reference: "DEC24-4B",
    status: "Scheduled",
  },
  {
    id: "s-3",
    month: "January 2025",
    amount: "£2,450.00",
    dueDate: "Wed, 01 Jan 2025",
    reference: "JAN25-4B",
    status: "Scheduled",
  },
];

const HISTORY_RECORDS: PaymentHistoryRecord[] = [
  {
    id: "h-1",
    period: "October 2024 Rent",
    dateRange: "01 Oct – 31 Oct 2024",
    paidOn: "01 Oct 2024",
    method: "Bacs Direct Debit",
    transactionRef: "TXN-8812",
    amount: "£2,450.00",
    status: "Paid on Time",
    year: "2024",
  },
  {
    id: "h-2",
    period: "September 2024 Rent",
    dateRange: "01 Sep – 30 Sep 2024",
    paidOn: "01 Sep 2024",
    method: "Bacs Direct Debit",
    transactionRef: "TXN-7402",
    amount: "£2,450.00",
    status: "Paid on Time",
    year: "2024",
  },
  {
    id: "h-3",
    period: "August 2024 Rent",
    dateRange: "01 Aug – 31 Aug 2024",
    paidOn: "01 Aug 2024",
    method: "Bacs Direct Debit",
    transactionRef: "TXN-6194",
    amount: "£2,450.00",
    status: "Paid on Time",
    year: "2024",
  },
  {
    id: "h-4",
    period: "July 2024 Rent",
    dateRange: "01 Jul – 31 Jul 2024",
    paidOn: "01 Jul 2024",
    method: "Bacs Direct Debit",
    transactionRef: "TXN-4920",
    amount: "£2,450.00",
    status: "Paid on Time",
    year: "2024",
  },
  {
    id: "h-5",
    period: "June 2024 Rent",
    dateRange: "01 Jun – 30 Jun 2024",
    paidOn: "02 Jun 2024",
    method: "Bacs Direct Debit",
    transactionRef: "TXN-3811",
    amount: "£2,450.00",
    status: "Paid on Time",
    year: "2024",
  },
  {
    id: "h-6",
    period: "May 2024 Rent",
    dateRange: "01 May – 31 May 2024",
    paidOn: "01 May 2024",
    method: "Bacs Direct Debit",
    transactionRef: "TXN-2704",
    amount: "£2,450.00",
    status: "Paid on Time",
    year: "2024",
  },
  {
    id: "h-7",
    period: "April 2024 Rent",
    dateRange: "01 Apr – 30 Apr 2024",
    paidOn: "01 Apr 2024",
    method: "Bacs Direct Debit",
    transactionRef: "TXN-1598",
    amount: "£2,450.00",
    status: "Paid on Time",
    year: "2024",
  },
  {
    id: "h-8",
    period: "December 2023 Rent",
    dateRange: "01 Dec – 31 Dec 2023",
    paidOn: "01 Dec 2023",
    method: "Bacs Direct Debit",
    transactionRef: "TXN-0891",
    amount: "£2,450.00",
    status: "Paid on Time",
    year: "2023",
  },
];

export default function TenantRentAndPaymentsPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdjustDateOpen, setIsAdjustDateOpen] = useState(false);
  const [isUpdateMandateOpen, setIsUpdateMandateOpen] = useState(false);
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<TenancyDocument | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [preferredDay, setPreferredDay] = useState("5th");
  const [mandateAccount, setMandateAccount] = useState("•••• 4321");
  const [mandateSortCode, setMandateSortCode] = useState("20-45-77");

  const filteredHistory = useMemo(() => {
    return HISTORY_RECORDS.filter((row) => {
      if (selectedYear !== "all" && row.year !== selectedYear) return false;
      const q = searchQuery.toLowerCase().trim();
      if (q !== "") {
        const matchesPeriod = row.period.toLowerCase().includes(q);
        const matchesRef = row.transactionRef.toLowerCase().includes(q);
        if (!matchesPeriod && !matchesRef) return false;
      }
      return true;
    });
  }, [searchQuery, selectedYear]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleDownloadSchedule = () => {
    const content = `HAVEN PROPERTY MANAGEMENT - OFFICIAL AST RENT SCHEDULE
============================================================
Property: Flat 4B, 18 Kensington Gardens, London W2 4QH
Tenant: Oliver Davies & Clara Finch
Managing Agent: Eleanor Vance (Prime Heritage Management)
Tenancy Term: 01 Dec 2023 to 30 Nov 2025
Monthly Amount: £2,450.00 | Collection Day: 1st of every calendar month
Payment Mechanism: BACS Automated Direct Debit (#HA-9941)

SCHEDULED INSTALMENTS:
- 01 Nov 2024: £2,450.00 [Scheduled / Active Autopay]
- 01 Dec 2024: £2,450.00 [Scheduled]
- 01 Jan 2025: £2,450.00 [Scheduled]
- 01 Feb 2025: £2,450.00 [Scheduled]
- 01 Mar 2025: £2,450.00 [Scheduled]
- 01 Apr 2025: £2,450.00 [Scheduled]
============================================================
Registered with Bacs Payment Schemes Limited.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AST-Rent-Schedule-Flat4B.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification("Official AST Payment Schedule downloaded.");
  };

  const handleDownloadStatement = () => {
    const content = `HAVEN ANNUAL TENANCY FINANCIAL STATEMENT
============================================================
Statement Year: 2024
Premises: Flat 4B, 18 Kensington Gardens, London W2 4QH
Tenant Name: Oliver Davies
Total Rent Invoiced: £24,500.00
Total Rent Cleared: £24,500.00
Outstanding Arrears: £0.00 (Account in Good Standing)
Deposit Held: £2,826.92 in DPS Custodial (#DPS-481928)
============================================================
Certified by Haven Client Money Protection Protocol.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Haven-Annual-Statement-2024.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification("Annual Financial Statement (2024) downloaded.");
  };

  const handleExportZip = () => {
    const content = `HAVEN COMPLETE PAYMENT RECEIPTS BUNDLE
Exported: ${new Date().toISOString()}
Records Included: ${filteredHistory.length} receipts
All transactions reconciled under UK Bacs Direct Debit Guarantee.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Haven-Rent-Receipts-Archive.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification("Complete receipts archive downloaded.");
  };

  const handleDownloadSingleReceipt = (period: string, ref: string) => {
    const content = `HAVEN STATUTORY RENT RECEIPT
============================================================
Payment Period: ${period}
Transaction Reference: #${ref}
Payer: Oliver Davies
Amount Cleared: £2,450.00
Method: Bacs Direct Debit (Barclays Bank UK)
Recipient: Haven Estate Client Account
Payment Date: 01 of designated period
============================================================
Authentic electronic proof of rent payment.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Receipt-${period.replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification(`Receipt for ${period} downloaded.`);
  };

  const handleModalConfirm = (option: string) => {
    setIsModalOpen(false);
    showNotification(
      `Autopay instruction updated: ${option === "early" ? "Paid Early via Open Banking" : "BACS Autopay confirmed active for 01 Nov 2024"}.`
    );
  };

  const handleSaveDateAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdjustDateOpen(false);
    showNotification(`Payment date adjustment request (${preferredDay} of month) submitted to Eleanor Vance.`);
  };

  const handleSaveMandate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdateMandateOpen(false);
    showNotification("Direct Debit bank mandate updated successfully under Direct Debit Guarantee.");
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Floating Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#132A20] text-white px-5 py-3.5 rounded-2xl shadow-xl animate-in slide-in-from-bottom-5 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-2 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <PaymentsHeader
          onDownloadSchedule={handleDownloadSchedule}
          onDownloadStatement={handleDownloadStatement}
        />

        <PaymentsHeroGrid
          onOpenManageModal={() => setIsModalOpen(true)}
          onAdjustDate={() => setIsAdjustDateOpen(true)}
          onUpdateMandate={() => setIsUpdateMandateOpen(true)}
          onViewDepositCert={() =>
            setSelectedDocForPreview({
              id: "doc-2",
              title: "Deposit Protection Certificate & Prescribed Information",
              metadata: "£2,826.92 • Custodial Protection Scheme",
              type: "deposit",
              referenceNumber: "#DPS-481928",
              dateAdded: "01 Dec 2023",
              fileSize: "680 KB",
              status: "DPS Verified",
            })
          }
        />

        <PaymentsScheduleForecast schedules={UPCOMING_SCHEDULES} />

        <PaymentsHistoryTable
          payments={filteredHistory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          onExportZip={handleExportZip}
          onDownloadReceipt={handleDownloadSingleReceipt}
        />

        <PaymentsAgentAssistance
          onContactAgent={() => router.push("/tenant/contact")}
          onOpenDoc={(docName) =>
            setSelectedDocForPreview({
              id: "doc-ast",
              title: docName,
              metadata: "Statutory Tenancy Agreement Term Document",
              type: "ast",
              referenceNumber: "#AST-2023-4B",
              dateAdded: "28 Nov 2023",
              fileSize: "3.2 MB",
              status: "Legally Binding",
            })
          }
        />

        {/* Autopay / Pay Early Modal */}
        <PaymentsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleModalConfirm}
        />

        {/* Adjust Payment Date Dialog */}
        {isAdjustDateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-800" />
                  <h3 className="text-base font-bold text-stone-900">
                    Adjust Monthly Collection Date
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAdjustDateOpen(false)}
                  className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveDateAdjustment} className="space-y-4 pt-4">
                <p className="text-xs text-stone-600 leading-relaxed">
                  Your current rent is collected on the <strong>1st of every month</strong>. You may
                  request alignment with your employment salary pay day:
                </p>

                <div className="space-y-2">
                  {["1st of month (Standard)", "5th of month", "10th of month", "Last working day"].map(
                    (opt) => (
                      <label
                        key={opt}
                        className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer text-xs font-semibold ${
                          preferredDay === opt
                            ? "bg-[#E8EFEA] border-[#2A5240]/40 text-[#132A20]"
                            : "bg-stone-50 border-stone-200 text-stone-700"
                        }`}
                      >
                        <span>{opt}</span>
                        <input
                          type="radio"
                          name="day"
                          checked={preferredDay === opt}
                          onChange={() => setPreferredDay(opt)}
                          className="accent-[#132A20]"
                        />
                      </label>
                    )
                  )}
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
                  Note: A pro-rata adjustment invoice may apply to the transitional billing cycle.
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdjustDateOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Submit Adjustment Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Bank Mandate Dialog */}
        {isUpdateMandateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-emerald-800" />
                  <h3 className="text-base font-bold text-stone-900">
                    Update Direct Debit Bank Details
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUpdateMandateOpen(false)}
                  className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveMandate} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Oliver Davies"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Sort Code
                    </label>
                    <input
                      type="text"
                      value={mandateSortCode}
                      onChange={(e) => setMandateSortCode(e.target.value)}
                      placeholder="20-45-77"
                      className="w-full px-3 py-2 text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={mandateAccount}
                      onChange={(e) => setMandateAccount(e.target.value)}
                      placeholder="•••• 4321"
                      className="w-full px-3 py-2 text-xs font-mono bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-[11px] text-stone-600 leading-relaxed">
                  Your new bank details will be validated via the UK Modulus Bank Checker and enrolled into the BACS Direct Debit Guarantee.
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsUpdateMandateOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Save &amp; Authorise Mandate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Document Viewer Modal for Deposit Certificate or Guarantee Docs */}
        <DocumentViewerModal
          document={selectedDocForPreview}
          isOpen={Boolean(selectedDocForPreview)}
          onClose={() => setSelectedDocForPreview(null)}
        />
      </div>
    </div>
  );
}