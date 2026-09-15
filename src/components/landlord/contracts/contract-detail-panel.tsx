"use client";

import React from "react";
import { Check, Lock, ShieldCheck, Download, Send, FileText, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContractDetailPanel() {
  return (
    <div className="space-y-6">
      {/* Metadata Overview Card */}
      <div className="rounded-2xl bg-white border border-[#ECEEED] p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECEEED]">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#132A20]" />
              <h2 className="text-sm font-bold text-stone-900">
                Assured Shorthold Tenancy Agreement
              </h2>
            </div>
            <span className="font-mono text-[10px] text-stone-400 block mt-0.5">
              Reference: AST-2024-KENS-4B
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Fully Executed
          </span>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
              Property / Demised Unit
            </span>
            <p className="text-xs font-semibold text-stone-900">Flat 4B, 18 Kensington Gardens</p>
            <p className="font-mono text-[10px] text-stone-400">London W2 4QH • Borough of Westminster</p>
          </div>

          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
              Primary Tenant(s)
            </span>
            <p className="text-xs font-semibold text-stone-900">Oliver Davies &amp; Clara Finch</p>
            <p className="text-[10px] text-stone-400">Joint &amp; Several Statutory Liability</p>
          </div>

          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
              Monthly Agreed Rent
            </span>
            <p className="text-base font-extrabold text-stone-900 font-mono">
              £2,450.00 <span className="text-xs font-normal text-stone-500">/ mo</span>
            </p>
            <p className="text-[10px] text-stone-400">Payable 1st of month via Direct Debit</p>
          </div>

          <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">
              Custodial Tenancy Deposit
            </span>
            <p className="text-base font-extrabold text-stone-900 font-mono">£2,826.92</p>
            <p className="font-mono text-[10px] text-stone-400">5-week cap • DPS Cert #882914-GB</p>
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
            { title: "1. Landlord Mandate Created & Executed", date: "Alistair Vance • Signed 26 Sep 2026, 14:15 BST", hash: "IP: 82.165.197.12 • Hash: 9fa014b281f0" },
            { title: "2. Tenant 1 Signed & Identity Confirmed", date: "Oliver Davies • Signed 27 Sep 2026, 09:42 BST", hash: "Verified UK Driving Licence via Gov.uk OneLogin" },
            { title: "3. Tenant 2 Signed & Identity Confirmed", date: "Clara Finch • Signed 28 Sep 2026, 11:20 BST", hash: "Verified UK Biometric Passport via Gov.uk OneLogin" },
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
          <Button variant="outline" size="sm" className="h-8 text-xs border-[#ECEEED] rounded-xl">
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Audit Certificate (PDF)
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-xs border-[#ECEEED] rounded-xl">
            <Send className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Send to Portal
          </Button>
        </div>
      </div>
    </div>
  );
}