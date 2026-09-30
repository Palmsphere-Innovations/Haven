"use client";

import React, { useState } from "react";
import { X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { propertiesData } from "@/lib/mock/properties";
import { tenantsData } from "@/lib/mock/tenants";
import { LandlordDisputeRecord, LandlordDisputeCategory } from "@/lib/mock/landlord-disputes";

interface RaiseClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newDispute: LandlordDisputeRecord) => void;
}

export const RaiseClaimModal: React.FC<RaiseClaimModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [propertyId, setPropertyId] = useState<string>(propertiesData[0]?.id || "1");
  const [category, setCategory] = useState<LandlordDisputeCategory>("deposit");
  const [title, setTitle] = useState<string>("");
  const [claimAmount, setClaimAmount] = useState<string>("");
  const [statutoryScheme, setStatutoryScheme] = useState<string>("Tenancy Deposit Scheme (TDS) Dispute Service");
  const [grounds, setGrounds] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Find selected property and tenant
  const selectedProperty = propertiesData.find((p) => p.id === propertyId) || propertiesData[0];
  const linkedTenant = tenantsData.find((t) => t.propertyId === propertyId) || tenantsData[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please specify a dispute title or case subject.");
      return;
    }
    const numAmount = parseFloat(claimAmount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please specify a valid monetary claim amount in GBP.");
      return;
    }
    if (!grounds.trim()) {
      setError("Please provide a summary of the grounds and statutory basis.");
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refCode = `DSP-2024-${randomSuffix}`;

    const categoryLabels: Record<LandlordDisputeCategory, string> = {
      deposit: "Deposit Dilapidations",
      maintenance: "Maintenance & Repairs",
      breach: "Lease Covenant Breach",
      service_charge: "Service Charges & Arrears",
    };

    const newRecord: LandlordDisputeRecord = {
      id: `dsp-${Date.now()}`,
      reference: refCode,
      title: title.trim(),
      propertyId: selectedProperty.id,
      propertyCode: selectedProperty.code,
      propertyAddress: selectedProperty.address,
      unit: selectedProperty.title,
      tenantNames: linkedTenant ? linkedTenant.names : selectedProperty.occupant || "Current Tenant",
      tenantInitials: linkedTenant ? linkedTenant.initials : "TN",
      tenantEmail: `${(linkedTenant ? linkedTenant.names : "tenant").toLowerCase().replace(/[^a-z]/g, "")}@example.co.uk`,
      tenantPhone: "+44 7700 900223",
      managingAgent: "Eleanor Vance",
      agencyName: "Prime Living Management",
      agentEmail: "eleanor.vance@primeliving.co.uk",
      category,
      categoryLabel: categoryLabels[category],
      status: "action_required",
      statusLabel: "Draft Docket Created",
      openedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      deadlineDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      daysRemaining: 14,
      slaUrgent: false,
      statutoryScheme,
      depositHeld: typeof selectedProperty.valuation === "string" ? 2200 : 1800,
      monthlyRent: typeof selectedProperty.rent === "number" ? selectedProperty.rent : 1850,
      claimAmount: numAmount,
      currency: "£",
      remedyClaimed: grounds.trim(),
      landlordPosition: `Claim filed by Vance Holdings portfolio management under ${statutoryScheme}. Initial claim amount of £${numAmount.toFixed(2)}.`,
      evidenceDocket: [
        {
          id: `doc-${Date.now()}-1`,
          name: `Tenancy_Claim_Notice_${refCode}.pdf`,
          type: "pdf",
          size: "620 KB",
          uploadedBy: "Vance Holdings Executive",
          date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          description: "Formal statutory statement of claim and inventory breakdown."
        }
      ],
      auditTrail: [
        {
          id: `msg-${Date.now()}-1`,
          sender: "landlord",
          senderName: "Vance Holdings Executive",
          senderRole: "Landlord Asset Team",
          senderInitials: "VH",
          timestamp: "Just now",
          text: `Formal dispute docket initiated for ${selectedProperty.title}. Claim of £${numAmount.toFixed(2)} lodged under ${statutoryScheme}. Transmitting to managing agent for service.`
        }
      ]
    };

    onSubmit(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-xl border border-stone-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#132A20] text-white flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900">
              Raise Tenancy Claim / Statutory Dispute
            </h2>
            <p className="text-xs text-stone-500">
              Register a formal dispute docket with managing agents, TDS, or arbitration tribunals.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Property Selection */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Select Portfolio Property
            </label>
            <select
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20] cursor-pointer"
            >
              {propertiesData.map((prop) => (
                <option key={prop.id} value={prop.id}>
                  {prop.title} — {prop.address} ({prop.code})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-stone-500 mt-1">
              Active Tenant: <strong className="text-stone-700">{linkedTenant?.names || selectedProperty.occupant || "Current Tenant"}</strong>
            </p>
          </div>

          {/* Category & Claim Amount Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Dispute Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as LandlordDisputeCategory)}
                className="w-full h-10 px-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20] cursor-pointer"
              >
                <option value="deposit">Deposit Dilapidations</option>
                <option value="maintenance">Maintenance &amp; Tenant Damage</option>
                <option value="breach">Lease Covenant Breach</option>
                <option value="service_charge">Service Charges &amp; Arrears</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Claim Amount (£ GBP)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-mono">
                  £
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  required
                  placeholder="e.g. 450.00"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  className="w-full h-10 pl-8 pr-3 rounded-xl border border-stone-300 font-mono font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20]"
                />
              </div>
            </div>
          </div>

          {/* Subject / Title */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Case Subject / Claim Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Check-out Damage to Hardwood Flooring & Non-Reinstated Decoration"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20]"
            />
          </div>

          {/* Statutory Framework */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Statutory Scheme / Arbitration Forum
            </label>
            <select
              value={statutoryScheme}
              onChange={(e) => setStatutoryScheme(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20] cursor-pointer"
            >
              <option value="Tenancy Deposit Scheme (TDS) Dispute Service">
                Tenancy Deposit Scheme (TDS) Dispute Service
              </option>
              <option value="Deposit Protection Service (DPS) Adjudication">
                Deposit Protection Service (DPS) Adjudication
              </option>
              <option value="MyDeposits Independent Resolution">
                MyDeposits Independent Resolution
              </option>
              <option value="Section 8 Housing Act 1988 (Breach Notice)">
                Section 8 Housing Act 1988 (Breach Notice)
              </option>
              <option value="Direct Managing Agent Mediation (PRS Code)">
                Direct Managing Agent Mediation (PRS Code)
              </option>
            </select>
          </div>

          {/* Grounds Description */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Grounds for Claim &amp; Summary
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe the defect, breach, or disputed sum, referencing check-in/out inventory dates, contractor quotes, or AST clauses..."
              value={grounds}
              onChange={(e) => setGrounds(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:border-[#132A20]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-100">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-9 px-4 rounded-xl cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-9 px-5 bg-[#132A20] hover:bg-[#0b1b14] text-white font-semibold rounded-xl cursor-pointer"
            >
              Register Case Docket
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
