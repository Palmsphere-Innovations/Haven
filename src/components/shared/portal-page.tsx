import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function PortalPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <div className="space-y-8"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2A5240]">{eyebrow}</p><div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">{title}</h1><p className="mt-2 text-sm text-gray-500">{description}</p></div><button className="inline-flex items-center gap-2 rounded-lg bg-[#132A20] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1B3A2C]">View activity <ArrowUpRight className="h-4 w-4" /></button></div></div>{children}</div>;
}

export function MetricGrid({ metrics }: { metrics: { label: string; value: string; detail: string }[] }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map((metric) => <div key={metric.label} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><p className="text-xs font-medium text-gray-500">{metric.label}</p><p className="mt-3 text-2xl font-bold text-gray-950">{metric.value}</p><p className="mt-1 text-xs text-emerald-700">{metric.detail}</p></div>)}</div>;
}
