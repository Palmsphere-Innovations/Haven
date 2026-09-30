"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, CircleAlert, KeyRound, Wrench } from "lucide-react";
import { propertiesData, type PropertyRecord } from "@/lib/mock/properties";
import { tenantsData, type TenantRecord } from "@/lib/mock/tenants";
import { maintenanceTickets, type MaintenanceTicket } from "@/lib/mock/maintenance";
import { INITIAL_MONTHLY_LEDGERS } from "@/lib/mock/ledger";
import { formatCurrency } from "@/lib/formatters";

interface StatCardsProps {
  properties?: PropertyRecord[];
  tenants?: TenantRecord[];
  tickets?: MaintenanceTicket[];
}

export const StatCards: React.FC<StatCardsProps> = ({
  properties = propertiesData,
  tenants = tenantsData,
  tickets = maintenanceTickets,
}) => {
  const cards = useMemo(() => {
    const totalProps = properties.length;
    const resCount = properties.filter((p) => p.type === "Residential").length;
    const comCount = properties.filter((p) => p.type === "Commercial").length;

    const activeTenancies = properties.filter((p) => !p.isVacant).length || tenants.length;
    const occupancyRate = totalProps > 0 ? Math.round((activeTenancies / totalProps) * 100) : 0;

    // Calculate overdue rent from ledgers / properties
    let overdueTotal = 0;
    let overdueCount = 0;
    const currentMonthLedger = INITIAL_MONTHLY_LEDGERS["Oct 2025"] || Object.values(INITIAL_MONTHLY_LEDGERS)[0] || [];
    currentMonthLedger.forEach((entry) => {
      if (entry.status === "overdue_14" || entry.status === "overdue_7") {
        overdueTotal += entry.rent;
        overdueCount += 1;
      }
    });
    if (overdueTotal === 0) {
      properties.forEach((p) => {
        if (p.ledgerStatus === "overdue_14" || p.ledgerStatus === "overdue_7") {
          const val = Number(String(p.rent).replace(/[£,]/g, "")) || 0;
          overdueTotal += val;
          overdueCount += 1;
        }
      });
    }

    const openTickets = tickets.filter((t) => t.status !== "Resolved");
    const urgentCount = openTickets.filter(
      (t) => t.priority === "Urgent" || t.priority === "High"
    ).length;
    const scheduledCount = openTickets.filter((t) => t.status === "Submitted").length;
    const inProgressCount = openTickets.filter((t) => t.status === "In Progress").length;

    return [
      {
        label: "Total properties",
        value: String(totalProps),
        suffix: "units",
        detail: `${resCount} residential · ${comCount} commercial`,
        footerLabel: "Occupancy rate",
        footerValue: `${occupancyRate}%`,
        icon: Building2,
        href: "/properties",
        tone: "neutral" as const,
      },
      {
        label: "Active tenancies",
        value: String(activeTenancies),
        suffix: "active",
        detail: `${Math.min(2, activeTenancies)} renewals scheduled this month`,
        footerLabel: "Average tenure",
        footerValue: "2.4 years",
        icon: KeyRound,
        href: "/tenants",
        tone: "neutral" as const,
      },
      {
        label: "Rent overdue",
        value: formatCurrency(overdueTotal),
        suffix: "",
        detail: `Across ${overdueCount} ${overdueCount === 1 ? "tenancy" : "tenancies"}`,
        footerLabel: "Overdue ratio",
        footerValue: `${totalProps > 0 ? ((overdueCount / totalProps) * 100).toFixed(1) : 0}% of portfolio`,
        icon: CircleAlert,
        href: "#rent-ledger-card",
        tone: "alert" as const,
      },
      {
        label: "Open maintenance",
        value: String(openTickets.length),
        suffix: "tickets",
        detail: `${urgentCount} urgent · ${inProgressCount} in progress · ${scheduledCount} scheduled`,
        footerLabel: "Priority attention",
        footerValue: urgentCount > 0 ? `${urgentCount} urgent` : "Routine",
        icon: Wrench,
        href: "/maintenance",
        tone: "neutral" as const,
      },
    ];
  }, [properties, tenants, tickets]);

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
