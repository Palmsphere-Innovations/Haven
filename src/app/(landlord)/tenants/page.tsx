"use client";

import React, { useState } from "react";
import { Download, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InviteTenantModal } from "@/components/landlord/tenants/modals/invite-tenant-modal";
import { TenantsMetrics } from "@/components/landlord/tenants/tenants-metrics";
import { TenantsTable } from "@/components/landlord/tenants/tenants-table";
import { TenantsRegulatoryBanner } from "@/components/landlord/tenants/tenants-regulatory-banner";
import { tenantsData } from "@/lib/mock/tenants";

export default function LandlordTenantsPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

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
            39 active tenancies across your portfolio • 42 properties monitored. Reconciled today at{" "}
            <span className="font-mono font-medium text-stone-900">08:30 GMT</span>.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            className="h-9 px-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 rounded-xl text-xs font-semibold shadow-xs"
          >
            <Download className="w-4 h-4 text-stone-500 mr-1.5" />
            Export Directory (CSV)
          </Button>
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            className="h-9 px-4 bg-brand hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            <UserPlus className="w-4 h-4 mr-1.5" />
            + Invite Tenant
          </Button>
        </div>
      </div>

      {/* Modular Section Components */}
      <TenantsMetrics />
      <TenantsTable tenants={tenantsData} />
      <TenantsRegulatoryBanner />

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <InviteTenantModal onClose={() => setIsInviteModalOpen(false)} />
      )}
    </div>
  );
}