"use client";

import React, { useRef, useState } from "react";
import { Paperclip, Send, FileText } from "lucide-react";
import { Message, initialMessages } from "./types";

export function MessageThread({ contactName }: { contactName: string }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: "tenant", text, time },
    ]);
    setDraft("");

    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-[#ECEEED] shadow-sm overflow-hidden min-h-[600px]">
      {/* Thread header */}
      <div className="px-5 py-4 bg-[#F9F9F8] border-b border-[#ECEEED] flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-brand/10 flex items-center justify-center text-brand font-semibold text-xs">
          {contactName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <span className="font-semibold text-sm text-stone-900">{contactName}</span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 p-5 flex flex-col gap-4 overflow-y-auto max-h-[520px]">
        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            {msg.dayLabel && (
              <div className="flex items-center my-1">
                <div className="flex-1 h-px bg-[#ECEEED]" />
                <span className="px-3 text-[11px] text-stone-400 bg-[#F9F9F8] py-1 rounded-full">
                  {msg.dayLabel}
                </span>
                <div className="flex-1 h-px bg-[#ECEEED]" />
              </div>
            )}
            <MessageBubble message={msg} />
          </React.Fragment>
        ))}
      </div>

      {/* Composer */}
      <div className="p-4 bg-white border-t border-[#ECEEED]">
        <div className="flex items-end gap-2 bg-[#F9F9F8] rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-brand transition-all">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder={`Type a message to ${contactName}...`}
            className="flex-1 bg-transparent resize-none focus:outline-none text-sm text-stone-800 placeholder:text-stone-400 py-1"
          />
          <button
            type="button"
            className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-white transition-colors"
            title="Attach a file or photo"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="px-4 py-2 rounded-lg bg-brand hover:bg-[#1E3A2E] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            Send
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[11px] text-stone-400 mt-2">
          Messages are kept for your tenancy records.
        </p>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isTenant = message.sender === "tenant";

  return (
    <div className={`flex flex-col gap-1 max-w-[80%] ${isTenant ? "self-end items-end" : "self-start items-start"}`}>
      <span className="text-[11px] text-stone-400">{message.time}</span>
      <div
        className={`p-3 rounded-2xl text-sm shadow-sm ${
          isTenant
            ? "bg-[#DCE5DE] text-stone-800 rounded-tr-sm"
            : "bg-[#F9F9F8] text-stone-800 rounded-tl-sm"
        }`}
      >
        <p>{message.text}</p>
        {message.attachment && (
          <div className="mt-2 flex items-center gap-2 p-2 rounded-xl bg-white/70">
            <div className="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center text-brand">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-stone-800 leading-tight">
                {message.attachment.name}
              </p>
              <p className="text-[11px] text-stone-400">{message.attachment.meta}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
