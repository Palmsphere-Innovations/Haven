"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/marketing/brand-logo";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Building2,
  Users,
  User,
  HandCoins,
  FileCheck2,
  FileText,
  FolderOpen,
  Wrench,
  BarChart3,
  Gavel,
  LogOut,
  Landmark,
  ChevronsUpDown,
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onMobileClose?: () => void;
}

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "Agents", href: "/agents", icon: HandCoins },
  { label: "Tenants", href: "/tenants", icon: Users },
  { label: "Handovers", href: "/agents/handovers", icon: FileCheck2 },
  { label: "Contracts", href: "/contracts", icon: FileText },
  { label: "Documents", href: "/documents", icon: FolderOpen },
  { label: "Maintenance", href: "/maintenance", icon: Wrench },
  { label: "Cost Analysis", href: "/cost-analysis", icon: BarChart3 },
  { label: "Disputes", href: "/disputes", icon: Gavel },
  // { label: "Settings", href: "/disputes", icon: Gavel },
];

export const LandlordSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  onMobileClose,
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={`relative bg-white  flex flex-col justify-between overflow-hidden p-4 sm:p-6 shrink-0 transition-all duration-300 select-none h-screen max-h-screen ${
        isCollapsed ? "w-20" : "w-64 lg:w-72"
      }`}
    >
      {/* Desktop Collapse Toggle Button */}
      <button
        type="button"
        onClick={onToggleCollapse}
        className="hidden md:flex absolute  top-7 -right-3 z-40 w-7 h-7 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-600 hover:text-gray-900 shadow-sm transition-transform"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      <div className="flex min-h-0 flex-1 flex-col">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#ECEEED]">
          <Link
            href="/dashboard"
            onClick={onMobileClose}
            className="flex items-center gap-2 overflow-hidden"
          >
            <BrandLogo />
          </Link>
        </div>

        {/* Entity Switcher */}
        <div className="mt-5 mb-6">
          <button
            type="button"
            className={`w-full bg-gray-50/80 rounded-2xl border border-gray-100 flex items-center hover:bg-gray-100/70 transition-colors ${
              isCollapsed ? "p-2.5 justify-center" : "p-3 justify-between"
            }`}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <Landmark className="w-5 h-5 text-[#374151] shrink-0" />
              {!isCollapsed && (
                <div className="flex flex-col text-left truncate">
                  <span className="text-[10px] uppercase font-semibold text-[#6B7280] tracking-wider">
                    Current Entity
                  </span>
                  <span className="text-xs font-semibold text-[#111827] truncate">
                    Vance Holdings Ltd
                  </span>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <ChevronsUpDown className="w-4 h-4 text-[#6B7280] shrink-0" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors ${
                  isCollapsed ? "justify-center px-0" : ""
                } ${
                  isActive
                    ? "bg-[#E8EFEA] text-brand font-semibold"
                    : "text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 font-medium"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Sign out / settings */}
      <div className="pt-6 border-t border-[#ECEEED] flex flex-col gap-1 mt-6">

  <Link
          href="/profile"
          onClick={onMobileClose}
          // title={isCollapsed ? "Sign out" : undefined}
          className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 text-sm transition-colors ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
        >
          <User className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Profile</span>}
        </Link>
        
        <Link
          href="/sign-in"
          onClick={onMobileClose}
          title={isCollapsed ? "Sign out" : undefined}
          className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-[#6B7280] hover:text-[#111827] hover:bg-gray-50 text-sm transition-colors ${
            isCollapsed ? "justify-center px-0" : ""
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Sign out</span>}
        </Link>
        {!isCollapsed && (
          <div className="pt-4 mt-2 border-t border-[#ECEEED] flex items-center justify-between text-[11px] text-[#6B7280] px-2">
            <span>Haven UK v2.4</span>
            <span>PRS Compliant</span>
          </div>
        )}
      </div>
    </aside>
  );
};