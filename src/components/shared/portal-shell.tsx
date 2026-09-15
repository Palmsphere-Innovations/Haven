"use client";

import type { ReactNode } from "react";
import { Menu, Bell, Search } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/marketing/brand-logo";
import { AgentSidebar } from "@/components/agent/sidebar";
import { TenantSidebar } from "@/components/tenant/sidebar";
import { VendorSidebar } from "@/components/vendor/sidebar";
import { AdminSidebar } from "@/components/admin/sidebar";

interface PortalShellProps {
  children: ReactNode;
  role: "agent" | "tenant" | "vendor" | "admin";
}

export function PortalShell({ children, role }: PortalShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F2F1] p-0 text-[#111827] sm:p-4 lg:p-6">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1600px] overflow-hidden rounded-none border border-black/5 bg-white shadow-2xl sm:rounded-[28px]">
        <div className={`fixed inset-0 z-40 lg:static lg:z-auto ${mobileOpen ? "block" : "hidden lg:block"}`}>
          <button aria-label="Close navigation" className="absolute inset-0 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 h-full w-72">{role === "agent" && <AgentSidebar collapsed={collapsed} onClose={() => setMobileOpen(false)} onToggle={() => setCollapsed((value) => !value)} />}{role === "tenant" && <TenantSidebar collapsed={collapsed} onClose={() => setMobileOpen(false)} onToggle={() => setCollapsed((value) => !value)} />}{role === "vendor" && <VendorSidebar collapsed={collapsed} onClose={() => setMobileOpen(false)} onToggle={() => setCollapsed((value) => !value)} />}{role === "admin" && <AdminSidebar collapsed={collapsed} onClose={() => setMobileOpen(false)} onToggle={() => setCollapsed((value) => !value)} />}</div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col bg-[#FAFAFA]/70">
          <header className="flex h-16 items-center justify-between border-b border-[#ECEEED] bg-white px-4 sm:h-20 sm:px-8">
            <button type="button" aria-label="Open navigation" className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative hidden w-full max-w-md sm:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input className="h-10 w-full rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-xs outline-none focus:border-[#132A20] focus:bg-white" placeholder="Search your workspace..." />
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button type="button" aria-label="Notifications" className="rounded-full p-2 text-gray-500 hover:bg-gray-100"><Bell className="h-5 w-5" /></button>
              <div className="flex items-center justify-center rounded-full bg-white p-1 shadow-sm ring-1 ring-[#ECEEED]">
                <BrandLogo className="h-6 w-auto" />
              </div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-8 lg:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
