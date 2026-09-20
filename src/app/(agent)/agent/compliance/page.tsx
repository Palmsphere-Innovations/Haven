"use client"

import React, { useState } from "react"
import { PortalShell } from "@/components/shared/portal-shell"
import { ComplianceHeader } from "@/components/agent/compliance/compliance-header"
import { ComplianceMetricsGrid } from "@/components/agent/compliance/compliance-metrics-grid"
import { ComplianceControls } from "@/components/agent/compliance/compliance-controls"
import { ComplianceTable } from "@/components/agent/compliance/compliance-table"
import { ComplianceFrameworkBox } from "@/components/agent/compliance/compliance-framework-box"
import { ComplianceMandateMemo } from "@/components/agent/compliance/compliance-mandate-memo"
import {
  ComplianceStatusFilter,
  ComplianceProperty,
} from "@/lib/mock/compliance"

const SAMPLE_PROPERTIES: ComplianceProperty[] = [
  {
    id: "comp-1",
    address: "Flat 4B, 18 Kensington Gardens",
    postcode: "London W2 4QH",
    landlord: "Vance Holdings Ltd",
    mandateTier: "Tier 1: Full Mgt",
    gasSafety: {
      status: "EXPIRING",
      expiryDate: "24 Oct 2024",
      certNumber: "Gas Safe #48291",
      daysRemaining: 5,
    },
    epc: {
      status: "VALID",
      rating: "Grade C (74)",
      expiryDate: "14 Aug 2031",
      type: "Standard Assessed",
    },
    eicr: {
      status: "VALID",
      expiryDate: "12 Aug 2027",
      certBody: "NICEIC Certified",
    },
    deposit: {
      scheme: "DPS Custodial",
      id: "#DPS-481928",
      protectedAmount: "£2,826.92",
    },
  },
  {
    id: "comp-2",
    address: "12 Richmond Hill Mansions, Unit 2",
    postcode: "Richmond TW10 6RF",
    landlord: "Vance Holdings Ltd",
    mandateTier: "Tier 1: Full Mgt",
    gasSafety: {
      status: "VALID",
      expiryDate: "18 May 2025",
      certNumber: "Gas Safe #99312",
    },
    epc: {
      status: "VALID",
      rating: "Grade B (82)",
      expiryDate: "22 Nov 2030",
      type: "High Efficiency",
    },
    eicr: {
      status: "VALID",
      expiryDate: "19 Jan 2027",
      certBody: "ELECSA Verified",
    },
    deposit: {
      scheme: "DPS Custodial",
      id: "#DPS-991204",
      protectedAmount: "£3,576.92",
    },
  },
  {
    id: "comp-3",
    address: "27 Blenheim Crescent, Unit 1",
    postcode: "London W11 2EE",
    landlord: "Pembroke Estate Trust",
    mandateTier: "Tier 2: Maint & Comms",
    gasSafety: {
      status: "EXPIRED",
      expiryDate: "12 Oct 2024",
      certNumber: "Last: Reg #22941",
    },
    epc: {
      status: "EXPIRING",
      rating: "Grade D (62)",
      expiryDate: "05 Nov 2024",
      type: "Renewal Pending",
    },
    eicr: {
      status: "VALID",
      expiryDate: "15 Sep 2026",
      certBody: "NICEIC Certified",
    },
    deposit: {
      scheme: "TDS Insured",
      id: "Direct Landlord",
      isRestricted: true,
    },
  },
  {
    id: "comp-4",
    address: "27 Blenheim Crescent, Unit 3",
    postcode: "London W11 2EE",
    landlord: "Pembroke Estate Trust",
    mandateTier: "Tier 2: Maint & Comms",
    gasSafety: {
      status: "VALID",
      expiryDate: "30 Mar 2025",
      certNumber: "Gas Safe #77312",
    },
    epc: {
      status: "VALID",
      rating: "Grade C (71)",
      expiryDate: "18 Apr 2029",
      type: "Domestic EPC",
    },
    eicr: {
      status: "EXPIRING",
      expiryDate: "02 Nov 2024",
      certBody: "NAPIT Inspection Due",
      daysRemaining: 18,
    },
    deposit: {
      scheme: "TDS Insured",
      id: "Direct Landlord",
      isRestricted: true,
    },
  },
  {
    id: "comp-5",
    address: "8 Camden Mews",
    postcode: "Camden NW1 9BU",
    landlord: "Vance Holdings Ltd",
    mandateTier: "Tier 1: Full Mgt",
    gasSafety: {
      status: "VALID",
      expiryDate: "14 Feb 2025",
      certNumber: "Gas Safe #61044",
    },
    epc: {
      status: "VALID",
      rating: "Grade C (69)",
      expiryDate: "09 Sep 2028",
      type: "Standard Rating",
    },
    eicr: {
      status: "VALID",
      expiryDate: "11 Jun 2026",
      certBody: "NICEIC Certified",
    },
    deposit: {
      scheme: "DPS Custodial",
      id: "#DPS-338291",
      protectedAmount: "£2,250.00",
    },
  },
  {
    id: "comp-6",
    address: "44 Holland Park, Flat 2",
    postcode: "Kensington W11 3RP",
    landlord: "Vance Holdings Ltd",
    mandateTier: "Tier 1: Full Mgt",
    gasSafety: {
      status: "VALID",
      expiryDate: "28 Jun 2025",
      certNumber: "Gas Safe #55190",
    },
    epc: {
      status: "VALID",
      rating: "Grade B (85)",
      expiryDate: "10 Jan 2032",
      type: "Heat Pump Certified",
    },
    eicr: {
      status: "VALID",
      expiryDate: "04 Mar 2028",
      certBody: "BPEC Verified",
    },
    deposit: {
      scheme: "DPS Custodial",
      id: "#DPS-774102",
      protectedAmount: "£3,923.00",
    },
  },
]

export default function CompliancePage() {
  const [activeFilter, setActiveFilter] = useState<ComplianceStatusFilter>("ALL")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMandate, setSelectedMandate] = useState("ALL")

  const filteredProperties = SAMPLE_PROPERTIES.filter((prop) => {
    // Search Query
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      prop.address.toLowerCase().includes(q) ||
      prop.postcode.toLowerCase().includes(q) ||
      prop.landlord.toLowerCase().includes(q)

    // Mandate Filter
    const matchesMandate =
      selectedMandate === "ALL" || prop.landlord === selectedMandate

    // Tab Filter
    let matchesTab = true
    if (activeFilter === "VALID") {
      matchesTab =
        prop.gasSafety.status === "VALID" &&
        prop.epc.status === "VALID" &&
        prop.eicr.status === "VALID"
    } else if (activeFilter === "EXPIRING") {
      matchesTab =
        prop.gasSafety.status === "EXPIRING" ||
        prop.epc.status === "EXPIRING" ||
        prop.eicr.status === "EXPIRING"
    } else if (activeFilter === "URGENT") {
      matchesTab =
        prop.gasSafety.status === "EXPIRED" ||
        prop.epc.status === "EXPIRED" ||
        prop.eicr.status === "EXPIRED"
    }

    return matchesSearch && matchesMandate && matchesTab
  })

  const counts = {
    all: 14,
    valid: 9,
    expiring: 3,
    urgent: 2,
  }

  const handleOrderWorkOrder = (address: string) => {
    alert(`CP12 Renewal Work Order initiated for ${address}. Contractor dispatched.`)
  }

  return (
  <div className="max-w-[1680px] mx-auto space-y-6">
          <ComplianceHeader
            totalUnits={14}
            onExportDossier={() => alert("Downloading Compliance Dossier CSV/PDF...")}
          />

          <ComplianceMetricsGrid
            totalUnits={14}
            urgentCount={counts.urgent}
            validCount={counts.valid}
            expiringCount={counts.expiring}
          />

          <ComplianceControls
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedMandate={selectedMandate}
            onMandateChange={setSelectedMandate}
            counts={counts}
          />

          <ComplianceTable
            properties={filteredProperties}
            onOrderWorkOrder={handleOrderWorkOrder}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ComplianceFrameworkBox />
            </div>
            <div>
              <ComplianceMandateMemo />
            </div>
          </div>
        </div>
  )
}