"use client";

import React, { useState, useMemo } from "react";
import { FeaturedASTCard } from "@/components/tenant/documents/featured-ast-card";
import { DocumentsLedger } from "@/components/tenant/documents/documents-ledger";
import { DocumentUploadCard } from "@/components/tenant/documents/document-upload-card";
import { StatutoryProtectionCard } from "@/components/tenant/documents/statutory-protection-card";
import { DocumentCategory, DocumentRecord } from "@/components/tenant/documents/documents-types";
import { DocumentsHeader } from "@/components/tenant/documents/documents-header";
import { DocumentViewerModal } from "@/components/tenant/documents/document-viewer-modal";
import { TenancyDocument } from "@/lib/mock/tenants";
import { CheckCircle2, X } from "lucide-react";

const INITIAL_DOCUMENTS: DocumentRecord[] = [
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
];

export default function TenantDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [activeCategory, setActiveCategory] = useState<DocumentCategory>("all");
  const [selectedDocForModal, setSelectedDocForModal] = useState<TenancyDocument | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredDocuments = useMemo(() => {
    if (activeCategory === "all") return documents;
    return documents.filter((doc) => doc.category === activeCategory);
  }, [documents, activeCategory]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleUploadSubmit = (category: string, file: File | null) => {
    if (!file) {
      showNotification("Please select or drop a valid document file before submitting.");
      return;
    }

    let mappedCategory: DocumentCategory = "statutory";
    let catLabel = "Statutory & Safety";
    if (category.toLowerCase().includes("identity") || category.toLowerCase().includes("proof")) {
      mappedCategory = "identity";
      catLabel = "Identity & Referencing";
    } else if (category.toLowerCase().includes("inventory") || category.toLowerCase().includes("condition")) {
      mappedCategory = "inventories";
      catLabel = "Inventories & Reports";
    } else if (category.toLowerCase().includes("notice")) {
      mappedCategory = "notices";
      catLabel = "Notices & Correspondence";
    }

    const newDoc: DocumentRecord = {
      id: `doc-${Date.now()}`,
      title: file.name.replace(/\.[^/.]+$/, ""),
      subtitle: `Uploaded by tenant • ${new Date().toLocaleDateString("en-GB")}`,
      category: mappedCategory,
      categoryLabel: catLabel,
      identifier: `Pending Review (${(file.size / 1024).toFixed(0)} KB)`,
      status: "Submitted",
      statusType: "countersigned",
    };

    setDocuments((prev) => [newDoc, ...prev]);
    showNotification(`File "${file.name}" uploaded successfully and queued for agent verification.`);
  };

  const handleDownloadAST = () => {
    const content = `HAVEN ASSURED SHORTHOLD TENANCY AGREEMENT (AST)
============================================================
Tenancy Identifier: UK-W2-2023-4B-AST
Premises: Flat 4B, 18 Kensington Gardens, London W2 4QH
Tenant: Oliver Davies & Clara Finch
Landlord: Alistair Vance (Vance Holdings Ltd)
Managing Agent: Eleanor Vance (Prime Heritage Management)
Term: 24 Months (01 Dec 2023 to 30 Nov 2025)
Monthly Rent: £2,450.00
Deposit: £2,826.92 lodged in DPS Custodial
DocuSign Envelope ID: 81E2F79A-90D1-4D3B-B801-49F101A29D81
Signatories: Oliver Davies (Tenant), Vance Holdings Ltd (Landlord)
============================================================
Governed under the Housing Act 1988 (as amended).`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AST-Tenancy-Agreement-Flat4B.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification("AST Tenancy Agreement PDF downloaded.");
  };

  const handleViewDoc = (id: string) => {
    const found = documents.find((d) => d.id === id);
    if (!found) return;

    setSelectedDocForModal({
      id: found.id,
      title: found.title,
      metadata: `${found.categoryLabel} • ${found.subtitle}`,
      type: found.category === "statutory" ? "gas" : "ast",
      referenceNumber: found.identifier,
      dateAdded: found.subtitle,
      status: found.status,
      fileSize: "1.8 MB",
    });
  };

  const handleDownloadDoc = (id: string) => {
    const found = documents.find((d) => d.id === id);
    const title = found ? found.title : "Haven-Document";
    const content = `HAVEN STATUTORY PROPERTY ARCHIVE
Document: ${title}
Demised: Flat 4B, 18 Kensington Gardens, W2 4QH
Tenant: Oliver Davies
Status: Verified Authentic Record
Exported: ${new Date().toISOString()}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification(`Downloaded "${title}".`);
  };

  const handleDownloadArchive = () => {
    const content = `HAVEN TENANCY STATUTORY ARCHIVE BUNDLE
============================================================
Property: Flat 4B, 18 Kensington Gardens, London W2 4QH
Tenant: Oliver Davies
Files included:
1. Assured Shorthold Tenancy Agreement (AST)
2. Deposit Protection Service (DPS) Certificate #DPS-481928
3. Check-In Photographic Inventory & Condition Report
4. Gas Safety Certificate CP12 #GS-884920
5. Energy Performance Certificate (EPC Grade C)
6. Electrical Installation Condition Report (EICR)
7. Right to Rent Verification Docket
8. BACS Direct Debit Rent Schedule
============================================================
All documents verified compliant under the Tenant Fees Act 2019.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Haven-Statutory-Documents-Archive.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification("Complete statutory documents archive ZIP downloaded.");
  };

  const handleRequestCopy = () => {
    showNotification("Formal physical paper copy request sent to Prime Heritage Management desk.");
  };

  return (
    <div className="min-h-screen py-4 px-2 sm:px-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Floating Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#132A20] text-white px-5 py-3.5 rounded-2xl shadow-xl animate-in slide-in-from-bottom-5 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-medium">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-2 text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <DocumentsHeader
          onRequestCopy={handleRequestCopy}
          onDownloadArchive={handleDownloadArchive}
        />

        <FeaturedASTCard
          onDownloadPDF={handleDownloadAST}
          onViewAgreement={() =>
            setSelectedDocForModal({
              id: "ast-featured",
              title: "Assured Shorthold Tenancy Agreement (AST)",
              metadata: "Executed 28 Nov 2023 • Fixed Term (24 Months)",
              type: "ast",
              referenceNumber: "#AST-2023-4B",
              dateAdded: "28 Nov 2023",
              fileSize: "3.2 MB",
              status: "Executed & Binding",
            })
          }
        />

        {/* Primary Two-Column Layout (8 Cols / 4 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <DocumentsLedger
              documents={filteredDocuments}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              onViewDoc={handleViewDoc}
              onDownloadDoc={handleDownloadDoc}
            />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <DocumentUploadCard onUploadSubmit={handleUploadSubmit} />
            <StatutoryProtectionCard />
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={selectedDocForModal}
        isOpen={Boolean(selectedDocForModal)}
        onClose={() => setSelectedDocForModal(null)}
      />
    </div>
  );
}