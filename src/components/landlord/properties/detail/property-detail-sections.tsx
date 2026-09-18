"use client";

import React from "react";
import {
  Download,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  UserRound,
  Calendar,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
import type { MockProperty } from "@/lib/mock/properties";

export function DetailCard({
  title,
  subtitle,
  children,
  action,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#ECEEED] bg-white p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#ECEEED]">
          <div>
            <h2 className="text-sm font-bold text-stone-900 tracking-tight">{title}</h2>
            {subtitle && <p className="text-[11px] text-stone-500 mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  );
}

export function OverviewSection({ code, property }: { code?: string; property?: MockProperty }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* Specs */}
      <DetailCard title="Property Specifications" subtitle="Building footprint & energy index">
        <dl className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#ECEEED]">
            <dt className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider">Bedrooms</dt>
            <dd className="mt-1 text-base font-bold text-stone-900">{property?.bedrooms ?? 2} Beds</dd>
          </div>
          <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#ECEEED]">
            <dt className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider">Bathrooms</dt>
            <dd className="mt-1 text-base font-bold text-stone-900">{property?.bathrooms ?? 1} Baths</dd>
          </div>
          <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#ECEEED]">
            <dt className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider">EPC Rating</dt>
            <dd className="mt-1 text-base font-bold text-emerald-700">{property?.epcRating ?? "C (72)"}</dd>
          </div>
          <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#ECEEED]">
            <dt className="text-[10px] uppercase font-semibold text-stone-500 tracking-wider">Total Area</dt>
            <dd className="mt-1 text-base font-bold text-stone-900">{property?.area ?? "846 sq ft"}</dd>
          </div>
        </dl>
      </DetailCard>

      {/* Financials */}
      <DetailCard title="Financial Valuation" subtitle="Portfolio equity & rent target">
        <div className="space-y-3">
          <div className="p-3.5 bg-[#F9F9F8] rounded-xl border border-[#ECEEED] flex items-center justify-between">
            <span className="text-xs text-stone-600 font-medium">Estimated Valuation</span>
            <span className="text-base font-bold text-stone-900 font-mono">{property?.valuation ?? "£465,000.00"}</span>
          </div>
          <div className="p-3.5 bg-[#F9F9F8] rounded-xl border border-[#ECEEED] flex items-center justify-between">
            <span className="text-xs text-stone-600 font-medium">Monthly Target Rent</span>
            <span className="text-base font-bold text-brand font-mono">{property?.rent ?? "£1,850.00"}</span>
          </div>
        </div>
      </DetailCard>

      {/* Letting Agent */}
      <DetailCard title="Assigned Letting Agent" subtitle="Operational management contact">
        <div className="p-4 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] flex items-center justify-center text-brand shrink-0">
            <UserRound className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-stone-900">Haven Property Partners</p>
            <p className="text-[11px] text-stone-500 mt-0.5">Manager Ref: {property?.code ?? code}</p>
          </div>
        </div>
      </DetailCard>
    </div>
  );
}

export function TenancySection({ property }: { property?: MockProperty }) {
  const payments = [
    { period: "September 2026", amount: "£1,850.00", status: "Paid (Direct Debit)" },
    { period: "August 2026", amount: "£1,850.00", status: "Paid (Direct Debit)" },
    { period: "July 2026", amount: "£1,850.00", status: "Paid (Direct Debit)" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
      {/* Current Tenancy */}
      <DetailCard title="Active Tenancy Agreement" subtitle="AST contract index">
        <div className="space-y-4">
          <div className="p-4 bg-[#F9F9F8] rounded-xl border border-[#ECEEED]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">{property?.tenant ?? "Maya Lin & S. Patel"}</span>
              <span className="px-2 py-0.5 rounded-full bg-[#E8EFEA] text-brand text-[10px] font-semibold">
                Active AST
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              01 Feb 2025 – 31 Jan 2027 (24 Months)
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#ECEEED]">
              <span className="text-[10px] uppercase font-semibold text-stone-500">Monthly Rent</span>
              <p className="text-sm font-bold text-stone-900 font-mono mt-0.5">{property?.rent ?? "£1,850.00"}</p>
            </div>
            <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#ECEEED]">
              <span className="text-[10px] uppercase font-semibold text-stone-500">Protected Deposit</span>
              <p className="text-sm font-bold text-stone-900 font-mono mt-0.5">£2,134.62 (TDS)</p>
            </div>
          </div>
        </div>
      </DetailCard>

      {/* Rent Payment Log */}
      <DetailCard title="Collection & Ledger History" subtitle="Reconciled client accounts">
        <div className="divide-y divide-stone-100 text-xs">
          {payments.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-stone-400" />
                <span className="font-medium text-stone-800">{item.period}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-stone-900 font-mono">{item.amount}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EAF4ED] text-[#1E5E2F]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </DetailCard>
    </div>
  );
}

export function ComplianceSection({ certificates }: { certificates?: MockProperty["certificates"] }) {
  const defaultCertificates = [
    { name: "Gas Safety Certificate (CP12)", status: "Expires in 5 days", valid: false },
    { name: "Electrical Inspection (EICR)", status: "Valid until 2028", valid: true },
    { name: "Energy Certificate (EPC)", status: "Valid until 2031", valid: true },
    { name: "Smoke & CO Alarms Log", status: "Checked Jan 2026", valid: true },
  ];

  return (
    <DetailCard title="Statutory Compliance Vault" subtitle="UK Regulatory index">
      <div className="divide-y divide-stone-100">
        {(certificates ?? defaultCertificates).map((cert) => (
          <div key={cert.name} className="flex items-center justify-between gap-3 py-3.5">
            <div className="flex items-center gap-3">
              {cert.valid ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
              )}
              <div>
                <p className="text-xs font-bold text-stone-900">{cert.name}</p>
                <p className={`text-[11px] ${cert.valid ? "text-stone-500" : "text-amber-700 font-medium"}`}>
                  {cert.status}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-brand px-3 py-1.5 rounded-lg border border-[#ECEEED] hover:bg-stone-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              Download
            </button>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}

export function MaintenanceSection() {
  return (
    <DetailCard title="Unit Maintenance Log" subtitle="Active & historical ticket queue">
      <div className="space-y-3">
        <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Wrench className="w-4 h-4 text-amber-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900">Intercom buzzer not connecting</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                Open • Awaiting estimate • Submitted 12 Sep 2026
              </p>
            </div>
          </div>
          <button type="button" className="text-xs text-amber-900 font-semibold hover:underline flex items-center gap-0.5">
            Manage <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-bold text-stone-900">Annual Boiler Service &amp; Flush</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Resolved • 04 Aug 2026</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 bg-[#EAF4ED] px-2 py-0.5 rounded-full">
            Completed
          </span>
        </div>
      </div>
    </DetailCard>
  );
}