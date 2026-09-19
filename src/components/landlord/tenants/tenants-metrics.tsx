"use client";

import React from "react";
import { Key, Mail, CreditCard, ShieldCheck } from "lucide-react";

export function TenantsMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Active Tenancies
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-stone-900">39</span>
            <span className="text-xs text-stone-500 font-mono">92.8% occupancy</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center text-brand ">
          <Key className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Pending Invites
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-stone-900">3</span>
            <span className="text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
              Awaiting onboarding
            </span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center text-stone-500">
          <Mail className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Total Monthly Roll
          </span>
          <div className="mt-1 text-2xl font-bold text-stone-900 font-mono">
            £92,050.00
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center text-brand">
          <CreditCard className="w-5 h-5" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#ECEEED] shadow-xs flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
            Identity &amp; Right to Rent
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-stone-900">100%</span>
            <span className="text-xs text-stone-500">Statutory verified</span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center text-emerald-700">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}