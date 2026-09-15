import { SectionPage } from "@/components/shared/section-page";
export default function VendorJobsPage() { return <SectionPage role="Vendor portal" title="Jobs" description="Review dispatched tickets, schedules, and job evidence." metrics={[{ label: "Open jobs", value: "8", detail: "3 high priority" }, { label: "Completed", value: "42", detail: "This quarter" }]} />; }
