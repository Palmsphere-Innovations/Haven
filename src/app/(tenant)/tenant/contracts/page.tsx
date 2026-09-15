import { PortalPage } from "@/components/shared/portal-page";
import { TenantContractsWorkspace } from "@/components/tenant/portal-workspaces";
export default function TenantContractsPage() { return <PortalPage eyebrow="Tenant portal" title="Contracts & receipts" description="Securely access your executed AST, receipts, deposit certificate and inventory report."><TenantContractsWorkspace /></PortalPage>; }
