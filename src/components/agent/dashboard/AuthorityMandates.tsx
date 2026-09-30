'use client';

import React from 'react';
import { LandlordGrant } from '@/lib/mock/dashboard';

const grants: LandlordGrant[] = [
  {
    id: 'VH-8820',
    principal: 'Alistair Vance',
    portfolioReg: '#VH-8820',
    status: 'Active Authority',
    tier: 'Tier 1 • Full Management',
    tierType: 'primary',
    properties: [
      'Flat 4B, Kensington Gardens',
      '12 Richmond Hill Mansions',
      '8 Camden Mews',
    ],
    extraUnitsCount: 7,
    grantDate: '01 Jan 2025',
    expiryDate: '31 Dec 2025',
    spendLimit: '£250/order pre-auth',
  },
  {
    id: 'PET-09',
    principal: 'Lord Arthur Pembroke',
    portfolioReg: '#PET-09',
    status: 'Active Authority',
    tier: 'Tier 2 • Maintenance & Comms',
    tierType: 'secondary',
    properties: [
      '27 Blenheim Crescent, Unit 1',
      '27 Blenheim Crescent, Unit 2',
      '27 Blenheim Crescent, Unit 3',
      'Coach House',
    ],
    grantDate: '15 Jun 2025',
    expiryDate: '12 Months Fixed',
    spendLimit: 'Standard',
    redacted: true,
  },
];

export const AuthorityMandates: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-xl text-emerald-800">handshake</span>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Active Authority Mandates (Grants)
            </h2>
            <p className="text-xs text-slate-500">
              Legal scope delegated under statutory Property Management Agreements
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 text-xs text-slate-600">
          <span className="material-symbols-outlined text-sm">shield_with_heart</span>
          <span>Section 48 Landlord &amp; Tenant Act 1987 Compliant</span>
        </div>
      </div>

      {/* Grant Cards Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {grants.map((grant) => (
          <div
            key={grant.id}
            className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 transition-colors hover:bg-slate-100/60"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      {grant.principal.includes('Vance') ? 'Vance Holdings Ltd' : 'Pembroke Estate Trust'}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                      {grant.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Principal: {grant.principal} • Portfolio Reg: {grant.portfolioReg}
                  </span>
                </div>
                <span
                  className={`rounded px-2 py-1 text-[11px] font-semibold ${
                    grant.tierType === 'primary'
                      ? 'bg-[#132A20] text-white'
                      : 'bg-slate-200 text-slate-800'
                  }`}
                >
                  {grant.tier}
                </span>
              </div>

              {/* Property Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {grant.properties.map((prop, i) => (
                  <span
                    key={i}
                    className="rounded border border-slate-200 bg-white px-2 py-1 font-mono text-[11px] text-slate-700 shadow-2xs"
                  >
                    {prop}
                  </span>
                ))}
                {grant.extraUnitsCount && (
                  <span className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 font-mono text-[11px] font-medium text-emerald-800">
                    +{grant.extraUnitsCount} further units
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200/80 pt-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">calendar_clock</span>
                <span>
                  Granted: {grant.grantDate} • Renewal: {grant.expiryDate}
                </span>
              </div>
              {grant.redacted ? (
                <span className="flex items-center gap-0.5 text-xs text-rose-600 font-medium">
                  <span className="material-symbols-outlined text-xs">visibility_off</span>
                  Rent ledger redacted
                </span>
              ) : (
                <span className="text-xs italic text-slate-500">
                  Spend Limit: {grant.spendLimit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Statutory Disclaimer */}
      <div className="flex items-center gap-2 rounded-lg border border-amber-200/70 bg-amber-50/60 p-3 text-xs text-amber-900">
        <span className="material-symbols-outlined shrink-0 text-base text-amber-700">
          gavel
        </span>
        <span>
          <strong>Statutory Governance Note:</strong> Management authority granted via Section 48 Notice.
          Landlords may modify, expand, or immediately revoke property tiers at any time via their Principal Ledger settings.
        </span>
      </div>
    </div>
  );
};