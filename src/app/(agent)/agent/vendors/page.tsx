"use client"

import React, { useState, useMemo } from "react"
import { PortalShell } from "@/components/shared/portal-shell"
import { VendorsHeader } from "@/components/agent/vendors/vendors-header"
import { VendorsQuickStats } from "@/components/agent/vendors/vendors-quick-stats"
import { VendorsFilterBar } from "@/components/agent/vendors/vendors-filter-bar"
import { VendorsCard } from "@/components/agent/vendors/vendors-card"
import { VendorsComplianceBanner } from "@/components/agent/vendors/vendor-compliance-banner"
import { TradeCategory, Vendor } from "@/lib/mock/vendor-types"

const VENDORS_DATA: Vendor[] = [
  {
    id: "v-1",
    name: "Apex Heating & Gas",
    tradeCategory: "heating-gas",
    tradeLabel: "Heating & Gas",
    accreditation: "Gas Safe #48291",
    leadContact: "David Miller",
    phone: "+44 20 7946 0912",
    baseLocation: "Kensington & Chelsea, W8",
    rating: 4.9,
    reviewCount: 42,
    responseSla: "< 2 hrs",
    badgeText: "Priority 24/7 Boiler",
    completedJobsCount: 16,
    mandateTag: "Under £250 Cap",
    insuranceLimit: "£5M Public Liability",
    iconType: "fire",
  },
  {
    id: "v-2",
    name: "ElectraSafe London",
    tradeCategory: "electrical",
    tradeLabel: "Electrical",
    accreditation: "NICEIC #E-9921",
    leadContact: "Marcus Chen",
    phone: "+44 20 7946 0843",
    baseLocation: "Camden & Central, NW1",
    rating: 4.8,
    reviewCount: 28,
    responseSla: "< 2 hrs",
    badgeText: "EICR Qualified",
    completedJobsCount: 11,
    mandateTag: "Under £250 Cap",
    insuranceLimit: "£5M Public Liability",
    iconType: "bolt",
  },
  {
    id: "v-3",
    name: "Thamesflow Plumbing",
    tradeCategory: "plumbing",
    tradeLabel: "Plumbing",
    accreditation: "WaterSafe & CIPHE Member",
    leadContact: "Callum O'Connor",
    phone: "+44 20 7946 0177",
    baseLocation: "Battersea & Richmond, SW11",
    rating: 4.9,
    reviewCount: 35,
    responseSla: "< 1 hr",
    badgeText: "Fast Invoicing",
    completedJobsCount: 9,
    mandateTag: "Under £250 Cap",
    insuranceLimit: "£10M Public Liability",
    iconType: "water",
  },
  {
    id: "v-4",
    name: "Premier Roofing & Glazing",
    tradeCategory: "general-building",
    tradeLabel: "General Building",
    accreditation: "TrustMark & NFRC Member",
    leadContact: "Sean Bradley",
    phone: "+44 20 7946 0455",
    baseLocation: "Wandsworth & Richmond, TW10",
    rating: 4.7,
    reviewCount: 19,
    responseSla: "< 4 hrs",
    badgeText: "Slate Specialist",
    completedJobsCount: 6,
    mandateTag: "Under £250 Cap",
    insuranceLimit: "Heritage Slate Certified",
    iconType: "roofing",
  },
  {
    id: "v-5",
    name: "SureLock Security",
    tradeCategory: "specialist",
    tradeLabel: "Specialist",
    accreditation: "Master Locksmiths Assoc (MLA)",
    leadContact: "Fiona Gallagher",
    phone: "+44 20 7946 0389",
    baseLocation: "Westminster & City, W1",
    rating: 5.0,
    reviewCount: 54,
    responseSla: "< 30 mins",
    badgeText: "DBS Cleared",
    completedJobsCount: 14,
    mandateTag: "Under £250 Cap",
    insuranceLimit: "24/7 Digital Master Key Fobs",
    iconType: "key",
  },
  {
    id: "v-6",
    name: "London Heritage Carpentry",
    tradeCategory: "general-building",
    tradeLabel: "General Building",
    accreditation: "Fed. Master Builders (FMB)",
    leadContact: "Graham Ellis",
    phone: "+44 20 7946 0721",
    baseLocation: "Notting Hill, W11",
    rating: 4.8,
    reviewCount: 22,
    responseSla: "< 3 hrs",
    badgeText: "Period Sash/Doors",
    completedJobsCount: 8,
    mandateTag: "Under £250 Cap",
    insuranceLimit: "£2M Liability",
    iconType: "carpenter",
  },
]

export default function VendorDirectoryPage() {
  const [activeTrade, setActiveTrade] = useState<TradeCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredVendors = useMemo(() => {
    return VENDORS_DATA.filter((vendor) => {
      // Category check
      const matchesCategory =
        activeTrade === "all" || vendor.tradeCategory === activeTrade

      // Search query check
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        q === "" ||
        vendor.name.toLowerCase().includes(q) ||
        vendor.accreditation.toLowerCase().includes(q) ||
        vendor.leadContact.toLowerCase().includes(q) ||
        vendor.baseLocation.toLowerCase().includes(q) ||
        vendor.tradeLabel.toLowerCase().includes(q)

      return matchesCategory && matchesSearch
    })
  }, [activeTrade, searchQuery])

  const handleAssignJob = (vendorName: string) => {
    alert(`Initiating job dispatch ticket for ${vendorName}. Work order modal opening...`)
  }

  const handleViewProfile = (vendorId: string) => {
    alert(`Opening detailed accreditation dossier for contractor ${vendorId}.`)
  }

  return (
   <div className="max-w-7xl mx-auto space-y-6">
          <VendorsHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onAddVendor={() => alert("Add New Vendor onboarding drawer opened.")}
            onExportCsv={() => alert("Downloading Vendor Directory CSV...")}
          />

          <VendorsQuickStats totalCount={18} />

          <VendorsFilterBar
            activeTrade={activeTrade}
            onSelectTrade={setActiveTrade}
            visibleCount={filteredVendors.length}
          />

          {/* Vendors Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <VendorsCard
                key={vendor.id}
                vendor={vendor}
                onAssignJob={handleAssignJob}
                onViewProfile={handleViewProfile}
              />
            ))}
          </div>

          <VendorsComplianceBanner />
        </div>
  )
}