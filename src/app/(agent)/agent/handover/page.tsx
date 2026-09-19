"use client"

import React, { useState } from "react"
import { PortalShell } from "@/components/shared/portal-shell"
import { HandoversHeader } from "@/components/agent/handovers/handovers-header"
import { HandoversMetricsGrid } from "@/components/agent/handovers/handovers-metrics-grid"
import { HandoversTabNav } from "@/components/agent/handovers/handovers-tab-nav"
import { HandoversIncomingCard } from "@/components/agent/handovers/handovers-incoming-card"
import { HandoversOutgoingTable } from "@/components/agent/handovers/handovers-outgoing-table"
import { HandoversHistoryTable } from "@/components/agent/handovers/handovers-history-table"
import { HandoversStatutoryChecklist } from "@/components/agent/handovers/handovers-statutory-checklist"
import { HandoversInitiateDrawer } from "@/components/agent/handovers/handovers-initiate-drawer"
import { HandoversFooter } from "@/components/agent/handovers/handovers-footer"
import { CheckCircle2 } from "lucide-react"
import {
  HandoverTab,
  IncomingHandover,
  OutgoingHandover,
  HistoryHandover,
} from "@/lib/mock/handovers-types"

const SAMPLE_INCOMING: IncomingHandover[] = [
  {
    id: "inc-1",
    reference: "HND-2025-0104",
    propertyAddress: "Flat 4B, 18 Kensington Gardens, London W2 4QH",
    landlord: "Vance Holdings Ltd",
    landlordName: "Alistair Vance",
    outgoingAgent: "Belgrave Property Management",
    outgoingAgentCode: "Julian Thorne, MARLA #4820",
    targetHandoverDate: "01 Nov 2025",
    daysRemaining: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    scopeTier: "Tier 1 • Full Management",
    scopeDescription:
      "Includes maintenance authorisation up to £250 cap, direct tenant communication, rent ledger collection, and statutory deposit re-registration.",
    tenancyStatus: "Occupied",
    tenantName: "Oliver Davies",
    rentPcm: 2450,
    astExpiry: "Oct 2026",
    dpsId: "#DPS-481928",
    keysCount: "4 Keys, 2 Fobs",
    cp12Status: "Valid",
    eicrStatus: "Valid (2027)",
    epcRating: "Rating C",
  },
  {
    id: "inc-2",
    reference: "HND-2025-0109",
    propertyAddress: "Unit 2A, St. John's Court, London SW4 7TE",
    landlord: "Pembroke Estate Trust",
    landlordName: "Lord Arthur Pembroke",
    outgoingAgent: "Apex Residential London",
    outgoingAgentCode: "Siobhan Campbell, ARLA #7231",
    targetHandoverDate: "15 Nov 2025",
    daysRemaining: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    scopeTier: "Tier 2 • Maintenance + Comms",
    scopeDescription:
      "Rent ledger redacted from agent view; emergency repairs coordination, contractor dispatch, and tenant messaging protocol only.",
    tenancyStatus: "Under Notice",
    tenantName: "Tenancy Concluding",
    rentPcm: 1950,
    astExpiry: "30 Nov 2025",
    dpsId: "Audit in progress",
    keysCount: "2 Key Sets",
    cp12Status: "Due Jan 2026",
    eicrStatus: "Valid",
    epcRating: "Rating B",
  },
]

const SAMPLE_OUTGOING: OutgoingHandover[] = [
  {
    id: "out-1",
    reference: "OUT-2025-004",
    propertyAddress: "8 Camden Mews, London NW1 9UX",
    landlord: "Vance Holdings Ltd",
    incomingAgent: "Eleanor Pembroke",
    incomingAgentCode: "Pembroke & Partners (ARLA #8819)",
    scopeTier: "Tier 1 • Full Management",
    status: "Pending Acceptance",
    initiatedDate: "24 Oct 2025",
  },
]

const SAMPLE_HISTORY: HistoryHandover[] = [
  {
    id: "hist-1",
    auditId: "#HAV-HO-2024-95",
    propertyAddress: "Flat 2, 8 Camden Mews",
    outgoingParty: "Kensington Lettings Ltd",
    incomingParty: "Eleanor Vance (MARLA 1)",
    scopeTier: "Full Management",
    status: "Completed",
    completedDate: "10 Nov 2024",
  },
  {
    id: "hist-2",
    auditId: "#HAV-HO-2024-42",
    propertyAddress: "12 Richmond Hill Mansions",
    outgoingParty: "Belgrave Care Property",
    incomingParty: "Eleanor Vance (MARLA 1)",
    scopeTier: "Maint + Comms",
    status: "Completed",
    completedDate: "01 Jun 2024",
  },
]

export default function HandoversPage() {
  const [activeTab, setActiveTab] = useState<HandoverTab>("incoming")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPortfolio, setSelectedPortfolio] = useState("ALL")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const handleAccept = (id: string, name: string) => {
    alert(`Handover for ${name} accepted. Mandate added to live register.`)
  }

  const handleDecline = (id: string, name: string) => {
    const reason = prompt(`Please specify reason for declining ${name}:`)
    if (reason) {
      alert(`Handover declined. Notice dispatched.`)
    }
  }

  const handleDrawerSubmit = (data: Record<string, unknown>) => {
    setIsDrawerOpen(false)
    setActiveTab("outgoing")
    alert(
      `Handover request for ${data.selectedProp} successfully logged under reference #AGT-HND-4092.`,
    )
  }

  return (
    <PortalShell role="agent">
      <div className="bg-[#EDEBE6] min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <HandoversHeader
            onOpenInitiateDrawer={() => setIsDrawerOpen(true)}
            onDownloadDossier={() => setShowToast(true)}
          />

          {/* Dossier Download Notification */}
          {showToast && (
            <div className="p-4 bg-white rounded-xl shadow-md border border-stone-200 flex items-center justify-between text-xs text-[#132A20]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>
                  Portfolio Audit Pack compiled:{" "}
                  <strong className="font-semibold">Haven_Audit_Pack_Oct2024_HND.pdf</strong> (14.2 MB) ready.
                </span>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="underline text-stone-500 hover:text-[#132A20]"
              >
                Dismiss
              </button>
            </div>
          )}

          <HandoversMetricsGrid />

          <HandoversTabNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedPortfolio={selectedPortfolio}
            onPortfolioChange={setSelectedPortfolio}
          />

          {/* Tab Content 1: Incoming */}
          {activeTab === "incoming" && (
            <div className="space-y-4">
              {SAMPLE_INCOMING.map((item) => (
                <HandoversIncomingCard
                  key={item.id}
                  item={item}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              ))}
            </div>
          )}

          {/* Tab Content 2: Outgoing */}
          {activeTab === "outgoing" && (
            <HandoversOutgoingTable
              data={SAMPLE_OUTGOING}
              onCancelRequest={(id) => alert(`Cancelled request ${id}`)}
              onOpenNewDrawer={() => setIsDrawerOpen(true)}
            />
          )}

          {/* Tab Content 3: History */}
          {activeTab === "history" && <HandoversHistoryTable data={SAMPLE_HISTORY} />}

          <HandoversStatutoryChecklist />
          <HandoversFooter />

          {/* Initiate Drawer */}
          <HandoversInitiateDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onSubmit={handleDrawerSubmit}
          />
        </div>
      </div>
    </PortalShell>
  )
}