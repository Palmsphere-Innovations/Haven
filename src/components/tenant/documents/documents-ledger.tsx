import React from "react"
import { Eye, Download, ShieldUser, Image as ImageIcon, Flame, Zap, ZapOff, BadgeCheck, ClipboardCheck, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DocumentCategory, DocumentRecord } from "./documents-types"

interface DocumentsLedgerProps {
  documents: DocumentRecord[]
  activeCategory: DocumentCategory
  onCategoryChange: (category: DocumentCategory) => void
  onViewDoc: (id: string) => void
  onDownloadDoc: (id: string) => void
}

export const DocumentsLedger: React.FC<DocumentsLedgerProps> = ({
  documents,
  activeCategory,
  onCategoryChange,
  onViewDoc,
  onDownloadDoc,
}) => {
  const getCategoryCount = (catId: DocumentCategory) => {
    if (catId === "all") return documents.length;
    return documents.filter((d) => d.category === catId).length;
  };

  const categories: { id: DocumentCategory; label: string }[] = [
    { id: "all", label: "All Documents" },
    { id: "statutory", label: "Statutory & Safety" },
    { id: "identity", label: "Identity & Referencing" },
    { id: "inventories", label: "Inventories & Reports" },
    { id: "notices", label: "Notices & Schedules" },
  ];

  const getCategoryIcon = (category: DocumentCategory) => {
    switch (category) {
      case "statutory":
        return <Flame className="w-4 h-4 text-amber-700" />;
      case "identity":
        return <BadgeCheck className="w-4 h-4 text-stone-600" />;
      case "inventories":
        return <ImageIcon className="w-4 h-4 text-emerald-800" />;
      case "notices":
        return <Calendar className="w-4 h-4 text-stone-600" />;
      default:
        return <ShieldUser className="w-4 h-4 text-[#132A20]" />;
    }
  };

  const getBadgeStyle = (statusType: DocumentRecord["statusType"]) => {
    switch (statusType) {
      case "verified":
        return "bg-emerald-100 text-emerald-900 border-emerald-200";
      case "countersigned":
        return "bg-blue-100 text-blue-900 border-blue-200";
      case "valid":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      default:
        return "bg-stone-100 text-stone-800 border-stone-300";
    }
  };

  return (
    <div className="flex flex-col gap-4 min-w-0">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => onCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-[#132A20] text-white shadow-sm"
                : "bg-white text-stone-600 hover:text-[#132A20] hover:bg-stone-100 border border-stone-200/80"
            }`}
          >
            {cat.label} ({getCategoryCount(cat.id)})
          </button>
        ))}
      </div>

      {/* Ledger Table Structure */}
      <div className="bg-white rounded-xl border border-stone-200/80 shadow-sm overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-12 px-6 py-3 bg-stone-50 text-stone-500 font-semibold text-xs uppercase tracking-wider items-center border-b border-stone-200/80">
          <div className="col-span-6 md:col-span-5">Document Title &amp; Details</div>
          <div className="hidden md:block md:col-span-3">Category &amp; Identifier</div>
          <div className="col-span-3 md:col-span-2">Status</div>
          <div className="col-span-3 md:col-span-2 text-right">Actions</div>
        </div>

        {/* Document Rows */}
        <div className="flex flex-col divide-y divide-stone-100">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="grid grid-cols-12 px-6 py-3.5 hover:bg-stone-50/80 transition-colors items-center text-xs"
            >
              <div className="col-span-6 md:col-span-5 flex items-center gap-3 pr-2 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0">
                  {getCategoryIcon(doc.category)}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-[#132A20] truncate">{doc.title}</span>
                  <span className="text-stone-500 text-[11px] truncate">{doc.subtitle}</span>
                </div>
              </div>

              <div className="hidden md:flex md:col-span-3 flex-col min-w-0 pr-2">
                <span className="font-medium text-[#132A20]">{doc.categoryLabel}</span>
                <span className="font-mono text-stone-500 text-[11px] truncate">{doc.identifier}</span>
              </div>

              <div className="col-span-3 md:col-span-2 flex items-center">
                <Badge
                  className={`text-[10px] font-semibold px-2 py-0.5 flex items-center gap-1 ${getBadgeStyle(
                    doc.statusType
                  )}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{doc.status}</span>
                </Badge>
              </div>

              <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onViewDoc(doc.id)}
                  className="h-8 w-8 p-0 hover:bg-stone-100 text-stone-600 hover:text-[#132A20]"
                  title="View Document"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => onDownloadDoc(doc.id)}
                  className="h-8 w-8 p-0 hover:bg-stone-100 text-stone-600 hover:text-[#132A20]"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 bg-stone-50 text-stone-500 text-xs flex items-center justify-between border-t border-stone-100">
          <span>Displaying <strong>{documents.length}</strong> statutory records for <strong>Flat 4B, 18 Kensington Gardens</strong></span>
          <span className="font-mono text-[11px]">All documents secured via 256-bit AES</span>
        </div>
      </div>
    </div>
  )
}