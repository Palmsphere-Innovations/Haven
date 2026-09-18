import React from "react";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCards } from "@/components/landlord/dashboard/stat-cards";
import { RentLedgerCard } from "@/components/landlord/dashboard/rent-ledger-card";
import { MaintenanceCard } from "@/components/landlord/dashboard/maintenance-card";
import { ComplianceWidget } from "@/components/landlord/dashboard/compliance-widget";
import { VendorDirectory } from "@/components/landlord/dashboard/vendor-directory";

export default function LandlordDashboardPage() {
  return (
    <>
      {/* Page Title & Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#111827]">
              Hi, Vance
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-[#374151] text-[11px] font-semibold tracking-wide">
              Q4 ACTIVE
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
            Summary of 42 properties across Greater London &amp; Surrey. Reconciled today at{" "}
            <span className="font-medium text-[#111827]">08:30 GMT</span>.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <Button
            variant="outline"
            className="h-9 rounded-full text-xs font-semibold border-gray-200 text-[#111827] shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280] mr-1.5" />
            Export Statement
          </Button>
          
          <Button className="h-9 bg-brand hover:bg-[#0b1b14] text-white rounded-full text-xs font-semibold shadow-sm">
            <Plus className="w-4 h-4 mr-1" />
            New Tenancy
          </Button>
        </div>
      </div>

      {/* Top Stat Cards Row */}
      <StatCards />

      {/* 2-Column Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Primary Workspace (65%) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <RentLedgerCard />
          <MaintenanceCard />
        </div>

        {/* Right Sidebar Widgets (35%) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <ComplianceWidget />
          <VendorDirectory />
        </div>
      </div>
    </>
  );
}