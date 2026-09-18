'use client';

import React, { useState } from 'react';

interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-2.5">
    <div className="pr-4">
      <div className="text-xs font-semibold text-slate-800">{label}</div>
      <div className="text-[11px] text-slate-500">{description}</div>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
        checked ? 'bg-emerald-600' : 'bg-slate-300'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-4' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

export const NotificationsTab = () => {
  const [toggles, setToggles] = useState({
    rentAlerts: true,
    maintenanceUpdates: true,
    complianceDeadlines: true,
    agentActivity: false,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4 max-w-lg">
      <header className="border-b border-slate-100 pb-3">
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Notification Preferences</h2>
        <p className="text-xs text-slate-500 mt-0.5">Control transactional and operational notifications.</p>
      </header>

      <div className="divide-y divide-slate-100">
        <Toggle
          label="Rent alerts"
          description="Successful clearing, delayed rent, and collection exceptions."
          checked={toggles.rentAlerts}
          onChange={() => handleToggle('rentAlerts')}
        />
        <Toggle
          label="Maintenance updates"
          description="High-priority vendor assignments and ticket status changes."
          checked={toggles.maintenanceUpdates}
          onChange={() => handleToggle('maintenanceUpdates')}
        />
        <Toggle
          label="Compliance deadlines"
          description="Reminders for safety inspections, certificates, and local filings."
          checked={toggles.complianceDeadlines}
          onChange={() => handleToggle('complianceDeadlines')}
        />
        <Toggle
          label="Agent activity"
          description="Actions taken by assigned property management agents."
          checked={toggles.agentActivity}
          onChange={() => handleToggle('agentActivity')}
        />
      </div>
    </div>
  );
};