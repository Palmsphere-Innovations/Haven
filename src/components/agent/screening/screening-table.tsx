import React from 'react';
import { Search, AlertTriangle, CheckCircle2, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ApplicantRecord } from '@/lib/mock/screening-types';

const APPLICANTS_DATA: ApplicantRecord[] = [
  {
    id: 'APP-2025-0841',
    name: 'Dr. Liam Thorne',
    email: 'l.thorne@imperial.ac.uk',
    applicantType: 'Sole Applicant',
    property: 'Flat 4B, 18 Kensington Gardens, W2',
    rent: '£2,450/mo',
    startDate: '01 Nov 2025',
    status: 'flagged',
    statusDetails: 'Income variance 22% • Safe-lock active',
    submittedAt: '15 Oct 2025 (2h ago)',
    slaRemaining: 'SLA: 22h remaining',
    providers: ['Equifax', 'Homeppl'],
    creditScore: '740/999',
    riskLevel: 'Low Risk',
    isSelected: true,
  },
  {
    id: 'APP-2025-0840',
    name: 'Sophia Montgomery',
    email: 'smontgomery@finchley.co.uk',
    applicantType: 'With Guarantor',
    property: '12 Richmond Hill Mansions, TW10',
    rent: '£3,100/mo',
    startDate: '28 Oct 2025',
    status: 'in_progress',
    submittedAt: '14 Oct 2025 (1d ago)',
    slaRemaining: 'SLA: On schedule',
    providers: ['Goodlord Verified'],
  },
  {
    id: 'APP-2025-0839',
    name: 'Marcus Vance-Sterling',
    email: 'mvance@capitol.ch',
    applicantType: 'Sole Applicant',
    property: '8 Camden Mews, NW1',
    rent: '£1,950/mo',
    startDate: '05 Nov 2025',
    status: 'credit_check',
    submittedAt: '14 Oct 2025 (18h ago)',
    slaRemaining: 'SLA: On schedule',
    providers: ['Homeppl OpenBanking'],
  },
  {
    id: 'APP-2025-0838',
    name: 'Elena Rostova',
    email: 'elena.rostova@techcorp.io',
    applicantType: 'Sole Applicant',
    property: '27 Blenheim Crescent, Unit 1, W11',
    rent: '£2,800/mo',
    startDate: '15 Nov 2025',
    status: 'pending',
    submittedAt: '15 Oct 2025 (45m ago)',
    slaRemaining: 'New submission',
    providers: ['Equifax Awaiting Consent'],
  },
  {
    id: 'APP-2025-0837',
    name: 'Arthur Pendelton',
    email: 'apendelton@somerset.org',
    applicantType: 'Joint Applicant',
    property: 'Flat 2, 44 Holland Park, W11',
    rent: '£3,400/mo',
    startDate: '20 Oct 2025',
    status: 'approved',
    submittedAt: '13 Oct 2025 (2d ago)',
    slaRemaining: 'Audit Signed Off',
    providers: ['Homeppl', 'Right to Rent'],
  },
];

export function ScreeningTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Sub-Nav Filter Bar */}
      <div className="p-6 pb-4 space-y-4 border-b border-[#f0eded]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-sm">
            <button className="px-3 py-1 rounded-full bg-[#132A20] text-white font-semibold shrink-0">
              All (50)
            </button>
            <button className="px-3 py-1 rounded-full hover:bg-[#f0eded] text-[#424844] shrink-0">
              Pending Review (8)
            </button>
            <button className="px-3 py-1 rounded-full hover:bg-[#f0eded] text-[#424844] shrink-0">
              In Progress (14)
            </button>
            <button className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 shrink-0 flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>Flagged for Manual Review (5)</span>
            </button>
            <button className="px-3 py-1 rounded-full hover:bg-[#f0eded] text-[#424844] shrink-0">
              Approved (23)
            </button>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#727974] pointer-events-none" />
              <input
                type="text"
                placeholder="Search applicant, property..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#f6f3f2] text-[#1c1b1b] rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#132A20]"
              />
            </div>
            <select className="px-3 py-1.5 bg-[#f6f3f2] text-[#1c1b1b] rounded text-xs focus:outline-none">
              <option>All 14 Managed Units</option>
              <option>Flat 4B, Kensington Gardens</option>
              <option>12 Richmond Hill Mansions</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="bg-[#f6f3f2] text-[#58605b] text-xs uppercase tracking-wider border-b border-[#e5e2e1]">
              <th className="py-3 px-6 font-semibold">Applicant</th>
              <th className="py-3 px-4 font-semibold">Property Applied For</th>
              <th className="py-3 px-4 font-semibold">Stage &amp; Review Status</th>
              <th className="py-3 px-4 font-semibold">Submitted / SLA</th>
              <th className="py-3 px-4 font-semibold">Audit &amp; Provider</th>
              <th className="py-3 px-6 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0eded]">
            {APPLICANTS_DATA.map((row) => {
              const isSelectedRow = row.isSelected;
              return (
                <tr
                  key={row.id}
                  className={`transition-colors ${
                    isSelectedRow ? 'bg-[#dce5de]/40 hover:bg-[#dce5de]/60' : 'hover:bg-[#f6f3f2]'
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {isSelectedRow && <div className="w-1.5 h-8 bg-[#132A20] rounded-full shrink-0" />}
                      <div>
                        <div className="font-semibold text-[#1c1b1b]">{row.name}</div>
                        <div className="text-xs text-[#58605b]">{row.email} • {row.applicantType}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="text-[#1c1b1b] font-medium">{row.property}</div>
                    <div className="font-mono text-xs text-[#58605b]">{row.rent} • Starts {row.startDate}</div>
                  </td>

                  <td className="py-4 px-4">
                    {row.status === 'flagged' && (
                      <div className="flex flex-col items-start gap-1">
                        <Badge className="bg-amber-100 text-amber-900 border-none flex items-center gap-1 font-medium">
                          <AlertTriangle className="w-3 h-3 text-amber-700" />
                          <span>Flagged (Manual Review)</span>
                        </Badge>
                        {row.statusDetails && (
                          <span className="text-xs text-amber-900">{row.statusDetails}</span>
                        )}
                      </div>
                    )}

                    {row.status === 'in_progress' && (
                      <Badge className="bg-blue-50 text-blue-700 border-none font-normal flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Referencing Active</span>
                      </Badge>
                    )}

                    {row.status === 'credit_check' && (
                      <Badge className="bg-purple-50 text-purple-700 border-none font-normal flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                        <span>Credit &amp; Fraud Check</span>
                      </Badge>
                    )}

                    {row.status === 'pending' && (
                      <Badge className="bg-stone-100 text-stone-700 border-none font-normal flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-stone-500"></span>
                        <span>Pending Initial Review</span>
                      </Badge>
                    )}

                    {row.status === 'approved' && (
                      <Badge className="bg-emerald-50 text-emerald-800 border-none font-normal flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Approved by Agent</span>
                      </Badge>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-mono text-xs text-[#1c1b1b]">{row.submittedAt}</div>
                    <div className="text-xs text-[#58605b]">{row.slaRemaining}</div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-[#132A20] text-xs font-medium">
                      <Check className="w-3.5 h-3.5" />
                      <span>{row.providers.join(' + ')}</span>
                    </div>
                    {row.creditScore && (
                      <span className="font-mono text-xs text-[#58605b]">Score: {row.creditScore} • {row.riskLevel}</span>
                    )}
                  </td>

                  <td className="py-4 px-6 text-right">
                    {row.status === 'flagged' ? (
                      <Button size="sm" className="bg-[#132A20] text-white hover:bg-[#00150c]">
                        Examine Flag
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="bg-[#f0eded] border-none text-[#1c1b1b] hover:bg-[#e5e2e1]">
                        {row.status === 'approved' ? 'View Dossier' : 'Review Application'}
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Pagination */}
      <div className="p-4 bg-[#f6f3f2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#58605b]">
        <div className="flex items-center gap-2 font-mono">
          <span>Showing 1 to 5 of 50 active candidate files</span>
          <span>•</span>
          <span>Authority: MARLA Scoped Delegated Model</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled className="bg-white text-[#1c1b1b] shadow-sm disabled:opacity-50">
            Previous
          </Button>
          <span className="font-mono text-xs font-medium text-[#1c1b1b]">Page 1 of 10</span>
          <Button variant="outline" size="sm" className="bg-white text-[#1c1b1b] shadow-sm hover:bg-[#f0eded]">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}