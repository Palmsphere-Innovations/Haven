"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Pencil, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OverviewSection, TenancySection, ComplianceSection, MaintenanceSection } from "@/components/landlord/properties/detail/property-detail-sections";
import type { MockProperty } from "@/lib/mock/properties";

export function PropertyDetailClient({ property }: { property: MockProperty }) {
  const [tab, setTab] = useState<"overview" | "tenancy" | "compliance" | "maintenance">("overview");
  return <div className="space-y-6">
    <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900"><ArrowLeft className="h-4 w-4" />Back to Properties</Link>
    <header className="flex flex-col gap-5 rounded-2xl border border-[#ECEEED] bg-white p-6 sm:flex-row sm:items-end sm:justify-between">
      <div><div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700">{property.code}</span><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${property.vacant ? "bg-stone-100 text-stone-600" : "bg-emerald-50 text-emerald-700"}`}>{property.vacant ? "Vacant" : "Occupied"}</span><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${property.compliance.includes("Valid") ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{property.compliance.includes("Valid") ? "Valid" : "Action Required"}</span></div><h1 className="text-2xl font-semibold tracking-tight text-brand sm:text-3xl">{property.title}</h1><p className="mt-1 text-sm text-stone-500">{property.address}</p></div>
      <div className="flex flex-wrap gap-2"><Button variant="outline" size="sm"><Pencil className="mr-1.5 h-3.5 w-3.5" />Edit Property</Button><Button variant="outline" size="sm"><Wrench className="mr-1.5 h-3.5 w-3.5" />Log Maintenance Ticket</Button><Button size="sm" className="bg-[#132A20] text-white"><Download className="mr-1.5 h-3.5 w-3.5" />Download Property Dossier</Button></div>
    </header>
    <div className="flex gap-1 overflow-x-auto border-b border-stone-200">{[["overview", "Overview"], ["tenancy", "Tenancy & Rent"], ["compliance", "Compliance Vault"], ["maintenance", "Maintenance Log"]].map(([value, label]) => <button key={value} type="button" onClick={() => setTab(value as typeof tab)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium ${tab === value ? "border-brand text-brand" : "border-transparent text-stone-500 hover:text-stone-800"}`}>{label}</button>)}</div>
    {tab === "overview" && <OverviewSection property={property} />}{tab === "tenancy" && <TenancySection property={property} />}{tab === "compliance" && <ComplianceSection certificates={property.certificates} />}{tab === "maintenance" && <MaintenanceSection />}
  </div>;
}
