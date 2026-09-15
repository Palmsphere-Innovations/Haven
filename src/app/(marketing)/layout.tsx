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
    <div className="bg-[#FCF9F8] text-neutral-900 flex flex-col min-h-screen selection:bg-[#132A20] selection:text-white">
      <Header />
      <main className="flex-grow pt-28 sm:pt-32 pb-16">{children}</main>
      <Footer />
    </div>
  );
}