import React from "react"
import { Phone, Mail, Clock, CalendarPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AgentProfileCardProps {
  onBookCall: () => void
}

export const AgentProfileCard: React.FC<AgentProfileCardProps> = ({
  onBookCall,
}) => {
  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Your Designated Manager
        </span>
        <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-[10px] font-semibold">
          Assigned Lead
        </Badge>
      </div>

      <div className="flex items-start gap-4">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMnAbYG5ooaolXpZWg7ACvv1EFI7nAM31Dkdxj9T1N_FfC5vK917YVRmjFSRWZODq4H1iN-W_Wg4Px4Z5a0FNVQ1-Obntt_SGnLUxoUB09C0P-2n51nX56QgNrcmwN493GjuNGfsO6VTVBHdAagYi7FGOqxeqFI51hbtEBWGNqF2u5kTPnZ-xMPSmavYiffDhiWbCW5uqUFjM91vAMoTgytP_0dHiyRtGZkKYLMKngKgrdghGVGFP6"
          alt="Eleanor Vance"
          className="w-16 h-16 rounded-2xl object-cover shadow-xs border border-stone-200"
        />
        <div>
          <h3 className="font-semibold text-base text-[#132A20]">Eleanor Vance</h3>
          <p className="text-xs text-stone-500">Senior Portfolio Associate</p>
          <p className="text-xs font-semibold text-[#132A20] mt-0.5">
            Prime Heritage Management
          </p>
        </div>
      </div>

      {/* Contact Credentials */}
      <div className="flex flex-col gap-2 p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
        <div className="flex items-center justify-between py-0.5">
          <span className="text-stone-500 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-stone-400" />
            Direct Line
          </span>
          <a
            href="tel:+442079460912"
            className="font-mono font-medium text-[#132A20] hover:underline"
          >
            +44 20 7946 0912
          </a>
        </div>
        <div className="flex items-center justify-between py-0.5">
          <span className="text-stone-500 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-stone-400" />
            Email
          </span>
          <a
            href="mailto:eleanor.vance@primeheritage.co.uk"
            className="text-[#132A20] font-medium hover:underline truncate max-w-[170px]"
            title="eleanor.vance@primeheritage.co.uk"
          >
            eleanor.vance@primeheritage.co.uk
          </a>
        </div>
        <div className="flex items-center justify-between py-0.5">
          <span className="text-stone-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            Availability
          </span>
          <span className="font-mono text-[#132A20]">09:00 – 18:00 BST</span>
        </div>
      </div>

      {/* Tenancy Strip */}
      <div className="pt-2 flex flex-col gap-1 text-xs border-t border-stone-100 text-stone-500">
        <div className="flex justify-between">
          <span>Landlord:</span>
          <span className="font-medium text-[#132A20]">Vance Holdings Ltd (SPV)</span>
        </div>
        <div className="flex justify-between">
          <span>Tenancy Reference:</span>
          <span className="font-mono text-[#132A20]">UK-LON-KG-04B</span>
        </div>
        <div className="flex justify-between">
          <span>Deposit Protection:</span>
          <span className="text-[#132A20] font-medium">DPS Custodial #89201</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onBookCall}
        className="w-full h-9 rounded-xl text-xs border-stone-300 bg-stone-50 hover:bg-stone-100 text-[#132A20] font-medium"
      >
        <CalendarPlus className="w-4 h-4 mr-1.5 text-stone-600" />
        <span>Book 15-min Tenant Review Call</span>
      </Button>
    </div>
  )
}