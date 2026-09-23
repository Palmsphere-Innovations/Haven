"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  List,
  Grid,
  AlertTriangle,
  ShieldCheck,
  Building2,
  X,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AgentRecord } from "@/lib/mock/agents";

type TabStatus = "all" | "active" | "pending" | "revoked";

interface AgentsTableProps {
  agents: AgentRecord[];
  onRevokeAgent?: (agentId: string) => void;
}

export function AgentsTable({ agents, onRevokeAgent }: AgentsTableProps) {
  const [activeTab, setActiveTab] = useState<TabStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [boroughFilter, setBoroughFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [revokingAgent, setRevokingAgent] = useState<AgentRecord | null>(null);

  // Status counts
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

  // Filtering
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      if (activeTab === "active" && agent.status !== "Active") return false;
      if (activeTab === "pending" && agent.status !== "Pending Handover") return false;
      if (activeTab === "revoked" && agent.status !== "Revoked") return false;

      if (tierFilter !== "all" && agent.tier !== tierFilter) return false;

      if (boroughFilter !== "all") {
        if (
          boroughFilter === "kensington" &&
          !agent.portfolioScope.toLowerCase().includes("kensington")
        )
          return false;
        if (
          boroughFilter === "camden" &&
          !agent.portfolioScope.toLowerCase().includes("camden")
        )
          return false;
        if (
          boroughFilter === "richmond" &&
          !agent.portfolioScope.toLowerCase().includes("richmond")
        )
          return false;
      }

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        return (
          agent.name.toLowerCase().includes(q) ||
          agent.agency.toLowerCase().includes(q) ||
          agent.email.toLowerCase().includes(q) ||
          agent.portfolioScope.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [agents, activeTab, tierFilter, boroughFilter, searchQuery]);

  const totalPages = Math.ceil(filteredAgents.length / pageSize) || 1;
  const paginatedAgents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAgents.slice(start, start + pageSize);
  }, [filteredAgents, currentPage, pageSize]);

  const handleConfirmRevoke = () => {
    if (revokingAgent && onRevokeAgent) {
      onRevokeAgent(revokingAgent.id);
    }
    setRevokingAgent(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs overflow-hidden space-y-3">
      {/* 1. Header with Tab filters */}
      <div className="p-4 pb-0 border-b border-[#ECEEED] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-[#F9F9F8] p-1 rounded-xl w-full lg:w-auto overflow-x-auto">
          {[
            { key: "all", label: "All Agents", count: agents.length },
            { key: "active", label: "Active", count: counts.active },
            { key: "pending", label: "Pending Handover", count: counts.pending },
            { key: "revoked", label: "Revoked", count: counts.revoked },
          ].map((tab) => (
            <Button
              key={tab.key}
              type="button"
              variant={activeTab === tab.key ? "secondary" : "ghost"}
              size="sm"
              onClick={() => {
                setActiveTab(tab.key as TabStatus);
                setCurrentPage(1);
              }}
              className={`h-8 px-3 rounded-lg text-xs font-semibold cursor-pointer ${
                activeTab === tab.key
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeTab === tab.key
                    ? "bg-[#E8EFEA] text-brand font-bold"
                    : "bg-stone-200/60 text-stone-600"
                }`}
              >
                {tab.count}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* 2. Toolbar */}
      <div className="px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search agent name, agency, borough..."
            className="pl-9 h-9 bg-[#F9F9F8] border-[#ECEEED] text-xs rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <select
            value={tierFilter}
            onChange={(e) => {
              setTierFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-700 cursor-pointer outline-none"
          >
            <option value="all">Permission Tier: All</option>
            <option value="Full Management">Full Management</option>
            <option value="Maintenance + Communication">Maintenance + Communication</option>
            <option value="Maintenance-only">Maintenance-only</option>
          </select>

          <select
            value={boroughFilter}
            onChange={(e) => {
              setBoroughFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-9 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-700 cursor-pointer outline-none"
          >
            <option value="all">Assigned Boroughs: All</option>
            <option value="kensington">Kensington &amp; Chelsea</option>
            <option value="camden">Camden &amp; Islington</option>
            <option value="richmond">Richmond &amp; Surrey</option>
          </select>

          <div className="flex items-center bg-[#F9F9F8] border border-[#ECEEED] rounded-xl p-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={`h-7 w-7 p-1 rounded-lg cursor-pointer ${
                viewMode === "list"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={`h-7 w-7 p-1 rounded-lg cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 3. Main Data View */}
      {viewMode === "list" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#ECEEED] bg-[#F9F9F8] text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                <th className="py-3 px-4">Agent &amp; Agency</th>
                <th className="py-3 px-4">Permission Tier</th>
                <th className="py-3 px-4">Assigned Scope</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEEED]">
              {paginatedAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-stone-50/70 transition-colors">
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
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${agent.tierColor}`}
                    >
                      {agent.tier}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-stone-800">
                      {agent.propertiesCount} properties
                    </div>
                    <div className="text-[10px] text-stone-500">{agent.portfolioScope}</div>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${agent.statusColor}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {agent.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/agents/${agent.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-3 text-[11px] border-[#ECEEED] hover:bg-stone-50 rounded-lg cursor-pointer"
                        >
                          {agent.status === "Revoked" ? "View Audit Log" : "View"}
                        </Button>
                      </Link>

                      {agent.status !== "Revoked" && (
                        <>
                          <span className="text-stone-300">|</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setRevokingAgent(agent)}
                            className="h-7 px-2 py-1 text-rose-700 hover:text-rose-800 hover:bg-rose-50 rounded-lg text-xs font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Revoke…</span>
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {paginatedAgents.map((agent) => (
            <div
              key={agent.id}
              className="p-5 rounded-2xl bg-white border border-[#ECEEED] shadow-xs flex flex-col justify-between space-y-4 hover:border-stone-400 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-full bg-[#E8EFEA] text-brand font-bold flex items-center justify-center text-sm border border-[#ECEEED]">
                    {agent.initials}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${agent.statusColor}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {agent.status}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-stone-900 text-sm">{agent.name}</h3>
                  <p className="text-xs text-stone-500">{agent.agency}</p>
                  <p className="text-[10px] font-mono text-stone-400 mt-0.5">{agent.email}</p>
                </div>
              </div>

              <div className="py-3 border-y border-[#ECEEED] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Tier:</span>
                  <span className="font-semibold text-stone-800">{agent.tier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Portfolio:</span>
                  <span className="font-semibold text-stone-800">
                    {agent.propertiesCount} units
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Link href={`/agents/${agent.id}`}>
                  <Button variant="outline" size="sm" className="h-8 text-xs rounded-xl">
                    View Dossier
                  </Button>
                </Link>
                {agent.status !== "Revoked" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRevokingAgent(agent)}
                    className="h-8 text-xs text-rose-700 hover:bg-rose-50 rounded-xl"
                  >
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Footer Pagination */}
      <div className="p-4 border-t border-[#ECEEED] bg-[#F9F9F8] flex items-center justify-between text-xs text-stone-500">
        <span>
          Showing {filteredAgents.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
          {Math.min(currentPage * pageSize, filteredAgents.length)} of {filteredAgents.length} agents
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="h-7 px-3 bg-white text-xs cursor-pointer disabled:cursor-not-allowed"
          >
            Previous
          </Button>
          <span className="font-mono text-xs font-semibold text-stone-700">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="h-7 px-3 bg-white text-xs text-stone-900 cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Revocation Confirmation Modal */}
      {revokingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5 text-rose-700">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <h3 className="text-base font-bold text-stone-900">
                  Revoke Agency Delegation
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRevokingAgent(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you want to revoke management authority for{" "}
              <strong className="text-stone-900">{revokingAgent.name}</strong> (
              {revokingAgent.agency}) across {revokingAgent.propertiesCount} assigned units?
            </p>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Statutory Notice Requirement
              </div>
              <p className="text-[11px] leading-relaxed">
                {revokingAgent.revokeWarning}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setRevokingAgent(null)}
                className="h-8 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirmRevoke}
                className="h-8 text-xs bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-semibold"
              >
                Confirm Revocation &amp; Audit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
