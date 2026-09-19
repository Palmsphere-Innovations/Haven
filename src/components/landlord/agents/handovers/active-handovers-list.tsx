"use client";

import React from "react";
import { ArrowRight, Check, Key, Mail, Copy, Bell, FileText, Hourglass, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActiveHandoversList() {
  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    alert("Acceptance link copied to clipboard!");
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
                Stage 3 of 4
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
                <span className="h-5 w-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-3" />
                </span>
                <div className="h-0.5 flex-1 bg-brand hidden md:block" />
              </div>
              <p className="text-xs font-semibold text-stone-900">1. Initiated by Landlord</p>
              <p className="text-[10px] text-stone-500">Vance Holdings • 24 Oct</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-3" />
                </span>
                <div className="h-0.5 flex-1 bg-brand hidden md:block" />
              </div>
              <p className="text-xs font-semibold text-stone-900">2. Incoming Mandate</p>
              <p className="text-[10px] text-stone-500">E. Vance signed • 26 Oct</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0 ring-4 ring-[#E8EFEA]">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                </span>
                <div className="h-0.5 flex-1 bg-stone-200 hidden md:block" />
              </div>
              <p className="text-xs font-bold text-brand ">3. Key Custody Audit</p>
              <p className="text-[10px] text-stone-500">Physical handover today</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center shrink-0 text-[10px] font-bold">
                  4
                </span>
              </div>
              <p className="text-xs font-medium text-stone-400">4. Access Transfer</p>
              <p className="text-[10px] text-stone-400">Scheduled 01 Nov 00:01</p>
            </div>
          </div>
        </div>

        {/* Card Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Key className="w-3.5 h-3.5 text-brand " />
            <span>4 key sets, 2 fob badges, EPC rating C registered in vault.</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs border-[#ECEEED] rounded-xl">
              <Bell className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
              Send Reminder
            </Button>
            <Button size="sm" className="h-8 text-xs bg-brand hover:bg-[#1E3A2E] text-white rounded-xl">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              View Audit Trail
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
                Maintenance + Communication
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold flex items-center gap-1">
                <Hourglass className="w-3 h-3 text-amber-600" />
                Stage 2 of 4 (Pending Signoff)
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <span>Outgoing: <strong className="text-stone-900">None — New Assignment</strong></span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
              <span>Incoming: <strong className="text-stone-900">Apex Residential London</strong> (Siobhan Campbell)</span>
            </div>
          </div>
          <div className="text-left lg:text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
              Target Date
            </span>
            <span className="text-xs font-mono font-bold text-stone-900">15 Nov 2026</span>
            <span className="text-[10px] text-stone-500 block">(18 days remaining)</span>
          </div>
        </div>

        {/* Horizontal Stepper */}
        <div className="py-3 px-4 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-brand text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-3" />
                </span>
                <div className="h-0.5 flex-1 bg-brand hidden md:block" />
              </div>
              <p className="text-xs font-semibold text-stone-900">1. Initiated by Landlord</p>
              <p className="text-[10px] text-stone-500">Vance Holdings • 27 Oct</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 ring-4 ring-amber-50">
                  <Hourglass className="w-3 h-3" />
                </span>
                <div className="h-0.5 flex-1 bg-stone-200 hidden md:block" />
              </div>
              <p className="text-xs font-semibold text-stone-900">2. Incoming Mandate</p>
              <p className="text-[10px] text-stone-500">Awaiting Siobhan Campbell</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center shrink-0 text-[10px] font-bold">
                  3
                </span>
                <div className="h-0.5 flex-1 bg-stone-200 hidden md:block" />
              </div>
              <p className="text-xs font-medium text-stone-400">3. Key Custody Audit</p>
              <p className="text-[10px] text-stone-400">Pending Step 2</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center shrink-0 text-[10px] font-bold">
                  4
                </span>
              </div>
              <p className="text-xs font-medium text-stone-400">4. Access Transfer</p>
              <p className="text-[10px] text-stone-400">Scheduled 15 Nov</p>
            </div>
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
              onClick={() => copyLink("https://haven.estate/mandates/accept/apex-8camden-9ux")}
              className="h-8 text-xs border-[#ECEEED] rounded-xl"
            >
              <Copy className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
              Copy Acceptance Link
            </Button>
            <Button size="sm" className="h-8 text-xs bg-brand hover:bg-[#1E3A2E] text-white rounded-xl">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              View Audit Trail
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}