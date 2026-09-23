"use client";

import React, { useState } from "react";
import { Plus, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCards } from "@/components/landlord/dashboard/stat-cards";
import { RentLedgerCard } from "@/components/landlord/dashboard/rent-ledger-card";
import { MaintenanceCard } from "@/components/landlord/dashboard/maintenance-card";
import { ComplianceWidget } from "@/components/landlord/dashboard/compliance-widget";
import { VendorDirectory } from "@/components/landlord/dashboard/vendor-directory";
import { InviteTenantModal } from "@/components/landlord/tenants/modals/invite-tenant-modal";

export default function LandlordDashboardPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleExportStatement = () => {
    // Generate CSV for landlord financial statement
    const headers = ["Property", "Tenant", "Rent", "Due Date", "Status"];
    const rows = [
      ["Flat 4B, 18 Kensington Gardens", "Oliver Davies & Clara Finch", "£2,450.00", "01 Nov 2026", "Paid"],
      ["8 Camden Mews", "Elena Rostova", "£850.00", "15 Jun 2026", "Overdue 14d"],
      ["Unit 3A, St. John's Court", "Maya Lin & S. Patel", "£1,650.00", "01 Nov 2026", "Due Soon"],
      ["12 Richmond Hill Mansions", "Dr. Aris Thorne", "£3,200.00", "01 Nov 2026", "Paid"],
      ["27 Blenheim Crescent", "Marcus Vance", "£2,100.00", "01 Nov 2026", "Paid"],
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `haven-portfolio-statement-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotice("Portfolio Statement (CSV) generated & downloaded.");
    setTimeout(() => setNotice(null), 3500);
  };

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
            onClick={handleExportStatement}
            className="h-9 rounded-full text-xs font-semibold border-gray-200 text-[#111827] shadow-sm hover:bg-gray-50 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#6B7280] mr-1.5" />
            Export Statement
          </Button>

          <Button
            onClick={() => setIsInviteModalOpen(true)}
            className="h-9 bg-brand hover:bg-[#0b1b14] text-white rounded-full text-xs font-semibold shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Tenancy
          </Button>
        </div>
      </div>

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

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

      {isInviteModalOpen && (
        <InviteTenantModal onClose={() => setIsInviteModalOpen(false)} />
      )}
    </>
  );
}
