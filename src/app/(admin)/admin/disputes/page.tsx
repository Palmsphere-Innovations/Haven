import { SectionPage } from "@/components/shared/section-page";
export default function AdminDisputesPage() { return <SectionPage role="Admin portal" title="Disputes" description="Triage escalations and coordinate fair, auditable outcomes." metrics={[{ label: "Open disputes", value: "23", detail: "4 high priority" }, { label: "Resolved this month", value: "48", detail: "2.1 day average" }]} />; }
