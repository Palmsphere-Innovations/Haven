"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Bell, Calendar } from "lucide-react";

interface TopheaderProps {
  id?: string;
  name?: string;
  initials?: string;
  notificationsCount?: number;
  notificationLink?: string;
  role?: string;
  dashboardLink?: string;
}

export function TopHeader({
  name: propName = "Robert Sterling Smith",
  initials: propInitials = "RS",
  notificationsCount = 2,
  notificationLink = "/communication/notifications",
  role: propRole = "Landlord (Portfolio Owner)",
  dashboardLink = "#",
}: TopheaderProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const displayName = user?.name || propName;
  const displayRole = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : propRole;

  const derivedInitials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || propInitials;

  return (
    <header className="sticky top-0 z-40 h-20 shrink-0 px-8 border-b border-[#ECEEED] bg-white/95 backdrop-blur-md flex items-center justify-between gap-4">
      {/* Search Input */}
      <div className="flex items-center flex-1 max-w-lg">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-[#6B7280] text-[18px]">
            search
          </span>
          <Input
            type="text"
            placeholder="Search properties, tenancies, compliance..."
            className="w-full h-10 pl-10 pr-12 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 rounded-lg text-xs text-[#111827] placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-neutral-400"
          />
          <kbd className="hidden sm:inline-block absolute right-3 top-2.5 text-[10px] font-mono text-gray-400 border border-gray-200 bg-white rounded px-1.5 py-0.5 pointer-events-none">
            ⌘ K
          </kbd>
        </div>
      </div>

      {/* Quick Actions & Profile */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-[#374151] text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-[#6B7280]" />
          <span>FY 2025/26</span>
        </div>

        <button
          type="button"
          onClick={() => router.push(notificationLink)}
          aria-label="Notifications"
          className="relative p-2 rounded-full text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {notificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          )}
        </button>

        <div className="h-6 w-px bg-gray-200" />

        <Link href={dashboardLink}>
          <div className="flex items-center gap-2.5 group cursor-pointer">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-xs font-semibold text-[#111827] leading-tight group-hover:text-black">
                {displayName}
              </span>
              <span className="text-[11px] text-[#6B7280] capitalize">{displayRole}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-bold text-xs border border-gray-200">
              {derivedInitials}
            </div>
          </div>
        </Link>

        {/* Quick Sign Out Action */}
        <button
          type="button"
          onClick={logout}
          title="Sign out"
          aria-label="Sign out"
          className="p-2 rounded-lg text-gray-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
