"use client";

import React from "react";
import { Clock, Wrench, CheckCircle2 } from "lucide-react";

export const MaintenanceStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Card 1: Open Requests */}
      <div className="bg-white rounded-2xl p-6 border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Open Requests
          </span>
          <Clock className="w-5 h-5 text-stone-400" />
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-stone-900">
            7 <span className="text-base font-normal text-stone-500">Active</span>
          </div>
          <div className="text-xs text-stone-500 mt-1">1 Urgent • 2 High • 4 Routine</div>
        </div>
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">SLA Adherence</span>
          <span className="font-semibold text-stone-900">100%</span>
        </div>
      </div>

      {/* Card 2: HERO CARD (Urgent SLA Watch) */}
      <div className="bg-[#132A20] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A3B8AD]">
            Urgent SLA Watch
          </span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-[10px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            4h Response
          </div>
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-white">
            1 <span className="text-base font-normal text-[#A3B8AD]">Ticket</span>
          </div>
          <div className="text-xs text-[#A3B8AD] mt-1">Flat 4B Boiler Pressure • Pimlico Plumbers</div>
        </div>
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-[#A3B8AD]">Time remaining</span>
          <span className="font-semibold text-white">1h 25m</span>
        </div>
      </div>

      {/* Card 3: In Progress */}
      <div className="bg-white rounded-2xl p-6 border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            In Progress
          </span>
          <Wrench className="w-5 h-5 text-stone-400" />
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-stone-900">
            3 <span className="text-base font-normal text-stone-500">Dispatched</span>
          </div>
          <div className="text-xs text-stone-500 mt-1">Contractors currently on-site or booked</div>
        </div>
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Avg. Resolution</span>
          <span className="font-semibold text-stone-900">1.8 Days</span>
        </div>
      </div>

      {/* Card 4: Resolved */}
      <div className="bg-white rounded-2xl p-6 border border-[#ECEEED] shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Resolved (Oct roll)
          </span>
          <CheckCircle2 className="w-5 h-5 text-stone-400" />
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-stone-900">
            5 <span className="text-base font-normal text-stone-500">Completed</span>
          </div>
          <div className="text-xs text-stone-500 mt-1">100% invoices signed &amp; filed</div>
        </div>
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Spend MTD</span>
          <span className="font-semibold text-stone-900">£1,420.00</span>
        </div>
      </div>
    </div>
  );
};