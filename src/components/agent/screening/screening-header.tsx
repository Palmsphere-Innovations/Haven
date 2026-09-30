"use client";
import React from 'react';
import { ShieldCheck, Building, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ScreeningHeader() {
  return (
    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-[#132A20]/70 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Delegated Tenant Onboarding • Scoped Referencing Portal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
          Tenant Screening &amp; Referencing
        </h1>
        <p className="text-sm text-[#58605b] max-w-3xl">
          Track applicant referencing, KYC verification, and statutory Right to Rent audits across your 14 delegated managed properties for Prime Heritage Management Ltd.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2 xl:pt-0">
        <div className="relative min-w-[240px]">
          <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-[#727974] w-4 h-4 pointer-events-none" />
          <select className="w-full pl-9 pr-3 py-1.5 bg-white text-[#1c1b1b] rounded text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-[#132A20]">
            <option>All Landlords: Vance Holdings Ltd, Pembroke Estate Trust</option>
            <option>Vance Holdings Ltd (8 Units)</option>
            <option>Pembroke Estate Trust (6 Units)</option>
          </select>
        </div>
        <Button variant="outline" className="flex items-center gap-2 bg-white border-none shadow-sm hover:bg-[#f0eded] text-[#1c1b1b]">
          <Download className="w-4 h-4" />
          <span>Export Referencing Dossier (CSV)</span>
        </Button>
      </div>
    </div>
  );
}