// src/app/(marketing)/layout.tsx
import React from "react";
import { Header } from "@/components/marketing/header";
import { Footer } from "@/components/marketing/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-surface text-neutral-900 flex flex-col min-h-screen selection:bg-brand selection:text-white">
      <Header />
      <main className="grow pt-16 pb-12 sm:pt-20 sm:pb-16">{children}</main>
      <Footer />
    </div>
  );
}
