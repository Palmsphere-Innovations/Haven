"use client";

import React from "react";
import { Download, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentMetrics } from "@/components/landlord/agents/agents-metrics";
import { AgentsTable,} from "@/components/landlord/agents/agents-table";
import { AgentComplianceBanner } from "@/components/landlord/agents/agents-compliance-banner";
import { agentsData } from "@/lib/data/mock-data";


export default function LandlordAgentsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-[#ECEEED]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Agents Directory
            </span>
            <span className="text-stone-300">•</span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-brand bg-[#E8EFEA] px-2 py-0.5 rounded-full">
              Portfolio Access
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-stone-900">
            Agents
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            8 licensed managing agents across your portfolio • 42 properties assigned. Role-based delegation active.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            className="h-9 px-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 rounded-xl text-xs font-semibold shadow-xs"
          >
            <Download className="w-4 h-4 text-stone-500 mr-1.5" />
            Export Registry (CSV)
          </Button>
          <Button className="h-9 px-4 bg-brand hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs">
            <UserPlus className="w-4 h-4 mr-1.5" />
             Invite Agent
          </Button>
        </div>
      </div>

      {/* Modular Section Components */}
      <AgentMetrics />
      <AgentsTable agents={agentsData} />
      <AgentComplianceBanner />
    </div>
  );
}