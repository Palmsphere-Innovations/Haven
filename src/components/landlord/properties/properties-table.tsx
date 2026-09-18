"use client";

import React, { useState } from "react";
import { DivideIcon, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { type PropertyRecord } from '@/lib/mock/properties'

interface PropertiesTableProps {
  properties: PropertyRecord[];
}


export const PropertiesTable: React.FC<PropertiesTableProps> = ({ properties }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7);
  const totalPages = Math.max(1, Math.ceil(properties.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = currentPage * pageSize;
  const paginatedProperties = properties.slice(startIndex, endIndex);


  const renderLedgerPill = (status: PropertyRecord["ledgerStatus"], text: string) => {
    switch (status) {
      case "overdue_14":
      case "overdue_7":
        return (
          <div className="inline-flex items-center px-2 py-0.5 rounded-full w-max text-[11px] font-medium bg-[#fde8e8] text-[#991b1b]">
            {text}
          </div>
        );
      case "due_soon":
        return (
          <div className="inline-flex items-center px-2 py-0.5 rounded-full w-max text-[11px] font-medium bg-[#fef7e6] text-[#8d6e18]">
            {text}
          </div>
        );
      case "paid_dd":
      case "paid_so":
      case "paid_bacs":
        return (
          <div className="flex items-center px-2 py-0.5 rounded-full w-max text-[11px] font-medium bg-[#eaf4ed] text-[#1e5e2f]">
            {text}
          </div>
        );
      case "vacant":
        return <div className="text-stone-400 text-[11px]">{text}
        </div>;
    }
  };

  const renderCompliancePill = (status: PropertyRecord["complianceStatus"], text: string) => {
    if (status === "valid") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 w-max rounded-full text-[11px] font-medium bg-[#eaf4ed] text-[#1e5e2f]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          {text}
        </span>
      );
    }
    if (status === "action") {
      return (
        <div className="inline-flex items-center gap-1 px-2 py-0.5 w-max rounded-full text-[11px] font-medium bg-[#fde8e8] text-[#991b1b]">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          {text}
        </div>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#fef7e6] text-[#8d6e18]">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        {text}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e5e2dc] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#eeece6] bg-[#faf9f6] text-[10px] uppercase tracking-wider font-semibold w-full text-stone-500">
              <th className="py-3.5 pl-6 pr-4">
                Property &amp; Code
                </th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Occupant / Tenancy</th>
              <th className="py-3.5 px-4">Rent (P.C.M)</th>
              <th className="py-3.5 px-4">Ledger Status</th>
              <th className="py-3.5 px-4">Statutory Compliance</th>
              <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f2f0ea] text-xs">
            {paginatedProperties.map((item) => (
              <tr key={item.id} className="hover:bg-[#faf9f5] transition-colors group">
                <td className="py-4 pl-6 w-96 pr-4">
                  <div className="flex items-start  gap-3">

                    <div className="w-9 h-9 rounded-lg bg-[#f0eee9] border border-[#e3dfd6] flex items-center justify-center shrink-0 text-stone-600 font-serif font-bold text-xs">
                      {item.code.split("-")[0]}
                    </div>

                    <div className="w-max" >

                      <div className="font-semibold text-stone-900  group-hover:text-stone-950 flex items-center gap-1.5">
                        <Link 
                        href={`/properties/${item.id}`} className="hover:underline">
                          {item.title}
                        </Link>
                        <span className="text-[10px] font-normal text-stone-400 bg-stone-100 px-1 py-0.2 rounded">
                          {item.code}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {item.address}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 text-stone-600">
                  <span className="font-medium text-stone-800">{item.type}</span>
                  <div className="text-[11px] text-stone-400">{item.subType}
                  </div>
                </td>

                <td className="py-4 px-4">
                  {item.isVacant ? (
                    <div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-600 border border-stone-200">
                        {item.occupant}
                      </span>
                      <div className="text-[10px] text-stone-400 mt-0.5">{item.tenancyInfo}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium text-stone-900">{item.occupant}</div>
                      <div className="text-[11px] text-stone-500">{item.tenancyInfo}</div>
                    </div>
                  )}
                </td>

                <td className="py-4 px-4 font-semibold text-stone-900 font-mono">
                  {item.rent}
                  <span className="block text-[10px] font-normal text-stone-400 font-sans">
                    {item.rentType}
                  </span>
                </td>

                <td className="py-4 px-4">{renderLedgerPill(item.ledgerStatus, item.ledgerText)}</td>
                <td className="py-4 px-4">{renderCompliancePill(item.complianceStatus, item.complianceText)}</td>

                <td className="py-4 pl-4 pr-6 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/properties/${item.id}`)}
                      className="h-7 px-2.5 rounded-md border border-[#dedad2] bg-white text-xs font-medium text-stone-700 hover:bg-[#f6f4ee] transition-colors"
                    >
                      View
                    </Button>
                    <button type="button" className="p-1 rounded text-stone-400 hover:text-stone-700">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-3.5 border-t border-[#f0eee8] bg-[#fcfbf9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <div>
          Showing 
          <span 
          className="font-medium text-stone-800">
            {properties.length === 0 ? 0 : startIndex + 1}
            </span> to{" "}
          <span className="font-medium text-stone-800">
            {Math.min(endIndex, properties.length)}
            </span> of{" "}

          <span className="font-medium text-stone-800">
          
            {properties.length}
            </span> 
            properties
        </div>

        <div className="flex items-center gap-1.5">
          <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage <= 1} onClick={() => setCurrentPage((prev) => prev - 1)} 
          className="h-7 px-2.5 text-xs border-[#dedad2] text-stone-400 cursor-not-allowed disabled:opacity-50">
            Previous
          </Button>
          <span 
          className="px-2.5 py-1 text-xs font-medium text-stone-700">
            Page {currentPage} of {totalPages}
            </span>
          <Button 
          variant="outline" 
          size="sm" 
          disabled={currentPage >= totalPages} 
          onClick={() => setCurrentPage((prev) => prev + 1)} className="h-7 px-2.5 text-xs border-[#dedad2] text-stone-700 hover:bg-stone-50 disabled:opacity-50">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};