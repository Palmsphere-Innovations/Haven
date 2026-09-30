"use client";

import React, { useState, useMemo } from "react";
import { CheckCircle2, X } from "lucide-react";
import {
  INITIAL_LANDLORD_DISPUTES,
  LandlordDisputeRecord,
} from "@/lib/mock/landlord-disputes";
import { DisputesHeader } from "@/components/landlord/disputes/disputes-header";
import { DisputesStats } from "@/components/landlord/disputes/disputes-stats";
import { DisputesLedger } from "@/components/landlord/disputes/disputes-ledger";
import { DisputeDossierWorkspace } from "@/components/landlord/disputes/dispute-dossier-workspace";
import { RaiseClaimModal } from "@/components/landlord/disputes/modals/raise-claim-modal";

export default function LandlordDisputesPage() {
  const [disputes, setDisputes] = useState<LandlordDisputeRecord[]>(
    INITIAL_LANDLORD_DISPUTES
  );
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(
    INITIAL_LANDLORD_DISPUTES[0]?.id || null
  );
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Trigger feedback toast
  const triggerNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter disputes
  const filteredDisputes = useMemo(() => {
    return disputes.filter((d) => {
      // Tab filter
      if (selectedTab !== "all" && d.status !== selectedTab) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "all" && d.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesRef = d.reference.toLowerCase().includes(query);
        const matchesProperty =
          d.propertyAddress.toLowerCase().includes(query) ||
          d.unit.toLowerCase().includes(query);
        const matchesTenant = d.tenantNames.toLowerCase().includes(query);
        const matchesAgent = d.managingAgent.toLowerCase().includes(query);
        const matchesTitle = d.title.toLowerCase().includes(query);
        return (
          matchesRef ||
          matchesProperty ||
          matchesTenant ||
          matchesAgent ||
          matchesTitle
        );
      }
      return true;
    });
  }, [disputes, selectedTab, selectedCategory, searchQuery]);

  // Selected dispute object
  const selectedDispute = useMemo(() => {
    return disputes.find((d) => d.id === selectedDisputeId) || disputes[0] || null;
  }, [disputes, selectedDisputeId]);

  // Handle dispute update from dossier
  const handleUpdateDispute = (updated: LandlordDisputeRecord) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
    );
  };

  // Handle newly registered claim
  const handleAddDispute = (newDispute: LandlordDisputeRecord) => {
    setDisputes((prev) => [newDispute, ...prev]);
    setSelectedDisputeId(newDispute.id);
    setSelectedTab("all");
    setSelectedCategory("all");
    triggerNotification(
      `Claim #${newDispute.reference} successfully lodged for ${newDispute.unit}.`
    );
  };

  // Export full portfolio dispute docket CSV
  const handleExportCsv = () => {
    const headers = [
      "Reference",
      "Property",
      "Unit",
      "Tenant",
      "Managing Agent",
      "Category",
      "Status",
      "Claim Amount (GBP)",
      "Deposit Escrow (GBP)",
      "Statutory Scheme",
      "Opened Date",
      "Statutory Deadline",
    ];

    const rows = disputes.map((d) => [
      `"${d.reference}"`,
      `"${d.propertyAddress.replace(/"/g, '""')}"`,
      `"${d.unit}"`,
      `"${d.tenantNames}"`,
      `"${d.managingAgent}"`,
      `"${d.categoryLabel}"`,
      `"${d.statusLabel}"`,
      d.claimAmount.toFixed(2),
      d.depositHeld.toFixed(2),
      `"${d.statutoryScheme}"`,
      `"${d.openedDate}"`,
      `"${d.deadlineDate}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `haven-portfolio-disputes-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification("Portfolio dispute register (CSV) exported.");
  };

  const actionRequiredCount = disputes.filter(
    (d) => d.status === "action_required"
  ).length;

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#132A20] text-white px-4 py-3 rounded-2xl shadow-xl border border-white/20 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-stone-300 hover:text-white ml-2 p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <DisputesHeader
        totalDisputes={disputes.length}
        actionRequiredCount={actionRequiredCount}
        onRaiseClaim={() => setIsRaiseModalOpen(true)}
        onExportCsv={handleExportCsv}
      />

      {/* Stats KPI Row */}
      <DisputesStats disputes={disputes} />

      {/* Main Ledger List */}
      <DisputesLedger
        disputes={filteredDisputes}
        selectedDisputeId={selectedDispute?.id || null}
        onSelectDispute={(id) => {
          setSelectedDisputeId(id);
          // Smooth scroll to workspace if on mobile
          const element = document.getElementById("active-dossier-workspace");
          if (element && window.innerWidth < 1024) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onResetFilters={() => {
          setSelectedTab("all");
          setSelectedCategory("all");
          setSearchQuery("");
        }}
      />

      {/* Active Dispute Detailed Dossier Workspace */}
      <div id="active-dossier-workspace" className="pt-2">
        {selectedDispute ? (
          <DisputeDossierWorkspace
            dispute={selectedDispute}
            onUpdateDispute={handleUpdateDispute}
            onNotify={triggerNotification}
          />
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 text-xs">
            No dispute selected. Choose a case file from the ledger above to inspect the dossier.
          </div>
        )}
      </div>

      {/* Raise Claim Modal */}
      <RaiseClaimModal
        isOpen={isRaiseModalOpen}
        onClose={() => setIsRaiseModalOpen(false)}
        onSubmit={handleAddDispute}
      />

      {/* Footer Regulatory Reference */}
      <footer className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500 border-t border-[#ECEEED]">
        <p>
          Governed under the Housing Act 1988, Tenant Fees Act 2019 &amp; Tenancy Deposit Scheme ADR Arbitration Procedures.
        </p>
        <span className="font-mono text-[10px] text-stone-400">
          HAVEN AUDIT PROTOCOL · EN-GB STATUTORY COMPLIANT
        </span>
      </footer>
    </div>
  );
}
