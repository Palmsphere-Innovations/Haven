import { SectionPage } from "@/components/shared/section-page";
export default function AuditLogPage() { return <SectionPage role="Admin portal" title="Audit Log" description="Trace sensitive actions across every tenant and workspace." metrics={[{ label: "Events today", value: "4,821", detail: "No anomalies detected" }, { label: "Flagged events", value: "3", detail: "Needs review" }]} />; }
