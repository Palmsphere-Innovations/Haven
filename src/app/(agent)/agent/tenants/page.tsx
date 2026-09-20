"use client"

import React, { useState, useMemo } from "react"
import { PortalShell } from "@/components/shared/portal-shell"
import { TenantsHeader } from "@/components/agent/tenants/tenants-header"
import { TenantsQuickStats } from "@/components/agent/tenants/tenants-quick-stats"
import { TenantsControls } from "@/components/agent/tenants/tenants-controls"
import { TenantsTable } from "@/components/agent/tenants/tenants-table"
import { TenantsGovernanceCard } from "@/components/agent/tenants/tenants-governance-card"
import { TenancyStageFilter,  } from "@/lib/mock/tenants"
import {TenantRecord} from "@/components/agent/tenants/tenants-table"

const TENANTS_DATA: TenantRecord[] = [
  {
    id: "t-1",
    name: "Oliver Davies",
    initials: "OD",
    email: "o.davies@kensington.co.uk",
    propertyTitle: "Flat 4B, 18 Kensington Gardens",
    landlord: "Vance Holdings Ltd",
    mandateTier: "Tier 1: Full Management",
    tenancyDates: "01 Dec 2023 – 30 Nov 2025",
    rentStatus: "Paid on Time",
    rentStatusType: "success",
    stageLabel: "Active Tenancy",
    stageType: "active",
  },
  {
    id: "t-2",
    name: "Marcus Chen",
    initials: "MC",
    email: "marcus.chen@outlook.co.uk",
    propertyTitle: "12 Richmond Hill Mansions, Unit 2",
    landlord: "Vance Holdings Ltd",
    mandateTier: "Tier 1: Full Management",
    tenancyDates: "15 Aug 2024 – 14 Aug 2025",
    rentStatus: "Paid on Time",
    rentStatusType: "success",
    stageLabel: "Active Tenancy",
    stageType: "active",
  },
  {
    id: "t-3",
    name: "Dr. Liam Thorne",
    initials: "LT",
    email: "l.thorne@imperial.ac.uk",
    isApplicant: true,
    propertyTitle: "Flat 4B, 18 Kensington Gardens",
    landlord: "Vance Holdings Ltd",
    mandateTier: "Tier 1: Full Management",
    tenancyDates: "Proposed: 01 Nov 2025 – 31 Oct 2026",
    rentStatus: "Pending AST",
    rentStatusType: "neutral",
    stageLabel: "Screening (Equifax)",
    stageType: "screening",
  },
  {
    id: "t-4",
    name: "Elena Rostova",
    initials: "ER",
    email: "e.rostova@blenheim.org",
    propertyTitle: "27 Blenheim Crescent, Unit 3",
    landlord: "Pembroke Estate Trust",
    mandateTier: "Tier 2: Maint + Comms",
    tenancyDates: "01 Nov 2023 – 31 Oct 2024",
    rentStatus: "Due in 2 Days",
    rentStatusType: "warning",
    stageLabel: "Active Tenancy",
    stageType: "active",
  },
  {
    id: "t-5",
    name: "Arthur Pendelton",
    initials: "AP",
    email: "a.pendelton@hollandpark.co.uk",
    propertyTitle: "44 Holland Park, Flat 2",
    landlord: "Vance Holdings Ltd",
    mandateTier: "Tier 1: Full Management",
    tenancyDates: "15 Oct 2023 – 14 Oct 2025",
    rentStatus: "Paid on Time",
    rentStatusType: "success",
    stageLabel: "Active Tenancy",
    stageType: "active",
  },
  {
    id: "t-6",
    name: "Lord Harrington (Tenancy)",
    initials: "LH",
    email: "harrington.estate@private.uk",
    propertyTitle: "14 Chester Square",
    landlord: "Cavendish Real Estate Ltd",
    mandateTier: "Tier 3: Maintenance Only",
    tenancyDates: "01 Jan 2024 – 31 Dec 2026",
    rentStatus: "Redacted • Tier 3",
    rentStatusType: "redacted",
    stageLabel: "Active Tenancy",
    stageType: "active",
    isFinancialRestricted: true,
  },
  {
    id: "t-7",
    name: "Sophia Al-Mansoor",
    initials: "SA",
    email: "s.almansoor@stjohnscourt.com",
    isApplicant: true,
    propertyTitle: "Unit 2A, St. John's Court",
    landlord: "Pembroke Estate Trust",
    mandateTier: "Tier 2: Maint + Comms",
    tenancyDates: "Proposed: 15 Nov 2025 – 14 Nov 2026",
    rentStatus: "Deposit Held",
    rentStatusType: "neutral",
    stageLabel: "Awaiting Signature",
    stageType: "signature",
  },
  {
    id: "t-8",
    name: "Callum O'Connor",
    initials: "CO",
    email: "c.oconnor@camdenmews.co.uk",
    propertyTitle: "8 Camden Mews",
    landlord: "Vance Holdings Ltd",
    mandateTier: "Tier 1: Full Management",
    tenancyDates: "01 Feb 2024 – 31 Jan 2026",
    rentStatus: "Paid on Time",
    rentStatusType: "success",
    stageLabel: "Active Tenancy",
    stageType: "active",
  },
]

export default function TenantsPage() {
  const [activeTab, setActiveTab] = useState<TenancyStageFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLandlord, setSelectedLandlord] = useState("all")
  const [selectedTier, setSelectedTier] = useState("all")

  const filteredTenants = useMemo(() => {
    return TENANTS_DATA.filter((row) => {
      // Stage tab filter
      if (activeTab === "active" && row.stageType !== "active") return false
      if (activeTab === "application" && !row.isApplicant) return false
      if (activeTab === "invited" && row.stageLabel !== "Awaiting Signature") return false
      if (activeTab === "former") return false // sample set contains active/applicants

      // Landlord Filter
      if (selectedLandlord !== "all" && row.landlord !== selectedLandlord) return false

      // Tier Filter
      if (selectedTier !== "all" && !row.mandateTier.includes(selectedTier)) return false

      // Search Query
      const q = searchQuery.toLowerCase().trim()
      if (q !== "") {
        const matchesName = row.name.toLowerCase().includes(q)
        const matchesEmail = row.email.toLowerCase().includes(q)
        const matchesProp = row.propertyTitle.toLowerCase().includes(q)
        if (!matchesName && !matchesEmail && !matchesProp) return false
      }

      return true
    })
  }, [activeTab, searchQuery, selectedLandlord, selectedTier])

  const counts = {
    all: 18,
    active: 14,
    application: 3,
    invited: 1,
    former: 6,
  }

  return (
     <div className=" min-h-screen py-8 px-4 sm:px-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <TenantsHeader
            onExportCsv={() => alert("Exporting Tenancy Ledger CSV...")}
            onOpenScreening={() => alert("Opening Equifax & Right-to-Rent Screening Drawer...")}
            onEnrollTenant={() => alert("Opening Direct Tenant Enrollment Modal...")}
          />

          <TenantsQuickStats />

          <TenantsControls
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedLandlord={selectedLandlord}
            onLandlordChange={setSelectedLandlord}
            selectedTier={selectedTier}
            onTierChange={setSelectedTier}
            counts={counts}
          />

          <TenantsTable
            tenants={filteredTenants}
            onViewTenant={(id) => alert(`Viewing tenancy details for ${id}`)}
            onViewDossier={(id) => alert(`Opening applicant dossier for ${id}`)}
          />

          <TenantsGovernanceCard />
        </div>
      </div>
  )
}