import React from "react"
import { ShieldCheck, Gavel, Download, Eye, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FeaturedASTCardProps {
  onDownloadPDF: () => void
  onViewAgreement: () => void
}

export const FeaturedASTCard: React.FC<FeaturedASTCardProps> = ({
  onDownloadPDF,
  onViewAgreement,
}) => {
  return (
    <section className="relative bg-white rounded-xl p-6 border border-stone-200/80 shadow-sm overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#132A20]" />
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-stone-100 text-[#132A20] border-stone-300 text-xs font-semibold px-2.5 py-1 uppercase tracking-wider">
            Primary Leasehold Record
          </Badge>
          <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-xs font-medium px-2.5 py-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
            <span>Signed &amp; Legally Binding</span>
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-800" />
          <span>HM Land Registry &amp; Vault ID: <strong className="text-[#132A20] font-semibold">UK-W2-2023-4B-AST</strong></span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-[#132A20] shrink-0">
            <Gavel className="w-7 h-7 text-emerald-800" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-[#132A20] tracking-tight">
              Assured Shorthold Tenancy Agreement (AST)
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-600">
              <span>Ref: <span className="font-mono text-[#132A20] font-semibold">#AST-2023-4B</span></span>
              <span>•</span>
              <span>Executed: <span className="text-[#132A20] font-medium">28 Nov 2023</span></span>
              <span>•</span>
              <span>Term: <span className="text-[#132A20] font-medium">24 Months</span> (01 Dec 2023 – 30 Nov 2025)</span>
              <span>•</span>
              <span>Rent: <span className="font-mono text-[#132A20] font-semibold">£2,450.00/pcm</span></span>
            </div>
            
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
              <span className="font-semibold text-[#132A20] uppercase text-[10px] tracking-wider">Signatories:</span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" /> Oliver Davies (Tenant)
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" /> Vance Holdings Ltd (Landlord)
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" /> Eleanor Vance (Managing Agent)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col lg:flex-row items-center gap-2 w-full lg:w-auto shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={onDownloadPDF}
            className="flex-1 lg:flex-none h-10 px-4 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100"
          >
            <Download className="w-4 h-4 mr-1.5 text-stone-500" />
            <span>Download PDF (3.2 MB)</span>
          </Button>
          <Button
            type="button"
            onClick={onViewAgreement}
            className="flex-1 lg:flex-none h-10 px-4 text-xs bg-[#132A20] hover:bg-[#1c3e30] text-white font-medium shadow-sm"
          >
            <Eye className="w-4 h-4 mr-1.5 text-emerald-300" />
            <span>View Agreement</span>
          </Button>
        </div>
      </div>

      <div className="mt-4 pt-3 bg-stone-50 px-4 py-2.5 rounded-xl border border-stone-200/60 flex items-center justify-between text-xs text-stone-600 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-800 shrink-0" />
          <span>Digitally signed with cryptographic audit trail • Tamper-sealed &amp; archived in Haven Vault</span>
        </div>
        <span className="font-mono text-stone-700 font-medium text-[11px]">
          DocuSign Envelope ID: 81E2F79A-90D1-4D3B
        </span>
      </div>
    </section>
  )
}