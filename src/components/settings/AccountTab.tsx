'use client';

import React, { useState } from 'react';

export type SettingsRole = 'landlord' | 'agent' | 'tenant';

interface AccountTabProps {
  role: SettingsRole;
}

export const AccountTab = ({ role }: AccountTabProps) => {
  const isLandlord = role === 'landlord';
  const isTenant = role === 'tenant';
  const [formData, setFormData] = useState({
    name: isLandlord ? 'Alexander Vance' : isTenant ? 'Oliver Davies' : 'Eleanor Vance',
    email: isLandlord ? 'alexander@apexproperties.com' : isTenant ? 'oliver.davies@kensington-tenants.co.uk' : 'eleanor.vance@primeheritage.co.uk',
    phone: isLandlord ? '+1 (555) 019-2831' : isTenant ? '+44 7911 123456' : '+44 20 7946 0832',
    entityName: 'Apex Property Holdings LLC',
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <header className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Account Details</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {isLandlord
            ? 'Primary landlord contact and registered entity information.'
            : isTenant
              ? 'Keep your contact details and tenancy reference up to date.'
              : 'Keep your account contact details up to date.'}
        </p>
      </header>

      {/* Avatar Row */}
      <div className="flex items-center gap-4 py-1">
        <div className="w-14 h-14 rounded bg-slate-800 text-white flex items-center justify-center font-medium text-base">
          AV
        </div>
        <div>
          <button
            type="button"
            className="text-xs font-medium px-2.5 py-1 border border-slate-300 rounded text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Change Photo
          </button>
          <p className="text-[10px] text-slate-400 mt-1">PNG or JPG up to 5MB.</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>

        {isLandlord && (
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Entity / Company Name</label>
            <input
              type="text"
              value={formData.entityName}
              onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
        )}
        {isTenant && (
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Tenancy Reference</label>
            <input
              type="text"
              value="UK-TN-1109"
              readOnly
              className="w-full px-3 py-1.5 text-xs rounded border border-slate-200 bg-slate-50 text-slate-500"
            />
          </div>
        )}
      </div>

      <div className="pt-2 flex items-center gap-3">
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium px-4 py-2 rounded transition-colors"
        >
          Save Changes
        </button>
        {isSaved && <span className="text-xs text-emerald-700 font-medium">Saved successfully.</span>}
      </div>
    </form>
  );
};