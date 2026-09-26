"use client";

import React from "react";
import { Wrench, CalendarClock, CheckCircle2, ShieldAlert } from "lucide-react";
import { MaintenanceTicket } from "@/lib/mock/tenants";

interface TenantMaintenanceStatsProps {
  tickets: MaintenanceTicket[];
  onOpenEmergencyGuide: () => void;
}

export function TenantMaintenanceStats({
  tickets,
  onOpenEmergencyGuide,
}: TenantMaintenanceStatsProps) {
  const activeCount = tickets.filter(
    (t) => t.status === "Logged" || t.status === "Under Review" || t.status === "In Progress"
  ).length;

  const scheduledCount = tickets.filter((t) => t.status === "Visit Scheduled").length;
  const completedCount = tickets.filter((t) => t.status === "Completed").length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Requests */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            Active Requests
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1">{activeCount}</div>
          <p className="text-[11px] text-stone-500 mt-0.5">Awaiting resolution or triage</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
          <Wrench className="w-5 h-5" />
        </div>
      </div>

      {/* Scheduled Visits */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            Scheduled Visits
          </span>
          <div className="text-2xl font-bold text-[#132A20] mt-1">{scheduledCount}</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Approved contractor allocated</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] text-[#2A5240] flex items-center justify-center">
          <CalendarClock className="w-5 h-5" />
        </div>
      </div>

      {/* Resolved History */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
            Completed Repairs
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1">{completedCount}</div>
          <p className="text-[11px] text-stone-500 mt-0.5">Signed off with guarantee</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>

      {/* 24/7 Emergency Line */}
      <div className="bg-gradient-to-br from-[#132A20] to-[#1c3e30] rounded-2xl p-5 text-white shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            24/7 Emergency Line
          </span>
          <ShieldAlert className="w-4 h-4 text-emerald-300" />
        </div>
        <div className="mt-2">
          <a
            href="tel:08004589120"
            className="text-lg font-bold tracking-tight text-white hover:underline"
          >
            0800 458 9120
          </a>
          <button
            type="button"
            onClick={onOpenEmergencyGuide}
            className="block text-[11px] text-emerald-200 hover:text-white mt-0.5 text-left transition-colors cursor-pointer"
          >
            View Out-of-Hours Criteria &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
