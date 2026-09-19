"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, ChevronUp, ChevronDown } from "lucide-react";

export const DevRoleSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Only render during local development
  if (process.env.NODE_ENV === "production") return null;

  const roles = [
    { label: "Marketing Home", href: "/", color: "bg-[#132A20]" },
    { label: "Landlord Portal", href: "/dashboard", color: "bg-emerald-800" },
    { label: "Agent Portal", href: "/agent/dashboard", color: "bg-blue-800" },
    { label: "Tenant Portal", href: "/tenant/dashboard", color: "bg-indigo-800" },
    { label: "Vendor Portal", href: "/vendor/dashboard", color: "bg-amber-800" },
    { label: "Admin Portal", href: "/admin/dashboard", color: "bg-rose-800" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      <div className="bg-neutral-900 text-white border border-neutral-700 rounded-xl shadow-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-neutral-800 transition-colors w-full"
        >
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Dev Role Switcher</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 ml-auto" /> : <ChevronUp className="w-3.5 h-3.5 ml-auto" />}
        </button>

        {isOpen && (
          <div className="p-2 border-t border-neutral-800 flex flex-col gap-1 min-w-45">
            {roles.map((r) => (
              <Link
                key={r.label}
                href={r.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs hover:bg-neutral-800 transition-colors"
              >
                <span className={`w-2 h-2 rounded-full ${r.color}`} />
                {r.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};