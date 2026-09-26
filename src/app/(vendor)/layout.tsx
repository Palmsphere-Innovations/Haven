"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import { Sidebar } from "@/components/shared/sidebar";
import { TopHeader } from "@/components/shared/top-header";
import { RouteTransition } from "@/components/shared/route-transition";
import { vendorNavItems } from "@/components/vendor/nav-items";

export default function VendorLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-start justify-center bg-[#F0F2F1] text-[#111827] antialiased">
      <div className="relative flex h-screen max-h-screen w-full max-w-[1600px] flex-col overflow-hidden border border-black/5 bg-white shadow-2xl sm:rounded-[32px] md:flex-row">
        <div className="hidden md:block">
          <Sidebar
            title="Vendor"
            navItems={vendorNavItems}
            collapsed={isCollapsed}
            onToggle={() => setIsCollapsed((value) => !value)}
            onClose={() => setIsMobileOpen(false)}
          />
        </div>

        {isMobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <div className="relative z-10 h-full w-72 bg-white shadow-2xl">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="absolute right-4 top-4 z-10 rounded-full border border-[#ECEEED] p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close navigation"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <Sidebar
                title="Vendor"
                navItems={vendorNavItems}
                collapsed={false}
                onToggle={() => {}}
                onClose={() => setIsMobileOpen(false)}
              />
            </div>
          </div>
        )}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#FAFAFA]/50">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="ml-4 rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-100 md:hidden"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <TopHeader
                id="vendor-001"
                name="Apex Property Services"
                initials="AP"
                notificationsCount={3}
                notificationLink="/vendor/jobs"
                role="Vendor"
                dashboardLink="/vendor/dashboard"
              />
            </div>
          </div>

          <main className="flex h-screen min-h-0 flex-1 flex-col gap-8 overflow-x-hidden overflow-y-auto p-4 sm:p-8 lg:p-10">
            <RouteTransition>{children}</RouteTransition>
          </main>
        </div>
      </div>
    </div>
  );
}
