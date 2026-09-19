import { SectionPage } from "@/components/shared/section-page";
export default function VendorInvoicesPage() { return <SectionPage role="Vendor portal" title="Invoices" description="Create, submit, and track payment for completed work." metrics={[{ label: "Outstanding", value: "£2,840", detail: "4 invoices" }, { label: "Paid this month", value: "£5,420", detail: "On schedule" }]} />; }
