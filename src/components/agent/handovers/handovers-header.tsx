"use client";
import React from "react"
import { ShieldCheck, Download, ArrowLeftRight, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface HandoversHeaderProps {
  onOpenInitiateDrawer: () => void
  onDownloadDossier: () => void
}

export const HandoversHeader: React.FC<HandoversHeaderProps> = ({
  onOpenInitiateDrawer,
  onDownloadDossier,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Top Context Bar */}
      <div className="bg-white rounded-lg p-3 px-4 border border-stone-200/80 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-[#132A20]" />
          <span className="uppercase font-semibold text-[#132A20]">Delegated Workspace</span>
          <span className="text-stone-300">•</span>
          <span className="font-semibold text-[#132A20] uppercase">Prime Heritage Management Ltd</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-500 uppercase">Handovers &amp; Portfolio Transitions</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[#132A20]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Eleanor Vance <span className="text-stone-500">(MARLA Tier 1 #MAR-88219)</span>
          </span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-600">Mandate Scope: Vance Holdings Ltd, Pembroke Estate Trust</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex flex-col max-w-3xl">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
              Handovers
            </h1>
            <Badge variant="outline" className="font-mono text-xs bg-stone-100 text-stone-700 border-stone-300">
              #AGT-HND-4091
            </Badge>
            <Badge className="bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-100 text-xs flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#132A20]" />
              <span>Statutory Scope Locked</span>
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Manage incoming portfolio assignments and initiate outgoing delegation transfers.{" "}
            <span className="text-[#132A20] font-semibold">Notice:</span> In accordance with statutory UK tenancy governance, permission tiers are immutable and established exclusively by the principal landlord.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onDownloadDossier}
            className="border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 text-xs font-semibold shadow-sm"
          >
            <Download className="w-3.5 h-3.5 mr-1.5 text-stone-600" />
            <span>Audit Dossier (PDF)</span>
          </Button>

          <Button
            type="button"
            onClick={onOpenInitiateDrawer}
            className="bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Initiate Handover</span>
          </Button>
        </div>
      </div>
    </div>
  )
}