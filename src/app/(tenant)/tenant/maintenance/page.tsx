"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, CheckCircle2, X, Phone, AlertTriangle, ShieldAlert } from "lucide-react";
import { MaintenanceTicket, INITIAL_TENANT_TICKETS } from "@/lib/mock/tenants";
import { TenantMaintenanceStats } from "@/components/tenant/maintenance/tenant-maintenance-stats";
import { TenantTicketLedger } from "@/components/tenant/maintenance/tenant-ticket-ledger";
import { NewTicketModal } from "@/components/tenant/maintenance/new-ticket-modal";
import { TicketDetailModal } from "@/components/tenant/maintenance/ticket-detail-modal";

function MaintenanceContent() {
  const searchParams = useSearchParams();
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(INITIAL_TENANT_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-open new ticket modal if URL has ?action=new
  useEffect(() => {
    if (searchParams.get("action") === "new") {
      setIsNewModalOpen(true);
    }
  }, [searchParams]);

  const handleSelectTicket = (ticket: MaintenanceTicket) => {
    setSelectedTicket(ticket);
    setIsDetailModalOpen(true);
  };

  const handleCreateTicket = (newTicket: MaintenanceTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
    setToastMessage(`Maintenance ticket ${newTicket.reference} logged successfully.`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECEEED] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8EFEA] px-2.5 py-0.5 text-xs font-semibold text-[#2A5240] w-fit mb-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            Tenant Portal • Flat 4B, 18 Kensington Gdns
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Maintenance &amp; Repairs
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Log repair tickets, upload photo evidence, and track dispatch status in real time.
          </p>
        </div>
      </div>

      {/* Toast Notification */}
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

      {/* Maintenance Stats */}
      <TenantMaintenanceStats
        tickets={tickets}
        onOpenEmergencyGuide={() => setIsEmergencyModalOpen(true)}
      />

      {/* Ticket Docket / Ledger */}
      <TenantTicketLedger
        tickets={tickets}
        onSelectTicket={handleSelectTicket}
        onOpenNewTicketModal={() => setIsNewModalOpen(true)}
      />

      {/* New Ticket Modal */}
      <NewTicketModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSubmit={handleCreateTicket}
      />

      {/* Ticket Detail Modal */}
      <TicketDetailModal
        ticket={selectedTicket}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      {/* Emergency Guide Modal */}
      {isEmergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-stone-900">
                  Out-of-Hours Emergency Protocol
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsEmergencyModalOpen(false)}
                className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              True emergencies warrant immediate contractor call-out outside normal hours
              (09:00–18:00 Mon–Fri). True emergencies constitute:
            </p>

            <ul className="text-xs text-stone-700 space-y-2 list-disc list-inside bg-stone-50 p-4 rounded-xl border border-stone-200">
              <li>Uncontrollable internal water burst or severe flooding</li>
              <li>Smell of gas or suspected carbon monoxide alarm</li>
              <li>Total loss of electrical power affecting safety (not area blackout)</li>
              <li>Complete loss of heating during adverse winter weather (&lt; 5°C)</li>
              <li>Insecure ground floor external doors or broken accessible windows</li>
            </ul>

            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
                  24/7 Haven Emergency Dispatch
                </div>
                <div className="text-lg font-bold text-rose-950 mt-0.5">0800 458 9120</div>
              </div>
              <a
                href="tel:08004589120"
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsEmergencyModalOpen(false)}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TenantMaintenancePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-stone-500">Loading Maintenance Desk...</div>}>
      <MaintenanceContent />
    </Suspense>
  );
}
