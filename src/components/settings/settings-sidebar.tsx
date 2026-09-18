'use client';

import React from 'react';

export type SettingsTab = 'account' | 'notifications' | 'security' | 'team' | 'billing' | 'pwa';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

const NAV_ITEMS: { id: SettingsTab; label: string; desc: string }[] = [
  { id: 'account', label: 'Account', desc: 'Profile & business entity' },
  { id: 'notifications', label: 'Notifications', desc: 'Alert preferences & thresholds' },
  { id: 'security', label: 'Security', desc: 'Password & MFA management' },
  { id: 'team', label: 'Team & Access', desc: 'Agent management links' },
  { id: 'billing', label: 'Billing', desc: 'Invoices & subscription plan' },
  { id: 'pwa', label: 'PWA / App', desc: 'Standalone app install settings' },
];

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-slate-200 p-3 bg-slate-50/60">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible no-scrollbar">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex flex-col whitespace-nowrap ${
                isActive
                  ? 'bg-slate-200/80 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[10px] text-slate-400 font-normal hidden md:inline mt-0.5">{item.desc}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};