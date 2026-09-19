"use client"

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertiesHeader } from "@/components/landlord/properties/properties-header";
import { PropertiesToolbar } from "@/components/landlord/properties/properties-toolbar";
import { PropertiesTable} from "@/components/landlord/properties/properties-table";
import {PropertyRecord } from "@/lib/mock/properties"
import { propertiesData as centralizedPropertiesData } from "@/lib/mock/properties";
// import { legacyProperties} from "@/lib/mock/properties";


// void legacyProperties;

export default function PropertiesPage() {
  const [filterTab, setFilterTab] = useState<"all" | "occupied" | "vacant" | "maintenance">("all");
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Property Types");
  const [borough, setBorough] = useState("All Boroughs (London & Surrey)");
  const [sort, setSort] = useState("Sort: Address (A–Z)");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const filteredProperties = useMemo(() => {
    const query = search.toLowerCase().trim();
    const rows = centralizedPropertiesData.filter((property) => {
      const matchesTab = filterTab === "all" || (filterTab === "vacant" && property.isVacant) || (filterTab === "occupied" && !property.isVacant) || (filterTab === "maintenance" && property.complianceStatus !== "valid");
      const matchesSearch = !query || `${property.title} ${property.address} ${property.code}`.toLowerCase().includes(query);
      const matchesType = type === "All Property Types" || property.type === type;
      const matchesBorough = borough === "All Boroughs (London & Surrey)" || property.address.toLowerCase().includes(borough.split(",")[0].toLowerCase().replace(" & Chelsea", ""));
      return matchesTab && matchesSearch && matchesType && matchesBorough;
    });
    return rows.sort((a, b) => sort === "Sort: Highest Rent" ? Number(b.rent.replace(/[£,]/g, "")) - Number(a.rent.replace(/[£,]/g, "")) : sort === "Sort: Lowest Rent" ? Number(a.rent.replace(/[£,]/g, "")) - Number(b.rent.replace(/[£,]/g, "")) : sort === "Sort: Compliance Urgency" ? (a.complianceStatus === "valid" ? 1 : 0) - (b.complianceStatus === "valid" ? 1 : 0) : a.address.localeCompare(b.address));
  }, [borough, filterTab, search, sort, type]);

  return (
    <div className="space-y-6">
      <PropertiesHeader onAddProperty={() => setIsAddOpen(true)} />
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
      setViewMode={setViewMode} />

      <PropertiesTable 
      key={`${filterTab}-${search}-${type}-${borough}-${sort}`} 
      properties={filteredProperties} />

      {isAddOpen && 
      
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        
        <form 
        onSubmit={(event) => { event.preventDefault(); setIsAddOpen(false); }} 
        className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl">
          <h2 className="text-lg font-semibold text-stone-900">
            Add Property
            </h2>
            {["Property address", "Property code", "Target rent"].map((label) =>
               <label key={label} className="block text-xs font-medium text-stone-600">
                {label}
                <input required className="mt-1 h-10 w-full rounded-lg border border-stone-300 px-3 text-sm" />
                </label>)}
                <label className="block text-xs font-medium text-stone-600">
                  Property type
                  <select className="mt-1 h-10 w-full rounded-lg border border-stone-300 px-3 text-sm">
                    <option>Residential</option>
                    <option>Commercial</option>
                    </select>
                    </label>
                    <div 
                    className="flex justify-end gap-2">
                      <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddOpen(false)}>
                        Cancel
                        </Button>
                        <Button 
                        type="submit" 
                        className="bg-brand text-white">
                          Save Property
                          </Button>
                          </div>
                          </form>
                          </div>}

      {/* Vault Footer Banner */}
      <div className="p-4 rounded-xl border border-[#e5e2dc] bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-stone-400 shrink-0" />
          <span>
            Regulatory statutory certificates (Gas Safety CP12, EICR, and MEES EPC 2025/2026) are synchronized with the central UK landlord vault.
          </span>
        </div>
        <Link href="/documents" className="font-medium text-stone-800 hover:underline shrink-0 flex items-center gap-1">
          <span>Open Compliance Vault</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}