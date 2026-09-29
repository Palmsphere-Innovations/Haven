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
    <div className="mx-auto mt-10 w-full max-w-5xl sm:mt-14">
      <div className="mx-auto max-w-sm rounded-[2rem] border-[6px] border-[#173526] bg-[#173526] p-1.5 shadow-[0_20px_50px_-12px_rgba(19,42,32,0.16)] md:hidden">
        <div className="overflow-hidden rounded-[1.45rem] bg-[#FAF8F6] p-4 text-left">
          <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
            <span>Haven</span>
            <span className="flex items-center gap-1.5 normal-case tracking-normal text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Account active
            </span>
          </div>
          <div className="mt-5">
            <p className="text-xs text-neutral-500">Good morning, Olivia</p>
            <h3 className="mt-1 text-lg font-bold tracking-tight text-neutral-900">Your portfolio</h3>
          </div>

          <div className="mt-4 rounded-2xl bg-[#173526] p-4 text-white">
            <div className="text-xs text-white/70">Monthly rent roll</div>
            <div className="mt-1 text-2xl font-bold tracking-tight">{formattedRent}</div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-emerald-200">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>Rent collection overview</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-neutral-200 bg-white p-3">
              <Home className="h-4 w-4 text-brand" />
              <div className="mt-2 text-lg font-bold text-neutral-900">{activePropertiesCount}</div>
              <div className="text-[10px] text-neutral-500">Active properties</div>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-3">
              <Wrench className="h-4 w-4 text-amber-600" />
              <div className="mt-2 text-lg font-bold text-neutral-900">{maintenanceTickets.length}</div>
              <div className="text-[10px] text-neutral-500">Open repairs</div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-3">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Quick access</div>
            <div className="flex items-center justify-between border-t border-neutral-100 py-2 text-xs font-medium text-neutral-700">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-700" />Compliance vault</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
            </div>
            <div className="flex items-center justify-between border-t border-neutral-100 py-2 text-xs font-medium text-neutral-700">
              <span className="flex items-center gap-2"><Wrench className="h-4 w-4 text-amber-600" />Maintenance requests</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden rounded-2xl border border-neutral-200/90 bg-white p-2 shadow-[0_20px_50px_-12px_rgba(19,42,32,0.08)] ring-1 ring-neutral-900/5 md:block sm:rounded-3xl sm:p-4">
        {/* Browser Header Bar */}
        <div className="mb-3 flex items-center justify-between gap-2 border-b border-neutral-100 px-2 py-2 text-xs text-neutral-400 sm:px-3">
          <div className="flex shrink-0 items-center space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-600" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-brand" />
          </div>
          <div className="bg-neutral-50 px-4 py-1 rounded-md border border-neutral-200/60 font-mono text-[11px] text-neutral-500 hidden sm:block">
            app.haven.io/dashboard/portfolio
          </div>
          <Badge
            variant="outline"
            className="shrink-0 gap-1 rounded border-emerald-200 bg-emerald-50 text-[9px] font-medium text-emerald-700 sm:text-[11px]"
          >
            <ShieldCheck className="w-3 h-3" /> UK PRS Compliant
          </Badge>
        </div>

        {/* Real Landlord Dashboard Representation */}
        <div
          className="rounded-lg border border-neutral-100 bg-[#FAF8F6] p-3 text-left sm:rounded-xl sm:p-6"
          data-purpose="screen-container"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col gap-3 border-b border-neutral-200/70 pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pb-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 sm:text-[11px]">
                Portfolio Overview
              </div>
              <div className="break-words text-base font-bold text-neutral-900 sm:text-xl">
                Vance Holdings Ltd (London Units)
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-neutral-700 sm:px-3 sm:text-xs">
                <Home className="w-3.5 h-3.5 text-brand" />
                Active Tenancies: {activePropertiesCount}
              </span>
              <button
                type="button"
                className="rounded-lg bg-brand px-3 py-2 text-[11px] font-semibold text-white shadow-xs transition-all hover:bg-brand-hover sm:rounded-xl sm:px-4 sm:text-xs"
              >
                + New Tenancy
              </button>
            </div>
          </div>

          {/* Real Metrics Tiles */}
          <div className="my-4 grid grid-cols-1 gap-3 sm:my-6 sm:gap-4 md:grid-cols-3">
            <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs">
              <div className="text-xs text-neutral-500 font-medium">Scheduled Rent Roll</div>
              <div className="mt-1 break-words font-mono text-xl font-bold text-neutral-900 sm:text-2xl">
                {formattedRent}
              </div>
              <div className="text-xs text-emerald-700 font-semibold mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>100% Direct Debit Reconciled</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs">
              <div className="text-xs text-neutral-500 font-medium">Active Maintenance</div>
              <div className="mt-1 break-words font-mono text-xl font-bold text-neutral-900 sm:text-2xl">
                {maintenanceTickets.length} Open Tickets
              </div>
              <div className="text-xs text-amber-700 font-semibold mt-2 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-amber-600" />
                <span>Pimlico Plumbers Dispatched</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-200/80 shadow-xs">
              <div className="text-xs text-neutral-500 font-medium">Statutory Certifications</div>
              <div className="mt-1 text-xl font-bold text-neutral-900 sm:text-2xl">100% Audited</div>
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
                  className="flex items-center justify-between gap-2 px-3 py-3 transition-colors hover:bg-neutral-50/50 sm:gap-4 sm:px-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-neutral-900">{item.title}</div>
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

                  <span className="flex max-w-[42%] shrink-0 items-center gap-1 text-[10px] font-medium text-neutral-600 sm:max-w-none sm:text-[11px]">
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
