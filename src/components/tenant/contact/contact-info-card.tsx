"use client";

import React, { useState } from "react";
import { Phone, Mail, Clock, Copy, Check } from "lucide-react";

export function ContactInfoCard({
  name,
  role,
  company,
  phone,
  email,
  availability,
}: {
  name: string;
  role: string;
  company?: string;
  phone: string;
  email: string;
  availability: string;
}) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="p-5 rounded-2xl bg-white border border-[#ECEEED] shadow-xs space-y-4">
      <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide">
        Your Property Manager
      </span>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#132A20] text-white flex items-center justify-center font-bold text-sm shrink-0">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="font-bold text-stone-900 text-sm">{name}</p>
          <p className="text-xs text-stone-500">{role}</p>
          {company && <p className="text-xs text-[#132A20] font-semibold">{company}</p>}
        </div>
      </div>

      <div className="space-y-2.5 pt-3 border-t border-[#ECEEED] text-xs">
        {/* Phone */}
        <div className="flex items-center justify-between text-stone-600">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex items-center gap-1.5 hover:text-[#132A20] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-800" />
            <span className="font-mono">{phone}</span>
          </a>
          <button
            type="button"
            onClick={() => copyToClipboard(phone, "phone")}
            title="Copy phone number"
            className="text-stone-400 hover:text-stone-900 transition-colors p-1 cursor-pointer"
          >
            {copiedField === "phone" ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between text-stone-600">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 hover:text-[#132A20] transition-colors truncate max-w-[200px]"
          >
            <Mail className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
            <span className="truncate">{email}</span>
          </a>
          <button
            type="button"
            onClick={() => copyToClipboard(email, "email")}
            title="Copy email address"
            className="text-stone-400 hover:text-stone-900 transition-colors p-1 cursor-pointer shrink-0"
          >
            {copiedField === "email" ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between text-stone-600 pt-1 border-t border-stone-100">
          <span className="flex items-center gap-1.5 text-stone-500">
            <Clock className="w-3.5 h-3.5" /> Core Hours
          </span>
          <span className="font-medium text-stone-800">{availability}</span>
        </div>
      </div>
    </div>
  );
}
