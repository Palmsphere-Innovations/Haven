import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Record {
  address: string;
  tenant: string;
  rent: string;
  dueDate: string;
  status: "overdue_14" | "overdue_7" | "due_soon" | "paid_dd" | "paid_so";
  actionLabel: string;
}

const records: Record[] = [
  {
    address: "8 Camden Mews, NW1",
    tenant: "Elena Rostova",
    rent: "£850.00",
    dueDate: "28 Sep 2025",
    status: "overdue_14",
    actionLabel: "Notice",
  },
  {
    address: "27 Blenheim Cres, W11",
    tenant: "Marcus Vance",
    rent: "£2,600.00",
    dueDate: "05 Oct 2025",
    status: "overdue_7",
    actionLabel: "Reminder",
  },
  {
    address: "Unit 3A, St. John's Ct, SW4",
    tenant: "Maya Lin & S. Patel",
    rent: "£1,850.00",
    dueDate: "14 Oct 2025",
    status: "due_soon",
    actionLabel: "View",
  },
  {
    address: "Flat 4B, 18 Kensington Gdns",
    tenant: "Oliver & Clara Finch",
    rent: "£2,450.00",
    dueDate: "01 Oct 2025",
    status: "paid_dd",
    actionLabel: "Receipt",
  },
  {
    address: "12 Richmond Hill Mansions",
    tenant: "Dr. Aris Thorne",
    rent: "£3,100.00",
    dueDate: "01 Oct 2025",
    status: "paid_so",
    actionLabel: "Receipt",
  },
];

export const RentLedgerCard: React.FC = () => {
  const renderStatusTag = (status: Record["status"]) => {
    switch (status) {
      case "overdue_14":
      case "overdue_7":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-[#991B1B] text-[11px] font-medium bg-[#FDE8E8] text-[#991B1B]">
            {status === "overdue_14" ? "Overdue (14 days)" : "Overdue (7 days)"}
          </span>
        );
      case "due_soon":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-[#8D6E18] text-[11px] font-medium bg-[#FEF7E6] text-[#8D6E18]">
            Due in 3 days
          </span>
        );
      case "paid_dd":
      case "paid_so":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-[#1B5E20] w-max text text-center text-[11px] font-medium bg-[#EAF4ED] text-[#1B5E20]">
            {status === "paid_dd" ? "Paid (Direct Debit)" : "Paid (Standing Order)"}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-sm p-6 sm:p-7 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <h2 className="text-base font-bold text-[#111827]">
            Rent Ledger &amp; Cashflow Status
          </h2>
          <p className="text-xs text-[#6B7280] mt-0.5">
            October 2025 collection roll • Statutory Client Money Account
          </p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto">
          <button className="px-3 py-1 text-xs font-semibold rounded-lg bg-white text-[#111827] shadow-sm">
            Oct 2025
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-lg text-[#6B7280] hover:text-[#111827]">
            Sep 2025
          </button>
          <button className="px-3 py-1 text-xs font-medium rounded-lg text-[#6B7280] hover:text-[#111827]">
            Aug 2025
          </button>
        </div>
      </div>

      {/* Cashflow Meter */}
      <div className="py-5">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[#6B7280]">Total Expected:</span>
              <span className="font-semibold text-[#111827]">£92,050.00</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-[#374151]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-700" /> Paid £82,400 (87%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-600" /> Due Soon £6,200 (9%)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-rose-700" /> Overdue £3,450 (4%)
              </span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden flex">
            <div className="h-full bg-emerald-700" style={{ width: "87%" }} />
            <div className="h-full bg-amber-400" style={{ width: "9%" }} />
            <div className="h-full bg-rose-500" style={{ width: "4%" }} />
          </div>
        </div>
      </div>

      {/* Tenancies Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] uppercase tracking-wider text-[#6B7280] font-semibold">
              <th className="py-3 pr-4">Property Address</th>
              <th className="py-3 px-3">Tenant Name</th>
              <th className="py-3 px-3 text-right">Rent / P.C.M</th>
              <th className="py-3 px-3">Due Date</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 pl-3 text-right">Action</th>
            </tr>
          </thead>


          <tbody className="divide-y overflow-scroll divide-gray-50">
            {records.map((rec, i) => (
              <tr key={i} className="hover:bg-gray-50/70 transition-colors">
                <td className="py-3.5 pr-4 font-medium text-[#111827]">
                  <div className="truncate max-w-50">
                    {rec.address}
                  </div>
                </td>
                <td className="py-3.5 px-3 h w-max text-[#6B7280]">
                  <div className="truncate max-w-30">
                    {rec.tenant}
                    </div>
                  </td>
                <td className="py-3.5 px-3 text-right font-medium text-[#111827]">
                <div className="truncate max-w-30" >
                  {rec.rent}
                  </div>
                </td>
                <td className="py-3.5 px-3 w-5 text-[#6B7280] font-mono text-[11px]">
                <div className="truncate max-w-30">
                  
                  {rec.dueDate}
                  </div>

                </td>
                <td className="py-3.5 px-3">
                  
                  {renderStatusTag(rec.status)}

                </td>
                <td className="py-3.5 pl-3 text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-7 px-3 text-[11px] font-medium bg-gray-100 hover:bg-gray-200 text-[#111827]"
                  >
                    {rec.actionLabel}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-5 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#6B7280]">
        <span>Showing 5 of 42 tenancy records</span>
        <Link href="/contracts" className="font-medium text-[#111827] hover:underline flex items-center gap-1">
          <span>Complete Rent Roll</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};