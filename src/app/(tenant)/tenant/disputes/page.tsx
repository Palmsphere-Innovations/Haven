"use client";

import React, { useState, useMemo } from "react";
import { DisputeHeader } from "@/components/tenant/disputes/dispute-header";
import { DisputeMetricsRow } from "@/components/tenant/disputes/dispute-metrics-row";
import { DisputeLedgerTable } from "@/components/tenant/disputes/dispute-ledger-table";
import { DisputeDetailWorkspace } from "@/components/tenant/disputes/dispute-detail-workspace";
import { DisputeAdvisorySidebar } from "@/components/tenant/disputes/dispute-advisory-sidebar";
import { RaiseDisputeModal, RaiseDisputeFormData } from "@/components/tenant/disputes/modal/raise-dispute-modal";
import { DisputeRecord, DisputeChatMessage } from "@/types/index";
import { Calendar, CheckCircle2, ShieldAlert, X } from "lucide-react";

const INITIAL_DISPUTES: DisputeRecord[] = [
  {
    id: "dsp-1",
    reference: "DSP-2024-0982",
    category: "maintenance",
    categoryLabel: "Maintenance",
    title: "En-suite Radiator Remediation & Heating Interruption Credit",
    status: "under_review",
    statusLabel: "Under Review",
    openedDate: "04 Oct 2024 (10 days ago)",
    remedy: "Rent deduction / operational credit of £185.00.",
    isSelected: true,
  },
  {
    id: "dsp-2",
    reference: "DSP-2023-0411",
    category: "deposit",
    categoryLabel: "Deposit",
    title: "Check-in Inventory Discrepancy — Living Room Parquet Scuff",
    status: "resolved",
    statusLabel: "Resolved",
    openedDate: "12 Dec 2023",
    remedy: "Notation only",
    outcome: "Mutually agreed notation added to inventory docket without deposit deduction.",
    settledTime: "Settled in 48 hrs",
    isSelected: false,
  },
  {
    id: "dsp-3",
    reference: "DSP-2024-0750",
    category: "rent",
    categoryLabel: "Rent",
    title: "Communal Service Charge Calculation Clarification",
    status: "resolved",
    statusLabel: "Resolved",
    openedDate: "18 Aug 2024",
    remedy: "Invoice correction",
    outcome: "Direct breakdown provided by Eleanor Vance; adjusted in August invoice run.",
    settledTime: "Settled in 4 days",
    isSelected: false,
  },
];

const INITIAL_CHAT_MESSAGES: DisputeChatMessage[] = [
  {
    id: "m-1",
    sender: "agent",
    senderName: "Eleanor Vance (Letting Agent)",
    senderInitials: "EV",
    timestamp: "08 Oct • 15:42",
    text: "Good afternoon Oliver. I have reviewed your submission regarding the radiator failure. Apex Heating confirmed the faulty TRV has now been inspected. We are discussing the £185 concession with Alistair Vance to credit against November's rental run.",
  },
  {
    id: "m-2",
    sender: "tenant",
    senderName: "Oliver Davies (Tenant)",
    senderInitials: "OD",
    timestamp: "08 Oct • 16:05",
    text: "Thanks Eleanor, appreciate the update. Please let me know once Vance Holdings signs off so we can adjust the upcoming November Direct Debit mandate.",
  },
];

export default function TenantDisputesPage() {
  const [disputes, setDisputes] = useState<DisputeRecord[]>(INITIAL_DISPUTES);
  const [selectedTab, setSelectedTab] = useState("all");
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRightsGuideOpen, setIsRightsGuideOpen] = useState(false);
  const [isMediationCallOpen, setIsMediationCallOpen] = useState(false);
  const [callSlot, setCallSlot] = useState("Tomorrow at 11:30 AM");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [chatMessages, setChatMessages] = useState<DisputeChatMessage[]>(INITIAL_CHAT_MESSAGES);

  const activeDispute = useMemo(() => {
    return disputes.find((d) => d.isSelected) || disputes[0];
  }, [disputes]);

  const filteredDisputes = useMemo(() => {
    if (selectedTab === "all") return disputes;
    return disputes.filter((d) => d.status === selectedTab);
  }, [disputes, selectedTab]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleSelectDispute = (id: string) => {
    setDisputes((prev) =>
      prev.map((d) => ({
        ...d,
        isSelected: d.id === id,
      }))
    );
  };

  const handleSendMessage = (text: string) => {
    const newMsg: DisputeChatMessage = {
      id: `m-${Date.now()}`,
      sender: "tenant",
      senderName: "Oliver Davies (Tenant)",
      senderInitials: "OD",
      timestamp: "Just now",
      text,
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Simulated Adjudicator response after 1.5s
    setTimeout(() => {
      const responseMsg: DisputeChatMessage = {
        id: `m-adj-${Date.now()}`,
        sender: "agent",
        senderName: "Eleanor Vance (Adjudicator)",
        senderInitials: "EV",
        timestamp: "Just now",
        text: `Formal confirmation recorded for Case #${activeDispute.reference}: "${text.slice(0, 60)}...". Docket updated.`,
      };
      setChatMessages((prev) => [...prev, responseMsg]);
    }, 1500);
  };

  const handleRaiseDisputeSubmit = (formData: RaiseDisputeFormData) => {
    setIsModalOpen(false);
    const newReference = `DSP-2024-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: DisputeRecord = {
      id: `dsp-${Date.now()}`,
      reference: newReference,
      category: formData.category as any,
      categoryLabel: formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
      title: formData.title,
      status: "under_review",
      statusLabel: "Under Review",
      openedDate: "Today",
      remedy: `Sought remedy: £${formData.value || "0.00"}`,
      isSelected: true,
    };

    setDisputes((prev) => [
      newRecord,
      ...prev.map((d) => ({ ...d, isSelected: false })),
    ]);

    showNotification(
      `Dispute "${formData.title}" submitted under Case #${newReference}. Adjudicator notified.`
    );
  };

  const handleDownloadRecord = () => {
    const content = `HAVEN TENANCY ALTERNATIVE DISPUTE RESOLUTION DOCKET
============================================================
Case Reference: ${activeDispute.reference}
Category: ${activeDispute.categoryLabel}
Case Title: ${activeDispute.title}
Status: ${activeDispute.statusLabel}
Demised Premises: Flat 4B, 18 Kensington Gardens, London W2 4QH
Tenant: Oliver Davies
Managing Agent: Eleanor Vance (Prime Heritage Management)
Remedy Sought: ${activeDispute.remedy}
Formal Outcome: ${activeDispute.outcome || "Pending formal agreement"}

CERTIFIED EXHIBITS:
1. Exhibit_A_Photographs.jpg
2. Engineer_JobSheet.pdf
3. Tenancy_Schedule_Extract.csv

ARBITRATION CHAT MESSAGES LOGGED: ${chatMessages.length}
============================================================
Registered under the Landlord and Tenant Act 1985 (Section 11).`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Dispute-Docket-${activeDispute.reference}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification(`Case record for #${activeDispute.reference} downloaded.`);
  };

  const handleBookMediationCall = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMediationCallOpen(false);
    showNotification(`Mediation call booked with Eleanor Vance for ${callSlot}. Calendar invite sent.`);
  };

  return (
    <div className="min-h-screen py-4 px-2 sm:px-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Floating Notification */}
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

        <DisputeHeader
          onDownloadRecord={handleDownloadRecord}
          onRaiseDispute={() => setIsModalOpen(true)}
          showToast={showToast}
          onDismissToast={() => setShowToast(false)}
        />

        <DisputeMetricsRow disputes={disputes} />

        <DisputeLedgerTable
          disputes={filteredDisputes}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          onSelectDispute={handleSelectDispute}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <DisputeDetailWorkspace
              activeDispute={activeDispute}
              chatMessages={chatMessages}
              onSendMessage={handleSendMessage}
            />
          </div>

          <div className="lg:col-span-4">
            <DisputeAdvisorySidebar
              onReadRightsGuide={() => setIsRightsGuideOpen(true)}
              onScheduleCall={() => setIsMediationCallOpen(true)}
            />
          </div>
        </div>

        {/* Raise Dispute Modal */}
        <RaiseDisputeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRaiseDisputeSubmit}
        />

        {/* Tenant Rights Guide Modal */}
        {isRightsGuideOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-xl p-6 shadow-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-emerald-800" />
                  <h3 className="text-base font-bold text-stone-900">
                    UK Tenant Statutory Rights Guide
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRightsGuideOpen(false)}
                  className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block mb-1">
                    Section 11, Landlord and Tenant Act 1985
                  </strong>
                  Your landlord is legally obligated to keep in repair the structure and exterior of the dwelling-house, and to keep in repair and proper working order the installations for water, heating, and sanitation.
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block mb-1">
                    Retaliatory Eviction Protection (Deregulation Act 2015)
                  </strong>
                  Where a tenant has made a legitimate written repair complaint and the local housing authority has served an improvement notice, a landlord cannot serve a valid Section 21 eviction notice for 6 months.
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block mb-1">
                    Deposit Dispute Protection (Housing Act 2004)
                  </strong>
                  Any deductions proposed from your £2,826.92 custodial deposit must be backed by evidence (check-in inventory vs check-out inventory). Disputed sums remain locked in DPS custody until mutually settled.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRightsGuideOpen(false)}
                className="w-full py-2.5 bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Understood &amp; Close Guide
              </button>
            </div>
          </div>
        )}

        {/* Mediation Call Booking Modal */}
        {isMediationCallOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-800" />
                  <h3 className="text-base font-bold text-stone-900">
                    Book Mediation Conference Call
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMediationCallOpen(false)}
                  className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleBookMediationCall} className="space-y-4 pt-4">
                <p className="text-xs text-stone-600 leading-relaxed">
                  Book a direct 15-minute phone or video arbitration session with{" "}
                  <strong>Eleanor Vance</strong> regarding Case #{activeDispute.reference}.
                </p>

                <div className="space-y-2">
                  {[
                    "Tomorrow at 11:30 AM",
                    "Thursday at 14:00 BST",
                    "Friday at 10:00 BST",
                    "Next Monday at 16:30 BST",
                  ].map((slot) => (
                    <label
                      key={slot}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer text-xs font-semibold ${
                        callSlot === slot
                          ? "bg-[#E8EFEA] border-[#2A5240]/40 text-[#132A20]"
                          : "bg-stone-50 border-stone-200 text-stone-700"
                      }`}
                    >
                      <span>{slot}</span>
                      <input
                        type="radio"
                        name="slot"
                        checked={callSlot === slot}
                        onChange={() => setCallSlot(slot)}
                        className="accent-[#132A20]"
                      />
                    </label>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMediationCallOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Confirm Call Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}