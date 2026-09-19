'use client';

import React from 'react';
import Link from 'next/link';

export const TeamTab = () => {
  return (
    <div className="space-y-4 max-w-lg">
      <header className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Team & Access</h2>
        <p className="text-xs text-slate-500 mt-0.5">Manage agent access levels and delegated operational tiers.</p>
      </header>

      <div className="bg-slate-50 border border-slate-200 p-4 rounded text-xs space-y-3">
        <p className="text-slate-700 leading-relaxed">
          Agent delegation and tier permissions are managed through the central <strong>Agent Management Console</strong>.
        </p>
        <div>
          <Link
            href="/agents"
            className="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            Open Agent Management →
          </Link>
        </div>
      </div>
    </div>
  );
};