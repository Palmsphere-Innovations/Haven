"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  CheckCircle2,
  Clock,
  Download,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Keyboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface MetricItem {
  label: string;
  value: string;
  detail?: string;
}

export interface SectionPageProps {
  role: string;
  title: string;
  description?: string;
  metrics?: MetricItem[];
  children?: React.ReactNode;
  onRefresh?: () => void;
  onExport?: () => void;
}

export function MetricGrid({ metrics }: { metrics: MetricItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.05 }}
          whileHover={{ y: -2, transition: { duration: 0.15 } }}
          className="rounded-2xl border border-[#ECEEED] bg-white p-5 shadow-xs transition-all hover:border-[#132A20]/20"
        >
          <p className="text-xs font-medium text-gray-500">{metric.label}</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              {metric.value}
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8EFEA] text-[#2A5240]">
              <TrendingUp className="h-3.5 w-3.5" />
            </div>
          </div>
          {metric.detail && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {metric.detail}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function SectionPage({
  role,
  title,
  description = "Manage this workspace from one connected view.",
  metrics,
  children,
  onRefresh,
  onExport,
}: SectionPageProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("Just now");
  const [actionNotice, setActionNotice] = useState<{
    message: string;
    shortcut?: string;
  } | null>(null);

  const noticeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCallback((message: string, shortcut?: string) => {
    if (noticeTimeoutRef.current) {
      clearTimeout(noticeTimeoutRef.current);
    }
    setActionNotice({ message, shortcut });
    noticeTimeoutRef.current = setTimeout(() => {
      setActionNotice(null);
    }, 3500);
  }, []);

  const handleRefresh = useCallback(
    (triggeredByShortcut = false) => {
      if (isRefreshing) return;
      setIsRefreshing(true);

      if (onRefresh) {
        onRefresh();
      }

      setTimeout(() => {
        setIsRefreshing(false);
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setLastRefreshed(timeStr);
        showNotification(
          `Refreshed ${title} data successfully.`,
          triggeredByShortcut ? "Alt+R" : undefined
        );
      }, 500);
    },
    [isRefreshing, onRefresh, title, showNotification]
  );

  const handleExport = useCallback(
    (triggeredByShortcut = false) => {
      if (isExporting) return;
      setIsExporting(true);

      if (onExport) {
        onExport();
      } else {
        // Trigger structured CSV export
        const headers = ["Section", "Metric / Field", "Value", "Detail"];
        const rows = (metrics || []).map((m) => [
          `"${title}"`,
          `"${m.label}"`,
          `"${m.value}"`,
          `"${m.detail || ""}"`,
        ]);
        if (rows.length === 0) {
          rows.push([`"${title}"`, `"Status"`, `"Operational"`, `"Standard Log"`]);
        }

        const csvContent =
          "data:text/csv;charset=utf-8," +
          [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute(
          "download",
          `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-export-${
            new Date().toISOString().split("T")[0]
          }.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      setTimeout(() => {
        setIsExporting(false);
        showNotification(
          `Exported ledger for ${title} successfully.`,
          triggeredByShortcut ? "Alt+E" : undefined
        );
      }, 500);
    },
    [isExporting, onExport, metrics, title, showNotification]
  );

  // Global Keyboard Shortcut Listener for Accessibility & Power Users
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Alt modifier (Alt+R or Alt+E)
      if (!event.altKey) return;

      const key = event.key.toLowerCase();
      const code = event.code;

      // Refresh Shortcut: Alt+R
      if (key === "r" || code === "KeyR") {
        event.preventDefault();
        event.stopPropagation();
        handleRefresh(true);
        return;
      }

      // Export Shortcut: Alt+E
      if (key === "e" || code === "KeyE") {
        event.preventDefault();
        event.stopPropagation();
        handleExport(true);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (noticeTimeoutRef.current) {
        clearTimeout(noticeTimeoutRef.current);
      }
    };
  }, [handleRefresh, handleExport]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="max-w-[1600px] mx-auto space-y-6"
    >
      {/* Top Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#ECEEED] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E8EFEA] px-2.5 py-0.5 text-xs font-semibold text-[#2A5240]">
              <ShieldCheck className="h-3.5 w-3.5" />
              {role}
            </div>
            <span className="text-[11px] font-mono text-stone-400">
              Synced: {lastRefreshed}
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>

        {/* Action Buttons with Accessible Shortcut Indicators */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => handleRefresh(false)}
            disabled={isRefreshing}
            aria-label="Refresh workspace data (Keyboard shortcut: Alt+R)"
            aria-keyshortcuts="Alt+R"
            title="Refresh (Alt+R)"
            className="inline-flex items-center gap-2 rounded-xl border border-[#ECEEED] bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#132A20] cursor-pointer disabled:opacity-50 transition-all"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-gray-500 ${
                isRefreshing ? "animate-spin text-[#132A20]" : ""
              }`}
            />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
            <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-stone-100 text-stone-600 border border-stone-200">
              Alt+R
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => handleExport(false)}
            disabled={isExporting}
            aria-label="Export workspace ledger data (Keyboard shortcut: Alt+E)"
            aria-keyshortcuts="Alt+E"
            title="Export Data (Alt+E)"
            className="inline-flex items-center gap-2 rounded-xl bg-[#132A20] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1f4233] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2A5240] cursor-pointer disabled:opacity-50 transition-all"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isExporting ? "Exporting..." : "Export Data"}</span>
            <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-[#1e3e30] text-emerald-200 border border-emerald-800">
              Alt+E
            </kbd>
          </button>
        </div>
      </div>

      {/* Floating / Toast Action Notice with Shortcut Badge */}
      <AnimatePresence>
        {actionNotice && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs font-medium text-emerald-800 flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>{actionNotice.message}</span>
            </div>
            {actionNotice.shortcut && (
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-mono bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded-md">
                <Keyboard className="w-3 h-3" />
                <span>{actionNotice.shortcut} triggered</span>
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Metrics Row if present */}
      {metrics && metrics.length > 0 && <MetricGrid metrics={metrics} />}

      {/* Main Content Area */}
      {children ? (
        children
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#ECEEED] bg-white p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECEEED] pb-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {title} Ledger &amp; Audit Trail
                </h2>
                <p className="text-xs text-gray-500">
                  Live operational records and event logs
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Synchronized
                </span>
              </div>
            </div>

            <div className="mt-4 divide-y divide-[#ECEEED]">
              {[
                {
                  id: "EVT-9041",
                  title: `${title} status verified`,
                  target: "Standard Compliance Protocol",
                  status: "Verified",
                  timestamp: "12 mins ago",
                },
                {
                  id: "EVT-9038",
                  title: "Automated reconciliation complete",
                  target: "Operational Service Bus",
                  status: "Completed",
                  timestamp: "1 hr ago",
                },
                {
                  id: "EVT-9012",
                  title: "Periodic safety audit record synchronized",
                  target: "Central Governance Register",
                  status: "Active",
                  timestamp: "3 hrs ago",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#E8EFEA] text-[#2A5240]">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.id} • {item.target}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 font-medium text-gray-700">
                      {item.status}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
