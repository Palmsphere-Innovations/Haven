'use client';

import React from 'react';
import { Inspection, ComplianceItem } from '@/lib/mock/dashboard';

const inspections: Inspection[] = [
  {
    id: 'insp-1',
    property: 'Flat 4B, Kensington Gdns',
    type: 'Routine 6-Month Interim Check',
    date: 'Thu, 24 Oct 2024 • 10:30 AM',
    status: 'Notified',
  },
  {
    id: 'insp-2',
    property: '27 Blenheim Crescent (U1)',
    type: 'Pre-renewal Condition Review',
    date: 'Mon, 28 Oct 2024 • 14:00 PM',
    status: 'Draft',
  },
];

const complianceItems: ComplianceItem[] = [
  {
    id: 'comp-1',
    title: 'Gas Safety Certificate (CP12)',
    property: 'Flat 4B Kensington Gardens',
    landlord: 'Vance Holdings',
    status: 'Urgent',
    badgeText: 'Due in 5 days',
    extraInfo: 'Gas Safe #48291 assigned',
  },
  {
    id: 'comp-2',
    title: 'Section 11 HHSRS Audit',
    property: '27 Blenheim Crescent (Units 1-3)',
    landlord: 'Pembroke Estate Trust',
    status: 'Passed',
    badgeText: 'Passed • Low Risk',
    extraInfo: 'Verified 12 Oct',
  },
  {
    id: 'comp-3',
    title: 'EICR 5-Year Inspection',
    property: '12 Richmond Hill Mansions',
    landlord: 'Vance Holdings',
    status: 'Valid',
    badgeText: 'Valid to 2027',
    extraInfo: 'Audit #EICR-9921',
  },
];

export const InspectionsAndCompliance: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* Upcoming Inspections Card */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-lg text-emerald-800">
              event_available
            </span>
            <h3 className="text-xs font-bold text-slate-900">Upcoming Inspections</h3>
          </div>
          <button className="text-[11px] font-semibold text-emerald-800 hover:underline">
            Schedule
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {inspections.map((insp) => (
            <div
              key={insp.id}
              className="flex items-start justify-between rounded-lg border border-slate-200/60 bg-slate-50/70 p-3"
            >
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-900">
                  {insp.property}
                </span>
                <span className="text-[11px] text-slate-500">{insp.type}</span>
                <span className="mt-1 font-mono text-[11px] font-medium text-emerald-800">
                  {insp.date}
                </span>
              </div>
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-semibold ${
                  insp.status === 'Notified'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {insp.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Compliance Deadlines */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-lg text-rose-600">
              policy
            </span>
            <h3 className="text-xs font-bold text-slate-900">Statutory Compliance</h3>
          </div>
          <span className="font-mono text-[10px] text-slate-400">Assigned Book</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Urgent Item */}
          <div className="flex flex-col gap-1 rounded-lg border-l-4 border-rose-500 bg-rose-50/50 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-950">
                {complianceItems[0].title}
              </span>
              <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                {complianceItems[0].badgeText}
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              {complianceItems[0].property} • Landlord: {complianceItems[0].landlord}
            </p>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="text-[11px] italic text-slate-500">
                {complianceItems[0].extraInfo}
              </span>
              <a href="#" className="text-[11px] font-semibold text-[#132A20] hover:underline">
                Confirm Booking
              </a>
            </div>
          </div>

          {/* Standard Compliance Items */}
          {complianceItems.slice(1).map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-0.5 rounded-lg border border-slate-200/60 bg-slate-50/70 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-900">{item.title}</span>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    item.status === 'Passed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {item.badgeText}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {item.property} • {item.extraInfo}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Agent Directives Links */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-slate-100/70 p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Fast Agent Links
        </span>
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            type="button"
            className="flex flex-col rounded-lg border border-slate-200 bg-white p-2.5 text-left shadow-2xs hover:bg-slate-50 transition-all"
          >
            <span className="material-symbols-outlined text-base text-emerald-800">
              contract
            </span>
            <span className="mt-1 text-xs font-semibold text-slate-800">
              Draft AST Renewal
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col rounded-lg border border-slate-200 bg-white p-2.5 text-left shadow-2xs hover:bg-slate-50 transition-all"
          >
            <span className="material-symbols-outlined text-base text-emerald-800">
              engineering
            </span>
            <span className="mt-1 text-xs font-semibold text-slate-800">
              Directory of Trades
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};