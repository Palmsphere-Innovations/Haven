"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Info, ChevronRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertiesHeader } from "@/components/landlord/properties/properties-header";
import { PropertiesToolbar } from "@/components/landlord/properties/properties-toolbar";
import { PropertiesTable } from "@/components/landlord/properties/properties-table";
import { PropertyGrid } from "@/components/landlord/properties/PropertyGrid";
import { propertiesData as centralizedPropertiesData, type PropertyRecord } from "@/lib/mock/properties";

export default function PropertiesPage() {
  const [propertiesList, setPropertiesList] = useState<PropertyRecord[]>(centralizedPropertiesData);
  const [filterTab, setFilterTab] = useState<"all" | "occupied" | "vacant" | "maintenance">("all");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Property Types");
  const [borough, setBorough] = useState("All Boroughs (London & Surrey)");
  const [sort, setSort] = useState("Sort: Address (A–Z)");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  // New Property Form State
  const [newProp, setNewProp] = useState({
    title: "",
    address: "",
    code: "",
    rent: "£1,850.00",
    type: "Residential",
    subType: "2-Bed Apartment",
    occupant: "Vacant (Available)",
    isVacant: true,
  });

  const filteredProperties = useMemo(() => {
    const query = search.toLowerCase().trim();
    const rows = propertiesList.filter((property) => {
      const matchesTab =
        filterTab === "all" ||
        (filterTab === "vacant" && property.isVacant) ||
        (filterTab === "occupied" && !property.isVacant) ||
        (filterTab === "maintenance" && property.complianceStatus !== "valid");
      const matchesSearch =
        !query ||
        `${property.title} ${property.address} ${property.code}`.toLowerCase().includes(query);
      const matchesType = type === "All Property Types" || property.type === type;
      const matchesBorough =
        borough === "All Boroughs (London & Surrey)" ||
        property.address.toLowerCase().includes(borough.split(",")[0].toLowerCase().replace(" & Chelsea", ""));
      return matchesTab && matchesSearch && matchesType && matchesBorough;
    });

    return rows.sort((a, b) => {
      if (sort === "Sort: Highest Rent") {
        return Number(b.rent.replace(/[£,]/g, "")) - Number(a.rent.replace(/[£,]/g, ""));
      }
      if (sort === "Sort: Lowest Rent") {
        return Number(a.rent.replace(/[£,]/g, "")) - Number(b.rent.replace(/[£,]/g, ""));
      }
      if (sort === "Sort: Compliance Urgency") {
        return (a.complianceStatus === "valid" ? 1 : 0) - (b.complianceStatus === "valid" ? 1 : 0);
      }
      return a.address.localeCompare(b.address);
    });
  }, [borough, filterTab, propertiesList, search, sort, type]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProp.address) return;

    const created: PropertyRecord = {
      id: `prop-${Date.now()}`,
      code: newProp.code || `UK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newProp.title || newProp.address.split(",")[0],
      address: newProp.address,
      type: (newProp.type === "Commercial" ? "Commercial" : "Residential") as "Residential" | "Commercial",
      subType: newProp.subType,
      bedrooms: 2,
      bathrooms: 1,
      epcRating: "C",
      area: "850 sq ft",
      valuation: "£750,000",
      certificates: [
        { name: "Gas Safety CP12", status: "Valid (312d)", valid: true },
        { name: "EICR Electrical", status: "Valid (4 yrs)", valid: true },
        { name: "EPC Rating", status: "C (Valid 2030)", valid: true },
      ],
      occupant: newProp.occupant,
      tenantId: null,
      isVacant: newProp.isVacant,
      tenancyInfo: newProp.isVacant ? "Available for Letting" : "AST Fixed Term",
      rent: newProp.rent.startsWith("£") ? newProp.rent : `£${newProp.rent}`,
      rentType: "pcm",
      ledgerStatus: newProp.isVacant ? "vacant" : "paid_dd",
      ledgerText: newProp.isVacant ? "Vacant" : "Paid • DD",
      complianceStatus: "valid",
      complianceText: "All Valid",
    };

    setPropertiesList((prev) => [created, ...prev]);
    setIsAddOpen(false);
    setNewProp({
      title: "",
      address: "",
      code: "",
      rent: "£1,850.00",
      type: "Residential",
      subType: "2-Bed Apartment",
      occupant: "Vacant (Available)",
      isVacant: true,
    });
    setNotice(`Property "${created.title}" successfully added to your portfolio.`);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      <PropertiesHeader onAddProperty={() => setIsAddOpen(true)} />

      {notice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <PropertiesToolbar
        filterTab={filterTab}
        setFilterTab={setFilterTab}
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        borough={borough}
        setBorough={setBorough}
        sort={sort}
        setSort={setSort}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === "table" ? (
        <PropertiesTable
          key={`${filterTab}-${search}-${type}-${borough}-${sort}`}
          properties={filteredProperties}
        />
      ) : (
        <PropertyGrid properties={filteredProperties} />
      )}

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleAddSubmit}
            className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h2 className="text-lg font-bold text-stone-900">Add Property</h2>

            <div>
              <label className="block text-xs font-semibold text-stone-600">
                Property Title
              </label>
              <input
                required
                value={newProp.title}
                onChange={(e) => setNewProp((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Flat 6, Regent House"
                className="mt-1 h-9 w-full rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600">
                Full Address
              </label>
              <input
                required
                value={newProp.address}
                onChange={(e) => setNewProp((p) => ({ ...p, address: e.target.value }))}
                placeholder="e.g. 14 Regent St, London SW1Y 4PE"
                className="mt-1 h-9 w-full rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600">
                  Property Code
                </label>
                <input
                  value={newProp.code}
                  onChange={(e) => setNewProp((p) => ({ ...p, code: e.target.value }))}
                  placeholder="e.g. RH-06"
                  className="mt-1 h-9 w-full rounded-xl border border-stone-300 px-3 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600">
                  Target Rent (pcm)
                </label>
                <input
                  required
                  value={newProp.rent}
                  onChange={(e) => setNewProp((p) => ({ ...p, rent: e.target.value }))}
                  placeholder="£1,850.00"
                  className="mt-1 h-9 w-full rounded-xl border border-stone-300 px-3 text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-600">
                  Property Type
                </label>
                <select
                  value={newProp.type}
                  onChange={(e) => setNewProp((p) => ({ ...p, type: e.target.value }))}
                  className="mt-1 h-9 w-full rounded-xl border border-stone-300 px-3 text-xs"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Mixed Use</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600">
                  Occupancy Status
                </label>
                <select
                  value={newProp.isVacant ? "vacant" : "occupied"}
                  onChange={(e) => {
                    const isVac = e.target.value === "vacant";
                    setNewProp((p) => ({
                      ...p,
                      isVacant: isVac,
                      occupant: isVac ? "Vacant (Available)" : "New Tenant",
                    }));
                  }}
                  className="mt-1 h-9 w-full rounded-xl border border-stone-300 px-3 text-xs"
                >
                  <option value="vacant">Vacant (Available)</option>
                  <option value="occupied">Occupied (Active)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddOpen(false)}
                className="h-9 rounded-xl text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-9 bg-brand hover:bg-[#0b1b14] text-white rounded-xl text-xs"
              >
                Save Property
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Vault Footer Banner */}
      <div className="p-4 rounded-xl border border-[#e5e2dc] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-stone-400 shrink-0" />
          <span>
            Regulatory statutory certificates (Gas Safety CP12, EICR, and MEES EPC 2025/2026) are synchronized with the central UK landlord vault.
          </span>
        </div>
        <Link
          href="/documents"
          className="font-medium text-stone-800 hover:underline shrink-0 flex items-center gap-1"
        >
          <span>Open Compliance Vault</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
