"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { propertiesData,  } from "@/lib/mock/properties";
import { ArrowUpRight, CheckCircle2, Wrench, ShieldCheck, Home } from "lucide-react";
import { maintenanceTickets } from "@/lib/mock/maintenance";

export const HeroDashboardMockup: React.FC = () => {
  // Compute dynamic stats directly from central mock-data store
  const activePropertiesCount = propertiesData.filter((p) => !p.isVacant).length;
  
  // Calculate total monthly rent roll
  const totalRentRoll = propertiesData.reduce((acc, curr) => {
    const val = parseFloat(curr.rent.replace(/[^\d.]/g, "")) || 0;
    return acc + val;
  }, 0);

  const formattedRent = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(totalRentRoll);

  return (
    <div className="mt-14 sm:mt-18 max-w-5xl mx-auto">
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200/90 bg-white p-2.5 sm:p-4 shadow-[0_20px_50px_-12px_rgba(19,42,32,0.08)] ring-1 ring-neutral-900/5">
        {/* Browser Header Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100 mb-3 text-xs text-neutral-400">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-600" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-brand" />
          </div>
          <div className="bg-neutral-50 px-4 py-1 rounded-md border border-neutral-200/60 font-mono text-[11px] text-neutral-500 hidden sm:block">
            app.haven.io/dashboard/portfolio
          </div>
          <Badge
            variant="outline"
            className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border-emerald-200 rounded gap-1"
          >
            <ShieldCheck className="w-3 h-3" /> UK PRS Compliant
          </Badge>
        </div>

        {/* Real Landlord Dashboard Representation */}
        <div
          className="rounded-xl border border-neutral-100 bg-[#FAF8F6] p-4 sm:p-6 text-left"
          data-purpose="screen-container"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200/70 gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Portfolio Overview
              </div>
              <div className="text-xl font-bold text-neutral-900">
                Vance Holdings Ltd (London Units)
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-neutral-200 text-neutral-700">
                <Home className="w-3.5 h-3.5 text-brand" />
                Active Tenancies: {activePropertiesCount}
              </span>
              <button
                type="button"
                className="text-xs font-semibold bg-brand text-white px-4 py-2 rounded-xl hover:bg-brand-hover transition-all shadow-xs"
              >
                + New Tenancy
              </button>
            </div>
          </div>

          {/* Real Metrics Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs">
              <div className="text-xs text-neutral-500 font-medium">Scheduled Rent Roll</div>
              <div className="text-2xl font-bold text-neutral-900 mt-1 font-mono">
                {formattedRent}
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>100% Direct Debit Reconciled</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs">
              <div className="text-xs text-neutral-500 font-medium">Active Maintenance</div>
              <div className="text-2xl font-bold text-neutral-900 mt-1 font-mono">
                {maintenanceTickets.length} Open Tickets
              </div>
              <div className="text-xs text-amber-700 font-semibold mt-2 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                <span>Pimlico Plumbers Dispatched</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs">
              <div className="text-xs text-neutral-500 font-medium">Statutory Certifications</div>
              <div className="text-2xl font-bold text-neutral-900 mt-1">100% Audited</div>
              <div className="text-xs text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Gas Safe CP12 &amp; EICR Verified</span>
              </div>
            </div>
          </div>

          {/* Dynamic Portfolio Table */}
          <div className="bg-white rounded-xl border border-neutral-200/80 overflow-hidden shadow-xs">
            <div className="px-4 py-2.5 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              <span>Property &amp; Tenant</span>
              <span className="hidden sm:inline">Ledger Status</span>
              <span>Maintenance Status</span>
            </div>
            <div className="divide-y divide-neutral-100 text-xs">
              {propertiesData.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-3 flex items-center justify-between hover:bg-neutral-50/50 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-neutral-900">{item.title}</div>
                    <div className="text-[11px] text-neutral-500 font-mono">
                      Tenant: {item.occupant} • {item.rent}/mo
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="hidden sm:inline-block text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold"
                  >
                    {item.ledgerText}
                  </Badge>

                  <span className="text-neutral-600 font-medium text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {item.complianceText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};