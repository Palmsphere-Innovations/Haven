"use client";

import React from "react";
import Link from "next/link";
import { Building2, User, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import type { PropertyRecord } from "@/lib/mock/properties";

interface PropertyGridProps {
  properties: PropertyRecord[];
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="bg-white border border-[#e5e2dc] rounded-2xl p-12 text-center text-stone-500 text-xs">
        No properties found matching your filter criteria.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
      {properties.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-[#e5e2dc] rounded-2xl p-5 flex flex-col justify-between hover:border-stone-400 hover:shadow-md transition-all group"
        >
          {/* Header Tag & Unit Ref */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-mono font-semibold text-stone-500 bg-[#f8f7f4] px-2 py-0.5 rounded border border-[#e8e5df]">
                #{item.code}
              </span>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${
                  item.isVacant
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}
              >
                {item.isVacant ? "Vacant" : "Occupied"}
              </span>
            </div>

            <Link href={`/properties/${item.id}`} className="block group-hover:text-brand">
              <h3 className="text-sm font-semibold text-stone-900 group-hover:text-brand transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">{item.address}</p>
            </Link>
          </div>

          {/* Property Info Details */}
          <div className="my-4 py-3 border-y border-stone-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-stone-400" />
                Type:
              </span>
              <span className="font-medium text-stone-800">
                {item.type} ({item.subType})
              </span>
            </div>

            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-stone-400" />
                Occupant:
              </span>
              <span className="font-medium text-stone-800 truncate max-w-[160px]">
                {item.occupant}
              </span>
            </div>
          </div>

          {/* Footer: Rent & Compliance State */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div>
              <span className="text-[10px] text-stone-400 block uppercase tracking-wider">
                {item.rentType}
              </span>
              <span className="text-sm font-bold text-stone-900 font-mono">
                {item.rent}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded ${
                  item.complianceStatus === "action"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : item.complianceStatus === "warning"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-[#eaf4ed] text-[#1e5e2f] border border-emerald-200"
                }`}
              >
                {item.complianceStatus === "valid" ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-3 h-3" />
                )}
                <span>{item.complianceText}</span>
              </div>

              <Link
                href={`/properties/${item.id}`}
                className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-900"
                title="View Property"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
