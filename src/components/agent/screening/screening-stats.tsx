import React from 'react';
import { AlertTriangle, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';

export function ScreeningStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Accent Card */}
      <div className="bg-[#132A20] text-white rounded-xl p-5 shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">Flagged for Manual Review</span>
          <AlertTriangle className="w-5 h-5 text-amber-300" />
        </div>
        <div className="my-3">
          <div className="text-4xl font-bold tracking-tight text-white">05</div>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-100">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Requires agent determination • No auto-rejections</span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#58605b]">
          <span className="text-xs uppercase tracking-wider font-semibold">Pending Initial Review</span>
          <Clock className="w-5 h-5" />
        </div>
        <div className="my-3">
          <div className="text-4xl font-bold tracking-tight text-[#1c1b1b]">08</div>
        </div>
        <div className="flex items-center justify-between text-xs text-[#424844]">
          <span>3 submitted today</span>
          <span className="font-mono bg-[#f0eded] px-1.5 py-0.5 rounded text-[#58605b]">SLA: 24h</span>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#58605b]">
          <span className="text-xs uppercase tracking-wider font-semibold">Referencing In Progress</span>
          <RefreshCw className="w-5 h-5" />
        </div>
        <div className="my-3">
          <div className="text-4xl font-bold tracking-tight text-[#1c1b1b]">14</div>
        </div>
        <div className="text-xs text-[#424844]">
          <span>Employer &amp; landlord checks active</span>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between">
        <div className="flex items-center justify-between text-[#58605b]">
          <span className="text-xs uppercase tracking-wider font-semibold">Approved (This Month)</span>
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
        </div>
        <div className="my-3">
          <div className="text-4xl font-bold tracking-tight text-[#1c1b1b]">23</div>
        </div>
        <div className="flex items-center justify-between text-xs text-[#424844]">
          <span>Avg turnaround: 2.4 days</span>
          <span className="font-mono text-emerald-800 font-semibold">99.1% Pass</span>
        </div>
      </div>
    </div>
  );
}