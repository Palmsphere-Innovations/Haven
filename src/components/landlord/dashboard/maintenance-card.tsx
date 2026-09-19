import React from "react";
import { Bell, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MaintenanceCard: React.FC = () => {
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
          <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-white text-[#111827] shadow-sm">
            All (7)
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-lg text-[#6B7280] hover:text-[#111827]">
            Urgent (1)
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-lg text-[#6B7280] hover:text-[#111827]">
            Routine (6)
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {/* Ticket 1 */}
        <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-gray-100 text-[#374151] mt-0.5 shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-[#111827]">
                  Boiler pressure drop &amp; no hot water
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700">
                  Urgent • 4h SLA
                </span>
              </div>
              <div className="text-xs text-[#6B7280] mt-1 flex flex-wrap items-center gap-2">
                <span>Flat 4B, Kensington Gardens, W2</span>
                <span>•</span>
                <span>
                  Tenant: <strong className="text-[#111827] font-medium">Oliver Finch</strong>
                </span>
                <span>•</span>
                <span>Contractor: Pimlico Plumbers</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="px-2.5 py-1 w-max rounded-full text-[11px] font-medium bg-[#E8EFEA] text-brand">
              In Progress
            </span>
            <Button size="sm" variant="outline" className="h-7 text-xs border-gray-200">
              Manage
            </Button>
          </div>
        </div>

        {/* Ticket 2 */}
        <div className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-gray-100 text-[#374151] mt-0.5 shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-[#111827]">
                  Intercom buzzer not connecting to handset
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-[#6B7280]">
                  Routine
                </span>
              </div>
              <div className="text-xs text-[#6B7280] mt-1 flex flex-wrap items-center gap-2">
                <span>Unit 3A, St. John&apos;s Court, SW4</span>
                <span>•</span>
                <span>Tenant: Maya Lin</span>
                <span>•</span>
                <span>Awaiting estimate</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-center">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-gray-100 text-[#374151]">
              Submitted
            </span>
            <Button size="sm" variant="outline" className="h-7 text-xs border-gray-200">
              Assign
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};