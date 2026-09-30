"use client";

import React, { useState } from "react";
import {
  X,
  Wrench,
  Flame,
  Zap,
  KeyRound,
  Upload,
  AlertTriangle,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import { MaintenanceTicket } from "@/lib/mock/tenants";

interface NewTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTicket: MaintenanceTicket) => void;
}

const CATEGORIES = [
  { label: "Heating & Radiators", icon: Flame },
  { label: "Plumbing & Water", icon: Wrench },
  { label: "Electrical & Lighting", icon: Zap },
  { label: "Security & Access", icon: KeyRound },
  { label: "Appliances", icon: Wrench },
  { label: "General & Structural", icon: Wrench },
];

export function NewTicketModal({ isOpen, onClose, onSubmit }: NewTicketModalProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Heating & Radiators");
  const [priority, setPriority] = useState<"Routine" | "Urgent" | "Emergency">("Routine");
  const [description, setDescription] = useState("");
  const [accessPermission, setAccessPermission] = useState<"key" | "presence">("key");
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatedPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map((f) => f.name);
      setSelectedPhotos((prev) => [...prev, ...fileNames]);
    }
  };

  const handleRemovePhoto = (index: number) => {
    setSelectedPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage("Please enter a short descriptive title for the repair.");
      return;
    }
    if (!description.trim()) {
      setErrorMessage("Please provide a description of the fault.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    // Generate random reference
    const randomRef = `#TKT-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket: MaintenanceTicket = {
      id: `tkt-${Date.now()}`,
      reference: randomRef,
      title: title.trim(),
      category,
      priority,
      status: "Logged",
      loggedDate: "Today",
      contractor: "Allocating approved contractor...",
      description: description.trim(),
      accessNotes:
        accessPermission === "key"
          ? "Permission granted for managing agent/contractor key access via concierge."
          : "Tenant must be present on site. Contact to arrange mutual appointment slot.",
      photos: selectedPhotos,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(newTicket);
      // Reset form
      setTitle("");
      setDescription("");
      setSelectedPhotos([]);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200/80 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div>
            <span className="text-[11px] font-semibold text-emerald-800 bg-[#E8EFEA] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Tenant Repair Request
            </span>
            <h2 className="text-xl font-bold text-stone-900 tracking-tight mt-1">
              Report an Issue / Log Repair
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-medium text-rose-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Issue Title */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Issue Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Shower thermostatic mixer valve dripping continuously"
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:bg-white transition-all"
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.label;
                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setCategory(cat.label)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer text-left ${
                      isSelected
                        ? "bg-[#132A20] text-white border-[#132A20] shadow-xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority Level */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Priority Urgency
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { level: "Routine", label: "Routine (within 5-7 days)", desc: "Minor cosmetic or non-essential" },
                  { level: "Urgent", label: "Urgent (24-48 hrs)", desc: "Heating failure or hot water loss" },
                  { level: "Emergency", label: "Emergency (Immediate)", desc: "Active flooding or gas leak" },
                ] as const
              ).map((p) => (
                <button
                  key={p.level}
                  type="button"
                  onClick={() => setPriority(p.level)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    priority === p.level
                      ? p.level === "Emergency"
                        ? "bg-rose-50 border-rose-300 text-rose-900 ring-2 ring-rose-500/20"
                        : "bg-[#132A20] text-white border-[#132A20]"
                      : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  <div className="text-xs font-bold">{p.level}</div>
                  <div
                    className={`text-[10px] mt-0.5 ${
                      priority === p.level && p.level !== "Emergency"
                        ? "text-stone-300"
                        : "text-stone-500"
                    }`}
                  >
                    {p.desc}
                  </div>
                </button>
              ))}
            </div>
            {priority === "Emergency" && (
              <p className="mt-2 text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  For active fire, uncontained flooding or gas smell, please dial <strong>0800 458 9120</strong> immediately.
                </span>
              </p>
            )}
          </div>

          {/* Fault Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Description &amp; Symptoms <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe where the issue is located, when it started, and any error codes displayed..."
              className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:bg-white transition-all leading-relaxed"
            />
          </div>

          {/* Access Permission */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
              Property Access Permission
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  accessPermission === "key"
                    ? "bg-[#E8EFEA] border-[#2A5240]/40 text-[#132A20]"
                    : "bg-stone-50 border-stone-200 text-stone-700"
                }`}
              >
                <input
                  type="radio"
                  name="access"
                  checked={accessPermission === "key"}
                  onChange={() => setAccessPermission("key")}
                  className="mt-0.5 accent-[#132A20]"
                />
                <div>
                  <div className="text-xs font-bold">Use Management Key</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Contractor may access via concierge if tenant is out
                  </div>
                </div>
              </label>

              <label
                className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  accessPermission === "presence"
                    ? "bg-[#E8EFEA] border-[#2A5240]/40 text-[#132A20]"
                    : "bg-stone-50 border-stone-200 text-stone-700"
                }`}
              >
                <input
                  type="radio"
                  name="access"
                  checked={accessPermission === "presence"}
                  onChange={() => setAccessPermission("presence")}
                  className="mt-0.5 accent-[#132A20]"
                />
                <div>
                  <div className="text-xs font-bold">Tenant Present Only</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Managing agent must schedule a confirmed mutual window
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Photo Upload Zone */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
              Diagnostic Photos &amp; Video Evidence (Optional)
            </label>
            <label className="border-2 border-dashed border-stone-300 hover:border-[#132A20] rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-stone-50 hover:bg-stone-100/50">
              <Upload className="w-5 h-5 text-stone-400 mb-1" />
              <span className="text-xs font-semibold text-stone-700">
                Click or drag photos of the fault
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5">
                PNG, JPG or MP4 up to 25MB each
              </span>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleSimulatedPhotoUpload}
                className="hidden"
              />
            </label>

            {selectedPhotos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedPhotos.map((photoName, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-xs text-stone-700"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-stone-500" />
                    <span className="truncate max-w-[150px]">{photoName}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="text-stone-400 hover:text-rose-600 transition-colors ml-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-200/80 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting Ticket..." : "Submit Maintenance Request"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
