import React, { useState } from "react"
import {
  CheckCircle2,
  RefreshCw,
  Hourglass,
  Image as ImageIcon,
  FileText,
  Table,
  MessageSquare,
  Lock,
  Paperclip,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DisputeChatMessage } from "@/types/index"

interface DisputeDetailWorkspaceProps {
  chatMessages: DisputeChatMessage[]
  onSendMessage: (text: string) => void
}

export const DisputeDetailWorkspace: React.FC<DisputeDetailWorkspaceProps> = ({
  chatMessages,
  onSendMessage,
}) => {
  const [replyText, setReplyText] = useState("")

  const handleSend = () => {
    if (!replyText.trim()) return
    onSendMessage(replyText.trim())
    setReplyText("")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Primary Case Overview & Stepper Card */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-[#132A20]">CASE #DSP-2024-0982</span>
              <Badge className="bg-amber-100 text-amber-900 border-amber-200 text-[10px] font-medium">
                Under Review
              </Badge>
            </div>
            <h2 className="text-lg font-semibold text-[#132A20] mt-1">
              En-suite Radiator Remediation &amp; Heating Interruption
            </h2>
          </div>
          <div className="text-right sm:self-auto">
            <span className="text-[10px] font-semibold text-stone-500 uppercase">
              Proposed Settlement
            </span>
            <div className="text-xl font-bold font-mono text-[#132A20]">£185.00</div>
          </div>
        </div>

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
              <span className="text-[11px] text-stone-500">04 Oct 2024 • 09:15</span>
              <span className="text-[11px] text-stone-600">Tenant claim logged with 2 exhibits</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-stone-100 border border-stone-200/60 text-stone-800">
              <div className="flex items-center gap-1.5 text-[#132A20]">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span className="font-semibold text-xs">2. Acknowledged</span>
              </div>
              <span className="text-[11px] text-stone-500">04 Oct 2024 • 11:30</span>
              <span className="text-[11px] text-stone-600">Eleanor Vance forwarded to Apex</span>
            </div>

            {/* Step 3 (Current) */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-[#132A20] text-white">
              <div className="flex items-center gap-1.5 text-emerald-300">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="font-semibold text-xs">3. Assessment</span>
              </div>
              <span className="text-[11px] text-stone-300">08 Oct 2024 • 14:20</span>
              <span className="text-[11px] text-stone-300">Diagnostics attached &amp; landlord review</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-stone-50 border border-stone-200/60 text-stone-400">
              <div className="flex items-center gap-1.5">
                <Hourglass className="w-4 h-4 text-stone-400" />
                <span className="font-medium text-xs">4. Resolution</span>
              </div>
              <span className="text-[11px]">Est. 18 Oct 2024</span>
              <span className="text-[11px]">Agreed adjustment / credit applied</span>
            </div>
          </div>
        </div>

        {/* Grounds Statement */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/60 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#132A20]">
              Grounds of Claim
            </span>
            <span className="text-[11px] text-stone-500">Landlord &amp; Tenant Act 1985 (Section 11)</span>
          </div>
          <p className="text-xs text-stone-800 italic leading-relaxed">
            &ldquo;Radiator valve failed on 28 Sep causing lack of heating in primary bedroom for 6 days prior to temporary repair. Tenant requesting agreed statutory rent adjustment of £185.00 for space heating outage and electric radiator electricity overhead.&rdquo;
          </p>
        </div>

        {/* Submitted Exhibits */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
              Submitted Exhibits &amp; Diagnostics (3)
            </span>
            <span className="text-[11px] text-stone-500">All files cryptographically hashed</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-[#132A20] shrink-0">
                <ImageIcon className="w-4 h-4 text-emerald-800" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs text-[#132A20] truncate">Radiator_Valve_Leak.jpg</span>
                <span className="text-[10px] text-stone-500">2.4 MB • High Res</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-[#132A20] shrink-0">
                <FileText className="w-4 h-4 text-red-700" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs text-[#132A20] truncate">Apex_Heating_JobSheet.pdf</span>
                <span className="text-[10px] text-stone-500">840 KB • Certified</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors border border-stone-200/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-[#132A20] shrink-0">
                <Table className="w-4 h-4 text-stone-600" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs text-[#132A20] truncate">Temperature_Log_Oct.csv</span>
                <span className="text-[10px] text-stone-500">14 KB • Sensor Dump</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formal Mediation Conversation Thread */}
      <div className="rounded-2xl bg-white border border-stone-200/80 shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-800" />
            <h3 className="text-sm font-semibold text-[#132A20]">Mediation Thread &amp; Statutory Notes</h3>
          </div>
          <span className="text-xs text-stone-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600" /> Active Channel
          </span>
        </div>

        <div className="flex flex-col gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200/60">
          <div className="flex justify-center">
            <span className="px-3 py-1 rounded-full bg-white text-stone-500 text-[11px] font-medium border border-stone-200/80">
              Formal Case Initiated • 04 Oct 2024 • Recorded under UK ADR guidelines
            </span>
          </div>

          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-[85%] ${
                msg.sender === "tenant" ? "self-end flex-row-reverse ml-auto" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                  msg.sender === "tenant"
                    ? "bg-[#132A20] text-white"
                    : "bg-emerald-100 text-emerald-900 border border-emerald-200"
                }`}
              >
                {msg.senderInitials || (msg.sender === "tenant" ? "OD" : "EV")}
              </div>

              <div className={`flex flex-col gap-1 ${msg.sender === "tenant" ? "items-end" : ""}`}>
                <div className="flex items-baseline gap-2 text-xs">
                  <span className="font-semibold text-[#132A20]">{msg.senderName}</span>
                  <span className="text-[10px] text-stone-400">{msg.timestamp}</span>
                </div>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                    msg.sender === "tenant"
                      ? "rounded-tr-xs bg-stone-200 text-stone-900"
                      : "rounded-tl-xs bg-white text-stone-800 border border-stone-200/80"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center my-1">
            <span className="px-3 py-1 rounded-full bg-white text-stone-500 text-[11px] font-medium border border-stone-200/80 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-800" />
              Synchronized with Haven Statutory Mediation Ledger
            </span>
          </div>
        </div>

        {/* Reply Composer */}
        <div className="flex flex-col gap-2 pt-1">
          <div className="relative">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type a formal reply to this dispute..."
              rows={3}
              className="w-full p-3 pr-10 rounded-xl bg-stone-50 text-xs text-[#132A20] border border-stone-200/80 focus:outline-none focus:border-[#132A20] focus:bg-white transition-all resize-none"
            />
            <button
              type="button"
              className="absolute right-3 bottom-3 text-stone-400 hover:text-[#132A20]"
              title="Attach exhibit"
            >
              <Paperclip className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-[11px] text-stone-500">
              <Lock className="w-3.5 h-3.5 text-stone-400" />
              <span>Submissions are final once sent and added to case documentation.</span>
            </div>
            <Button
              type="button"
              onClick={handleSend}
              className="h-9 px-4 rounded-xl bg-[#132A20] hover:bg-[#1c3e30] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5"
            >
              <span>Send Message</span>
              <Send className="w-3.5 h-3.5 text-emerald-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}