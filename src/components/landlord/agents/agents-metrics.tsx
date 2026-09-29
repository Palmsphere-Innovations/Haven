"use client";

import React, { useMemo } from "react";
import { UserCheck, ShieldCheck, RefreshCw, Building2 } from "lucide-react";
import { agentsData, type AgentRecord } from "@/lib/mock/agents";
import { propertiesData } from "@/lib/mock/properties";

interface AgentMetricsProps {
  agents?: AgentRecord[];
  totalProperties?: number;
}

export function AgentMetrics({
  agents = agentsData,
  totalProperties = propertiesData.length,
}: AgentMetricsProps) {
  const { activeCount, pendingCount, managedCount, totalPropsCount, pct, unassignedCount } =
    useMemo(() => {
      const active = agents.filter((a) => a.status === "Active").length;
      const pending = agents.filter((a) => a.status === "Pending Handover").length;
      const totalProps = Math.max(propertiesData.length, totalProperties);
      const sumProperties = agents.reduce((sum, a) => sum + (a.propertiesCount || 0), 0);
      const managed = Math.min(sumProperties, totalProps);
      const percentage = totalProps > 0 ? ((managed / totalProps) * 100).toFixed(1) : "0";
      const unassigned = Math.max(0, totalProps - managed);

      return {
        activeCount: active,
        pendingCount: pending,
        managedCount: managed,
        totalPropsCount: totalProps,
        pct: percentage,
        unassignedCount: unassigned,
      };
    }, [agents, totalProperties]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Active Agents
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] flex items-center justify-center text-[#132A20]">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-stone-900">{activeCount}</span>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
              100% verified
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% compliant licensing
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Pending Handover
          </span>
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
            <RefreshCw className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-stone-900">{pendingCount}</span>
            <span className="text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
              Action queue
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">Awaiting portfolio signoff</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Managed Properties
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center text-stone-700">
            <Building2 className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-stone-900">
              {managedCount} <span className="text-sm font-normal text-stone-500">/ {totalPropsCount}</span>
            </span>
            <span className="text-[10px] font-semibold bg-[#F0EEE9] text-stone-700 px-2 py-0.5 rounded-full">
              {pct}%
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">{unassignedCount} unassigned / self-managed</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Delegated Authority
          </span>
          <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] flex items-center justify-center text-[#132A20]">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-stone-900">Strict SLAs</span>
            <span className="text-[10px] font-semibold bg-[#E8EFEA] text-[#132A20] px-2 py-0.5 rounded-full">
              Tier 1-3
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">Statutory deposit &amp; rent escrow</p>
        </div>
      </div>
    </div>
  );
}
