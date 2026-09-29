import { VendorJoinFlow } from "@/components/vendor/onboarding/vendor-join-flow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contractor Verification & Trade Credentials | Haven Vendor Portal",
  description: "Manage statutory trade accreditations, Public Liability insurance policies, and operational coverage for Haven property maintenance dispatch.",
};

export default function VendorVerificationPage() {
  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      <VendorJoinFlow />
    </div>
  );
}
