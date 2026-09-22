import { ContactHeader } from "@/components/tenant/contact/contact-header";
import { MessageThread } from "@/components/tenant/contact/message-thread";
import { ContactInfoCard } from "@/components/tenant/contact/contact-info-card";
export default function TenantContactPage() {
  const propertyAddress = "Flat 4B, 18 Kensington Gardens";
  const contactName = "Eleanor Vance";
  const contactRole: "Landlord" | "Agent" = "Agent";

  return (
    <div className="w-full">
      <ContactHeader
        propertyAddress={propertyAddress}
        contactName={contactName}
        contactRole={contactRole}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <MessageThread contactName={contactName} />
        </div>
        <div className="lg:col-span-4">
          <ContactInfoCard
            name={contactName}
            role="Managing Agent"
            company="Prime Heritage Management"
            phone="+44 20 7946 0912"
            email="eleanor.vance@primeheritage.co.uk"
            availability="09:00–18:00"
          />
        </div>
      </div>
    </div>
  );
}
