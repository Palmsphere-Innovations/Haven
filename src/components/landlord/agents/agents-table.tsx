"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  List,
  Grid,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentRecord, agentsData } from "@/lib/mock/mock-data";
import { useRouter } from "next/router";
import  Link  from "next/link";

type TabStatus = "all" | "active" | "pending" | "revoked";



interface AgentsTableProps {
  agents: AgentRecord[];
}

export function AgentsTable({ agents }: AgentsTableProps) {
  const [activeTab, setActiveTab] = useState<TabStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate status counts
  const counts = useMemo(() => {
    return agents.reduce(
      (acc, agent) => {
        if (agent.status === "Active") acc.active++;
        else if (agent.status === "Pending Handover") acc.pending++;
        else if (agent.status === "Revoked") acc.revoked++;
        return acc;
      },
      { active: 0, pending: 0, revoked: 0 }
    );
  }, [agents]);

  // Filter list based on search and active tab
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      if (activeTab === "active" && agent.status !== "Active") return false;
      if (activeTab === "pending" && agent.status !== "Pending Handover") return false;
      if (activeTab === "revoked" && agent.status !== "Revoked") return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          agent.name.toLowerCase().includes(q) ||
          agent.agency.toLowerCase().includes(q) ||
          agent.email.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [agents, activeTab, searchQuery]);

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs overflow-hidden space-y-3">
      <AgentsHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalCount={agents.length}
        counts={counts}
      />

      <AgentsToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Table Data View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#ECEEED] bg-[#F9F9F8] text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
              <th className="py-3 px-4">Agent &amp; Agency</th>
              <th className="py-3 px-4">Permission Tier</th>
              <th className="py-3 px-4">Assigned Properties</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ECEEED]">
            {filteredAgents.map((agent) => (
              <AgentsTableRow key={agent.id} agent={agent} />
            ))}
          </tbody>
        </table>
      </div>

      <AgentsFooter
        filteredCount={filteredAgents.length}
        totalCount={agents.length}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Sub-Components                               */
/* -------------------------------------------------------------------------- */




// Agent Header

interface AgentsHeaderProps {
  activeTab: TabStatus;
  setActiveTab: (tab: TabStatus) => void;
  totalCount: number;
  counts: { active: number; pending: number; revoked: number };
}

function AgentsHeader({
  activeTab,
  setActiveTab,
  totalCount,
  counts,
}: AgentsHeaderProps) {
  const tabs: { key: TabStatus; label: string; count: number }[] = [
    { key: "all", label: "All Agents", count: totalCount },
    { key: "active", label: "Active", count: counts.active },
    { key: "pending", label: "Pending Handover", count: counts.pending },
    { key: "revoked", label: "Revoked", count: counts.revoked },
  ];

  return (
    <div className="p-4 pb-0 border-b border-[#ECEEED] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
      <div className="flex items-center gap-1 bg-[#F9F9F8] p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            type="button"
            variant={activeTab === tab.key ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap h-auto ${
              activeTab === tab.key
                ? "font-semibold bg-white text-stone-900 shadow-xs hover:bg-white"
                : "font-medium text-stone-600 hover:text-stone-900 hover:bg-transparent"
            }`}
          >
            {tab.label} ({tab.count})
          </Button>
        ))}
      </div>

      <div className="text-xs text-stone-400 flex items-center gap-1.5 pb-2 lg:pb-0">
        <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
        <span>Directory updated 14 mins ago</span>
      </div>
    </div>
  );
}

// Agent Tool bar

interface AgentsToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function AgentsToolbar({ searchQuery, setSearchQuery }: AgentsToolbarProps) {
  return (
    <div className="p-4 pt-0 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by agent name, firm, or email..."
          className="w-full h-9 pl-9 pr-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900 placeholder:text-stone-400"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-end">
        <select className="h-9 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-700 cursor-pointer outline-none">
          <option>Permission Tier: All</option>
          <option>Full Management</option>
          <option>Maintenance + Communication</option>
          <option>Maintenance-only</option>
        </select>

        <select className="h-9 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-700 cursor-pointer outline-none">
          <option>Assigned Boroughs: All</option>
          <option>Kensington &amp; Chelsea</option>
          <option>Camden &amp; Islington</option>
          <option>Richmond &amp; Surrey</option>
        </select>

        <div className="flex items-center bg-[#F9F9F8] border border-[#ECEEED] rounded-xl p-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 p-1 rounded-lg bg-white text-stone-900 shadow-xs"
          >
            <List className="w-3.5 h-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7 p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-transparent"
          >
            <Grid className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Agent Table Row
function AgentsTableRow({ agent }: { agent: AgentRecord }) {
  return (
    <tr className="hover:bg-stone-50/70 transition-colors">
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#E8EFEA] text-brand font-bold flex items-center justify-center text-xs shrink-0 border border-[#ECEEED]">
            {agent.initials}
          </div>
          <div>
            <div className="font-semibold text-stone-900">{agent.name}</div>
            <div className="text-[11px] text-stone-500">{agent.agency}</div>
            <div className="text-[10px] font-mono text-stone-400">{agent.email}</div>
          </div>
        </div>
      </td>

      <td className="py-3.5 px-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${agent.tierColor}`}>
          {agent.tier}
        </span>
      </td>

      <td className="py-3.5 px-4 whitespace-nowrap">
        <div className="font-semibold text-stone-900 font-mono">
          {agent.propertiesCount} Properties
        </div>
        <div className="text-[11px] text-stone-500">{agent.portfolioScope}</div>
      </td>

      <td className="py-3.5 px-4 whitespace-nowrap">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${agent.statusColor}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {agent.status}
        </span>
      </td>

      <td className="py-3.5 px-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end gap-2">
          {/* Navigate to the agent details page */}
          <Link href={`/agents/${agent.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-3 text-[11px] border-[#ECEEED] hover:bg-stone-50 rounded-lg"
            >
              {agent.status === "Revoked" ? "View Audit Log" : "View"}
            </Button>
          </Link>

          {agent.status !== "Revoked" && (
            <>
              <span className="text-stone-300">|</span>
              <div className="relative group inline-block">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 py-1 text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg text-xs font-medium inline-flex items-center gap-1 transition-colors"
                >
                  <span>Revoke…</span>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                </Button>

                <div className="absolute right-0 bottom-full mb-2 hidden group-hover:flex flex-col w-60 p-3 bg-stone-900 text-white rounded-xl shadow-xl z-30 pointer-events-none text-left">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Audit Handover Signoff Required
                  </span>
                  <span className="text-[11px] text-stone-300 mt-1 leading-relaxed">
                    {agent.revokeWarning}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}


// AgentFooter

interface AgentsFooterProps {
  filteredCount: number;
  totalCount: number;
}

function AgentsFooter({ filteredCount, totalCount }: AgentsFooterProps) {
  const startCount = filteredCount === 0 ? 0 : 1;

  return (
    <div className="p-4 border-t border-[#ECEEED] bg-[#F9F9F8] flex items-center justify-between text-xs text-stone-500">
      <span>
        Showing {startCount} to {filteredCount} of {totalCount} agents
      </span>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled className="h-7 px-3 bg-white text-xs">
          Previous
        </Button>
        <Button variant="outline" size="sm" className="h-7 px-3 bg-white text-xs text-stone-900">
          Next
        </Button>
      </div>
    </div>
  );
}