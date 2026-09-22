import React from "react"
import { Phone, MessageSquare, Shield, FileText, Gavel, ExternalLink, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaymentsAgentAssistanceProps {
  onContactAgent: () => void
  onOpenDoc: (docName: string) => void
}

export const PaymentsAgentAssistance: React.FC<PaymentsAgentAssistanceProps> = ({
  onContactAgent,
  onOpenDoc,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      {/* Agent Assistance Banner */}
      <div className="lg:col-span-8 rounded-2xl bg-white p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-emerald-800" />
            <h2 className="text-sm font-semibold text-[#132A20]">
              Questions About Your Rent or Schedule?
            </h2>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Rent amounts, escalation provisions, and collection dates are strictly governed by your Assured Shorthold Tenancy Agreement. If you are experiencing unexpected financial hardship, anticipate a payroll date adjustment, or need to verify receipt of payment, please reach out to your assigned managing agent immediately.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-stone-50 border border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-[#132A20] font-bold text-xs shrink-0">
                EV
              </div>
              <div>
                <p className="font-semibold text-xs text-[#132A20]">Eleanor Vance, MARLA</p>
                <p className="text-[11px] text-stone-500">
                  Senior Property Manager • Prime Heritage Management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="tel:+442079460912"
                className="h-8 px-3 rounded-xl bg-white text-[#132A20] hover:bg-stone-100 text-xs font-semibold border border-stone-300 shadow-xs inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-800" />
                <span>+44 20 7946 0912</span>
              </a>
              <Button
                type="button"
                onClick={onContactAgent}
                className="h-8 px-3 rounded-xl bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                <span>Send Message</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2 text-[11px] text-stone-500">
          <Shield className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span>
            Tenancy protected under the Housing Act 1988 &amp; Tenant Fees Act 2019. Payments collected under the statutory UK Direct Debit Scheme Guarantee.
          </span>
        </div>
      </div>

      {/* Right Side Quick Links */}
      <div className="lg:col-span-4 rounded-2xl bg-white p-6 border border-stone-200/80 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#132A20] mb-3">
            Banking &amp; Tenancy Documents
          </h3>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onOpenDoc("BACS Direct Debit Guarantee PDF")}
              className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between text-xs text-[#132A20] text-left"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-800" />
                <span className="font-medium">Direct Debit Guarantee Terms</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              type="button"
              onClick={() => onOpenDoc("Tenancy Agreement AST-2023-4B")}
              className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between text-xs text-[#132A20] text-left"
            >
              <div className="flex items-center gap-2">
                <Gavel className="w-4 h-4 text-emerald-800" />
                <span className="font-medium">Signed AST Agreement (PDF)</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </button>

            <button
              type="button"
              onClick={() => onOpenDoc("DPS Prescribed Information Pack")}
              className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between text-xs text-[#132A20] text-left"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-800" />
                <span className="font-medium">DPS Prescribed Information</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-center gap-2 text-xs text-emerald-950">
          <Info className="w-4 h-4 text-emerald-800 shrink-0" />
          <p className="text-[11px] leading-tight">
            Haven does not charge payment processing, debit administration, or late assessment fees, in full compliance with the Tenant Fees Act 2019.
          </p>
        </div>
      </div>
    </div>
  )
}