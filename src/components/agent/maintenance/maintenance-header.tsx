"use client";

import React from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MaintenanceHeader: React.FC<{ onLogRequest: () => void }> = ({ onLogRequest }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-stone-900">
            Maintenance
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-semibold tracking-wide uppercase border border-stone-200">
            Dispatch &amp; Repairs
          </span>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          7 open requests across your portfolio • 42 units monitored. Last synced today at{" "}
          <span className="font-medium text-stone-900">08:30 GMT</span>.
        </p>
      </div>

      <div className="flex items-center gap-3 self-start sm:self-auto">
        <Button
          variant="outline"
          className="h-9 px-4 bg-white hover:bg-stone-50 border border-stone-200 text-stone-900 rounded-full text-xs font-semibold shadow-xs"
        >
          <Download className="w-4 h-4 text-stone-500 mr-1.5" />
          Export CSV
        </Button>
        <Button onClick={onLogRequest} className="h-9 px-4 bg-[#132A20] hover:bg-[#0b1b14] text-white rounded-full text-xs font-semibold shadow-xs">
          <Plus className="w-4 h-4 mr-1.5" />
          Log Request
        </Button>
      </div>
    </div>
  );
};