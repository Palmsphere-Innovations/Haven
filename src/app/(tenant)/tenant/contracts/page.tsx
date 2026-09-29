"use client";

import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  Download,
  Eye,
  Receipt,
  CheckCircle2,
  FileCheck2,
  Calendar,
  Building2,
  X,
} from "lucide-react";
import { DocumentViewerModal } from "@/components/tenant/documents/document-viewer-modal";
import { TenancyDocument } from "@/lib/mock/tenants";

interface ContractItem {
  id: string;
  title: string;
  category: "ast" | "deposit" | "inventory" | "receipt";
  categoryLabel: string;
  reference: string;
  date: string;
  size: string;
  status: string;
  summary: string;
}

const CONTRACT_ITEMS: ContractItem[] = [
  {
    id: "c-1",
    title: "Executed Assured Shorthold Tenancy Agreement (AST)",
    category: "ast",
    categoryLabel: "Legal Tenancy Agreement",
    reference: "#AST-2023-4B",
    date: "28 Nov 2023",
    size: "3.2 MB",
    status: "Countersigned & Binding",
    summary: "24-month fixed term (01 Dec 2023 – 30 Nov 2025) with Vance Holdings Ltd.",
  },
  {
    id: "c-2",
    title: "Deposit Protection Service (DPS) Certificate & Prescribed Info",
    category: "deposit",
    categoryLabel: "Custodial Deposit",
    reference: "#DPS-481928",
    date: "01 Dec 2023",
    size: "680 KB",
    status: "DPS Verified",
    summary: "Statutory deposit protection for £2,826.92 held under Housing Act 2004.",
  },
  {
    id: "c-3",
    title: "Check-in Photographic Inventory & Condition Docket",
    category: "inventory",
    categoryLabel: "Property Inventory",
    reference: "#INV-W2-4B",
    date: "30 Nov 2023",
    size: "14.8 MB",
    status: "Executed & Agreed",
    summary: "48-page independent condition assessment with 142 timestamped photos.",
  },
  {
    id: "c-4",
    title: "Rent Receipt — October 2024",
    category: "receipt",
    categoryLabel: "Rental Receipt",
    reference: "#TXN-8812",
    date: "01 Oct 2024",
    size: "140 KB",
    status: "Cleared",
    summary: "£2,450.00 collected via Bacs Direct Debit (#HA-9941).",
  },
  {
    id: "c-5",
    title: "Rent Receipt — September 2024",
    category: "receipt",
    categoryLabel: "Rental Receipt",
    reference: "#TXN-7402",
    date: "01 Sep 2024",
    size: "140 KB",
    status: "Cleared",
    summary: "£2,450.00 collected via Bacs Direct Debit (#HA-9941).",
  },
  {
    id: "c-6",
    title: "Rent Receipt — August 2024",
    category: "receipt",
    categoryLabel: "Rental Receipt",
    reference: "#TXN-6194",
    date: "01 Aug 2024",
    size: "140 KB",
    status: "Cleared",
    summary: "£2,450.00 collected via Bacs Direct Debit (#HA-9941).",
  },
];

export default function TenantContractsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDoc, setSelectedDoc] = useState<TenancyDocument | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredContracts = CONTRACT_ITEMS.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDownloadItem = (item: ContractItem) => {
    const content = `HAVEN TENANCY REPOSITORY - VERIFIED DOCKET
============================================================
Item: ${item.title}
Reference: ${item.reference}
Classification: ${item.categoryLabel}
Execution Date: ${item.date}
Status: ${item.status}
Premises: Flat 4B, 18 Kensington Gardens, London W2 4QH
Tenant: Oliver Davies
Summary: ${item.summary}
============================================================
Digitally certified by Haven Estate Portfolio Management.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification(`Downloaded ${item.title}.`);
  };

  const handleViewItem = (item: ContractItem) => {
    setSelectedDoc({
      id: item.id,
      title: item.title,
      metadata: `${item.categoryLabel} • ${item.summary}`,
      type: item.category === "ast" ? "ast" : item.category === "deposit" ? "deposit" : "inventory",
      referenceNumber: item.reference,
      dateAdded: item.date,
      fileSize: item.size,
      status: item.status,
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Toast Notification */}
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

      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-[#ECEEED] pb-6">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8EFEA] px-2.5 py-0.5 text-xs font-semibold text-[#2A5240] w-fit">
          <ShieldCheck className="h-3.5 w-3.5" />
          Tenant Portal • Flat 4B, 18 Kensington Gardens
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Contracts &amp; Statutory Receipts
        </h1>
        <p className="text-sm text-gray-500">
          Securely access your executed AST, monthly rent receipts, DPS custodial deposit certificate, and check-in inventory report.
        </p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Executed AST
          </span>
          <div className="text-lg font-bold text-stone-900 mt-1">24-Month Term</div>
          <p className="text-xs text-stone-500 mt-0.5">Exp: 30 Nov 2025 • Active</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            DPS Certificate
          </span>
          <div className="text-lg font-bold text-[#132A20] mt-1">£2,826.92</div>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">Custodial Protected</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Check-In Inventory
          </span>
          <div className="text-lg font-bold text-stone-900 mt-1">142 Photos</div>
          <p className="text-xs text-stone-500 mt-0.5">Signed 30 Nov 2023</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Rent Receipts
          </span>
          <div className="text-lg font-bold text-stone-900 mt-1">11 Receipts</div>
          <p className="text-xs text-stone-500 mt-0.5">100% On-Time Record</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "All Records", count: CONTRACT_ITEMS.length },
          { id: "ast", label: "AST Agreement", count: 1 },
          { id: "deposit", label: "Deposit Certificates", count: 1 },
          { id: "inventory", label: "Inventory Dockets", count: 1 },
          { id: "receipt", label: "Monthly Rent Receipts", count: 3 },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? "bg-[#132A20] text-white shadow-xs"
                : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Contracts & Documents List */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs divide-y divide-stone-100 overflow-hidden">
        {filteredContracts.map((item) => (
          <div
            key={item.id}
            className="p-5 hover:bg-stone-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#2A5240] flex items-center justify-center shrink-0 mt-0.5">
                {item.category === "receipt" ? (
                  <Receipt className="w-5 h-5" />
                ) : (
                  <FileText className="w-5 h-5" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-stone-500">
                    {item.reference}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                    {item.categoryLabel}
                  </span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {item.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-stone-900 mt-1">{item.title}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{item.summary}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
              <button
                type="button"
                onClick={() => handleViewItem(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-stone-500" />
                <span>View</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownloadItem(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download ({item.size})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Viewer Modal */}
      <DocumentViewerModal
        document={selectedDoc}
        isOpen={Boolean(selectedDoc)}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
