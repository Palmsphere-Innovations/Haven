"use client";

import React, { useState, useMemo } from "react";
import {
  ReceiptText,
  Plus,
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Building2,
  X,
  CreditCard,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { VendorInvoice } from "@/components/vendor/dashboard/vendor-types";

const ALL_INVOICES: (VendorInvoice & { client: string; dueDate: string })[] = [
  {
    id: "inv-1",
    invoiceRef: "INV-2026-104",
    poRef: "9912",
    property: "Flat 2, 22 Pelham Crescent, SW7 2NR",
    client: "Vance Holdings Ltd",
    date: "12 Oct 2026",
    dueDate: "26 Oct 2026",
    amount: "£320.00",
    status: "paid",
  },
  {
    id: "inv-2",
    invoiceRef: "INV-2026-105",
    poRef: "9890",
    property: "Flat 15, 8 Camden Mews, NW1 9UX",
    client: "Prime Heritage Management",
    date: "10 Oct 2026",
    dueDate: "24 Oct 2026",
    amount: "£210.00",
    status: "submitted",
  },
  {
    id: "inv-3",
    invoiceRef: "INV-2026-098",
    poRef: "9744",
    property: "Unit 3A, St. John's Court, SW4 7TA",
    client: "Pembroke Estate Trust",
    date: "04 Oct 2026",
    dueDate: "18 Oct 2026",
    amount: "£480.00",
    status: "paid",
  },
  {
    id: "inv-4",
    invoiceRef: "INV-2026-092",
    poRef: "9680",
    property: "12 Richmond Hill Mansions, TW10 6RF",
    client: "Vance Holdings Ltd",
    date: "28 Sep 2026",
    dueDate: "12 Oct 2026",
    amount: "£850.00",
    status: "paid",
  },
  {
    id: "inv-5",
    invoiceRef: "INV-2026-089",
    poRef: "9610",
    property: "Flat 4B, 18 Kensington Gardens, W2 4QH",
    client: "Prime Heritage Management",
    date: "22 Sep 2026",
    dueDate: "06 Oct 2026",
    amount: "£185.00",
    status: "paid",
  },
  {
    id: "inv-6",
    invoiceRef: "INV-2026-108",
    poRef: "9940",
    property: "Flat 2A, 14 Holland Park, W11 3TL",
    client: "Vance Holdings Ltd",
    date: "15 Oct 2026",
    dueDate: "29 Oct 2026",
    amount: "£385.00",
    status: "submitted",
  },
];

export default function VendorInvoicesPage() {
  const [invoices, setInvoices] = useState(ALL_INVOICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "submitted">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Invoice Form
  const [newInv, setNewInv] = useState({
    poRef: "9950",
    property: "Flat 4B, 18 Kensington Gardens, W2 4QH",
    client: "Vance Holdings Ltd",
    amount: "£250.00",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        inv.invoiceRef.toLowerCase().includes(q) ||
        inv.poRef.toLowerCase().includes(q) ||
        inv.property.toLowerCase().includes(q) ||
        inv.client.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [invoices, statusFilter, searchQuery]);

  const handleDownloadInvoice = (inv: typeof ALL_INVOICES[0]) => {
    const content = `HAVEN REMITTANCE & INVOICE STATEMENT
======================================================
Invoice Ref: #${inv.invoiceRef}
Purchase Order: PO-${inv.poRef}
Date of Issue: ${inv.date}
Payment Due: ${inv.dueDate}
Remittance Status: ${inv.status.toUpperCase()}
Property: ${inv.property}
Managing Entity: ${inv.client}
Total Net Amount: ${inv.amount}
Payment Scheme: Haven Guaranteed Vendor Escrow
======================================================
Certified under UK Construction Industry Scheme (CIS) & Prompt Payment Code.`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Invoice-${inv.invoiceRef}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast(`Downloaded invoice statement #${inv.invoiceRef}`);
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const created: typeof ALL_INVOICES[0] = {
      id: `inv-${Date.now()}`,
      invoiceRef: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      poRef: newInv.poRef,
      property: newInv.property,
      client: newInv.client,
      date: "Today",
      dueDate: "In 14 Days",
      amount: newInv.amount.startsWith("£") ? newInv.amount : `£${newInv.amount}`,
      status: "submitted",
    };

    setInvoices((prev) => [created, ...prev]);
    setIsModalOpen(false);
    showToast(`Invoice #${created.invoiceRef} created and submitted for landlord approval.`);
  };

  const handleExportCsv = () => {
    const headers = ["Invoice Ref", "PO Ref", "Property", "Client", "Issue Date", "Due Date", "Amount", "Status"];
    const rows = invoices.map((i) => [
      `"${i.invoiceRef}"`,
      `"${i.poRef}"`,
      `"${i.property}"`,
      `"${i.client}"`,
      `"${i.date}"`,
      `"${i.dueDate}"`,
      `"${i.amount}"`,
      `"${i.status}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `haven-vendor-invoices-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Invoice ledger exported as CSV.");
  };

  return (
    <div className="space-y-6">
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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ECEEED] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8EFEA] px-2.5 py-0.5 text-xs font-semibold text-[#2A5240] w-fit mb-2">
            <ReceiptText className="h-3.5 w-3.5" />
            Vendor Remittance Hub • Apex Heating &amp; Gas Ltd
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Invoices &amp; Settlements
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track statutory purchase order fulfillment, pre-authorized caps, and direct escrow bank payouts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            onClick={handleExportCsv}
            className="h-9 px-3.5 border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Export CSV
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="h-9 px-3.5 bg-[#132A20] hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Create Invoice
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Paid This Month
          </span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">£1,835.00</div>
          <p className="text-xs text-stone-500 mt-0.5">4 invoices cleared via BACS</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Awaiting Approval
          </span>
          <div className="text-2xl font-bold text-amber-700 mt-1">£595.00</div>
          <p className="text-xs text-stone-500 mt-0.5">2 submitted work orders</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Under Escrow
          </span>
          <div className="text-2xl font-bold text-[#132A20] mt-1">£1,240.00</div>
          <p className="text-xs text-stone-500 mt-0.5">Pre-authorized landlord hold</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
            Settlement SLA
          </span>
          <div className="text-2xl font-bold text-blue-700 mt-1">3.2 Days</div>
          <p className="text-xs text-stone-500 mt-0.5">Prompt Payment Code compliant</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              statusFilter === "all" ? "bg-white text-[#132A20] shadow-xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            All Invoices ({invoices.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("paid")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              statusFilter === "paid" ? "bg-white text-[#132A20] shadow-xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Paid ({invoices.filter((i) => i.status === "paid").length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("submitted")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              statusFilter === "submitted" ? "bg-white text-[#132A20] shadow-xs" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Awaiting Approval ({invoices.filter((i) => i.status === "submitted").length})
          </button>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search PO, invoice or property..."
            className="pl-9 h-9 text-xs rounded-xl border-stone-200"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200/80 text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4">Invoice &amp; PO</th>
                <th className="py-3 px-4">Property &amp; Demise</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-stone-400">
                    No matching invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-[#132A20]">#{inv.invoiceRef}</div>
                      <div className="text-[10px] text-stone-400 font-mono">PO-{inv.poRef}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-800">
                      {inv.property}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">
                      {inv.client}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500">
                      {inv.date}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500">
                      {inv.dueDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#132A20]">
                      {inv.amount}
                    </td>
                    <td className="py-3.5 px-4">
                      {inv.status === "paid" ? (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200 text-[10px] font-medium">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600 inline" /> Paid
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 text-[10px] font-medium">
                          <Clock className="w-3 h-3 mr-1 text-amber-600 inline" /> Under Review
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadInvoice(inv)}
                        className="h-7 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" /> PDF
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleCreateInvoice}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="text-base font-bold text-stone-900">
                Submit Contractor Invoice
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Purchase Order (PO Reference)
              </label>
              <input
                required
                value={newInv.poRef}
                onChange={(e) => setNewInv((prev) => ({ ...prev, poRef: e.target.value }))}
                placeholder="e.g. 9950"
                className="h-9 w-full rounded-xl border border-stone-300 px-3 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Property Address
              </label>
              <input
                required
                value={newInv.property}
                onChange={(e) => setNewInv((prev) => ({ ...prev, property: e.target.value }))}
                placeholder="e.g. Flat 4B, 18 Kensington Gardens, W2 4QH"
                className="h-9 w-full rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Managing Client
                </label>
                <select
                  value={newInv.client}
                  onChange={(e) => setNewInv((prev) => ({ ...prev, client: e.target.value }))}
                  className="h-9 w-full rounded-xl border border-stone-300 px-3 text-xs"
                >
                  <option value="Vance Holdings Ltd">Vance Holdings Ltd</option>
                  <option value="Prime Heritage Management">Prime Heritage Management</option>
                  <option value="Pembroke Estate Trust">Pembroke Estate Trust</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Claimed Amount (inc. VAT)
                </label>
                <input
                  required
                  value={newInv.amount}
                  onChange={(e) => setNewInv((prev) => ({ ...prev, amount: e.target.value }))}
                  placeholder="£250.00"
                  className="h-9 w-full rounded-xl border border-stone-300 px-3 text-xs font-mono"
                />
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                Invoices under pre-authorized caps are automatically cleared through Haven escrow within 48 hours of landlord sign-off.
              </span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="h-9 px-4 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-9 px-4 bg-[#132A20] hover:bg-[#1E3A2E] text-white text-xs font-semibold"
              >
                Submit Invoice
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Footer */}
      <footer className="pt-4 border-t border-[#ECEEED] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          Construction Industry Scheme (CIS) Verified • Bank of England Cleared Client Account
        </p>
        <span className="font-mono text-[10px] text-stone-400">
          PROMPT PAYMENT CODE (PPC) 2026
        </span>
      </footer>
    </div>
  );
}
