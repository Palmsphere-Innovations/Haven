"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Filter, Plus, Search, Send, UserCheck, Wrench, X } from "lucide-react";

const portfolio = [
  ["CM-08", "8 Camden Mews", "Camden, NW1", "Managed Units", "£2,850", "Occupied"],
  ["BC-27", "27 Blenheim Crescent", "Notting Hill, W11", "Lettings Active", "£3,200", "Vacant"],
  ["SJ-03A", "3A St John's Road", "Islington, N1", "Valuations Pending", "£2,150", "Occupied"],
  ["KG-4B", "Flat 4B, Kensington Gardens", "Kensington, W8", "Managed Units", "£2,975", "Occupied"],
  ["RM-12", "12 Redchurch Street", "Shoreditch, E2", "Lettings Active", "£2,400", "Vacant"],
];

const applicants = [
  { name: "Amelia Hart", property: "27 Blenheim Crescent", stage: "Referencing Sent", income: "£68,000", updated: "Today" },
  { name: "Noah Williams", property: "3A St John's Road", stage: "Guarantor Verified", income: "£54,000", updated: "Yesterday" },
  { name: "Isla Morgan", property: "12 Redchurch Street", stage: "Approved", income: "£72,500", updated: "12 Sep" },
  { name: "Oliver Khan", property: "8 Camden Mews", stage: "Rejected", income: "£39,000", updated: "10 Sep" },
];

const vendors = [
  { name: "Pimlico Plumbers", trade: "Plumbing", rating: "4.9", availability: "Available today", jobs: 24 },
  { name: "Apex Electrical", trade: "Electrical", rating: "4.8", availability: "Available tomorrow", jobs: 18 },
  { name: "Northstar Heating", trade: "Heating", rating: "4.7", availability: "2 slots this week", jobs: 31 },
  { name: "Crown & Key Locksmiths", trade: "Security", rating: "4.9", availability: "Available today", jobs: 12 },
];

function ShellCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-[#ECEEED] bg-white p-5 shadow-sm ${className}`}>{children}</div>;
}

export function AgentPortfolioWorkspace() {
  const [tab, setTab] = useState("Managed Units");
  const [query, setQuery] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const rows = useMemo(() => portfolio.filter((p) => p[3] === tab && p.join(" ").toLowerCase().includes(query.toLowerCase())), [tab, query]);
  return <div className="space-y-6">
    <div className="flex flex-wrap gap-2">{["Managed Units", "Lettings Active", "Valuations Pending"].map((item) => <button key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === item ? "bg-[#132A20] text-white" : "bg-white text-gray-600 ring-1 ring-[#ECEEED]"}`}>{item}</button>)}</div>
    <div className="flex flex-wrap gap-3"><label className="relative min-w-64 flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search address, code or postcode" className="h-10 w-full rounded-xl border border-[#ECEEED] pl-10 pr-3 text-sm outline-none focus:border-[#132A20]" /></label><button onClick={() => setShowDrawer(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#132A20] px-4 py-2 text-sm font-semibold text-white"><Plus className="h-4 w-4" /> Create listing</button></div>
    <ShellCard><div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Portfolio listings</h2><span className="text-xs text-gray-500">{rows.length} records</span></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-xs uppercase text-gray-400"><tr><th className="pb-3">Property</th><th className="pb-3">Status</th><th className="pb-3">Target rent</th><th className="pb-3 text-right">Action</th></tr></thead><tbody>{rows.map((p) => <tr key={p[0]} className="border-t border-[#ECEEED]"><td className="py-4"><p className="font-semibold">{p[1]}</p><p className="text-xs text-gray-500">{p[0]} · {p[2]}</p></td><td><span className="rounded-full bg-[#E8EFEA] px-2.5 py-1 text-xs font-medium text-[#2A5240]">{p[5]}</span></td><td className="font-medium">{p[4]}</td><td className="text-right"><button onClick={() => setShowDrawer(true)} className="text-xs font-semibold text-[#2A5240] hover:underline">Manage</button></td></tr>)}</tbody></table></div></ShellCard>
    {showDrawer && <div className="fixed inset-0 z-50 flex justify-end bg-black/30" role="dialog" aria-modal="true"><div className="h-full w-full max-w-md bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="text-lg font-semibold">Create listing</h2><button onClick={() => setShowDrawer(false)} aria-label="Close"><X className="h-5 w-5" /></button></div><p className="mt-2 text-sm text-gray-500">Prepare a new marketing listing for landlord approval.</p><div className="mt-6 space-y-4"><input placeholder="Property address" className="h-10 w-full rounded-xl border p-3 text-sm" /><select className="h-10 w-full rounded-xl border px-3 text-sm"><option>Residential</option><option>Commercial</option></select><textarea placeholder="Listing notes" className="min-h-28 w-full rounded-xl border p-3 text-sm" /><button onClick={() => setShowDrawer(false)} className="w-full rounded-xl bg-[#132A20] py-3 text-sm font-semibold text-white">Save draft</button></div></div></div>}
  </div>;
}

export function AgentScreeningWorkspace() {
  const [stage, setStage] = useState("All");
  const filtered = stage === "All" ? applicants : applicants.filter((a) => a.stage === stage);
  return <div className="space-y-6"><div className="grid gap-4 sm:grid-cols-4">{["Referencing Sent", "Guarantor Verified", "Approved", "Rejected"].map((s) => <button key={s} onClick={() => setStage(stage === s ? "All" : s)} className={`rounded-2xl border p-4 text-left ${stage === s ? "border-[#132A20] bg-[#E8EFEA]" : "border-[#ECEEED] bg-white"}`}><p className="text-xs text-gray-500">{s}</p><p className="mt-2 text-2xl font-bold">{applicants.filter((a) => a.stage === s).length}</p></button>)}</div><ShellCard><div className="mb-4 flex items-center gap-2"><UserCheck className="h-5 w-5 text-[#2A5240]" /><h2 className="font-semibold">Applicant pipeline</h2></div><div className="space-y-3">{filtered.map((a) => <div key={a.name} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#ECEEED] p-4"><div><p className="font-semibold">{a.name}</p><p className="text-xs text-gray-500">{a.property} · Updated {a.updated}</p></div><div className="text-right"><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">{a.stage}</span><p className="mt-2 text-xs text-gray-500">Income {a.income}</p></div></div>)}</div></ShellCard></div>;
}

export function AgentVendorsWorkspace() {
  const [query, setQuery] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const filtered = vendors.filter((v) => `${v.name} ${v.trade}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="space-y-6"><div className="flex flex-wrap gap-3"><label className="relative min-w-64 flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search contractors or trades" className="h-10 w-full rounded-xl border border-[#ECEEED] pl-10 text-sm" /></label><button className="inline-flex items-center gap-2 rounded-xl border border-[#ECEEED] bg-white px-4 py-2 text-sm font-semibold"><Filter className="h-4 w-4" /> Filter</button></div><div className="grid gap-4 md:grid-cols-2">{filtered.map((v) => <ShellCard key={v.name}><div className="flex items-start justify-between"><div><p className="font-semibold">{v.name}</p><p className="mt-1 text-sm text-gray-500">{v.trade} · ★ {v.rating}</p></div><Wrench className="h-5 w-5 text-[#2A5240]" /></div><div className="mt-5 flex items-center justify-between text-xs text-gray-500"><span>{v.availability}</span><span>{v.jobs} completed jobs</span></div><button onClick={() => setSent(v.name)} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#132A20] py-2.5 text-sm font-semibold text-white"><Send className="h-4 w-4" /> Dispatch work order</button></ShellCard>)}</div>{sent && <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-[#132A20] px-4 py-3 text-sm text-white shadow-xl"><CheckCircle2 className="h-4 w-4" /> Work order sent to {sent}<button onClick={() => setSent(null)}><X className="h-4 w-4" /></button></div>}</div>;
}
