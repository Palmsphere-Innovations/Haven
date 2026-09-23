"use client";

import React, { useState } from "react";
import { Contact, Phone, Plus, Check, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Vendor {
  id: string;
  name: string;
  initials: string;
  service: string;
  phone: string;
  color: string;
}

const initialVendors: Vendor[] = [
  {
    id: "v1",
    name: "Pimlico Emergency Gas & Plumbing",
    initials: "PP",
    service: "24/7 SLA Response • Gas Safe Reg #5021",
    phone: "+44 20 7924 1000",
    color: "bg-blue-100 text-blue-900",
  },
  {
    id: "v2",
    name: "Apex Electrical & Fire Solutions",
    initials: "AE",
    service: "NICEIC Approved • EICR Specialist",
    phone: "+44 20 8452 3311",
    color: "bg-amber-100 text-amber-900",
  },
  {
    id: "v3",
    name: "London Locksmiths & Security",
    initials: "LL",
    service: "MLA Master Locksmiths • Master Keys",
    phone: "+44 20 7700 8989",
    color: "bg-emerald-100 text-emerald-900",
  },
];

export const VendorDirectory: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: "", service: "", phone: "" });

  const handleCopyPhone = (id: string, phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name || !newVendor.phone) return;
    const initials = newVendor.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    const created: Vendor = {
      id: `v-${Date.now()}`,
      name: newVendor.name,
      initials: initials || "VN",
      service: newVendor.service || "Contractor Service",
      phone: newVendor.phone,
      color: "bg-purple-100 text-purple-900",
    };
    setVendors((prev) => [created, ...prev]);
    setNewVendor({ name: "", service: "", phone: "" });
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-sm p-6 sm:p-7 flex flex-col">
      <div className="flex items-center justify-between pb-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Contact className="w-5 h-5 text-[#111827]" />
          <h2 className="text-base font-bold text-[#111827]">Vendor Directory</h2>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowAddModal(true)}
          className="h-8 px-2 text-xs font-semibold text-brand hover:bg-[#E8EFEA] rounded-lg cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Add
        </Button>
      </div>

      <div className="flex flex-col gap-3 py-4">
        {vendors.map((v) => (
          <div
            key={v.id}
            className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between hover:bg-gray-100/70 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg ${v.color} flex items-center justify-center font-semibold text-xs shrink-0`}
              >
                {v.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#111827]">
                  {v.name}
                </span>
                <span className="text-[11px] text-[#6B7280]">{v.service}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleCopyPhone(v.id, v.phone)}
                title="Copy phone"
                className="p-2 rounded-lg bg-white hover:bg-gray-200 text-[#111827] border border-gray-200 transition-colors cursor-pointer text-xs"
              >
                {copiedId === v.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Phone className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#6B7280]">
        <span>Client Money Protection: Propertymark</span>
        <span className="font-mono">ICO: ZA48291</span>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleAddVendor}
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          >
            <h3 className="text-base font-bold text-[#111827]">
              Add Approved Vendor
            </h3>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Company / Trade Name
              </label>
              <input
                required
                value={newVendor.name}
                onChange={(e) =>
                  setNewVendor((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. Metro Gas Safe Ltd"
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Accreditation / Specialty
              </label>
              <input
                value={newVendor.service}
                onChange={(e) =>
                  setNewVendor((prev) => ({ ...prev, service: e.target.value }))
                }
                placeholder="e.g. Gas Safe #12345 • 24/7 Callout"
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Emergency Phone Number
              </label>
              <input
                required
                value={newVendor.phone}
                onChange={(e) =>
                  setNewVendor((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="+44 20 ..."
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs font-mono"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddModal(false)}
                className="h-8 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-8 text-xs bg-brand hover:bg-[#0b1b14] text-white rounded-xl"
              >
                Save Contractor
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
