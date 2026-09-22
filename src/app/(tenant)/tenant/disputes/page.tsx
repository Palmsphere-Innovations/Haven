"use client"

import React, { useState, useMemo } from "react"
// import { PortalShell } from "@/components/shared/portal-shell"
import { DisputeHeader } from "@/components/tenant/disputes/dispute-header"
import { DisputeMetricsRow } from "@/components/tenant/disputes/dispute-metrics-row"
import { DisputeLedgerTable } from "@/components/tenant/disputes/dispute-ledger-table"
import { DisputeDetailWorkspace } from "@/components/tenant/disputes/dispute-detail-workspace"
import { DisputeAdvisorySidebar } from "@/components/tenant/disputes/dispute-advisory-sidebar"
import { RaiseDisputeModal } from "@/components/tenant/disputes/modal/raise-dispute-modal"
import { DisputeRecord, DisputeChatMessage } from "@/types/index"

const INITIAL_DISPUTES: DisputeRecord[] = [
  {
    id: "dsp-1",
    reference: "DSP-2024-0982",
    category: "maintenance",
    categoryLabel: "Maintenance",
    title: "En-suite Radiator Remediation & Heating Interruption Credit",
    status: "under_review",
    statusLabel: "Under Review",
    openedDate: "04 Oct 2024 (10 days ago)",
    remedy: "Rent deduction / operational credit of £185.00.",
    isSelected: true,
  },
  {
    id: "dsp-2",
    reference: "DSP-2023-0411",
    category: "deposit",
    categoryLabel: "Deposit",
    title: "Check-in Inventory Discrepancy — Living Room Parquet Scuff",
    status: "resolved",
    statusLabel: "Resolved",
    openedDate: "12 Dec 2023",
    remedy: "N/A",
    outcome: "Mutually agreed notation added to inventory docket without deduction.",
    settledTime: "48 hrs",
    isSelected: false,
  },
  {
    id: "dsp-3",
    reference: "DSP-2024-0750",
    category: "rent",
    categoryLabel: "Rent",
    title: "Communal Service Charge Calculation Clarification",
    status: "resolved",
    statusLabel: "Resolved",
    openedDate: "18 Aug 2024",
    remedy: "N/A",
    outcome: "Direct breakdown provided by Eleanor Vance; adjusted in August invoice.",
    settledTime: "4 days",
    isSelected: false,
  },
]

const INITIAL_CHAT_MESSAGES: DisputeChatMessage[] = [
  {
    id: "m-1",
    sender: "agent",
    senderName: "Eleanor Vance (Letting Agent)",
    senderInitials: "EV",
    timestamp: "08 Oct • 15:42",
    text: "Good afternoon Oliver. I have reviewed your submission regarding the radiator failure. Apex Heating confirmed the faulty TRV has now been replaced. We are currently discussing the £185 concession with Alistair Vance to credit against November's rental run.",
  },
  {
    id: "m-2",
    sender: "tenant",
    senderName: "Oliver Davies (Tenant)",
    senderInitials: "OD",
    timestamp: "08 Oct • 16:05",
    text: "Thanks Eleanor, appreciate the update. Please let me know once Vance Holdings signs off so we can adjust the upcoming November Direct Debit mandate.",
  },
]

export default function TenantDisputesPage() {
  const [disputes, setDisputes] = useState<DisputeRecord[]>(INITIAL_DISPUTES)
  const [selectedTab, setSelectedTab] = useState("all")
  const [showToast, setShowToast] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<DisputeChatMessage[]>(INITIAL_CHAT_MESSAGES)

  const filteredDisputes = useMemo(() => {
    if (selectedTab === "all") return disputes
    return disputes.filter((d) => d.status === selectedTab)
  }, [disputes, selectedTab])

  const handleSelectDispute = (id: string) => {
    setDisputes((prev) =>
      prev.map((d) => ({
        ...d,
        isSelected: d.id === id,
      }))
    )
  }

  const handleSendMessage = (text: string) => {
    const newMsg: DisputeChatMessage = {
      id: `m-${Date.now()}`,
      sender: "tenant",
      senderName: "Oliver Davies (Tenant)",
      senderInitials: "OD",
      timestamp: "Just now",
      text,
    }
    setChatMessages((prev) => [...prev, newMsg])
  }

  const handleRaiseDisputeSubmit = (formData: any) => {
    setIsModalOpen(false)
    alert(`Dispute "${formData.title}" submitted successfully under statutory ADR rules.`)
  }

  return (
     <div className=" min-h-screen py-4 px-2 sm:px-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <DisputeHeader
            onDownloadRecord={() => setShowToast(true)}
            onRaiseDispute={() => setIsModalOpen(true)}
            showToast={showToast}
            onDismissToast={() => setShowToast(false)}
          />

          <DisputeMetricsRow />

          <DisputeLedgerTable
            disputes={filteredDisputes}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
            onSelectDispute={handleSelectDispute}
          />

          {/* Active Dispute Detail Workspace & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <DisputeDetailWorkspace
                chatMessages={chatMessages}
                onSendMessage={handleSendMessage}
              />
            </div>

            <div className="lg:col-span-4">
              <DisputeAdvisorySidebar
                onReadRightsGuide={() =>
                  alert("Opening Tenant Rights & Housing Act 1985 Guide...")
                }
                onScheduleCall={() =>
                  alert("Opening 15-minute Mediation Scheduling calendar...")
                }
              />
            </div>
          </div>

          <RaiseDisputeModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleRaiseDisputeSubmit}
          />
        </div>
      </div>
  )
}