"use client";

import React from "react";
import { ZoomIn, ZoomOut, Fullscreen, Download, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContractPaperPreview() {
  return (
    <div className="space-y-4">
      {/* Document Controls */}
      <div className="p-3 rounded-2xl bg-white border border-[#ECEEED] shadow-xs flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-bold text-stone-900">Page 1 of 18</span>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-stone-500">
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="font-mono text-xs text-stone-500">100%</span>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-stone-500">
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-7 text-[11px] border-[#ECEEED] rounded-lg">
            <Download className="w-3 h-3 mr-1" /> Clean PDF
          </Button>
        </div>
      </div>

      {/* Paper Container */}
      <div className="relative rounded-2xl bg-[#FDFBF7] border border-[#ECEEED] shadow-md p-8 sm:p-10 font-serif text-stone-800 leading-relaxed min-h-[700px] flex flex-col justify-between">
        {/* Stamp */}
        <div className="absolute right-6 top-6 border-2 border-emerald-600/40 text-emerald-700 font-sans font-bold text-[10px] uppercase px-2.5 py-1 rounded tracking-widest rotate-6 pointer-events-none">
          OFFICIALLY EXECUTED
        </div>

        <div className="space-y-5">
          <div className="flex items-start justify-between border-b border-[#E2DEC9] pb-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-[#132A20] text-white flex items-center justify-center font-bold text-sm">
                H
              </div>
              <div>
                <div className="font-bold text-xs text-[#132A20]">HAVEN UK ESTATES</div>
                <div className="text-[10px] text-stone-500">Title: NGL774910</div>
              </div>
            </div>
            <div className="text-right text-[10px] text-stone-500 font-mono">
              AST REF: 2026/KENS-4B
            </div>
          </div>

          <div className="text-center space-y-1">
            <h3 className="font-bold uppercase tracking-wider text-[#132A20] text-sm font-sans">
              Assured Shorthold Tenancy Agreement
            </h3>
            <p className="text-[10px] text-stone-500 font-sans">
              Part 1 of the Housing Act 1988 as amended by Tenant Fees Act 2019
            </p>
          </div>

          <div className="space-y-3 text-xs border-t border-[#E2DEC9] pt-4 leading-normal">
            <div>
              <p className="font-sans font-bold text-[10px] text-[#132A20] uppercase tracking-wider">
                1. PARTIES &amp; PREMISES
              </p>
              <p className="mt-1">
                <strong>BETWEEN:</strong> <em>Vance Holdings Limited</em> (Landlord) and <strong>Oliver Davies</strong> &amp; <strong>Clara Finch</strong> (Joint Tenants).
              </p>
            </div>

            <div>
              <p className="font-sans font-bold text-[10px] text-[#132A20] uppercase tracking-wider">
                2. TERM &amp; APPORTIONED RENT
              </p>
              <p className="mt-1">
                Fixed term of <strong>24 months</strong> from 01 October 2024 to 30 September 2026 paying <strong>£2,450.00 / month</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Signature Stamp */}
        <div className="mt-8 pt-4 border-t-2 border-[#132A20] font-sans">
          <div className="grid grid-cols-2 gap-3 text-[10px]">
            <div className="p-2 bg-white/80 rounded border border-[#D6D3C7]">
              <span className="text-stone-400 block">Signed by Landlord</span>
              <div className="font-serif italic font-bold text-stone-900 my-0.5">Alistair Vance</div>
              <div className="font-mono text-[8px] text-stone-400">Timestamp: 2026-09-26T14:15:02Z</div>
            </div>
            <div className="p-2 bg-white/80 rounded border border-[#D6D3C7]">
              <span className="text-stone-400 block">Signed by Tenants</span>
              <div className="font-serif italic font-bold text-stone-900 my-0.5">Oliver Davies &amp; Clara Finch</div>
              <div className="font-mono text-[8px] text-stone-400">Gov.UK OneLogin Verified</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}