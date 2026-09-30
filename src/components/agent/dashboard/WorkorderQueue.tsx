'use client';

import React, { useState } from 'react';
import { WorkOrder } from '@/lib/mock/dashboard';

const workOrders: WorkOrder[] = [
  {
    id: '#MN-104',
    title: 'Boiler Pressure Drop & Heating Lockout',
    property: 'Flat 4B, 18 Kensington Gardens',
    tenant: 'Oliver Davies',
    contractor: 'Apex Heating Ltd',
    amount: '£180.00',
    status: 'Quote Approved',
    exceedsCap: false,
    capNotice: 'Auto-authorized under £250 cap',
  },
  {
    id: '#MN-108',
    title: 'Roof Valley Flashing Ingress • Ceiling Damp',
    property: '12 Richmond Hill Mansions (Unit 2)',
    tenant: 'Dr. Aris Thorne',
    contractor: 'Premier Roofing SW',
    amount: '£850.00',
    status: 'Awaiting Sign-off',
    exceedsCap: true,
    capNotice: 'Exceeds £250 delegated limit (£600 delta)',
  },
  {
    id: '#MN-110',
    title: 'Intercom Entryway Buzzer Fault • Wiring Check',
    property: '8 Camden Mews',
    tenant: 'Elena Rostova',
    contractor: 'ElectraSafe Ltd',
    amount: '£95.00',
    status: 'Dispatched',
    exceedsCap: false,
  },
];

const filterTabs = [
  'All Assigned (6)',
  'Urgent Callouts (2)',
  'Awaiting Sign-off (1)',
  'Dispatched (3)',
];

export const WorkorderQueue: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All Assigned (6)');

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Assigned Workorder Queue</h2>
          <p className="text-xs text-slate-500">
            Filtered exclusively to Eleanor Vance&apos;s 14 delegated properties
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 self-start rounded-lg bg-[#132A20] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1c3c2e] transition-colors shadow-sm sm:self-auto"
        >
          <span className="material-symbols-outlined text-sm">bolt</span>
          <span>Emergency Callout</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeTab === tab
                ? 'bg-[#132A20] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Work Orders List */}
      <div className="flex flex-col gap-3 pt-1">
        {workOrders.map((order) => {
          if (order.exceedsCap) {
            return (
              <div
                key={order.id}
                className="flex flex-col gap-2 rounded-xl border-l-4 border-amber-500 bg-amber-50/40 p-4 transition-colors"
              >
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-900">
                      {order.id}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span className="text-xs font-semibold text-slate-900">
                      {order.property}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
                      Awaiting Landlord Sign-off
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {order.amount}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-2 text-xs text-slate-600 sm:flex-row sm:items-center">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{order.title}</span>
                    <span className="text-[11px] text-slate-500">
                      Tenant: {order.tenant} • Contractor: {order.contractor} •{' '}
                      <strong className="text-rose-600">{order.capNotice}</strong>
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-xs">description</span>
                      Review Quote
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded bg-[#132A20] px-2.5 py-1 text-[11px] font-medium text-white hover:bg-[#1c3c2e] transition-colors"
                    >
                      <span className="material-symbols-outlined text-xs">forward_to_inbox</span>
                      Request Alistair Sign-off
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={order.id}
              className="flex flex-col gap-2 rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 transition-colors hover:bg-slate-100/60"
            >
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-900">
                    {order.id}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span className="text-xs font-semibold text-slate-900">
                    {order.property}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      order.status === 'Quote Approved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {order.status === 'Dispatched' ? 'Dispatched for 14:00' : order.status}
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {order.amount}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-2 text-xs text-slate-600 sm:flex-row sm:items-center">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-900">{order.title}</span>
                  <span className="text-[11px] text-slate-500">
                    Tenant: {order.tenant} • Contractor: {order.contractor}
                    {order.capNotice && ` • ${order.capNotice}`}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {order.status === 'Dispatched' ? (
                    <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-800 font-semibold">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      Tech En Route
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="flex items-center gap-1 rounded border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-xs">chat</span>
                        Contact Tenant
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1 rounded bg-[#132A20] px-2.5 py-1 text-[11px] font-medium text-white hover:bg-[#1c3c2e] transition-colors"
                      >
                        <span className="material-symbols-outlined text-xs">send</span>
                        Dispatch Job
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer link */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
        <span>Showing 3 of 6 active allocated tickets</span>
        <a
          href="#"
          className="flex items-center gap-0.5 text-xs font-semibold text-emerald-800 hover:underline"
        >
          <span>View Full Maintenance Ledger</span>
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </a>
      </div>
    </div>
  );
};