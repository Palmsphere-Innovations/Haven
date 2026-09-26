"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, List, Grid, CheckCircle2, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface TenantRow {
  id: string;
  initials: string;
  names: string;
  contact: string;
  property: string;
  unit: string;
  startDate: string;
  endDate?: string;
  termType: string;
  rent: string;
  paymentMethod: string;
  ledgerStatus: string;
  ledgerBadgeStyle: string;
  inviteStatus: string;
  isInvitePending?: boolean;
}

interface TenantsTableProps {
  tenants: TenantRow[];
}

export function TenantsTable({ tenants }: TenantsTableProps) {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "invited">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTenants = tenants.filter((tenant) => {
    if (activeTab === "active" && tenant.isInvitePending) return false;
    if (activeTab === "invited" && !tenant.isInvitePending) return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        tenant.names.toLowerCase().includes(q) ||
        tenant.contact.toLowerCase().includes(q) ||
        tenant.property.toLowerCase().includes(q) ||
        tenant.unit.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] p-3 shadow-xs flex flex-col xl:flex-row items-start xl:items-center justify-between gap-3">
        <div className="flex items-center gap-1 bg-[#F9F9F8] p-1 rounded-xl w-full xl:w-auto overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "all"
                ? "font-semibold bg-white text-stone-900 shadow-xs"
                : "font-medium text-stone-600 hover:text-stone-900"
            }`}
          >
            All Tenants ({tenants.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("active")}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "active"
                ? "font-semibold bg-white text-stone-900 shadow-xs"
                : "font-medium text-stone-600 hover:text-stone-900"
            }`}
          >
            Active (39)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("invited")}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap ${
              activeTab === "invited"
                ? "font-semibold bg-white text-stone-900 shadow-xs"
                : "font-medium text-stone-600 hover:text-stone-900"
            }`}
          >
            Invited (Pending) (3)
          </button>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full xl:w-auto justify-end">
          <div className="relative min-w-[220px] flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by tenant name, email, unit..."
              className="w-full h-9 pl-9 pr-3 bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-xs text-stone-900 placeholder:text-stone-400"
            />
          </div>

          <select className="h-9 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-700 cursor-pointer">
            <option>All Boroughs / Properties</option>
            <option>Kensington (W2)</option>
            <option>Camden (NW1)</option>
            <option>Notting Hill (W11)</option>
          </select>

          <div className="flex items-center bg-[#F9F9F8] border border-[#ECEEED] rounded-xl p-0.5">
            <button type="button" className="p-1.5 rounded-lg bg-white text-stone-900 shadow-xs">
              <List className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700">
              <Grid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-[#ECEEED] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#ECEEED] bg-[#F9F9F8] text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                <th className="py-3 px-4">Tenant Name &amp; Contact</th>
                <th className="py-3 px-4">Property &amp; Unit</th>
                <th className="py-3 px-4">Tenancy Term (AST)</th>
                <th className="py-3 px-4 text-right">Monthly Rent</th>
                <th className="py-3 px-4">Rent Ledger</th>
                <th className="py-3 px-4">Invite &amp; Compliance</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEEED]">
              {filteredTenants.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50/70 transition-colors w-max">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E8EFEA] text-[#132A20] flex items-center justify-center font-bold text-xs shrink-0">
                        {row.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-stone-900">{row.names}</div>
                        <div className="text-[11px] text-stone-500">{row.contact}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 ">
                    <div className="font-medium text-stone-900">{row.property}</div>
                    <div className="text-[11px] text-stone-500">{row.unit}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-mono font-medium text-stone-900">{row.startDate}</div>
                    <div className="text-[10px] text-stone-500 uppercase">{row.termType}</div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="font-mono font-semibold text-stone-900">{row.rent}</div>
                    <div className="text-[10px] text-stone-500">{row.paymentMethod}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${row.ledgerBadgeStyle}`}>
                      {row.ledgerStatus}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 text-stone-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{row.inviteStatus}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/tenants/${row.id}`}
                        className="rounded-lg border border-[#ECEEED] px-2.5 py-1.5 text-xs font-semibold text-brand hover:bg-[#E8EFEA]"
                      >
                        View
                      </Link>
                      <button type="button" className="p-1 text-stone-400 hover:text-stone-700">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="p-4 border-t border-[#ECEEED] bg-[#F9F9F8] flex items-center justify-between text-xs text-stone-500">
          <span>Showing 1 to {filteredTenants.length} of {tenants.length} tenancies</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="h-7 px-3 bg-white text-xs">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-3 bg-white text-xs text-stone-900">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}