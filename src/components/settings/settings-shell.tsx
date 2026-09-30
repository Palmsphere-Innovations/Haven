'use client';

import { useState } from 'react';
import { SettingsSidebar, type SettingsTab } from '@/components/settings/settings-sidebar';
import { AccountTab, type SettingsRole } from '@/components/settings/AccountTab';
import { SecurityTab } from '@/components/settings/SecurityTab';
import { NotificationsTab } from '@/components/settings/NotificationsTab';
import { TeamTab } from '@/components/Teamtab';
import { BillingTab } from '@/components/BillingTab';
import { PwaTab } from '@/components/PwaTab';
import type { SettingsTabConfig } from '@/components/settings/tab-config';

interface SettingsShellProps {
  role: SettingsRole;
  tabs: SettingsTabConfig[];
}

export function SettingsShell({ role, tabs }: SettingsShellProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">Workspace Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage identity, delegated agent permissions, multi-factor authentication, and app options.
        </p>
      </div>

      <div className="bg-white rounded border border-slate-200 shadow-sm flex flex-col md:flex-row min-h-145">
        <SettingsSidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <section className="flex-1 p-6 md:p-8">
          {activeTab === 'account' && <AccountTab role={role} />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'team' && <TeamTab />}
          {activeTab === 'billing' && <BillingTab />}
          {activeTab === 'pwa' && <PwaTab />}
        </section>
      </div>
    </div>
  );
}
