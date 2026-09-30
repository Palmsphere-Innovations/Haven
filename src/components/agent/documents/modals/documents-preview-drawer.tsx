"use client";

import React from "react";
import { X, Download, FileText, CheckCircle2, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DocumentItem } from "@/components/agent/documents/document-hub";

interface DocumentPreviewDrawerProps {
  document: DocumentItem;
  onClose: () => void;
  onDownload: (name: string) => void;
  onDelete?: (id: string) => void;
}

export function DocumentPreviewDrawer({
  document,
  onClose,
  onDownload,
  onDelete,
}: DocumentPreviewDrawerProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <aside className="h-full w-full max-w-lg overflow-y-auto bg-white p-6 shadow-2xl flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#ECEEED]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E8EFEA] text-[#132A20] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 id="drawer-title" className="text-sm font-bold text-stone-900">
                  Document Audit Preview
                </h2>
                <p className="text-[11px] text-stone-500 font-mono">
                  REF: #{document.id || "DOC-UK-2026"}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close preview"
              onClick={onClose}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* PDF Viewer Placeholder Card */}
          <div className="rounded-2xl border border-[#ECEEED] bg-[#F9F9F8] p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white border border-[#ECEEED] shadow-xs flex items-center justify-center mx-auto text-[#132A20]">
              <Download className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">{document.name}</p>
              <p className="text-xs text-stone-500 mt-0.5">
                Statutory PDF Certificate • {document.size}
              </p>
            </div>
            <Button
              onClick={() => onDownload(document.name)}
              className="h-8 px-4 bg-[#132A20] hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs"
            >
              Download Original File
            </Button>
          </div>

          {/* Audit Metadata List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Statutory Metadata
            </h3>
            <dl className="divide-y divide-[#ECEEED] text-xs">
              <div className="flex justify-between py-2.5">
                <dt className="text-stone-500">Linked Property</dt>
                <dd className="font-semibold text-stone-900">{document.property}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-stone-500">Category / Type</dt>
                <dd className="font-medium text-stone-800">{document.type}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-stone-500">Uploaded By</dt>
                <dd className="font-medium text-stone-800">{document.uploadedBy}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-stone-500">Regulatory Verification</dt>
                <dd className="font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Valid (UK 2026)
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Drawer Actions Footer */}
        <div className="pt-4 border-t border-[#ECEEED] flex items-center justify-between">
          {onDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(document.id)}
              className="h-8 px-3 text-rose-700 border-rose-200 hover:bg-rose-50 text-xs font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" /> Archive Document
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="h-8 px-4 border-[#ECEEED] text-xs font-semibold text-stone-700 ml-auto"
          >
            Close
          </Button>
        </div>
      </aside>
    </div>
  );
}