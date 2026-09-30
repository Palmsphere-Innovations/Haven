"use client";

import React, { useState } from "react";
import { PieChart, Calendar, Building2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CostHeader() {
  const [accountingMethod, setAccountingMethod] = useState<"cash" | "accrual">("accrual");

  return (
    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-stone-500 text-xs font-semibold uppercase tracking-wider">
          <PieChart className="w-4 h-4 text-[#132A20]" />
          <span>Analytics &amp; Financial Intelligence • Portfolio Spend</span>
        </div>
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl lg:text-2xl font-bold text-stone-900 tracking-tight">
            Cost Analysis
          </h1>
          <span className="px-2 py-0.5 rounded bg-[#E8EFEA] text-[#132A20] text-[10px] font-bold">
            HMRC PIM2020 Compliant
          </span>
        </div>
        <p className="text-xs text-stone-500">
          Maintenance spend, capital improvements, and repair-vs-replace insights across your portfolio •{" "}
          <strong className="text-stone-900 font-semibold">Vance Holdings Ltd</strong>
        </p>
      </div>

      {/* Right Controls Strip */}
      <div className="flex flex-wrap items-center gap-2 self-start xl:self-auto">
        {/* Accrual / Cash Switcher */}
        <div className="flex items-center p-0.5 rounded-xl bg-[#F9F9F8] border border-[#ECEEED] text-xs font-medium text-stone-600">
          <button
            type="button"
            onClick={() => setAccountingMethod("cash")}
            className={`px-3 py-1 rounded-lg transition-all ${
              accountingMethod === "cash"
                ? "bg-white shadow-xs text-[#132A20] font-bold"
                : "hover:text-stone-900"
            }`}
          >
            Cash
          </button>
          <button
            type="button"
            onClick={() => setAccountingMethod("accrual")}
            className={`px-3 py-1 rounded-lg transition-all ${
              accountingMethod === "accrual"
                ? "bg-white shadow-xs text-[#132A20] font-bold"
                : "hover:text-stone-900"
            }`}
          >
            Accrual
          </button>
        </div>

        {/* Date Selector */}
        <select className="h-9 px-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900 font-semibold focus:outline-none">
          <option>Last 12 months</option>
          <option>FY 2025/26 (YTD)</option>
          <option>FY 2024/25</option>
          <option>All-Time Historic</option>
        </select>

        {/* Property Selector */}
        <select className="h-9 px-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900 font-semibold focus:outline-none">
          <option>All Properties (42 Units)</option>
          <option>12 Richmond Hill Mansions</option>
          <option>Flat 4B, 18 Kensington Gdns</option>
          <option>27 Blenheim Crescent</option>
          <option>8 Camden Mews</option>
        </select>

        {/* Export Action */}
        <Button variant="outline" className="h-9 px-3 border-[#ECEEED] rounded-xl text-xs font-semibold text-stone-700">
          <Download className="w-3.5 h-3.5 mr-1.5 text-stone-500" /> Export Statement
        </Button>
      </div>
    </div>
  );
}