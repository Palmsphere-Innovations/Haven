"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ContactHeader } from "@/components/tenant/contact/contact-header";
import { MessageThread } from "@/components/tenant/contact/message-thread";
import { ContactInfoCard } from "@/components/tenant/contact/contact-info-card";

export default function TenantContactPage() {
  const router = useRouter();
  const propertyAddress = "Flat 4B, 18 Kensington Gardens, London W2 4QH";
  const contactName = "Eleanor Vance";
  const contactRole: "Landlord" | "Agent" = "Agent";

  const [prefillDraft, setPrefillDraft] = useState("");

  const handleRentQuery = () => {
    setPrefillDraft(
      "Hi Eleanor, I have a query regarding my upcoming rent collection on the 1st of the month. Could you please confirm the Bacs mandate reference?"
    );
  };

  return (
    <div className="w-full">
      <ContactHeader
        propertyAddress={propertyAddress}
        contactName={contactName}
        contactRole={contactRole}
        onMaintenanceClick={() => router.push("/tenant/maintenance?action=new")}
        onIssueClick={() => router.push("/tenant/maintenance?action=new")}
        onRentQueryClick={handleRentQuery}
        onUploadDocClick={() => router.push("/tenant/documents")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <MessageThread
            contactName={contactName}
            prefillDraft={prefillDraft}
          />
        </div>
        <div className="lg:col-span-4 space-y-6">
          <ContactInfoCard
            name={contactName}
            role="Managing Agent"
            company="Prime Heritage Management"
            phone="+44 20 7946 0912"
            email="eleanor.vance@primeheritage.co.uk"
            availability="09:00–18:00 (Mon–Fri)"
          />
        </div>
      </div>
    </div>
  );
}
