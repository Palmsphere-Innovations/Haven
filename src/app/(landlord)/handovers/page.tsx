"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowLeftRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandoverMetrics } from "@/components/landlord/agents/handovers/handover-metrics";
import { ActiveHandoversList } from "@/components/landlord/agents/handovers/active-handovers-list";
import { InitiateHandoverForm } from "@/components/landlord/agents/handovers/initiate-handover-form";
import { HandoverHistoryTable } from "@/components/landlord/agents/handovers/handover-history-table";

export default function AgentHandoversPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
            <Link href="/agents" className="hover:text-stone-900 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Agents Directory
            </Link>
            <span>/</span>
            <span className="text- font-bold">Handover Tracking</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 tracking-tight">
            Agent Handovers &amp; Delegations
          </h1>
          <p className="text-xs text-stone-500 max-w-2xl">
            Cryptographic multi-step agency transitions. No silent transfers — every delegation change requires verifiable two-party signoff.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 px-3.5 border-[#ECEEED] rounded-xl text-xs font-semibold text-stone-700">
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Export Registry
          </Button>
          <a href="#initiate-handover">
            <Button className="h-9 px-3.5 bg-brand hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs">
              <ArrowLeftRight className="w-3.5 h-3.5 mr-1.5" /> New Transfer
            </Button>
          </a>
        </div>
      </div>

      <HandoverMetrics />
      <ActiveHandoversList />
      <InitiateHandoverForm />
      <HandoverHistoryTable />

      {/* Footer Disclaimer */}
      <footer className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 border-t border-[#ECEEED]">
        <p>
          Adherence to Estate Agents Act 1979 &amp; RICS Property Management Regulations.
        </p>
        <span className="font-mono text-[10px] text-stone-400">SHA-256 VERIFIED</span>
      </footer>
    </div>
  );
}