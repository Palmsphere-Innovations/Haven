"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Building2,
  Award,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sliders,
  Gavel,
  PlusCircle,
  Copy,
  Check,
  X,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AgentDetail {
  id: string;
  name: string;
  initials: string;
  agency: string;
  email: string;
  phone: string;
  location: string;
  assignedDate: string;
  authId: string;
  status: string;
}

interface AgentDetailHeaderProps {
  agent: AgentDetail;
}

export function AgentDetailHeader({ agent: initialAgent }: AgentDetailHeaderProps) {
  const [agent, setAgent] = useState(initialAgent);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isEditTierOpen, setIsEditTierOpen] = useState(false);
  const [isRevokeOpen, setIsRevokeOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState("Full Management (Level 3)");
  const [assignedUnit, setAssignedUnit] = useState("Flat 2, 8 Camden Mews (CM-02)");
  const [bannerNotice, setBannerNotice] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(agent.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleUpdateTier = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditTierOpen(false);
    setBannerNotice(`Updated authorization tier to ${selectedTier}. Statutory audit logged.`);
    setTimeout(() => setBannerNotice(null), 4000);
  };

  const handleConfirmRevoke = () => {
    setIsRevokeOpen(false);
    setAgent((prev) => ({ ...prev, status: "Revoked" }));
    setBannerNotice("Agency delegation revoked under Section 8 notice. Handover enqueued.");
    setTimeout(() => setBannerNotice(null), 5000);
  };

  const handleAssignProperty = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAssignOpen(false);
    setBannerNotice(`Successfully assigned ${assignedUnit} to ${agent.name}.`);
    setTimeout(() => setBannerNotice(null), 4000);
  };

  return (
    <div className="space-y-4">
      {/* Navigation Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link
            href="/agents"
            className="flex items-center gap-1 font-medium text-stone-600 hover:text-[#132A20] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Agents Directory</span>
          </Link>
          <span className="text-stone-300">/</span>
          <span className="font-semibold text-stone-900">{agent.name}</span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[#F9F9F8] border border-[#ECEEED] text-stone-600">
            ARLA Propertymark #44021
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#E8EFEA] text-brand font-semibold">
            AUTH-ID: {agent.authId}
          </span>
        </div>
      </div>

      {bannerNotice && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{bannerNotice}</span>
        </div>
      )}

      {/* Profile Summary Card */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#E8EFEA] text-brand flex items-center justify-center font-bold text-xl shrink-0">
              {agent.initials}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl lg:text-2xl font-bold text-stone-900 tracking-tight">
                  {agent.name}
                </h1>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 ${
                    agent.status === "Revoked"
                      ? "bg-rose-50 text-rose-800 border border-rose-200"
                      : "bg-[#E8EFEA] text-brand"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      agent.status === "Revoked" ? "bg-rose-600" : "bg-emerald-600"
                    }`}
                  />
                  {agent.status}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0EEE9] text-stone-700 text-[11px] font-semibold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-stone-500" />
                  Primary Appointed Surveyor
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Building2 className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-semibold text-stone-700">{agent.agency}</span>
                <span className="text-stone-300">•</span>
                <span>Central London Residential Lettings &amp; Management</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-end lg:self-start shrink-0">
            <Button
              variant="outline"
              onClick={() => setIsEditTierOpen(true)}
              className="h-9 px-3.5 border-[#ECEEED] rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
              Edit Tier
            </Button>
            {agent.status !== "Revoked" && (
              <Button
                variant="outline"
                onClick={() => setIsRevokeOpen(true)}
                className="h-9 px-3.5 border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <Gavel className="w-3.5 h-3.5 mr-1.5" />
                Revoke Access
              </Button>
            )}
            <Button
              onClick={() => setIsAssignOpen(true)}
              className="h-9 px-3.5 bg-[#132A20] hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
              + Assign Property
            </Button>
          </div>
        </div>

        {/* Contact Metadata Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F9F9F8] border border-[#ECEEED]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Email Contact
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-xs font-mono text-stone-900 truncate">
                {agent.email}
              </span>
              <button
                type="button"
                onClick={copyEmail}
                className="text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
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
              Direct Phone
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-xs font-mono text-stone-900 truncate">
                {agent.phone}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Operating Office
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-xs font-medium text-stone-900">{agent.location}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Assigned Date
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="text-xs font-mono font-semibold text-stone-900">
                {agent.assignedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Tier Modal */}
      {isEditTierOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleUpdateTier}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#ECEEED]">
              <h3 className="text-base font-bold text-stone-900">
                Modify Management Permission Tier
              </h3>
              <button
                type="button"
                onClick={() => setIsEditTierOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-stone-500">
              Adjust delegated legal authorities for {agent.name} across appointed units.
            </p>
            <div className="space-y-2">
              {[
                {
                  id: "Full Management (Level 3)",
                  title: "Tier 3: Full Management",
                  desc: "Complete operational control, contractor approvals, tenancy renewals.",
                },
                {
                  id: "Maintenance + Communication (Level 2)",
                  title: "Tier 2: Maintenance + Communication",
                  desc: "Direct tenant dispatch and repairs up to £750 limit.",
                },
                {
                  id: "Maintenance-only (Level 1)",
                  title: "Tier 1: Maintenance-only",
                  desc: "Inspect work orders and upload contractor invoices only.",
                },
              ].map((tier) => (
                <label
                  key={tier.id}
                  className={`p-3 rounded-xl border block cursor-pointer transition-colors ${
                    selectedTier === tier.id
                      ? "border-brand bg-[#E8EFEA]"
                      : "border-[#ECEEED] hover:border-stone-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="tier"
                      checked={selectedTier === tier.id}
                      onChange={() => setSelectedTier(tier.id)}
                      className="text-brand focus:ring-brand"
                    />
                    <span className="text-xs font-bold text-stone-900">{tier.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 ml-5">{tier.desc}</p>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#ECEEED]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditTierOpen(false)}
                className="h-8 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-8 text-xs bg-brand hover:bg-[#1E3A2E] text-white rounded-xl"
              >
                Save Tier Changes
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Revoke Confirmation Modal */}
      {isRevokeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <h3 className="text-base font-bold text-stone-900">
                Confirm Revocation of Agency Authority
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Are you sure you wish to revoke all management rights for{" "}
              <strong className="text-stone-900">{agent.name}</strong> ({agent.agency})?
              All portal logins and messaging channels will be severed immediately under
              Section 8 notice.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRevokeOpen(false)}
                className="h-8 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleConfirmRevoke}
                className="h-8 text-xs bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-semibold"
              >
                Execute Revocation
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Property Modal */}
      {isAssignOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form
            onSubmit={handleAssignProperty}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#ECEEED]">
              <h3 className="text-base font-bold text-stone-900">
                Assign Demised Property
              </h3>
              <button
                type="button"
                onClick={() => setIsAssignOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">
                Select Property Unit
              </label>
              <select
                value={assignedUnit}
                onChange={(e) => setAssignedUnit(e.target.value)}
                className="w-full h-9 rounded-xl border border-stone-300 px-3 text-xs"
              >
                <option>Flat 2, 8 Camden Mews (CM-02)</option>
                <option>Unit 3A, St. John&apos;s Court (SJC-03)</option>
                <option>Belgrave Penthouse, 9 Eaton Place (SW-09)</option>
                <option>12 Richmond Hill Mansions (RM-12)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[#ECEEED]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAssignOpen(false)}
                className="h-8 text-xs rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-8 text-xs bg-brand hover:bg-[#1E3A2E] text-white rounded-xl"
              >
                Assign Unit
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
