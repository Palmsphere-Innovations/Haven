"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Plus, Gavel, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContractMetrics } from "@/components/landlord/contracts/contract-metrics";
import { ContractsTable } from "@/components/landlord/contracts/contracts-table";
import { ContractDetailPanel } from "@/components/landlord/contracts/contract-detail-panel";
import { ContractPaperPreview } from "@/components/landlord/contracts/contract-paper-preview";
import { initialContracts, type ContractRecord } from "@/lib/mock/contracts";

export default function ContractsPage() {
  const [contracts, setContracts] = useState<ContractRecord[]>(initialContracts);
  const [selectedContractId, setSelectedContractId] = useState("1");
  const [isNewContractOpen, setIsNewContractOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // New Contract form state
  const [newContractForm, setNewContractForm] = useState({
    property: "Flat 4B, 18 Kensington Gardens",
    postcode: "London, W2 4QH",
    tenants: "",
    tenancyType: "Joint & Several",
    instrument: "Standard AST (12m Fixed)",
    duration: "12m",
    rentAmount: "£2,100.00",
    depositAmount: "£2,423.00",
  });

  const selectedContract =
    contracts.find((c) => c.id === selectedContractId) || contracts[0];

  const handleExportRegister = () => {
    const headers = [
      "Contract Reference",
      "Property",
      "Postcode",
      "Tenants",
      "Instrument",
      "Term Window",
      "Rent Amount",
      "Deposit",
      "Status",
    ];

    const rows = contracts.map((c) => [
      `"${c.reference}"`,
      `"${c.property}"`,
      `"${c.postcode}"`,
      `"${c.tenants}"`,
      `"${c.instrument}"`,
      `"${c.termWindow}"`,
      `"${c.rentAmount}"`,
      `"${c.depositAmount}"`,
      `"${c.statusText}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `contracts-register-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotice("Contracts & Leases register exported to CSV.");
    setTimeout(() => setNotice(null), 3500);
  };

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContractForm.tenants) return;

    const ref = `AST-2026-UK-${Math.floor(100 + Math.random() * 900)}`;
    const created: ContractRecord = {
      id: `c-${Date.now()}`,
      property: newContractForm.property,
      postcode: newContractForm.postcode,
      tenants: newContractForm.tenants,
      tenancyType: newContractForm.tenancyType,
      instrument: newContractForm.instrument,
      termWindow: "01 Dec 2026 – 30 Nov 2027",
      duration: newContractForm.duration,
      status: "awaiting",
      statusText: "Awaiting Signature",
      rentAmount: newContractForm.rentAmount,
      depositAmount: newContractForm.depositAmount,
      reference: ref,
    };

    setContracts((prev) => [created, ...prev]);
    setSelectedContractId(created.id);
    setIsNewContractOpen(false);
    setNewContractForm({
      property: "Flat 4B, 18 Kensington Gardens",
      postcode: "London, W2 4QH",
      tenants: "",
      tenancyType: "Joint & Several",
      instrument: "Standard AST (12m Fixed)",
      duration: "12m",
      rentAmount: "£2,100.00",
      depositAmount: "£2,423.00",
    });

    setNotice(`New tenancy agreement drafted (${ref}). Ready for e-signature.`);
    setTimeout(() => setNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            {/* <Link
              href="/documents"
              className="hover:text-stone-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> Documents
            </Link> */}
            {/* <span>/</span> */}
            <span className="text-brand font-bold">Contracts &amp; Leases</span>
          </nav>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 tracking-tight">
            Contracts &amp; Legal Agreements
          </h1>
          <p className="text-xs text-stone-500 max-w-2xl">
            Legally enforceable Assured Shorthold Tenancies (AST), non-housing act leases, and deed instruments across your UK portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExportRegister}
            className="h-9 px-3.5 border-[#ECEEED] rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Export Register
          </Button>
          <Button
            onClick={() => setIsNewContractOpen(true)}
            className="h-9 px-3.5 bg-[#132A20] hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" /> New Contract
          </Button>
        </div>
      </div>

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <ContractMetrics />

      <ContractsTable
        contracts={contracts}
        selectedId={selectedContractId}
        onSelectContract={(id) => setSelectedContractId(id)}
      />

      {/* Split View Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6">
          <ContractDetailPanel contract={selectedContract} onNotice={setNotice} />
        </div>
        <div className="lg:col-span-6">
          <ContractPaperPreview contract={selectedContract} onNotice={setNotice} />
        </div>
      </div>

      {/* New Contract Modal */}
      {isNewContractOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleCreateContract}
            className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 className="text-base font-bold text-stone-900">
              Draft New Tenancy Agreement
            </h2>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Property Unit
              </label>
              <select
                value={newContractForm.property}
                onChange={(e) => {
                  const val = e.target.value;
                  const postcode = val.includes("Camden")
                    ? "London, NW1 9UX"
                    : val.includes("Richmond")
                    ? "Richmond, TW10 6RF"
                    : "London, W2 4QH";
                  setNewContractForm((p) => ({ ...p, property: val, postcode }));
                }}
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              >
                <option>Flat 4B, 18 Kensington Gardens</option>
                <option>8 Camden Mews</option>
                <option>Unit 3A, St. John&apos;s Court</option>
                <option>12 Richmond Hill Mansions</option>
                <option>27 Blenheim Crescent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Tenant Name(s)
              </label>
              <input
                required
                value={newContractForm.tenants}
                onChange={(e) =>
                  setNewContractForm((p) => ({ ...p, tenants: e.target.value }))
                }
                placeholder="e.g. Arthur Pendelton"
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Agreement Instrument
                </label>
                <select
                  value={newContractForm.instrument}
                  onChange={(e) =>
                    setNewContractForm((p) => ({ ...p, instrument: e.target.value }))
                  }
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
                >
                  <option>Standard AST (12m Fixed)</option>
                  <option>AST (Joint Fixed 24m)</option>
                  <option>AST (Statutory Periodic)</option>
                  <option>Non-Housing Act (&gt;£100k)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Tenancy Liability
                </label>
                <select
                  value={newContractForm.tenancyType}
                  onChange={(e) =>
                    setNewContractForm((p) => ({ ...p, tenancyType: e.target.value }))
                  }
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
                >
                  <option>Joint &amp; Several</option>
                  <option>Sole Tenant</option>
                  <option>Individual Lease</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Monthly Rent
                </label>
                <input
                  value={newContractForm.rentAmount}
                  onChange={(e) =>
                    setNewContractForm((p) => ({ ...p, rentAmount: e.target.value }))
                  }
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Custodial Deposit
                </label>
                <input
                  value={newContractForm.depositAmount}
                  onChange={(e) =>
                    setNewContractForm((p) => ({ ...p, depositAmount: e.target.value }))
                  }
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewContractOpen(false)}
                className="h-8 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-8 text-xs bg-brand hover:bg-[#0b1b14] text-white rounded-xl"
              >
                Draft &amp; Enqueue
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Statutory Footer */}
      <div className="p-4 rounded-2xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <Gavel className="w-4 h-4 text-[#132A20]" />
          <span>Housing Act 1988, Tenant Fees Act 2019 &amp; RICS Drafting Standards Compliant.</span>
        </div>
        <span className="font-mono text-[10px]">SHA-256 VERIFIED</span>
      </div>
    </div>
  );
}
