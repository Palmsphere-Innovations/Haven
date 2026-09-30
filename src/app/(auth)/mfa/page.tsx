"use client";

import { Suspense } from "react";
import { VerifyIdentityForm } from "@/components/auth/mfa-form";

export default function VerifyIdentityPage() {
  return (
    <div
      className="flex-1 flex flex-col justify-center items-center py-16 px-4 sm:px-6"
      data-purpose="auth-verification-flow"
    >
      <Suspense fallback={null}>
        <VerifyIdentityForm />
      </Suspense>
    </div>
  );
}