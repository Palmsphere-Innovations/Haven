"use client";

import React from "react";

export function SpendChart() {
  return (
    <div className="rounded-2xl bg-white border border-[#ECEEED] p-6 shadow-xs space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#ECEEED]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-stone-900">
              Monthly Maintenance Expenditure (Trailing 12 Months)
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600">
              GBP (£) Ledger
            </span>
          </div>
          <p className="text-xs text-stone-500">
            Invoiced contractor works compared against statutory sinking fund target (£5,416/mo)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#132A20]" />
            <span className="font-medium text-stone-900">
              Actual Spend: <strong className="font-mono font-bold">£68,420</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0 border-t-2 border-dashed border-stone-400" />
            <span className="text-stone-500">
              Sinking Target: <strong className="font-mono font-medium text-stone-900">£65,000</strong>
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 text-[10px] font-bold border border-rose-200">
            +£3,420 (+5.2%)
          </span>
        </div>
      </div>

      {/* Responsive SVG Chart Container */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[840px] h-72 relative">
          <svg className="w-full h-full select-none" viewBox="0 0 960 260">
            <defs>
              <linearGradient id="spendAreaGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#132A20" stopOpacity="0.22" />
                <stop offset="50%" stopColor="#132A20" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#132A20" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line stroke="#ECEEED" strokeDasharray="3,3" x1="48" x2="940" y1="30" y2="30" />
            <text fill="#A3A3A3" fontSize="11" x="40" y="34" textAnchor="end">£10k</text>

            <line stroke="#ECEEED" strokeDasharray="3,3" x1="48" x2="940" y1="75" y2="75" />
            <text fill="#A3A3A3" fontSize="11" x="40" y="79" textAnchor="end">£8k</text>

            <line stroke="#ECEEED" strokeDasharray="3,3" x1="48" x2="940" y1="120" y2="120" />
            <text fill="#A3A3A3" fontSize="11" x="40" y="124" textAnchor="end">£6k</text>

            {/* Target Baseline (£5.4k) */}
            <line stroke="#787878" strokeDasharray="4,4" strokeWidth="1.5" x1="48" x2="940" y1="133" y2="133" />
            <text fill="#787878" fontSize="10" fontWeight="600" x="942" y="137">Budget £5.4k</text>

            <line stroke="#ECEEED" strokeDasharray="3,3" x1="48" x2="940" y1="165" y2="165" />
            <text fill="#A3A3A3" fontSize="11" x="40" y="169" textAnchor="end">£4k</text>

            <line stroke="#ECEEED" strokeDasharray="3,3" x1="48" x2="940" y1="210" y2="210" />
            <text fill="#A3A3A3" fontSize="11" x="40" y="214" textAnchor="end">£2k</text>

            <line stroke="#CCCCCC" strokeWidth="1" x1="48" x2="940" y1="235" y2="235" />

            {/* Area Fill */}
            <polygon
              fill="url(#spendAreaGrad)"
              points="70,235 70,155 150,130 230,115 310,142 390,125 470,160 550,172 630,148 710,138 790,122 870,65 940,110 940,235"
            />

            {/* Line Trend */}
            <polyline
              fill="none"
              stroke="#132A20"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="70,155 150,130 230,115 310,142 390,125 470,160 550,172 630,148 710,138 790,122 870,65 940,110"
            />

            {/* Peak Month Marker (Sep 25) */}
            <line stroke="#132A20" strokeDasharray="3,3" x1="870" x2="870" y1="65" y2="235" />
            <circle cx="870" cy="65" r="6" fill="#132A20" stroke="#FFFFFF" strokeWidth="2.5" />

            {/* Peak Callout Badge */}
            <g transform="translate(640, 16)">
              <rect x="0" y="0" width="260" height="52" rx="8" fill="#132A20" />
              <text x="14" y="22" fill="#B2CDBE" fontSize="11" fontWeight="700">
                Sep 2025: £8,420.00 (Peak Month)
              </text>
              <text x="14" y="38" fill="#FFFFFF" fontSize="10" opacity="0.9">
                4 Boiler Overhauls + Intercom Gateway
              </text>
            </g>

            {/* X Labels */}
            {[
              { x: 70, label: "Nov 24" },
              { x: 150, label: "Dec 24" },
              { x: 230, label: "Jan 25" },
              { x: 310, label: "Feb 25" },
              { x: 390, label: "Mar 25" },
              { x: 470, label: "Apr 25" },
              { x: 550, label: "May 25" },
              { x: 630, label: "Jun 25" },
              { x: 710, label: "Jul 25" },
              { x: 790, label: "Aug 25" },
              { x: 870, label: "Sep 25", bold: true },
              { x: 940, label: "Oct 25" },
            ].map((m, i) => (
              <text
                key={i}
                x={m.x}
                y="252"
                textAnchor="middle"
                fontSize="11"
                fill={m.bold ? "#132A20" : "#787878"}
                fontWeight={m.bold ? "700" : "500"}
              >
                {m.label}
              </text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}