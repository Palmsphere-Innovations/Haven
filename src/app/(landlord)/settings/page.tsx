import { SettingsShell } from '@/components/settings/settings-shell';
import { landlordTabs } from '@/components/settings/tab-config';

export default function SettingsPage() {
  return <SettingsShell role="landlord" tabs={landlordTabs} />;
}