'use client';

import React, { useState } from 'react';

export const AccountTab = () => {
  const [formData, setFormData] = useState({
    name: 'Alexander Vance',
    email: 'alexander@apexproperties.com',
    phone: '+1 (555) 019-2831',
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
        <p className="text-xs text-slate-500 mt-0.5">Primary landlord contact and registered entity information.</p>
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

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Entity / Company Name</label>
          <input
            type="text"
            value={formData.entityName}
            onChange={(e) => setFormData({ ...formData, entityName: e.target.value })}
            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>
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