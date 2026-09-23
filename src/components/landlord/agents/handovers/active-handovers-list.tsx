"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Mail, Copy, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActiveHandoversList() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [activeStepCard1, setActiveStepCard1] = useState(3);
  const [notice, setNotice] = useState<string | null>(null);

  const copyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(id);
    setNotice("Acceptance link copied to clipboard!");
    setTimeout(() => {
      setCopiedLink(null);
      setNotice(null);
    }, 2500);
  };

  const handleAdvanceStep = () => {
    setActiveStepCard1(4);
    setNotice("Key custody signed off! Advancing to Stage 4: Access Transfer.");
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-stone-900">Active Handovers</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFEA] text-brand text-[10px] font-bold">
            2 Active Transitions
          </span>
        </div>
        <span className="text-xs text-stone-500">
          Statutory requirement: Both outgoing &amp; incoming agents must countersign key custody logs.
        </span>
      </div>

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Card 1 */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-[#ECEEED]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-stone-900">
                Flat 4B, 18 Kensington Gardens, London W2 4QH
              </h3>
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold">
                Full Management
              </span>
              <span className="px-2 py-0.5 rounded bg-[#E8EFEA] text-brand text-[10px] font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Stage {activeStepCard1} of 4
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <span>Outgoing: <strong className="text-stone-900">Belgrave Property Management</strong> (Julian Thorne)</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span>Incoming: <strong className="text-stone-900">Prime Heritage Management</strong> (Eleanor Vance)</span>
            </div>
          </div>
          <div className="text-left lg:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Cutover Target
            </span>
            <span className="text-xs font-mono font-bold text-stone-900">01 Nov 2026</span>
            <span className="text-[10px] text-stone-500 block">(4 days remaining)</span>
          </div>
        </div>

        {/* Horizontal Progress Stepper */}
        <div className="py-3 px-4 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <div className="h-0.5 flex-1 bg-emerald-600 hidden md:block" />
              </div>
              <p className="text-xs font-semibold text-stone-900">1. Notice Served</p>
              <p className="text-[10px] text-stone-500">Completed 01 Oct</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <div className="h-0.5 flex-1 bg-emerald-600 hidden md:block" />
              </div>
              <p className="text-xs font-semibold text-stone-900">2. Mandate Accepted</p>
              <p className="text-[10px] text-stone-500">Eleanor Vance signed</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-white ${
                    activeStepCard1 >= 4 ? "bg-emerald-600" : "bg-brand animate-pulse"
                  }`}
                >
                  {activeStepCard1 >= 4 ? <Check className="w-3 h-3 stroke-[3]" /> : "3"}
                </span>
                <div
                  className={`h-0.5 flex-1 hidden md:block ${
                    activeStepCard1 >= 4 ? "bg-emerald-600" : "bg-stone-200"
                  }`}
                />
              </div>
              <p className="text-xs font-semibold text-stone-900">3. Key Custody Audit</p>
              <p className="text-[10px] text-amber-700 font-medium">
                {activeStepCard1 >= 4 ? "Signed & Confirmed" : "Requires signoff"}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    activeStepCard1 >= 4
                      ? "bg-brand text-white"
                      : "bg-stone-200 text-stone-500"
                  }`}
                >
                  4
                </span>
              </div>
              <p className="text-xs font-semibold text-stone-900">4. Access Transfer</p>
              <p className="text-[10px] text-stone-500">Final handover cutover</p>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Mail className="w-3.5 h-3.5 text-stone-400" />
            <span>Custodian Ref: #CS-88192 (DPS Custodial Deposit transferred)</span>
          </div>
          <div className="flex items-center gap-2">
            {activeStepCard1 === 3 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAdvanceStep}
                className="h-8 text-xs border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl cursor-pointer font-semibold"
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                Signoff Key Custody
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                copyLink(
                  "https://haven.estate/mandates/accept/kg4b-prime-heritage",
                  "c1"
                )
              }
              className="h-8 text-xs border-[#ECEEED] rounded-xl cursor-pointer"
            >
              {copiedLink === "c1" ? (
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
              )}
              {copiedLink === "c1" ? "Link Copied" : "Copy Acceptance Link"}
            </Button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-[#ECEEED]">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-stone-900">
                8 Camden Mews, London NW1 9UX
              </h3>
              <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-semibold">
                Maintenance Only
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                Stage 1 of 4 • Awaiting Acceptance
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <span>Outgoing: <strong className="text-stone-900">Direct Landlord</strong></span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span>Incoming: <strong className="text-stone-900">Apex Residential</strong> (Siobhan O&apos;Connor)</span>
            </div>
          </div>
          <div className="text-left lg:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Cutover Target
            </span>
            <span className="text-xs font-mono font-bold text-stone-900">15 Nov 2026</span>
            <span className="text-[10px] text-stone-500 block">(18 days remaining)</span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Mail className="w-3.5 h-3.5 text-stone-400" />
            <span>Invitation ID: #INV-APX-8910 (Delivered to siobhan@apexresidential.co.uk)</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                copyLink(
                  "https://haven.estate/mandates/accept/apex-8camden-9ux",
                  "c2"
                )
              }
              className="h-8 text-xs border-[#ECEEED] rounded-xl cursor-pointer"
            >
              {copiedLink === "c2" ? (
                <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
              )}
              {copiedLink === "c2" ? "Link Copied" : "Copy Acceptance Link"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
