"use client";

import React from "react";
import { History, Wrench, FileText, Calendar, MessageSquare, Receipt } from "lucide-react";

export function AgentActivityTimeline() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Handover & Custody History */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ECEEED] shadow-xs p-6 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-[#ECEEED]">
            <div>
              <h3 className="text-sm font-bold text-stone-900">Handover &amp; Custody History</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Cryptographic immutable log of property management authority transfers.
              </p>
            </div>
            <History className="w-4 h-4 text-stone-400" />
          </div>

          <div className="relative pl-5 space-y-4 mt-4 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
            <div className="relative">
              <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-[#132A20]" />
              <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-900">
                  <span>Transferred 12 Richmond Hill Mansions</span>
                  <span className="font-mono text-[10px] text-stone-400">01 Feb 2025</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Transferred from Alistair Vance (Landlord) to Eleanor Vance. Reason: Overseas mandate.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-stone-400" />
              <div className="p-3 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-900">
                  <span>Authority Extension Granted (Flat 4B)</span>
                  <span className="font-mono text-[10px] text-stone-400">15 Oct 2024</span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Delegation scope extended by +12 months following annual audit review.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#ECEEED] flex items-center justify-between text-xs text-stone-500">
          <span>Section 33 Law of Property Act Compliance</span>
          <button type="button" className="font-semibold text-[#132A20] hover:underline">
            Download Handover PDF
          </button>
        </div>
      </div>

      {/* Real-time Audit Trail */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-[#ECEEED] shadow-xs p-6 flex flex-col justify-between space-y-4">
        <div>
          <div className="pb-3 border-b border-[#ECEEED]">
            <h3 className="text-sm font-bold text-stone-900">Recent Operational Activity</h3>
            <p className="text-xs text-stone-500 mt-0.5">Live audit trail under agent credentials</p>
          </div>

          <div className="space-y-3 mt-4">
            {[
              {
                title: "Dispatched Pimlico Plumbers for boiler drop",
                sub: "Flat 4B Kensington Gdns",
                time: "2 hours ago",
                icon: Wrench,
              },
              {
                title: "Uploaded Gas Safety CP12 Certificate",
                sub: "8 Camden Mews",
                time: "Yesterday, 16:40",
                icon: FileText,
              },
              {
                title: "Scheduled Interim Inventory Check",
                sub: "27 Blenheim Crescent",
                time: "3 days ago",
                icon: Calendar,
              },
              {
                title: "Responded to noise query",
                sub: "Haven Direct Messaging",
                time: "5 days ago",
                icon: MessageSquare,
              },
              {
                title: "Requested contractor quote (£420.00)",
                sub: "12 Richmond Hill Mansions",
                time: "1 week ago",
                icon: Receipt,
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-stone-50 transition-colors">
                  <div className="w-6 h-6 rounded-md bg-[#E8EFEA] text-[#132A20] flex items-center justify-center shrink-0 mt-0.5">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="font-medium text-stone-900 truncate">{item.title}</div>
                    <div className="flex items-center justify-between text-[10px] text-stone-400 mt-0.5">
                      <span>{item.sub}</span>
                      <span className="font-mono">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-[#ECEEED] flex items-center justify-between text-xs text-stone-500">
          <span>Gateway v2.4</span>
          <button type="button" className="font-semibold text-[#132A20] hover:underline">
            View full audit trail →
          </button>
        </div>
      </div>
    </div>
  );
}