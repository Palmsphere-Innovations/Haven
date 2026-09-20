"use client";

import React, { useState } from "react";
import { Building2, Gavel, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InitiateHandoverForm() {
  const [selectedProperty, setSelectedProperty] = useState("RM-12");
  const [permTier, setPermTier] = useState("Tier 3");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Handover mandate initiated for Property Ref: ${selectedProperty} with ${permTier} rights.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="initiate-handover">
      {/* Primary Form */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand " />
            <h2 className="text-sm font-bold text-stone-900">Initiate Property Handover</h2>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Delegate management authority to an accredited agency with cryptographic custody logging.
          </p>
        </div>

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

          {/* Incoming Agent */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-900">
              Select Incoming Accredited Agency
            </label>
            <select className="w-full h-9 px-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900 focus:bg-white focus:outline-none">
              <option>Eleanor Vance — Prime Heritage Management (ARLA #9021)</option>
              <option>Siobhan Campbell — Apex Residential London (RICS #4418)</option>
              <option>Julian Thorne — Belgrave Property Management (NAEA #6712)</option>
            </select>
          </div>

          {/* Delegation Tiers */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-900">Permission Tier Delegation</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { title: "Tier 1", label: "Maintenance-only", sub: "Work orders & emergency dispatch.", val: "Tier 1" },
                { title: "Tier 2", label: "Maintenance + Comms", sub: "Tenant messaging & repairs.", val: "Tier 2" },
                { title: "Tier 3", label: "Full Management", sub: "Rent reconciliation & statutory logs.", val: "Tier 3" },
              ].map((tier) => (
                <label
                  key={tier.val}
                  onClick={() => setPermTier(tier.val)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                    permTier === tier.val
                      ? "bg-[#E8EFEA] border-emerald-300 text-brand "
                      : "bg-[#F9F9F8] border-[#ECEEED] text-stone-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase">{tier.title}</span>
                    <input
                      type="radio"
                      name="permTier"
                      checked={permTier === tier.val}
                      onChange={() => setPermTier(tier.val)}
                      className="accent-brand "
                    />
                  </div>
                  <div className="text-xs font-bold">{tier.label}</div>
                  <div className="text-[10px] text-stone-500 mt-1">{tier.sub}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Effective Cutover Date Input */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900">Statutory Effective Date</label>
              <input
                type="date"
                defaultValue="2026-12-01"
                className="w-full h-9 px-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-900">Key Exchange Deadline</label>
              <input
                type="date"
                defaultValue="2026-11-28"
                className="w-full h-9 px-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900"
              />
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

          <Button type="submit" className="w-full h-10 bg-brand hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-bold shadow-xs">
            Initiate Handover <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </form>
      </div>

      {/* Right Protocol Column */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Gavel className="w-5 h-5 text-brand " />
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