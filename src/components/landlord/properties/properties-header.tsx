"use client";

import React from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertiesHeaderProps {
  totalCount?: number;
  onAddProperty: () => void;
  onExportCSV?: () => void;
}

export const PropertiesHeader: React.FC<PropertiesHeaderProps> = ({
  totalCount = 5,
  onAddProperty,
  onExportCSV,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-semibold tracking-tight text-brand">Properties</h1>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-[#f0eee9] text-stone-600 border border-[#e2ded6]">
            PORTFOLIO REGISTRY
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Portfolio registry of <strong className="font-semibold text-stone-800">{totalCount}</strong> properties across Greater London &amp; Surrey. Reconciled today at{" "}
          <strong className="font-medium text-stone-700">08:30 GMT</strong>.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {onExportCSV && (
          <Button
            variant="outline"
            onClick={onExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#dedad2] bg-white text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors shadow-none cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Export Register (CSV)</span>
          </Button>
        )}

        <Button
          onClick={onAddProperty}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#132A20] hover:bg-[#1E3A2E] text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </Button>
      </div>
    </div>
  );
};
