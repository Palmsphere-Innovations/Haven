"use client";

import React, { useState } from "react";
import { DocumentsHeader } from "@/components/landlord/documents/documents-header";
import { StatCardsRow } from "@/components/landlord/documents/stat-cards-row";
import { ComplianceMatrix } from "@/components/landlord/documents/compliance-matrix";
import {
  DocumentHub,
  documentsList,
  type DocumentItem,
} from "@/components/landlord/documents/document-hub";
import { UploadDocumentModal } from "@/components/landlord/documents/modals/upload-document-modal";
import { ServiceOrderModal } from "@/components/landlord/documents/modals/service-order-modal";
import { DocumentPreviewDrawer } from "@/components/landlord/documents/modals/documents-preview-drawer";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(documentsList);
  const [modal, setModal] = useState<"upload" | "service" | "preview" | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [service, setService] = useState({ property: "", name: "" });
  const [notice, setNotice] = useState<string | null>(null);

  // Toast Notification Handler
  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3500);
  };

  // Document Operations
  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
    showNotice(`Document "${newDoc.name}" uploaded successfully to vault`);
    setModal(null);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    showNotice("Document moved to archive");
    setModal(null);
  };

  const handleDownload = (name: string) => {
    const dummyContent = `HAVEN COMPLIANCE & LEGAL VAULT
Document: ${name}
Downloaded: ${new Date().toUTCString()}
Verification: eIDAS / UK ECA 2000 Immutably Signed
Status: Statutory Validated`;

    const blob = new Blob([dummyContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotice(`Downloaded statutory record: ${name}`);
  };

  const handleExportAuditPack = () => {
    const headers = ["Document Name", "Document Type", "Property", "Uploaded By", "Upload Date", "Size"];
    const rows = documents.map((d) => [
      `"${d.name}"`,
      `"${d.type}"`,
      `"${d.property}"`,
      `"${d.uploadedBy}"`,
      `"${d.uploadDate}"`,
      `"${d.size}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `haven-statutory-audit-register-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotice("Statutory audit register exported successfully (CSV).");
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <DocumentsHeader
        onUpload={() => setModal("upload")}
        onExport={handleExportAuditPack}
      />

      {/* 2. Key KPI Metric Cards */}
      <StatCardsRow />

      {/* 3. Interactive Compliance Grid */}
      <ComplianceMatrix
        onService={(property, name) => {
          setService({ property, name });
          setModal("service");
        }}
      />

      {/* 4. Document Hub & Directory */}
      <DocumentHub
        documents={documents}
        onPreview={(doc) => {
          setSelectedDocument(doc);
          setModal("preview");
        }}
        onDownload={handleDownload}
      />

      {/* 5. Floating Toast Notification */}
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl bg-[#132A20] px-4 py-3 text-xs font-semibold text-white shadow-xl border border-emerald-900/40 animate-in fade-in slide-in-from-bottom-3"
        >
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* 6. Modals & Drawers */}
      {modal === "upload" && (
        <UploadDocumentModal
          onClose={() => setModal(null)}
          onAdd={handleAddDocument}
        />
      )}

      {modal === "service" && (
        <ServiceOrderModal
          property={service.property}
          service={service.name}
          onClose={() => setModal(null)}
        />
      )}

      {modal === "preview" && selectedDocument && (
        <DocumentPreviewDrawer
          document={selectedDocument}
          onClose={() => setModal(null)}
          onDownload={handleDownload}
          onDelete={handleDeleteDocument}
        />
      )}

      {/* 7. Footer / Regulatory Disclaimer */}
      <footer className="pt-4 border-t border-[#ECEEED] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-500">
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          Compliant with UK Deregulation Act 2015, Electrical Safety 2020 &amp; Gas Safety 1998 regulations.
        </p>
        <span className="font-mono text-[10px] text-stone-400">
          VAULT SYNC: OK (GB-LON)
        </span>
      </footer>
    </div>
  );
}
