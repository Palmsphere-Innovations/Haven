"use client";

import React from "react"
import {
  Repeat,
  Calendar,
  CheckCircle2,
  CalendarDays,
  Landmark,
  ShieldCheck,
  ArrowRightLeft,
  FolderBookmarkIcon,
  ArrowRight,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PaymentsHeroGridProps {
  onOpenManageModal: () => void
  onAdjustDate: () => void
  onUpdateMandate: () => void
  onViewDepositCert: () => void
}

export const PaymentsHeroGrid: React.FC<PaymentsHeroGridProps> = ({
  onOpenManageModal,
  onAdjustDate,
  onUpdateMandate,
  onViewDepositCert,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      {/* Hero Anchor Forest Green Card */}
      <div className="lg:col-span-6 rounded-2xl bg-[#132A20] text-white p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[300px]">
        {/* Subtle Archival Seal Pattern */}
        <div className="absolute -right-8 -bottom-10 pointer-events-none opacity-[0.04]">
          <svg fill="currentColor" height="240" viewBox="0 0 100 100" width="240">
            <circle cx="50" cy="50" fill="none" r="46" stroke="white" strokeWidth="2" />
            <circle cx="50" cy="50" fill="none" r="38" stroke="white" strokeDasharray="2 2" strokeWidth="1" />
            <path d="M50 15 L50 85 M15 50 L85 50" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Next Payment Due
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-emerald-300 backdrop-blur-sm text-xs font-medium">
              <Repeat className="w-3.5 h-3.5" />
              <span>18 Days Remaining</span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl sm:text-[44px] font-bold font-mono text-white tracking-tight leading-tight">
              £2,450.00
            </span>
            <span className="text-xs text-stone-300 font-medium">/ calendar month</span>
          </div>

          <div className="mt-2 inline-flex items-center gap-2 text-emerald-300 text-xs">
            <Calendar className="w-4 h-4" />
            <span>Due on <strong>Friday, 01 November 2024</strong></span>
          </div>

          <p className="text-xs text-stone-300 mt-4 leading-relaxed max-w-lg">
            Automated collection scheduled via Bacs Direct Debit mandate{" "}
            <code className="font-mono text-emerald-300 bg-white/10 px-1 py-0.5 rounded">
              #HA-9941
            </code>
            . Funds will be debited from Barclays Bank account on 01 Nov 2024.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6 pt-4 border-t border-white/10">
          <Button
            type="button"
            onClick={onOpenManageModal}
            className="bg-white text-[#132A20] hover:bg-stone-100 text-xs font-semibold h-9 px-4 rounded-xl shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-800" />
            <span>Pay Early / Manage Autopay</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onAdjustDate}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-medium h-9 px-4 rounded-xl"
          >
            <CalendarDays className="w-4 h-4 mr-1.5" />
            <span>Adjust Payment Date</span>
          </Button>
        </div>
      </div>

      {/* Companion Card 1: Active Direct Debit Mandate */}
      <div className="lg:col-span-3 rounded-2xl bg-white text-stone-900 p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between min-h-[300px]">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#132A20]">Payment Method</h2>
            <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-[10px] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
              Verified
            </Badge>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 mt-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-[#132A20] shrink-0">
              <Landmark className="w-5 h-5 text-emerald-800" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-xs text-[#132A20] truncate">Barclays Bank UK</p>
              <p className="font-mono text-[11px] text-stone-500 truncate">Direct Debit •••• 4321</p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-1.5 text-xs text-stone-600">
            <div className="flex justify-between items-center">
              <span>Payer</span>
              <span className="font-semibold text-[#132A20]">Oliver Davies</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Sort Code</span>
              <span className="font-mono text-[#132A20]">20-45-77</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Mandate Reference</span>
              <span className="font-mono text-[#132A20]">BACS-DD-08922</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onUpdateMandate}
            className="w-full h-8 text-xs border-stone-300 bg-stone-50 hover:bg-stone-100 text-[#132A20] font-medium"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
            <span>Update Account Details</span>
          </Button>
          <div className="flex items-center justify-center gap-1 text-[11px] text-stone-500 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
            <span>Direct Debit Guarantee Protected</span>
          </div>
        </div>
      </div>

      {/* Companion Card 2: Tenancy & Deposit Summary */}
      <div className="lg:col-span-3 rounded-2xl bg-white text-stone-900 p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between min-h-[300px]">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#132A20]">Tenancy &amp; Deposit</h2>
            <Badge variant="outline" className="bg-stone-100 text-stone-700 text-[10px] font-mono">
              AST #AST-2023-4B
            </Badge>
          </div>

          <div className="mt-3 flex flex-col gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
              <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
                Tenancy Duration
              </span>
              <p className="font-semibold text-xs text-[#132A20] mt-0.5">24-Month Fixed Term</p>
              <p className="text-[11px] text-stone-500">01 Dec 2023 – 30 Nov 2025</p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                  Custodial Deposit
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-medium">
                  <Shield className="w-3.5 h-3.5" /> DPS Custodial
                </span>
              </div>
              <p className="font-mono font-bold text-sm text-[#132A20] mt-1">£2,826.92</p>
              <p className="text-[10px] text-stone-500">
                Deposit ID: <code className="font-mono">DPS-481928</code>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100">
          <button
            type="button"
            onClick={onViewDepositCert}
            className="inline-flex items-center justify-between w-full text-xs font-semibold text-[#132A20] hover:text-[#1c3e30] transition-colors py-1"
          >
            <span className="flex items-center gap-1.5">
              <FolderBookmarkIcon className="w-4 h-4 text-emerald-800" />
              <span>View Deposit Certificate</span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}