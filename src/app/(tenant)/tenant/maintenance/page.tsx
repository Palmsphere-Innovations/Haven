import { PortalPage } from "@/components/shared/portal-page";
import { TenantMaintenanceWorkspace } from "@/components/tenant/portal-workspaces";
export default function TenantMaintenancePage() { return <PortalPage eyebrow="Tenant portal" title="Report maintenance" description="Log an issue, add photos and follow progress through to resolution."><TenantMaintenanceWorkspace /></PortalPage>; }
