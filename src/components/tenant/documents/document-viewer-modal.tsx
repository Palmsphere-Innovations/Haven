"use client";

import React, { useState } from "react";
import {
  X,
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Lock,
} from "lucide-react";
import { TenancyDocument } from "@/lib/mock/tenants";

interface DocumentViewerModalProps {
  document: TenancyDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentViewerModal({
  document: doc,
  isOpen,
  onClose,
}: DocumentViewerModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !doc) return null;

  const handleDownload = () => {
    // Generate simulated downloaded text file
    const content = `HAVEN PROPERTY MANAGEMENT - STATUTORY ARCHIVE
==================================================
Document: ${doc.title}
Reference: ${doc.referenceNumber || "#HAV-" + doc.id}
Status: ${doc.status || "Verified & Compliant"}
Property: Flat 4B, 18 Kensington Gardens, London W2 4QH
Tenant: Oliver Davies
Deposit Scheme: DPS Custodial (#DPS-481928)
Issuer: Prime Heritage Management / Haven UK
==================================================
This is an authentic digital replica of the verified tenancy document.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${doc.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.txt`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200/80 flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#2A5240] flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                  {doc.referenceNumber || "#DOC-" + doc.id}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                  {doc.status || "Statutory Record"}
                </span>
              </div>
              <h2 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
                {doc.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6 space-y-6">
          {downloadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Document downloaded to your local device.</span>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div>
              <span className="text-[10px] font-semibold text-stone-400 uppercase block">Property</span>
              <span className="text-xs font-bold text-stone-800">Flat 4B, 18 KG</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-stone-400 uppercase block">Date Filed</span>
              <span className="text-xs font-bold text-stone-800">{doc.dateAdded || "Nov 2023"}</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-stone-400 uppercase block">File Format</span>
              <span className="text-xs font-bold text-stone-800">PDF ({doc.fileSize || "1.4 MB"})</span>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-stone-400 uppercase block">Encryption</span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Lock className="w-3 h-3" /> 256-bit AES
              </span>
            </div>
          </div>

          {/* Visual Document Mock Preview Canvas */}
          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-stone-200/80 space-y-4 font-mono text-xs text-stone-700 shadow-inner">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-800" />
                <span className="font-bold text-stone-900 tracking-wider text-[11px]">
                  HAVEN ESTATE PORTFOLIO MANAGEMENT
                </span>
              </div>
              <span className="text-[10px] text-stone-400">UK HOUSING ACT 1988 COMPLIANT</span>
            </div>

            <div className="space-y-2 text-[11px] leading-relaxed">
              <p>
                <strong>DOCUMENT CLASSIFICATION:</strong> {doc.title.toUpperCase()}
              </p>
              <p>
                <strong>DEMISED PREMISES:</strong> Flat 4B, 18 Kensington Gardens, London W2 4QH
              </p>
              <p>
                <strong>DESIGNATED TENANT:</strong> Oliver Davies
              </p>
              <p>
                <strong>VERIFICATION AUTHORITY:</strong> Prime Heritage Management (Licence #PH-99401)
              </p>
              <p>
                <strong>SUMMARY DETAILS:</strong> {doc.metadata}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
              <span>DIGITAL SIGNATURE SHA-256 VERIFIED</span>
              <span>PAGE 1 OF 1 • OFFICIAL RECORD</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-stone-500">
              Stored securely in Haven Tenant Vault
            </span>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
