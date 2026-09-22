import React, { useState, useRef, useEffect } from "react"
import {
  Phone,
  Mail,
  MoreVertical,
  CheckCircle2,
  Download,
  CheckCheck,
  Paperclip,
  Camera,
  Send,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChatMessage } from "./communication-types"

interface MessageThreadProps {
  messages: ChatMessage[]
  onSendMessage: (text: string) => void
  onCallAgent: () => void
  onEmailAgent: () => void
}

export const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  onSendMessage,
  onCallAgent,
  onEmailAgent,
}) => {
  const [inputText, setInputText] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return
    onSendMessage(inputText.trim())
    setInputText("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col rounded-2xl bg-white border border-stone-200/80 shadow-sm overflow-hidden min-h-[640px]">
      {/* Thread Top Bar */}
      <div className="px-6 py-4 bg-stone-50 border-b border-stone-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvXgzdaCYJZ_xba_9cFbK8W30cehnMJJEMUqcoCcI_UzhYYhz4ZvwHMKTjWC5VJUiTMj4MAzUGKo9Ga3UcZG907pJnAoQbT6DjhsedR3Lcpz_I0a-ZZoBkYRZiDrwSs-snCRG2i-lUxYgvnO5EtbL5i_CYdpyhBUkKEdD2lerMRNaROdn18AwgWwM9zxOggfTrG5dmrnVIjFDxbe_QLHjYgcnEflMHqRa2vTvS1PKaafjk1i5Ha3lM"
              alt="Eleanor Vance"
              className="w-10 h-10 rounded-full object-cover shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-600 ring-2 ring-stone-50" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#132A20]">Eleanor Vance</span>
              <Badge className="bg-stone-200 text-stone-800 text-[9px] font-bold tracking-wider uppercase px-1.5 py-0">
                MARLA
              </Badge>
            </div>
            <p className="text-xs text-stone-500">Prime Heritage Management • Dedicated Lead Agent</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            onClick={onCallAgent}
            className="h-9 w-9 p-0 text-stone-600 hover:text-[#132A20] hover:bg-stone-100"
            title="Call Agent Direct"
          >
            <Phone className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={onEmailAgent}
            className="h-9 w-9 p-0 text-stone-600 hover:text-[#132A20] hover:bg-stone-100"
            title="Email Agent"
          >
            <Mail className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-9 w-9 p-0 text-stone-600 hover:text-[#132A20] hover:bg-stone-100"
            title="Thread Options"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Scrollable Message Stream */}
      <div
        ref={scrollRef}
        className="flex-1 p-6 flex flex-col gap-4 overflow-y-auto max-h-[580px] bg-stone-50/40"
      >
        <div className="flex items-center my-2">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="px-3 text-[11px] font-medium text-stone-500 bg-stone-100 py-1 rounded-full border border-stone-200/60">
            Monday, 14 October
          </span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        {messages.map((msg) => {
          const isTenant = msg.sender === "tenant"

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-[85%] ${
                isTenant ? "self-end flex-row-reverse ml-auto" : ""
              }`}
            >
              {!isTenant && (
                <img
                  src={
                    msg.senderAvatar ||
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuBi76tshMfvTJtxlpo3GTxD05yaHP8BFNxYMKGhx83QNpe7IsCxnXPT4WlOj6IH_2itDtYYpeGnHyIrW8vpSE2QW7UqroL_YGA91jy8rG2LkdtV2Y7KtajBYnxzI2jBIIV1fK562qMcMrW2lpzDRi5EaY_9qkoL4DhHwtJSAqsJR2a12XzcbdeYdLWxvpItuwJjEDehwC1IOK0Hhh_DhDuUFK3CgffBR-StLFTz8TXgd3XE7zbSnmmy"
                  }
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 mt-1 shadow-xs"
                />
              )}

              <div className={`flex flex-col gap-1 ${isTenant ? "items-end" : ""}`}>
                <div className="flex items-baseline gap-2 text-xs">
                  <span className="font-semibold text-[#132A20]">{msg.senderName}</span>
                  <span className="text-stone-400 text-[11px]">{msg.timestamp}</span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    isTenant
                      ? "rounded-tr-xs bg-[#132A20] text-white"
                      : "rounded-tl-xs bg-white text-stone-800 border border-stone-200/80"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Attachment Card */}
                  {msg.attachment && (
                    <div className="mt-3 pt-2 border-t border-stone-200/60 flex flex-col gap-2">
                      {msg.attachment.type === "pdf" ? (
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 hover:bg-stone-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-900">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-semibold text-xs text-[#132A20]">
                                {msg.attachment.name}
                              </p>
                              <p className="text-[10px] text-stone-500">{msg.attachment.size}</p>
                            </div>
                          </div>
                          <Download className="w-4 h-4 text-stone-500" />
                        </a>
                      ) : (
                        <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-xs">
                          <img
                            src={msg.attachment.previewUrl}
                            alt={msg.attachment.name}
                            className="w-full max-w-sm h-48 object-cover"
                          />
                          <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded text-white font-mono text-[10px]">
                            {msg.attachment.name} • {msg.attachment.size}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {isTenant && (
                  <div className="flex items-center gap-1 text-[11px] text-stone-400">
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Read {msg.timestamp}</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Message Composer */}
      <div className="p-4 bg-white border-t border-stone-200/80 flex flex-col gap-2">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="relative flex items-center bg-stone-50 rounded-xl px-4 py-2 border border-stone-200/80 focus-within:border-[#132A20] focus-within:bg-white transition-all">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message to Eleanor Vance..."
              rows={2}
              className="w-full bg-transparent resize-none focus:outline-none text-xs text-[#132A20] placeholder:text-stone-400 py-1"
            />
            <div className="flex items-center gap-1 pl-2 shrink-0">
              <Button
                type="button"
                variant="ghost"
                className="h-8 w-8 p-0 text-stone-500 hover:text-[#132A20] hover:bg-stone-200/60"
                title="Attach File"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-8 w-8 p-0 text-stone-500 hover:text-[#132A20] hover:bg-stone-200/60"
                title="Add Photo"
              >
                <Camera className="w-4 h-4" />
              </Button>
              <Button
                type="submit"
                className="h-9 px-4 rounded-xl bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 ml-1"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5 text-emerald-300" />
              </Button>
            </div>
          </div>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] text-stone-500 px-1">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Messages archived for compliance under UK Tenancy Regulations &amp; GDPR Tier 1 Ledger.</span>
          </div>
          <span className="font-mono text-stone-400 text-[10px]">ID: HAV-COMM-4B-8812</span>
        </div>
      </div>
    </div>
  )
}