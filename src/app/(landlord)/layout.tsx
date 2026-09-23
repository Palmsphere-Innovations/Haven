"use client";

import React, { useState } from "react";
// import { LandlordSidebar } from "@/components/landlord/dashboard/sidebar";
import { Sidebar } from "@/components/shared/sidebar";
import { TopHeader } from "@/components/shared/top-header";
import { Menu,
  ChevronLeft,
  LayoutDashboard,
  Building2,
  Users,
  HandCoins,
  FileCheck2,
  FileText,
  FolderOpen,
  Wrench,
  BarChart3,
  Gavel,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { landlordsData } from "@/lib/mock/landlord";
import { ReactNode } from "react";

interface LandlordLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "Agents", href: "/agents", icon: HandCoins },
  { label: "Tenants", href: "/tenants", icon: Users },
  { label: "Handovers", href: "/handovers", icon: FileCheck2 },
  { label: "Contracts", href: "/contracts", icon: FileText },
  { label: "Documents", href: "/documents", icon: FolderOpen },
  { label: "Maintenance", href: "/maintenance", icon: Wrench },
  { label: "Cost Analysis", href: "/cost-analysis", icon: BarChart3 },
  { label: "Disputes", href: "/disputes", icon: Gavel },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function LandlordLayout({
  children,
  } : LandlordLayoutProps ) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const landlord = landlordsData[0]

  return (
    <div className="bg-[#F0F2F1] text-[#111827] antialiased min-h-screen flex justify-center items-start">
      {/* Canvas Wrapper */}
      <div className="w-full max-w-[1600px] h-screen max-h-screen bg-white sm:rounded-[32px] border border-black/5 shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        
        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:block">
          <Sidebar
            navItems={navItems}
            title="Landlord"
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
                className="aria-label-close absolute right-4 top-4 z-100 p-1 border border-[#ECEEED] rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <Sidebar
                collapsed={false}
                navItems={navItems}
                title="Landlord"
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
                id={landlord.id}
                name={landlord.name}
                initials={landlord.initials}
                notificationsCount={3}
                notificationLink="/communication/notifications"
                role="Landlord"
                dashboardLink='/dashboard'
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