"use client";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ServiceOrderModal({ property, service, onClose }: { property: string; service: string; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl"><div className="flex justify-between"><h2 className="text-lg font-semibold text-stone-900">Order {service}</h2><button aria-label="Close" onClick={onClose}><X className="h-5 w-5 text-stone-500" /></button></div><p className="text-sm text-stone-600">A contractor request will be prepared for <strong>{property}</strong>.</p><input className="h-10 w-full rounded-lg border border-stone-300 px-3 text-sm" placeholder="Preferred appointment date" type="date" /><Button onClick={onClose} className="w-full bg-[#132A20] text-white">Request contractor</Button></div></div>;
}
