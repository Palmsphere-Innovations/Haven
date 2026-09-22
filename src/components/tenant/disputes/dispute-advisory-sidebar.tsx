import React from "react"
import { ShieldAlert, ExternalLink, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DisputeAdvisorySidebarProps {
  onReadRightsGuide: () => void
  onScheduleCall: () => void
}

export const DisputeAdvisorySidebar: React.FC<DisputeAdvisorySidebarProps> = ({
  onReadRightsGuide,
  onScheduleCall,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Rights & Next Steps Card */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-emerald-800" />
          <h3 className="text-sm font-semibold text-[#132A20]">Dispute Rights &amp; Next Steps</h3>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          You are protected under the <strong>Landlord and Tenant Act 1985 (Section 11)</strong> regarding heating and sanitary provisions in residential tenancies.
        </p>

        <div className="flex flex-col gap-2.5">
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#132A20]">10-Day Response Standard</span>
              <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-[10px] font-semibold">
                Compliant
              </Badge>
            </div>
            <span className="text-[11px] text-stone-500">
              Agents must answer within 10 statutory business days of registration.
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#132A20]">Escalation to DPS Adjudicator</span>
              <Badge variant="outline" className="bg-stone-100 text-stone-700 text-[10px]">
                Available Day 21
              </Badge>
            </div>
            <span className="text-[11px] text-stone-500">
              If no mutual consensus is reached by 25 Oct 2024, case auto-escalates to an ombudsman at no cost.
            </span>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#132A20]">Protection Against Retaliation</span>
              <ShieldAlert className="w-4 h-4 text-emerald-800" />
            </div>
            <span className="text-[11px] text-stone-500">
              Section 33 of Deregulation Act prevents retaliatory Section 21 evictions during active legitimate repairs disputes.
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onReadRightsGuide}
          className="w-full h-9 rounded-xl text-xs border-stone-300 bg-stone-50 hover:bg-stone-100 text-[#132A20] font-medium"
        >
          <span>Read Tenant Rights Guide</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1 text-stone-400" />
        </Button>
      </div>

      {/* Assigned Adjudicator Card */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col gap-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
          Assigned Case Adjudicator
        </span>

        <div className="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDarDuAzcaNqUUIPHz71eairIijKyFZeaOVuM26s17XgQ01LDhWc7xPWQzCoUWFw62TW5EQPJMkDOM2uaVhlouH6LKUpVcPjfjmS8NbSWs0EnuwYklD0r-SNPONp0cJ0ZEZpwADKIjUDbd8dWJkS9O2uCSY2_Ka8PUrQr6Loq_1NenU7Du2qpFuI3sQrcakCTK2dTCIfvAuD9JRyC63EgB4nMGd61aj0HumM6eKYP3FMmH3y3r2iMkA"
            alt="Eleanor Vance"
            className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-xs text-[#132A20] truncate">Eleanor Vance, MARLA</span>
            <span className="text-[11px] text-stone-500 truncate">Prime Heritage Management</span>
            <span className="text-[10px] text-emerald-800 font-semibold">Authorised Letting Negotiator</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 pt-1 text-xs text-stone-600 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <span>Direct Phone:</span>
            <a href="tel:+442079460129" className="text-[#132A20] font-mono font-semibold hover:underline">
              +44 20 7946 0129
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span>Official Email:</span>
            <a href="mailto:e.vance@haven.co.uk" className="text-[#132A20] font-semibold hover:underline">
              e.vance@haven.co.uk
            </a>
          </div>
          <div className="flex items-center justify-between">
            <span>Office Hours:</span>
            <span className="text-stone-800">Mon–Fri, 08:30 – 18:00</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={onScheduleCall}
          className="w-full h-9 rounded-xl bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2"
        >
          <CalendarPlus className="w-4 h-4 text-emerald-300" />
          <span>Schedule Mediation Call</span>
        </Button>
      </div>

      {/* Tenancy Property Dossier Card */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
          Associated Tenancy Dossier
        </span>
        <div className="font-semibold text-xs text-[#132A20]">Flat 4B, 18 Kensington Gardens</div>
        <div className="text-xs text-stone-500">
          Tenancy Reference: <span className="font-mono text-[#132A20] font-semibold">HAV-KG-4B-2024</span>
        </div>
        <div className="text-xs text-stone-500">
          Agreement Type: <span className="font-medium text-stone-800">Assured Shorthold (AST)</span>
        </div>
        <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
          <span>Deposit Scheme: <strong>DPS Custodial</strong></span>
          <span>End Date: <strong>30 Sep 2025</strong></span>
        </div>
      </div>
    </div>
  )
}