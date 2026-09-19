"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { DocumentsHeader } from "@/components/agent/documents/documents-header";
import { StatCardsRow } from "@/components/agent/documents/stat-cards-row";
import { ComplianceMatrix } from "@/components/agent/documents/compliance-matrix";
import {
  DocumentHub,
  documentsList,
  type DocumentItem,
} from "@/components/agent/documents/document-hub";
import { UploadDocumentModal } from "@/components/agent/documents/modals/upload-document-modal";
import { ServiceOrderModal } from "@/components/agent/documents/modals/service-order-modal";
import { DocumentPreviewDrawer } from "@/components/agent/documents/modals/documents-preview-drawer";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(documentsList);
  const [modal, setModal] = useState<"upload" | "service" | "preview" | null>(
    null,
  );
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentItem | null>(null);
  const [service, setService] = useState({ property: "", name: "" });
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3500);
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments((prev) => [newDoc, ...prev]);
    showNotice(`Document "${newDoc.name}" uploaded successfully`);
    setModal(null);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
    showNotice("Document moved to archive");
    setModal(null);
  };

  const handleDownload = (name: string) => {
    showNotice(`Downloading ${name}...`);
  };

  return (
    <div className="space-y-6">
      <DocumentsHeader
        onUpload={() => setModal("upload")}
        onExport={() => showNotice("Audit pack generated: statutory-certificates.zip")}
      />
      <StatCardsRow />
      <ComplianceMatrix
        onService={(property, name) => {
          setService({ property, name });
          setModal("service");
        }}
      />
      <DocumentHub
        documents={documents}
        onPreview={(doc) => {
          setSelectedDocument(doc);
          setModal("preview");
        }}
        onDownload={handleDownload}
      />
      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl border border-emerald-900/40 bg-[#132A20] px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-3"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>{notice}</span>
        </div>
      )}
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
      <footer className="flex flex-col items-start justify-between gap-3 border-t border-[#ECEEED] pt-4 text-xs text-stone-500 sm:flex-row sm:items-center">
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" />
          Compliant with UK Deregulation Act 2015, Electrical Safety 2020 &amp;
          Gas Safety 1998 regulations.
        </p>
        <span className="font-mono text-[10px] text-stone-400">
          VAULT SYNC: OK (GB-LON)
        </span>
      </footer>
    </div>
  );
}
