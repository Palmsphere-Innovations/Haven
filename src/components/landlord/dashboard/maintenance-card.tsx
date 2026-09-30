"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Droplets, Bell, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { maintenanceTickets, type MaintenanceTicket } from "@/lib/mock/maintenance";
import { AssignContractorDrawer } from "@/components/landlord/maintenance/modals/assign-contractor-drawer";

export const MaintenanceCard: React.FC = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "urgent" | "routine">("all");
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(maintenanceTickets);
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(null);

  const urgentCount = tickets.filter(
    (t) => t.priority === "Urgent" || t.priority === "High"
  ).length;
  const routineCount = tickets.filter((t) => t.priority === "Routine").length;

  const filteredTickets = tickets.filter((ticket) => {
    if (filter === "urgent") {
      return ticket.priority === "Urgent" || ticket.priority === "High";
    }
    if (filter === "routine") {
      return ticket.priority === "Routine";
    }
    return true;
  });

  return (
    <div
      className="bg-white rounded-2xl border border-[#ECEEED] shadow-sm p-6 sm:p-7 flex flex-col"
      id="maintenance-section"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-[#111827]">
            Active Maintenance Operations
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Assigned contractor dispatch &amp; SLA resolution monitoring
          </p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === "all"
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            All ({tickets.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("urgent")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === "urgent"
                ? "bg-white text-rose-700 shadow-sm"
                : "text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            Urgent ({urgentCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter("routine")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === "routine"
                ? "bg-white text-[#111827] shadow-sm"
                : "text-[#6B7280] hover:text-[#111827]"
            }`}
          >
            Routine ({routineCount})
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredTickets.slice(0, 3).map((ticket) => {
          const isUrgent =
            ticket.priority === "Urgent" || ticket.priority === "High";
          return (
            <div
              key={ticket.id}
              className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-gray-100 text-[#374151] mt-0.5 shrink-0">
                  {ticket.issue.toLowerCase().includes("water") ||
                  ticket.issue.toLowerCase().includes("boiler") ||
                  ticket.issue.toLowerCase().includes("leak") ? (
                    <Droplets className="w-5 h-5 text-sky-600" />
                  ) : ticket.issue.toLowerCase().includes("buzzer") ||
                    ticket.issue.toLowerCase().includes("intercom") ? (
                    <Bell className="w-5 h-5 text-amber-600" />
                  ) : (
                    <Wrench className="w-5 h-5 text-stone-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[#111827]">
                      {ticket.issue}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        isUrgent
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-gray-100 text-[#6B7280]"
                      }`}
                    >
                      {ticket.priority.toUpperCase()} • 24h SLA
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7280] mt-1 flex flex-wrap items-center gap-2">
                    <span>{ticket.property}, {ticket.address}</span>
                    <span>•</span>
                    <span>
                      Tenant:{" "}
                      <strong className="text-[#111827] font-medium">
                        {ticket.tenant}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      {ticket.contractor
                        ? `Contractor: ${ticket.contractor}`
                        : "Awaiting contractor"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                <span
                  className={`px-2.5 py-1 w-max rounded-full text-[11px] font-medium ${
                    ticket.status === "In Progress"
                      ? "bg-[#E8EFEA] text-brand"
                      : ticket.status === "Resolved"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-[#374151]"
                  }`}
                >
                  {ticket.status}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTicket(ticket)}
                  className="rounded-xl border-gray-200 hover:bg-gray-50 text-xs font-semibold text-[#111827] cursor-pointer"
                >
                  {ticket.contractor ? "Reassign" : "Assign Contractor"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-[#6B7280]">
          3 operational vendors standing by on emergency roster
        </span>
        <Link
          href="/maintenance"
          className="text-xs font-semibold text-brand hover:underline flex items-center gap-1 cursor-pointer"
        >
          View all active tickets ({tickets.length})
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {selectedTicket && (
        <AssignContractorDrawer
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={(updatedTicket: MaintenanceTicket) => {
            setTickets((prev) =>
              prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
            );
            setSelectedTicket(null);
          }}
        />
      )}
    </div>
  );
};
