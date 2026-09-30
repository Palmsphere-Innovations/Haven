'use client';

import React from 'react';

export type SettingsTab = 'account' | 'notifications' | 'security' | 'team' | 'billing' | 'pwa';

interface SettingsSidebarProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  tabs: { id: SettingsTab; label: string; desc: string }[];
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <aside className="w-full md:w-60 border-b md:border-b-0 md:border-r border-slate-200 p-3 bg-slate-50/60">
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible no-scrollbar">
        {tabs.map((item) => {
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