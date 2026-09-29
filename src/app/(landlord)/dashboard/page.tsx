"use client";

import React, { useState } from "react";
import { Plus, Download, CheckCircle2, Building2, CalendarDays, ChartNoAxesCombined, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCards } from "@/components/landlord/dashboard/stat-cards";
import { RentLedgerCard } from "@/components/landlord/dashboard/rent-ledger-card";
import { MaintenanceCard } from "@/components/landlord/dashboard/maintenance-card";
import { ComplianceWidget } from "@/components/landlord/dashboard/compliance-widget";
import { VendorDirectory } from "@/components/landlord/dashboard/vendor-directory";
import { InviteTenantModal } from "@/components/landlord/tenants/modals/invite-tenant-modal";
import { useLandlordProfile } from "@/hooks/use-landlord-profile";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { propertiesData } from "@/lib/mock/properties";
import { tenantsData } from "@/lib/mock/tenants";

export default function LandlordDashboardPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const landlord = useLandlordProfile();
  const firstName = landlord.name.trim().split(/\s+/)[0] || "there";
  const propertyCount = landlord.portfolioStats?.totalProperties ?? landlord.propertyIds.length;

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const todayLabel = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const handleExportStatement = () => {
    // Generate CSV for landlord financial statement
    const headers = ["Property", "Tenant", "Rent", "Due Date", "Status"];
    const monthStr = now.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
    const rows = propertiesData.map((prop) => {
      const tenant = tenantsData.find((t) => t.propertyId === prop.id || t.property.includes(prop.title));
      return [
        `"${prop.title}, ${prop.address}"`,
        `"${tenant ? tenant.names : prop.occupant || "Vacant"}"`,
        `"${prop.rent}"`,
        `"01 ${monthStr}"`,
        `"${prop.isVacant ? "Vacant" : prop.ledgerText || "Paid"}"`,
      ];
    });
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
      <header className="overflow-hidden rounded-2xl border border-[#E6EBE6] bg-gradient-to-br from-[#F1F6F1] via-[#F7F8F4] to-[#F8F4EB] shadow-sm">
        <div className="flex flex-col gap-6 px-5 py-5 sm:px-7 sm:py-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[#647268]">
              <CalendarDays className="h-3.5 w-3.5" />
              <span suppressHydrationWarning>{todayLabel || "Your portfolio overview"}</span>
            </div>
            <h1 suppressHydrationWarning className="text-2xl font-semibold tracking-tight text-[#173526] sm:text-3xl">
              {greeting}, {firstName}
            </h1>
            <p className="mt-1.5 text-sm text-[#68756C]">
              Here&apos;s a quick look at {landlord.name}&apos;s portfolio.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/75 px-3 py-2 shadow-sm shadow-[#173526]/[0.03]">
                <Building2 className="h-4 w-4 text-[#55745D]" />
                <span className="text-xs text-[#68756C]">Properties</span>
                <span className="text-sm font-semibold text-[#173526]">{propertyCount}</span>
              </div>
              {landlord.occupancyRate && (
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/75 px-3 py-2 shadow-sm shadow-[#173526]/[0.03]">
                  <ChartNoAxesCombined className="h-4 w-4 text-[#55745D]" />
                  <span className="text-xs text-[#68756C]">Occupancy</span>
                  <span className="text-sm font-semibold text-[#173526]">{formatPercent(landlord.occupancyRate)}</span>
                </div>
              )}
              {landlord.monthlyRent !== undefined && (
                <div className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white/75 px-3 py-2 shadow-sm shadow-[#173526]/[0.03]">
                  <Wallet className="h-4 w-4 text-[#55745D]" />
                  <span className="text-xs text-[#68756C]">Monthly rent</span>
                  <span className="text-sm font-semibold text-[#173526]">{formatCurrency(landlord.monthlyRent)}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center xl:shrink-0">
          <Button
            variant="outline"
            onClick={handleExportStatement}
            className="h-10 rounded-lg border-[#D6DFD6] bg-white/80 px-4 text-sm font-medium text-[#344239] shadow-none hover:bg-white cursor-pointer"
          >
            <Download className="mr-2 h-4 w-4" />
            Export statement
          </Button>
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            className="h-10 rounded-lg bg-[#173526] px-4 text-sm font-semibold text-white shadow-none hover:bg-[#244632] cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            New tenancy
          </Button>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-[#173526] via-[#76947D] to-[#D4BE91]" />
      </header>

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
