import type { SettingsTab } from '@/components/settings/settings-sidebar';

export interface SettingsTabConfig {
  id: SettingsTab;
  label: string;
  desc: string;
}

export const landlordTabs: SettingsTabConfig[] = [
  { id: 'account', label: 'Account', desc: 'Profile & business entity' },
  { id: 'notifications', label: 'Notifications', desc: 'Alert preferences & thresholds' },
  { id: 'security', label: 'Security', desc: 'Password & MFA management' },
  { id: 'team', label: 'Team & Access', desc: 'Agent management links' },
  { id: 'billing', label: 'Billing', desc: 'Invoices & subscription plan' },
  { id: 'pwa', label: 'PWA / App', desc: 'Standalone app install settings' },
];

export const standardTabs: SettingsTabConfig[] = [
  { id: 'account', label: 'Account', desc: 'Profile & contact details' },
  { id: 'notifications', label: 'Notifications', desc: 'Alert preferences & thresholds' },
  { id: 'security', label: 'Security', desc: 'Password & MFA management' },
  { id: 'pwa', label: 'PWA / App', desc: 'Standalone app install settings' },
];
