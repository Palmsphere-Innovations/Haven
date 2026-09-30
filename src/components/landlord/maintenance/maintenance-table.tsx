"use client";

import React, { useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { maintenanceTickets, MaintenanceTicket } from "@/lib/mock/maintenance";



export const initialTickets = maintenanceTickets;
// void legacyInitialTickets;

export const MaintenanceTable: React.FC<{ tickets: MaintenanceTicket[]; onSelect: (ticket: MaintenanceTicket) => void }> = ({ tickets, onSelect }) => {
  const [activeTab, setActiveTab] = useState<"all" | "open" | "progress" | "resolved">("all");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7);
  const filteredTickets = tickets.filter((ticket) => {
    const matchesTab = activeTab === "all" || (activeTab === "open" && ticket.status !== "Resolved") || (activeTab === "progress" && ticket.status === "In Progress") || (activeTab === "resolved" && ticket.status === "Resolved");
    const matchesSearch = `${ticket.property} ${ticket.address} ${ticket.issue} ${ticket.code} ${ticket.contractor}`.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch && (category === "All Categories" || ticket.category === category);
  });
  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

  const renderPriorityBadge = (priority: MaintenanceTicket["priority"]) => {
    switch (priority) {
      case "Urgent":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FDE8E8] text-[#991B1B]">
            Urgent • 4h SLA
          </span>
        );
      case "High":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FEF7E6] text-[#8D6E18]">
            High
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-100 text-stone-700">
            Routine
          </span>
        );
    }
  };

  const renderStatusBadge = (status: MaintenanceTicket["status"]) => {
    switch (status) {
      case "In Progress":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E8EFEA] text-brand">
            In Progress
          </span>
        );
      case "Resolved":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#EAF4ED] text-[#1B5E20]">
            Resolved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-100 text-stone-700">
            Submitted
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs p-7 flex flex-col">
      {/* Table Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl self-start">
          <button
            type="button"
            onClick={() => { setActiveTab("all"); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 text-xs rounded-lg transition-colors ${
              activeTab === "all"
                ? "font-semibold bg-white text-stone-900 shadow-xs"
                : "font-medium text-stone-600 hover:text-stone-900"
            }`}
          >
            All Requests (12)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("open"); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 text-xs rounded-lg transition-colors ${
              activeTab === "open"
                ? "font-semibold bg-white text-stone-900 shadow-xs"
                : "font-medium text-stone-600 hover:text-stone-900"
            }`}
          >
            Open (7)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("progress"); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 text-xs rounded-lg transition-colors ${
              activeTab === "progress"
                ? "font-semibold bg-white text-stone-900 shadow-xs"
                : "font-medium text-stone-600 hover:text-stone-900"
            }`}
          >
            In Progress (3)
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("resolved"); setCurrentPage(1); }}
            className={`px-3.5 py-1.5 text-xs rounded-lg transition-colors ${
              activeTab === "resolved"
                ? "font-semibold bg-white text-stone-900 shadow-xs"
                : "font-medium text-stone-600 hover:text-stone-900"
            }`}
          >
            Resolved (5)
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2 pointer-events-none" />
            <Input
              type="text"
              placeholder="Filter by property, issue, or contractor..."
              value={search}
              onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }}
              className="w-full h-8 pl-8 pr-3 bg-stone-50 border border-stone-200 rounded-lg text-xs text-stone-900 placeholder:text-stone-400"
            />
          </div>
          <label className="flex items-center gap-1 text-xs text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5"><Filter className="w-3.5 h-3.5" /><select value={category} onChange={(event) => { setCategory(event.target.value); setCurrentPage(1); }} className="bg-transparent outline-none"><option>All Categories</option>{["Plumbing", "Electrical", "Heating", "Structural", "Appliance"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <div className="flex items-center gap-1 text-xs text-stone-600 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 cursor-pointer">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort: SLA Urgency ↓</span>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-stone-100 text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
              <th className="py-3 pr-4">Request &amp; Code</th>
              <th className="py-3 px-3">Property &amp; Unit</th>
              <th className="py-3 px-3">Tenant</th>
              <th className="py-3 px-3">Priority</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Assigned Contractor</th>
              <th className="py-3 pl-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {paginatedTickets.map((row) => (
              <tr key={row.id} className="hover:bg-stone-50/70 transition-colors">
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded">
                      {row.code}
                    </span>
                    <span className="font-medium text-stone-900">{row.issue}</span>
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">Logged: {row.loggedDate}</div>
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-medium text-stone-900">{row.property}</div>
                  <div className="text-[11px] text-stone-400">{row.address}</div>
                </td>
                <td className="py-3.5 px-3 text-stone-500">
                  <div className="text-stone-900 font-medium">{row.tenant}</div>
                  <div className="text-[11px]">{row.tenancyStatus}</div>
                </td>
                <td className="py-3.5 px-3">{renderPriorityBadge(row.priority)}</td>
                <td className="py-3.5 px-3">{renderStatusBadge(row.status)}</td>
                <td className="py-3.5 px-3">
                  {row.isUnassigned ? (
                    <span className="text-stone-400 italic">Unassigned</span>
                  ) : (
                    <div>
                      <div className="font-medium text-stone-900">{row.contractor}</div>
                      <div className="text-[11px] text-stone-400">{row.contractorSub}</div>
                    </div>
                  )}
                </td>
                <td className="py-3.5 pl-3 text-right">
                  <Button
                    onClick={() => onSelect(row)}
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-3 rounded-lg text-[11px] font-medium transition-colors ${
                      row.status === "Resolved"
                        ? "bg-stone-50 hover:bg-stone-100 text-stone-500"
                        : "bg-stone-100 hover:bg-stone-200 text-stone-900"
                    }`}
                  >
                    {row.isUnassigned
                      ? "Assign"
                      : row.status === "Resolved"
                      ? "Receipt"
                      : row.status === "Submitted"
                      ? "Review"
                      : "Manage"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="pt-5 mt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span>Showing {filteredTickets.length === 0 ? 0 : startIndex + 1} to {Math.min(endIndex, filteredTickets.length)} of {filteredTickets.length} requests</span>
          <span className="text-stone-300">•</span>
          <span className="text-[11px]">
            Contractors verified: Public Liability (£5M+) &amp; Gas Safe / NICEIC
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="h-7 px-3 bg-stone-100 border-none text-stone-900 hover:bg-stone-200 disabled:opacity-50"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="h-7 px-3 bg-stone-100 border-none text-stone-900 hover:bg-stone-200 disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};