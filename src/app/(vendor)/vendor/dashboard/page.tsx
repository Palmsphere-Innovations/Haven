"use client"

import React, { useState } from "react"
// import { PortalShell } from "@/components/shared/portal-shell"
import { VendorHeader } from "@/components/vendor/dashboard/vendor-header"
import { VendorStatsRow } from "@/components/vendor/dashboard/vendor-stats-row"
import { IncomingRequestsGrid } from "@/components/vendor/dashboard/incoming-requests-grid"
import { ActiveJobsTable } from "@/components/vendor/dashboard/active-jobs-table"
import { InvoicesAndUtilitiesSplit } from "@/components/vendor/dashboard/invoices-and-utilities-split"
import {
  IncomingJobRequest,
  ActiveJob,
  VendorInvoice,
} from "@/components/vendor/dashboard/vendor-types"

const INITIAL_REQUESTS: IncomingJobRequest[] = [
  {
    id: "req-1",
    priority: "urgent",
    priorityLabel: "Urgent — Same Day",
    cappedPrice: "£185.00 Cap",
    propertyAddress: "Flat 4B, 18 Kensington Gardens, W2 4QH",
    title: "Radiator TRV valve replacement & heating loop pressure drop",
    tradeCategory: "Radiators & Central Heating",
    accessProtocol: "Key with concierge at Gatehouse (Marcus Bell). Concierge passcode:",
    accessCode: "#4812",
    dispatchedBy: "Eleanor Vance (Prime Heritage)",
    timeAgo: "25m ago",
  },
  {
    id: "req-2",
    priority: "routine",
    priorityLabel: "Routine — Within 48 hrs",
    cappedPrice: "£140.00 Fixed",
    propertyAddress: "Apt 12, 42 Belgrave Square, SW1X 8NT",
    title: "Annual Landlord Domestic Gas Safety Inspection (CP12)",
    tradeCategory: "Gas Compliance & Safety",
    accessProtocol: "Tenant working from home. Direct call required 30 mins prior to arrival at main portico.",
    dispatchedBy: "Alistair Vance (Vance Holdings)",
    timeAgo: "2h ago",
  },
  {
    id: "req-3",
    priority: "routine",
    priorityLabel: "Routine — Within 48 hrs",
    cappedPrice: "£260.00 Cap",
    propertyAddress: "7 Cheyne Walk, Chelsea, SW3 5HN",
    title: "Kitchen booster pump intermittent buzzing / low pressure",
    tradeCategory: "Water Supply & Pumps",
    accessProtocol: "Lockbox key safe code located to the left of service garden gate.",
    accessCode: "2940",
    dispatchedBy: "Prime Heritage Management",
    timeAgo: "4h ago",
  },
]

const INITIAL_JOBS: ActiveJob[] = [
  {
    id: "j-1",
    reference: "JOB-8841",
    property: "Flat 2A, 14 Holland Park",
    location: "Kensington & Chelsea, W11",
    scope: "Vaillant Boiler EcoTEC PCB fault replacement",
    poNumber: "PO-9940",
    scheduledTime: "Today, 14:00 - 16:00",
    isToday: true,
    status: "in_progress",
  },
  {
    id: "j-2",
    reference: "JOB-8839",
    property: "Flat 8, 30 Cadogan Square",
    location: "Knightsbridge, SW1X",
    scope: "Thermostatic shower mixer cartridge replacement",
    poNumber: "PO-9932",
    scheduledTime: "Tomorrow, 09:30",
    isToday: false,
    status: "awaiting_parts",
  },
  {
    id: "j-3",
    reference: "JOB-8820",
    property: "Townhouse 3, 9 Elgin Crescent",
    location: "Notting Hill, W11",
    scope: "EICR remedial spur bonding & fuseboard testing",
    poNumber: "PO-9915",
    scheduledTime: "Thu 17 Oct, 10:00",
    isToday: false,
    status: "scheduled",
  },
  {
    id: "j-4",
    reference: "JOB-8804",
    property: "18 Kensington Gardens, W2",
    location: "Basement Plant Room",
    scope: "Central plant manifold leak inspection",
    poNumber: "PO-9895",
    scheduledTime: "Fri 18 Oct, 08:30",
    isToday: false,
    status: "scheduled",
  },
]

const INITIAL_INVOICES: VendorInvoice[] = [
  {
    id: "inv-1",
    invoiceRef: "INV-2026-104",
    poRef: "9912",
    property: "Flat 2, 22 Pelham Crescent",
    date: "12 Oct 2026",
    amount: "£320.00",
    status: "paid",
  },
  {
    id: "inv-2",
    invoiceRef: "INV-2026-105",
    poRef: "9890",
    property: "Flat 15, 8 Camden Mews",
    date: "10 Oct 2026",
    amount: "£210.00",
    status: "submitted",
  },
  {
    id: "inv-3",
    invoiceRef: "INV-2026-098",
    poRef: "9744",
    property: "Flat 6, 19 Onslow Gardens",
    date: "28 Sep 2026",
    amount: "£890.00",
    status: "overdue",
  },
  {
    id: "inv-4",
    invoiceRef: "INV-2026-092",
    poRef: "9680",
    property: "Penthouse B, 45 Portland Place",
    date: "24 Sep 2026",
    amount: "£440.00",
    status: "paid",
  },
]

export default function VendorDashboardPage() {
  const [requests, setRequests] = useState<IncomingJobRequest[]>(INITIAL_REQUESTS)
  const [activeJobs, setActiveJobs] = useState<ActiveJob[]>(INITIAL_JOBS)
  const [invoices, setInvoices] = useState<VendorInvoice[]>(INITIAL_INVOICES)

  const handleAcceptJob = (id: string) => {
    const req = requests.find((r) => r.id === id)
    if (!req) return

    setRequests((prev) => prev.filter((r) => r.id !== id))

    const newJob: ActiveJob = {
      id: `j-${Date.now()}`,
      reference: `JOB-${Math.floor(8000 + Math.random() * 1000)}`,
      property: req.propertyAddress.split(",")[0],
      location: "Dispatched Location",
      scope: req.title,
      poNumber: `PO-${Math.floor(9000 + Math.random() * 1000)}`,
      scheduledTime: "Scheduled Today",
      isToday: true,
      status: "scheduled",
    }

    setActiveJobs((prev) => [newJob, ...prev])
  }

  const handleDeclineJob = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id))
  }

  const handleUpdateStatus = (id: string) => {
    alert(`Status update requested for Job #${id}`)
  }

  const handleRemindInvoice = (id: string) => {
    alert(`Remittance reminder sent to Haven Accounts for Invoice #${id}`)
  }

  return (
     <div className=" min-h-screen py-4 px-2 sm:px-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <VendorHeader
            onLogUnscheduledVisit={() => alert("Opening Unscheduled Visit Logging form...")}
            onSubmitNewInvoice={() => alert("Opening New Invoice Upload modal...")}
          />

          <VendorStatsRow />

          <IncomingRequestsGrid
            requests={requests}
            onAcceptJob={handleAcceptJob}
            onDeclineJob={handleDeclineJob}
          />

          <ActiveJobsTable
            jobs={activeJobs}
            onUpdateStatus={handleUpdateStatus}
          />

          <InvoicesAndUtilitiesSplit
            invoices={invoices}
            onRemindInvoice={handleRemindInvoice}
          />
        </div>
      </div>
  )
}