'use client';

import React from 'react';
import { StatMetric } from '@/lib/mock/dashboard';

const stats: StatMetric[] = [
  {
    title: 'Open Maintenance',
    value: '06',
    subtitle: 'active tickets',
    badgeText: '2 urgent trades dispatch req. (+2 today)',
    badgeType: 'urgent',
    icon: 'home_repair_service',
  },
  {
    title: 'Managed Properties',
    value: '14',
    subtitle: 'Assigned Units',
    badgeText: 'Scoped Book',
    footNote: 'Across 3 separate portfolios',
    icon: 'apartment',
  },
  {
    title: 'Active Tenancies',
    value: '12',
    subtitle: 'Active Leases',
    badgeText: '2 Q4 Renewals',
    footNote: '98.4% Occupancy',
    icon: 'badge',
  },
  {
    title: 'Rent Arrears',
    value: '£1,880.00',
    subtitle: '',
    badgeText: 'Restricted Ledger',
    footNote: '1 In Grace (3d)',
    icon: 'payments',
  },
];

export const StatCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Primary Card */}
      <div className="relative flex h-40 flex-col justify-between overflow-hidden rounded-xl bg-[#132A20] p-4 text-white shadow-sm">
        <div className="flex items-start justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200/80">
            {stats[0].title}
          </span>
          <span className="material-symbols-outlined text-xl text-emerald-200/80">
            {stats[0].icon}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold">{stats[0].value}</span>
            <span className="text-xs text-emerald-200/80">{stats[0].subtitle}</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 border-t border-white/10 pt-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
              2
            </span>
            <span className="text-[11px] text-emerald-100">{stats[0].badgeText}</span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex h-40 flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {stats[1].title}
          </span>
          <span className="material-symbols-outlined text-xl text-slate-400">
            {stats[1].icon}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-slate-900">{stats[1].value}</span>
            <span className="text-xs text-slate-500">{stats[1].subtitle}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-[11px] text-slate-500">{stats[1].footNote}</span>
            <span className="text-[11px] font-semibold text-emerald-700">
              {stats[1].badgeText}
            </span>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="flex h-40 flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {stats[2].title}
          </span>
          <span className="material-symbols-outlined text-xl text-slate-400">
            {stats[2].icon}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-slate-900">{stats[2].value}</span>
            <span className="text-xs text-slate-500">{stats[2].subtitle}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-[11px] text-slate-500">{stats[2].footNote}</span>
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-700 border border-slate-200/60">
              {stats[2].badgeText}
            </span>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className="flex h-40 flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {stats[3].title}
            </span>
            <span
              className="material-symbols-outlined text-xs text-slate-400"
              title="Summary only. Direct reconciliation restricted to Landlord Principal"
            >
              lock
            </span>
          </div>
          <span className="material-symbols-outlined text-xl text-slate-400">
            {stats[3].icon}
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-bold text-slate-900">{stats[3].value}</span>
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-[10px] font-medium text-rose-700 border border-rose-200/60">
              {stats[3].footNote}
            </span>
            <span className="truncate text-[11px] text-slate-400" title="Ledger reconciled by Principal">
              {stats[3].badgeText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};