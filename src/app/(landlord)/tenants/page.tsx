"use client";

import React, { useState } from "react";
import { Download, UserPlus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InviteTenantModal } from "@/components/landlord/tenants/modals/invite-tenant-modal";
import { TenantsMetrics } from "@/components/landlord/tenants/tenants-metrics";
import { TenantsTable } from "@/components/landlord/tenants/tenants-table";
import { TenantsRegulatoryBanner } from "@/components/landlord/tenants/tenants-regulatory-banner";
import { tenantsData, type TenantRecord } from "@/lib/mock/tenants";

export default function LandlordTenantsPage() {
  const [tenants, setTenants] = useState<TenantRecord[]>(tenantsData);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleExportCSV = () => {
    const headers = [
      "Tenant Names",
      "Property",
      "Unit",
      "Rent",
      "Payment Method",
      "Ledger Status",
      "Tenancy Term",
      "Start Date",
      "End Date",
      "Contact",
    ];

    const rows = tenants.map((t) => [
      `"${t.names}"`,
      `"${t.property}"`,
      `"${t.unit}"`,
      `"${t.rent}"`,
      `"${t.paymentMethod}"`,
      `"${t.ledgerStatus}"`,
      `"${t.termType}"`,
      `"${t.startDate}"`,
      `"${t.endDate}"`,
      `"${t.contact}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `haven-tenants-directory-${new Date().toISOString().split("T")[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotice("Tenants Directory CSV exported successfully.");
    setTimeout(() => setNotice(null), 3500);
  };

  const handleAddTenant = (names: string, email: string, property: string) => {
    const initials = names
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    const newTenant: TenantRecord = {
      id: `t-${Date.now()}`,
      propertyId: null,
      names,
      initials: initials || "NT",
      contact: email,
      property: property.split("(")[0].trim(),
      unit: "Unit 1",
      rent: "£1,850.00",
      paymentMethod: "Direct Debit",
      ledgerStatus: "Paid",
      ledgerBadgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-200",
      termType: "AST (Fixed Term 12m)",
      startDate: "01 Nov 2026",
      endDate: "31 Oct 2027",
      inviteStatus: "Active",
      isInvitePending: false,
    };

    setTenants((prev) => [newTenant, ...prev]);
    setNotice(`Invitation dispatched to ${names} (${email}). Added to directory.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-2 border-b border-[#ECEEED]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-stone-900">
              Tenants
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F0EEE9] text-stone-600 text-[11px] font-semibold tracking-wider uppercase border border-[#E2DED6]">
              Tenancy Directory
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {tenants.length} monitored tenancies across your portfolio • 42 properties registered.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="h-9 px-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-stone-500 mr-1.5" />
            Export Directory (CSV)
          </Button>
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            className="h-9 px-4 bg-brand hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            + Invite Tenant
          </Button>
        </div>
      </div>

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Modular Section Components */}
      <TenantsMetrics />
      <TenantsTable tenants={tenants} />
      <TenantsRegulatoryBanner />

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <InviteTenantModal
          onClose={() => setIsInviteModalOpen(false)}
          onAdd={handleAddTenant}
        />
      )}
    </div>
  );
}
