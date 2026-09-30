"use client";

import React, { useState } from "react";
import { AlertCircle, Mail, MessageSquare, Bell, Shield, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotificationsSidebarProps {
  onInitiateDispatches?: () => void;
}

export function NotificationsSidebar({ onInitiateDispatches }: NotificationsSidebarProps) {
  const [dispatched, setDispatched] = useState(false);

  const handleDispatch = () => {
    setDispatched(true);
    if (onInitiateDispatches) onInitiateDispatches();
    setTimeout(() => setDispatched(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Priority Summary */}
      <div className="bg-white border border-[#ECEEED] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#ECEEED]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Statutory Exposure
            </span>
          </div>
          <span className="font-mono text-[10px] font-bold text-rose-600">2 Critical Items</span>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-1.5" />
            <div className="text-xs space-y-0.5">
              <div className="font-bold text-stone-900">Elena Rostova Arrears (£1,880.00)</div>
              <div className="text-[10px] text-stone-500">8 Camden Mews • Overdue by 3 days</div>
              <div className="text-[10px] font-bold text-rose-700 mt-1">
                Section 8 14-day timer eligibility nearing
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-1.5" />
            <div className="text-xs space-y-0.5">
              <div className="font-bold text-stone-900">Gas Safety (CP12) Expiry</div>
              <div className="text-[10px] text-stone-500">18 Kensington Gardens • Due in 5 days</div>
              <div className="text-[10px] font-bold text-rose-700 mt-1">
                Deregulation Act 2015 breach risk
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleDispatch}
          className="w-full h-9 bg-[#132A20] hover:bg-[#1E3A2E] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4 mr-1.5" />
          {dispatched ? "Dispatches Initiated!" : "Initiate Statutory Dispatches"}
        </Button>
      </div>

      {/* Dispatch Channels */}
      <div className="bg-white border border-[#ECEEED] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="pb-2 border-b border-[#ECEEED]">
          <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Dispatch Channels
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-700">Email Notifications</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-700">SMS Critical Pings</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
              Active
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-700">In-Portal Push Alerts</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-semibold border border-emerald-200">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
