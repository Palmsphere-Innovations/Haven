import React from "react"
import { Search, Filter, Archive, CheckCircle2, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PaymentHistoryRecord } from "@/types/index"

interface PaymentsHistoryTableProps {
  payments: PaymentHistoryRecord[]
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedYear: string
  onYearChange: (y: string) => void
  onExportZip: () => void
  onDownloadReceipt: (period: string, ref: string) => void
}

export const PaymentsHistoryTable: React.FC<PaymentsHistoryTableProps> = ({
  payments,
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearChange,
  onExportZip,
  onDownloadReceipt,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(payments.length / pageSize));

  // Reset to page 1 if filter reduces totalPages below currentPage
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedPayments = payments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="rounded-2xl bg-white p-6 border border-stone-200/80 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-semibold text-[#132A20]">Payment History &amp; Receipts</h2>
          <p className="text-xs text-stone-500">
            All completed rent payments and statutory receipts for your current tenancy
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Year Filter */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => {
                onYearChange(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 pl-8 pr-8 bg-stone-50 text-[#132A20] rounded-xl text-xs font-medium border border-stone-300 focus:outline-none cursor-pointer appearance-none"
            >
              <option value="2024">Current Year (2024)</option>
              <option value="2023">Tenancy Start (2023)</option>
              <option value="all">All Payments</option>
            </select>
            <Filter className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Search reference or month..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 pl-8 pr-3 w-48 lg:w-60 bg-stone-50 text-xs border-stone-300 focus:border-[#132A20]"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={onExportZip}
            className="h-8 text-xs border-stone-300 bg-white text-[#132A20] hover:bg-stone-100 cursor-pointer"
          >
            <Archive className="w-3.5 h-3.5 mr-1.5 text-stone-500" />
            <span>Export All (ZIP)</span>
          </Button>
        </div>
      </div>

      {/* Payments Ledger Table */}
      <div className="overflow-x-auto -mx-6 px-6">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-500 uppercase tracking-wider font-semibold h-9">
              <th className="py-2 px-3 rounded-l-lg">Payment Period</th>
              <th className="py-2 px-3">Paid On</th>
              <th className="py-2 px-3">Method &amp; Transaction ID</th>
              <th className="py-2 px-3 text-right">Amount</th>
              <th className="py-2 px-3 text-center">Status</th>
              <th className="py-2 px-3 text-right rounded-r-lg">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/60 text-stone-800">
            {paginatedPayments.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-xs text-stone-500">
                  No payment records match the current filter.
                </td>
              </tr>
            ) : (
              paginatedPayments.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-sm text-[#132A20]">{row.period}</div>
                    <div className="text-stone-500 text-[11px]">{row.dateRange}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-stone-700">{row.paidOn}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 text-stone-800">
                      <span className="text-stone-500">{row.method}</span>
                    </div>
                    <div className="font-mono text-[11px] text-stone-500">#{row.transactionRef}</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-sm text-[#132A20]">
                    {row.amount}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200 font-medium text-[10px] inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-800" />
                      <span>{row.status}</span>
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onDownloadReceipt(row.period, row.transactionRef)}
                      className="inline-flex items-center gap-1 font-semibold text-[#132A20] hover:underline cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-stone-500" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination & Statistics */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500">
        <span>
          Showing{" "}
          <span className="font-semibold text-[#132A20]">
            {payments.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>
          –
          <span className="font-semibold text-[#132A20]">
            {Math.min(currentPage * pageSize, payments.length)}
          </span>{" "}
          of <span className="font-semibold text-[#132A20]">{payments.length}</span> payments
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="h-7 w-7 p-0 bg-stone-50 text-stone-600 border-stone-200 cursor-pointer disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="px-2 font-mono text-xs font-bold text-[#132A20]">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="h-7 w-7 p-0 bg-stone-50 text-stone-700 border-stone-300 cursor-pointer disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};