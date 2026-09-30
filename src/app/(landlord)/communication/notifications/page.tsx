"use client";

import React, { useState, useMemo } from "react";
import { Shield, CheckCircle2, X } from "lucide-react";
import { NotificationsHeader } from "@/components/landlord/communication/notifications/notifications-header";
import {
  NotificationsFilter,
  type FilterCategory,
} from "@/components/landlord/communication/notifications/notification-filter";
import {
  NotificationsFeed,
  type NotificationItem,
} from "@/components/landlord/communication/notifications/notification-feed";
import { NotificationsSidebar } from "@/components/landlord/communication/notifications/notifications-sidebar";
import { Button } from "@/components/ui/button";

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    category: "rent",
    section: "today",
    isUnread: true,
    isUrgent: true,
    badge: "Rent Overdue",
    ref: "REF: AR-2025-10-09",
    title: "Standing order failed for Oct installment (£1,880.00) — Elena Rostova",
    body: "Grace period of 3 banking days has elapsed under Section 8 clause 4.",
    property: "8 Camden Mews, NW1 9UX",
    time: "12m ago",
    actionText: "Issue Formal Chaser",
  },
  {
    id: "2",
    category: "compliance",
    section: "today",
    isUnread: true,
    isUrgent: true,
    badge: "Gas Safety CP12",
    ref: "EXP: 21 OCT 2026",
    title: "Statutory Gas Safety Certificate (CP12) expires in 5 days",
    body: "Landlord & Tenant statutory requirement. Inspection booking required.",
    property: "Flat 4B, 18 Kensington Gardens, W2 4QH",
    time: "2h ago",
    actionText: "Dispatch Engineer",
  },
  {
    id: "3",
    category: "agent",
    section: "today",
    isUnread: true,
    isUrgent: false,
    badge: "Agent Handover",
    ref: "AUTH-2026-VNC",
    title: "Handover request initiated — Marcus Vance",
    body: "Requested delegation transfer to Prime Heritage Management.",
    property: "27 Blenheim Crescent",
    time: "5h ago",
    actionText: "Review & Authorise",
  },
  {
    id: "4",
    category: "rent",
    section: "today",
    isUnread: false,
    isUrgent: false,
    badge: "Disbursed",
    ref: "BACS REF: GC-99410",
    title: "Rent received — £2,450.00 via GoCardless direct debit",
    body: "Remitted by Clara Finch. Cleared to Vance Holdings Ltd operating trust account.",
    property: "Flat 4B, 18 Kensington Gardens",
    time: "08:15",
  },
  {
    id: "5",
    category: "maintenance",
    section: "yesterday",
    isUnread: true,
    isUrgent: false,
    badge: "Work Order MN-104",
    ref: "EST: £180.00",
    title: "Maintenance ticket updated: Boiler pressure drop quote pre-approved",
    body: "Quote submitted by Apex Heating Ltd pre-approved by Eleanor Vance.",
    property: "12 Richmond Hill Mansions",
    time: "Yesterday, 16:40",
    actionText: "Open Work Order",
  },
  {
    id: "6",
    category: "compliance",
    section: "yesterday",
    isUnread: true,
    isUrgent: false,
    badge: "Deposit Claim",
    ref: "TDS CASE: DSP-2026-084",
    title: "Tenant counter-evidence lodged by Oliver Davies",
    body: "Counter-submission filed regarding end-of-tenancy cleaning deduction (£320.00).",
    property: "Flat 4B, 18 Kensington Gardens",
    time: "Yesterday, 14:15",
    actionText: "Review Evidence Dossier",
  },
  {
    id: "7",
    category: "compliance",
    section: "yesterday",
    isUnread: false,
    isUrgent: false,
    badge: "Compliance Logged",
    ref: "CERT: EICR-8831",
    title: "Electrical Installation Condition Report (EICR) lodged",
    body: "Certified satisfactory under 2020 Private Rented Sector Regulations.",
    property: "Unit 3A, St. John's Court, SW4 7TA",
    time: "Yesterday, 11:30",
  },
  {
    id: "8",
    category: "rent",
    section: "earlier",
    isUnread: false,
    isUrgent: false,
    badge: "Mandate Active",
    ref: "DD-9910",
    title: "Direct debit mandate confirmed active — Sophie Montgomery",
    body: "Bank verification complete for incoming tenancy at Flat 2, 8 Camden Mews.",
    property: "Flat 2, 8 Camden Mews",
    time: "14 Oct, 15:10",
  },
];

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const handleMarkRead = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isUnread: false } : item))
    );
  };

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, isUnread: false })));
    setToastMessage("All alerts marked as read.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleArchiveRead = () => {
    setItems((prev) => prev.filter((item) => item.isUnread));
    setToastMessage("Archived all read notifications.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAction = (item: NotificationItem) => {
    setToastMessage(`Action executed: "${item.actionText}" for ${item.property}`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleInitiateDispatches = () => {
    setToastMessage("Statutory dispatches sent via Gov.uk Notify and registered post audit.");
    setTimeout(() => setToastMessage(null), 4500);
  };

  const counts = useMemo(() => {
    return {
      all: items.length,
      unread: items.filter((i) => i.isUnread).length,
      rent: items.filter((i) => i.category === "rent").length,
      maintenance: items.filter((i) => i.category === "maintenance").length,
      compliance: items.filter((i) => i.category === "compliance").length,
      agent: items.filter((i) => i.category === "agent").length,
    };
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = `${item.title} ${item.body} ${item.property} ${item.ref}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesTab =
        activeFilter === "all" ||
        (activeFilter === "unread" && item.isUnread) ||
        item.category === activeFilter;

      return matchesSearch && matchesTab;
    });
  }, [items, activeFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      <NotificationsHeader
        unreadCount={counts.unread}
        onMarkAllRead={handleMarkAllRead}
      />

      {toastMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <NotificationsFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        counts={counts}
        onArchiveRead={handleArchiveRead}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-8">
          <NotificationsFeed
            notifications={filteredItems}
            onMarkRead={handleMarkRead}
            onAction={handleAction}
          />
        </div>
        <div className="xl:col-span-4">
          <NotificationsSidebar onInitiateDispatches={handleInitiateDispatches} />
        </div>
      </div>

      <footer className="pt-4 border-t border-[#ECEEED] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-[#132A20]" />
          <span>Haven Event Bus v2.4 • Node ID: LON-SVR-08 • Encrypted AES-256</span>
        </div>
        <span className="font-mono text-[10px] text-stone-400">
          UK Sovereign Data Protection (GDPR / DPA 2018)
        </span>
      </footer>
    </div>
  );
}
