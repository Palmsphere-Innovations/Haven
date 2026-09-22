"use client"

import React, { useState, useMemo } from "react"
// import { PortalShell } from "@/components/shared/portal-shell"
import { PaymentsHeader } from "@/components/tenant/payments/payments-header"
import { PaymentsHeroGrid } from "@/components/tenant/payments/payments-hero-grid"
import { PaymentsScheduleForecast } from "@/components/tenant/payments/payments-schedule-forecast"
import { PaymentsHistoryTable } from "@/components/tenant/payments/payments-history-table"
import { PaymentsAgentAssistance } from "@/components/tenant/payments/payments-agent-assiatance"
import { PaymentsModal } from "@/components/tenant/payments/modal/payments-modal"
import { PaymentHistoryRecord, UpcomingPaymentSchedule } from "@/types/index"

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
]

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
]

export default function TenantRentAndPaymentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState("2024")

  const filteredHistory = useMemo(() => {
    return HISTORY_RECORDS.filter((row) => {
      // Year Filter
      if (selectedYear !== "all" && row.year !== selectedYear) return false

      // Search Query
      const q = searchQuery.toLowerCase().trim()
      if (q !== "") {
        const matchesPeriod = row.period.toLowerCase().includes(q)
        const matchesRef = row.transactionRef.toLowerCase().includes(q)
        if (!matchesPeriod && !matchesRef) return false
      }

      return true
    })
  }, [searchQuery, selectedYear])

  const handleModalConfirm = (option: string) => {
    setIsModalOpen(false)
    alert(`Payment instruction confirmed (${option}). BACS mandate updated.`)
  }

  return (
   <div className=" min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-[1600px] mx-auto">
          <PaymentsHeader
            onDownloadSchedule={() => alert("Downloading official AST Payment Schedule PDF...")}
            onDownloadStatement={() => alert("Preparing Annual Tenancy Statement...")}
          />

          <PaymentsHeroGrid
            onOpenManageModal={() => setIsModalOpen(true)}
            onAdjustDate={() => alert("Opening payment adjustment request dialog...")}
            onUpdateMandate={() => alert("Opening secure BACS mandate update...")}
            onViewDepositCert={() => alert("Downloading DPS Custodial Certificate #DPS-481928...")}
          />

          <PaymentsScheduleForecast schedules={UPCOMING_SCHEDULES} />

          <PaymentsHistoryTable
            payments={filteredHistory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            onExportZip={() => alert("Bundling receipts for ZIP download...")}
            onDownloadReceipt={(period, ref) =>
              alert(`Generating statutory receipt for ${period} (Ref: ${ref})...`)
            }
          />

          <PaymentsAgentAssistance
            onContactAgent={() => alert("Opening agent direct messaging...")}
            onOpenDoc={(docName) => alert(`Opening ${docName}...`)}
          />

          <PaymentsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleModalConfirm}
          />
        </div>
      </div>
  )
}