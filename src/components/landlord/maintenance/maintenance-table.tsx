"use client";

import React, { useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { maintenanceTickets } from "@/lib/data/mock-data";

export interface MaintenanceTicket {
  id: string;
  code: string;
  issue: string;
  loggedDate: string;
  property: string;
  address: string;
  tenant: string;
  tenancyStatus: string;
  priority: "Urgent" | "High" | "Routine";
  status: "In Progress" | "Submitted" | "Resolved";
  contractor: string;
  contractorSub: string;
  isUnassigned?: boolean;
  category?: string;
}

const legacyInitialTickets: MaintenanceTicket[] = [
  {
    id: "1",
    code: "MN-104",
    issue: "Boiler pressure drop & no hot water",
    loggedDate: "Today 06:45",
    property: "Flat 4B, 18 Kensington Gdns",
    address: "Kensington, W2 4QH",
    tenant: "Oliver Finch",
    tenancyStatus: "AST • Active",
    priority: "Urgent",
    status: "In Progress",
    contractor: "Pimlico Plumbers",
    contractorSub: "Emergency Response",
  },
  {
    id: "2",
    code: "MN-103",
    issue: "Intercom buzzer not connecting to handset",
    loggedDate: "Yesterday 14:20",
    property: "Unit 3A, St. John's Ct",
    address: "Clapham, SW4",
    tenant: "Maya Lin",
    tenancyStatus: "AST • Active",
    priority: "Routine",
    status: "Submitted",
    contractor: "Unassigned",
    contractorSub: "",
    isUnassigned: true,
  },
  {
    id: "3",
    code: "MN-102",
    issue: "Damp inspection on ground floor bedroom bay",
    loggedDate: "10 Oct 2025",
    property: "7 Grosvenor Vale",
    address: "Ruislip, HA4",
    tenant: "Hannah Ward",
    tenancyStatus: "AST • Active",
    priority: "High",
    status: "In Progress",
    contractor: "Aspect Property Surveyors",
    contractorSub: "Surveyor: 16 Oct 2025",
  },
  {
    id: "4",
    code: "MN-101",
    issue: "Leaking waste pipe under kitchen sink",
    loggedDate: "09 Oct 2025",
    property: "8 Camden Mews",
    address: "Camden, NW1",
    tenant: "Elena Rostova",
    tenancyStatus: "AST • Active",
    priority: "High",
    status: "Submitted",
    contractor: "Pimlico Plumbers",
    contractorSub: "Quote Pending",
  },
  {
    id: "5",
    code: "MN-100",
    issue: "Periodic EICR remedial rectifications",
    loggedDate: "08 Oct 2025",
    property: "27 Blenheim Cres",
    address: "Notting Hill, W11",
    tenant: "Marcus Vance",
    tenancyStatus: "AST • Active",
    priority: "Routine",
    status: "In Progress",
    contractor: "Apex Electrical",
    contractorSub: "NICEIC Certified",
  },
  {
    id: "6",
    code: "MN-098",
    issue: "Bathroom extractor fan replacement",
    loggedDate: "04 Oct 2025",
    property: "15 Highbury Terrace",
    address: "Islington, N5",
    tenant: "Gareth Evans",
    tenancyStatus: "AST • Active",
    priority: "Routine",
    status: "Resolved",
    contractor: "Apex Electrical",
    contractorSub: "Invoice #AE-4091",
  },
  {
    id: "7",
    code: "MN-096",
    issue: "Broken sash window cord in lounge",
    loggedDate: "02 Oct 2025",
    property: "12 Richmond Hill Mansions",
    address: "Richmond, TW10",
    tenant: "Dr. Aris Thorne",
    tenancyStatus: "AST • Active",
    priority: "Routine",
    status: "Resolved",
    contractor: "London Joinery Co",
    contractorSub: "Sign-off Complete",
  },
  {
    id: "8", code: "MN-095", issue: "Radiator valve replacement", loggedDate: "01 Oct 2025",
    property: "14 Elmfield Way", address: "Maida Vale, W9", tenant: "Vacant",
    tenancyStatus: "Available", priority: "Routine", status: "Submitted",
    contractor: "Unassigned", contractorSub: "", isUnassigned: true, category: "Heating",
  },
  {
    id: "9", code: "MN-094", issue: "Loose bathroom light fitting", loggedDate: "30 Sep 2025",
    property: "22 Chelsea Reach", address: "Chelsea, SW3", tenant: "Priya Shah",
    tenancyStatus: "AST • Active", priority: "High", status: "In Progress",
    contractor: "Apex Electrical", contractorSub: "NICEIC Certified", category: "Electrical",
  },
  {
    id: "10", code: "MN-093", issue: "Kitchen cupboard hinge repair", loggedDate: "28 Sep 2025",
    property: "5 Wandsworth Park", address: "Wandsworth, SW18", tenant: "Tom Ellis",
    tenancyStatus: "AST • Active", priority: "Routine", status: "Resolved",
    contractor: "London Joinery Co", contractorSub: "Invoice #LJ-204", category: "Structural",
  },
  {
    id: "11", code: "MN-092", issue: "Washing machine drainage fault", loggedDate: "25 Sep 2025",
    property: "9 Islington Square", address: "Islington, N1", tenant: "Amira Khan",
    tenancyStatus: "AST • Active", priority: "High", status: "Submitted",
    contractor: "Unassigned", contractorSub: "", isUnassigned: true, category: "Appliance",
  },
  {
    id: "12", code: "MN-091", issue: "Blocked external drain", loggedDate: "22 Sep 2025",
    property: "31 Hampstead Lane", address: "Hampstead, NW3", tenant: "James Carter",
    tenancyStatus: "AST • Active", priority: "Urgent", status: "Resolved",
    contractor: "Pimlico Plumbers", contractorSub: "Completed same day", category: "Plumbing",
  },
  {
    id: "13", code: "MN-090", issue: "Cracked bedroom window pane", loggedDate: "20 Sep 2025",
    property: "3 Richmond Terrace", address: "Richmond, TW10", tenant: "Sofia Marin",
    tenancyStatus: "AST • Active", priority: "High", status: "In Progress",
    contractor: "London Glazing", contractorSub: "Survey booked", category: "Structural",
  },
  {
    id: "14", code: "MN-089", issue: "Thermostat not responding", loggedDate: "18 Sep 2025",
    property: "44 Fulham Road", address: "Fulham, SW6", tenant: "Noah Williams",
    tenancyStatus: "AST • Active", priority: "Routine", status: "Resolved",
    contractor: "Heatwise London", contractorSub: "Job signed off", category: "Heating",
  },
  {
    id: "15", code: "MN-088", issue: "Faulty extractor switch", loggedDate: "15 Sep 2025",
    property: "6 Brixton Hill", address: "Brixton, SW2", tenant: "Lucy Green",
    tenancyStatus: "AST • Active", priority: "Routine", status: "Submitted",
    contractor: "Unassigned", contractorSub: "", isUnassigned: true, category: "Electrical",
  },
];

export const initialTickets = maintenanceTickets;
void legacyInitialTickets;

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
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E8EFEA] text-[#132A20]">
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
          <div className="relative min-w-[240px]">
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