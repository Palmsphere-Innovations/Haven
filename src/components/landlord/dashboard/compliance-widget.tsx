import React from "react";
import Link from "next/link";
import { Gavel, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ComplianceWidget: React.FC = () => {
  return (
    <div className="bg-[#132A20] text-white rounded-2xl p-6 sm:p-7 shadow-md flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Gavel className="w-5 h-5 text-white" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Statutory Compliance
            </h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[#A3B8AD] text-[10px] font-semibold uppercase tracking-wider">
            UK Regs
          </span>
        </div>
        <p className="text-xs text-[#A3B8AD] mt-3 leading-relaxed">
          Section 11 Landlord &amp; Tenant Act 1985 and Deregulation Act 2015 index.
        </p>

        <div className="flex flex-col gap-3.5 mt-5">
          {/* Gas Safety Alert */}
          <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Gas Safety (CP12)</span>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-200 border border-rose-400/30 text-[10px] font-semibold">
                Expires in 5 days
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#A3B8AD]">
              <span>Flat 2, 8 Camden Mews</span>
              <span className="font-mono text-white font-medium">18 Oct 2025</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between mt-1">
              <span className="text-[10px] text-[#A3B8AD]">Reg 36 Compliance</span>
              <Button size="sm" className="bg-white hover:bg-gray-100 text-[#132A20] text-xs font-semibold h-7">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Book Gas Safe
              </Button>
            </div>
          </div>

          {/* EPC Item */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                Energy Performance (EPC)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px]">
                Rating E • Expiring
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#A3B8AD]">
              <span>14 Elmfield Way, W9</span>
              <span className="font-mono text-white font-medium">02 Nov 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 mt-4 border-t border-white/10">
        <Link
          href="/documents"
          className="text-xs font-medium text-white/90 hover:text-white flex items-center justify-between group"
        >
          <span>Open Compliance Vault (42 Properties)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};