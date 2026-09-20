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
  // tierName: string;
}

interface AgentDetailHeaderProps {
  agent: AgentDetail;
}

export function AgentDetailHeader({ agent }: AgentDetailHeaderProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(agent.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
          <span>Agents</span>
          <span className="text-stone-300">/</span>
          <span className="font-semibold text-stone-900">{agent.name}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="px-2.5 py-1 rounded-md bg-[#F9F9F8] border border-[#ECEEED] text-stone-600 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            CMP Protection Valid
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#E8EFEA] text-[#132A20] font-semibold">
            AUTH-ID: {agent.authId}
          </span>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-6 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-[#E8EFEA] text-[#132A20] flex items-center justify-center font-bold text-xl">
                {agent.initials}
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#132A20] text-white flex items-center justify-center shadow-xs"
                title="Propertymark Verified"
              > 
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl lg:text-2xl font-bold text-stone-900 tracking-tight">
                  {agent.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0EEE9] text-stone-700 text-[11px] font-semibold">
                  Managing Letting Agent
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#E8EFEA] text-[#132A20] text-[11px] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Active Management Authority
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-500 flex-wrap">
                <Building2 className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-medium text-stone-800">{agent.agency}</span>
                <span className="text-stone-300">•</span>
                <Award className="w-3.5 h-3.5 text-stone-400" />
                <span>ARLA Propertymark MNAEA (No. 40992)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end lg:self-start shrink-0">
            <Button
              variant="outline"
              className="h-9 px-3.5 border-[#ECEEED] rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50"
            >
              <Sliders className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
              Edit Tier
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                alert(
                  "Two-step verification required: Confirm revocation of agency rights under Section 8."
                )
              }
              className="h-9 px-3.5 border-rose-200 text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-semibold"
            >
              <Gavel className="w-3.5 h-3.5 mr-1.5" />
              Revoke Access
            </Button>
            <Button className="h-9 px-3.5 bg-[#132A20] hover:bg-[#1E3A2E] text-white rounded-xl text-xs font-semibold shadow-xs">
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
    </div>
  );
}