import React from "react"
import { ChevronRight, FileSignature, FolderArchive } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DocumentsHeaderProps {
  onRequestCopy: () => void
  onDownloadArchive: () => void
}

export const DocumentsHeader: React.FC<DocumentsHeaderProps> = ({
  onRequestCopy,
  onDownloadArchive,
}) => {
  return (
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <nav className="flex items-center gap-1.5 text-xs text-stone-500 uppercase tracking-wider font-medium">
          <span className="hover:text-[#132A20] transition-colors cursor-pointer">My Home</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="hover:text-[#132A20] transition-colors cursor-pointer">
            Flat 4B, 18 Kensington Gardens
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#132A20] font-semibold">Documents</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#132A20] tracking-tight">
          Documents &amp; Records
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
          Flat 4B, 18 Kensington Gardens, London W2 4QH • Certified tenancy agreements, statutory certificates, identity records, and mutual correspondence.
        </p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          type="button"
          variant="outline"
          onClick={onRequestCopy}
          className="h-9 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 shadow-sm"
        >
          <FileSignature className="w-4 h-4 mr-1.5 text-stone-500" />
          <span>Request Formal Copy</span>
        </Button>
        <Button
          type="button"
          onClick={onDownloadArchive}
          className="h-9 text-xs bg-[#132A20] hover:bg-[#1c3e30] text-white font-medium shadow-sm"
        >
          <FolderArchive className="w-4 h-4 mr-1.5 text-emerald-300" />
          <span>Download Archive (.ZIP)</span>
        </Button>
      </div>
    </section>
  )
}