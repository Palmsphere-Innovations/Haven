import { SectionPage } from "@/components/shared/section-page";
export default function AgentTenantsPage() { return <SectionPage role="Agent portal" title="Tenants" description="Review tenant records, communications, and tenancy health." metrics={[{ label: "Active tenants", value: "86", detail: "12 new this month" }, { label: "Renewals due", value: "7", detail: "Next 30 days" }]} />; }
