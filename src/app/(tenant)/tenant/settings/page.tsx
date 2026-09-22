import { SettingsShell } from '@/components/settings/settings-shell';
import { standardTabs } from '@/components/settings/tab-config';

export default function SettingsPage() {
  return <SettingsShell role="tenant" tabs={standardTabs} />;
}
