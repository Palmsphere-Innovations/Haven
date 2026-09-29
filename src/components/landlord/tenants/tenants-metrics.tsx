"use client";

import React, { useMemo } from "react";
import { Key, Mail, CreditCard, ShieldCheck } from "lucide-react";
import { tenantsData, type TenantRecord } from "@/lib/mock/tenants";
import { propertiesData } from "@/lib/mock/properties";
import { formatCurrency } from "@/lib/formatters";

interface TenantsMetricsProps {
  tenants?: TenantRecord[];
  totalProperties?: number;
}

export function TenantsMetrics({
  tenants = tenantsData,
  totalProperties = propertiesData.length,
}: TenantsMetricsProps) {
  const { activeCount, occupancyPct, totalRoll, pendingCount } = useMemo(() => {
    const active = tenants.length;
    const totalProps = Math.max(active, totalProperties);
    const occ = totalProps > 0 ? ((active / totalProps) * 100).toFixed(1) : "0";

    const roll = tenants.reduce((acc, t) => {
      const val = Number(String(t.rent).replace(/[^0-9.]/g, "")) || 0;
      return acc + val;
    }, 0);

    const pending = tenants.filter(
      (t) =>
        t.ledgerStatus === "Due in 3 days" ||
        t.ledgerStatus === "Awaiting Setup" ||
        t.termType?.toLowerCase().includes("pending")
    ).length;

    return {
      activeCount: active,
      occupancyPct: occ,
      totalRoll: roll,
      pendingCount: pending,
    };
  }, [tenants, totalProperties]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Active Tenancies
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-stone-900">{activeCount}</span>
            <span className="text-xs text-stone-500 font-mono">{occupancyPct}% occupancy</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center text-brand">
          <Key className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Pending Renewals / Invites
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-stone-900">{pendingCount}</span>
            <span className="text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
              {pendingCount > 0 ? "Action required" : "Up to date"}
            </span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center text-stone-500">
          <Mail className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Total Monthly Roll
          </span>
          <div className="mt-1 text-2xl font-bold text-stone-900 font-mono">
            {formatCurrency(totalRoll)}
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center text-brand">
          <CreditCard className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Identity &amp; Right to Rent
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-stone-900">100%</span>
            <span className="text-xs text-stone-500">Statutory verified</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center text-emerald-700">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
