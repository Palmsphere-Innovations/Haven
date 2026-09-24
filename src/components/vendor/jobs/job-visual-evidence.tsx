import React from "react"
import { JobDiagnosticPhoto } from "./job-types"

interface JobVisualEvidenceProps {
  photos: JobDiagnosticPhoto[]
}

export const JobVisualEvidence: React.FC<JobVisualEvidenceProps> = ({ photos }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px]">
          Diagnostic Visual Evidence &amp; Casing Photos
        </span>
        <span className="text-stone-400">{photos.length} images attached</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 aspect-video shadow-xs"
          >
            <img
              src={photo.imageUrl}
              alt={photo.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#132A20]/90 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <div className="font-semibold text-[11px] leading-tight">{photo.title}</div>
              <div className="font-mono text-[9px] opacity-80">{photo.reference}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}