"use client";

import React, { useState } from "react";
import { X, Mail, Send, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InviteTenantModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const inviteLink = "https://haven.estate/invite?email=oliver.davies@kensington-tenants.co.uk";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-3xl border border-[#ECEEED] bg-white p-7 shadow-2xl space-y-6">
        <div className="flex items-start justify-between border-b border-[#ECEEED] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] flex items-center justify-center text-brand">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">Invite Tenant to Haven</h2>
              <p className="text-xs text-stone-500">Dispatch an exclusive portal onboarding link</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onClose(); }} className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-stone-700">Tenant Legal Full Name</span>
            <Input required placeholder="e.g. Oliver Davies" className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl" />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-stone-700">Tenant Email Address</span>
            <Input type="email" required placeholder="oliver.davies@kensington-tenants.co.uk" className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl" />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-stone-700">Link Property Unit</span>
            <select className="w-full h-10 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-800">
              <option>Flat 4B, 18 Kensington Gdns (KG-4B)</option>
              <option>8 Camden Mews (CM-08)</option>
              <option>27 Blenheim Crescent (BC-27)</option>
            </select>
          </label>

          <div className="pt-2 space-y-1.5">
            <span className="text-xs font-semibold text-stone-700 block">Direct Magic Invite Link</span>
            <div className="flex items-center gap-2">
              <Input readOnly value={inviteLink} className="bg-[#F9F9F8] text-[11px] font-mono h-9 text-stone-600 rounded-xl" />
              <Button type="button" onClick={handleCopy} variant="outline" className="h-9 px-3 text-xs shrink-0 rounded-xl border-[#ECEEED]">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ECEEED]">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl h-10 text-xs">Cancel</Button>
            <Button type="submit" className="rounded-xl bg-brand hover:bg-[#1E3A2E] text-white text-xs font-semibold h-10 px-5">
              <Send className="w-3.5 h-3.5 mr-2" />
              Send Invitation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}