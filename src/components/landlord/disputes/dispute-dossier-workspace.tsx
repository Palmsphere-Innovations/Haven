"use client";

import React, { useState } from "react";
import {
  FileText,
  ShieldCheck,
  Download,
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Scale,
  User,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LandlordDisputeRecord,
  DisputeDocketItem,
  DisputeAuditMessage,
} from "@/lib/mock/landlord-disputes";
import { CounterOfferModal } from "./modals/counter-offer-modal";

interface DisputeDossierWorkspaceProps {
  dispute: LandlordDisputeRecord;
  onUpdateDispute: (updated: LandlordDisputeRecord) => void;
  onNotify: (msg: string) => void;
}

export const DisputeDossierWorkspace: React.FC<DisputeDossierWorkspaceProps> = ({
  dispute,
  onUpdateDispute,
  onNotify,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "evidence" | "chronology">("overview");
  const [messageText, setMessageText] = useState("");
  const [isCounterOfferOpen, setIsCounterOfferOpen] = useState(false);
  const [selectedDocPreview, setSelectedDocPreview] = useState<DisputeDocketItem | null>(null);

  // Send message / instruction in chronology
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMsg: DisputeAuditMessage = {
      id: `msg-${Date.now()}`,
      sender: "landlord",
      senderName: "Vance Holdings Executive",
      senderRole: "Landlord Asset Team",
      senderInitials: "VH",
      timestamp: "Just now",
      text: messageText.trim(),
    };

    const updated = {
      ...dispute,
      auditTrail: [...dispute.auditTrail, newMsg],
    };

    onUpdateDispute(updated);
    setMessageText("");
    onNotify("Formal Landlord instruction recorded & transmitted to agent.");
  };

  // Approve full concession / settlement
  const handleApproveSettlement = () => {
    const isAlreadyResolved = dispute.status === "resolved";
    if (isAlreadyResolved) {
      onNotify("Case is already closed and archived.");
      return;
    }

    const confirmMsg = `Authorize full settlement of £${dispute.claimAmount.toFixed(2)} for ${dispute.unit}? This will credit/deduct the funds and close the dispute.`;
    if (!window.confirm(confirmMsg)) return;

    const resolvedDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const newAudit: DisputeAuditMessage = {
      id: `msg-${Date.now()}`,
      sender: "landlord",
      senderName: "Vance Holdings Executive",
      senderRole: "Landlord Asset Team",
      senderInitials: "VH",
      timestamp: "Just now",
      text: `Executive settlement approved: Authorized sum of £${dispute.claimAmount.toFixed(2)}. Managing agent instructed to execute adjustment on upcoming statement. Dispute resolved.`,
      isActionLog: true,
    };

    const updated: LandlordDisputeRecord = {
      ...dispute,
      status: "resolved",
      statusLabel: "Resolved & Closed",
      agreedSettlement: dispute.claimAmount,
      outcome: `Landlord authorized settlement of £${dispute.claimAmount.toFixed(2)} in full satisfaction of claim.`,
      settledDate: resolvedDate,
      daysRemaining: 0,
      slaUrgent: false,
      auditTrail: [...dispute.auditTrail, newAudit],
    };

    onUpdateDispute(updated);
    onNotify(`Dispute #${dispute.reference} marked as Resolved. Settlement authorized.`);
  };

  // Submit counter offer
  const handleCounterOfferSubmit = (counterAmount: number, notes: string) => {
    const newAudit: DisputeAuditMessage = {
      id: `msg-${Date.now()}`,
      sender: "landlord",
      senderName: "Vance Holdings Executive",
      senderRole: "Landlord Asset Team",
      senderInitials: "VH",
      timestamp: "Just now",
      text: `Formal counter-proposal submitted: £${counterAmount.toFixed(2)}. Landlord Notes: ${notes || "Submitted under formal conciliation rules."}`,
      isActionLog: true,
    };

    const updated: LandlordDisputeRecord = {
      ...dispute,
      counterOfferAmount: counterAmount,
      status: "negotiating",
      statusLabel: "Counter-Offer Transmitted",
      auditTrail: [...dispute.auditTrail, newAudit],
    };

    onUpdateDispute(updated);
    onNotify(`Counter-offer of £${counterAmount.toFixed(2)} transmitted to agent & claimant.`);
  };

  // Escalate to statutory ADR / Legal
  const handleEscalateCase = () => {
    const newAudit: DisputeAuditMessage = {
      id: `msg-${Date.now()}`,
      sender: "landlord",
      senderName: "Vance Holdings Executive",
      senderRole: "Landlord Asset Team",
      senderInitials: "VH",
      timestamp: "Just now",
      text: "Landlord requested formal independent adjudication escalation. Dossier frozen and bundle referred to Scheme Arbitrator.",
      isActionLog: true,
    };

    const updated: LandlordDisputeRecord = {
      ...dispute,
      status: "under_review",
      statusLabel: "In Formal ADR Review",
      auditTrail: [...dispute.auditTrail, newAudit],
    };

    onUpdateDispute(updated);
    onNotify(`Dispute #${dispute.reference} escalated to formal statutory arbitration.`);
  };

  // Add mock evidence
  const handleAddEvidence = () => {
    const docName = prompt("Enter evidence document title:", "Contractor_Final_Worksheet.pdf");
    if (!docName) return;

    const newDoc: DisputeDocketItem = {
      id: `doc-${Date.now()}`,
      name: docName.endsWith(".pdf") ? docName : `${docName}.pdf`,
      type: "pdf",
      size: "1.2 MB",
      uploadedBy: "Vance Holdings Asset Team",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      description: "Supplemental evidence docket added by Landlord portfolio executive."
    };

    const newAudit: DisputeAuditMessage = {
      id: `msg-${Date.now()}`,
      sender: "landlord",
      senderName: "Vance Holdings Executive",
      senderRole: "Landlord Asset Team",
      senderInitials: "VH",
      timestamp: "Just now",
      text: `Uploaded supplemental evidence document: ${newDoc.name}.`,
      isActionLog: true,
    };

    const updated = {
      ...dispute,
      evidenceDocket: [...dispute.evidenceDocket, newDoc],
      auditTrail: [...dispute.auditTrail, newAudit],
    };

    onUpdateDispute(updated);
    onNotify(`Document "${newDoc.name}" uploaded to evidence docket.`);
  };

  // Download case summary
  const handleDownloadCaseSummary = () => {
    const lines = [
      `HAVEN ARBITRATION DOSSIER: ${dispute.reference}`,
      `Title: ${dispute.title}`,
      `Property: ${dispute.propertyAddress}`,
      `Unit: ${dispute.unit}`,
      `Tenant: ${dispute.tenantNames}`,
      `Managing Agent: ${dispute.managingAgent} (${dispute.agencyName})`,
      `Status: ${dispute.statusLabel}`,
      `Category: ${dispute.categoryLabel}`,
      `Statutory Scheme: ${dispute.statutoryScheme}`,
      `Claim Amount: £${dispute.claimAmount.toFixed(2)}`,
      `Counter Offer: £${(dispute.counterOfferAmount || 0).toFixed(2)}`,
      `Deposit in Escrow: £${dispute.depositHeld.toFixed(2)}`,
      `Remedy: ${dispute.remedyClaimed}`,
      `Landlord Position: ${dispute.landlordPosition}`,
      `Outcome: ${dispute.outcome || "Pending formal resolution"}`,
      "\n--- EVIDENCE DOCKET ---",
      ...dispute.evidenceDocket.map(
        (d) => `- ${d.name} (${d.size}) uploaded by ${d.uploadedBy} on ${d.date}`
      ),
      "\n--- CHRONOLOGY AUDIT TRAIL ---",
      ...dispute.auditTrail.map(
        (m) => `[${m.timestamp}] ${m.senderName} (${m.senderRole}): ${m.text}`
      ),
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `haven-case-dossier-${dispute.reference}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onNotify(`Dossier #${dispute.reference} downloaded successfully.`);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs overflow-hidden flex flex-col">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-stone-50 via-white to-stone-50/50 border-b border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-1">
              <span className="font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                #{dispute.reference}
              </span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="font-semibold text-stone-800">{dispute.unit}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{dispute.statutoryScheme}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {dispute.title}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              {dispute.propertyAddress} · Tenant: <strong className="text-stone-700">{dispute.tenantNames}</strong> · Agent: <strong className="text-stone-700">{dispute.managingAgent}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
            <Button
              variant="outline"
              onClick={handleDownloadCaseSummary}
              className="h-8 px-3 text-xs bg-white border-stone-200 text-stone-800 hover:bg-stone-50 rounded-xl cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
              Download Dossier
            </Button>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-2 mt-5 border-b border-stone-200/70 -mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "overview"
                ? "border-[#132A20] text-[#132A20]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Case Overview &amp; Financials
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("evidence")}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "evidence"
                ? "border-[#132A20] text-[#132A20]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Evidence Docket ({dispute.evidenceDocket.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("chronology")}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === "chronology"
                ? "border-[#132A20] text-[#132A20]"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            Audit Chronology ({dispute.auditTrail.length})
          </button>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="p-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Financial Ledger & Exposure Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200">
              <div>
                <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                  Deposit Held (Escrow)
                </span>
                <div className="text-xl font-bold font-mono text-stone-900 mt-1 tabular-nums">
                  £{dispute.depositHeld.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-stone-500">TDS Protected</span>
              </div>

              <div>
                <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                  Claimed Remedy Sum
                </span>
                <div className="text-xl font-bold font-mono text-rose-800 mt-1 tabular-nums">
                  £{dispute.claimAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-rose-700 font-medium">Contested Sum</span>
              </div>

              <div>
                <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                  Landlord Counter-Offer
                </span>
                <div className="text-xl font-bold font-mono text-stone-900 mt-1 tabular-nums">
                  {dispute.counterOfferAmount && dispute.counterOfferAmount > 0
                    ? `£${dispute.counterOfferAmount.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`
                    : "None Recorded"}
                </div>
                <span className="text-[11px] text-stone-500">Current settlement stance</span>
              </div>

              <div>
                <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                  Net Variance
                </span>
                <div className="text-xl font-bold font-mono text-stone-900 mt-1 tabular-nums">
                  £{(dispute.claimAmount - (dispute.counterOfferAmount || 0)).toLocaleString("en-GB", { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-stone-500">Gap to resolution</span>
              </div>
            </div>

            {/* Case Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Claim Statement */}
              <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                  <User className="w-4 h-4 text-stone-500" />
                  <span>Claimant Grounds &amp; Desired Remedy</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed bg-stone-50/70 p-3 rounded-lg border border-stone-100">
                  {dispute.remedyClaimed}
                </p>
                <div className="text-[11px] text-stone-500">
                  Filed by: <strong>{dispute.tenantNames}</strong> ({dispute.tenantEmail})
                </div>
              </div>

              {/* Right Column: Landlord Stance & Agent Assessment */}
              <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                  <ShieldCheck className="w-4 h-4 text-[#132A20]" />
                  <span>Landlord Stance &amp; Agent Advisory</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed bg-stone-50/70 p-3 rounded-lg border border-stone-100">
                  {dispute.landlordPosition}
                </p>
                <div className="text-[11px] text-stone-500">
                  Managing Lead: <strong>{dispute.managingAgent}</strong> · {dispute.agencyName}
                </div>
              </div>
            </div>

            {/* Statutory ADR Timeline & Deadlines */}
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                  <Clock className="w-4 h-4 text-stone-500" />
                  <span>Statutory Timetable &amp; Adjudication Benchmarks</span>
                </div>
                {dispute.status === "resolved" ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Settled on {dispute.settledDate || "Record"}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    {dispute.daysRemaining} days remaining for response
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">Date Lodged</span>
                  <span className="font-semibold text-stone-900">{dispute.openedDate}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">Statutory Deadline</span>
                  <span className="font-semibold text-stone-900">{dispute.deadlineDate}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 block">Governing Scheme</span>
                  <span className="font-semibold text-stone-900 truncate block">{dispute.statutoryScheme}</span>
                </div>
              </div>
            </div>

            {/* Resolved Outcome Banner (if resolved) */}
            {dispute.outcome && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-950">Binding Outcome Recorded</h4>
                  <p className="mt-0.5 leading-relaxed">{dispute.outcome}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: EVIDENCE DOCKET */}
        {activeTab === "evidence" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Verified Evidence Docket &amp; Condition Schedules
                </h3>
                <p className="text-xs text-stone-500">
                  Certified inventory reports, contractor work sheets, photo schedules, and statutory notices.
                </p>
              </div>
              <Button
                size="sm"
                onClick={handleAddEvidence}
                className="h-8 px-3 bg-[#132A20] hover:bg-[#0b1b14] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Attach Evidence
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {dispute.evidenceDocket.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocPreview(doc)}
                  className="p-3.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 transition-all flex flex-col justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 group-hover:bg-[#132A20] group-hover:text-white transition-colors">
                      <FileText className="w-4 h-4 text-stone-600 group-hover:text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-semibold text-stone-900 truncate">
                        {doc.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-2">
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                    <span>Uploaded by {doc.uploadedBy}</span>
                    <span className="font-mono text-stone-700 font-medium">{doc.size}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CHRONOLOGY */}
        {activeTab === "chronology" && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Multi-Party Audit Thread &amp; Statutory Chronology
              </h3>
              <p className="text-xs text-stone-500">
                Verifiable time-stamped communications between Landlord, Letting Agent, Tenant, and Arbitrators.
              </p>
            </div>

            {/* Thread timeline */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto p-3 rounded-xl bg-stone-50 border border-stone-200">
              {dispute.auditTrail.map((msg) => {
                const isLandlord = msg.sender === "landlord";
                const isAgent = msg.sender === "agent";
                const isArbitrator = msg.sender === "arbitrator";
                const isSystem = msg.sender === "system";

                if (isSystem || msg.isActionLog) {
                  return (
                    <div
                      key={msg.id}
                      className="p-2.5 rounded-lg bg-white border border-stone-200 text-xs text-stone-600 flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                      <div className="flex-1">
                        <span className="font-semibold text-stone-800">{msg.senderName}</span>: {msg.text}
                      </div>
                      <span className="text-[10px] text-stone-400 shrink-0 font-mono">{msg.timestamp}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-xl border text-xs ${
                      isLandlord
                        ? "bg-[#132A20]/[0.03] border-[#132A20]/30 ml-4"
                        : isArbitrator
                        ? "bg-amber-50/70 border-amber-200"
                        : "bg-white border-stone-200 mr-4"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${
                            isLandlord
                              ? "bg-[#132A20] text-white"
                              : isAgent
                              ? "bg-emerald-700 text-white"
                              : isArbitrator
                              ? "bg-amber-700 text-white"
                              : "bg-stone-300 text-stone-800"
                          }`}
                        >
                          {msg.senderInitials}
                        </span>
                        <strong className="text-stone-900 font-semibold">{msg.senderName}</strong>
                        <span className="text-[11px] text-stone-500 font-normal">({msg.senderRole})</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-stone-800 leading-relaxed pl-8">
                      {msg.text}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Landlord Message Submission Box */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Log formal landlord instruction or note to letting agent..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1 h-10 px-3.5 rounded-xl border border-stone-300 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20]"
              />
              <Button
                type="submit"
                disabled={!messageText.trim()}
                className="h-10 px-4 bg-[#132A20] hover:bg-[#0b1b14] text-white rounded-xl text-xs font-semibold shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Post Instruction
              </Button>
            </form>
          </div>
        )}

        {/* BOTTOM ACTION SUITE (Landlord Decision Controls) */}
        <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-50/70 -mx-6 -mb-6 p-4 px-6 rounded-b-2xl">
          <div className="text-xs text-stone-600">
            Current Case Stance: <strong className="text-stone-900">{dispute.statusLabel}</strong>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto justify-end">
            {dispute.status !== "resolved" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsCounterOfferOpen(true)}
                  className="h-9 px-3.5 bg-white hover:bg-stone-50 border-stone-200 text-stone-800 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
                  Submit Counter-Offer
                </Button>

                <Button
                  variant="outline"
                  onClick={handleEscalateCase}
                  className="h-9 px-3.5 bg-white hover:bg-stone-50 border-amber-200 text-amber-900 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                  Escalate to Tribunal / ADR
                </Button>

                <Button
                  onClick={handleApproveSettlement}
                  className="h-9 px-4 bg-[#132A20] hover:bg-[#0b1b14] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                  Authorize Settlement (£{dispute.claimAmount.toFixed(2)})
                </Button>
              </>
            )}

            {dispute.status === "resolved" && (
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Case Closed &amp; Reconciled
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Counter Offer Modal */}
      <CounterOfferModal
        dispute={dispute}
        isOpen={isCounterOfferOpen}
        onClose={() => setIsCounterOfferOpen(false)}
        onSubmit={handleCounterOfferSubmit}
      />

      {/* Document Preview Modal */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#132A20]" />
                <h4 className="text-sm font-bold text-stone-900 truncate">
                  {selectedDocPreview.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocPreview(null)}
                className="text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            </div>

            <div className="py-4 text-xs space-y-2 text-stone-600">
              <p className="text-stone-800 font-medium">{selectedDocPreview.description}</p>
              <div className="p-3 bg-stone-50 rounded-xl space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-stone-500">File Size:</span>
                  <span className="font-mono text-stone-800">{selectedDocPreview.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Uploaded By:</span>
                  <span className="text-stone-800">{selectedDocPreview.uploadedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Upload Date:</span>
                  <span className="text-stone-800">{selectedDocPreview.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDocPreview(null)}
                className="text-xs rounded-xl"
              >
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onNotify(`Downloaded "${selectedDocPreview.name}"`);
                  setSelectedDocPreview(null);
                }}
                className="bg-[#132A20] text-white text-xs font-semibold rounded-xl"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                Download Copy
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
