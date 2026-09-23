"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/shared/sidebar";
import { TopHeader } from "@/components/shared/top-header";
import {
  Menu,
  ChevronLeft,
  LayoutDashboard,
  Wallet,
  Wrench,
  FolderOpen,
  Phone,
  Gavel,
  Settings,
} from "lucide-react";
import { tenantsData } from "@/lib/mock/tenants";
import { ReactNode } from "react";

interface TenantLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", href: "/tenant/dashboard", icon: LayoutDashboard },
  { label: "Rent & Payments", href: "/tenant/payments", icon: Wallet },
  { label: "Maintenance", href: "/tenant/maintenance", icon: Wrench },
  { label: "Documents", href: "/tenant/documents", icon: FolderOpen },
  { label: "Contact", href: "/tenant/contact", icon: Phone },
  { label: "Disputes", href: "/tenant/disputes", icon: Gavel },
  { label: "Settings", href: "/tenant/settings", icon: Settings },
];

export default function TenantLayout({ children }: TenantLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const tenant = tenantsData[0];

  return (
    <div className="bg-[#F0F2F1] text-[#111827] antialiased min-h-screen flex justify-center items-start">
      {/* Canvas Wrapper */}
      <div className="w-full max-w-[1600px] h-screen max-h-screen bg-white sm:rounded-[32px] border border-black/5 shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block">
          <Sidebar
            navItems={navItems}
            title="Tenant"
            onClose={() => setIsMobileOpen(false)}
            onToggle={() => setIsCollapsed((prev) => !prev)}
            collapsed={isCollapsed}
          />
        </div>

        {/* MOBILE SIDEBAR OVERLAY / DRAWER */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            {/* Drawer Content */}
            <div className="relative z-10 w-72 bg-white h-full shadow-2xl">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="aria-label-close absolute right-4 top-4 z-10 p-1 border border-[#ECEEED] rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <Sidebar
                collapsed={false}
                navItems={navItems}
                title="Tenant"
                onClose={() => setIsMobileOpen(false)}
                onToggle={() => setIsCollapsed((prev) => !prev)}
              />
            </div>
          </div>
        )}

        {/* RIGHT MAIN WORKSPACE */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#FAFAFA]/50">
          {/* Top Header Bar with Mobile Menu Trigger */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden ml-4 p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <TopHeader
                id={tenant.id}
                name={tenant.names}
                initials={tenant.initials}
                notificationsCount={3}
                notificationLink="/tenant/contact"
                role="Tenant"
                dashboardLink="/tenant/dashboard"
              />
            </div>
          </div>

          <main className="flex-1 h-screen min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-8 lg:p-10 flex flex-col gap-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
