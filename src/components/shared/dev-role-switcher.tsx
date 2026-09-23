"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  ChevronUp,
  ChevronDown,
  Check,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RoleOption {
  label: string;
  shortLabel: string;
  href: string;
  color: string;
  badgeBg: string;
  activeMatch: (pathname: string) => boolean;
}

const roles: RoleOption[] = [
  {
    label: "Marketing Home",
    shortLabel: "Marketing",
    href: "/",
    color: "bg-stone-500",
    badgeBg: "bg-stone-100 text-stone-800 border-stone-300",
    activeMatch: (path) => path === "/",
  },
  {
    label: "Landlord Portal",
    shortLabel: "Landlord",
    href: "/dashboard",
    color: "bg-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-300",
    activeMatch: (path) =>
      path.startsWith("/dashboard") ||
      path.startsWith("/properties") ||
      path.startsWith("/tenants") ||
      path.startsWith("/contracts") ||
      path.startsWith("/agents") ||
      path.startsWith("/documents") ||
      path.startsWith("/maintenance") ||
      path.startsWith("/financials") ||
      path.startsWith("/communication"),
  },
  {
    label: "Agent Portal",
    shortLabel: "Agent",
    href: "/agent/dashboard",
    color: "bg-blue-600",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-300",
    activeMatch: (path) => path.startsWith("/agent"),
  },
  {
    label: "Tenant Portal",
    shortLabel: "Tenant",
    href: "/tenant/dashboard",
    color: "bg-indigo-600",
    badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-300",
    activeMatch: (path) => path.startsWith("/tenant"),
  },
  {
    label: "Vendor Portal",
    shortLabel: "Vendor",
    href: "/vendor/dashboard",
    color: "bg-amber-600",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-300",
    activeMatch: (path) => path.startsWith("/vendor"),
  },
  {
    label: "Admin Portal",
    shortLabel: "Admin",
    href: "/admin/dashboard",
    color: "bg-rose-600",
    badgeBg: "bg-rose-50 text-rose-800 border-rose-300",
    activeMatch: (path) => path.startsWith("/admin"),
  },
];

export const DevRoleSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || "";
  const containerRef = useRef<HTMLDivElement>(null);

  // Identify current role from path
  const currentRole = roles.find((r) => r.activeMatch(pathname)) || roles[0];

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <aside
      aria-label="Development Role Switcher"
      ref={containerRef}
      className="fixed bottom-4 right-4 z-[9999] font-sans text-xs select-none"
    >
      <div className="bg-neutral-900/95 backdrop-blur-md text-white border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden min-w-[210px] transition-all">
        {/* Header / Toggle button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-semibold hover:bg-neutral-800/90 transition-colors w-full cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] text-neutral-400 uppercase font-mono tracking-wider">
                Dev Role
              </span>
              <span className="font-bold text-white truncate flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${currentRole.color}`} />
                {currentRole.shortLabel}
              </span>
            </div>
          </div>

          <div className="ml-auto pl-2 text-neutral-400">
            {isOpen ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </div>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-neutral-800 p-2 flex flex-col gap-1 overflow-hidden"
            >
              <div className="px-2 py-1 text-[10px] uppercase font-mono text-neutral-400 flex items-center justify-between">
                <span>Switch Portal View</span>
                <span className="text-[9px] text-neutral-500">6 Roles</span>
              </div>

              {roles.map((r) => {
                const isActive = r.activeMatch(pathname);
                return (
                  <Link
                    key={r.label}
                    href={r.href}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "bg-neutral-800 text-white font-bold shadow-xs border border-neutral-700/60"
                        : "text-neutral-300 hover:bg-neutral-800/60 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${r.color}`} />
                      <span className="truncate">{r.label}</span>
                    </div>

                    {isActive ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0 opacity-0 group-hover:opacity-100" />
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};
