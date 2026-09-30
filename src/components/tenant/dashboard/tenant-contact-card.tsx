import React from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TenantContactCardProps {
  onSendMessage: () => void
}

export const TenantContactCard: React.FC<TenantContactCardProps> = ({
  onSendMessage,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-sm flex flex-col gap-4">
      <h2 className="text-base font-semibold text-[#132A20]">Need Help or Questions?</h2>
      
      <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/60 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#132A20] text-white flex items-center justify-center font-bold text-xs">
            EV
          </div>
          <div>
            <p className="text-xs font-semibold text-[#132A20]">Eleanor Vance</p>
            <p className="text-[11px] text-stone-500">Managing Agent • Prime Heritage</p>
          </div>
        </div>
        <p className="text-[11px] text-stone-600 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          Usually responds within 2 hours (Mon–Fri 9am–6pm)
        </p>
        <div className="text-[11px] text-stone-500 border-t border-stone-200/60 pt-2">
          Landlord: <span className="text-[#132A20] font-medium">Alistair Vance (Vance Holdings Ltd)</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="button"
          onClick={onSendMessage}
          className="w-full bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold h-9 rounded-xl flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 text-emerald-300" />
          <span>Send Message</span>
        </Button>
        <div className="flex items-center justify-between px-1 text-xs text-stone-500">
          <span>Direct Phone</span>
          <a
            href="tel:02079460912"
            className="font-mono text-[#132A20] font-semibold hover:underline"
          >
            020 7946 0912
          </a>
        </div>
      </div>
    </div>
  )
}