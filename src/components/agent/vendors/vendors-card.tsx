import React from "react"
import {
  Flame,
  Zap,
  Droplets,
  Home,
  Key,
  Hammer,
  BadgeCheck,
  Star,
  History,
  ShieldCheck,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Vendor } from "@/lib/mock/vendor-types"

interface VendorsCardProps {
  vendor: Vendor
  onAssignJob: (vendorName: string) => void
  onViewProfile: (vendorId: string) => void
}

export const VendorsCard: React.FC<VendorsCardProps> = ({
  vendor,
  onAssignJob,
  onViewProfile,
}) => {
  const renderIcon = () => {
    switch (vendor.iconType) {
      case "fire":
        return <Flame className="w-5 h-5 text-amber-600" />
      case "bolt":
        return <Zap className="w-5 h-5 text-amber-500" />
      case "water":
        return <Droplets className="w-5 h-5 text-blue-600" />
      case "roofing":
        return <Home className="w-5 h-5 text-stone-700" />
      case "key":
        return <Key className="w-5 h-5 text-emerald-800" />
      case "carpenter":
        return <Hammer className="w-5 h-5 text-[#132A20]" />
      default:
        return <BadgeCheck className="w-5 h-5 text-[#132A20]" />
    }
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-stone-200/80 hover:shadow-md transition-shadow flex flex-col justify-between gap-5">
      <div className="flex flex-col gap-4">
        {/* Card Header & Badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200">
              {renderIcon()}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-[#132A20] truncate max-w-[190px]">
                  {vendor.name}
                </h2>
                <BadgeCheck className="w-4 h-4 text-emerald-800 shrink-0" />
              </div>
              <span className="text-[11px] font-mono text-stone-500">
                {vendor.accreditation}
              </span>
            </div>
          </div>
          <Badge className="bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-100 text-[11px] font-semibold">
            {vendor.tradeLabel}
          </Badge>
        </div>

        {/* Contact Profile Box */}
        <div className="bg-stone-50/80 rounded-lg p-3.5 flex flex-col gap-1.5 border border-stone-200/60 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-stone-500">Lead Contact</span>
            <span className="font-semibold text-[#132A20]">{vendor.leadContact}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-500">Dispatch Line</span>
            <span className="font-mono text-[#132A20] font-semibold">{vendor.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-500">Operational Base</span>
            <span className="text-stone-700">{vendor.baseLocation}</span>
          </div>
        </div>

        {/* Stats & Mandate Context */}
        <div className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-mono text-[#132A20] font-bold">{vendor.rating.toFixed(1)}</span>
              <span className="text-stone-400 text-[11px]">/ 5.0 ({vendor.reviewCount} reviews)</span>
            </div>
            <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-900 border-emerald-200 font-medium">
              {vendor.badgeText}
            </Badge>
          </div>

          <div className="flex items-center gap-1.5 text-stone-600 pt-1">
            <History className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
            <span>{vendor.completedJobsCount} jobs completed across Vance Holdings</span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
            <span>{vendor.insuranceLimit} • Mandate Verified</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={() => onViewProfile(vendor.id)}
          className="flex-1 text-xs border-stone-300 text-stone-700 hover:bg-stone-100 h-8"
        >
          View Profile
        </Button>
        <Button
          type="button"
          onClick={() => onAssignJob(vendor.name)}
          className="flex-1 text-xs bg-[#132A20] hover:bg-[#1c3e30] text-white h-8 shadow-sm flex items-center justify-center gap-1"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Assign Job</span>
        </Button>
      </div>
    </div>
  )
}