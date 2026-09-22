import React, { useState } from "react"
import { CloudUpload, Upload, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DocumentUploadCardProps {
  onUploadSubmit: (category: string, file: File | null) => void
}

export const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({
  onUploadSubmit,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("insurance")
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CloudUpload className="w-5 h-5 text-emerald-800" />
          <h3 className="text-sm font-semibold text-[#132A20]">Upload Document</h3>
        </div>
        <Badge variant="outline" className="bg-stone-100 text-stone-700 text-[10px]">
          Tenant Vault
        </Badge>
      </div>

      <p className="text-xs text-stone-600">
        Submit tenant liability insurance policies, pet agreements, or updated identification for property verification.
      </p>

      {/* Category Selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-semibold text-[#132A20] uppercase tracking-wider">
          Document Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-10 px-3 rounded-xl bg-stone-50 text-xs text-[#132A20] font-medium border border-stone-300 focus:outline-none focus:border-[#132A20] cursor-pointer"
        >
          <option value="insurance">Tenant Liability Insurance</option>
          <option value="id">Updated Photographic ID / Passport</option>
          <option value="pet">Pet Agreement &amp; Vaccination Certificate</option>
          <option value="utility">Handover Utility Meter Photo</option>
          <option value="other">Other Tenancy Correspondence</option>
        </select>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`rounded-xl p-6 border-2 border-dashed text-center flex flex-col items-center justify-center gap-2 transition-all cursor-pointer relative ${
          dragActive
            ? "border-[#132A20] bg-emerald-50/40"
            : "border-stone-200 bg-stone-50 hover:bg-stone-100/80"
        }`}
      >
        <input
          type="file"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600">
          <Upload className="w-5 h-5 text-[#132A20]" />
        </div>
        <div>
          <p className="text-xs font-semibold text-[#132A20]">
            {uploadedFile ? uploadedFile.name : "Drag & drop your file here"}
          </p>
          <p className="text-[11px] text-stone-500 mt-0.5">
            or <span className="text-emerald-800 font-semibold underline">browse files</span> from your device
          </p>
        </div>
        <p className="text-[10px] text-stone-400">PDF, JPG, PNG or DOCX up to 25MB</p>
      </div>

      <Button
        type="button"
        onClick={() => onUploadSubmit(selectedCategory, uploadedFile)}
        className="w-full h-10 rounded-xl bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4 text-emerald-300" />
        <span>Submit for Verification</span>
      </Button>
    </div>
  )
}