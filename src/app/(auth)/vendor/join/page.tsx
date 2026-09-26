import { VendorJoinFlow } from "@/components/vendor/onboarding/vendor-join-flow";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join as Vendor & Contractor | Haven Property Platform",
  description: "Register your UK trade credentials or claim an existing verified contractor listing to receive pre-authorized work orders and guaranteed escrow payments.",
};

export default function VendorJoinPage() {
  return (
    <div className="min-h-screen py-6 sm:py-10 bg-[#FAFAFA]">
      <VendorJoinFlow />
    </div>
  );
}
