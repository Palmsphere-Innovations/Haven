"use client";

import type { FormEvent } from "react";
import React, { useState } from "react";
import { X, UploadCloud, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MaintenanceTicket } from "@/lib/mock/maintenance";

interface LogRequestModalProps {
  onClose: () => void;
  onAdd: (ticket: MaintenanceTicket) => void;
}

export function LogRequestModal({ onClose, onAdd }: LogRequestModalProps) {
  const [priority, setPriority] = useState<MaintenanceTicket["priority"]>("Routine");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const propertyStr = String(form.get("property") || "Flat 4B, 18 Kensington Gdns");
    const issueStr = String(form.get("issue") || "Maintenance Request");

    const newTicket: MaintenanceTicket = {
      id: crypto.randomUUID(),
      code: `MN-${Math.floor(200 + Math.random() * 100)}`,
      propertyId: null,
      issue: issueStr,
      loggedDate: "Just now",
      property: propertyStr,
      address: "Portfolio Unit",
      tenant: "Tenant Contact",
      tenancyStatus: "AST • Active",
      priority: priority,
      status: "Submitted",
      contractor: "Unassigned",
      contractorSub: "",
      isUnassigned: true,
      category: String(form.get("category") || "General"),
    };

    onAdd(newTicket);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="request-title"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl rounded-3xl border border-[#ECEEED] bg-white p-7 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#ECEEED] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] flex items-center justify-center text-[#132A20] shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 id="request-title" className="text-lg font-bold text-stone-900 leading-tight">
                Log Maintenance Request
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Dispatch a new repair ticket to your portfolio queue
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700">Property Unit</span>
              <select
                name="property"
                required
                className="w-full h-10 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-800 focus:bg-white focus:ring-1 focus:ring-stone-400 focus:outline-none"
              >
                <option>Flat 4B, 18 Kensington Gdns</option>
                <option>{"Unit 3A, St. John's Ct"}</option>
                <option>8 Camden Mews</option>
                <option>27 Blenheim Cres</option>
                <option>7 Grosvenor Vale</option>
              </select>
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700">Issue Category</span>
              <select
                name="category"
                className="w-full h-10 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-800 focus:bg-white focus:ring-1 focus:ring-stone-400 focus:outline-none"
              >
                {["Plumbing", "Electrical", "Heating & Gas", "Structural", "Appliance"].map(
                  (cat) => (
                    <option key={cat}>{cat}</option>
                  )
                )}
              </select>
            </label>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-stone-700">Issue Summary</span>
            <input
              name="issue"
              required
              placeholder="e.g. Low boiler pressure and intermittent hot water"
              className="w-full h-10 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-800 placeholder-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 focus:outline-none"
            />
          </label>

          {/* Custom Radio Pill Selector for SLA Urgency */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-stone-700">SLA Urgency Level</span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPriority("Urgent")}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  priority === "Urgent"
                    ? "border-rose-300 bg-rose-50/70 text-rose-900 shadow-xs"
                    : "border-[#ECEEED] bg-[#F9F9F8] text-stone-600 hover:bg-stone-100"
                }`}
              >
                <span className="text-xs font-bold">Urgent</span>
                <span className="text-[10px] text-rose-700 font-medium">4h Emergency SLA</span>
              </button>

              <button
                type="button"
                onClick={() => setPriority("High")}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  priority === "High"
                    ? "border-amber-300 bg-amber-50/70 text-amber-900 shadow-xs"
                    : "border-[#ECEEED] bg-[#F9F9F8] text-stone-600 hover:bg-stone-100"
                }`}
              >
                <span className="text-xs font-bold">High</span>
                <span className="text-[10px] text-amber-700 font-medium">24h Priority SLA</span>
              </button>

              <button
                type="button"
                onClick={() => setPriority("Routine")}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  priority === "Routine"
                    ? "border-stone-400 bg-stone-200/60 text-stone-900 shadow-xs"
                    : "border-[#ECEEED] bg-[#F9F9F8] text-stone-600 hover:bg-stone-100"
                }`}
              >
                <span className="text-xs font-bold">Routine</span>
                <span className="text-[10px] text-stone-500 font-medium">Standard 5-day SLA</span>
              </button>
            </div>
          </div>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-stone-700">Tenant Phone / Access Notes</span>
            <textarea
              name="notes"
              rows={2}
              className="w-full p-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-800 placeholder-stone-400 focus:bg-white focus:ring-1 focus:ring-stone-400 focus:outline-none resize-none"
              placeholder="Tenant contact details or specific access instructions..."
            />
          </label>

          {/* File Upload Drag-and-Drop Box */}
          <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-[#ECEEED] bg-[#F9F9F8] rounded-xl cursor-pointer hover:bg-stone-100/70 transition-colors group">
            <UploadCloud className="w-6 h-6 text-stone-400 group-hover:text-stone-600 transition-colors mb-1" />
            <span className="text-xs font-medium text-stone-700">Upload photos or job estimates</span>
            <span className="text-[10px] text-stone-400">PNG, JPG, or PDF up to 10MB</span>
            <input type="file" accept="image/*,.pdf" multiple className="sr-only" />
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ECEEED]">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="rounded-xl border-[#ECEEED] text-stone-700 text-xs font-medium hover:bg-stone-50 h-10 px-4"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-xl bg-[#132A20] hover:bg-[#1E3A2E] text-white text-xs font-semibold h-10 px-5 shadow-sm"
          >
            Create Request
          </Button>
        </div>
      </form>
    </div>
  );
}