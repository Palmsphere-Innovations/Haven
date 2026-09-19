'use client';

import React from 'react';

export const RegulatoryFooter: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined shrink-0 text-lg text-emerald-800">
          account_balance
        </span>
        <span className="text-xs text-slate-500">
          Operating under Property Agents Code of Practice, Estate Agents Act 1979, and Landlord and Tenant Act 1985.
          Client money and rent processing governed by Vance Holdings Ltd &amp; Pembroke Estate direct merchant facilities.
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2 font-mono text-[11px] text-slate-400">
        <span>Session ID: PHM-AGT-4481</span>
        <span className="h-1 w-1 rounded-full bg-slate-400" />
        <span className="font-semibold text-emerald-800">Audit Stream Active</span>
      </div>
    </div>
  );
};