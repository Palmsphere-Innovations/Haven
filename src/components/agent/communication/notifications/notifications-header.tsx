"use client";

import React from "react";
import { CheckCheck, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationsHeaderProps {
  unreadCount: number;
  onMarkAllRead: () => void;
}

export function NotificationsHeader({ unreadCount, onMarkAllRead }: NotificationsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-stone-500">
          <span>Portfolio Activity &amp; Alerts</span>
          <span>•</span>
          <span className="font-mono text-stone-400">Vance Holdings Ltd (18 Units)</span>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 tracking-tight">
            Notifications
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8EFEA] text-[#132A20] text-xs font-bold">
            <span className={`w-1.5 h-1.5 rounded-full ${unreadCount > 0 ? "bg-[#132A20] animate-pulse" : "bg-stone-300"}`} />
            <span>{unreadCount} Unread Alerts</span>
          </span>
        </div>
        <p className="text-xs text-stone-500">
          Statutory oversight, arrears tracking, and operational workorders across your UK property assets.
        </p>
      </div>

      <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
        <Button
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          variant="outline"
          className="h-9 px-3.5 border-[#ECEEED] rounded-xl text-xs font-semibold text-[#132A20] hover:bg-stone-50 disabled:opacity-50"
        >
          <CheckCheck className="w-4 h-4 mr-1.5 text-[#132A20]" />
          Mark all as read
        </Button>
        <Button variant="outline" className="h-9 px-3 border-[#ECEEED] rounded-xl text-xs font-medium text-stone-700">
          <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Preferences
        </Button>
      </div>
    </div>
  );
}