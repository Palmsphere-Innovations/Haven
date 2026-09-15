import { PortalPage } from "@/components/shared/portal-page";
import { AgentScreeningWorkspace } from "@/components/agent/portal-workspaces";
export default function AgentScreeningPage() { return <PortalPage eyebrow="Agent portal" title="Tenant Screening & Onboarding" description="Move applicants from referencing through approval with a clear audit trail."><AgentScreeningWorkspace /></PortalPage>; }
