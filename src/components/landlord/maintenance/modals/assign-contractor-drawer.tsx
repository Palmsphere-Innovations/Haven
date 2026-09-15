"use client";

import React, { useState } from "react";
import { X, Clock, UploadCloud, CheckCircle2, ShieldCheck, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MaintenanceTicket } from "@/components/landlord/maintenance/maintenance-table";

interface AssignContractorDrawerProps {
  ticket: MaintenanceTicket;
  onClose: () => void;
  onUpdate: (updatedTicket: MaintenanceTicket) => void;
}

export function AssignContractorDrawer({
  ticket,
  onClose,
  onUpdate,
}: AssignContractorDrawerProps) {
  const [status, setStatus] = useState<MaintenanceTicket["status"]>(ticket.status);
  const [contractor, setContractor] = useState(
    ticket.contractor === "Unassigned" ? "Pimlico Plumbers" : ticket.contractor
  );
  const [quoteAmount, setQuoteAmount] = useState("350.00");

  const handleSave = () => {
    onUpdate({
      ...ticket,
      contractor,
      contractorSub: `Approved Quote: £${quoteAmount}`,
      status,
      isUnassigned: false,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dispatch-title"
    >
      <aside className="h-full w-full max-w-2xl bg-white border-l border-[#ECEEED] shadow-2xl p-8 flex flex-col justify-between overflow-y-auto">
        {/* Header Block */}
        <div className="space-y-6">
          <div className="flex items-start justify-between border-b border-[#ECEEED] pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-stone-900 bg-[#F0F2F1] border border-[#ECEEED] px-2 py-0.5 rounded-md">
                  {ticket.code}
                </span>
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                  Dispatch &amp; Operations
                </span>
              </div>
              <h2 id="dispatch-title" className="mt-2 text-xl font-bold text-stone-900">
                {ticket.issue}
              </h2>
              <p className="mt-1 text-xs text-stone-500">
                {ticket.property} • {ticket.address}
              </p>
            </div>
            <button
              type="button"
              aria-label="Close drawer"
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Active SLA Countdown Card */}
          <div className="p-4 rounded-2xl bg-[#132A20] text-white shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-rose-400 opacity-75" />
                <Clock className="w-5 h-5 text-rose-300 relative" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {ticket.priority} SLA Response Active
                </div>
                <div className="text-[11px] text-[#A3B8AD]">Target response time within 4 hours</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono font-bold text-emerald-300">1h 25m</div>
              <div className="text-[10px] text-[#A3B8AD]">Remaining</div>
            </div>
          </div>

          {/* Timeline Audit */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Ticket Audit Trail
            </h3>
            <div className="space-y-3 border-l-2 border-[#ECEEED] pl-4 py-1 text-xs text-stone-600">
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-white" />
                <strong className="text-stone-900">Today 06:45</strong> — Request logged by tenant (
                {ticket.tenant})
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-stone-300 ring-4 ring-white" />
                <strong className="text-stone-900">Today 07:10</strong> — Dispatch review initialized by
                landlord vault
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-amber-500 ring-4 ring-white" />
                <strong className="text-stone-900">Now</strong> — Awaiting formal contractor assignment &amp;
                quote sign-off
              </div>
            </div>
          </div>

          {/* Dispatch Settings */}
          <div className="space-y-4 pt-4 border-t border-[#ECEEED]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Contractor &amp; Job Details
            </h3>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-stone-500" />
                Assigned Trade Contractor
              </span>
              <select
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                className="w-full h-10 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-800 focus:bg-white focus:ring-1 focus:ring-stone-400 focus:outline-none"
              >
                <option>Pimlico Plumbers (Gas Safe #51209)</option>
                <option>Apex Electrical (NICEIC #3301)</option>
                <option>Aspect Property Surveyors (RICS)</option>
                <option>London Joinery Co</option>
              </select>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-stone-700">Job Status</span>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as MaintenanceTicket["status"])}
                  className="w-full h-10 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-800 focus:bg-white focus:ring-1 focus:ring-stone-400 focus:outline-none"
                >
                  <option>Submitted</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-stone-700">Approved Quote</span>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-stone-400 font-mono">£</span>
                  <input
                    type="text"
                    value={quoteAmount}
                    onChange={(e) => setQuoteAmount(e.target.value)}
                    className="w-full h-10 pl-7 pr-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-800 font-mono focus:bg-white focus:ring-1 focus:ring-stone-400 focus:outline-none"
                  />
                </div>
              </label>
            </div>

            {/* Invoice Upload Slot */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                Verified Receipt / Invoice Upload
              </span>
              <label className="flex items-center justify-between p-3.5 border border-dashed border-[#ECEEED] bg-[#F9F9F8] rounded-xl cursor-pointer hover:bg-stone-100 transition-colors">
                <div className="flex items-center gap-2.5">
                  <UploadCloud className="w-4 h-4 text-stone-400" />
                  <span className="text-xs text-stone-600">Attach contractor invoice PDF</span>
                </div>
                <span className="text-[10px] font-semibold text-stone-700 bg-white border border-[#ECEEED] px-2 py-1 rounded-md">
                  Browse
                </span>
                <input type="file" accept=".pdf,image/*" className="sr-only" />
              </label>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-6 border-t border-[#ECEEED] flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-1/3 rounded-xl border-[#ECEEED] text-stone-700 text-xs font-medium h-11"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="w-2/3 rounded-xl bg-[#132A20] hover:bg-[#1E3A2E] text-white text-xs font-semibold h-11 shadow-sm flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Save &amp; Dispatch Contractor
          </Button>
        </div>
      </aside>
    </div>
  );
}