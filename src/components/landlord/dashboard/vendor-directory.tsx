"use client";

import React, { useState } from "react";
import { Contact, Phone, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { directoryListings } from "@/lib/mock/vendor-directory";

interface Vendor {
  id: string;
  name: string;
  initials: string;
  service: string;
  phone: string;
  color: string;
}

const colorPalette = [
  "bg-blue-100 text-blue-900",
  "bg-amber-100 text-amber-900",
  "bg-emerald-100 text-emerald-900",
  "bg-purple-100 text-purple-900",
];

const mappedVendors: Vendor[] = directoryListings.slice(0, 3).map((item, idx) => {
  const words = item.companyName.split(" ");
  const initials =
    words.length >= 2
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : item.companyName.slice(0, 2).toUpperCase();

  return {
    id: item.id,
    name: item.companyName,
    initials,
    service: `${item.primaryTrade} • ${item.accreditationBody} #${item.accreditationNumber}`,
    phone: item.contactPhoneMasked.replace(/•+/g, "5555"),
    color: colorPalette[idx % colorPalette.length],
  };
});

export const VendorDirectory: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mappedVendors);
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
      service: newVendor.service || "General Contractor • Verified",
      phone: newVendor.phone,
      color: "bg-stone-100 text-stone-800",
    };
    setVendors((prev) => [...prev, created]);
    setNewVendor({ name: "", service: "", phone: "" });
    setShowAddModal(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-sm p-6 sm:p-7 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Contact className="w-5 h-5 text-[#132A20]" />
            <h2 className="text-base font-bold text-[#111827]">
              Approved Contractors
            </h2>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowAddModal(true)}
            className="text-xs h-7 rounded-lg border-gray-200 text-[#132A20] hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Contractor
          </Button>
        </div>

        <div className="flex flex-col divide-y divide-gray-100 mt-2">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="py-3.5 flex items-center justify-between gap-3 hover:bg-gray-50/60 rounded-xl px-2 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${vendor.color}`}
                >
                  {vendor.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#111827] truncate">
                    {vendor.name}
                  </p>
                  <p className="text-[11px] text-[#6B7280] truncate mt-0.5">
                    {vendor.service}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleCopyPhone(vendor.id, vendor.phone)}
                  title="Copy Phone Number"
                  className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                    copiedId === vendor.id
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {copiedId === vendor.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-mono hidden sm:inline">
                        {vendor.phone}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 mt-2 flex items-center justify-between text-xs text-[#6B7280]">
        <span>All vendors Gas Safe / NICEIC verified</span>
        <span className="font-semibold text-[#132A20]">{vendors.length} Active</span>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleAddVendor}
            className="bg-white rounded-2xl shadow-xl border border-stone-200 w-full max-w-sm p-5 space-y-3"
          >
            <h3 className="text-sm font-bold text-stone-900">
              Add Emergency Contractor
            </h3>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Company Name
              </label>
              <input
                required
                value={newVendor.name}
                onChange={(e) =>
                  setNewVendor((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g. Apex Electrical Solutions"
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Trade &amp; Accreditation
              </label>
              <input
                value={newVendor.service}
                onChange={(e) =>
                  setNewVendor((prev) => ({ ...prev, service: e.target.value }))
                }
                placeholder="e.g. NICEIC Approved • 24/7 Response"
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
