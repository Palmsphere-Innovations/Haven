"use client";

import React, { useMemo } from "react";
import { Folder, AlertTriangle, ShieldCheck } from "lucide-react";
import type { DocumentItem } from "@/components/landlord/documents/document-hub";
import { documentsList } from "@/components/landlord/documents/document-hub";
import { complianceCertificates } from "@/lib/mock/compliance";
import { propertiesData } from "@/lib/mock/properties";

interface StatCardsRowProps {
  documents?: DocumentItem[];
  totalProperties?: number;
}

export const StatCardsRow: React.FC<StatCardsRowProps> = ({
  documents = documentsList,
  totalProperties = propertiesData.length,
}) => {
  const {
    totalDocs,
    certCount,
    leaseCount,
    inventoryCount,
    expiringSoonCount,
    actionNeededCount,
    totalProps,
    compliantUnits,
    compliancePct,
  } = useMemo(() => {
    const total = documents.length;
    const certs = documents.filter(
      (d) =>
        d.type.toLowerCase().includes("certificate") ||
        d.type.toLowerCase().includes("safety") ||
        d.name.toLowerCase().includes("gas") ||
        d.name.toLowerCase().includes("epc") ||
        d.name.toLowerCase().includes("eicr")
    ).length;
    const leases = documents.filter(
      (d) =>
        d.type.toLowerCase().includes("agreement") ||
        d.type.toLowerCase().includes("lease") ||
        d.name.toLowerCase().includes("ast")
    ).length;
    const inventory = Math.max(0, total - certs - leases);

    const expiring =
      documents.filter((d) => d.fileTheme === "amber").length ||
      complianceCertificates.filter(
        (c) => c.gasType === "warning" || c.epcType === "warning" || c.eicrType === "warning"
      ).length;

    const action =
      documents.filter((d) => d.fileTheme === "red").length ||
      complianceCertificates.filter(
        (c) => c.gasType === "action" || c.epcType === "action" || c.eicrType === "action"
      ).length;

    const propsCount = Math.max(propertiesData.length, totalProperties);
    const compliant = Math.max(0, propsCount - (action > 0 ? 1 : 0));
    const pct = propsCount > 0 ? ((compliant / propsCount) * 100).toFixed(1) : "100";

    return {
      totalDocs: total,
      certCount: certs,
      leaseCount: leases,
      inventoryCount: inventory,
      expiringSoonCount: expiring,
      actionNeededCount: action,
      totalProps: propsCount,
      compliantUnits: compliant,
      compliancePct: pct,
    };
  }, [documents, totalProperties]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Card 1: Total Repository */}
      <div className="border border-stone-200/80 rounded-2xl p-5 flex flex-col justify-between bg-white shadow-xs">
        <div>
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-stone-500">
              Total Repository
            </span>
            <Folder className="w-4 h-4 text-stone-400" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold text-stone-900 tracking-tight">{totalDocs}</span>
            <span className="text-xs font-medium text-stone-600">Active Files</span>
          </div>
          <p className="text-xs text-stone-500">
            {certCount} Certificates • {leaseCount} Leases • {inventoryCount} Other
          </p>
        </div>
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
          <span className="text-stone-400">Vault Storage</span>
          <span className="font-semibold text-stone-800">Verified eIDAS</span>
        </div>
      </div>

      {/* Card 2: Hero Card (Expiring Soon) */}
      <div className="bg-[#132A20] text-white rounded-2xl p-5 flex flex-col justify-between shadow-xs relative overflow-hidden">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-200">
              Expiring Soon
            </span>
            <div className="flex items-center gap-1.5 bg-[#1c3d2f] px-2 py-0.5 rounded-full text-[10px] font-medium text-rose-300">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span>30d Window</span>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold tracking-tight text-white">{expiringSoonCount}</span>
            <span className="text-xs font-medium text-emerald-100">Certificates</span>
          </div>
          <p className="text-xs text-emerald-100/80">Gas Safety (CP12) &amp; Electrical renewals</p>
        </div>
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
          <span className="text-emerald-200/70">Statutory Notice</span>
          <span className="font-bold text-white tracking-wide">Renewal open</span>
        </div>
      </div>

      {/* Card 3: Action Needed */}
      <div className="border border-stone-200/80 rounded-2xl p-5 flex flex-col justify-between bg-white shadow-xs">
        <div>
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-stone-500">
              Action Needed
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl font-bold text-stone-900 tracking-tight">{actionNeededCount}</span>
            <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded text-[11px] font-medium">
              {actionNeededCount > 0 ? "Requires Attention" : "All Clear"}
            </span>
          </div>
          <p className="text-xs text-stone-500">
            {actionNeededCount > 0 ? "Immediate inspection or order required" : "Zero statutory overdue items"}
          </p>
        </div>
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
          <span className="text-stone-400">Action Required</span>
          <span className="font-semibold text-rose-700">Commission Service</span>
        </div>
      </div>

      {/* Card 4: Portfolio Compliance Rate */}
      <div className="border border-stone-200/80 rounded-2xl p-5 flex flex-col justify-between bg-white shadow-xs">
        <div>
          <div className="flex items-center justify-between text-stone-400 mb-3">
            <span className="text-[11px] font-bold tracking-wider uppercase text-stone-500">
              Portfolio Compliance
            </span>
            <ShieldCheck className="w-4 h-4 text-stone-400" />
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold text-stone-900 tracking-tight">{compliancePct}%</span>
            <span className="text-xs font-medium text-stone-600">Fully Certified</span>
          </div>
          <p className="text-xs text-stone-500">
            {compliantUnits} of {totalProps} units compliant with UK PRS statutes
          </p>
        </div>
        <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-[11px]">
          <span className="text-stone-400">RICS Adherence</span>
          <span className="font-semibold text-stone-800">100%</span>
        </div>
      </div>
    </section>
  );
};
