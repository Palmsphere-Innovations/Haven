"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Plus, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContractMetrics } from "@/components/landlord/contracts/contract-metrics";
import { ContractsTable } from "@/components/landlord/contracts/contracts-table";
import { ContractDetailPanel } from "@/components/landlord/contracts/contract-detail-panel";
import { ContractPaperPreview } from "@/components/landlord/contracts/contract-paper-preview";

export default function ContractsPage() {
  const [selectedContractId, setSelectedContractId] = useState("1");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <nav className="flex items-center gap-1.5 text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
            <Link href="/documents" className="hover:text-stone-900 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Documents
            </Link>
            <span>/</span>
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
          <Button variant="outline" className="h-9 px-3.5 border-[#ECEEED] rounded-xl text-xs font-semibold text-stone-700">
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Export Register
          </Button>
          <Button className="h-9 px-3.5 bg-[#132A20] hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs">
            <Plus className="w-3.5 h-3.5 mr-1.5" /> New Contract
          </Button>
        </div>
      </div>

      <ContractMetrics />

      <ContractsTable
        selectedId={selectedContractId}
        onSelectContract={(id) => setSelectedContractId(id)}
      />

      {/* Split View Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6">
          <ContractDetailPanel />
        </div>
        <div className="lg:col-span-6">
          <ContractPaperPreview />
        </div>
      </div>

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