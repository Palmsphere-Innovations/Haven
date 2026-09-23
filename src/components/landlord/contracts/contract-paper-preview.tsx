"use client";

import React, { useState } from "react";
import { ZoomIn, ZoomOut, Download, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContractRecord } from "@/lib/mock/contracts";

interface ContractPaperPreviewProps {
  contract?: ContractRecord;
  onNotice?: (msg: string) => void;
}

export function ContractPaperPreview({ contract, onNotice }: ContractPaperPreviewProps) {
  const [zoom, setZoom] = useState(100);

  const handleCleanPDF = () => {
    if (!contract) return;
    const agreementDoc = `===============================================================
ASSURED SHORTHOLD TENANCY AGREEMENT (HOUSING ACT 1988)
===============================================================
Reference: ${contract.reference}
Date: 26 September 2026

1. THE PARTIES
   LANDLORD: Vance Holdings Ltd, c/o Haven UK Estates
   TENANT(S): ${contract.tenants}

2. THE PROPERTY
   ${contract.property}
   ${contract.postcode}

3. THE TERM
   Fixed term of ${contract.duration}: ${contract.termWindow}

4. THE RENT & DEPOSIT
   Rent: ${contract.rentAmount} per calendar month in advance
   Deposit: ${contract.depositAmount} protected under Custodial Tenancy Deposit Scheme

5. STATUTORY SIGNATURES
   Executed as a Deed by the Landlord and Tenant(s).
   [AUTHENTICATED VIA HAVEN CRYPTOGRAPHIC LEDGER]
===============================================================`;

    const blob = new Blob([agreementDoc], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `agreement-${contract.reference}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onNotice) onNotice(`Clean agreement doc downloaded for ${contract.reference}`);
  };

  return (
    <div className="space-y-4">
      {/* Document Controls */}
      <div className="p-3 rounded-2xl bg-white border border-[#ECEEED] shadow-xs flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-bold text-stone-900">Page 1 of 12</span>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom((z) => Math.max(75, z - 15))}
            className="h-7 w-7 text-stone-500 cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="font-mono text-xs text-stone-500">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom((z) => Math.min(130, z + 15))}
            className="h-7 w-7 text-stone-500 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCleanPDF}
            className="h-7 text-[11px] border-[#ECEEED] rounded-lg cursor-pointer"
          >
            <Download className="w-3 h-3 mr-1" /> Clean PDF
          </Button>
        </div>
      </div>

      {/* Paper Container */}
      <div
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        className="relative rounded-2xl bg-[#FDFBF7] border border-[#ECEEED] shadow-md p-8 sm:p-10 font-serif text-stone-800 leading-relaxed min-h-[560px] flex flex-col justify-between transition-transform"
      >
        {/* Stamp */}
        <div className="absolute right-6 top-6 border-2 border-emerald-600/40 text-emerald-700 font-sans font-bold text-[10px] uppercase px-2.5 py-1 rounded tracking-widest rotate-6 pointer-events-none">
          {contract ? contract.statusText.toUpperCase() : "EXECUTED"}
        </div>

        <div className="space-y-5">
          <div className="flex items-start justify-between border-b border-[#E2DEC9] pb-4 font-sans">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-[#132A20] text-white flex items-center justify-center font-bold text-sm">
                H
              </div>
              <div>
                <div className="font-bold text-xs text-[#132A20]">HAVEN UK ESTATES</div>
                <div className="text-[10px] text-stone-500">Official Tenancy Deed</div>
              </div>
            </div>
            <div className="text-right text-[10px] text-stone-500 font-mono">
              REF: {contract?.reference || "AST-2026"}
            </div>
          </div>

          <div className="text-center space-y-1">
            <h3 className="font-bold uppercase tracking-wider text-[#132A20] text-sm font-sans">
              {contract?.instrument || "Assured Shorthold Tenancy Agreement"}
            </h3>
            <p className="text-[10px] text-stone-500 font-sans">
              Part 1 of the Housing Act 1988 as amended by Tenant Fees Act 2019
            </p>
          </div>

          <div className="space-y-3 text-xs border-t border-[#E2DEC9] pt-4 leading-normal">
            <div>
              <strong className="font-sans text-[11px] uppercase tracking-wider text-stone-500 block">
                1. Demised Premises
              </strong>
              <p className="font-semibold text-stone-900 mt-0.5">
                {contract?.property || "Flat 4B, 18 Kensington Gardens, London"}
              </p>
            </div>

            <div>
              <strong className="font-sans text-[11px] uppercase tracking-wider text-stone-500 block">
                2. Landlord &amp; Tenants
              </strong>
              <p className="text-stone-900 mt-0.5">
                <span className="font-medium">Landlord:</span> Vance Holdings Ltd
                <br />
                <span className="font-medium">Tenant(s):</span>{" "}
                <strong className="text-stone-900">{contract?.tenants || "Oliver Davies"}</strong>
              </p>
            </div>

            <div>
              <strong className="font-sans text-[11px] uppercase tracking-wider text-stone-500 block">
                3. Term &amp; Rent Payable
              </strong>
              <p className="text-stone-900 mt-0.5">
                Fixed term: {contract?.termWindow} ({contract?.duration || "24m"}). Agreed rent:{" "}
                <span className="font-mono font-bold">{contract?.rentAmount || "£2,450.00"}</span> pcm.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E2DEC9] flex items-center justify-between text-[10px] text-stone-400 font-sans">
          <span>Counterparts executed via Haven Digital Signature Platform</span>
          <span className="font-mono">PAGE 1/12 • IMMUTABLE</span>
        </div>
      </div>
    </div>
  );
}
