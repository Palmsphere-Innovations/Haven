"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/shared/sidebar";
import { TopHeader } from "@/components/shared/top-header";
import {
  Menu,
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
import { ReactNode } from "react";
import { useLandlordProfile } from "@/hooks/use-landlord-profile";
// import { TopHeader } from 

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

export default function LandlordLayout({ children }: LandlordLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const landlord = useLandlordProfile();

  return (
    <div className="bg-[#EDEBE6] text-[#132A20] antialiased h-screen w-full flex justify-center items-center overflow-hidden">
      {/* Canvas Wrapper */}
      <div className="w-full max-w-[1600px] h-full bg-white border border-black/5 shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        
        
       {/* DESKTOP SIDEBAR */}
<aside className="hidden md:block h-full shrink-0 relative z-50 overflow-visible">
  <Sidebar
    navItems={navItems}
    title="Landlord"
    onClose={() => setIsMobileOpen(false)}
    onToggle={() => setIsCollapsed((prev) => !prev)}
    collapsed={isCollapsed}
  />
</aside>

        {/* MOBILE SIDEBAR OVERLAY / DRAWER */}
{isMobileOpen && (
  <div className="fixed inset-0 z-50 md:hidden flex">
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={() => setIsMobileOpen(false)}
      aria-hidden="true"
    />
    
    {/* Drawer Content */}
    <div className="relative z-10 w-72 bg-white h-full shadow-2xl flex flex-col">
      {/* Drawer Header with Close Button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-sm font-semibold text-[#132A20]">Menu</span>
        <button
          type="button"
          onClick={() => setIsMobileOpen(false)}
          aria-label="Close menu"
          className="p-1.5 rounded-lg text-gray-500 hover:text-[#132A20] hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Content Container */}
      <div className="flex-1 overflow-y-auto">
        <Sidebar
          collapsed={false}
          navItems={navItems}
          title="Landlord"
          onClose={() => setIsMobileOpen(false)}
          onToggle={() => setIsCollapsed((prev) => !prev)}
        />
      </div>
    </div>
  </div>
)}

        {/* RIGHT MAIN WORKSPACE */}
        <div className="flex-1 flex flex-col min-w-0 h-full bg-[#EDEBE6]/20">
          {/* Top Header Bar with Mobile Menu Trigger */}
          <header className="flex items-center border-b border-gray-100 bg-white">
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
                id={landlord?.id ?? ""}
                name={landlord?.name ?? ""}
                initials={landlord?.initials ?? ""}
                notificationsCount={3}
                notificationLink="/communication/notifications"
                role="Landlord"
                dashboardLink="/dashboard"
              />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 flex flex-col gap-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}