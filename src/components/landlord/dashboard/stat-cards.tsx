import React from "react";
import Link from "next/link";
import { Building2, Key, Wrench, ArrowRight } from "lucide-react";

export const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Card 1: Total Properties */}
      <div className="bg-white rounded-2xl p-6 border border-[#ECEEED] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Total Properties
          </span>
          <Building2 className="w-5 h-5 text-gray-400" />
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-[#111827]">
            42 <span className="text-base font-normal text-[#6B7280]">Units</span>
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            38 Residential • 4 Commercial
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-[#6B7280]">Occupancy Rate</span>
          <span className="font-semibold text-[#111827]">98.0%</span>
        </div>
      </div>

      {/* Card 2: Active Tenancies */}
      <div className="bg-white rounded-2xl p-6 border border-[#ECEEED] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Active Tenancies
          </span>
          <Key className="w-5 h-5 text-gray-400" />
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-[#111827]">
            39 <span className="text-base font-normal text-[#6B7280]">Active</span>
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            2 renewals scheduled this month
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
          <span className="text-[#6B7280]">Average Tenure</span>
          <span className="font-semibold text-[#111827]">2.4 Years</span>
        </div>
      </div>

      {/* Card 3: Rent Overdue (Forest Green Hero Card) */}
      <div className="bg-[#132A20] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A3B8AD]">
            Rent Overdue
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-[10px] font-semibold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Arrears Alert
          </span>
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-white">
            £3,450.00
          </div>
          <div className="text-xs text-[#A3B8AD] mt-1">
            2 tenancies with pending arrears
          </div>
        </div>
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-[#A3B8AD]">Overdue Ratio</span>
          <span className="font-semibold text-white">3.7% of monthly roll</span>
        </div>
      </div>

      {/* Card 4: Open Maintenance */}
      <div className="bg-white rounded-2xl p-6 border border-[#ECEEED] shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
            Open Maintenance
          </span>
          <Wrench className="w-5 h-5 text-gray-400" />
        </div>
        <div className="my-4">
          <div className="text-3xl font-bold tracking-tight text-[#111827]">
            7 <span className="text-base font-normal text-[#6B7280]">Open</span>
          </div>
          <div className="text-xs text-[#6B7280] mt-1">
            1 Urgent • 3 In Progress • 3 Sched.
          </div>
        </div>
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
          <Link
            href="#maintenance-section"
            className="font-medium text-[#374151] hover:text-black flex items-center gap-1 transition-colors"
          >
            <span>View ticket queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="h-2 w-2 rounded-full bg-amber-500" />
        </div>
      </div>
    </div>
  );
};