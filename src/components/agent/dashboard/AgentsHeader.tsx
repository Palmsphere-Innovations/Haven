'use client';

import React from 'react';

export const AgentHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
          <span className="material-symbols-outlined text-sm">verified_user</span>
          <span>Delegated Workspace • Prime Heritage Management Ltd</span>
        </div>
        <div className="flex items-baseline gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Agent Dashboard
          </h1>
          <span className="hidden items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 border border-slate-200 sm:inline-flex">
            UK Regulated Mandate
          </span>
        </div>
        <p className="max-w-2xl text-xs text-slate-600">
          Operating under 2 Active Landlord Grants overseeing 14 Assigned Units across London &amp; Surrey.
        </p>
      </div>

      {/* Agent Identity Capsule */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5 px-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#132A20] text-xs font-bold text-white">
            EV
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              Eleanor Vance <span className="text-[10px] text-slate-500 font-normal">(MARLA)</span>
            </span>
            <span className="text-[10px] text-slate-500">Prime Heritage Management</span>
          </div>
        </div>
        <div className="hidden h-6 w-px bg-slate-200 sm:block" />
        <div
          className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs"
          title="Delegated authority: Maintenance, Habitability & Rent Oversight"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-600" />
          <span className="font-semibold text-slate-800 text-[11px]">Tier 1: Full Management</span>
          <span className="material-symbols-outlined text-xs text-slate-400">info</span>
        </div>
      </div>
    </div>
  );
};