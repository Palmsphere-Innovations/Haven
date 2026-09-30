import React from 'react';
import { ShieldAlert, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ActiveInspectionCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 bg-[#f6f3f2] -mx-6 -mt-6 p-6 rounded-t-xl border-b border-[#e5e2e1]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#132A20] text-white flex items-center justify-center font-bold text-base">
            LT
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-lg font-semibold text-[#1c1b1b]">Selected Review: Dr. Liam Thorne</span>
              <Badge className="bg-amber-100 text-amber-900 border-none font-medium">
                Flagged • Manual Review Required
              </Badge>
              <span className="font-mono text-xs text-[#58605b]">APP-2025-0841</span>
            </div>
            <p className="text-xs text-[#424844] mt-0.5">
              Applied for: Flat 4B, 18 Kensington Gardens, W2 • Proposed Tenancy Start: 01 Nov 2025 (£2,450 pcm)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#58605b] bg-[#e5e2e1] px-3 py-1.5 rounded">
          <Clock className="w-3.5 h-3.5" />
          <span>Submitted: 15 Oct 2025 (2h ago) • SLA Clock: 22h remaining</span>
        </div>
      </div>

      {/* Variance Diagnostic Callout */}
      <div className="bg-[#f0eded] rounded-lg p-4 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-800 mt-0.5 shrink-0" />
        <div className="space-y-1">
          <div className="text-sm font-semibold text-[#1c1b1b]">Algorithmic Safe-Lock Engaged (Variance Detected)</div>
          <p className="text-xs text-[#424844]">
            OpenBanking analysis detected a <strong>22% variance</strong> between self-employed income declared (£96,000 p.a.) and recurring tax returns deposited in verified accounts. However, Equifax credit rating stands at <strong>740 / 999 (Low Risk)</strong> with zero county court judgements (CCJs). Under statutory Haven policy, this file is preserved for accredited agent evaluation.
          </p>
        </div>
      </div>

      {/* 4 Pillars Verification Ledger */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-[#f6f3f2] rounded p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#58605b]">
            <span className="text-xs uppercase font-semibold">1. Identity &amp; KYC</span>
            <CheckCircle className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="my-2">
            <span className="text-xs font-semibold text-[#1c1b1b] block">Passport NFC Verified</span>
            <p className="text-xs text-[#58605b]">Homeppl biometric match (100%)</p>
          </div>
          <span className="font-mono text-xs text-emerald-800 font-medium">Passed • Verified</span>
        </div>

        <div className="bg-[#f6f3f2] rounded p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#58605b]">
            <span className="text-xs uppercase font-semibold">2. Right to Rent</span>
            <CheckCircle className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="my-2">
            <span className="text-xs font-semibold text-[#1c1b1b] block">Home Office ShareCode</span>
            <p className="text-xs text-[#58605b]">Code: R2R-8819-UK • Continuous</p>
          </div>
          <span className="font-mono text-xs text-emerald-800 font-medium">Statutory Audit Pass</span>
        </div>

        <div className="bg-[#f6f3f2] rounded p-3.5 flex flex-col justify-between border-l-2 border-amber-600">
          <div className="flex items-center justify-between text-amber-900">
            <span className="text-xs uppercase font-semibold">3. Employment / Income</span>
            <Clock className="w-4 h-4 text-amber-800" />
          </div>
          <div className="my-2">
            <span className="text-xs font-semibold text-[#1c1b1b] block">Accountant SA302 Requested</span>
            <p className="text-xs text-[#58605b]">Awaiting certified SA302/SA100</p>
          </div>
          <span className="font-mono text-xs text-amber-900 font-semibold">Variance Review Active</span>
        </div>

        <div className="bg-[#f6f3f2] rounded p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#58605b]">
            <span className="text-xs uppercase font-semibold">4. Previous Landlord</span>
            <CheckCircle className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="my-2">
            <span className="text-xs font-semibold text-[#1c1b1b] block">Cadogan Estates Reference</span>
            <p className="text-xs text-[#58605b]">4 years on-time payments, no arrears</p>
          </div>
          <span className="font-mono text-xs text-emerald-800 font-medium">Exemplary Reference</span>
        </div>
      </div>

      {/* Action Panel for Determination */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="bg-[#f0eded] border-none text-[#1c1b1b] hover:bg-[#e5e2e1]">
            Request Additional 6M Statements
          </Button>
          <Button variant="outline" size="sm" className="bg-[#f0eded] border-none text-[#1c1b1b] hover:bg-[#e5e2e1]">
            Offer Guarantor Option
          </Button>
          <Button variant="outline" size="sm" className="bg-[#f0eded] border-none text-[#1c1b1b] hover:bg-[#e5e2e1]">
            Schedule Pre-Decline Call
          </Button>
        </div>
        <Button className="bg-[#132A20] hover:bg-[#00150c] text-white flex items-center gap-2 shadow-sm">
          <ShieldCheck className="w-4 h-4" />
          <span>Proceed with Delegated Determination</span>
        </Button>
      </div>
    </div>
  );
}