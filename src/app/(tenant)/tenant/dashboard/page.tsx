"use client"

import React from "react"
// import { PortalShell } from "@/components/shared/portal-shell"
import { TenantWelcomeHeader } from "@/components/tenant/dashboard/tenat-welcome-header"
import { TenantQuickStats } from "@/components/tenant/dashboard/tenats-quick-stats"
import { TenantPaymentsPanel } from "@/components/tenant/dashboard/tenant-payments-panel"
import { TenantMaintenancePanel } from "@/components/tenant/dashboard/tenant-maintenace-panel"
import { TenantDocumentsPanel } from "@/components/tenant/dashboard/tenant-documents-panel"
import { TenantContactCard } from "@/components/tenant/dashboard/tenant-contact-card"
import { TenantBuildingGuide } from "@/components/tenant/dashboard/tenat-building-guide"
import { Check } from "lucide-react"
import { RentPaymentRecord, MaintenanceTicket, TenancyDocument } from "@/lib/mock/tenants"

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
]

const TICKETS_DATA: MaintenanceTicket[] = [
  {
    id: "tkt-1",
    title: "En-suite Radiator Not Heating Evenly",
    category: "Heating & Radiators",
    status: "Visit Scheduled",
    loggedDate: "12 Oct 2024",
    contractor: "Apex Heating (Gas Safe #48291)",
    appointmentWindow: "Thu 17 Oct, 10:00 - 12:00 BST",
    reference: "#TKT-4921",
  },
  {
    id: "tkt-2",
    title: "Intercom Handset Replacement",
    category: "Security & Access",
    status: "Completed",
    loggedDate: "14 Aug 2024",
    contractor: "Kensington SecureComms",
    resolutionDate: "16 Aug 2024",
    reference: "#TKT-3108",
  },
]

const DOCUMENTS_DATA: TenancyDocument[] = [
  {
    id: "doc-1",
    title: "Tenancy Agreement (AST)",
    metadata: "Signed 28 Nov 2023 • PDF",
    type: "ast",
  },
  {
    id: "doc-2",
    title: "DPS Deposit Certificate",
    metadata: "£2,826.92 • Custodial",
    type: "deposit",
  },
  {
    id: "doc-3",
    title: "Check-in Inventory Report",
    metadata: "Condition photographic report",
    type: "inventory",
  },
  {
    id: "doc-4",
    title: "Gas Safety Certificate (CP12)",
    metadata: "Valid until Oct 2025",
    type: "gas",
  },
  {
    id: "doc-5",
    title: "Energy Performance (EPC)",
    metadata: "Rating: Grade C (74)",
    type: "epc",
  },
]

export default function TenantDashboardPage() {
  return (
     <div className=" min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <TenantWelcomeHeader
            onDownloadSummary={() => alert("Downloading Tenancy Summary PDF...")}
            onReportRepair={() => alert("Opening Repair Reporting Wizard...")}
          />

          <TenantQuickStats
            onPayRent={() => alert("Opening Direct Rent Payment Schedule...")}
            onContactAgent={() => alert("Opening Agent Direct Messaging...")}
          />

          {/* Two-Column Workspace Layout (65% / 35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN (65% -> 8 cols in 12-grid) */}
            <div className="lg:col-span-8 space-y-6">
              <TenantPaymentsPanel
                payments={PAYMENTS_DATA}
                onViewAllPayments={() => alert("Navigating to full payment ledger...")}
                onDownloadReceipt={(id) => alert(`Downloading payment receipt for ${id}...`)}
              />

              <TenantMaintenancePanel
                tickets={TICKETS_DATA}
                onSubmitNewRequest={() => alert("Opening New Maintenance Ticket Wizard...")}
                onViewTicketDetails={(id) => alert(`Viewing ticket details for ${id}...`)}
              />
            </div>

            {/* RIGHT COLUMN (35% -> 4 cols in 12-grid) */}
            <div className="lg:col-span-4 space-y-6">
              <TenantDocumentsPanel
                documents={DOCUMENTS_DATA}
                onViewDocument={(id) => alert(`Opening statutory document ${id}...`)}
                onViewAllDocuments={() => alert("Navigating to complete document vault...")}
              />

              <TenantContactCard
                onSendMessage={() => alert("Opening direct message modal for Eleanor Vance...")}
              />

              <TenantBuildingGuide />
            </div>
          </div>

          {/* Footer Assurance */}
          <footer className="pt-6 border-t border-stone-300/60 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-800" />
              <span>Tenancy protected under the Housing Act 1988 &amp; Tenant Fees Act 2019.</span>
            </div>
            <div>
              Deposit safely lodged with Deposit Protection Service (DPS Custodial).
            </div>
          </footer>
        </div>
      </div>
  )
}