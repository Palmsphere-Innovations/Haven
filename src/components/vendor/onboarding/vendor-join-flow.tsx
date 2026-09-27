"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Flame,
  Zap,
  Wrench,
  KeyRound,
  Home,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { directoryListings, DirectoryListing } from "@/lib/mock/vendor-directory";

type Pathway = "new" | "claim";

const TRADE_OPTIONS = [
  { value: "Gas & Heating", label: "Gas & Central Heating", icon: Flame, reqCert: "Gas Safe Register" },
  { value: "Electrical", label: "Electrical & Fire Safety", icon: Zap, reqCert: "NICEIC / NAPIT" },
  { value: "Plumbing", label: "Plumbing & Drainage", icon: Wrench, reqCert: "CIPHE / WaterSafe" },
  { value: "Locksmith & Security", label: "Locksmith & Access Security", icon: KeyRound, reqCert: "MLA Master Locksmiths" },
  { value: "Roofing & External", label: "Roofing, Gutters & Envelope", icon: Home, reqCert: "NFRC / CompetentRoofer" },
  { value: "General Building", label: "General Building & Carpentry", icon: Building2, reqCert: "TrustMark / FMB" },
];

export const VendorJoinFlow: React.FC = () => {
  const router = useRouter();
  const [activePathway, setActivePathway] = useState<Pathway>("new");

  // New Vendor Form State
  const [formData, setFormData] = useState({
    companyName: "",
    tradingName: "",
    companyNumber: "",
    vatNumber: "",
    primaryTrade: "Gas & Heating",
    accreditationBody: "Gas Safe Register",
    accreditationNumber: "",
    accreditationExpiry: "2027-04-30",
    insuranceCover: "£5,000,000",
    insurancePolicyNumber: "",
    insurer: "Aviva Commercial",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    postcode: "",
    serviceRadius: "15 miles",
    emergencyAvailable: true,
    agreeTerms: true,
  });

  // Claim Listing State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTradeFilter, setSelectedTradeFilter] = useState("all");
  const [selectedListing, setSelectedListing] = useState<DirectoryListing | null>(null);
  const [claimStep, setClaimStep] = useState<"select" | "verify" | "confirmed">("select");
  const [verificationCode, setVerificationCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedRef, setCompletedRef] = useState("");

  // Filter listings
  const filteredListings = directoryListings.filter((item) => {
    const matchesSearch =
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.primaryTrade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.postcode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTrade =
      selectedTradeFilter === "all" ||
      item.primaryTrade.toLowerCase().includes(selectedTradeFilter.toLowerCase());

    return matchesSearch && matchesTrade;
  });

  const handleNewVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactEmail || !formData.accreditationNumber) {
      alert("Please complete all required verification fields marked with *");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCompletedRef(`HVN-VND-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsCompleted(true);
    }, 1100);
  };

  const handleSendCode = () => {
    setCodeSent(true);
    setVerificationCode("849201");
  };

  const handleConfirmClaim = () => {
    if (!verificationCode || verificationCode.length < 6) {
      setVerifyError("Please enter the 6-digit verification security code.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCompletedRef(`HVN-VND-${selectedListing?.companyNumber.slice(0, 6) || "948102"}`);
      setIsCompleted(true);
    }, 900);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Top Breadcrumb / Return */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          <span>← Back to Haven Overview</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Statutory Trade & Insurance Verification</span>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Header Banner */}
        <div className="bg-[#132A20] text-white p-7 sm:p-9 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider uppercase text-emerald-300 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Contractor & Trade Partner Network
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Join Haven as a Verified Vendor
            </h1>
            <p className="mt-2 text-sm text-stone-300 leading-relaxed">
              Connect directly with premium UK property portfolios, institutional landlords, and letting agents. Receive pre-authorized work orders with guaranteed payment escrows.
            </p>
          </div>
          {/* Subtle geometric pattern accent */}
          <div className="absolute right-0 top-0 bottom-0 w-80 opacity-10 pointer-events-none hidden md:flex items-center justify-end pr-8">
            <Building2 className="w-64 h-64 text-white" />
          </div>
        </div>

        {/* Pathway Segmented Selector */}
        {!isCompleted && (
          <div className="border-b border-stone-200 bg-stone-50/80 px-6 sm:px-9 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-600 block">
                  Select Onboarding Route
                </span>
                <span className="text-xs text-stone-500">
                  Choose whether to register new trade credentials or link an existing profile
                </span>
              </div>

              <div className="inline-flex p-1 bg-stone-200/70 rounded-xl max-w-md w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setActivePathway("new");
                    setSelectedListing(null);
                    setClaimStep("select");
                  }}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activePathway === "new"
                      ? "bg-white text-stone-900 shadow-xs font-semibold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 text-stone-700" />
                  <span>I&apos;m a new vendor</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActivePathway("claim");
                    setClaimStep("select");
                  }}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    activePathway === "claim"
                      ? "bg-white text-stone-900 shadow-xs font-semibold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-stone-700" />
                  <span>Claim existing listing</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 sm:p-9">
          {/* Completed State */}
          {isCompleted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10 max-w-xl mx-auto"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl font-semibold text-stone-900">
                {activePathway === "new" ? "Verification Pack Submitted" : "Listing Successfully Claimed"}
              </h2>
              <p className="mt-2 text-sm text-stone-600 leading-relaxed">
                Your contractor record has been verified and registered on the Haven Property Network. Your compliance badge is now live for dispatched works.
              </p>

              <div className="my-6 p-4 rounded-xl bg-stone-50 border border-stone-200 text-left space-y-2">
                <div className="flex justify-between text-xs py-1 border-b border-stone-200/80">
                  <span className="text-stone-500">Haven Contractor ID</span>
                  <span className="font-mono font-semibold text-stone-900">{completedRef}</span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-stone-200/80">
                  <span className="text-stone-500">Primary Trade</span>
                  <span className="font-medium text-stone-900">
                    {activePathway === "new" ? formData.primaryTrade : selectedListing?.primaryTrade}
                  </span>
                </div>
                <div className="flex justify-between text-xs py-1 border-b border-stone-200/80">
                  <span className="text-stone-500">Compliance & Accreditation</span>
                  <span className="font-medium text-emerald-700">
                    {activePathway === "new"
                      ? `${formData.accreditationBody} (${formData.accreditationNumber || "Verified"})`
                      : `${selectedListing?.accreditationBody} (${selectedListing?.accreditationNumber})`}
                  </span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-stone-500">Public Liability Escrow</span>
                  <span className="font-medium text-stone-900">
                    {activePathway === "new" ? formData.insuranceCover : selectedListing?.publicLiabilityCover} Active
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  onClick={() => router.push("/vendor/dashboard")}
                  className="w-full sm:w-auto bg-[#132A20] text-white hover:bg-[#0d1d16] px-6 py-2.5 rounded-xl cursor-pointer"
                >
                  Enter Vendor Portal Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/vendor/jobs")}
                  className="w-full sm:w-auto border-stone-300 text-stone-700 hover:bg-stone-50 px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  View Open Dispatched Jobs
                </Button>
              </div>
            </motion.div>
          ) : activePathway === "new" ? (
            /* ========================================================================= */
            /* PATHWAY 1: I'M A NEW VENDOR (CONTRACTOR VERIFICATION DETAILS FORM)        */
            /* ========================================================================= */
            <form onSubmit={handleNewVendorSubmit} className="space-y-8">
              {/* Intro Note */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 text-xs leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-emerald-900">Mandatory Statutory Onboarding: </span>
                  Under UK landlord statutory maintenance guidelines, contractors must supply current Public Liability Insurance and relevant trade accreditations (e.g. Gas Safe Register for gas appliances, NICEIC for electrical works).
                </div>
              </div>

              {/* Group 1: Business Identification */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-2">
                  <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">
                    1. Business Identification
                  </h3>
                  <p className="text-xs text-stone-500">
                    Registered Companies House or sole trader details
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Company Legal Name *
                    </Label>
                    <Input
                      id="companyName"
                      required
                      placeholder="e.g. Camden Heating & Mechanical Ltd"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="text-xs border-stone-300 focus:border-[#132A20] focus:ring-[#132A20]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tradingName" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Trading Name (if different)
                    </Label>
                    <Input
                      id="tradingName"
                      placeholder="e.g. Camden Heat 24/7"
                      value={formData.tradingName}
                      onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                      className="text-xs border-stone-300 focus:border-[#132A20] focus:ring-[#132A20]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyNumber" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Companies House Number or Sole Trader UTR *
                    </Label>
                    <Input
                      id="companyNumber"
                      required
                      placeholder="8-digit CRN or 10-digit UTR"
                      value={formData.companyNumber}
                      onChange={(e) => setFormData({ ...formData, companyNumber: e.target.value })}
                      className="text-xs border-stone-300 font-mono focus:border-[#132A20] focus:ring-[#132A20]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="vatNumber" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      UK VAT Registration Number (Optional)
                    </Label>
                    <Input
                      id="vatNumber"
                      placeholder="e.g. GB 123 4567 89"
                      value={formData.vatNumber}
                      onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                      className="text-xs border-stone-300 font-mono focus:border-[#132A20] focus:ring-[#132A20]"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Trade & Statutory Credentials */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-2">
                  <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">
                    2. Primary Trade & Regulatory Credentials
                  </h3>
                  <p className="text-xs text-stone-500">
                    Accreditation body verifying statutory compliance
                  </p>
                </div>

                <div>
                  <Label className="text-xs font-medium text-stone-700 mb-2 block">
                    Select Primary Trade Discipline *
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {TRADE_OPTIONS.map((trade) => {
                      const Icon = trade.icon;
                      const isSelected = formData.primaryTrade === trade.value;
                      return (
                        <button
                          key={trade.value}
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              primaryTrade: trade.value,
                              accreditationBody: trade.reqCert,
                            })
                          }
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "border-[#132A20] bg-stone-50/80 ring-1 ring-[#132A20]"
                              : "border-stone-200 hover:border-stone-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon className={`w-4 h-4 ${isSelected ? "text-[#132A20]" : "text-stone-500"}`} />
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#132A20]" />}
                          </div>
                          <div>
                            <span className="text-xs font-medium text-stone-900 block">
                              {trade.label}
                            </span>
                            <span className="text-[10px] text-stone-500 block truncate">
                              Req: {trade.reqCert}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <Label htmlFor="accreditationBody" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Accreditation Body *
                    </Label>
                    <Input
                      id="accreditationBody"
                      required
                      value={formData.accreditationBody}
                      onChange={(e) => setFormData({ ...formData, accreditationBody: e.target.value })}
                      className="text-xs border-stone-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="accreditationNumber" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      License / Registration # *
                    </Label>
                    <Input
                      id="accreditationNumber"
                      required
                      placeholder="e.g. 502188"
                      value={formData.accreditationNumber}
                      onChange={(e) => setFormData({ ...formData, accreditationNumber: e.target.value })}
                      className="text-xs border-stone-300 font-mono"
                    />
                  </div>

                  <div>
                    <Label htmlFor="accreditationExpiry" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Renewal / Expiry Date *
                    </Label>
                    <Input
                      id="accreditationExpiry"
                      type="date"
                      required
                      value={formData.accreditationExpiry}
                      onChange={(e) => setFormData({ ...formData, accreditationExpiry: e.target.value })}
                      className="text-xs border-stone-300"
                    />
                  </div>
                </div>
              </div>

              {/* Group 3: Insurance & Liability Cover */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-2">
                  <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">
                    3. Public Liability & Indemnity Insurance
                  </h3>
                  <p className="text-xs text-stone-500">
                    Minimum £2M required for dispatch across Haven managed portfolios
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Public Liability Limit *
                    </Label>
                    <select
                      value={formData.insuranceCover}
                      onChange={(e) => setFormData({ ...formData, insuranceCover: e.target.value })}
                      className="w-full text-xs rounded-lg border border-stone-300 px-3 py-2 bg-white focus:border-[#132A20] focus:ring-1 focus:ring-[#132A20]"
                    >
                      <option value="£2,000,000">£2,000,000 (Standard Commercial)</option>
                      <option value="£5,000,000">£5,000,000 (Recommended Tier 1)</option>
                      <option value="£10,000,000">£10,000,000 (Major Works)</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="insurer" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Underwriter / Broker *
                    </Label>
                    <Input
                      id="insurer"
                      required
                      placeholder="e.g. Aviva / AXA / Hiscox"
                      value={formData.insurer}
                      onChange={(e) => setFormData({ ...formData, insurer: e.target.value })}
                      className="text-xs border-stone-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="insurancePolicyNumber" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Policy Schedule Number *
                    </Label>
                    <Input
                      id="insurancePolicyNumber"
                      required
                      placeholder="e.g. AV-COM-883921"
                      value={formData.insurancePolicyNumber}
                      onChange={(e) => setFormData({ ...formData, insurancePolicyNumber: e.target.value })}
                      className="text-xs border-stone-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Group 4: Operations & Contact */}
              <div className="space-y-4">
                <div className="border-b border-stone-200 pb-2">
                  <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">
                    4. Operational Coverage & Primary Dispatch Contact
                  </h3>
                  <p className="text-xs text-stone-500">
                    Dispatch notifications and emergency service area
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contactName" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Lead Dispatcher / Contact Name *
                    </Label>
                    <Input
                      id="contactName"
                      required
                      placeholder="e.g. David Morrison"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="text-xs border-stone-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Dispatch Work Email *
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      required
                      placeholder="dispatch@yourcompany.co.uk"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="text-xs border-stone-300"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactPhone" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Direct UK Mobile / Hotline *
                    </Label>
                    <Input
                      id="contactPhone"
                      required
                      placeholder="+44 7700 900123"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="text-xs border-stone-300 font-mono"
                    />
                  </div>

                  <div>
                    <Label htmlFor="postcode" className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Base Postcode *
                    </Label>
                    <Input
                      id="postcode"
                      required
                      placeholder="e.g. SW1A 1AA or W2 4QH"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="text-xs border-stone-300 uppercase"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-stone-700 mb-1.5 block">
                      Service Radius
                    </Label>
                    <select
                      value={formData.serviceRadius}
                      onChange={(e) => setFormData({ ...formData, serviceRadius: e.target.value })}
                      className="w-full text-xs rounded-lg border border-stone-300 px-3 py-2 bg-white focus:border-[#132A20]"
                    >
                      <option value="5 miles">Up to 5 miles</option>
                      <option value="15 miles">Up to 15 miles (Standard)</option>
                      <option value="Greater London">All Greater London (M25)</option>
                      <option value="Regional">Regional (South East)</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-stone-800">
                      <input
                        type="checkbox"
                        checked={formData.emergencyAvailable}
                        onChange={(e) => setFormData({ ...formData, emergencyAvailable: e.target.checked })}
                        className="rounded border-stone-300 text-[#132A20] focus:ring-[#132A20]"
                      />
                      <span>Available for 24/7 Emergency Out-of-Hours Callouts</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Action Bar */}
              <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-500">
                  By submitting, you certify that insurance and registration numbers are valid under UK laws.
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-[#132A20] text-white hover:bg-[#0c1c15] px-8 py-2.5 rounded-xl cursor-pointer shadow-xs font-medium"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting Verification Pack...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Submit Verification & Register
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          ) : (
            /* ========================================================================= */
            /* PATHWAY 2: CLAIM AN EXISTING LISTING                                     */
            /* ========================================================================= */
            <div className="space-y-6">
              {claimStep === "select" ? (
                <>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search company name, Companies House number, or trade..."
                        className="pl-9 text-xs border-stone-300 rounded-xl"
                      />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedTradeFilter("all")}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          selectedTradeFilter === "all"
                            ? "bg-stone-900 text-white border-stone-900"
                            : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        All Trades
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTradeFilter("Gas")}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          selectedTradeFilter === "Gas"
                            ? "bg-stone-900 text-white border-stone-900"
                            : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        Gas & Heating
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTradeFilter("Electrical")}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          selectedTradeFilter === "Electrical"
                            ? "bg-stone-900 text-white border-stone-900"
                            : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        Electrical
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTradeFilter("Locksmith")}
                        className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                          selectedTradeFilter === "Locksmith"
                            ? "bg-stone-900 text-white border-stone-900"
                            : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        Locksmith
                      </button>
                    </div>
                  </div>

                  {/* Listings Grid */}
                  <div className="space-y-3">
                    {filteredListings.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-stone-300 rounded-xl bg-stone-50/50">
                        <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                        <h4 className="text-sm font-semibold text-stone-800">No matching contractor listings found</h4>
                        <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
                          We couldn&apos;t find an existing record with that name or registration number.
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setActivePathway("new")}
                          className="mt-4 text-xs cursor-pointer"
                        >
                          Register as a New Vendor instead
                        </Button>
                      </div>
                    ) : (
                      filteredListings.map((listing) => (
                        <div
                          key={listing.id}
                          className="p-4 rounded-xl border border-stone-200 hover:border-stone-300 hover:shadow-xs transition-all bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-semibold text-stone-900">
                                {listing.companyName}
                              </h4>
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                Verified Trade
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                              <span>CRN: <span className="font-mono text-stone-700">{listing.companyNumber}</span></span>
                              <span>•</span>
                              <span>Trade: <span className="text-stone-800 font-medium">{listing.primaryTrade}</span></span>
                              <span>•</span>
                              <span>{listing.registeredAddress}, {listing.postcode}</span>
                            </div>
                            <div className="text-xs text-stone-600 pt-0.5 flex items-center gap-3">
                              <span className="text-emerald-700 font-medium">
                                {listing.accreditationBody} ({listing.accreditationNumber})
                              </span>
                              <span>·</span>
                              <span>PL: {listing.publicLiabilityCover}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                            <div className="text-right hidden md:block">
                              <div className="text-xs font-semibold text-stone-900">
                                {listing.completedJobs} jobs completed
                              </div>
                              <div className="text-[11px] text-stone-500">
                                Rating: ★ {listing.rating}
                              </div>
                            </div>
                            <Button
                              onClick={() => {
                                setSelectedListing(listing);
                                setClaimStep("verify");
                                setCodeSent(false);
                                setVerificationCode("");
                                setVerifyError("");
                              }}
                              className="bg-[#132A20] text-white hover:bg-[#0c1c15] text-xs px-4 py-2 rounded-xl cursor-pointer"
                            >
                              Claim this Profile
                              <ChevronRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                /* Verification Step */
                selectedListing && (
                  <div className="max-w-xl mx-auto py-2">
                    <button
                      type="button"
                      onClick={() => setClaimStep("select")}
                      className="text-xs text-stone-500 hover:text-stone-900 mb-4 inline-flex items-center gap-1 cursor-pointer"
                    >
                      ← Back to listings search
                    </button>

                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 mb-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                            Claiming Listing Record
                          </div>
                          <h3 className="text-base font-semibold text-stone-900 mt-1">
                            {selectedListing.companyName}
                          </h3>
                          <div className="text-xs text-stone-600 mt-0.5">
                            CRN: <span className="font-mono">{selectedListing.companyNumber}</span> • {selectedListing.primaryTrade}
                          </div>
                        </div>
                        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-stone-900">
                          Security Verification Step
                        </h4>
                        <p className="text-xs text-stone-500 mt-1">
                          To protect verified trade accounts, we authenticate ownership by sending a security passcode to the registered contact on file.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
                        <div className="text-xs text-stone-700">
                          Registered Director / Dispatcher:{" "}
                          <span className="font-semibold text-stone-900">{selectedListing.contactName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-600">
                          <Mail className="w-3.5 h-3.5 text-stone-400" />
                          <span>Dispatch Email: {selectedListing.contactEmailMasked}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-stone-600">
                          <Phone className="w-3.5 h-3.5 text-stone-400" />
                          <span>Mobile Hotline: {selectedListing.contactPhoneMasked}</span>
                        </div>

                        {!codeSent ? (
                          <div className="pt-2">
                            <Button
                              type="button"
                              onClick={handleSendCode}
                              className="w-full bg-[#132A20] text-white hover:bg-[#0c1c15] text-xs py-2.5 rounded-xl cursor-pointer"
                            >
                              Dispatch One-Time Security PIN
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3 pt-2">
                            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center justify-between">
                              <span>Security PIN sent to registered email & phone!</span>
                              <button
                                type="button"
                                onClick={() => setVerificationCode("849201")}
                                className="text-[10px] underline font-semibold text-emerald-900 hover:text-emerald-950 cursor-pointer"
                              >
                                Autofill Demo PIN (849201)
                              </button>
                            </div>

                            <div>
                              <Label htmlFor="verificationCode" className="text-xs font-medium text-stone-700 mb-1.5 block">
                                Enter 6-Digit Verification PIN
                              </Label>
                              <Input
                                id="verificationCode"
                                maxLength={6}
                                value={verificationCode}
                                onChange={(e) => {
                                  setVerificationCode(e.target.value);
                                  setVerifyError("");
                                }}
                                placeholder="849201"
                                className="font-mono text-center tracking-widest text-base border-stone-300 h-11"
                              />
                              {verifyError && (
                                <p className="text-xs text-red-600 mt-1">{verifyError}</p>
                              )}
                            </div>

                            <Button
                              type="button"
                              onClick={handleConfirmClaim}
                              disabled={isSubmitting}
                              className="w-full bg-[#132A20] text-white hover:bg-[#0c1c15] text-xs py-2.5 rounded-xl cursor-pointer"
                            >
                              {isSubmitting ? "Verifying Credentials..." : "Authenticate & Link Listing"}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Security & Regulatory Footnote */}
      <div className="mt-8 text-center text-xs text-stone-400 max-w-lg mx-auto leading-relaxed">
        Haven complies with UK PRS (Private Rented Sector) statutory compliance directives and ensures all active contractors maintain active insurance and accreditation certificates.
      </div>
    </div>
  );
};
