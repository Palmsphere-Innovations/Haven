"use client";

import React, { useState } from "react";
import { Download, UserPlus, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentMetrics } from "@/components/landlord/agents/agents-metrics";
import { AgentsTable } from "@/components/landlord/agents/agents-table";
import { AgentComplianceBanner } from "@/components/landlord/agents/agents-compliance-banner";
import { agentsData, type AgentRecord } from "@/lib/mock/agents";

export default function LandlordAgentsPage() {
  const [agents, setAgents] = useState<AgentRecord[]>(agentsData);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [inviteForm, setInviteForm] = useState({
    name: "",
    agency: "",
    email: "",
    phone: "",
    tier: "Full Management" as AgentRecord["tier"],
    portfolioScope: "Kensington & Westminster",
  });

  const handleExportCSV = () => {
    const headers = [
      "Agent Name",
      "Agency",
      "Email",
      "Phone",
      "Permission Tier",
      "Status",
      "Assigned Properties",
      "Portfolio Scope",
      "Auth ID",
    ];

    const rows = agents.map((a) => [
      `"${a.name}"`,
      `"${a.agency}"`,
      `"${a.email}"`,
      `"${a.phone}"`,
      `"${a.tier}"`,
      `"${a.status}"`,
      `"${a.propertiesCount}"`,
      `"${a.portfolioScope}"`,
      `"${a.authId}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `haven-agents-registry-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotice("Agents Registry (CSV) exported successfully.");
    setTimeout(() => setNotice(null), 3500);
  };

  const handleInviteAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) return;

    const initials = inviteForm.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    const newAgent: AgentRecord = {
      id: `ag-${Date.now()}`,
      name: inviteForm.name,
      initials: initials || "AG",
      agency: inviteForm.agency || "Independent Chartered Surveyor",
      email: inviteForm.email,
      phone: inviteForm.phone || "+44 20 7946 0999",
      location: "London, UK",
      assignedDate: "Today",
      authId: `#UK-AG-${Math.floor(1000 + Math.random() * 9000)}`,
      tier: inviteForm.tier,
      tierColor:
        inviteForm.tier === "Full Management"
          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
          : "bg-blue-50 text-blue-800 border-blue-200",
      propertiesCount: 0,
      portfolioScope: inviteForm.portfolioScope,
      status: "Active",
      statusColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      revokeWarning: "Standard 30-day notice required under Section 4 Agency Agreement.",
      assignedPropertyCodes: [],
    };

    setAgents((prev) => [newAgent, ...prev]);
    setIsInviteOpen(false);
    setInviteForm({
      name: "",
      agency: "",
      email: "",
      phone: "",
      tier: "Full Management",
      portfolioScope: "Kensington & Westminster",
    });
    setNotice(`Management mandate invitation dispatched to ${newAgent.name} (${newAgent.email}).`);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleRevokeAgent = (agentId: string) => {
    setAgents((prev) =>
      prev.map((a) =>
        a.id === agentId
          ? {
              ...a,
              status: "Revoked",
              statusColor: "bg-rose-50 text-rose-800 border-rose-200",
            }
          : a
      )
    );
    setNotice("Agent delegation revoked. Cryptographic audit trail recorded.");
    setTimeout(() => setNotice(null), 3500);
  };

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
            {agents.length} licensed managing agents across your portfolio. Role-based delegation active.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="h-9 px-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-stone-500 mr-1.5" />
            Export Registry (CSV)
          </Button>
          <Button
            onClick={() => setIsInviteOpen(true)}
            className="h-9 px-4 bg-brand hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            Invite Agent
          </Button>
        </div>
      </div>

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Modular Section Components */}
      <AgentMetrics />
      <AgentsTable agents={agents} onRevokeAgent={handleRevokeAgent} />
      <AgentComplianceBanner />

      {/* Invite Agent Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleInviteAgent}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#ECEEED]">
              <h2 className="text-base font-bold text-stone-900">
                Grant Agency Management Mandate
              </h2>
              <button
                type="button"
                onClick={() => setIsInviteOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Agent Full Name
              </label>
              <input
                required
                value={inviteForm.name}
                onChange={(e) =>
                  setInviteForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="e.g. Arabella Campbell"
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Agency / Practice Name
              </label>
              <input
                required
                value={inviteForm.agency}
                onChange={(e) =>
                  setInviteForm((p) => ({ ...p, agency: e.target.value }))
                }
                placeholder="e.g. Chestertons Prime Lettings"
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) =>
                    setInviteForm((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="agent@agency.co.uk"
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Telephone Contact
                </label>
                <input
                  value={inviteForm.phone}
                  onChange={(e) =>
                    setInviteForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  placeholder="+44 20 ..."
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Permission Tier
                </label>
                <select
                  value={inviteForm.tier}
                  onChange={(e) =>
                    setInviteForm((p) => ({
                      ...p,
                      tier: e.target.value as AgentRecord["tier"],
                    }))
                  }
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
                >
                  <option value="Full Management">Full Management</option>
                  <option value="Maintenance + Communication">
                    Maintenance + Communication
                  </option>
                  <option value="Maintenance-only">Maintenance-only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Borough Delegation
                </label>
                <select
                  value={inviteForm.portfolioScope}
                  onChange={(e) =>
                    setInviteForm((p) => ({
                      ...p,
                      portfolioScope: e.target.value,
                    }))
                  }
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
                >
                  <option value="Kensington & Westminster">
                    Kensington &amp; Westminster
                  </option>
                  <option value="Camden & Islington">Camden &amp; Islington</option>
                  <option value="Richmond & Surrey">Richmond &amp; Surrey</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#ECEEED]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsInviteOpen(false)}
                className="h-8 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-8 text-xs bg-brand hover:bg-[#1E3A2E] text-white rounded-xl"
              >
                Dispatch Mandate
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
