"use client";

import React, { useMemo, useState } from "react";
import {
  X,
  BookmarkPlus,
  Plus,
  Copy,
  Check,
  Home,
  Ruler,
  PoundSterling,
  Link2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = {
  title: string;
  code: string;
  address: string;
  type: string;
  subType: string;
  bedrooms: string;
  bathrooms: string;
  epcRating: string;
  area: string;
  valuation: string;
  monthlyRent: string;
};

type AddPropertyModalProps = {
  onClose: () => void;
  onSubmit?: (data: FormState) => void;
  inviteLink?: string;
};

const INITIAL_STATE: FormState = {
  title: "",
  code: "",
  address: "",
  type: "Residential",
  subType: "",
  bedrooms: "",
  bathrooms: "",
  epcRating: "",
  area: "",
  valuation: "",
  monthlyRent: "",
};

const REQUIRED_FIELDS: (keyof FormState)[] = [
  "title",
  "code",
  "address",
  "subType",
  "bedrooms",
  "bathrooms",
  "epcRating",
  "area",
  "valuation",
  "monthlyRent",
];

function getMilestone(percent: number) {
  if (percent === 100) return { label: "All set — ready to add!", emoji: "🎉" };
  if (percent >= 70) return { label: "Almost there", emoji: "🚀" };
  if (percent >= 40) return { label: "Halfway there", emoji: "💪" };
  if (percent > 0) return { label: "Nice start", emoji: "✨" };
  return { label: "Let's get started", emoji: "🏠" };
}

export function AddPropertyModal({
  onClose,
  onSubmit,
  inviteLink = "https://haven.estate/invite?email=oliver.davies@kensington-tenants.co.uk",
}: AddPropertyModalProps) {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const filledCount = useMemo(
    () => REQUIRED_FIELDS.filter((f) => form[f].trim().length > 0).length,
    [form]
  );
  
  const percent = Math.round((filledCount / REQUIRED_FIELDS.length) * 100);
  const milestone = getMilestone(percent);

  const handleCopy = async () => {
    if (!inviteLink) return;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-3xl border border-[#ECEEED] bg-white p-7 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#ECEEED] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFEA] flex items-center justify-center text-brand">
              <BookmarkPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900">
                Add a Property to Haven
              </h2>
              <p className="text-xs text-stone-500">
                Secure and manage your wealth.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress meter */}
        <div className="space-y-2 rounded-2xl bg-[#F9F9F8] border border-[#ECEEED] p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              <span>
                {milestone.emoji} {milestone.label}
              </span>
            </div>
            <span className="text-xs font-bold text-brand">{percent}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#ECEEED] overflow-hidden">
            <div
              className="h-full rounded-full bg-brand transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-[11px] text-stone-400">
            {filledCount} of {REQUIRED_FIELDS.length} details added
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wide">
              <Home className="w-3.5 h-3.5" />
              Basic Info
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700">
                Property Title
              </span>
              <Input
                required
                value={form.title}
                onChange={handleChange("title")}
                placeholder="e.g. 8 Camden Mews"
                className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700">
                Property Code
              </span>
              <Input
                required
                value={form.code}
                onChange={handleChange("code")}
                placeholder="e.g. CM-06"
                className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700">
                Property Address
              </span>
              <Input
                required
                value={form.address}
                onChange={handleChange("address")}
                placeholder="e.g. 8 Camden Mews, London NW1 9UX"
                className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700">
                Property Type
              </span>
              <select
                value={form.type}
                onChange={handleChange("type")}
                className="w-full h-10 px-3 text-xs bg-[#F9F9F8] border border-[#ECEEED] rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand/20"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Others">Others</option>
              </select>
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700">
                Property Sub-Type
              </span>
              <Input
                required
                value={form.subType}
                onChange={handleChange("subType")}
                placeholder="e.g. Terraced House"
                className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl"
              />
            </label>
          </div>

          {/* Section: Property Details */}
          <div className="space-y-4 pt-2 border-t border-[#ECEEED]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wide pt-4">
              <Ruler className="w-3.5 h-3.5" />
              Property Details
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-stone-700">
                  No. of Bedrooms
                </span>
                <Input
                  required
                  type="number"
                  min="0"
                  value={form.bedrooms}
                  onChange={handleChange("bedrooms")}
                  placeholder="e.g. 2"
                  className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-stone-700">
                  No. of Bathrooms
                </span>
                <Input
                  required
                  type="number"
                  min="0"
                  value={form.bathrooms}
                  onChange={handleChange("bathrooms")}
                  placeholder="e.g. 1"
                  className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-stone-700">
                  EPC Rating
                </span>
                <Input
                  required
                  value={form.epcRating}
                  onChange={handleChange("epcRating")}
                  placeholder="e.g. B"
                  className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-xs font-semibold text-stone-700">
                  Area
                </span>
                <Input
                  required
                  value={form.area}
                  onChange={handleChange("area")}
                  placeholder="e.g. 920 sq ft"
                  className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl"
                />
              </label>
            </div>
          </div>

          {/* Section: Financials */}
          <div className="space-y-4 pt-2 border-t border-[#ECEEED]">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 uppercase tracking-wide pt-4">
              <PoundSterling className="w-3.5 h-3.5" />
              Financials
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700">
                Valuation
              </span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">
                  £
                </span>
                <Input
                  required
                  type="number"
                  min="0"
                  value={form.valuation}
                  onChange={handleChange("valuation")}
                  placeholder="e.g. 850000"
                  className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl pl-6"
                />
              </div>
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-semibold text-stone-700">
                Monthly Rent
              </span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">
                  £
                </span>
                <Input
                  required
                  type="number"
                  min="0"
                  value={form.monthlyRent}
                  onChange={handleChange("monthlyRent")}
                  placeholder="e.g. 2450"
                  className="bg-[#F9F9F8] border-[#ECEEED] h-10 text-xs rounded-xl pl-6 pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-400 pointer-events-none">
                  / month
                </span>
              </div>
            </label>
          </div>

          {/* Section: Invite link */}
          <div className="pt-4 space-y-1.5 border-t border-[#ECEEED]">
            <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-brand" />
              Direct Magic Invite Link
            </span>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={inviteLink}
                className="bg-[#F9F9F8] text-[11px] font-mono h-9 text-stone-600 rounded-xl"
              />
              <Button
                type="button"
                onClick={handleCopy}
                variant="outline"
                aria-label="Copy invite link"
                className="h-9 px-3 text-xs shrink-0 rounded-xl border-[#ECEEED]"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ECEEED]">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl h-10 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-brand hover:bg-[#1E3A2E] text-white text-xs font-semibold h-10 px-5"
            >
              <Plus className="w-3.5 h-3.5 mr-2" />
              Add Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}