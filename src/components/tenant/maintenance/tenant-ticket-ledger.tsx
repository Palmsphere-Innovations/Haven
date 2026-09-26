"use client";

import React, { useState, useMemo } from "react";
import {
  Wrench,
  Search,
  Calendar,
  Clock,
  ChevronRight,
  Plus,
  AlertTriangle,
  Flame,
  Zap,
  KeyRound,
  Layers,
} from "lucide-react";
import { MaintenanceTicket } from "@/lib/mock/tenants";

interface TenantTicketLedgerProps {
  tickets: MaintenanceTicket[];
  onSelectTicket: (ticket: MaintenanceTicket) => void;
  onOpenNewTicketModal: () => void;
}

export function TenantTicketLedger({
  tickets,
  onSelectTicket,
  onOpenNewTicketModal,
}: TenantTicketLedgerProps) {
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      // Tab filter
      if (selectedStatusTab === "active") {
        if (t.status === "Completed") return false;
      } else if (selectedStatusTab === "scheduled") {
        if (t.status !== "Visit Scheduled") return false;
      } else if (selectedStatusTab === "completed") {
        if (t.status !== "Completed") return false;
      }

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.reference.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.contractor && t.contractor.toLowerCase().includes(q))
      );
    });
  }, [tickets, selectedStatusTab, searchQuery]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "heating & radiators":
      case "heating":
        return <Flame className="w-4 h-4 text-amber-600" />;
      case "electrical":
        return <Zap className="w-4 h-4 text-yellow-600" />;
      case "security & access":
        return <KeyRound className="w-4 h-4 text-blue-600" />;
      default:
        return <Wrench className="w-4 h-4 text-emerald-700" />;
    }
  };

  const getStatusBadge = (status: MaintenanceTicket["status"]) => {
    switch (status) {
      case "Visit Scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Visit Scheduled
          </span>
        );
      case "In Progress":
      case "Under Review":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            {status}
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200">
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Logged
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
      {/* Table Header and Action Bar */}
      <div className="p-5 border-b border-stone-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              Maintenance Docket &amp; Repairs
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Live status tracking for contractor appointments, parts dispatch, and completed works.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenNewTicketModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Report an Issue</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl text-xs font-semibold text-stone-600 overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedStatusTab("all")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedStatusTab === "all"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "hover:text-stone-900"
              }`}
            >
              All ({tickets.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatusTab("active")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedStatusTab === "active"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "hover:text-stone-900"
              }`}
            >
              Active ({tickets.filter((t) => t.status !== "Completed").length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatusTab("scheduled")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedStatusTab === "scheduled"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "hover:text-stone-900"
              }`}
            >
              Scheduled ({tickets.filter((t) => t.status === "Visit Scheduled").length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatusTab("completed")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedStatusTab === "completed"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "hover:text-stone-900"
              }`}
            >
              Completed ({tickets.filter((t) => t.status === "Completed").length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, issue, or contractor..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Ticket List Rows */}
      <div className="divide-y divide-stone-100">
        {filteredTickets.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <Layers className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-stone-700">No maintenance tickets found</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              {searchQuery
                ? `No requests match "${searchQuery}". Clear your search query to see all records.`
                : "You currently have no maintenance records under this filter."}
            </p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => onSelectTicket(ticket)}
              className="p-4 sm:p-5 hover:bg-stone-50/80 transition-colors cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              {/* Left Column: Icon + Title + Meta */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-[#E8EFEA] text-stone-600 group-hover:text-[#2A5240] flex items-center justify-center shrink-0 transition-colors mt-0.5">
                  {getCategoryIcon(ticket.category)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-stone-500">
                      {ticket.reference}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                      {ticket.category}
                    </span>
                    {ticket.priority && ticket.priority !== "Routine" && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {ticket.priority}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 mt-1 group-hover:text-[#132A20] transition-colors">
                    {ticket.title}
                  </h3>
                  {ticket.appointmentWindow && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-medium mt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{ticket.appointmentWindow}</span>
                      {ticket.contractor && (
                        <span className="text-stone-500">({ticket.contractor})</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Status & Date */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pl-13 md:pl-0">
                <div className="text-left md:text-right">
                  <div className="mb-1">{getStatusBadge(ticket.status)}</div>
                  <div className="text-[11px] text-stone-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Logged {ticket.loggedDate}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center text-stone-400 group-hover:text-stone-900 group-hover:border-stone-300 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
