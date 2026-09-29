"use client";

import React, { useRef, useState, useEffect } from "react";
import { Paperclip, Send, FileText, X, CheckCircle2 } from "lucide-react";
import { Message, initialMessages } from "./types";

interface MessageThreadProps {
  contactName: string;
  prefillDraft?: string;
}

export function MessageThread({ contactName, prefillDraft }: MessageThreadProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState(prefillDraft || "");
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefillDraft) {
      setDraft(prefillDraft);
    }
  }, [prefillDraft]);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }
    });
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text && !attachedFile) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newTenantMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "tenant",
      text: text || "Sent an attachment.",
      time,
      attachment: attachedFile
        ? {
            name: attachedFile.name,
            meta: attachedFile.size,
            kind: "file",
          }
        : undefined,
    };

    setMessages((prev) => [...prev, newTenantMsg]);
    setDraft("");
    setAttachedFile(null);
    scrollToBottom();

    // Trigger simulated agent response after 1.4s
    setIsAgentTyping(true);
    setTimeout(() => {
      setIsAgentTyping(false);
      const agentNow = new Date();
      const agentTime = agentNow.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      let replyText = `Thanks Oliver, I have received your message regarding Flat 4B and am looking into this now. I will update you promptly.`;
      if (text.toLowerCase().includes("rent") || text.toLowerCase().includes("payment")) {
        replyText = `Hi Oliver, thanks for getting in touch about your rent schedule. Your next Direct Debit of £2,450.00 is currently queued for 01 Nov 2024. Let me know if you need any adjustments made.`;
      } else if (text.toLowerCase().includes("repair") || text.toLowerCase().includes("leak") || text.toLowerCase().includes("radiator")) {
        replyText = `Hi Oliver, I see your note. Apex Heating has been assigned to your ticket and the engineer is scheduled for this week.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-agent-${Date.now()}`,
          sender: "agent",
          text: replyText,
          time: agentTime,
        },
      ]);
      scrollToBottom();
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFile({
        name: file.name,
        size: `${(file.size / 1024).toFixed(0)} KB`,
      });
    }
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-[#ECEEED] shadow-xs overflow-hidden min-h-[600px]">
      {/* Thread header */}
      <div className="px-5 py-4 bg-[#F9F9F8] border-b border-[#ECEEED] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#132A20] text-white flex items-center justify-center font-bold text-xs">
            {contactName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <span className="font-bold text-sm text-stone-900 block leading-tight">{contactName}</span>
            <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online • Responds usually within 2 hrs
            </span>
          </div>
        </div>
        <span className="text-[11px] font-mono text-stone-400 bg-white px-2.5 py-1 rounded-md border border-stone-200">
          Encrypted Tenancy Channel
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto max-h-[500px]">
        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            {msg.dayLabel && (
              <div className="flex items-center my-1">
                <div className="flex-1 h-px bg-[#ECEEED]" />
                <span className="px-3 text-[11px] text-stone-500 bg-[#F9F9F8] py-0.5 rounded-full font-medium">
                  {msg.dayLabel}
                </span>
                <div className="flex-1 h-px bg-[#ECEEED]" />
              </div>
            )}
            <MessageBubble message={msg} />
          </React.Fragment>
        ))}

        {isAgentTyping && (
          <div className="self-start flex items-center gap-1.5 text-xs text-stone-400 bg-stone-50 px-3 py-2 rounded-2xl border border-stone-200">
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-stone-400 animate-bounce [animation-delay:0.4s]" />
            <span className="text-[11px] text-stone-500 ml-1">{contactName} is typing...</span>
          </div>
        )}
      </div>

      {/* Quick suggested chips */}
      <div className="px-4 py-2 bg-stone-50 border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <span className="text-stone-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
          Quick:
        </span>
        {[
          "Confirming Thursday access window",
          "Can you send the updated gas cert?",
          "Rent payment is scheduled via Direct Debit",
        ].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setDraft(chip)}
            className="px-2.5 py-1 rounded-full bg-white border border-stone-200 hover:border-[#132A20] text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="p-4 bg-white border-t border-[#ECEEED] space-y-2">
        {attachedFile && (
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-800">
            <FileText className="w-3.5 h-3.5 text-emerald-800" />
            <span className="font-medium truncate max-w-[200px]">{attachedFile.name}</span>
            <span className="text-[10px] text-stone-400">({attachedFile.size})</span>
            <button
              type="button"
              onClick={() => setAttachedFile(null)}
              className="text-stone-400 hover:text-rose-600 transition-colors ml-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="flex items-end gap-2 bg-[#F9F9F8] rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#132A20]/20 transition-all border border-stone-200">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder={`Type a message to ${contactName}... (Press Enter to send)`}
            className="flex-1 bg-transparent resize-none focus:outline-none text-xs text-stone-800 placeholder:text-stone-400 py-1 leading-relaxed"
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 transition-colors cursor-pointer"
            title="Attach a file or photo"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={!draft.trim() && !attachedFile}
            className="px-4 py-2 rounded-xl bg-[#132A20] hover:bg-[#1a382b] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-40"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-[10px] text-stone-400">
          All communications are logged and timestamped under your tenancy audit docket.
        </p>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isTenant = message.sender === "tenant";

  return (
    <div
      className={`flex flex-col gap-1 max-w-[80%] ${
        isTenant ? "self-end items-end" : "self-start items-start"
      }`}
    >
      <span className="text-[10px] text-stone-400 px-1">{message.time}</span>
      <div
        className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
          isTenant
            ? "bg-[#132A20] text-white rounded-tr-xs"
            : "bg-[#F4F6F5] text-stone-900 rounded-tl-xs border border-stone-200/60"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.text}</p>
        {message.attachment && (
          <div
            className={`mt-2 flex items-center gap-2 p-2 rounded-xl ${
              isTenant ? "bg-white/10 text-white" : "bg-white border border-stone-200"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                isTenant ? "bg-white/20 text-white" : "bg-[#E8EFEA] text-[#2A5240]"
              }`}
            >
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">{message.attachment.name}</p>
              <p className={`text-[10px] ${isTenant ? "text-stone-300" : "text-stone-400"}`}>
                {message.attachment.meta}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
