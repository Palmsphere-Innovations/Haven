"use client";

import React, { useState } from "react";
import { Building2, Gavel, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InitiateHandoverForm() {
  const [selectedProperty, setSelectedProperty] = useState("RM-12");
  const [permTier, setPermTier] = useState("Tier 3");
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusNotice(
      `Handover mandate initiated for Property Ref: ${selectedProperty} with ${permTier} authority rights. Cryptographic audit dispatch sent to incoming agency.`
    );
    setTimeout(() => setStatusNotice(null), 5000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="initiate-handover">
      {/* Primary Form */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand" />
            <h2 className="text-sm font-bold text-stone-900">Initiate Property Handover</h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Delegate management authority to an accredited agency with cryptographic custody logging.
          </p>
        </div>

        {statusNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">{statusNotice}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Asset Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-900 flex justify-between">
              <span>Select Property / Asset</span>
              <span className="text-[10px] text-stone-400 font-normal">Freehold or Long Lease</span>
            </label>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full h-9 px-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none"
            >
              <option value="RM-12">12 Richmond Hill Mansions, TW10 6RF</option>
              <option value="BC-27">27 Blenheim Crescent, London W11 2EE</option>
              <option value="SJ-03A">Unit 3A, St. John&apos;s Court, SW4 7JT</option>
              <option value="EP-09">Belgrave Penthouse, 9 Eaton Place, SW1X 8BN</option>
            </select>
          </div>

          {/* Outgoing Agent Info */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-500 flex justify-between">
              <span>Outgoing Agent (Incumbent Authority)</span>
              <span className="text-[10px] text-brand font-bold">Auto-detected</span>
            </label>
            <div className="w-full h-9 px-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900 flex items-center justify-between">
              <span className="font-medium">Vanguard Realty Services (#VR-4029)</span>
              <span className="text-[10px] text-stone-400">30-day statutory notice</span>
            </div>
          </div>

          {/* Incoming Agent Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-900 flex justify-between">
              <span>Incoming Agent / Practice</span>
              <span className="text-[10px] text-stone-400 font-normal">Accredited RICS / ARLA</span>
            </label>
            <select className="w-full h-9 px-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none">
              <option>Prime Heritage Management (#PH-8812)</option>
              <option>Apex Residential (#AR-5501)</option>
              <option>Chestertons Prime Lettings (#CP-9902)</option>
            </select>
          </div>

          {/* Permission Tier Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-900 flex justify-between">
              <span>Delegated Permission Tier</span>
              <span className="text-[10px] text-stone-400 font-normal">Scope of Authority</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { tier: "Tier 1", label: "Maintenance Only" },
                { tier: "Tier 2", label: "Maintenance + Comms" },
                { tier: "Tier 3", label: "Full Management" },
              ].map((t) => (
                <button
                  key={t.tier}
                  type="button"
                  onClick={() => setPermTier(t.tier)}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    permTier === t.tier
                      ? "border-brand bg-[#E8EFEA] text-brand font-bold"
                      : "border-[#ECEEED] bg-[#F9F9F8] text-stone-600 hover:border-stone-400"
                  }`}
                >
                  <span className="text-[10px] block opacity-75">{t.tier}</span>
                  <span className="text-xs font-semibold block mt-0.5">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Root Custody Box */}
          <div className="p-4 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-stone-900">Permanent Root Custody Guarantee</div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Landlord retains permanent data ownership throughout this transition. All historic ledgers and compliance items remain anchored to Vance Holdings Ltd.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-10 bg-brand hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
          >
            Initiate Handover <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>
      </div>

      {/* Right Protocol Column */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Gavel className="w-5 h-5 text-brand" />
          <h3 className="text-sm font-bold text-stone-900">Statutory Handover Protocol</h3>
        </div>
        <p className="text-xs text-stone-500">
          Operates under cryptographic validation to maintain RICS audit trails and English tenancy law protections.
        </p>

        <div className="space-y-4 pt-2">
          {[
            { num: "01", title: "Zero-Trust Handover", desc: "No silent transfers under Estate Agents Act 1979. Any delegation change alerts tenants automatically." },
            { num: "02", title: "Dual-Party Affirmation", desc: "Landlord and incoming agency sign digital mandates with timestamped RSA keys." },
            { num: "03", title: "Custody & Key Log", desc: "Verified photo audit of physical keys, alarm codes, and meter readings prior to authorization." },
            { num: "04", title: "Data Vault Continuity", desc: "Outgoing agents lose tenant messaging access immediately on effective date." },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-lg bg-[#F9F9F8] border border-[#ECEEED] text-stone-900 text-[10px] font-bold flex items-center justify-center shrink-0">
                {step.num}
              </span>
              <div>
                <h4 className="text-xs font-bold text-stone-900">{step.title}</h4>
                <p className="text-[11px] text-stone-500 mt-0.5">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
