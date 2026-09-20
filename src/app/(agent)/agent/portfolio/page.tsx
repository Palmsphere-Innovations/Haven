"use client"

import React, { useState, useMemo } from "react"
import { PortalShell } from "@/components/shared/portal-shell"
import { PortfolioHeader } from "@/components/agent/portfolio/portfolio-header"
import { PortfolioMetricsGrid } from "@/components/agent/portfolio/portfolio-metrics-grid"
import { PortfolioControls } from "@/components/agent/portfolio/portfolio-controls"
import { PortfolioTable } from "@/components/agent/portfolio/portfolio-table"
import { PortfolioMandateFramework } from "@/components/agent/portfolio/potfolio-mandate-framework"
import {
  PortfolioStatusFilter,
  PortfolioProperty,
} from "@/lib/mock/portfolio"

const PORTFOLIO_DATA: PortfolioProperty[] = [
  {
    id: "prop-1",
    title: "Flat 4B, 18 Kensington Gardens",
    address: "London W2 4QH",
    unitType: "Apartment",
    specs: "2 Bed • 2 Bath",
    landlord: "Vance Holdings Ltd",
    tenantName: "Oliver Davies",
    tenantNote: "AST Exp: Dec 2025",
    rentAmount: "£2,450",
    paymentStatus: "Paid on Time",
    paymentStatusType: "success",
    complianceSummary: "All Valid (4/4)",
    complianceValid: true,
    mandateTier: "Tier 1: Full Management",
    status: "occupied",
  },
  {
    id: "prop-2",
    title: "12 Richmond Hill Mansions",
    address: "Richmond TW10 6RF",
    unitType: "Penthouse",
    specs: "3 Bed • 2 Bath",
    landlord: "Vance Holdings Ltd",
    tenantName: "Marcus Chen",
    tenantNote: "AST Exp: Aug 2025",
    rentAmount: "£3,100",
    paymentStatus: "Paid on Time",
    paymentStatusType: "success",
    complianceSummary: "All Valid (4/4)",
    complianceValid: true,
    mandateTier: "Tier 1: Full Management",
    status: "occupied",
  },
  {
    id: "prop-3",
    title: "27 Blenheim Crescent, Unit 1",
    address: "London W11 2EE",
    unitType: "Victorian Conv.",
    specs: "1 Bed • 1 Bath",
    landlord: "Pembroke Estate Trust",
    tenantName: "Vacant (In Referencing)",
    tenantNote: "Hold Deposit Placed",
    rentAmount: "—",
    paymentStatus: "Redacted",
    paymentStatusType: "redacted",
    complianceSummary: "CP12 Expired (Urgent)",
    complianceValid: false,
    mandateTier: "Tier 3: Maintenance Only",
    status: "vacant",
    isFinancialRestricted: true,
  },
  {
    id: "prop-4",
    title: "27 Blenheim Crescent, Unit 3",
    address: "London W11 2EE",
    unitType: "Studio",
    specs: "1 Bed • 1 Bath",
    landlord: "Pembroke Estate Trust",
    tenantName: "Elena Rostova",
    tenantNote: "AST Exp: Nov 2024",
    rentAmount: "£1,950",
    paymentStatus: "Due in 2 Days",
    paymentStatusType: "warning",
    complianceSummary: "All Valid (4/4)",
    complianceValid: true,
    mandateTier: "Tier 2: Maint + Comms",
    status: "occupied",
  },
  {
    id: "prop-5",
    title: "8 Camden Mews",
    address: "Camden NW1 9BU",
    unitType: "Mews House",
    specs: "3 Bed • 2 Bath",
    landlord: "Vance Holdings Ltd",
    tenantName: "Callum O'Connor",
    tenantNote: "AST Exp: Jan 2026",
    rentAmount: "£2,850",
    paymentStatus: "Paid on Time",
    paymentStatusType: "success",
    complianceSummary: "All Valid (4/4)",
    complianceValid: true,
    mandateTier: "Tier 1: Full Management",
    status: "occupied",
  },
  {
    id: "prop-6",
    title: "14 Chester Square",
    address: "Belgravia SW1W 9HH",
    unitType: "Townhouse",
    specs: "5 Bed • 4 Bath",
    landlord: "Cavendish Real Estate Ltd",
    tenantName: "Lord Harrington",
    tenantNote: "Managed Privately",
    rentAmount: "—",
    paymentStatus: "Redacted",
    paymentStatusType: "redacted",
    complianceSummary: "EICR Due in 14d",
    complianceValid: true,
    mandateTier: "Tier 3: Maintenance Only",
    status: "occupied",
    isFinancialRestricted: true,
  },
  {
    id: "prop-7",
    title: "44 Holland Park, Flat 2",
    address: "Kensington W11 3RP",
    unitType: "Garden Flat",
    specs: "2 Bed • 2 Bath",
    landlord: "Vance Holdings Ltd",
    tenantName: "Arthur Pendelton",
    tenantNote: "AST Exp: Oct 2025",
    rentAmount: "£3,400",
    paymentStatus: "Paid on Time",
    paymentStatusType: "success",
    complianceSummary: "All Valid (4/4)",
    complianceValid: true,
    mandateTier: "Tier 1: Full Management",
    status: "occupied",
  },
]

export default function ManagedPortfolioPage() {
  const [activeTab, setActiveTab] = useState<PortfolioStatusFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMandate, setSelectedMandate] = useState("all")
  const [selectedTier, setSelectedTier] = useState("all")

  const filteredProperties = useMemo(() => {
    return PORTFOLIO_DATA.filter((prop) => {
      // Tab Filter
      if (activeTab === "occupied" && prop.status !== "occupied") return false
      if (activeTab === "vacant" && prop.status !== "vacant") return false
      if (activeTab === "maintenance" && !prop.complianceSummary.includes("Expired") && prop.status !== "maintenance") return false

      // Mandate Dropdown
      if (selectedMandate !== "all" && prop.landlord !== selectedMandate) return false

      // Tier Dropdown
      if (selectedTier !== "all" && !prop.mandateTier.includes(selectedTier)) return false

      // Search Query
      const q = searchQuery.toLowerCase().trim()
      if (q !== "") {
        const matchesTitle = prop.title.toLowerCase().includes(q)
        const matchesAddress = prop.address.toLowerCase().includes(q)
        const matchesTenant = prop.tenantName.toLowerCase().includes(q)
        const matchesLandlord = prop.landlord.toLowerCase().includes(q)
        if (!matchesTitle && !matchesAddress && !matchesTenant && !matchesLandlord) {
          return false
        }
      }

      return true
    })
  }, [activeTab, searchQuery, selectedMandate, selectedTier])

  const counts = {
    all: 14,
    occupied: 12,
    vacant: 2,
    maintenance: 3,
  }

  const handleViewUnit = (id: string) => {
    alert(`Navigating to unit detail view for property ${id}...`)
  }

  return (
     <div className=" min-h-screen py-4 px-2 sm:px-8">
        <div className="max-w-[1680px] mx-auto space-y-6">
          <PortfolioHeader
            onExportDossier={() => alert("Exporting Portfolio Dossier (CSV)...")}
            onViewMandates={() => alert("Opening Mandates Overview Drawer...")}
          />

          <PortfolioMetricsGrid />

          <PortfolioControls
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedMandate={selectedMandate}
            onMandateChange={setSelectedMandate}
            selectedTier={selectedTier}
            onTierChange={setSelectedTier}
            counts={counts}
          />

          <PortfolioTable
            properties={filteredProperties}
            onViewUnit={handleViewUnit}
          />

          <PortfolioMandateFramework />
        </div>
      </div>
  )
}