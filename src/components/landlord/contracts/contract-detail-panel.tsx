"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck, Download, Send, FileText, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContractRecord } from "@/lib/mock/contracts";

interface ContractDetailPanelProps {
  contract?: ContractRecord;
  onNotice?: (msg: string) => void;
}

export function ContractDetailPanel({ contract, onNotice }: ContractDetailPanelProps) {
  const [isSent, setIsSent] = useState(false);

  if (!contract) {
    return (
      <div className="rounded-2xl bg-white border border-[#ECEEED] p-8 text-center text-stone-500 text-xs">
        Select a tenancy contract from the table above to inspect metadata and cryptographic audit trails.
      </div>
    );
  }

  const handleDownloadAudit = () => {
    const auditData = `HAVEN CRYPTOGRAPHIC AUDIT CERTIFICATE
Reference: ${contract.reference}
Instrument: ${contract.instrument}
Property: ${contract.property}, ${contract.postcode}
Parties: Vance Holdings Ltd (Landlord) & ${contract.tenants} (Tenants)
Term Window: ${contract.termWindow} (${contract.duration})
Agreed Rent: ${contract.rentAmount}/mo
Custodial Deposit: ${contract.depositAmount}
Status: ${contract.statusText}
Cryptographic Hash: 9fa014b281f08cb67e2a9b31d4e082ef781a91e1
Compliant with: Electronic Communications Act 2000 & eIDAS Regulation`;

    const blob = new Blob([auditData], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `audit-certificate-${contract.reference}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onNotice) onNotice(`Downloaded cryptographic audit certificate for ${contract.reference}`);
  };

  const handleSendPortal = () => {
    setIsSent(true);
    if (onNotice) onNotice(`Dispatched contract pack to tenant portal (${contract.tenants}).`);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Metadata Overview Card */}
      <div className="rounded-2xl bg-white border border-[#ECEEED] p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECEEED]">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#132A20]" />
              <h2 className="text-sm font-bold text-stone-900">
                {contract.instrument}
              </h2>
            </div>
            <span className="font-mono text-[10px] text-stone-400 block mt-0.5">
              Reference: {contract.reference}
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${
              contract.status === "active"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : contract.status === "expiring"
                ? "bg-amber-50 text-amber-800 border border-amber-200"
                : contract.status === "awaiting"
                ? "bg-blue-50 text-blue-800 border border-blue-200"
                : "bg-stone-100 text-stone-700 border border-stone-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {contract.statusText}
          </span>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
              Property / Demised Unit
            </span>
            <p className="text-xs font-semibold text-stone-900">{contract.property}</p>
            <p className="font-mono text-[10px] text-stone-400">{contract.postcode}</p>
          </div>

          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
              Primary Tenant(s)
            </span>
            <p className="text-xs font-semibold text-stone-900">{contract.tenants}</p>
            <p className="text-[10px] text-stone-400">{contract.tenancyType} Liability</p>
          </div>

          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
              Monthly Agreed Rent
            </span>
            <p className="text-base font-extrabold text-stone-900 font-mono">
              {contract.rentAmount} <span className="text-xs font-normal text-stone-500">/ mo</span>
            </p>
            <p className="text-[10px] text-stone-400">Payable 1st of month via Direct Debit</p>
          </div>

          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
              Custodial Tenancy Deposit
            </span>
            <p className="text-base font-extrabold text-stone-900 font-mono">{contract.depositAmount}</p>
            <p className="font-mono text-[10px] text-stone-400">5-week cap • DPS Custodial Protected</p>
          </div>
        </div>
      </div>

      {/* Cryptographic Execution Stepper */}
      <div className="rounded-2xl bg-white border border-[#ECEEED] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#ECEEED]">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#132A20]" />
            <h3 className="text-xs font-bold text-stone-900">Cryptographic E-Signature Execution</h3>
          </div>
          <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
            eIDAS / UK ECA 2000
          </span>
        </div>

        <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-600">
          {[
            {
              title: "1. Landlord Mandate Created & Executed",
              date: "Alistair Vance • Signed via Haven Digital Key",
              hash: "IP: 82.165.197.12 • Hash: 9fa014b281f0",
            },
            {
              title: `2. Primary Tenant Signed (${contract.tenants.split("&")[0].trim()})`,
              date: "Signed & Biometrically Verified",
              hash: "Verified UK Driving Licence / Passport via Gov.uk OneLogin",
            },
            {
              title: "3. Deposit Prescribed Information Served",
              date: "Statutory 30-day notice served and confirmed",
              hash: "DPS Certificate linked to custodial reference",
            },
          ].map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-3">
              <span className="absolute -left-6 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </span>
              <div>
                <div className="text-xs font-bold text-stone-900">{step.title}</div>
                <div className="font-mono text-[10px] text-stone-500">{step.date}</div>
                <div className="text-[10px] text-stone-400 mt-0.5">{step.hash}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-[#ECEEED] flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDownloadAudit}
            className="h-8 text-xs border-[#ECEEED] rounded-xl cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Audit Certificate (TXT/PDF)
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSendPortal}
            className="h-8 text-xs border-[#ECEEED] rounded-xl cursor-pointer"
          >
            {isSent ? (
              <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
            ) : (
              <Send className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
            )}
            {isSent ? "Sent to Portal" : "Send to Portal"}
          </Button>
        </div>
      </div>
    </div>
  );
}
