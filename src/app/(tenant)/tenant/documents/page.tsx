
"use client"

import React, { useState, useMemo } from "react"
// import { PortalShell } from "@/components/shared/portal-shell"
// import { DocumentsHeader } from "@/components/tenant/documents/documents-header"
import { FeaturedASTCard } from "@/components/tenant/documents/featured-ast-card"
import { DocumentsLedger } from "@/components/tenant/documents/documents-ledger"
import { DocumentUploadCard } from "@/components/tenant/documents/document-upload-card"
import { StatutoryProtectionCard } from "@/components/tenant/documents/statutory-protection-card"
import { DocumentCategory, DocumentRecord } from "@/components/tenant/documents/documents-types"
import { DocumentsHeader } from "@/components/tenant/documents/documents-header"

const RAW_DOCUMENTS: DocumentRecord[] = [
  {
    id: "doc-1",
    title: "Deposit Protection Certificate & Prescribed Info",
    subtitle: "DPS Custodial • Added 01 Dec 2023",
    category: "statutory",
    categoryLabel: "Statutory & Safety",
    identifier: "#DPS-481928 (£2,826.92)",
    status: "DPS Verified",
    statusType: "verified",
  },
  {
    id: "doc-2",
    title: "Check-In Photographic Inventory & Condition",
    subtitle: "48-page dossier • Added 30 Nov 2023",
    category: "inventories",
    categoryLabel: "Inventories & Reports",
    identifier: "142 Timestamped Photos",
    status: "Countersigned",
    statusType: "countersigned",
  },
  {
    id: "doc-3",
    title: "Domestic Gas Safety Certificate (CP12)",
    subtitle: "Apex Heating Ltd • Added 15 Oct 2024",
    category: "statutory",
    categoryLabel: "Statutory & Safety",
    identifier: "Cert #GS-884920",
    status: "Valid to Oct 2025",
    statusType: "valid",
  },
  {
    id: "doc-4",
    title: "Energy Performance Certificate (EPC)",
    subtitle: "Accredited Assessor • Valid to Mar 2031",
    category: "statutory",
    categoryLabel: "Statutory & Safety",
    identifier: "Grade C (Rating 74)",
    status: "Certified C",
    statusType: "valid",
  },
  {
    id: "doc-5",
    title: "Electrical Installation Report (EICR)",
    subtitle: "ElectraSafe London • Oct 2021",
    category: "statutory",
    categoryLabel: "Statutory & Safety",
    identifier: "5-Year Cycle (Exp: 2026)",
    status: "Compliant",
    statusType: "valid",
  },
  {
    id: "doc-6",
    title: "Right to Rent & Passport Verification",
    subtitle: "UK Home Office ShareCode • Nov 2023",
    category: "identity",
    categoryLabel: "Identity & Referencing",
    identifier: "Continuous Validity",
    status: "Verified",
    statusType: "verified",
  },
  {
    id: "doc-7",
    title: "Comprehensive Referencing & Affordability",
    subtitle: "Equifax / Prime Heritage • Nov 2023",
    category: "identity",
    categoryLabel: "Identity & Referencing",
    identifier: "Score: Exemplary (Tier 1)",
    status: "Approved",
    statusType: "verified",
  },
  {
    id: "doc-8",
    title: "Annual Rent Schedule & Direct Debit Mandate",
    subtitle: "Bacs Automated Clearance • Dec 2023",
    category: "notices",
    categoryLabel: "Notices & Correspondence",
    identifier: "Ref #HA-9941",
    status: "Active",
    statusType: "active",
  },
]

export default function TenantDocumentsPage() {
  const [activeCategory, setActiveCategory] = useState<DocumentCategory>("all")

  const filteredDocuments = useMemo(() => {
    if (activeCategory === "all") return RAW_DOCUMENTS
    return RAW_DOCUMENTS.filter((doc) => doc.category === activeCategory)
  }, [activeCategory])

  const handleUploadSubmit = (category: string, file: File | null) => {
    if (!file) {
      alert("Please select or drop a valid document file before submitting.")
      return
    }
    alert(`File "${file.name}" uploaded under category "${category}". Queued for verification.`)
  }

  return (
   <div className=" min-h-screen py-4 px-2 sm:px-8">
        <div className="max-w-[1600px] mx-auto space-y-6">
          <DocumentsHeader
            onRequestCopy={() => alert("Requesting formal paper copy from Prime Heritage Management...")}
            onDownloadArchive={() => alert("Bundling all 8 statutory documents into ZIP archive...")}
          />

          <FeaturedASTCard
            onDownloadPDF={() => alert("Downloading AST Agreement PDF (3.2 MB)...")}
            onViewAgreement={() => alert("Opening AST Agreement viewer...")}
          />

          {/* Primary Two-Column Layout (8 Cols / 4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8">
              <DocumentsLedger
                documents={filteredDocuments}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onViewDoc={(id) => alert(`Opening viewer for document ${id}...`)}
                onDownloadDoc={(id) => alert(`Downloading document ${id}...`)}
              />
            </div>

            <div className="lg:col-span-4 space-y-6">
              <DocumentUploadCard onUploadSubmit={handleUploadSubmit} />
              <StatutoryProtectionCard />
            </div>
          </div>
        </div>
      </div>
  )
}