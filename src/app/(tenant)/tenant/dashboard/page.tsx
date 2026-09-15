import { PortalPage } from "@/components/shared/portal-page";
import { TenantDashboardWorkspace } from "@/components/tenant/portal-workspaces";
export default function TenantDashboardPage() { return <PortalPage eyebrow="Tenant portal" title="Your tenancy" description="Stay on top of rent, property updates and support from one calm workspace."><TenantDashboardWorkspace /></PortalPage>; }
