import React from "react"
import { Eye, Wrench, ClipboardCheck, Receipt, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DisputeRecord } from "@/types/index"

interface DisputeLedgerTableProps {
  disputes: DisputeRecord[]
  selectedTab: string
  onSelectTab: (tab: string) => void
  onSelectDispute: (id: string) => void
}

export const DisputeLedgerTable: React.FC<DisputeLedgerTableProps> = ({
  disputes,
  selectedTab,
  onSelectTab,
  onSelectDispute,
}) => {
  const tabs = [
    { id: "all", label: `All (${disputes.length})` },
    {
      id: "under_review",
      label: `Under Review (${disputes.filter((d) => d.status === "under_review").length})`,
    },
    {
      id: "resolved",
      label: `Resolved (${disputes.filter((d) => d.status === "resolved").length})`,
    },
  ];

  const getCategoryIcon = (category: DisputeRecord["category"]) => {
    switch (category) {
      case "maintenance":
        return <Wrench className="w-4 h-4 text-emerald-800" />
      case "deposit":
        return <ClipboardCheck className="w-4 h-4 text-stone-600" />
      case "rent":
        return <Receipt className="w-4 h-4 text-stone-600" />
      default:
        return <Wrench className="w-4 h-4 text-stone-600" />
    }
  }

  return (
    <div className="rounded-2xl bg-white border border-stone-200/80 shadow-sm p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-semibold text-[#132A20]">Dispute Case Ledger</h2>
          <p className="text-xs text-stone-500">
            Archival repository of formal arbitration, repair defaults, and deposit claims.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="inline-flex p-1 bg-stone-100 rounded-xl border border-stone-200/60 self-start sm:self-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedTab === tab.id
                  ? "bg-white text-[#132A20] shadow-xs font-semibold"
                  : "text-stone-600 hover:text-[#132A20]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger List */}
      <div className="flex flex-col gap-2">
        {disputes.map((d) => (
          <div
            key={d.id}
            onClick={() => onSelectDispute(d.id)}
            className={`p-4 rounded-xl transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 border ${
              d.isSelected
                ? "bg-stone-50 border-stone-300 shadow-xs"
                : "bg-white border-stone-200/70 hover:bg-stone-50/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                  d.isSelected
                    ? "bg-[#132A20] text-white border-transparent"
                    : "bg-stone-100 text-stone-700 border-stone-200"
                }`}
              >
                {getCategoryIcon(d.category)}
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-bold text-xs text-[#132A20]">#{d.reference}</span>
                  <Badge variant="outline" className="bg-stone-100 text-stone-700 text-[10px]">
                    {d.categoryLabel}
                  </Badge>

                  {d.status === "under_review" && (
                    <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-[10px] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                      <span>{d.statusLabel}</span>
                    </Badge>
                  )}

                  {d.status === "resolved" && (
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-900 border-emerald-200 text-[10px] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-700" />
                      <span>{d.statusLabel}</span>
                    </Badge>
                  )}

                  <span className="text-[11px] text-stone-500">Opened {d.openedDate}</span>
                </div>

                <h3 className="font-semibold text-xs text-[#132A20] mt-0.5">{d.title}</h3>
                <p className="text-xs text-stone-600">
                  {d.outcome ? `Outcome: ${d.outcome}` : `Claimed remedy: ${d.remedy}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
              {d.isSelected ? (
                <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 text-xs font-semibold px-2.5 py-1 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Selected Dossier</span>
                </Badge>
              ) : (
                <span className="text-xs text-stone-500">Settled in {d.settledTime}</span>
              )}

              <Button
                type="button"
                variant="outline"
                className="h-8 px-3 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 font-medium"
              >
                <span>Audit Trail</span>
                {!d.isSelected && <ExternalLink className="w-3 h-3 ml-1 text-stone-400" />}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 