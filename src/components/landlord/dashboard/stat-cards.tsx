import React from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, CircleAlert, KeyRound, Wrench } from "lucide-react";

const cards = [
  {
    label: "Total properties",
    value: "42",
    suffix: "units",
    detail: "38 residential · 4 commercial",
    footerLabel: "Occupancy rate",
    footerValue: "98%",
    icon: Building2,
    href: "/properties",
    tone: "neutral",
  },
  {
    label: "Active tenancies",
    value: "39",
    suffix: "active",
    detail: "2 renewals scheduled this month",
    footerLabel: "Average tenure",
    footerValue: "2.4 years",
    icon: KeyRound,
    href: "/tenants",
    tone: "neutral",
  },
  {
    label: "Rent overdue",
    value: "£3,450",
    suffix: "",
    detail: "Across 2 tenancies",
    footerLabel: "Overdue ratio",
    footerValue: "3.7% of monthly rent",
    icon: CircleAlert,
    href: "#rent-ledger-card",
    tone: "alert",
  },
  {
    label: "Open maintenance",
    value: "7",
    suffix: "tickets",
    detail: "1 urgent · 3 in progress · 3 scheduled",
    footerLabel: "Priority attention",
    footerValue: "1 urgent",
    icon: Wrench,
    href: "#maintenance-section",
    tone: "neutral",
  },
] as const;

export const StatCards: React.FC = () => {
  return (
    <section aria-label="Portfolio key figures" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, suffix, detail, footerLabel, footerValue, icon: Icon, href, tone }) => {
        const isAlert = tone === "alert";

        return (
          <Link
            key={label}
            href={href}
            className={`group flex min-h-[208px] flex-col rounded-2xl border p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#426A50] focus-visible:ring-offset-2 sm:p-5 ${
              isAlert
                ? "border-[#203D2D] bg-[#132A20] text-white hover:bg-[#1B3527]"
                : "border-[#E7ECE8] bg-white text-[#18251C] hover:border-[#CFDCD1]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`text-xs font-semibold tracking-wide ${isAlert ? "text-[#C3D1C7]" : "text-[#68756C]"}`}>
                {label}
              </span>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isAlert ? "bg-white/10 text-[#F4C6BC]" : "bg-[#F0F4F1] text-[#45634F]"}`}>
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-[2rem] font-semibold leading-none tracking-tight ${isAlert ? "text-white" : "text-[#132A20]"}`}>
                {value}
              </span>
              {suffix && <span className={`text-sm ${isAlert ? "text-[#C3D1C7]" : "text-[#738078]"}`}>{suffix}</span>}
            </div>
            <p className={`mt-2 min-h-5 text-xs leading-5 ${isAlert ? "text-[#C3D1C7]" : "text-[#77827A]"}`}>
              {detail}
            </p>

            <div className={`mt-auto flex items-center justify-between gap-3 border-t pt-3.5 text-xs ${isAlert ? "border-white/15" : "border-[#EEF1EE]"}`}>
              <span className={isAlert ? "text-[#B5C5B9]" : "text-[#77827A]"}>{footerLabel}</span>
              <span className="flex items-center gap-1.5 text-right font-semibold">
                {isAlert && <span className="h-1.5 w-1.5 rounded-full bg-[#F28B78]" />}
                {footerValue}
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70" />
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
};
