import React from "react"
import { FileText, ShieldCheck, ClipboardCheck, Flame, Zap, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TenancyDocument } from "@/lib/mock/tenants"

interface TenantDocumentsPanelProps {
  documents: TenancyDocument[]
  onViewDocument: (id: string) => void
  onViewAllDocuments: () => void
}

export const TenantDocumentsPanel: React.FC<TenantDocumentsPanelProps> = ({
  documents,
  onViewDocument,
  onViewAllDocuments,
}) => {
  const getIcon = (type: TenancyDocument["type"]) => {
    switch (type) {
      case "ast":
        return <FileText className="w-5 h-5 text-stone-500" />
      case "deposit":
        return <ShieldCheck className="w-5 h-5 text-emerald-800" />
      case "inventory":
        return <ClipboardCheck className="w-5 h-5 text-stone-500" />
      case "gas":
        return <Flame className="w-5 h-5 text-amber-700" />
      case "epc":
        return <Zap className="w-5 h-5 text-emerald-700" />
      default:
        return <FileText className="w-5 h-5 text-stone-500" />
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#132A20]">My Documents</h2>
          <span className="text-xs text-stone-500">Verified records &amp; vault</span>
        </div>
        <button
          type="button"
          onClick={onViewAllDocuments}
          className="text-xs font-semibold text-[#132A20] hover:underline"
        >
          View All (6)
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-2.5 rounded-lg hover:bg-stone-50 transition-colors flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="shrink-0">{getIcon(doc.type)}</div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#132A20] truncate">{doc.title}</p>
                <p className="text-[11px] text-stone-500 truncate">{doc.metadata}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onViewDocument(doc.id)}
              className="h-7 px-2.5 text-xs text-[#132A20] hover:bg-stone-100 font-semibold shrink-0"
            >
              View
            </Button>
          </div>
        ))}
      </div>

      <div className="p-2 bg-stone-50 rounded-lg text-center border border-stone-200/60">
        <span className="text-[11px] text-stone-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-stone-400" />
          Backed by Haven Statutory Digital Vault
        </span>
      </div>
    </div>
  )
}