
'use client';

import React from 'react';

export const BillingTab = () => {
  return (
    <div className="space-y-4 max-w-lg">
      <header className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Billing & Plan</h2>
        <p className="text-xs text-slate-500 mt-0.5">Subscription details and payment history.</p>
      </header>

      <div className="border border-slate-200 rounded p-4 text-xs space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-slate-900">Portfolio Scale Tier</span>
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">Active</span>
        </div>
        <p className="text-slate-500">Up to 50 active property units managed across your portfolio.</p>
      </div>
    </div>
  );
};