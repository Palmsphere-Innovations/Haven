'use client';

import React, { useState } from 'react';

export const SecurityTab = () => {
  const [showCodes, setShowCodes] = useState(false);

  return (
    <div className="space-y-6 max-w-lg">
      <header className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Security & MFA</h2>
        <p className="text-xs text-slate-500 mt-0.5">Password updates and mandatory two-factor settings.</p>
      </header>

      {/* Password Section */}
      <div className="space-y-3 pb-5 border-b border-slate-200">
        <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide">Change Password</h3>
        <div>
          <label className="block text-xs text-slate-600 mb-1">Current Password</label>
          <input
            type="password"
            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:border-slate-900"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-600 mb-1">New Password</label>
          <input
            type="password"
            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:border-slate-900"
          />
        </div>
        <button
          type="button"
          className="border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium px-3 py-1.5 rounded"
        >
          Update Password
        </button>
      </div>

      {/* Mandatory MFA Status */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wide">Two-Factor Authentication</h3>
            <p className="text-xs text-slate-500 mt-0.5">MFA is required for Landlord administrative accounts.</p>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded border border-emerald-200">
            Active
          </span>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-3.5 rounded text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-700">TOTP Authenticator App</span>
            <button type="button" className="text-emerald-700 hover:underline font-medium text-xs">
              Reconfigure
            </button>
          </div>
          <hr className="border-slate-200" />
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-700">Backup Recovery Codes</span>
            <button
              type="button"
              onClick={() => setShowCodes(!showCodes)}
              className="text-slate-700 hover:underline font-medium text-xs"
            >
              {showCodes ? 'Hide' : 'View Codes'}
            </button>
          </div>
          {showCodes && (
            <div className="bg-white border border-slate-200 p-2.5 rounded font-mono text-slate-800 grid grid-cols-2 gap-1.5 text-[11px] mt-2">
              <span>9A8B-11C2</span>
              <span>4F3D-88E9</span>
              <span>001A-774B</span>
              <span>55E2-99D3</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};