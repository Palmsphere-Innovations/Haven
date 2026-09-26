"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Send,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { MaintenanceTicket } from "@/lib/mock/tenants";

interface TicketDetailModalProps {
  ticket: MaintenanceTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onAddTicketNote?: (ticketId: string, note: string) => void;
}

export function TicketDetailModal({
  ticket,
  isOpen,
  onClose,
  onAddTicketNote,
}: TicketDetailModalProps) {
  const [newNote, setNewNote] = useState("");
  const [notesList, setNotesList] = useState<
    Array<{ author: string; time: string; text: string }>
  >([
    {
      author: "Eleanor Vance (Managing Agent)",
      time: "12 Oct • 14:15",
      text: "Triage complete. Dispatched work order to Apex Heating under pre-authorised emergency heating limit.",
    },
    {
      author: "Apex Heating Dispatch",
      time: "13 Oct • 09:30",
      text: "Engineer Marcus Sterling booked for slot Thu 17 Oct (10:00 - 12:00 BST). Parts inventory pre-checked.",
    },
  ]);
  const [rescheduleNotice, setRescheduleNotice] = useState<string | null>(null);

  if (!isOpen || !ticket) return null;

  // Determine active step index (0 to 3)
  let activeStep = 0;
  if (ticket.status === "Completed") activeStep = 3;
  else if (ticket.status === "Visit Scheduled" || ticket.status === "In Progress") activeStep = 2;
  else if (ticket.status === "Under Review") activeStep = 1;
  else activeStep = 0;

  const handleSendNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const noteItem = {
      author: "Oliver Davies (Tenant)",
      time: "Just now",
      text: newNote.trim(),
    };

    setNotesList((prev) => [...prev, noteItem]);
    if (onAddTicketNote) {
      onAddTicketNote(ticket.id, newNote.trim());
    }
    setNewNote("");
  };

  const handleRequestReschedule = () => {
    setRescheduleNotice("Reschedule notification sent to Eleanor Vance & Contractor Dispatch.");
    setTimeout(() => setRescheduleNotice(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200/80 flex items-start justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                {ticket.reference}
              </span>
              <span className="text-xs font-medium text-emerald-800 bg-[#E8EFEA] px-2.5 py-0.5 rounded-full">
                {ticket.category}
              </span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight mt-1.5">
              {ticket.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {rescheduleNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{rescheduleNotice}</span>
            </div>
          )}

          {/* Stepper Progress */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80">
            <h3 className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-4">
              Repair Progress Tracker
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: "1. Logged", sub: ticket.loggedDate },
                { label: "2. Triage", sub: "Reviewed" },
                { label: "3. Dispatched", sub: ticket.contractor ? "Assigned" : "Pending" },
                { label: "4. Resolved", sub: ticket.resolutionDate || "Final Sign-off" },
              ].map((step, idx) => {
                const isPassed = idx <= activeStep;
                const isCurrent = idx === activeStep;
                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPassed
                          ? "bg-[#132A20] text-white"
                          : "bg-stone-200 text-stone-500"
                      } ${isCurrent ? "ring-4 ring-[#132A20]/20" : ""}`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div
                      className={`text-[11px] font-bold mt-2 ${
                        isPassed ? "text-stone-900" : "text-stone-400"
                      }`}
                    >
                      {step.label}
                    </div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{step.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contractor & Appointment Window */}
          {ticket.appointmentWindow && (
            <div className="p-4 bg-[#E8EFEA]/50 border border-[#2A5240]/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#2A5240] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#132A20]">
                    Scheduled Appointment Slot
                  </div>
                  <div className="text-xs font-semibold text-emerald-900 mt-0.5">
                    {ticket.appointmentWindow}
                  </div>
                  <div className="text-[11px] text-stone-600 mt-0.5">
                    Assigned: {ticket.contractor}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRequestReschedule}
                className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#2A5240]/30 hover:bg-stone-50 text-stone-800 rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
              >
                Request Reschedule
              </button>
            </div>
          )}

          {/* Issue Description */}
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
              Reported Fault Details
            </h4>
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-800 leading-relaxed">
              {ticket.description || "No additional description provided with this ticket."}
            </div>
          </div>

          {/* Access Instructions */}
          {ticket.accessNotes && (
            <div>
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                Access Protocol &amp; Keys
              </h4>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{ticket.accessNotes}</span>
              </div>
            </div>
          )}

          {/* Updates & Notes Thread */}
          <div>
            <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Case Updates &amp; Contractor Notes</span>
            </h4>
            <div className="space-y-2 mb-3">
              {notesList.map((note, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="font-bold text-stone-800">{note.author}</span>
                    <span>{note.time}</span>
                  </div>
                  <p className="text-stone-700 leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>

            {/* Quick Note Composer */}
            <form onSubmit={handleSendNote} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add an update or note for the managing agent..."
                className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!newNote.trim()}
                className="px-4 py-2 bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
