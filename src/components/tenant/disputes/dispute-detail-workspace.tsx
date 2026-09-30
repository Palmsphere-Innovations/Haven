"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Hourglass,
  Image as ImageIcon,
  FileText,
  Table,
  MessageSquare,
  Lock,
  Paperclip,
  Send,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DisputeChatMessage, DisputeRecord } from "@/types/index";

interface DisputeDetailWorkspaceProps {
  activeDispute?: DisputeRecord;
  chatMessages: DisputeChatMessage[];
  onSendMessage: (text: string) => void;
}

export const DisputeDetailWorkspace: React.FC<DisputeDetailWorkspaceProps> = ({
  activeDispute,
  chatMessages,
  onSendMessage,
}) => {
  const [replyText, setReplyText] = useState("");

  const handleSend = () => {
    if (!replyText.trim()) return;
    onSendMessage(replyText.trim());
    setReplyText("");
  };

  const isResolved = activeDispute?.status === "resolved";

  return (
    <div className="flex flex-col gap-6">
      {/* Primary Case Overview & Stepper Card */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-[#132A20]">
                CASE #{activeDispute?.reference || "DSP-2024-0982"}
              </span>
              <Badge
                className={`text-[10px] font-semibold ${
                  isResolved
                    ? "bg-emerald-100 text-emerald-900 border-emerald-200"
                    : "bg-amber-100 text-amber-900 border-amber-200"
                }`}
              >
                {activeDispute?.statusLabel || "Under Review"}
              </Badge>
            </div>
            <h2 className="text-lg font-bold text-stone-900 mt-1">
              {activeDispute?.title || "En-suite Radiator Remediation & Heating Interruption"}
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider block">
              Remedy Sought
            </span>
            <div className="text-sm font-bold font-mono text-[#132A20] mt-0.5">
              {activeDispute?.remedy || "Operational notation"}
            </div>
          </div>
        </div>

        {/* Resolved Outcome Banner if Resolved */}
        {isResolved && activeDispute?.outcome && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Case Settled &amp; Adjudicated ({activeDispute.settledTime || "Resolved"})</span>
            </div>
            <p className="leading-relaxed">{activeDispute.outcome}</p>
          </div>
        )}

        {/* Statutory Timeline Stepper */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Statutory Case Progress
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
            {/* Step 1 */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-stone-100 border border-stone-200/60 text-stone-800">
              <div className="flex items-center gap-1.5 text-[#132A20]">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold text-xs">1. Submitted</span>
              </div>
              <p className="text-[11px] text-stone-500">{activeDispute?.openedDate || "Logged"}</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-stone-100 border border-stone-200/60 text-stone-800">
              <div className="flex items-center gap-1.5 text-[#132A20]">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold text-xs">2. Triage</span>
              </div>
              <p className="text-[11px] text-stone-500">Evidence Admissible</p>
            </div>

            {/* Step 3 */}
            <div
              className={`flex flex-col gap-1 p-3 rounded-xl border ${
                isResolved
                  ? "bg-stone-100 border-stone-200/60 text-stone-800"
                  : "bg-amber-50 border-amber-200 text-amber-900"
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold text-xs">
                {isResolved ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                ) : (
                  <Hourglass className="w-4 h-4 text-amber-600 animate-spin" />
                )}
                <span>3. Adjudication</span>
              </div>
              <p className="text-[11px] text-stone-500">
                {isResolved ? "Mutual Accord" : "Under Evaluation"}
              </p>
            </div>

            {/* Step 4 */}
            <div
              className={`flex flex-col gap-1 p-3 rounded-xl border ${
                isResolved
                  ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                  : "bg-stone-50 border-stone-200/50 text-stone-400"
              }`}
            >
              <div className="flex items-center gap-1.5 font-semibold text-xs">
                <CheckCircle2
                  className={`w-4 h-4 ${isResolved ? "text-emerald-700" : "text-stone-300"}`}
                />
                <span>4. Settled</span>
              </div>
              <p className="text-[11px] text-stone-500">
                {isResolved ? "Formal Sign-off" : "Pending Order"}
              </p>
            </div>
          </div>
        </div>

        {/* Evidence Exhibits Attached */}
        <div className="flex flex-col gap-2 pt-2 border-t border-stone-100">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
            Certified Exhibits on File
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0">
                <ImageIcon className="w-4 h-4 text-emerald-800" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs text-[#132A20] truncate">
                  Exhibit_A_Photographs.jpg
                </p>
                <span className="text-[10px] text-stone-400">Timestamped Proof</span>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-emerald-800" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs text-[#132A20] truncate">
                  Engineer_JobSheet.pdf
                </p>
                <span className="text-[10px] text-stone-400">Certified Diagnostic</span>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-stone-200/80 bg-stone-50/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center shrink-0">
                <Table className="w-4 h-4 text-emerald-800" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-xs text-[#132A20] truncate">
                  Tenancy_Schedule_Extract.csv
                </p>
                <span className="text-[10px] text-stone-400">Ledger Cross-check</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Discussion Thread & ADR Messages */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-800" />
            <h3 className="text-sm font-bold text-stone-900">
              Formal Case Arbitration Log
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Lock className="w-3 h-3" /> Privileged &amp; Confidential
          </span>
        </div>

        {/* Message Log */}
        <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
          {chatMessages.map((msg) => {
            const isTenant = msg.sender === "tenant";
            return (
              <div
                key={msg.id}
                className={`p-3.5 rounded-2xl flex flex-col gap-1 text-xs leading-relaxed ${
                  isTenant
                    ? "bg-[#132A20] text-white self-end max-w-[85%] rounded-tr-xs"
                    : "bg-stone-50 text-stone-800 self-start max-w-[85%] rounded-tl-xs border border-stone-200/60"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`font-bold ${isTenant ? "text-emerald-300" : "text-stone-900"}`}
                  >
                    {msg.senderName}
                  </span>
                  <span
                    className={`text-[10px] ${isTenant ? "text-stone-300" : "text-stone-400"}`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
                <p className="mt-0.5">{msg.text}</p>
              </div>
            );
          })}
        </div>

        {/* Reply Composer */}
        <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Submit formal clarification or response to adjudicator..."
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#132A20]/20 focus:bg-white"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!replyText.trim()}
            className="px-4 py-2 bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};