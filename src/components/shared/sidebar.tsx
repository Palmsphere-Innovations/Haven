"use client";

import type { ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { BrandLogo } from "@/components/marketing/brand-logo";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

interface SidebarProps {
  title: string;
  navItems: SidebarNavItem[];
  collapsed: boolean;
  onClose: () => void;
  onToggle: () => void;
  prefix?: string;
}

export function Sidebar({
  title,
  navItems,
  collapsed,
  onClose,
  onToggle,
  prefix = "",
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`relative flex h-full w-full flex-col justify-between border-r border-[#ECEEED] bg-white p-4 transition-all duration-300 sm:p-6 ${
        collapsed ? "lg:w-20" : "lg:w-64 xl:w-72"
      }`}
    >
      <button
        type="button"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={onToggle}
        className="absolute -right-3 top-8 z-20 hidden h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm lg:flex"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>

      <div>
        <Link
          href={prefix ? `${prefix}/dashboard` : "/dashboard"}
          onClick={onClose}
          className={`flex items-center gap-3 border-b border-[#ECEEED] pb-6 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <span
            className={`block shrink-0 overflow-hidden ${
              collapsed ? "w-9" : "w-auto"
            }`}
          >
            <BrandLogo className="h-8 w-auto max-w-none" />
          </span>
          {!collapsed && (
            <span className="text-xs font-medium text-gray-400">{title}</span>
          )}
        </Link>

        <nav className="mt-6 flex flex-col gap-1">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                title={collapsed ? label : undefined}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                  collapsed ? "justify-center px-0" : ""
                } ${
                  active
                    ? "bg-[#E8EFEA] font-semibold text-brand"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <Link
        href="/sign-in"
        onClick={onClose}
        title={collapsed ? "Sign out" : undefined}
        className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 ${
          collapsed ? "justify-center px-0" : ""
        }`}
      >
        <LogOut className="h-5 w-5 shrink-0" />
        {!collapsed && <span>Sign out</span>}
      </Link>
    </aside>
  );
}
