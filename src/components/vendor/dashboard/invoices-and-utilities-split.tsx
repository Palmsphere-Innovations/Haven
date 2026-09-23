import React from "react"
import { Download, Eye, MailCheck, Headphones, ShieldCheck, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VendorInvoice } from "./vendor-types"

interface InvoicesAndUtilitiesSplitProps {
  invoices: VendorInvoice[]
  onRemindInvoice: (id: string) => void
}

export const InvoicesAndUtilitiesSplit: React.FC<InvoicesAndUtilitiesSplitProps> = ({
  invoices,
  onRemindInvoice,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Invoices Ledger (2 Cols) */}
      <div className="lg:col-span-2 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-[#132A20]">Recent Invoices &amp; Remittances</h2>
            <p className="text-xs text-stone-500">
              Direct settlement tracking through Haven Escrow &amp; Landlord Accounts.
            </p>
          </div>
          <a href="#" className="text-xs font-semibold text-[#132A20] hover:underline">
            All Invoices &rarr;
          </a>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200/80 text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
                <th className="py-3 px-4">Invoice &amp; PO</th>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Remittance Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-stone-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono font-bold text-[#132A20]">#{inv.invoiceRef}</div>
                    <div className="text-[10px] text-stone-400">PO-{inv.poRef}</div>
                  </td>
                  <td className="py-3 px-4 text-stone-800">{inv.property}</td>
                  <td className="py-3 px-4 font-mono text-stone-500">{inv.date}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#132A20]">{inv.amount}</td>
                  <td className="py-3 px-4">
                    {inv.status === "Paid" && (
                      <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-[10px] font-semibold">
                        Paid (BACS Direct)
                      </Badge>
                    )}
                    {inv.status === "Submitted" && (
                      <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-[10px] font-semibold">
                        Submitted (Under Review)
                      </Badge>
                    )}
                    {inv.status === "Overdue" && (
                      <Badge className="bg-rose-100 text-rose-900 border-rose-200 text-[10px] font-semibold">
                        Overdue (3 Days)
                      </Badge>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {inv.status === "Overdue" ? (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => onRemindInvoice(inv.id)}
                        className="h-7 text-xs font-semibold text-rose-700 hover:bg-rose-50"
                      >
                        <MailCheck className="w-3.5 h-3.5 mr-1" />
                        Remind
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="ghost"
                        className="h-7 text-xs text-[#132A20] hover:bg-stone-100"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" />
                        PDF
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Contractor Utilities (1 Col) */}
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-[#132A20]">Contractor Utilities</h2>
        <div className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-sm flex flex-col gap-4 text-xs">
          {/* Dispatch Hotline */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 text-[#132A20]">
              <Headphones className="w-4 h-4 text-emerald-800" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                24/7 Haven Dispatch Desk
              </div>
              <div className="text-sm font-bold font-mono text-[#132A20] mt-0.5">
                0800 458 9120
              </div>
              <p className="text-stone-500 mt-0.5 leading-relaxed">
                Priority line for emergency access lockouts and concierge master key sign-outs.
              </p>
            </div>
          </div>

          <div className="h-px bg-stone-100" />

          {/* Insurance & Compliance */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 text-[#132A20]">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                Public Liability Insurance
              </div>
              <div className="font-semibold text-[#132A20] mt-0.5">£5,000,000 Verified Cover</div>
              <div className="text-stone-500">Hiscox Underwriting • Expires 14 Aug 2027</div>
            </div>
          </div>

          <div className="h-px bg-stone-100" />

          {/* Compliance Notice */}
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200/60">
            <div className="flex items-center gap-1.5 font-semibold text-[#132A20]">
              <Info className="w-4 h-4 text-emerald-800" />
              <span>Statutory Compliance Notice</span>
            </div>
            <p className="text-stone-600 mt-1 leading-relaxed text-[11px]">
              Photographic job completion evidence and digital Gas Safe certificates must be uploaded to the portal docket prior to invoice settlement under Haven Tier 1 rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}