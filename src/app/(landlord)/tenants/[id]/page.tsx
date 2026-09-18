"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Home,
  Mail,
  Phone,
  ShieldCheck,
  UserCheck,
  Calendar,
  Building2,
  Download,
  Plus,
  ArrowRight,
  FileText,
  BadgeCheck,
  Gavel,
  ClipboardList,
  BookOpen,
  Upload,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { tenantDataStore } from "@/lib/mock/mock-data";

/* Legacy detail shape retained for compatibility with the existing page markup. */
const legacyTenantDataStore: Record<
  string,
  {
    id: string;
    authId: string;
    names: string;
    initials: string;
    jointWith?: string;
    email: string;
    phone: string;
    property: string;
    commencedDate: string;
    rentAmount: string;
    arrears: string;
    nextDue: string;
    fixedTerm: string;
    remainingMonths: string;
    depositAmount: string;
    depositScheme: string;
    oversightAgent: string;
    agencyName: string;
    vettingTier: string;
    emergencyContact: string;
  }
> = {
  "1": {
    id: "1",
    authId: "#UK-TN-4109",
    names: "Oliver Davies",
    initials: "OD",
    jointWith: "Clara Finch",
    email: "oliver.davies@kensington-tenants.co.uk",
    phone: "+44 7911 123456",
    property: "Flat 4B, 18 Kensington Gardens, London W2 4QH",
    commencedDate: "01 Oct 2024",
    rentAmount: "£2,450.00",
    arrears: "£0.00",
    nextDue: "01 Nov 2026",
    fixedTerm: "01 Oct 2024 – 30 Sep 2026",
    remainingMonths: "12m remaining",
    depositAmount: "£2,826.92",
    depositScheme: "DPS Custodial",
    oversightAgent: "Eleanor Vance",
    agencyName: "Prime Heritage Management",
    vettingTier: "Tier 1 Pass (Experian 942)",
    emergencyContact: "M. Davies (Father, UK)",
  },
  "2": {
    id: "2",
    authId: "#UK-TN-2081",
    names: "Elena Rostova",
    initials: "ER",
    email: "e.rostova@canton-arts.org",
    phone: "+44 7700 900231",
    property: "8 Camden Mews, London NW1 9UX",
    commencedDate: "15 Jun 2024",
    rentAmount: "£850.00",
    arrears: "£850.00",
    nextDue: "Overdue (14 days)",
    fixedTerm: "15 Jun 2024 – 14 Jun 2026",
    remainingMonths: "9m remaining",
    depositAmount: "£980.76",
    depositScheme: "DPS Custodial",
    oversightAgent: "Haven Lettings Team",
    agencyName: "Haven Property Partners",
    vettingTier: "Tier 1 Pass (Equifax 810)",
    emergencyContact: "A. Rostova (Mother, UK)",
  },
};

export default function TenantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Resolve dynamic URL parameter
  const resolvedParams = use(params);
  const tenantId = resolvedParams.id;

  // Fallback to primary mock record if ID isn't explicitly defined
  const tenant = tenantDataStore[tenantId] || legacyTenantDataStore["1"];

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Breadcrumb & Identifier Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap text-xs text-stone-500">
          <Link
            href="/tenants"
            className="flex items-center gap-1 font-medium text-stone-600 hover:text-brand transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Tenants</span>
          </Link>
          <span className="text-stone-300">/</span>
          <span>Tenants</span>
          <span className="text-stone-300">/</span>
          <span className="font-semibold text-stone-900">
            {tenant.names} ({tenant.property.split(",")[0]})
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[#F9F9F8] border border-[#ECEEED] text-stone-600">
            AST • Fixed Term
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#F9F9F8] border border-[#ECEEED] text-stone-600">
            Protected: {tenant.depositScheme}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#E8EFEA] text-brand font-semibold">
            AUTH-ID: {tenant.authId}
          </span>
        </div>
      </div>

      {/* 2. Profile Summary Header Card */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-[#E8EFEA] text-brand flex items-center justify-center font-bold text-xl">
                {tenant.initials}
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center shadow-xs"
                title="Verified Identity"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl lg:text-2xl font-bold text-stone-900 tracking-tight">
                  {tenant.names}
                </h1>
                {tenant.jointWith && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F0EEE9] text-stone-700 text-[11px] font-semibold flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-stone-500" />
                    Joint AST with {tenant.jointWith}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFEA] text-brand text-[11px] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Active Tenancy
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
                <Home className="w-3.5 h-3.5 text-stone-400" />
                <span>{tenant.property}</span>
                <span className="text-stone-300">•</span>
                <span className="font-medium text-stone-800">
                  Commenced {tenant.commencedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end lg:self-start shrink-0">
            <Button
              variant="outline"
              className="h-9 px-4 rounded-xl border-[#ECEEED] text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              Tenancy Actions
            </Button>
            <Button className="h-9 px-4 bg-brand hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              Send Message
            </Button>
          </div>
        </div>

        {/* Contact Metadata Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Email Address
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-xs font-mono text-stone-900 truncate">
                {tenant.email}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(tenant.email, "email")}
                className="text-stone-400 hover:text-stone-700 p-0.5"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Mobile Contact
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-xs font-mono text-stone-900 truncate">
                {tenant.phone}
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(tenant.phone, "phone")}
                className="text-stone-400 hover:text-stone-700 p-0.5"
              >
                {copiedPhone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Vetting &amp; Credit
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="text-xs font-semibold text-stone-900">
                {tenant.vettingTier}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Emergency Contact
            </span>
            <div className="text-xs text-stone-900 mt-1 font-medium truncate">
              {tenant.emergencyContact}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Four Key Term Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-[#ECEEED] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Agreed Rent
            </span>
            <span className="px-2 py-0.5 rounded bg-[#E8EFEA] text-brand text-[10px] font-bold">
              Current
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-stone-900">
              {tenant.rentAmount}
              <span className="text-xs font-normal text-stone-500"> /mo</span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">Direct Debit via GoCardless</p>
          </div>
          <div className="pt-2 border-t border-[#ECEEED] flex items-center justify-between text-xs text-stone-500">
            <span>Next Due: {tenant.nextDue}</span>
            <span className="font-mono font-semibold text-brand">
              {tenant.arrears} Arrears
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#ECEEED] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Fixed Term Window
            </span>
            <Calendar className="w-4 h-4 text-stone-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-stone-900">{tenant.fixedTerm}</div>
            <p className="text-xs text-stone-500 mt-0.5">
              24 Months AST ({tenant.remainingMonths})
            </p>
          </div>
          <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-brand h-full rounded-full" style={{ width: "50%" }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#ECEEED] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Custodial Deposit
            </span>
            <ShieldCheck className="w-4 h-4 text-stone-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-stone-900">
              {tenant.depositAmount}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">5 weeks capped (TFA 2019)</p>
          </div>
          <div className="pt-2 border-t border-[#ECEEED] flex items-center justify-between text-xs">
            <span className="text-stone-500">Protection:</span>
            <span className="font-mono font-bold text-stone-900">
              {tenant.depositScheme}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-[#ECEEED] shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              Appointed Oversight
            </span>
            <Building2 className="w-4 h-4 text-stone-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-stone-900 truncate">
              {tenant.oversightAgent}
            </div>
            <p className="text-xs text-stone-500 mt-0.5 truncate">{tenant.agencyName}</p>
          </div>
          <div className="pt-2 border-t border-[#ECEEED] flex items-center justify-between text-xs">
            <span className="text-stone-500">Unit: Active</span>
            <Link
              href="/properties"
              className="text-brand hover:underline font-semibold flex items-center gap-0.5"
            >
              Inspect <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Two Column Ledger & Maintenance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* PANEL A: Rent Ledger */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#ECEEED] shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECEEED]">
            <div>
              <h2 className="text-sm font-bold text-stone-900">
                Rent Ledger &amp; Payment History
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Automated Direct Debit reconciliation via GoCardless
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs border-[#ECEEED] rounded-lg"
            >
              <Download className="w-3.5 h-3.5 mr-1 text-stone-500" />
              Download PDF
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F9F9F8] text-[10px] uppercase tracking-wider font-semibold text-stone-500 border-b border-[#ECEEED]">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Reference</th>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ECEEED]">
                {[
                  {
                    date: "01 Oct 2026",
                    ref: "HAV-DD-2026-10",
                    method: "Direct Debit",
                    status: "Paid",
                    amount: tenant.rentAmount,
                  },
                  {
                    date: "01 Sep 2026",
                    ref: "HAV-DD-2026-09",
                    method: "Direct Debit",
                    status: "Paid",
                    amount: tenant.rentAmount,
                  },
                  {
                    date: "01 Aug 2026",
                    ref: "HAV-DD-2026-08",
                    method: "Direct Debit",
                    status: "Paid",
                    amount: tenant.rentAmount,
                  },
                  {
                    date: "01 Jul 2026",
                    ref: "HAV-DD-2026-07",
                    method: "Direct Debit",
                    status: "Late (+3d)",
                    amount: tenant.rentAmount,
                  },
                  {
                    date: "01 Jun 2026",
                    ref: "HAV-DD-2026-06",
                    method: "Direct Debit",
                    status: "Paid",
                    amount: tenant.rentAmount,
                  },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-3 font-mono text-stone-900">{item.date}</td>
                    <td className="py-3 px-3 font-mono text-stone-500">{item.ref}</td>
                    <td className="py-3 px-3 text-stone-600">{item.method}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === "Paid"
                            ? "bg-[#EAF4ED] text-[#1E5E2F]"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-stone-900">
                      {item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-stone-500">Cumulative paid in term: £29,400.00</span>
            <button
              type="button"
              className="text-brand font-semibold hover:underline flex items-center gap-1"
            >
              View full payment history <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* PANEL B: Maintenance Tickets */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#ECEEED] shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#ECEEED]">
            <div>
              <h2 className="text-sm font-bold text-stone-900">Maintenance Tickets</h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Submitted tickets for {tenant.names}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 text-xs border-[#ECEEED] rounded-lg"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Log Note
            </Button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] font-bold text-brand bg-[#E8EFEA] px-1.5 py-0.5 rounded">
                    MN-104
                  </span>
                  <h3 className="text-xs font-bold text-stone-900 mt-1">
                    Boiler pressure drop &amp; no hot water
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                  In Progress
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Dispatched Pimlico Plumbers. Pre-approved quote £180.00.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                    MN-098
                  </span>
                  <h3 className="text-xs font-bold text-stone-900 mt-1">
                    Extractor fan replacement
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF4ED] text-[#1E5E2F] shrink-0">
                  Resolved
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                Apex Electrical replacement signed off (£145.00).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Documents & Compliance Grid */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#ECEEED]">
          <div>
            <h2 className="text-sm font-bold text-stone-900">
              Tenancy Documents &amp; Identity Verification
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Executed statutory agreements and Right to Rent verifications
            </p>
          </div>
          <Button className="h-8 px-3.5 bg-brand hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shrink-0">
            <Upload className="w-3.5 h-3.5 mr-1.5" />
            Upload Document
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Assured Shorthold Tenancy (AST)",
              sub: `Signed by ${tenant.names}`,
              tag: "PDF • 2.4 MB",
              status: "Verified eSign",
              icon: FileText,
            },
            {
              title: "Right to Rent Verification",
              sub: "Home Office Share Code checked",
              tag: "Continuous Right",
              status: "UK Biometric",
              icon: BadgeCheck,
            },
            {
              title: "DPS Deposit Certificate",
              sub: `Ref: ${tenant.depositScheme}`,
              tag: "Prescribed Info Served",
              status: "Compliant",
              icon: Gavel,
            },
            {
              title: "Ingoing Condition Inventory",
              sub: "68 pages, 142 condition photos",
              tag: "Zero Disputes",
              status: `Dated ${tenant.commencedDate}`,
              icon: ClipboardList,
            },
            {
              title: "How to Rent Guide (v6.2)",
              sub: "Statutory pre-tenancy pack proof",
              tag: "Service Valid",
              status: "EPC C + Gas Safe",
              icon: BookOpen,
            },
          ].map((doc, idx) => {
            const IconComp = doc.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex flex-col justify-between space-y-3 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8EFEA] text-brand flex items-center justify-center shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-stone-900">{doc.title}</h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">{doc.sub}</p>
                    <div className="flex items-center gap-1.5 mt-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-white border border-[#ECEEED] font-mono text-stone-600">
                        {doc.tag}
                      </span>
                      <span className="font-semibold text-emerald-700">{doc.status}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#ECEEED] flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-stone-400">28 Sep 2024</span>
                  <div className="flex items-center gap-2">
                    <button type="button" className="font-semibold text-brand hover:underline">
                      View
                    </button>
                    <span className="text-stone-300">|</span>
                    <button type="button" className="text-stone-500 hover:text-stone-900">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}