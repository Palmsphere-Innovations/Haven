"use client";

import React from "react";
import {
  PoundSterling,
  ShieldCheck,
  RefreshCw,
  Wrench,
  Check,
  ArrowRight,
} from "lucide-react";

export interface NotificationItem {
  id: string;
  category: "rent" | "maintenance" | "compliance" | "agent";
  section: "today" | "yesterday" | "earlier";
  isUnread: boolean;
  isUrgent: boolean;
  badge: string;
  ref: string;
  title: string;
  body: string;
  property: string;
  time: string;
  actionText?: string;
  actionIcon?: React.ElementType;
}

const categoryIcons = {
  rent: PoundSterling,
  compliance: ShieldCheck,
  agent: RefreshCw,
  maintenance: Wrench,
};

interface NotificationsFeedProps {
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  onAction?: (item: NotificationItem) => void;
}

export function NotificationsFeed({
  notifications,
  onMarkRead,
  onAction,
}: NotificationsFeedProps) {
  const sections = [
    { key: "today", title: "Today", date: "Thursday, 16 Oct 2026" },
    { key: "yesterday", title: "Yesterday", date: "Wednesday, 15 Oct 2026" },
    { key: "earlier", title: "Earlier This Week", date: "12 – 14 Oct 2026" },
  ] as const;

  return (
    <div className="space-y-6">
      {sections.map((sec) => {
        const secItems = notifications.filter((n) => n.section === sec.key);
        if (secItems.length === 0) return null;

        const actionableCount = secItems.filter((n) => n.isUrgent && n.isUnread).length;

        return (
          <div
            key={sec.key}
            className="bg-white border border-[#ECEEED] rounded-2xl overflow-hidden shadow-xs"
          >
            {/* Subheader */}
            <div className="bg-[#F9F9F8] border-b border-[#ECEEED] px-4 py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 uppercase tracking-wider">
                  {sec.title}
                </span>
                <span className="text-stone-300">•</span>
                <span className="font-mono text-stone-500">{sec.date}</span>
              </div>
              {actionableCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold">
                  {actionableCount} Actionable
                </span>
              )}
            </div>

            {/* List */}
            <div className="divide-y divide-[#ECEEED]">
              {secItems.map((item) => {
                const CategoryIcon = categoryIcons[item.category] || PoundSterling;

                return (
                  <div
                    key={item.id}
                    className={`group flex items-start justify-between gap-4 p-4 transition-colors ${
                      item.isUnread
                        ? "bg-white hover:bg-stone-50/80"
                        : "bg-[#F9F9F8]/50 opacity-80"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      {/* Unread Pip */}
                      <div className="pt-2 shrink-0 flex items-center justify-center">
                        {item.isUnread ? (
                          <span
                            className={`w-2 h-2 rounded-full ${
                              item.isUrgent
                                ? "bg-rose-600 ring-4 ring-rose-100 animate-pulse"
                                : "bg-[#132A20]"
                            }`}
                          />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-transparent" />
                        )}
                      </div>

                      {/* Icon */}
                      <div className="w-9 h-9 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] flex items-center justify-center shrink-0 text-[#132A20]">
                        <CategoryIcon className="w-4 h-4" />
                      </div>

                      {/* Content */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              item.isUrgent
                                ? "bg-rose-50 text-rose-800 border border-rose-200"
                                : "bg-[#E8EFEA] text-[#132A20]"
                            }`}
                          >
                            {item.badge}
                          </span>
                          <span className="font-mono text-[10px] text-stone-400">
                            {item.ref}
                          </span>
                        </div>

                        <h2
                          className={`text-xs ${
                            item.isUnread
                              ? "font-bold text-stone-900"
                              : "font-normal text-stone-600"
                          } truncate`}
                        >
                          {item.title}
                        </h2>

                        <p className="text-xs text-stone-500 leading-relaxed">
                          <strong className="text-stone-900 font-semibold">
                            {item.property}
                          </strong>
                          : {item.body}
                        </p>

                        {item.actionText && (
                          <div className="pt-1 flex items-center gap-3 text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                onMarkRead(item.id);
                                if (onAction) onAction(item);
                              }}
                              className="text-[#132A20] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>{item.actionText}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right timestamp & Mark Read */}
                    <div className="flex flex-col items-end shrink-0 text-right space-y-2">
                      <span className="font-mono text-[10px] text-stone-400">
                        {item.time}
                      </span>
                      {item.isUnread && (
                        <button
                          type="button"
                          onClick={() => onMarkRead(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-stone-100 rounded text-stone-500 cursor-pointer"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
