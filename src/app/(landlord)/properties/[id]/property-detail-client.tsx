"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Pencil, Wrench, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  OverviewSection,
  TenancySection,
  ComplianceSection,
  MaintenanceSection,
} from "@/components/landlord/properties/detail/property-detail-sections";
import type { PropertyRecord } from "@/lib/mock/properties";
import { LogRequestModal } from "@/components/landlord/maintenance/modals/log-request-modal";

export function PropertyDetailClient({
  property: initialProperty,
}: {
  property: PropertyRecord;
}) {
  const router = useRouter();
  const [property, setProperty] = useState<PropertyRecord>(initialProperty);
  const [tab, setTab] = useState<"overview" | "tenancy" | "compliance" | "maintenance">(
    "overview"
  );
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isLogTicketOpen, setIsLogTicketOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // Edit State
  const [editTitle, setEditTitle] = useState(property.title);
  const [editAddress, setEditAddress] = useState(property.address);
  const [editRent, setEditRent] = useState(property.rent);
  const [editOccupant, setEditOccupant] = useState(property.occupant);
  const [editVacant, setEditVacant] = useState(property.isVacant);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProperty((prev) => ({
      ...prev,
      title: editTitle,
      address: editAddress,
      rent: editRent,
      occupant: editOccupant,
      isVacant: editVacant,
      ledgerStatus: editVacant ? "vacant" : prev.ledgerStatus,
      ledgerText: editVacant ? "Vacant" : prev.ledgerText,
    }));
    setIsEditOpen(false);
    setNotice("Property details successfully updated.");
    setTimeout(() => setNotice(null), 3000);
  };

  const handleDownloadDossier = () => {
    const content = [
      ["PROPERTY COMPLIANCE & ASSET DOSSIER"],
      [`Generated: ${new Date().toUTCString()}`],
      [""],
      ["Property Reference", property.code],
      ["Property Title", property.title],
      ["Address", property.address],
      ["Type", `${property.type} (${property.subType})`],
      ["Occupancy Status", property.isVacant ? "Vacant" : "Occupied"],
      ["Current Occupant", property.occupant],
      ["Monthly Rent", property.rent],
      ["Rent Cadence", property.rentType],
      ["Statutory Compliance", property.complianceText],
      [""],
      ["STATUTORY CERTIFICATES RECORD"],
      ...(property.certificates || []).map((c) => [
        `"${c.name}"`,
        `"Status: ${c.status}"`,
        `"Valid: ${c.valid ? "Yes" : "No"}"`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `dossier-${property.code}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setNotice(`Downloaded compliance dossier for ${property.code}.`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-[#ECEEED] px-3 py-1.5 rounded-xl shadow-xs transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Link>
      </div>

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <header className="flex flex-col gap-5 rounded-2xl border border-[#ECEEED] bg-white p-6 sm:flex-row sm:items-end sm:justify-between shadow-xs">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700 font-mono">
              #{property.code}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                property.isVacant
                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {property.isVacant ? "Vacant" : "Occupied"}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                property.complianceStatus === "valid"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {property.complianceStatus === "valid" ? "Valid" : "Action Required"}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-brand sm:text-3xl">
            {property.title}
          </h1>
          <p className="mt-1 text-sm text-stone-500">{property.address}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditOpen(true)}
            className="cursor-pointer"
          >
            <Pencil className="mr-1.5 h-3.5 w-3.5" />
            Edit Property
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLogTicketOpen(true)}
            className="cursor-pointer"
          >
            <Wrench className="mr-1.5 h-3.5 w-3.5" />
            Log Maintenance Ticket
          </Button>
          <Button
            size="sm"
            onClick={handleDownloadDossier}
            className="bg-[#132A20] text-white hover:bg-[#1f4233] cursor-pointer"
          >
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Download Property Dossier
          </Button>
        </div>
      </header>

      <div className="flex gap-1 overflow-x-auto border-b border-stone-200">
        {[
          ["overview", "Overview"],
          ["tenancy", "Tenancy & Rent"],
          ["compliance", "Compliance Vault"],
          ["maintenance", "Maintenance Log"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value as typeof tab)}
            className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
              tab === value
                ? "border-brand text-brand font-semibold"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && <OverviewSection property={property} />}
      {tab === "tenancy" && <TenancySection property={property} />}
      {tab === "compliance" && (
        <ComplianceSection certificates={property.certificates} />
      )}
      {tab === "maintenance" && <MaintenanceSection />}

      {/* Edit Property Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleEditSubmit}
            className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 className="text-base font-bold text-stone-900">
              Edit Property Details
            </h2>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Property Title
              </label>
              <input
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Full Address
              </label>
              <input
                required
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Monthly Rent
                </label>
                <input
                  required
                  value={editRent}
                  onChange={(e) => setEditRent(e.target.value)}
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">
                  Occupancy
                </label>
                <select
                  value={editVacant ? "vacant" : "occupied"}
                  onChange={(e) => setEditVacant(e.target.value === "vacant")}
                  className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
                >
                  <option value="occupied">Occupied</option>
                  <option value="vacant">Vacant</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Occupant Name(s)
              </label>
              <input
                value={editOccupant}
                onChange={(e) => setEditOccupant(e.target.value)}
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditOpen(false)}
                className="h-8 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-8 text-xs bg-brand hover:bg-[#0b1b14] text-white rounded-xl"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Log Ticket Modal */}
      {isLogTicketOpen && (
        <LogRequestModal
          onClose={() => setIsLogTicketOpen(false)}
          onAdd={() => {
            setIsLogTicketOpen(false);
            setNotice("Maintenance ticket logged and dispatched to contractor.");
            setTimeout(() => setNotice(null), 3500);
          }}
        />
      )}
    </div>
  );
}
