"use client";

import React from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DocumentsHeader: React.FC<{ onUpload: () => void; onExport: () => void }> = ({ onUpload, onExport }) => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-3xl font-bold tracking-tight text-stone-900">
            Documents &amp; Compliance
          </h1>
          <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
            STATUTORY &amp; VAULT
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Statutory certificates, legal deeds, and property documents across your portfolio • 42 units monitored. Last audit sync today at{" "}
          <span className="font-medium text-stone-700">09:15 GMT</span>.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          onClick={onExport}
          className="rounded-full border-stone-200 bg-white hover:bg-stone-50 text-stone-800 text-xs font-medium shadow-none h-9"
        >
          <Download className="w-3.5 h-3.5 text-stone-500 mr-2" />
          Export Audit Pack
        </Button>
        <Button onClick={onUpload} className="bg-[#132A20] hover:bg-[#1c3d2f] text-white rounded-full text-xs font-medium shadow-sm h-9 px-5">
          <Plus className="w-4 h-4 mr-1.5" />
          Upload Document
        </Button>
      </div>
    </section>
  );
};