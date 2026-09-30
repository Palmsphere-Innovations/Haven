"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TenantWelcomeHeader } from "@/components/tenant/dashboard/tenat-welcome-header";
import { TenantQuickStats } from "@/components/tenant/dashboard/tenats-quick-stats";
import { TenantPaymentsPanel } from "@/components/tenant/dashboard/tenant-payments-panel";
import { TenantMaintenancePanel } from "@/components/tenant/dashboard/tenant-maintenace-panel";
import { TenantDocumentsPanel } from "@/components/tenant/dashboard/tenant-documents-panel";
import { TenantContactCard } from "@/components/tenant/dashboard/tenant-contact-card";
import { TenantBuildingGuide } from "@/components/tenant/dashboard/tenat-building-guide";
import { Check, CheckCircle2, Download, X } from "lucide-react";
import {
  RentPaymentRecord,
  MaintenanceTicket,
  TenancyDocument,
  INITIAL_TENANT_TICKETS,
  INITIAL_TENANCY_DOCS,
} from "@/lib/mock/tenants";
import { TicketDetailModal } from "@/components/tenant/maintenance/ticket-detail-modal";
import { DocumentViewerModal } from "@/components/tenant/documents/document-viewer-modal";

const PAYMENTS_DATA: RentPaymentRecord[] = [
  {
    id: "p-1",
    period: "October 2024 Rent",
    status: "Paid on Time",
    date: "01 Oct 2024",
    directDebitRef: "#TXN-8812",
    amount: "£2,450.00",
  },
  {
    id: "p-2",
    period: "September 2024 Rent",
    status: "Paid on Time",
    date: "01 Sep 2024",
    directDebitRef: "#TXN-7402",
    amount: "£2,450.00",
  },
  {
    id: "p-3",
    period: "August 2024 Rent",
    status: "Paid on Time",
    date: "01 Aug 2024",
    directDebitRef: "#TXN-6194",
    amount: "£2,450.00",
  },
];

export default function TenantDashboardPage() {
  const router = useRouter();

  // Selected items for modal view
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<TenancyDocument | null>(null);
  const [summaryDownloaded, setSummaryDownloaded] = useState(false);
  const [receiptToast, setReceiptToast] = useState<string | null>(null);

  const handleDownloadSummary = () => {
    // Generate tenancy summary text blob
    const content = `HAVEN PROPERTY MANAGEMENT - TENANCY SUMMARY
==================================================
Demised Property: Flat 4B, 18 Kensington Gardens, London W2 4QH
Tenant: Oliver Davies & Clara Finch
Managing Agent: Eleanor Vance (Prime Heritage Management)
Landlord: Alistair Vance (Vance Holdings Ltd)
Term: 24 Months (01 Dec 2023 – 30 Nov 2025)
Monthly Rent: £2,450.00 (Due 1st of every month)
Deposit Held: £2,826.92 in DPS Custodial Protection (#DPS-481928)
Council Tax Band: Band F (Royal Borough of Kensington & Chelsea)
==================================================
Generated on ${new Date().toLocaleDateString("en-GB")}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Haven-Tenancy-Summary-Flat4B.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setSummaryDownloaded(true);
    setTimeout(() => setSummaryDownloaded(false), 4000);
  };

  const handleDownloadReceipt = (id: string) => {
    const payment = PAYMENTS_DATA.find((p) => p.id === id) || PAYMENTS_DATA[0];
    const content = `HAVEN RENT RECEIPT - OFFICIAL ACKNOWLEDGEMENT
==================================================
Receipt Ref: ${payment.directDebitRef}
Period: ${payment.period}
Payment Date: ${payment.date}
Amount Received: ${payment.amount}
Method: BACS Direct Debit (#HA-9941)
Status: ${payment.status}
Property: Flat 4B, 18 Kensington Gardens, W2 4QH
Tenant: Oliver Davies
==================================================
Payment cleared and reconciled into client account.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rent-Receipt-${payment.period.replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setReceiptToast(`Official rent receipt downloaded for ${payment.period}.`);
    setTimeout(() => setReceiptToast(null), 4000);
  };

  const handleViewTicket = (id: string) => {
    const ticket = INITIAL_TENANT_TICKETS.find((t) => t.id === id) || INITIAL_TENANT_TICKETS[0];
    setSelectedTicket(ticket);
  };

  const handleViewDocument = (id: string) => {
    const doc = INITIAL_TENANCY_DOCS.find((d) => d.id === id) || INITIAL_TENANCY_DOCS[0];
    setSelectedDocument(doc);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Toast Feedbacks */}
        {summaryDownloaded && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#132A20] text-white px-5 py-3.5 rounded-2xl shadow-xl animate-in slide-in-from-bottom-5 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">
              Tenancy Summary dossier downloaded successfully.
            </span>
            <button
              type="button"
              onClick={() => setSummaryDownloaded(false)}
              className="ml-2 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {receiptToast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#132A20] text-white px-5 py-3.5 rounded-2xl shadow-xl animate-in slide-in-from-bottom-5 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">{receiptToast}</span>
            <button
              type="button"
              onClick={() => setReceiptToast(null)}
              className="ml-2 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <TenantWelcomeHeader
          onDownloadSummary={handleDownloadSummary}
          onReportRepair={() => router.push("/tenant/maintenance?action=new")}
        />

        <TenantQuickStats
          onPayRent={() => router.push("/tenant/payments")}
          onContactAgent={() => router.push("/tenant/contact")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <TenantPaymentsPanel
              payments={PAYMENTS_DATA}
              onViewAllPayments={() => router.push("/tenant/payments")}
              onDownloadReceipt={handleDownloadReceipt}
            />
            <TenantMaintenancePanel
              tickets={INITIAL_TENANT_TICKETS}
              onSubmitNewRequest={() => router.push("/tenant/maintenance?action=new")}
              onViewTicketDetails={handleViewTicket}
            />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <TenantDocumentsPanel
              documents={INITIAL_TENANCY_DOCS}
              onViewDocument={handleViewDocument}
              onViewAllDocuments={() => router.push("/tenant/documents")}
            />
            <TenantContactCard
              onSendMessage={() => router.push("/tenant/contact")}
            />
            <TenantBuildingGuide />
          </div>
        </div>

        <footer className="pt-6 border-t border-stone-300/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-800" />
            <span>Tenancy protected under the Housing Act 1988 &amp; Tenant Fees Act 2019.</span>
          </div>
          <div>Deposit safely lodged with Deposit Protection Service (DPS Custodial).</div>
        </footer>
      </div>

      {/* Ticket Details Modal */}
      <TicketDetailModal
        ticket={selectedTicket}
        isOpen={Boolean(selectedTicket)}
        onClose={() => setSelectedTicket(null)}
      />

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={selectedDocument}
        isOpen={Boolean(selectedDocument)}
        onClose={() => setSelectedDocument(null)}
      />
    </div>
  );
}